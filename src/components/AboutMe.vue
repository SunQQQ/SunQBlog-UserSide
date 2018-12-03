<template>
    <div class="FlexContent">
        <div class="LeftPart">
            <div class="BigBlock">
                <div class="TitleFontLine">My Info</div>
                <p><i class="iconfont icon-person AboutMeIcon" style="color:#49a9ee"></i>94年老男人，软件学院毕业，目前从事前端开发。</p>
                <p><i class="iconfont icon-aihao1 AboutMeIcon" style="color:#f46e65"></i>年轻时喜欢篮球、跑步、泡沫剧。现在喜爱看车评、历史记录片、发发呆</p>
                <p><i class="iconfont icon-tool AboutMeIcon" style="color:#3db8c1"></i>Layui、ElementUI、Vue.js、node</p>
                <p><i class="iconfont icon-biaoqian AboutMeIcon" style="color:#3dbd7d"></i>前阳光运动男生、前老实靠谱伙伴、傻大个</p>
                <p><i class="iconfont icon-xiazai20 AboutMeIcon" style="color:#948aec"></i>上海 徐汇</p>
                <p><i class="iconfont icon-jianzhu AboutMeIcon" style="color:#f78e3d"></i>昂立 中学生</p>
            </div>
            <div class="BigBlock AboutMeMarginTop">
                <div class="TitleFontLine">Her Info</div>
                <p><i class="iconfont AboutMeIcon icon-wangzhanxinxi" style="color:#f46e65"></i>本博客纯手工编写，木有使用第三方建站工具。前后端用到的东西都很基础，代码存放在github</p>
                <p><i class="iconfont AboutMeIcon icon-quanju_qianduanjiemian" style="color:#3dbd7d"></i>前端UI框架用到ElementUI、自己的UI组件，Js框架：Vue.js</p>
                <p><i class="iconfont AboutMeIcon icon-fuwuqi" style="color:#f78e3d"></i>后端语言使用node.js、框架使用Express</p>
                <p><i class="iconfont AboutMeIcon icon-dataBase" style="color:#49a9ee"></i>数据库使用Mongo.db</p>
            </div>
            <div class="BigBlock AboutMeMarginTop">
                <div class="TitleFontLine TitleFontLineThank">Thanks You All</div>
                <div class="UrlCardTr">
                    <div class="UrlCardTd UrlCardTdBc">
                        <div class="UrlIconName UrlIconNameMargin">
                            <img src="https://avatars1.githubusercontent.com/u/16385416?v=4">
                            <div class="UrlName">Jooger</div>
                        </div>
                    </div>
                    <div class="UrlCardTd UrlCardTdBc">
                        <div class="UrlIconName UrlIconNameMargin">
                            <img src="http://bh-lay.com/touch-icon-ipad-retina.png">
                            <div class="UrlName">小剧博客</div>
                        </div>
                    </div>
                    <div class="UrlCardTd UrlCardTdBc">
                        <div class="UrlIconName UrlIconNameMargin">
                            <img src="http://sunq.xyz/favicon.ico">
                            <div class="UrlName">孙权的博客</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="RightPart">
            <div class="GitPart">
                <div class="TopBackBlack"></div>
                <div class="GitPic">
                    <img src="../static/img/ZhihuIcon.jpg">
                </div>
                <div class="GitBack">
                    <i class="iconfont TopBackBlackGit icon-github1"></i>
                </div>
                <div class="Content">
                    <div class="GitName">孙权的Github</div>
                    <a class="BlueButton" href="https://github.com/SunQQQ">Follow Me</a>
                    <div class="BlogStatistic">
                        <div class="BlogStatisticItem">
                            <div class="BlogStatisticItemNum">888</div>
                            <div class="BlogStatisticItemText AboutMeGitData">Followers</div>
                        </div>
                        <div class="BlogStatisticItem">
                            <div class="BlogStatisticItemNum">888</div>
                            <div class="BlogStatisticItemText AboutMeGitData">Repos</div>
                        </div>
                        <div class="BlogStatisticItem">
                            <div class="BlogStatisticItemNum">888</div>
                            <div class="BlogStatisticItemText AboutMeGitData">Following</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="BigBlock AboutMeMarginTop">
                <div class="TitleFontLine">Contacts</div>
                <div class="BlogStatistic" style="border-top: none;padding-bottom: 0">
                    <div class="BlogStatisticItem">
                        <a href="https://github.com/SunQQQ" target="_blank"><i class="iconfont icon-github AboutMeIcon" style="color:#948aec"></i></a>
                    </div>
                    <div class="BlogStatisticItem">
                        <a href="https://www.zhihu.com/people/s-q-51-44-23/activities" target="_blank"><i class="iconfont icon-zhihu AboutMeIcon" style="color:#3dbd7d"></i></a>
                    </div>
                    <div class="BlogStatisticItem">
                        <a href="https://blog.csdn.net/sun_qqq" target="_blank"><i class="iconfont icon-CN_csdnnet AboutMeIcon" style="color:#f78e3d"></i></a>
                    </div>
                    <div class="BlogStatisticItem">
                        <i class="iconfont icon-youxiang AboutMeIcon" style="color:#49a9ee"></i>
                    </div>
                    <div class="BlogStatisticItem">
                        <a href="https://music.163.com/#/user/home?id=386558098" target="_blank"><i class="iconfont AboutMeIcon icon-CN_NetEasemusic" style="color:#f46e65"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "AboutMe",
    mounted:function () {
      // 切换Topbar高亮
      this.bus.$emit('Topbar',{
        Active:4,
        MobileMenuActive:4
      });
    }
  }
