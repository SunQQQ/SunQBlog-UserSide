<template>
  <header>
    <div class="PcTopBar" role="banner">
      <div class="MediaIndexContent">
        <div class="MediaLeft" aria-label="网站名称" @click="ChangeRouter('index')">
          <span alt="网站名称">码语人生</span>
        </div>
        <nav class="MediaRight">
          <div :class="Active == 6 ? 'MenuItemActive' : 'MenuItem'" @click="openUrl()">开放式后台</div>
          <div :class="Active == 5 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('analytics')">统计</div>
          <div :class="Active == 3 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('friend-url')">朋友圈</div>
          <div :class="Active == 4 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('about-me')">关于</div>
          <div :class="Active == 2 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('time-line')">时间轴</div>
          <div :class="Active == 1 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('message-board')">留言</div>
          <div :class="Active == 0 ? 'MenuItemActive' : 'MenuItem'" @click="ChangeRouter('index')">博文</div>
        </nav>
        <div class="avator_icon" @click="switchAccount()" :title=loginUser>
          <img :src=avatorUrl alt="avator">
        </div>
      </div>
    </div>
    <div class="MobileTopBar">
      <div class="MobileTopBarLogo" aria-label="网站名称" @click="ChangeRouter('index')">码语人生</div>
      <div class="MenuTopBarIcon" aria-expanded="false" aria-controls="mobile-menu" @click="OpenMenu()">
        <div class="MobileMenuSwitch">
          <span :class="OpenMobileMenu ? 'MenuButtonFirstGoOpen' : 'MenuButtonFirstGoClose'"></span>
          <span :class="OpenMobileMenu ? 'MenuButtonSecondGoOpen' : 'MenuButtonSecondGoClose'"></span>
          <span :class="OpenMobileMenu ? 'MenuButtonThirdGoOpen' : 'MenuButtonThirdGoClose'"></span>
        </div>
      </div>
    </div>

    <div class="MobileTopBarDiv" v-if="OpenMobileMenu"></div>
    <div class="MobileMenuDetail" v-if="OpenMobileMenu" @click="OpenMenu()">
      <nav class="MoblieMenuDetailContent" aria-label="移动端导航">
        <div :class="Active == 0 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
          @click="ChangeRouter('index')">博文
        </div>
        <div :class="Active == 1 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
          @click="ChangeRouter('message-board')">留言
        </div>
        <div :class="Active == 2 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
          @click="ChangeRouter('time-line')">时间轴
        </div>
        <div :class="Active == 4 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
          @click="ChangeRouter('about-me')">关于
        </div>
        <div :class="Active == 3 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
          @click="ChangeRouter('friend-url')">朋友圈
        </div>
        <div :class="Active == 5 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'"
          @click="ChangeRouter('analytics')">统计
        </div>
        <div :class="Active == 6 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'" @click="openUrl()">开放式后台
        </div>
      </nav>
      <div class="MoblieMenuDetailShade"></div>
    </div>
  </header>
</template>

