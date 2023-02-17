<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="TopBarHeight"></div>
      <div class="BlogIndexContent">
        <div class="BlogFlex">
          <div class="BlogIndexContentLeft">
            <img src="../../static/img/ArticleList.jpg" v-if="DefaultGraph.ArticleListPart"
                 class="BlogIndexContentLeftDefaultGraph">
            <div class="ArticleItem" v-for="(item,i) in ArticleList" v-bind:key="i"
                 @click="UpdateRouter('BlogDetail',item)">
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
                  <!--<div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-yueduliang iconBlogIndex"></i>1000
                  </div>-->
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-biaoqian iconBlogIndex"></i>{{ item.ArticleTag }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-shijianzhongbiao iconBlogIndex"></i>{{ item.CreateDate }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-yueduliang iconBlogIndex"></i>{{ item.articleReadNum ? item.articleReadNum : 0 }}
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
          <div class="BlogIndexContentRight blogindex-page" v-bind:style="{ top: stickyTop }">
            <div class="Module HotArticleModule">
              <transition name="Fade">
                <img src="../../static/img/HotArticleList.jpg" v-if="DefaultGraph.HotArticlePart">
              </transition>
              <div class="TagListHead">热门博文</div>
              <div class="HotArticle">
                <div class="HotArticleItem" v-for="(Item,Index) in HotArticleList" v-bind:key="Index">
                  <div v-if="Index == 0" @click="UpdateRouter('BlogDetail',Item)">
                    <span style="color:#f44e03;font-size: 15px">No{{Index+1}} </span>{{Item.Title}}
                  </div>
                  <div v-if="Index == 1" @click="UpdateRouter('BlogDetail',Item)">
                    <span style="color:#d41800;font-size: 15px">No{{Index+1}} </span>{{Item.Title}}
                  </div>
                  <div v-if="Index == 2" @click="UpdateRouter('BlogDetail',Item)">
                    <span style="color:#f37e21;font-size: 15px">No{{Index+1}} </span>{{Item.Title}}
                  </div>
                  <div v-if="Index == 3" @click="UpdateRouter('BlogDetail',Item)">
                    <span style="color:#f3212d;font-size: 15px">No{{Index+1}} </span>{{Item.Title}}
                  </div>
                  <div v-if="Index == 4" @click="UpdateRouter('BlogDetail',Item)">
                    <span style="color:#212df3;font-size: 15px">No{{Index+1}} </span>{{Item.Title}}
                  </div>
                  <div v-if="Index > 4" @click="UpdateRouter('BlogDetail',Item)">
                    <span>No{{Index+1}} </span>{{Item.Title}}
                  </div>
                </div>
              </div>
            </div>
            <div class="Module" style="padding: 0 0 0.5rem" @mouseenter="enter(true)" @mouseleave="enter(false)">
              <div class="TopBack"></div>
              <div class="ZhihuIcon">
                <img src="../../static/img/ZhihuIcon.jpg">
              </div>
              <div class="TextCenter">
                孙权的小博客
                <a class="BlueButton" :class="buttonAnimate ? 'open_animate' : ''" href="https://github.com/SunQQQ" target="_blank" @click="readCode()">博客源码</a>
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
                     v-for="item in Tags" :key="item.id" @click="GetArticle(item.TagName)">{{ item.TagName }}
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
  import Heartfelt from '../SonCompnent/Heartfelt';  import Pagination from '../SonCompnent/Pagination';
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
        CommentNum: 0,// 博客评论量
        HotArticleList: [],// 热门文章列表
        AticleBottom: false,// 文章底线
        buttonAnimate: false, // 首页源码入口动画效果
        // 缺省图
        DefaultGraph: {
          ArticleListPart: true,
          HotArticlePart: true,
          ArticleTagPart: true
        },
        stickyTop: 0
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
            debugger
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
            That.DefaultGraph.ArticleListPart = false;// 隐藏骨架屏
            That.ArticleList = data;

            // 创建日志 只有在筛选某个标签后，再记录日志
            if (ArticleTag) That.createLog({
              moduleType: 'button',
              operateType: '筛选文章分类',
              operateContent: ArticleTag
            });
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
              if (data == That.LeaveMessageNum) {
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
              // 下拉到底部后，展示footer
              Store.commit("changeFooter",true);
            } else {
              That.$refs.Pagi.SetUpdate(true);

              // 还有分页时，隐藏footer
              Store.commit("changeFooter",false);
              // 创建日志
              That.createLog({
                moduleType: 'pageTurn',
                operateType: '下拉文章列表到',
                operateContent: '第' + (SelectPage + 1) + '页'
              });
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
              if (data == That.CommentNum) {
                clearInterval(NumInterval);
              }
            }, 30);
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
              from:'首页'
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
              if (data == That.ArticleNum) {
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
      },
      // 查看源码
      readCode: function () {
        // 创建日志
        this.createLog({
          moduleType: 'button',
          operateType: '查看源码',
          operateContent: '首页入口'
        });
      },
      // 监控gitHub模块DOM的鼠标滑入划出事件，鼠标悬停时打开源码按钮动画效果，移出时关闭动画
      enter: function(status){
        this.buttonAnimate = status;
      }
    },
    mounted: function () {
      let that = this;

      this.InitArticleTag(this);
      Store.commit("ChangeActive", 0); // 切换Topbar高亮

      // 超大分辨率下，不再设置margin-top值
      if(window.innerHeight < 1042){
        this.stickyTop = -(942.3 - window.innerHeight + 76) + 46 + 'px'; // 设置右侧区域粘性布局的top高度
      }else{
        this.stickyTop = 60 + "px"; // 把导航栏的距离留出来
      }

      Store.commit("changeFooter",false); // 初始化时隐藏footer

      // 创建日志
      that.createLog({
        moduleType: 'menu',
        operateType: '选择菜单',
        operateContent: '博文'
      });
    },
  }
</script>

<style scoped lang="less">
  @import "../../static/css/BlogIndex";
</style>