</script>

<style scoped lang="less">
    @import '../static/css/base';
    @import '../static/css/BlogIndex';
    @import '../static/css/FriendUrl';

    /*pc*/
    @media only screen and (min-device-width : 768px) {
        .FlexContent{
            .myflex(start);
            width: 1000px;
            margin: 74px auto 0;
        }
        .LeftPart{
            width: 75%;
            margin-right: 0.5rem;
            border-radius: 2px;
        }
        .RightPart{
            width: 25%;
            margin-left: 0.5rem;
            border-radius: 2px;
        }
    }

    /*mobile*/
    @media only screen and (max-device-width : 768px) {
        .FlexContent{
            margin: 88px auto 0;
        }
        .LeftPart{
            margin: 0 1rem;
            border-radius: 2px;
        }
        .RightPart{
            margin: 0 1rem;
            padding: 1rem 0;
            border-radius: 2px;
        }
    }


    .BigBlock{
        padding: 1rem 1rem 2rem 1rem;
        background-color: @FontColorWhite;
    }
    .BigBlock p{
        margin: 2rem 0;
    }

    .AboutMeMarginTop{
        margin-top: 1rem;
    }

    .TitleFontLine{
        text-align: center;
        font-size: 1.4rem;
        color: @FontColorGrayDeep;
        margin-top: 1rem;
    }

    .TitleFontLineThank{
        margin-bottom: 1rem;
    }

    .AboutMeIcon{
        padding: 0 0.5rem;
        font-size: 1.2rem;
    }
    .TopBackBlack{
        background-color: @GitBlack;
        height: 110px;
        text-align: center;
        position: relative;
    }

    .TopBackBlack img{
    }
    .GitPart{
        position: relative;
    }
    /*git猫背景*/
    .GitBack{
        height: 87px;
        position: absolute;
        font-size: 6rem;
        left: 0px;
        top:23px;
        width: 100%;
        font-size: 1rem;
        text-align: center;
        overflow: hidden;
        z-index: 10;
    }
    .TopBackBlackGit{
        color: @FooterBg;
        font-size: 6.5rem;
    }

    .GitPic{
        width: 100%;
        text-align: center;
        z-index: 100;
        position: absolute;
        left: 0;
        top:60px;
    }
    .GitPic img{
        border-radius: 100%;
        width: 100%;
        height: 100%;
        width: 4.8rem;
        height: 4.8rem;
    }


    .GitPart .Content{
        text-align: center;
        background-color: @fore_color;
        padding-bottom: 1rem;
        padding-top: 2.3rem;
        border-bottom: 1px solid @BorderColor;
        z-index: 1000;
    }

    .GitName{
        font-size: 1.1rem;
    }

    .BlueButton{
        background-color: @ThemeColor;
        color: @FontColorWhite;
        width: 6rem;
        margin: 0.8rem auto;
        border-radius: 0.3rem;
        padding: 0.5rem;
        text-align: center;
        display: block;
        text-decoration: none;
    }

    .AboutMeGitData{
        font-size: 0.8rem;
        color: @FontColorGrayDeep;
    }

    .UrlCardTdBc{
        background-color: @BorderColor;
    }

    .UrlIconNameMargin{
        margin-bottom: 0;
    }
</style>