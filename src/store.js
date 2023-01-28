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

    // Loading组件
    Loading:false,

    // Tip组件
    Tips:{
      Show:false,
      Title:''
    },

    // footer组件
    footer:{
      show: false
    }
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
    },

    // Loading组件
    ChangeLoading:function (State,Value) {
      State.Loading = Value;
    },

    // Tips组件
    ChangeTip:function (State,Value) {
      State.Tips.Show = Value.Show;
      State.Tips.Title = Value.Title;
    },
    // footer组件
    changeFooter:(state,value)=>{
      state.footer.show = value;
    }
  },
  actions: {

  }
});
