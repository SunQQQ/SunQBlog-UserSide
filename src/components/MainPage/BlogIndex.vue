<template>
    <transition name="Fade" mode="out-in">
    <div>
        <div class="TopBarHeight"></div>
        <div class="BlogIndexContent">
            <div class="BlogFlex">
                <div class="BlogIndexContentLeft">
                    <transition name="Fade">
                        <img src="../../static/img/ArticleList.jpg" v-if="DefaultGraph.ArticleListPart"
                             class="BlogIndexContentLeftDefaultGraph">
                    </transition>
                    <div class="ArticleItem" v-for="(item,i) in ArticleList" v-bind:key="i"
                         @click="UpdateRouter('BlogDetail',item._id)">
                        <div class="ArticleItemCover" v-if="item.ArticleCover">
                            <img :src="item.ArticleCover">
                        </div>
                        <div style="flex: 1">
                            <div class="ArticleTitle">
                                <!--<div class="ArticleTag">{{ item.ArticleTag }}</div>-->
                                <h3 class="ArticleTitleText">{{ item.Title }}</h3>
                            </div>
                            <div class="ArticleContent" v-html="item.Summary">
                                {{ item.Summary }}
                            </div>
                            <div class="ArticleFooter">
                                <!--<div class="ArticleFooterItem">发表：{{ item.CreateDate }}</div>
                                <div class="ArticleFooterItem" @click="UpdateRouter('BlogDetail',item._id)">评论：{{ item.CommentNum }}</div>-->
                                <div class="ArticleFooterItem" style="border: none">
                                    <i class="iconfont icon-biaoqian iconBlogIndex"></i>{{ item.ArticleTag }}
                                </div>
                                <div class="ArticleFooterItem" style="border: none">
                                    <i class="iconfont icon-shijianzhongbiao iconBlogIndex"></i>{{ item.CreateDate }}
                                </div>
                                <div class="ArticleFooterItem" style="border: none" v-show="item.CommentNum">
                                    <i class="iconfont icon-pinglun iconBlogIndex"></i>{{ item.CommentNum }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="NoDataHint" v-if="!ArticleList.length">暂无数据</div>
                    <div class="ListBottom" v-if="AticleBottom">你滑到我底线啦</div>
                    <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
                </div>
                <div class="BlogIndexContentRight">
                    <div class="Module HotArticleModule">
                        <transition name="Fade">
                            <img src="../../static/img/HotArticleList.jpg" v-if="DefaultGraph.HotArticlePart">
                        </transition>
                        <div class="TagListHead">热门博文</div>
                        <div class="HotArticle">
                            <div class="HotArticleItem" v-for="(Item,Index) in HotArticleList">
                                <div v-if="Index == 0" @click="UpdateRouter('BlogDetail',Item._id)">
                                    <span style="color:#3dbd7d">No{{Index+1}} </span>{{Item.Title}}
                                </div>
                                <div v-if="Index == 1" @click="UpdateRouter('BlogDetail',Item._id)">
                                    <span style="color:#f46e65">No{{Index+1}} </span>{{Item.Title}}
                                </div>
                                <div v-if="Index == 2" @click="UpdateRouter('BlogDetail',Item._id)">
                                    <span style="color:#948aec">No{{Index+1}} </span>{{Item.Title}}
                                </div>
                                <div v-if="Index > 2" @click="UpdateRouter('BlogDetail',Item._id)">
                                    <span>No{{Index+1}} </span>{{Item.Title}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Module" style="padding: 0 0 0.5rem">
                        <div class="TopBack"></div>
                        <div class="ZhihuIcon">
                            <img src="../../static/img/ZhihuIcon.jpg">
                        </div>
                        <div class="TextCenter">
                            孙权的小博客
                            <a class="BlueButton" href="https://github.com/SunQQQ">欢迎你呦</a>
                        </div>
                        <div class="BlogStatistic">
                            <div class="BlogStatisticItem">
                                <div class="BlogStatisticItemNum">{{ ArticleNum }}</div>
                                <div class="BlogStatisticItemText">博客文章</div>
                            </div>
                            <div class="BlogStatisticItem">
                                <div class="BlogStatisticItemNum">{{ CommentNum }}</div>
                                <div class="BlogStatisticItemText">博文评论</div>
                            </div>
                            <div class="BlogStatisticItem">
                                <div class="BlogStatisticItemNum">{{ LeaveMessageNum }}</div>
                                <div class="BlogStatisticItemText">留言量</div>
                            </div>
                        </div>
                    </div>
                    <div class="Module ArticleTagModule">
                        <transition name="Fade">
                            <img src="../../static/img/Tag.jpg" v-if="DefaultGraph.ArticleTagPart">
                        </transition>
                        <div class="TagListHead">文章分类<span style="color: #aaa;font-size: 0.8rem">（点击筛选呦）</span></div>
                        <div class="TagListTr">
                            <div :class="item.TagName != Tags.Active ? 'TagListTd' : 'TagListTdActive'"
                                 v-for="item in Tags" :key="item.id" @click="GetArticle(item.TagName)">{{ item.TagName
                                }}
                            </div>
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
  import Heartfelt from '../SonCompnent/Heartfelt';
  import Pagination from '../SonCompnent/Pagination';

  export default {
    name: "BlogIndex",
    components: {
      Heartfelt,
      Pagination
    },
    data: function () {
      return {
        // 标签量
        Tags: [],
        // 文章列表
        ArticleList: [],
        // 文章量
        ArticleNum: 0,
        // 留言量
        LeaveMessageNum: 0,
        // 博客评论量
        CommentNum: 0,
        // 热门文章列表
        HotArticleList: [],
        // 文章底线
        AticleBottom: false,

        // 缺省图
        DefaultGraph: {
          ArticleListPart: true,
          HotArticlePart: true,
          ArticleTagPart: true
        }
      }
    },
    methods: {
      InitArticleTag: function (That) {
        // 初始化标签列表
        this.SQFrontAjax({
          Url: '/api/TagRead/foreend',
          Success: function (data) {
            That.Tags = data;
            That.Tags.Active = '';
            That.DefaultGraph.ArticleTagPart = false;
          }
        });

        // 获取文章列表
        this.GetArticle('');
        //渲染文章
        this.GetArticleNum();
        //渲染留言个数
        this.GetLeaveMessageNum();
        // 渲染评论个数
        this.GetCommentNum();
        //渲染热门博文
        this.GetHotArticle();
      },
      // 获取文章列表
      GetArticle: function (ArticleTag) {
        var That = this;

        this.SQFrontAjax({
          Url: '/api/ArticleRead/foreend',
          UploadData: {
            PagnationData: {
              Skip: 0,
              Limit: 8
            },
            ArticleTag: ArticleTag
          },
          Success: function (data) {
            // 高亮
            That.Tags.Active = ArticleTag;

            data.forEach(function (Item) {
              Item.CreateDate = Item.CreateDate.slice(0, 10);
            });
            That.ArticleList = data;

            That.DefaultGraph.ArticleListPart = false;
          }
        });
      },
      // 获取留言数量
      GetLeaveMessageNum: function () {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/getmessagenum',
          Success: function (data) {

            var NumInterval = window.setInterval(function () {
              That.LeaveMessageNum += 1;
              if(data == That.LeaveMessageNum){
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
          Url: '/api/ArticleRead/foreend',
          UploadData: {
            PagnationData: {
              Skip: SelectPage * 8,
              Limit: 8
            },
            ArticleTag: That.Tags.Active
          },
          Success: function (data) {
            data.forEach(function (Item) {
              Item.CreateDate = Item.CreateDate.slice(0, 10);
            });
            That.ArticleList = That.ArticleList.concat(data);
            if (data.length != 8) {
              That.AticleBottom = true;
              // 停止分页器的滚动监听
              That.$refs.Pagi.SetUpdate(false);
            } else {
              That.$refs.Pagi.SetUpdate(true);
            }
          }
        });
      },
      // 获取评论数量
      GetCommentNum: function () {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/getcommentnum',
          Success: function (data) {

            var NumInterval = window.setInterval(function () {
              That.CommentNum += 1;
              if(data == That.CommentNum){
                clearInterval(NumInterval);
              }
            }, 30);
          }
        });
      },
      // 切换路由
      UpdateRouter: function (RouterName, Id) {
        if (Id) {
          /*this.$router.push({
            name:RouterName,
            params:{
              ID:Id
            }
          });*/
          this.$router.push({
            name: RouterName,
            query: {
              ID: Id
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
      //获取文章数量
      GetArticleNum: function () {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/getarticlenum/foreend',
          Success: function (data) {
            var NumInterval = window.setInterval(function () {
              That.ArticleNum += 1;
              if(data == That.ArticleNum){
                clearInterval(NumInterval);
              }
            }, 30);
          }
        });
      },
      //获取热门文章
      GetHotArticle: function () {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/HotArticleRead/foreend',
          Success: function (data) {
            That.HotArticleList = data;
            That.DefaultGraph.HotArticlePart = false;
          }
        });
      }
    },
    created: function () {
      // 初始化返回顶部
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0;
    },
    mounted: function () {
      this.InitArticleTag(this);
      // 切换Topbar高亮
      this.bus.$emit('Topbar', {
        Active: 0,
        MobileMenuActive: 0
      });
    }
  }
</script>

<style scoped lang="less">
    @import "../../static/css/BlogIndex";
</style>