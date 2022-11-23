import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './static/css/base.less';
import CommonFunction from './util/util';
import './static/iconfont/iconfont.css';
import './static/iconfont/iconfont'
import store from './store';
import VueParticles from 'vue-particles'; // 离子动画背景

Vue.use(VueParticles);
Vue.config.productionTip = false;
Vue.use(CommonFunction);
Vue.prototype.bus = new Vue;

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
