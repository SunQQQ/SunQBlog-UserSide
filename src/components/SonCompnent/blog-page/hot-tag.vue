<template>
    <div class="BlogIndexContentRight blogindex-page" v-bind:style="{ top: stickyTop }">
        <div class="Module HotArticleModule">
            <transition name="Fade">
                <img src="../../../static/img/HotArticleList.jpg" v-if="DefaultGraph.HotArticlePart">
            </transition>
            <div class="TagListHead">热门博文</div>
            <div class="HotArticle">
                <div class="HotArticleItem" v-for="(Item, Index) in HotArticleList" v-bind:key="Index">
                    <div v-if="Index == 0" @click="UpdateRouter('BlogDetail', Item)">
                        <span style="color:#f44e03;font-size: 15px">No{{ Index+ 1}} </span>{{ Item.Title }}
                    </div>
                    <div v-if="Index == 1" @click="UpdateRouter('BlogDetail', Item)">
                        <span style="color:#d41800;font-size: 15px">No{{ Index+ 1}} </span>{{ Item.Title }}
                    </div>
                    <div v-if="Index == 2" @click="UpdateRouter('BlogDetail', Item)">
                        <span style="color:#f37e21;font-size: 15px">No{{ Index+ 1}} </span>{{ Item.Title }}
                    </div>
                    <div v-if="Index == 3" @click="UpdateRouter('BlogDetail', Item)">
                        <span style="color:#f3212d;font-size: 15px">No{{ Index+ 1}} </span>{{ Item.Title }}
                    </div>
                    <div v-if="Index == 4" @click="UpdateRouter('BlogDetail', Item)">
                        <span style="color:#212df3;font-size: 15px">No{{ Index+ 1}} </span>{{ Item.Title }}
                    </div>
                    <div v-if="Index > 4" @click="UpdateRouter('BlogDetail', Item)">
                        <span>No{{ Index+ 1}} </span>{{ Item.Title }}
                    </div>
                </div>
            </div>
        </div>
        <div class="Module" style="padding: 0 0 0.5rem" @mouseenter="enter(true)" @mouseleave="enter(false)">
            <div class="TopBack"></div>
            <div class="ZhihuIcon">
                <img src="../../../static/img/ZhihuIcon.jpg">
            </div>
            <div class="TextCenter">
                孙权的小博客
                <a class="BlueButton" :class="buttonAnimate ? 'open_animate' : ''" href="https://github.com/SunQQQ"
                    target="_blank" @click="readCode()">博客源码</a>
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
                <img src="../../../static/img/Tag.jpg" v-if="DefaultGraph.ArticleTagPart">
            </transition>
            <div class="TagListHead">文章分类<span style="color: #aaa;font-size: 0.8rem">（点击筛选呦）</span></div>
            <div class="TagListTr">
                <div :class="item.TagName != Tags.Active ? 'TagListTd' : 'TagListTdActive'" v-for="item in Tags"
                    :key="item.id" @click="refreshArticle(item.TagName)">{{ item.TagName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'hot-blog',
    data: function () {
        return {
            Tags: [],// 标签量
            ArticleNum: 0,// 文章量     
            LeaveMessageNum: 0,// 留言量        
            CommentNum: 0,// 博客评论量
            HotArticleList: [],// 热门文章列表
            buttonAnimate: false, // 首页源码入口动画效果
            stickyTop: 0,
            // 缺省图
            DefaultGraph: {
                ArticleListPart: true,
                HotArticlePart: true,
                ArticleTagPart: true
            },
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
            //渲染文章
            this.GetArticleNum();
            //渲染留言个数
            this.GetLeaveMessageNum();
            // 渲染评论个数
            this.GetCommentNum();
            //渲染热门博文
            this.GetHotArticle();
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
        enter: function (status) {
            this.buttonAnimate = status;
        },
        refreshArticle: function(tagName){
            // 事件总线 操作blog-list组件中获取文章的方法
            this.bus.$emit('GetArticle',tagName);
            this.Tags.Active = tagName;
        }
    },
    mounted: function () {
        this.InitArticleTag(this);

        // 超大分辨率下，不再设置margin-top值
        if (window.innerHeight < 1042) {
            this.stickyTop = -(942.3 - window.innerHeight + 76) + 46 + 'px'; // 设置右侧区域粘性布局的top高度
        } else {
            this.stickyTop = 60 + "px"; // 把导航栏的距离留出来
        }
    }
}
</script>

<style scoped lang="less">
  @import "../../../static/css/BlogIndex";
</style>