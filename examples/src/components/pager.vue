<template>
    <vp-pager :model="pager" :callback="callback"> 
    </vp-pager>
</template>


<script>
    import {
        Pager
    } from 'vpui';

    export default{
        components: {
            "vp-pager":Pager
        },
        data(){
            return {
                pager:{
                    current:5,
                    size:10,
                    total:150
                }
            }
        },
        methods: {
            callback(page,size){
                console.log('current page is:'+page+';pageSize is :'+size);
            }
        }
    }
</script>