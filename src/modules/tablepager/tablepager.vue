<template>
    <pager :total="pages" :current="current" :position="position" :volumn="volumn">
        <slot name="after">
            ,{{total}}条
        </slot>
    <pager>
</template>
<style> 
.lg-pager-shortcut select {
    height: 24px;
    width: 38px;
    padding: 0px;
    outline: none;
    text-align: center;
    margin: 0px;
    border-radius: 3px;
    border: 1px solid #a3a3a3;
    box-size: border-box;
}

.lg-pager-shortcut select {
    padding: 0 3px;
    width: auto;
    margin: 0 5px;
} 
</style>
<script>
import Pager from '../../compontents/pager';
var Tablepager = {
    name: 'tablepager',
    props: {
        'total': {
            type: Number,
            require: true
        },
        'current': {
            type: Number,
            require: true,
            default: 1
        },
        'size':{
            type: Number,
            require: true,
            default: 10
        },
        'position': {
            type: String,
            default:'center'
        },
        'volumn': {
            type: Number,
            default: 10,
            validator(value) {
                return value > 5;
            }
        }
    },
    methods: {
        to(current) {
            var cur = Number(current);
            if (isNaN(cur)) {
                alert('别任性~');
                return;
            }
            if (cur <= this.pager.total && cur >= 1 && cur != this.pager.current) {
                this.calculate(cur);
                this.$emit('to', cur);
            }
        },
        calculate(current) {
             
        },
        update() {
            this.vol = this.volumn;
            this.pre = Math.floor((this.vol - 3) / 2);
            this.next = Math.ceil((this.vol - 3) / 2);
            this.pager.total = this.total;
            this.calculate(this.current);
        }
    },
    data() {
        return {
            pages: Math.ceil(this.total / this.size)
        }
    },
    created() {
        this.update();
    },
    computed: {
        pagesUpdate() {
            return Math.ceil(this.total / this.size);
        }
    },
    compontents:{
        Pager
    }
}
export default Tablepager;
</script>