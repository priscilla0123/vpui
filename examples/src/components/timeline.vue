<template>
    <div>
        <input type="text" style="width:300px" v-model="address" />
        <button type="button" @click="locate">locate</button>
        <div><span class="lg-switch">
            <input type="checkbox" id="mark" @click="onSwitch()" v-model="game.mark"/>
            <label for="mark">MARK</label>
            <label for="mark">MARK</label>
        </span></div>
        <div id="game">
            <div class="board">
                <ul v-for="(line,i) in game.board">
                    <li v-for="(cell,j) in line" :class="cell.status" @click="cellClick(i,j)" v-html="cell.status=='close'?'':cell.text"></li>
                </ul>
            </div>
        </div>
        <div id="map" style="height:600px;margin:16px"></div>
    </div>
</template>
<style>
.districtPoint {
    position: absolute;
    background-color: cornflowerblue;
    height: 70px;
    width: 70px;
    border-radius: 45px;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}

.districtPoint.active {
    background-color: orange;
    z-index: 100 !important;
}

.districtPoint span {
    color: white;
    font-weight: bold;
}

#game {
    border: 1px solid rgba(245, 212, 207, 1);
    padding: 10px;
    margin: 10px;
    height: 300px;
    width: 300px;
    border-radius: 15px;
}

.board {
    display: flex;
    flex-direction: column;
}

.board ul {
    display: flex;
}

.board ul li {
    display: inline;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
    border: 2px solid white;
    border-radius: 5px;
    cursor: pointer;
}

.close {
    background-color: rgba(242, 156, 177, 1);
}

.empty {
    background-color: rgba(249, 204, 226, 1);
}

.bomb {
    background-color: red;
}
.sign{
    position: relative;
}

.sign:after {
    content: ''; 
    width: 0;
    height: 0;
    border-top:6px solid transparent;
    border-bottom:6px solid transparent;
    border-left:11px solid red;
    display: inline-block;
    top:5px;
    left: 10px;
    position: absolute;
}

.sign:before {
    content: ''; 
    height: 19px;
    width: 1px;
    background-color: black;
    right:4px;
    top:4px;
    display: inline-block;
    position: relative;
}
</style>
<script>
import Vue from 'vue';
import { DistrictOverlay } from './districtoverlay.vue';

export default {
    data() {
        return {
            address: '',
            district: [{
                name: '上海市黄浦区',
                displayName: '黄浦',
                store: 100,
                people: 1800,
                lng: 121.496072,
                lat: 31.227203
            }, {
                name: '上海市普陀区',
                displayName: '普陀',
                store: 200,
                people: 1700,
                lng: 121.398443,
                lat: 31.263743
            }, {
                name: '上海市静安区',
                displayName: '静安',
                store: 300,
                people: 1880,
                lng: 121.454756,
                lat: 31.235381
            }, {
                name: '上海市徐汇区',
                displayName: '徐汇',
                store: 402,
                people: 18300,
                lng: 121.446235,
                lat: 31.169152
            }, {
                name: '上海市浦东新区',
                displayName: '浦东',
                store: 503,
                people: 1850,
                lng: 121.638481,
                lat: 31.230895
            }],
            game: {
                boardWidth: 10,
                board: [],
                bombCount: 20,
                bombs: [],
                marks: [],
                mark: true
            }
        }
    },
    methods: {
        locate() { //定位地址 
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(this.address, function(point, adderss) {
                if (point) {
                    console.log(point.lng, point.lat);
                } else {
                    alert('定位失败，请重新输入详细地址！');
                }
            });
        },
        boundary(DistrictOverlay) {
            DistrictOverlay.boundary(DistrictOverlay._name);
        },
        gameInit() {
            this.game.bombs = this.initBomb();
            this.game.board = new Array();
            for (var i = 0; i < this.game.boardWidth; i++) {
                this.game.board[i] = new Array();
                for (var j = 0; j < this.game.boardWidth; j++) {
                    this.game.board[i][j] = {
                        status: 'close',
                        type: 'empty'
                    };
                    if (this.game.bombs.indexOf(i * this.game.boardWidth + j) >= 0) {
                        this.game.board[i][j].type = "bomb"; 
                    }
                }
            }
            for (var i = 0; i < this.game.boardWidth; i++) {
                for (var j = 0; j < this.game.boardWidth; j++) {
                    this.game.board[i][j].text = this.initCellNum(i, j);
                }
            }
        },
        cellClick(i, j) {
            var temp = this.game.board[i];
            if (this.game.mark) {
                if (temp[j].status == 'close'){
                    temp[j].status = 'sign';
                    this.game.marks.push(i*10+j);
                    this.game.marks.sort();
                    this.win();
                }else if(temp[j].status != 'empty'){
                    temp[j].status = 'close';
                    var index=this.game.marks.indexOf(i*10+j);
                    this.game.marks.splice(index,1);
                }
            } else {
                if (temp[j].status == 'close') {
                    if(temp[j].type=='bomb'){
                        this.gameover();
                    }
                    temp[j].status = temp[j].type; 
                }
            }
            Vue.set(this.game.board, i, temp);
        },
        onSwitch(val) {
            if (this.game.mark) {
                this.game.mark = true;
            } else {
                this.game.mark = false;
            }
        },
        initBomb() {
            var repo = [];
            for (var i = 0; i < this.game.boardWidth * this.game.boardWidth; i++) {
                repo.push(i);
            }
            var bombs = new Array();
            for (var i = 0; i < this.game.bombCount; i++) {
                var index = Math.round(Math.random() * (repo.length - 1));
                bombs.push(repo.splice(index, 1)[0]);
            }
            console.log(repo);
            console.log(bombs);
            return bombs.sort();
        },
        initCellNum(x, y) {
            var _this = this;
            if (this.game.bombs.indexOf(x * 10 + y) >= 0) {
                return '';
            }
            var w = this.game.boardWidth;
            var arounds = [{ x: x - 1, y: y - 1 }, { x: x - 1, y: y }, { x: x - 1, y: y + 1 }, { x: x, y: y - 1 }, { x: x, y: y + 1 }, { x: x + 1, y: y - 1 }, { x: x + 1, y: y }, { x: x + 1, y: y + 1 }];
            var count = arounds.filter(function(cell, index) {
                if (cell.x < 0 || cell.y < 0 || cell.x == w || cell.y == w) {
                    return false;
                }
                return _this.game.bombs.indexOf(cell.x * w + cell.y) >= 0;
            }).length;
            return count == 0 ? '' : count;
        },
        gameover(){
            var _this=this;
            this.game.board.forEach(function(line,i){
                var temp=line;
                line.forEach(function(cell,j){
                    temp[j]=cell;
                    temp[j].status=cell.type;
                    Vue.set(_this.game.board, i, temp);
                })
            })
        },
        win(){
            if(this.game.bombs.join(',')==this.game.marks.join(',')){
                alert('you win');
            }

        }
    },
    mounted() {
        var _this = this;
        var mp = new BMap.Map("map");
        mp.enableScrollWheelZoom(true);
        mp.centerAndZoom('上海市', 15);
        this.district.forEach(function(district) {
            var myCompOverlay = new DistrictOverlay(new BMap.Point(district.lng, district.lat), district.name, district.displayName, '', _this.boundary);
            mp.addOverlay(myCompOverlay);
        })
        this.gameInit();
    }
}
</script>