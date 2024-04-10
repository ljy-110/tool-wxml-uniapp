import Vue from 'vue';
import App from './App'
App.mpType = 'app';
import uView from "@/uni_modules/uview-ui";
Vue.use(uView);
const HFWEATHERKEY = '91339617beca4fb08eb28c43b90a64a2';
const TXMAPKEY = 'KECBZ-OWQ3L-SPMPB-MDREA-RVYU6-UEBVY'

Vue.prototype.$HFWEATHERKEY = HFWEATHERKEY
Vue.prototype.$TXMAPKEY = TXMAPKEY
// 导入并挂载全局的分享方法
import share from '@/common/share.js'
Vue.mixin(share)

const app = new Vue({
  ...App,
});

app.$mount();