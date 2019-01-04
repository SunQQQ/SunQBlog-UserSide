import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Active: 0,
    OpenMobileMenu: false //移动端菜单详情伸开、关闭
  },
  mutations: {
    ChangeActive:function (State,Value) {
      State.Active = Value;
    },
    ChangeOpenMobileMenu:function (State,Value) {
      State.OpenMobileMenu = Value;
    }
  },
  actions: {

  }
});
