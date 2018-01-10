<template>
    <div class="vp_checkboxgroup" :class="{'plain':isPlain}">
        <label v-for="item in data">
            <Checkbox v-if="item.disabled" disabled :value="item.value" v-model="target" @change="change" />
            <Checkbox v-if="!item.disabled" :value="item.value" v-model="target" @change="change" />
            <span :class="{'checked':target.indexOf(item.value)>=0,'disabled':item.disabled}">{{item.text}}</span>
        </label>
    </div>
</template>
<style>
.vp_checkboxgroup label {
    position: inherit !important;
    padding-right: 10px;
    cursor: pointer;
}

.vp_checkboxgroup span.checked {
    color: #4475E8
}

.vp_checkboxgroup .disabled {
    color: #d9d9d9 !important;
}

.vp_checkboxgroup .icon-checkbox {
    top: -2px !important;
}

.vp_checkboxgroup.plain .checkbox {
    width: 0;
}

.vp_checkboxgroup.plain .icon-checkbox {
    display: none !important;
}
</style>
<script>
import Checkbox from '../../components/checkbox';
var Checkboxgroup = {
    name: 'checkboxgroup',
    props: {
        'data': {
            type: Array
        },
        'init': {
            required: false
        },
    },
    data() {
        return {
            target: []
        }
    },
    methods: {
        change(e) {
            this.$emit('input', this.target);
        }
    },
    created() {
        var defaultValue = this.init || [];
        if (typeof defaultValue == 'object') { 
            this.target =JSON.parse(JSON.stringify(defaultValue));
        } else {
            this.target = defaultValue.split(',');
        }
    },
    computed: {
        isPlain() {
            return this.$vnode.data.attrs.plain != undefined;
        }
    },
    components: {
        Checkbox
    }
}
export default Checkboxgroup;
</script>