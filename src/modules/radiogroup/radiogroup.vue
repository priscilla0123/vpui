<template>
    <div class="vp_radiogroup" :class="{'plain':isPlain}">
        <label v-for="item in data">            
            <Radio v-if="item.disabled" disabled :value="item.value" v-model="target" :name="item.name" @change="change"/>
            <Radio v-if="!item.disabled" :value="item.value" v-model="target" :name="item.name" @change="change"/>
            <span :class="{'checked':item.value==target,'disabled':item.disabled}">{{item.text}}</span>
        </label>
    </div>
</template>
<style>
    .vp_radiogroup label{
        position: inherit !important;
        padding-right: 10px;
        cursor: pointer;
    }
    .vp_radiogroup label .radio{
        vertical-align: sub;
    }
    .vp_radiogroup span.checked{
        color: #4475E8
    }
    .vp_radiogroup.plain .icon-radio{
        display: none !important;
    }
    .vp_radiogroup.plain .radio{
        width: 1px;
    }
    .vp_radiogroup .disabled{ 
        color: #d9d9d9 !important;
    }
</style>
<script>
import Radio from '../../components/radio';
var Radiogroup = {
    name: 'radiogroup',
    props: {
        'data': {
            type: Array
        },
        'init':{ 
            required:false
        },
    },
    data(){
        return{
            target:''
        }
    },
    methods: { 
        change(e) { 
            this.$emit('input',this.target);            
        }
    },
    created(){        
        (this.init !=undefined) &&(this.target=this.init)
    },
    computed:{
        isPlain(){   
            return this.$vnode.data.attrs.plain !=undefined;
        }
    },
    components:{
        Radio
    }
}
export default Radiogroup;
</script>