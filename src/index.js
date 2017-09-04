import Pager from './components/pager';

import Vue from 'vue';

var Components = [
    Pager 
];

function install(Vue){
    for(let Component of Components){
        Vue.use(Component);
    }
}

export {
    Pager
};

export default {install};