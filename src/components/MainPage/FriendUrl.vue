<template>
  <transition name="fade" mode="out-in">
    <div class="friend-content">
      <div class="FriendUrlBac">
        <div class="FriendUrlTitle">
          <div class="FriendUrlTitleText">我的试验田</div>
          <div class="CreateFriendUrlButton">你只管努力，收获的季节终会到来</div>
        </div>
      </div>
      <div class="UrlCardList FriendUrlCard">
        <div class="UrlCardTr">
          <div class="UrlCardTd" v-for="(item,i) in FriendsUrlList" v-bind:key="i" @click="UpdateRouter('BlogDetail',item)">
            <div class="lab-cover">
              <img v-bind:src="item.ArticleCover" v-if="item.ArticleCover">
            </div>
            <div class="UrlIconName">
              <div class="UrlName">{{ item.Title }}</div>
            </div>
            <div class="UrlSummary">{{ item.Summary }}</div>
          </div>
        </div>
        <div class="ListBottom" v-if="AticleBottom">你滑到我底线啦</div>
      </div>
    </div>
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
        FriendUrlNickName: '',
        FriendUrlAdress: '',
        FriendUrlDescript: '',
        FriendsUrlList: '',
        FriendUrlIcoUrl: '',
        // 弹框显隐动画
        FadeAnimate: false,

        // 文章底线
        AticleBottom: false,

        FriendUrlPlaceholder: true
      }
    },
    methods: {
      //初始化友链列表
      GetFriendUrlList: function () {
        var That = this,
          mvpUrl = [],//记录有标记的数据
          newArray;

        this.SQFrontAjax({
          Url: '/api/ArticleRead/foreend',
          UploadData: {
            PagnationData: {
              Skip: 0,
              Limit: 8
            },
            ArticleTag: '试验田',
            orderType:{  // 以优先级排序，需要传入此字段及值
              order:1
            }
          },
          Success: function (data) {
            That.FriendsUrlList = data;
          }
        });
      },
      // 切换路由
      UpdateRouter: function (RouterName, articleMessage) {
        if (articleMessage._id) {
          this.$router.push({
            name: RouterName,
            query: {
              _id:articleMessage._id,
              Title:articleMessage.Title,
              from:'试验田'
            }
          });
        } else {
          this.bus.$emit('TopBar', {
            Active: 1,
            MobileMenuActive: 1
          });
          this.$router.push({
            name: RouterName
          });
        }
      },
    },
    mounted: function () {
      this.GetFriendUrlList();
      // 切换Topbar高亮
      Store.commit("ChangeActive", 3);
      Store.commit("changeFooter",true); // 展示footer

      // 创建日志
      this.createLog({
        moduleType:'menu',
        operateType:'选择菜单',
        operateContent:'试验田'
      });
    },
  }
</script>

<style scoped lang="less">
  @import '../../static/css/FriendUrl';
</style>