<script>
import Store from '../../store';
export default {
  name: "PcTopBar",

  data: function () {
    return {
      OpenMobileMenu: false, //移动端菜单详情伸开、关闭
      avatorUrl: this.GetLocalStorage('SunqBlog').userInfo ? this.getIconAdress(this.GetLocalStorage('SunqBlog').userInfo.avator) : require("@/static/img/DefaultHeadIcon.jpg"),
      loginUser: this.GetLocalStorage('SunqBlog').userInfo ? "当前账号：" + this.GetLocalStorage('SunqBlog').userInfo.name : "未登录"
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

    openUrl: function () {
      window.open('https://codinglife.online/admin', '_blank');

      this.createLog({
        page: "开放式后台",
        action: "打开",
        actionObject: "开放式后台页面",
        actionDesc: ""
      });
    },

    // 伸缩 移动端菜单详情
    OpenMenu: function () {
      this.OpenMobileMenu = !this.OpenMobileMenu;
    },
    getIconAdress: function (iconNo) {
      return require("@/static/img/default_headicon_" +
        (iconNo || 0).toString() +
        ".jpeg");
    },
    switchAccount() {
      Store.commit('ChangeLogin', true);
    }
  },
  computed: {
    Active() {
      return Store.state.Active;
    }
  },
  watch: {
    '$store.state.loginSuccess'() {
      let iconNo = this.GetLocalStorage('SunqBlog').userInfo.avator;
      this.avatorUrl = this.getIconAdress(iconNo);
      this.loginUser = "当前账号：" + this.GetLocalStorage('SunqBlog').userInfo.name;
    }
  },
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

  .avator_icon {
    padding: 13px;
    margin-left: 20px;
    cursor: pointer;
  }

  .avator_icon img {
    width: 100%;
    height: 100%;
    border-radius: 20%;
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


  .MobileMenuSwitch {
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    margin-left: auto;
  }

  .MobileMenuSwitch span {
    display: block;
    width: 20px;
    height: 2px;
    background: @FontColorGray;

    margin: 0 auto 5px;
    position: relative;
    border-radius: 3px;
  }

  /*给移动端菜单按钮，第一个横杠设置动画*/
  .MenuButtonFirstGoOpen {
    animation: MenuButtonGoOpen 0.3s linear;
    animation-fill-mode: forwards;
  }

  .MenuButtonFirstGoClose {
    animation: MenuButtonGoClose 0.3s linear;
    animation-fill-mode: forwards;
  }

  @keyframes MenuButtonGoOpen {
    0% {
      -ms-transform: rotate(-8deg);
      /* IE 9 */
      transform: rotate(-8deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    25% {
      -ms-transform: rotate(-16deg);
      /* IE 9 */
      transform: rotate(-16deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    50% {
      -ms-transform: rotate(-25deg);
      /* IE 9 */
      transform: rotate(-25deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    75% {
      -ms-transform: rotate(-34deg);
      /* IE 9 */
      transform: rotate(-34deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    100% {
      -ms-transform: rotate(-43deg);
      /* IE 9 */
      transform: rotate(-43deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }


  }

  @keyframes MenuButtonGoClose {
    0% {
      -ms-transform: rotate(-43deg);
      /* IE 9 */
      transform: rotate(-43deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    25% {
      -ms-transform: rotate(-34deg);
      /* IE 9 */
      transform: rotate(-34deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    50% {
      -ms-transform: rotate(-25deg);
      /* IE 9 */
      transform: rotate(-25deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    75% {
      -ms-transform: rotate(-16deg);
      /* IE 9 */
      transform: rotate(-16deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    100% {
      -ms-transform: rotate(0deg);
      /* IE 9 */
      transform: rotate(0deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }
  }

  .MenuButtonSecondGoOpen {
    opacity: 0;
  }

  .MenuButtonSecondGoClose {
    -webkit-animation: MenutionGoCloseSeFloor 0.5s linear;
    -o-animation: MenutionGoCloseSeFloor 0.5s linear;
    animation: MenutionGoCloseSeFloor 0.5s linear;
    animation-fill-mode: forwards;
  }

  @keyframes MenutionGoCloseSeFloor {
    0% {
      /*background: white;*/
      opacity: 0;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  /*给移动端菜单按钮，第3个横杠设置动画*/
  .MenuButtonThirdGoOpen {
    animation: MenuButtonGoOpenThFloor 0.3s linear;
    animation-fill-mode: forwards;
  }

  .MenuButtonThirdGoClose {
    animation: MenuButtonGoCloseThFloor 0.3s linear;
    animation-fill-mode: forwards;
  }

  @keyframes MenuButtonGoOpenThFloor {
    0% {
      -ms-transform: rotate(8deg);
      /* IE 9 */
      transform: rotate(8deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    25% {
      -ms-transform: rotate(16deg);
      /* IE 9 */
      transform: rotate(16deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    50% {
      -ms-transform: rotate(25deg);
      /* IE 9 */
      transform: rotate(25deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    75% {
      -ms-transform: rotate(34deg);
      /* IE 9 */
      transform: rotate(34deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    100% {
      -ms-transform: rotate(43deg);
      /* IE 9 */
      transform: rotate(43deg);
      -moz-transform-origin: top right;
      -webkit-transform-origin: top right;
      -o-transform-origin: top right;
    }
  }

  @keyframes MenuButtonGoCloseThFloor {
    0% {
      -ms-transform: rotate(43deg);
      /* IE 9 */
      transform: rotate(43deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    25% {
      -ms-transform: rotate(34deg);
      /* IE 9 */
      transform: rotate(34deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    50% {
      -ms-transform: rotate(25deg);
      /* IE 9 */
      transform: rotate(25deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    75% {
      -ms-transform: rotate(16deg);
      /* IE 9 */
      transform: rotate(16deg);
      -moz-transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
    }

    100% {
      -ms-transform: rotate(0deg);
      /* IE 9 */
      transform: rotate(0deg);
      -moz-transform-origin: top right;
      -webkit-transform-origin: top right;
      -o-transform-origin: top right;
    }
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

  display: flex;
  align-items: center;
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
  width: 40%;
  font-size: 1rem;
  cursor: pointer;
  // color: @ThemeColor;
  color: @DefaultFontColor
}

.MediaRight {
  flex: 1px;
  width: 60%;
  .myflex('middle');
  text-align: right;
  flex-direction: row-reverse;
}

.MenuItem {
  padding: 0 20px;
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
