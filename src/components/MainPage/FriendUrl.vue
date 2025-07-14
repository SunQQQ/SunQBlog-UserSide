<template>
  <transition name="fade" mode="out-in">
    <main>
      <h1 class="mainTitle">开发者资源导航</h1>
      <div class="FriendUrlBac">
        <div class="FriendUrlTitle">
          <div class="FriendUrlTitleText">开源朋友圈</div>
          <div class="CreateFriendUrlButton" @click="OpenPopup">我也加入</div>
        </div>
      </div>
      <div class="UrlCardList FriendUrlCard">
        <div class="UrlCardTr">
          <transition name="Fade">
            <img src="../../static/img/FriendUrlPlaceholder.png" class="FriendUrlPlaceholderPC"
              v-if="FriendUrlPlaceholder">
          </transition>
          <transition name="Fade">
            <img src="../../static/img/ArticleList.jpg" class="FriendUrlPlaceholderMobile" v-if="FriendUrlPlaceholder">
          </transition>
          <div class="UrlCardTd" v-for="item in FriendsUrlList" @click="OpenFriendUrl(item.siteUrl)" :key="item.id">
            <div class="UrlIconName">
              <img v-bind:src="item.siteLogo" v-if="item.siteLogo">
              <img src="../../static/img/DefaultHeadIcon.jpg" v-if="!item.siteLogo">

              <div class="UrlName">{{ item.siteName }}</div>
            </div>
            <div class="UrlSummary">{{ item.siteDesc }}</div>
          </div>
        </div>
        <div class="ListBottom" v-if="AticleBottom">你滑到我底线啦</div>
        <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
      </div>
      <div class="PopupWindow" v-show="Wrapper">
        <div class="FriendUrlWrapper" @click="ClosePopup"></div>
        <div :class="FadeAnimate ? 'FriendUrlCreateWindowFadeIn' : 'FriendUrlCreateWindowFadeOut'">
          <div class="FriendUrlCreateWindowHeader">
            站点信息<span @click="ClosePopup"><i class="iconfont icon-fork IconfontSize"></i></span>
          </div>
          <div class="FriendUrlCreateWindowItem">
            <div class="FriendUrlCreateWindowItemLeft">站点名称：</div>
            <div class="FriendUrlCreateWindowItemRight">
              <input v-model="siteName" />
            </div>
          </div>
          <div class="FriendUrlCreateWindowItem">
            <div class="FriendUrlCreateWindowItemLeft">站点地址：</div>
            <div class="FriendUrlCreateWindowItemRight">
              <input v-model="siteUrl" />
            </div>
          </div>
          <div class="FriendUrlCreateWindowItem">
            <div class="FriendUrlCreateWindowItemLeft">logo地址：</div>
            <div class="FriendUrlCreateWindowItemRight">
              <input v-model="siteLogo" placeholder="" />
            </div>
          </div>
          <div class="FriendUrlCreateWindowItem">
            <div class="FriendUrlCreateWindowItemLeft">站点描述：</div>
            <div class="FriendUrlCreateWindowItemRight">
              <input v-model="siteDesc" />
            </div>
          </div>
          <div class="FriendUrlCreateWindowFooter">
            <div class="siteSubmitButton" @click="siteSubmit">提交</div>
            <div class="siteSubmitButton FriendUrlCancelButton" @click="ClosePopup">取消</div>
          </div>
        </div>
      </div>
    </main>
  </transition>
</template>

<script>
import Pagination from '../SonCompnent/Pagination';
import Store from '../../store'

export default {
  name: "FriendUrl",
  components: {
    Pagination: Pagination
  },
  data: function () {
    return {
      Wrapper: false,
      siteName: '',
      siteUrl: '',
      siteDesc: '',
      FriendsUrlList: [],
      siteLogo: '',
      // 弹框显隐动画
      FadeAnimate: false,
      // 文章底线
      AticleBottom: false,
      FriendUrlPlaceholder: true,
      pageSize: 24, // 每页显示的条数
      curPage: 0 // 当前页码
    }
  },
  methods: {
    // 关闭弹框
    ClosePopup: function () {
      var That = this;
      this.FadeAnimate = false;
      setTimeout(function () {
        That.Wrapper = false;
      }, 200)
    },
    // 弹出弹框
    OpenPopup: function () {
      this.Wrapper = true;
      this.FadeAnimate = true;
    },
    // 提交友链
    siteSubmit: function () {
      var That = this;
      if (this.siteName && this.siteUrl && this.siteDesc && this.siteLogo) {
        this.SQFrontAjax({
          Url: '/api/addSite',
          UploadData: {
            siteName: this.siteName,
            siteUrl: this.siteUrl,
            siteDesc: this.siteDesc,
            siteLogo: this.siteLogo
          },
          Success: function () {
            Store.commit('ChangeTip', {
              Show: true,
              Title: '提交成功'
            });
            That.ClosePopup();

            // 以下是刷新列表
            That.getSiteList(0);
            // 重置分页器（假设支持 reset 方法）
            if (That.$refs.Pagi && That.$refs.Pagi.reset) {
              That.$refs.Pagi.reset();
            }
          }
        });
      } else {
        Store.commit('ChangeTip', {
          Show: true,
          Title: '请完善网站信息'
        });
      }
    },
    OpenFriendUrl: function (Url) {
      window.open(Url);
    },
    //初始化友链列表
    getSiteList: function (start) {
      var That = this;
      That.curPage = start;
      this.SQFrontAjax({
        Url: '/api/getSiteList',
        UploadData: {
          start: start * That.pageSize,
          size: That.pageSize
        },
        Success: function (data) {
          That.FriendUrlPlaceholder = false;
          That.FriendsUrlList = start === 0 ? data : That.FriendsUrlList.concat(data);

          That.$refs.Pagi.SetUpdate(data.length === That.pageSize); // 如果数据满一页，允许继续加载
          That.AticleBottom = data.length < That.pageSize;
          Store.commit("changeFooter", data.length < That.pageSize);
        }
      });
    },
    ValueByPagition: function (start) {
      var That = this;
      That.getSiteList(start);
    }
  },
  mounted: function () {
    this.getSiteList(0);
    Store.commit("ChangeActive", 3);    // 切换Topbar高亮
  },
}
</script>

<style scoped lang="less">
@import '../../static/css/FriendUrl';
</style>
