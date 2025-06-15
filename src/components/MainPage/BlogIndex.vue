<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="TopBarHeight"></div>
      <div class="BlogIndexContent">
        <div class="BlogFlex">
          <section class="BlogIndexContentLeft">
            <!-- <img src="../../static/img/ArticleList.jpg" v-if="DefaultGraph.ArticleListPart"
              class="BlogIndexContentLeftDefaultGraph"> -->
            <div class="ArticleItem" v-for="(item, i) in ArticleList" v-bind:key="i"
              @click="UpdateRouter('BlogDetail', item)">
              <div class="ArticleItemCover">
                <img
                  :src="item.articleCover ? item.articleCover : require('../../static/img/default_article_cover.jpeg')"
                  class="ArticleItemCoverImg"> <!-- 使用原生懒加载 -->
              </div>
              <div style="flex: 1">
                <div class="ArticleTitle">
                  <!--<div class="ArticleTag">{{ item.ArticleTag }}</div>-->
                  <h3 class="ArticleTitleText">{{ item.title }}</h3>
                </div>
                <div class="ArticleContent"
                  v-html="`<span class='author-name'>${item.createName}</span>：${item.summary}`"></div>
                <div class="ArticleFooter">
                  <!--<div class="ArticleFooterItem">发表：{{ item.createTime }}</div>
                  <div class="ArticleFooterItem" @click="UpdateRouter('BlogDetail',item._id)">评论：{{ item.commentNum }}</div>-->
                  <!--<div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-yueduliang iconBlogIndex"></i>1000
                  </div>-->
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-biaoqian iconBlogIndex"></i>{{ item.articleTagName }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-shijianzhongbiao iconBlogIndex"></i>{{ item.createTime }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-yueduliang iconBlogIndex"></i>{{ item.pageViewNum }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-pinglun iconBlogIndex"></i>{{ item.commentNum }}
                  </div>
                </div>
              </div>
            </div>
            <div class="NoDataHint" v-if="!ArticleList.length">暂无数据</div>
            <div class="ListBottom" v-if="AticleBottom">你滑到我底线啦</div>
            <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
          </section>
          <aside class="BlogIndexContentRight blogindex-page" v-if="isDeskTop" v-bind:style="{ top: stickyTop }">
            <section class="Module ArticleTagModule">
              <transition name="Fade">
                <img src="../../static/img/Tag.jpg" v-if="DefaultGraph.ArticleTagPart">
              </transition>
              <div class="TagListHead">文章分类<span style="color: #aaa;font-size: 0.8rem">（点击筛选呦）</span></div>
              <div class="TagListTr">
                <div :class="item.id != Tags.Active ? 'TagListTd' : 'TagListTdActive'" v-for="item in Tags"
                  :key="item.id" @click="GetArticle(item.id)">{{ item.name }}
                </div>
              </div>
            </section>
            <section class="Module" style="padding: 0 0 0.5rem" @mouseenter="enter(true)" @mouseleave="enter(false)">
              <div class="TopBack"></div>
              <div class="ZhihuIcon">
                <img src="../../static/img/ZhihuIcon.jpg">
              </div>
              <div class="TextCenter">
                <b>编程 & 人生</b>
                <a class="BlueButton" :class="buttonAnimate ? 'open_animate' : ''" href="https://github.com/SunQQQ"
                  target="_blank" @click="readCode()">博客源码</a>
              </div>
              <div class="BlogStatistic">
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">{{ ArticleNum }}</div>
                  <div class="BlogStatisticItemText">文章数量</div>
                </div>
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">{{ commentNum }}</div>
                  <div class="BlogStatisticItemText">评论数量</div>
                </div>
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">{{ LeaveMessageNum }}</div>
                  <div class="BlogStatisticItemText">留言量</div>
                </div>
              </div>
            </section>
            <section class="Module HotArticleModule">
              <transition name="Fade">
                <img src="../../static/img/HotArticleList.jpg" v-if="DefaultGraph.HotArticlePart">
              </transition>
              <div class="TagListHead">热门博文</div>
              <div class="HotArticle">
                <div class="HotArticleItem" v-for="(Item, Index) in HotArticleList" v-bind:key="Index">
                  <div v-if="Index == 0" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#f44e03;font-size: 15px">No{{ Index + 1 }} </span>{{ Item.title }}
                  </div>
                  <div v-if="Index == 1" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#d41800;font-size: 15px">No{{ Index + 1 }} </span>{{ Item.title }}
                  </div>
                  <div v-if="Index == 2" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#f37e21;font-size: 15px">No{{ Index + 1 }} </span>{{ Item.title }}
                  </div>
                  <div v-if="Index == 3" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#f3212d;font-size: 15px">No{{ Index + 1 }} </span>{{ Item.title }}
                  </div>
                  <div v-if="Index == 4" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#212df3;font-size: 15px">No{{ Index + 1 }} </span>{{ Item.title }}
                  </div>
                  <div v-if="Index > 4" @click="UpdateRouter('BlogDetail', Item)">
                    <span>No{{ Index + 1 }} </span>{{ Item.title }}
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
      <Heartfelt v-if="isDeskTop"></Heartfelt>
    </div>
  </transition>
</template>

<script>
import Heartfelt from '../SonCompnent/Heartfelt'; import Pagination from '../SonCompnent/Pagination';
import Store from '../../store'

export default {
  name: "BlogIndex",
  components: {
    Heartfelt,
    Pagination
  },
  data: function () {
    return {
      Tags: [],// 标签量
      ArticleList: [],// 文章列表        
      ArticleNum: 0,// 文章量     
      LeaveMessageNum: 0,// 留言量        
      commentNum: 0,// 博客评论量
      HotArticleList: [],// 热门文章列表
      AticleBottom: false,// 文章底线
      buttonAnimate: false, // 首页源码入口动画效果
      // 缺省图
      DefaultGraph: {
        ArticleListPart: true,
        HotArticlePart: true,
        ArticleTagPart: true
      },
      stickyTop: 0,
      perPageNum: 8, // 每页文章数量
      windowWidth: window.innerWidth,
      isDeskTop: window.innerWidth > 768 // 是否是桌面端
    }
  },
  methods: {
    InitArticleTag: function (That) {
      // 初始化标签列表
      this.SQFrontAjax({
        Url: '/api/getDictionaryList',
        UploadData: {
          parentId: 1
        },
        Success: function (data) {
          That.Tags = data;
          That.Tags.Active = 0;
          That.DefaultGraph.ArticleTagPart = false;
        }
      });
    },
    // 获取文章列表
    GetArticle: function (tagId) {
      var That = this;

      this.SQFrontAjax({
        Url: '/api/getUserBlogList',
        UploadData: {
          start: 0,
          size: That.perPageNum,
          // 0查询全部文章
          tag: (tagId == That.Tags.Active) ? 0 : tagId
        },
        Success: function (data) {
          // 选中后，高亮。且点击高亮标签时，取消选中
          if (That.Tags.Active == tagId) {
            That.Tags.Active = 0;
          } else {
            That.Tags.Active = tagId;
          }

          data.list.forEach(function (Item) {
            Item.createTime = Item.createTime.slice(0, 10);
          });
          That.DefaultGraph.ArticleListPart = false;// 隐藏骨架屏
          That.ArticleList = data.list;
          That.ArticleNum = data.total;
        }
      });
    },
    // 获取留言数量
    GetLeaveMessageNum: function () {
      var That = this;
      this.SQFrontAjax({
        Url: '/api/getLmCount',
        Success: function (data) {

          var NumInterval = window.setInterval(function () {
            That.LeaveMessageNum += 1;
            if (data == That.LeaveMessageNum) {
              clearInterval(NumInterval);
            }
          }, 30);
        }
      });
    },
    // 获取评论数量
    GetCommentNum: function () {
      var That = this;
      this.SQFrontAjax({
        Url: '/api/getCommentCount',
        Success: function (data) {

          var NumInterval = window.setInterval(function () {
            That.commentNum += 1;
            if (data == That.commentNum) {
              clearInterval(NumInterval);
            }
          }, 30);
        }
      });
    },
    //处理翻页
    ValueByPagition: function (SelectPage) {
      var That = this;
      this.SQFrontAjax({
        Url: '/api/getUserBlogList',
        UploadData: {
          start: SelectPage * That.perPageNum,
          size: That.perPageNum,
          tag: That.Tags.Active
        },
        Success: function (data) {
          data.list.forEach(function (Item) {
            Item.createTime = Item.createTime.slice(0, 10);
          });
          That.ArticleList = That.ArticleList.concat(data.list);

          if (data.list.length != That.perPageNum) {
            That.AticleBottom = true;
            // 停止分页器的滚动监听
            That.$refs.Pagi.SetUpdate(false);
            // 下拉到底部后，展示footer
            Store.commit("changeFooter", true);
          } else {
            That.$refs.Pagi.SetUpdate(true);

            // 还有分页时，隐藏footer
            Store.commit("changeFooter", false);
          }
        }
      });
    },
    // 切换路由
    UpdateRouter: function (RouterName, articleMessage) {
      if (articleMessage.id) {
        this.$router.push({
          name: RouterName,
          params: {
            id: articleMessage.id
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
    //获取热门文章
    GetHotArticle: function (topNum) {
      var That = this;
      this.SQFrontAjax({
        Url: '/api/getHotList',
        UploadData: {
          topNum: topNum
        },
        Success: function (data) {
          That.HotArticleList = data;
          That.DefaultGraph.HotArticlePart = false;
        }
      });
    },
    // 查看源码
    readCode: function () {
      // 创建日志
      this.createLog({
        page: "博文",
        action: "点击",
        actionObject: "博客源码按钮",
        actionDesc: ""
      });
    },
    // 监控gitHub模块DOM的鼠标滑入划出事件，鼠标悬停时打开源码按钮动画效果，移出时关闭动画
    enter: function (status) {
      this.buttonAnimate = status;
    },
    calculatePageSize() {
      if (this.windowWidth < 1366) {
        this.perPageNum = 3 // 移动端和小屏设备
      } else if (this.windowWidth >= 1366 && this.windowWidth < 1600) {
        this.perPageNum = 4 // 14寸笔记本
      } else if (this.windowWidth >= 1600 && this.windowWidth < 1920) {
        this.perPageNum = 5 // 15.6寸笔记本
      } else {
        this.perPageNum = 8 // 大屏幕
      }
    }
  },
  mounted: function () {
    let that = this;

    Store.commit("ChangeActive", 0); // 切换Topbar高亮

    this.GetArticle(0);

    if(this.isDeskTop){
      that.GetHotArticle(6);
      that.InitArticleTag(this);
      
      // //渲染留言个数
      this.GetLeaveMessageNum();
      this.GetCommentNum();
    }

    // 超大分辨率下，不再设置margin-top值
    if (window.innerHeight < 1042) {
      this.stickyTop = -(942.3 - window.innerHeight + 76) + 46 + 'px'; // 设置右侧区域粘性布局的top高度
    } else {
      this.stickyTop = 60 + "px"; // 把导航栏的距离留出来
    }

    Store.commit("changeFooter", false); // 初始化时隐藏footer
  },
  created: function(){
    // 根据不同设备，动态设置每页文章数量
    this.calculatePageSize();
  }
}
</script>

<style scoped lang="less">
@import "../../static/css/BlogIndex";
</style>
