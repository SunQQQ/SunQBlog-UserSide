<template>
    <div class="BlogIndexContentLeft">
        <img src="../../../static/img/ArticleList.jpg" v-if="DefaultGraph.ArticleListPart"
            class="BlogIndexContentLeftDefaultGraph">
        <div class="ArticleItem" v-for="(item, i) in ArticleList" v-bind:key="i"
            @click="UpdateRouter('BlogDetail', item)">
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
                        <i class="iconfont icon-yueduliang iconBlogIndex"></i>{{
                            item.articleReadNum ?
                                item.articleReadNum : 0
                        }}
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
</template>

<script>
import Pagination from "../../SonCompnent/Pagination";
import Store from '../../../store';
export default {
    name: 'blog-list',
    components:{
        Pagination
    },
    data: function () {
        return {
            ArticleList: [],// 文章列表  
            AticleBottom: false,// 文章底线
            // 缺省图
            DefaultGraph: {
                ArticleListPart: true,
                HotArticlePart: true,
                ArticleTagPart: true
            },
            Tags:{}
        }
    },
    methods: {
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
                        Store.commit("changeFooter", true);
                    } else {
                        That.$refs.Pagi.SetUpdate(true);

                        // 还有分页时，隐藏footer
                        Store.commit("changeFooter", false);
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
        // 切换路由
        UpdateRouter: function (RouterName, articleMessage) {
            if (articleMessage._id) {
                this.$router.push({
                    name: RouterName,
                    query: {
                        _id: articleMessage._id,
                        Title: articleMessage.Title,
                        from: '首页'
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
    mounted:function(){
        let that = this;

        // 获取文章列表
        this.GetArticle('');

        this.bus.$on('GetArticle',function(tagName){
            that.GetArticle(tagName);
            that.Tags.Active = tagName;        
        });
    }
}
</script>

<style scoped lang="less">
  @import "../../../static/css/BlogIndex";
</style>