<template>
    <div>
        <span class="lg-title">1:Simple group</span>
        <vp-radiogroup :data="opitons.ex1" v-model="model.ex1"></vp-radiogroup>
        <br/>
        <span class="lg-title">2:Simple group with default value</span>
        <vp-radiogroup :data="opitons.ex2" v-model="model.ex2" :init="model.ex2"></vp-radiogroup>
        <span class="lg-title">3:Plain group</span>
        <vp-radiogroup :data="opitons.ex3" v-model="model.ex3" plain></vp-radiogroup>
        <br/>
        <span class="lg-title">4:Group with disabled items </span>
        <vp-radiogroup :data="opitons.ex4" v-model="model.ex4" init="1"></vp-radiogroup>
        <br/>
        <table class='lg-table'>
            <thead>
                <tr>
                    <th>Props</th>
                    <th>Required</th>
                    <th>Type</th>
                    <th>Memo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>data</td>
                    <td>True</td>
                    <td>Array</td>
                    <td>选项eg:[{name:'name',value:'1',text:'打开'}，{name:'name',value:'0',text:'关闭'}]</td>
                </tr>
                <tr>
                    <td>init</td>
                    <td>False</td>
                    <td>String</td>
                    <td>初始值</td>
                </tr>
                <tr>
                    <td>plain</td>
                    <td>False</td>
                    <td>--</td>
                    <td>不显示radio,仅显示文字</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {
    Radiogroup
} from 'vpui';

export default {
    components: {
        "vp-radiogroup": Radiogroup
    },
    data() { 
        return {
            model: {
                ex1: '',
                ex2: '2',
                ex3: '2'
            },
            opitons: {
                ex1: [{
                    name: 'ex1',
                    text: '一月',
                    value: '1',
                }, {
                    name: 'ex1',
                    text: '二月',
                    value: '2',
                }, {
                    name: 'ex1',
                    text: '三月',
                    value: '3',
                }],
                ex2: [{
                    name: 'ex2',
                    text: '一月',
                    value: '1',
                }, {
                    name: 'ex2',
                    text: '二月',
                    value: '2',
                }, {
                    name: 'ex2',
                    text: '三月',
                    value: '3',
                }],
                ex3: [{
                    name: 'ex3',
                    text: '一月',
                    value: '1',
                }, {
                    name: 'ex3',
                    text: '二月',
                    value: '2',
                }, {
                    name: 'ex3',
                    text: '三月',
                    value: '3',
                }],
                ex4: [{
                    name: 'ex4',
                    text: '一月',
                    value: '1',
                    disabled:true
                }, {
                    name: 'ex4',
                    text: '二月',
                    value: '2',
                }, {
                    name: 'ex4',
                    text: '三月',
                    value: '3',
                }]
            }

        }
    },
    methods: {
        callback(page) {
            this.msg = 'current page is :' + page;
        },
        test(n) {}
    }
}
</script>