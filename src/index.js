import Pager from './components/pager';
import MiniPager from './components/pager/minipager.js';
import Datagrid from './components/datagrid';
import Button from './components/button';
import Overlay from './components/overlay';
import Mask from './components/mask';
import Alert from './components/alert';
import Picker from './components/picker';
import CityPicker from './components/citypicker';
import { Yearpanel, Monthpanel, Datepanel, Timepanel, Yearpicker, Monthpicker, Datepicker, Datetimepicker, Daterangepicker, Datetimerangepicker } from './components/datepicker';
import Checkbox from './components/checkbox';
import Radio from './components/radio';
import { Tabs, TabPanel } from './components/tab';
import Select from './components/select';
import Dialog from './components/dialog';
import { WaterFall, WaterFallItem} from './components/waterfall';
import Timeline from './components/timeline';
//--------------------------------------------------------
import Tablepager from './modules/tablepager';
import Radiogroup from './modules/radiogroup';
import Checkboxgroup from './modules/checkboxgroup';
//--------------------------------------------------------
import Valid from './directives/valid';
import AutoPosition from './directives/autoposition';
import Clickoutside from './directives/clickoutside';
import { Drag, DragDrop } from './directives/drag';
import Tooltip from './directives/tooltip';
import Toast from './components/toast';
import Uploader from './components/uploader';
import ProgressBar from './components/progressbar';
//--------------------------------------------------------
import Vue from 'vue';

var Components = [
    MiniPager,Pager, Datagrid, Checkbox, Radio, Tabs, TabPanel, Select, Dialog, Yearpanel, Monthpanel, Datepanel, Timepanel, Yearpicker, Monthpicker, Datepicker, Datetimepicker, Daterangepicker, Datetimerangepicker, WaterFall,Uploader,ProgressBar,Timeline
];

var Modules = [
    Tablepager,
    Radiogroup,
    Checkboxgroup
];

var Directives = [
    Valid,
    Clickoutside,
    Drag,
    DragDrop,
    Tooltip
];

function install(Vue){
    for(let Component of Components){
        Vue.use(Component);
    }
    for(let Module of Modules){
        Vue.use(Module);
    }
     for(let Directive of Directives){
        Vue.use(Directive);
    }
}

export {
    DragDrop,
    Drag,
    Tooltip,
    Clickoutside,
    Valid,
    Pager,
    Datagrid,
    Tablepager,
    Button,
    Overlay,
    Mask,
    Alert,
    AutoPosition,
    Checkbox,
    Checkboxgroup,
    Radio,
    Radiogroup,
    Tabs,
    TabPanel,
    Select,
    Dialog,
    Picker,
    CityPicker,
    Yearpanel,
    Monthpanel,
    Datepanel,
    Timepanel,
    Yearpicker,
    Monthpicker,
    Datepicker,
    Datetimepicker,
    Daterangepicker,
    Datetimerangepicker,
    Toast,
    WaterFall,
    Uploader,
    ProgressBar,
    WaterFallItem,
    Timeline,
    MiniPager
};

export default {install};