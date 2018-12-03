<template>
    <div>
        <div class="TopBarHeight"></div>
        <div class="BlogIndexContent">
            <div class="BlogFlex">
                <div class="BlogIndexContentLeft">
                    <div class="ArticleItem" v-for="(item,i) in ArticleList" v-bind:key="i" @click="UpdateRouter('BlogDetail',item._id)">
                        <div class="ArticleItemCover" v-if="item.ArticleCover">
                            <img :src="item.ArticleCover">
                        </div>
                        <div style="flex: 1">
                            <div class="ArticleTitle">
                                <div class="ArticleTag">{{ item.ArticleTag }}</div>
                                <div class="ArticleTitleText">{{ item.Title }}</div>
                            </div>
                            <div class="ArticleContent" v-html="item.Summary">
                                {{ item.Summary }}
                            </div>
                            <div class="ArticleFooter">
                                <div class="ArticleFooterItem">发表：{{ item.CreateDate }}</div>
                                <div class="ArticleFooterItem" @click="UpdateRouter('BlogDetail',item._id)">评论：{{ item.CommentNum }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="NoDataHint" v-if="!ArticleList.length">暂无数据</div>
                    <Pagination v-bind:PageTotalNum=this.PageTotalNum
                                v-bind:PageNum=this.PageNum
                                v-on:PaginationToParent="ValueByPagition"
                                ref="Pagination"
                    ></Pagination >
                </div>
                <div class="BlogIndexContentRight">
                    <div class="Module">
                        <div class="TagListHead">文章分类<span style="color: #aaa;font-size: 0.8rem">（点击筛选呦）</span></div>
                        <div class="TagListTr">
                            <div :class="item.TagName != Tags.Active ? 'TagListTd' : 'TagListTdActive'" v-for="item in Tags" :key="item.id" @click="GetArticle(item.TagName)">{{ item.TagName }}</div>
                        </div>
                    </div>
                    <div class="Module" style="padding: 0 0 0.5rem">
                        <div class="TopBack"></div>
                        <div class="ZhihuIcon">
                            <img src="../static/img/ZhihuIcon.jpg">
                        </div>
                        <div class="TextCenter">
                            孙权的小博客
                            <div class="BlueButton">欢迎你呦</div>
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
                </div>
            </div>
        </div>
        <Heartfelt></Heartfelt>
    </div>
</template>

<script>
  import Heartfelt from './Common/Heartfelt';
  import Pagination from './Pagination';
  export default {
    name: "BlogIndex",
    data:function () {
      return{
        // 标签量
        Tags:[],
        // 文章列表
        ArticleList:[],
        // 文章量
        ArticleNum:'',
        // 留言量
        LeaveMessageNum:'',
        // 博客评论量
        CommentNum:'',
        // 数据个数
        PageTotalNum:0,
        // 页数
        PageNum:0,
      }
    },
    methods:{
      InitArticleTag:function (That){
        // 初始化标签列表
        this.SQFrontAjax({
          Url:'/api/TagRead/foreend',
          Success:function (data) {
            That.Tags = data;
            That.Tags.Active = '';
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
      },
      // 获取文章列表
      GetArticle:function(ArticleTag){
        var That = this;

        this.SQFrontAjax({
          Url:'/api/ArticleRead/foreend',
          UploadData:{
            PagnationData: {
              Skip: 0,
              Limit: 9
            },
            ArticleTag:ArticleTag
          },
          Success:function (data) {
            if (data.length > 8) {
              data.pop();
              // 显示分页器
              That.$refs.Pagination.SwitchPagin(true);

              That.SQFrontAjax({
                Url: '/api/getarticlenum/foreend',
                UploadData:{ArticleTag:ArticleTag},
                Success: function (data) {
                  That.PageTotalNum = data;
                  That.PageNum = Math.ceil(data / 8);
                }
              });
            }else {
              That.$refs.Pagination.SwitchPagin(false);
            }

            // 高亮
            That.Tags.Active = ArticleTag;

            data.forEach(function (Item,I) {
              Item.CreateDate = Item.CreateDate.slice(0,10);
            });
            That.ArticleList = data;
          }
        });
      },
      // 获取留言数量
      GetLeaveMessageNum:function(){
        var That = this;
        this.SQFrontAjax({
          Url:'/api/getmessagenum',
          Success:function (data) {
            That.LeaveMessageNum = data;
          }
        });
      },
      //处理翻页
      ValueByPagition:function (SelectPage) {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/ArticleRead/foreend',
          UploadData: {
            PagnationData: {
              Skip:SelectPage * 8,
              Limit:8
            },
            ArticleTag:That.Tags.Active
          },
          Success: function (data) {
            data.forEach(function (Item,I) {
              Item.CreateDate = Item.CreateDate.slice(0,10);
            });
            That.ArticleList = data;
          }
        });
      },
      // 获取评论数量
      GetCommentNum:function(){
        var That = this;
        this.SQFrontAjax({
          Url:'/api/getcommentnum',
          Success:function (data) {
            That.CommentNum = data;
          }
        });
      },
      // 切换路由
      UpdateRouter:function (RouterName,Id) {
        if(Id){
          /*this.$router.push({
            name:RouterName,
            params:{
              ID:Id
            }
          });*/
          this.$router.push({
            name:RouterName,
            query:{
              ID:Id
            }
          });
        }else {
          this.bus.$emit('TopBar', {
            Active:1,
            MobileMenuActive:1
          });
          this.$router.push({
            name:RouterName
          });
        }
      },
      //获取文章数量
      GetArticleNum:function () {
        var That = this;
        this.SQFrontAjax({
          Url:'/api/getarticlenum/foreend',
          Success:function (data) {
            That.ArticleNum = data;
          }
        });
      },
    },
    mounted:function(){
      this.InitArticleTag(this);

      // 切换Topbar高亮
      this.bus.$emit('Topbar',{
        Active:0,
        MobileMenuActive:0
      });
    },
    components:{
      Heartfelt,
      Pagination
    }
  }
</script>

<style scoped lang="less">
    @import "../static/css/BlogIndex";
    .flip-list-move {
        transition: transform 1s;
    }
</style>