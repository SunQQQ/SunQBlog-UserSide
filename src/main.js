import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './static/css/base.less';
import CommonFunction from './util/util';
import './static/iconfont/iconfont.css';
import './static/iconfont/iconfont'
import store from './store';
import VueParticles from 'vue-particles'; // 离子动画背景

import * as echarts from 'echarts/core';
import { LineChart, PieChart, ScatterChart } from 'echarts/charts';
import { TitleComponent, LegendComponent, TooltipComponent, GridComponent,GeoComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueParticles);
Vue.config.productionTip = false;
Vue.use(CommonFunction);
Vue.prototype.bus = new Vue;
Vue.use(ElementUI);

// 按需注册组件
echarts.use([
  LineChart, PieChart, ScatterChart,
  TitleComponent, LegendComponent, TooltipComponent, GridComponent,GeoComponent,
  CanvasRenderer
]);
Vue.prototype.$echarts = echarts; // Vue 项目

new Vue({
  render:function (h) {
    return h(App);
  },
  store,
  router:router
}).$mount('#app');

/*将组件渲染成Dom结构（render参数）
然后将Dom追加到id为app的首页节点中。
其余都是该首页中切换页面（组件）*/
