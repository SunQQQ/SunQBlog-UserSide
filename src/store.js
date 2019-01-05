import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 顶部导航栏
    Active: 0,
    OpenMobileMenu: false, //移动端菜单详情伸开、关闭

    // 表情包组件
    EmotionShow:false,

    // 留言组件
    MessageText:'',
  },
  getters: {
    GetMessageText: function (State) {
      return State.MessageText;
    }
  },
  mutations: {
    // 顶部导航栏
    ChangeActive:function (State,Value) {
      State.Active = Value;
    },
    ChangeOpenMobileMenu:function (State,Value) {
      State.OpenMobileMenu = Value;
    },

    // 表情包组件
    ChangeEmotionShow:function (State,Value) {
      State.EmotionShow = Value;
    },

    // 留言组件
    AppendMessageText:function (State,Value) {
      State.MessageText += Value;
    },
    CleanMessageText:function (State) {
      State.MessageText = '';
    },
    ChangeMessageText:function (State,Value) {
      State.MessageText = Value;
    }

  },
  actions: {

  }
});
