<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="FlexContent">
        <div class="LeftPart">
          <div class="BigBlock main-text">
            <div class="TitleFontLine">博客特色</div>
            <p>
              <i
                class="iconfont icon-person AboutMeIcon"
                style="color: #49a9ee"
              ></i
              >本博客不强制游客注册/登录，留言/评论等功能只需填入昵称，即可使用。
            </p>
            <p>
              <i
                class="iconfont AboutMeIcon icon-github"
                style="color: #948aec"
              ></i
              >博客对外开放管理后台、流量数据、所有源码等，分享技术，毫无保留。
            </p>
            <p>
              <i
                class="iconfont AboutMeIcon icon-fuwuqi"
                style="color: #f78e3d"
              ></i
              >博客用户端、管理后台、后端接口、UI设计、服务器部署全部由一人维护。持续优化，随时更新。
            </p>
            <p>
              <i
                class="iconfont icon-tool AboutMeIcon"
                style="color: #3db8c1"
              ></i
              >已实现各种父子组件、数据缓存、防抖节流、用户轨迹、首屏优化、访问数据分析等功能。
            </p>
            <p>
              <i
                class="iconfont icon-aihao1 AboutMeIcon"
                style="color: #f46e65"
              ></i
              >跪求Github一赞，点个星星将是对开源开发者的最大支持与鼓励！
            </p>
          </div>

          <div class="BigBlock AboutMeMarginTop main-text">
            <div class="TitleFontLine">博客技术</div>
            <p>
              <i
                class="iconfont AboutMeIcon icon-wangzhanxinxi"
                style="color: #f46e65"
              ></i
              >本博客纯手工编写，未使用第三方建站或流量统计工具。代码开源，欢迎匡正
            </p>
            <p>
              <i
                class="iconfont AboutMeIcon icon-quanju_qianduanjiemian"
                style="color: #3dbd7d"
              ></i
              >用户端手写的UI组件 + Vue.js，管理端使用ElementUI + Vue.js
            </p>
            <p>
              <i
                class="iconfont AboutMeIcon icon-fuwuqi"
                style="color: #f78e3d"
              ></i
              >服务端语言使用node.js、框架使用Express，博客部署在腾讯云、使用Linux服务器
            </p>
            <p>
              <i
                class="iconfont AboutMeIcon icon-dataBase"
                style="color: #49a9ee"
              ></i
              >数据库使用MongoDB，可视化工具用的Robo 3T
            </p>
            <p>
              <i
                class="iconfont AboutMeIcon icon-github"
                style="color: #948aec"
              ></i
              >用户端/管理端/后端代码：<a
                href="https://github.com/SunQQQ"
                target="_blank"
                >GitHub地址</a
              >。整套代码都在这了
            </p>
          </div>

          <div class="BigBlock AboutMeMarginTop main-text">
            <div class="TitleFontLine">关于博主</div>
            <p>
              <i
                class="iconfont icon-person AboutMeIcon"
                style="color: #49a9ee"
              ></i
              >博主名字叫孙权，94年人，软件工程本科毕业，从事前端开发岗位。
            </p>
            <p>
              <i
                class="iconfont icon-aihao1 AboutMeIcon"
                style="color: #f46e65"
              ></i
              >兴趣：编码、篮球、跑步、吉他。喜爱车评、历史记录片、交朋友
            </p>
            <p>
              <i
                class="iconfont icon-tool AboutMeIcon"
                style="color: #3db8c1"
              ></i
              >熟悉的技术有：Layui、ElementUI、Vue.js、Node.js、JavaScript
            </p>
            <p>
              <i
                class="iconfont icon-biaoqian AboutMeIcon"
                style="color: #3dbd7d"
              ></i
              >别人评价较多：阳光开朗、靠谱伙伴、待人亲切
            </p>
            <p>
              <i
                class="iconfont icon-xiazai20 AboutMeIcon"
                style="color: #948aec"
              ></i
              >家庭住址：郑州市 二七区 南三环
            </p>
            <p>
              <i
                class="iconfont icon-weixin AboutMeIcon"
                style="color: #f78e3d"
              ></i
              >微信：13213074006，欢迎进前端分享群、商业合作等
            </p>
          </div>

          <div class="BigBlock AboutMeMarginTop">
            <div class="TitleFontLine TitleFontLineThank">Thanks You All</div>
            <div class="UrlCardTr AboutPage">
              <a
                class="UrlCardTd UrlCardTdBc about-url-card"
                href="https://surmon.me/"
                target="_blank"
              >
                <div class="UrlIconName UrlIconNameMargin">
                  <img
                    src="data:image/png;base64,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"
                  />
                  <div class="about-UrlName">Surmon.me</div>
                </div>
              </a>
              <a
                class="UrlCardTd UrlCardTdBc about-url-card"
                href="http://bh-lay.com/"
                target="_blank"
              >
                <div class="UrlIconName UrlIconNameMargin">
                  <img src="http://bh-lay.com/touch-icon-ipad-retina.png" />
                  <div class="about-UrlName">小剧博客</div>
                </div>
              </a>
              <a
                class="UrlCardTd UrlCardTdBc about-url-card"
                href="https://smohan.net/"
                target="_blank"
              >
                <div class="UrlIconName UrlIconNameMargin">
                  <img src="http://bh-lay.com/touch-icon-ipad-retina.png" />
                  <div class="about-UrlName">水墨寒的博客</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="RightPart">
          <div
            class="GitPart"
            @mouseenter="setButtonAnimate(true)"
            @mouseleave="setButtonAnimate(false)"
          >
            <div class="TopBackBlack"></div>
            <div class="GitPic">
              <img src="../../static/img/ZhihuIcon.jpg" />
            </div>
            <div class="GitBack">
              <i class="iconfont TopBackBlackGit icon-github1"></i>
            </div>
            <div class="Content">
              <div class="GitName">孙权的Github</div>
              <a
                class="BlueButton"
                :class="buttonAnimate ? 'open_animate' : ''"
                href="https://github.com/SunQQQ"
                target="_blank"
                >博客源码</a
              >
              <div class="BlogStatistic">
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">49</div>
                  <div class="BlogStatisticItemText AboutMeGitData">
                    Followers
                  </div>
                </div>
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">160</div>
                  <div class="BlogStatisticItemText AboutMeGitData">Star</div>
                </div>
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">17</div>
                  <div class="BlogStatisticItemText AboutMeGitData">
                    Repositories
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="BigBlock AboutMeMarginTop">
            <div class="TitleFontLine">联系我</div>
            <div
              class="BlogStatistic"
              style="border-top: none; padding-bottom: 0"
            >
              <div class="BlogStatisticItem">
                <a href="https://github.com/SunQQQ" target="_blank"
                  ><i
                    class="iconfont icon-github AboutMeIcon"
                    style="color: #948aec"
                  ></i
                ></a>
              </div>
              <div class="BlogStatisticItem my-pointer" @click="infoMessage('13213074006')">
                <i
                    class="iconfont AboutMeIcon icon-weixin"
                    style="color: #f46e65"
                  ></i>
              </div>
              <div class="BlogStatisticItem my-pointer" @click="infoMessage('1585437938@qq.com')">
                <i
                  class="iconfont icon-youxiang AboutMeIcon"
                  style="color: #49a9ee"
                ></i>
              </div>
              <div class="BlogStatisticItem">
                <a
                  href="https://www.zhihu.com/people/s-q-51-44-23/activities"
                  target="_blank"
                  ><i
                    class="iconfont icon-zhihu AboutMeIcon"
                    style="color: #3dbd7d"
                  ></i
                ></a>
              </div>
              <div class="BlogStatisticItem">
                <a href="https://blog.csdn.net/sun_qqq" target="_blank"
                  ><i
                    class="iconfont icon-CN_csdnnet AboutMeIcon"
                    style="color: #f78e3d"
                  ></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Heartfelt></Heartfelt>
    </div>
  </transition>
</template>

<script>
import Heartfelt from "../SonCompnent/Heartfelt";
import Store from "../../store";

export default {
  name: "AboutMe",
  data: function () {
    return {
      buttonAnimate: false,
    };
  },
  components: {
    Heartfelt,
  },
  methods: {
    // 设置按钮动画的开始与停止
    setButtonAnimate: function (status) {
      this.buttonAnimate = status;
    },
    // 联系我的弹出框
    infoMessage: (message) => {
      Store.commit('ChangeTip', {
          Show: true,
          Title: message
        });
    }
  },
  mounted: function () {
    Store.commit("ChangeActive", 4); // 切换Topbar高亮
    Store.commit("changeFooter",true); // 展示footer 

    this.createLog({
      moduleType: "menu",
      operateType: "选择菜单",
      operateContent: "关于",
    });
  },
};
</script>

<style scoped lang="less">
@import "../../static/css/AboutMe";
.about-UrlName {
  font-size: 14px;
  height: 1rem;
  padding-left: 0.5rem;
}
.about-url-card {
  padding: 0;
}
</style>
