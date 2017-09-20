<template>
    <div style="position:relative">
        <div class="lg-table-scroll lg-table-main">
            <basegrid :column="aHead" :data="data" :colspan="colspan" style="min-width:1200px" ref="main" @action="onAction"> 
                <template v-for="(col,i) in aHead">
                    <div :slot="'cell:'+col.key+'_'+j" v-for="(item,j) in data" v-if="$slots['cell:'+col.key+'_'+j]">
                        <slot :name="'cell:'+col.key+'_'+j">123</slot> 
                    </div>
                </template>                
            </basegrid>
        </div>
        <div class="lg-table-scroll lg-table-fixleft" v-if="fix.left">
            <basegrid :column="getFixHead(aHead,fix.left)" :data="data" :colspan="colspan" ref="left"></basegrid>
        </div>
        <div class="lg-table-scroll lg-table-fixright" v-if="fix.right">
            <basegrid :column="getFixHead(aHead,fix.right,true)" :data="data" :colspan="colspan" ref="right"></basegrid>
        </div>
    </div>
</template>
<script>
import baseGrid from './baseGrid';
var Datagrid = {
    name: 'table',
    props: {
        'head': {
            type: Object,
            require: true
        },
        'data': {
            type: Array,
            require: true
        },
        'colspan': {
            type: Number,
            require: true
        },
        'parent': {
            type: Object,
            require: false
        },
        'scroll': {
            type: Boolean,
            require: false,
            default: true
        },
        'headerFormat': {
            type: Function,
            require: false,
            default: function(data) {
                return data.label;
            }
        },
        'cellFormat': {
            type: Function,
            require: false,
            default: function(data, key) {
                if (data[key]) {
                    if (typeof data[key] != 'function' && typeof data[key] != 'object') {
                        return data[key];
                    } else if (data[key].label) {
                        return data[key].label;
                    }
                }
            }
        },
        'fix': {
            type: Object,
            require: false,
            default () {
                return {};
            }
        }
    },
    data: function() {
        var parent = this.parent || this.$parent;
        var checkResults = {};
        var isAllCheck = [];
        var _this = this;
        for (var key in this.head) {
            var type = this.head[key].type;
            if (type == 'checkbox' || type == 'radio') {
                checkResults[key] = [];
                var count = 0;
                _this.data.forEach(function(line, i) {
                    line[key] && line[key].checked && checkResults[key].push(line[key].value);
                    (line[key].checked || line[key].disable) && (count++);
                })
                _this.data.length && _this.data.length == count && isAllCheck.pus(key);
            }
        }
        return {
            p: parent,
            checkResults: checkResults,
            isAllCheck: isAllCheck
        }
    },
    computed: {
        aData() {
            return this.data;
        },
        aHead() {
            var header = [];
            for (var key in this.head) {
                if (typeof this.head[key] == 'object') {
                    var style = '';
                    this.head[key].width ? style = 'width:' + this.head[key].width : '';
                    header.push(Object.assign(this.head[key], { key: key, style: style }));
                } else {
                    header.push({
                        key: key,
                        type: 'field',
                        label: this.head[key]
                    })
                }
            }
            return header;
        }
    },
    mounted() { 
        //synchronous row height of main & left & right if (left,right) exist
        if (this.fix.left || this.fix.right) {
            this.setRowHeight();
            var that = this;
            window.onresize = () => {
                that.setRowHeight();
            }
        } 
    },
    methods: { 
        cellClick(data) {
            this.$emit('grid:click', data);
        },
        checkAll(key) {
            var _this = this;
            var disableLength = this.aData.filter(function(item, i) {
                return item[key].disable;
            }).length;
            var length = this.checkResults[key].length + disableLength;
            this.checkResults[key] = [];
            if (length != this.aData.length) {
                this.aData.forEach(function(line) {
                    !line[key].disable && _this.checkResults[key].push(line[key].value);
                })
            } else {}
            this.$emit('grid:checkall', key, this.checkResults[key].join(','));
            this.computeCheckAll(key);
        },
        computeCheckAll(key) {
            var disableLength = this.aData.filter(function(item, i) {
                return item[key].disable;
            }).length;
            var length = this.checkResults[key].length + disableLength;
            var index = this.isAllCheck.indexOf(key);
            if (length != this.aData.length) {
                index > -1 && this.isAllCheck.splice(index, 1);
            } else {
                this.isAllCheck.push(key);
            }
        },
        check(key, index) {
            this.$emit('grid:checkbox', key, index, this.checkResults[key].join(','));
            this.computeCheckAll(key);
        },
        switcher(key, index, reuslt) {
            this.$emit('grid:switch', key, index, reuslt);
        },
        sort(head, asc) {
            var next = asc === true ? false : (asc === false ? '' : true);
            head.asc = next;
            this.$emit('grid:sort', head.key, next);
        },
        action(name, arg) {
            this.$emit('grid:action', name, arg)
        },
        getFixHead(heads, length, reverse) {
            return reverse ? heads.slice(heads.length - length) : heads.slice(0, length);
        },
        setRowHeight() {
            var mainHeight = this.$refs.main.getRowHeight();
            var leftHeight = this.fix.left ? this.$refs.left.getRowHeight() : mainHeight;
            var rightHeight = this.fix.right ? this.$refs.right.getRowHeight() : mainHeight;
            mainHeight.forEach(function(h, i) {
                var temp = [h, leftHeight[i], rightHeight[i]];
                h = temp.sort()[2];
            })
            this.$refs.main.setRowHeight(mainHeight);
            this.$refs.left && this.$refs.left.setRowHeight(mainHeight);
            this.$refs.right && this.$refs.right.setRowHeight(mainHeight);
        },
        onAction(actionName, data) { 
            this.$emit('callback:'+actionName,data);
        }
    },
    components: {
        'basegrid': baseGrid
    }
}
export default Datagrid;
</script>
<style>
.lg-table thead label {
    color: white;
}

.lg-table-main,
.lg-table-fixleft,
.lg-table-fixright {
    background-color: white;
}

.lg-table-fixleft,
.lg-table-fixright {
    position: absolute;
    top: 0;
}

.lg-table-main .lg-table {
    table-layout: fixed;
}

.lg-table-fixleft {
    border-right: 1px solid #eee;
}

.lg-table-fixright {
    border-left: 1px solid #eee;
    right: 0;
}

.lg-table span.grid-sort {
    display: inline-block;
    line-height: 13px;
    margin-right: 5px;
    position: relative;
    top: 1px;
    cursor: pointer;
}

.lg-table span.grid-sort:before {
    content: '';
    border-bottom: 6px solid white;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-top: none;
    position: absolute;
    top: 0;
    right: -10px;
}

.lg-table span.grid-sort:after {
    content: '';
    border-top: 6px solid white;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: none;
    position: absolute;
    bottom: 0;
    right: -10px;
}

.lg-table span.up:before {
    border-bottom: 7px solid white;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    top: 4px;
}

.lg-table span.up:after {
    display: none;
}

.lg-table span.down:before {
    display: none;
}

.lg-table span.down:after {
    border-top: 7px solid white;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: 2px;
}

.lg-table a {
    margin-right: 5px;
}
</style>