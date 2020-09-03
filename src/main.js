// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button
} from 'vant';
import {
  Popup
} from 'vant';
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import './style/font.css'
import 'vant/lib/index.css';
import footer from "./components/common/footer.vue";
import maps from "./components/common/maps.vue";

// import google from 'google'
// import './style/resetVant.less';
import {
  Swipe,
  SwipeItem
} from 'vant';
import {
  Lazyload
} from 'vant';
import {
  Image as VanImage


} from 'vant';
import {
  Divider
} from 'vant';
import {
  Tag
} from 'vant';
import {
  Icon
} from 'vant';
import {
  Col,
  Row
} from 'vant';
import {
  ActionSheet
} from 'vant';
import {
  DropdownMenu,
  DropdownItem
} from 'vant';
import {
  Cell,
  CellGroup
} from 'vant';
import {
  Collapse,
  CollapseItem
} from 'vant';
import {
  List
} from 'vant';
import {
  RadioGroup,
  Radio
} from 'vant';
import {
  Checkbox,
  CheckboxGroup
} from 'vant';
import {
  Slider
} from 'vant';
import {
  Form
} from 'vant';
import {
  Field
} from 'vant';
import {
  AddressList
} from 'vant';
import {
  Search
} from 'vant';
import {
  Area
} from 'vant';
import {
  Dialog
} from 'vant';
import {
  Toast
} from 'vant';
// import { Image as VanImage } from 'vant';

// Vue.use(VanImage);
import { Image } from 'vant';

Vue.use(Image);
Vue.use(Toast);
Vue.use(Dialog);

Vue.use(Area)
Vue.use(Search);
Vue.use(AddressList)
Vue.use(Field);
Vue.use(Form);
Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(List);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(ActionSheet);
Vue.use(Col);
Vue.use(Row)
Vue.use(Icon);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(VanImage);

Vue.use(Lazyload);

Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.use(Popup);
Vue.use(Button);

Vue.component("foot-view", footer);
Vue.component("maps-view", maps);
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import header from './components/common/header'
Vue.component("head-view", header);
import commonApi from './components/common/commonApi'
Vue.prototype.commonApi = commonApi;
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// commonApi.scale()
// 多语言实例
const i18n = new VueI18n({
  // locale: (function() {
  //   if (localStorage.getItem('lang')) {
  //     return localStorage.getItem('lang');
  //     console.log(localStorage.getItem('lang'))
  //   }
  //   return 'Mandarin'
  // }()),
  // locale:commonApi.getRequest().language,
  locale:'Mandarin',
  messages: {
    'Mandarin': require('./lang/cn.js'), // 中文语言包
    'English': require('./lang/en.js'), // 英文语言包
    'Korean': require('./lang/ko.js'), // 韩文语言包
    'Japanese': require('./lang/jp.js') // 韩文语言包
  },
  silentTranslationWarn:true
})

// import * as VueGoogleMaps from 'vue2-google-maps'

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyALodR-VI9EV_CFDOWHZZQgeUWdMP6lZMg',
//     libraries: 'places',
//     // true代表中国区,false代表全球区
//     // loadCn: window.localStorage.getItem("lang") == "zh-CN",
//     // callBack: function() { // 回调

//     // }
//   },
// })
// const VueGoogleMaps = require('vue2-google-maps');

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyALodR-VI9EV_CFDOWHZZQgeUWdMP6lZMg',
//     libraries: 'places'
//   }
// })
// import * as VueGoogleMaps from 'vue2-google-maps'
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyALodR-VI9EV_CFDOWHZZQgeUWdMP6lZMg',
//     libraries: 'places', // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//     // (as you require)
//   }
// })
// import 'vue-googlemaps/dist/vue-googlemaps.css'
// import VueGoogleMaps from 'vue-googlemaps'

// Vue.use(VueGoogleMaps, {
//   load: {
//     // Google API key
//     apiKey: 'AIzaSyALodR-VI9EV_CFDOWHZZQgeUWdMP6lZMg',
//     // Enable more Google Maps libraries here
//     libraries: ['places'],
//     // Use new renderer
//     useBetaRenderer: false,
//   },
// })
// import VueGoogleAutocomplete from 'vue-google-autocomplete'

// const link= "http://39.101.192.57:8080?agentId=11111&houseId=12313"
axios.defaults.baseURL = 'http://39.101.192.57:8080'; //后端开发环境地址
// axios.defaults.baseURL = 'http://39.101.192.57:8080'; //后端开发环境地址
// axios.defaults.baseURL = 'http://172.18.31.16:8000/';//后端地址
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头信息。

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
