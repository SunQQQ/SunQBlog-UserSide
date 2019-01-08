<template>
  <div>
    <div class="PcTopBar">
      <div class="MoveingLight"></div>
      <div class="MediaIndexContent">
        <div class="MediaLeft" @click="ChangeRouter('BlogIndex')">
          <span>Sunq's Blog</span>
        </div>
        <div class="MediaRight">
          <div :class="Active == 4 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('AboutMe')">关于</div>
          <div :class="Active == 3 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('FriendUrl')">圈子</div>
          <div :class="Active == 2 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('TimeLine')">时间轴</div>
          <div :class="Active == 1 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('MessageBoard')">留言</div>
          <div :class="Active == 0 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('BlogIndex')">博文</div>
        </div>
      </div>
    </div>
    <div class="MobileTopBar">
      <div class="MobileTopBarLogo" @click="ChangeRouter('BlogIndex')">Sunq's Blog</div>
      <div class="MenuTopBarIcon" @click="OpenMenu()">
        <i :class="OpenMobileMenu ? 'iconfont icon-fork IconfontSize' : 'iconfont icon-iconset0194 IconfontSize'"></i>
      </div>
    </div>

    <div class="MobileTopBarDiv" v-if="OpenMobileMenu"></div>
    <div class="MobileMenuDetail" v-if="OpenMobileMenu" @click="OpenMenu()">
      <div class="MoblieMenuDetailContent">
        <div :class="Active == 0 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
             @click="ChangeRouter('BlogIndex')">博文
        </div>
        <div :class="Active == 1 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
             @click="ChangeRouter('MessageBoard')">留言
        </div>
        <div :class="Active == 2 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
             @click="ChangeRouter('TimeLine')">时间轴
        </div>
        <div :class="Active == 3 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
             @click="ChangeRouter('FriendUrl')">圈子
        </div>
        <div :class="Active == 4 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
             @click="ChangeRouter('AboutMe')">关于
        </div>
      </div>
      <div class="MoblieMenuDetailShade"></div>
    </div>
  </div>
</template>

<script>
  import Store from '../../store';
  export default {
    name: "PcTopBar",

    data: function () {
      return {
        OpenMobileMenu: false //移动端菜单详情伸开、关闭
      }
    },

    methods: {
      /**
       * 跳转路由
       * @param url 跳转的Url
       * @constructor
       */
      ChangeRouter: function (url) {
        var That = this;

        That.$router.push({
          name: url,
        });
      },

      // 伸缩 移动端菜单详情
      OpenMenu: function () {
        this.OpenMobileMenu = !this.OpenMobileMenu;
      }
    },
    computed:{
      Active(){
        return Store.state.Active;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../static/css/base.less';

  /*pc端*/
  @media only screen and (min-device-width: 768px) {
    .PcTopBar {
      background-color: @TranslucentWhitleBackg;
      color: @FontColorGray;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .09);
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 10000;
    }

    .MobileTopBar {
      display: none;
    }

    .MobileTopBarDiv {
      display: none;
    }

    .MoveingLight {
      /*position: absolute;
      left: -1px;
      top:0;
      width: 60px;
      height: 60px;
      transform: rotate(-45deg);
      animation: MoveIt 3.5s linear infinite;
      background: radial-gradient(#fff,hsla(0,0%,100%,.2),hsla(0,0%,100%,0));*/
    }
  }

  /*移动端*/
  @media only screen and (max-device-width: 768px) {
    .PcTopBar {
      display: none;
    }

    .MobileTopBar {
      width: 100%;
      padding: 0rem 0.5rem;
      height: 4.3rem;
      line-height: 4.3rem;
      .myflex(middle);
      font-size: 1.1rem;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10000;
      background-color: @TranslucentWhitleBackg;
      color: @FontColorGray;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .09);
    }

    .MobileTopBarDiv {
      height: 4.3rem;
    }

    .MoveingLight {
      display: none;
    }
  }

  .MobileTopBarLogo {
    flex: 1;
    cursor: pointer;
  }

  .MenuTopBarIcon {
    text-align: right;
    margin-right: 1rem;
    flex: 1;
    cursor: pointer;
  }

  .MediaIndexContent {
    .myflex('middle');
    width: 1200px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
  }

  @keyframes MoveIt {
    0% {
      left: 0;
    }
    100% {
      left: 200px
    }
  }

  .MediaLeft {
    width: 60%;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .MediaLeft span {
  }

  .MediaRight {
    flex: 1px;
    width: 40%;
    .myflex('middle');
    text-align: right;
    flex-direction: row-reverse;
  }

  .MenuItem {
    padding: 0 30px;
  }

  .MenuItemActive {
    padding: 0 30px;
    cursor: pointer;
    border-bottom: 2px solid @ThemeColor;
    color: @ThemeColor;
  }

  .MenuItem:hover {
    color: #3e3e3e;
    cursor: pointer;
  }

  .IconfontSize {
    font-size: 1.3rem;
  }

  .MobileMenuDetail {
    background-color: rgba(255, 255, 255, 0.78);
    z-index: 5000;
    position: fixed;
    top: 4.3rem;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }

  .MoblieMenuDetailContent {
    background-color: @fore_color;
    padding: 1rem 0 1.2rem;
    -webkit-box-shadow: 1px 1px 3px #292929;
    -moz-box-shadow: 1px 1px 3px #292929;
    box-shadow: 1px 1px 3px #292929;
    animation: MenuDetailContentAnimation 0.3s linear;
  }

  @keyframes MenuDetailContentAnimation {
    0% {
      transform: translateY(-60px)
    }
    25% {
      transform: translateY(-45px)
    }
    50% {
      transform: translateY(-30px)
    }
    75% {
      transform: translateY(-15px)
    }
    100% {
      transform: translateY(0)
    }
  }

  .MobileMenuDetailItem {
    padding-bottom: 0.1rem;
    padding-top: 1.2rem;
    cursor: pointer;
    margin: 0 25%;
  }

  .MobileMenuDetailItemActive {
    padding-bottom: 0.5rem;
    margin: 0 25%;
    padding-top: 1rem;
    cursor: pointer;
    border-bottom: 2px solid @ThemeColor;
    color: @ThemeColor;
  }
</style>
