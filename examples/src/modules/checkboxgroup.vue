<template>
    <div>
        <span class="lg-title">1:Simple group</span>
        <vp-checkboxgroup :data="opitons.ex1" v-model="model.ex1" /> 
        <span>result:{{model.ex1.toString()}}</span>
        <br/>
        <span class="lg-title">2:Simple group with default value</span>
        <vp-checkboxgroup :data="opitons.ex1" v-model="model.ex2" :init="model.ex2" />
        <span>result:{{model.ex2.toString()}}</span> 
        <br/> 
        <span class="lg-title">3:Plain group</span>
        <vp-checkboxgroup :data="opitons.ex1" v-model="model.ex3" plain />
        <span>result:{{model.ex3.toString()}}</span> 
        <br/>  
        <span class="lg-title">4:Group with disabled items</span>
        <vp-checkboxgroup :data="opitons.ex4" v-model="model.ex4" :init="model.ex4"/>
        <span>result:{{model.ex4.toString()}}</span> 
        <br/>
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
                    <td>选项eg:[{value:'1',text:'A'}，{value:'0',text:'B'}]</td>
                </tr>
                <tr>
                    <td>init</td>
                    <td>False</td>
                    <td>Array | String </td>
                    <td>初始值(string用逗号隔开)</td>
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
    Checkboxgroup
} from 'vpui';

export default {
    components: {
        "vp-checkboxgroup": Checkboxgroup
    },
    data() { 
        return {
            model: {
                ex1: [],
                ex2: [2],
                ex3: [2],
                ex4:[1,2,3]
            },
            opitons: {
                ex1: [{ 
                    text: '一月',
                    value: 1,
                }, { 
                    text: '二月',
                    value: 2,
                }, { 
                    text: '三月',
                    value: 3,
                }],
                ex4: [{ 
                    text: '一月',
                    value: 1,
                    disabled:true
                }, { 
                    text: '二月',
                    value: 2,
                }, { 
                    text: '三月',
                    value: 3,
                }]
            }
        }
    }
}
</script>