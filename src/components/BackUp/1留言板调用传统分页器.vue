<template>
    <div style="position: relative">
        <div class="MessageBoardCover">
            <div class="WriteMessageFrameFadeIn">
                <div class="WriteMessageFrameLeft">
                    <img src="../static/img/DefaultHeadIcon.jpg">
                    <div>欢迎你来</div>
                </div>
                <div style="flex: 1">
                    <div :class="OpenTextAreaCover ? 'WriteMessageFrameContent' : 'WriteMessageFrameContent WriteMessageFrameContentColorBorder'">
                        <textarea ref="LeaveMessageTextArea" placeholder="输入留言" v-model="MessageText"></textarea>
                        <div class="TextAreaCover" @click="OpenMessageSubmit()" v-if="OpenTextAreaCover">来都来啦，留个脚印吧
                        </div>
                    </div>
                    <div class="OpenMessageSubmit" v-if="OpenMessageSubmitValue">
                        <div class="LeaveMessageName">
                            <input placeholder="输入你的大名或昵称" v-model="MessageLeaveName">
                        </div>
                        <div class="OpenMessageSubmitButton" @click="MessageSubmit()">提交</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="BlogIndexContent">
            <div class="BlogFlex">
                <div class="BlogIndexContentLeft"
                     style="background-color:#ffffff;margin-top: 1rem;border:1px solid #e9e9e9;border-radius: 3px">
                    <div class="CommentList">
                        <div class="CommentItem" v-for="item in MessageList">
                            <div class="CommentItemIcon">
                                <img src="../static/img/DefaultHeadIcon.jpg" v-if="item.MessageLeaveName != 'sunq'">
                                <img src="../static/img/ZhihuIcon.jpg" v-if="item.MessageLeaveName=='sunq'">
                            </div>
                            <div class="CommentItemContent">
                                <div>{{ item.MessageLeaveName }}</div>
                                <div class="ArticleCommentText">{{ item.MessageText }}</div>
                                <div class="DateAnswer">
                                    <div class="DateAnswerLeft">{{ item.MessageLeaveDate }}</div>
                                    <div class="DateAnswerRight" @click="AnswerMessage(item.MessageLeaveName)">回复</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="NoDataHint" v-if="MessageList.length == 0">暂无数据</div>
                </div>
                <div class="BlogIndexContentRight" style="border:1px solid #e9e9e9;border-radius: 3px">
                    <div class="Module" style="padding: 0 0 0.5rem;background-color: transparent">
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
                                        <div class="BlogStatisticItemNum">8</div>
                                        <div class="BlogStatisticItemText AboutMeGitData">Followers</div>
                                    </div>
                                    <div class="BlogStatisticItem">
                                        <div class="BlogStatisticItemNum">13</div>
                                        <div class="BlogStatisticItemText AboutMeGitData">Repos</div>
                                    </div>
                                    <div class="BlogStatisticItem">
                                        <div class="BlogStatisticItemNum">5</div>
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
            </div>
            <Pagination v-bind:PageTotalNum=this.PageTotalNum
                        v-bind:PageNum=this.PageNum
                        v-on:PaginationToParent="ValueByPagition"
            ref="Pagin">
            </Pagination>
        </div>
        <!--回复留言弹框PageActive-->
        <div style="position:fixed;top: 0;bottom: 0;left:0;right:0;z-index: 1000" v-if="MessageAnswerFrame">
            <div class="MessageBoxWrapper" @click="CloseAnswerMessage()"></div>
            <div :class="FadeAnimate ? 'WriteMessageFrameFadeIn' : 'WriteMessageFrameFadeOut'"
                 style="top:0;bottom: 0;height: 8rem;z-index: 1500;opacity: 1;padding-top: 2rem">
                <div class="WriteMessageFrameLeft">
                    <img src="../static/img/DefaultHeadIcon.jpg">
                    <div>回复留言</div>
                </div>
                <div style="flex: 1;position: relative">
                    <div class="WriteMessageFrameContent WriteMessageFrameContentColorBorder">
                        <textarea ref="AnswerMessageContentDom" placeholder="输入留言"
                                  v-model="AnswerMessageContent"></textarea>
                    </div>
                    <div class="OpenMessageSubmit">
                        <div class="LeaveMessageName">
                            <input placeholder="输入你的大名或昵称" v-model="AnswerMessageUserName">
                        </div>
                        <div class="OpenMessageSubmitButton" @click="AnswerMessageSubmit()">提交</div>
                    </div>
                    <div class="CloseAnswerMessage" @click="CloseAnswerMessage()">
                        <i class="iconfont icon-fork IconfontSize"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Pagination from './Pagination';

  export default {
    name: "MessageBoard",
    data: function () {
      return {
        // textarea遮层
        OpenTextAreaCover: true,
        // 提交按钮显示
        OpenMessageSubmitValue: false,
        //textarea的留言文本
        MessageText: '',
        //留言人姓名
        MessageLeaveName: '',
        // 留言列表
        MessageList: '',
        // 写留言的时间
        MessageLeaveDate: '',
        // 回复留言的内容
        AnswerMessageContent: '',
        //回复留言的用户名
        AnswerMessageUserName: '',
        //回复留言弹框
        MessageAnswerFrame: false,
        // 弹框显隐动画
        FadeAnimate: false,

        // 所有数据个数
        PageTotalNum:0,
        // 所有页数
        PageNum:0,
      }
    },
    methods: {
      // 展示留言textarea
      OpenMessageSubmit: function () {
        // 隐藏textarea的遮层
        this.OpenTextAreaCover = false;
        //显示提交按钮
        this.OpenMessageSubmitValue = true;
        this.$refs['LeaveMessageTextArea'].focus();

        // 填写缓存中游客名
        var LocalCommonUser = this.GetLocalStorage('SunqBlog');
        if (LocalCommonUser.toString() != '{}') {
          this.MessageLeaveName = LocalCommonUser.ArticleCommentNickName;
        }
      },

      // 提交留言
      MessageSubmit: function () {
        var That = this;
        if (this.MessageText && this.MessageLeaveName) {
          this.SQFrontAjax({
            Url: '/api/MessageCreate/foreend',
            UploadData: {
              MessageText: this.MessageText,
              MessageLeaveName: this.MessageLeaveName,
              MessageLeaveDate: new Date()
            },
            Success: function () {
              That.bus.$emit('Tips', {
                Show: true,
                Title: '留言成功'
              });
              // 清空留言框
              That.MessageText = '';
              // 存储用户名到本地
              That.SetLocalStorage('SunqBlog', {
                Key: 'ArticleCommentNickName',
                Value: That.MessageLeaveName
              });
              // 刷新留言列表
              That.MessageRead();
            }
          });
        } else {
          That.bus.$emit('Tips', {
            Show: true,
            Title: '昵称和留言不能为空呦！'
          });
        }
      },

      // 渲染留言列表
      MessageRead: function () {
        var That = this;

        this.SQFrontAjax({
          Url: '/api/MessageRead/foreend',
          UploadData: {
            PagnationData: {
              Skip: 0,
              Limit: 9
            }
          },
          Success: function (data) {
            // 操作分页器
            if (data.length > 8) {
              data.pop();
              // 显示分页器
              That.$refs.Pagin.SwitchPagin(true);

              That.SQFrontAjax({
                Url: '/api/getmessagenum',
                Success: function (data) {
                  That.PageTotalNum = data;
                  That.PageNum = Math.ceil(data / 8);
                  That.PageActive = 0;
                }
              });
            }
            // 渲染列表
            data.forEach(function (Item, I) {
              Item.MessageLeaveDate = That.DateFormat(Item.MessageLeaveDate);
            });
            That.MessageList = data;
          }
        });
        // 默认填写留言输入框的昵称
        var LocalCommonUser = this.GetLocalStorage('SunqBlog');
        if (LocalCommonUser.toString() != '{}') {
          That.AnswerMessageUserName = LocalCommonUser.ArticleCommentNickName;
        }
      },

      // 打开回复留言弹框
      AnswerMessage: function (AnswedPerson) {
        var That = this;
        this.MessageAnswerFrame = true;
        this.FadeAnimate = true;

        // 填写@某人
        this.AnswerMessageContent = '@' + AnswedPerson + ':';
        That.$refs.AnswerMessageContentDom.focus();

        // 填写缓存中游客名
        var LocalCommonUser = this.GetLocalStorage('SunqBlog');
        if (LocalCommonUser.toString() != '{}') {
          That.AnswerMessageUserName = LocalCommonUser.ArticleCommentNickName;
        }
      },

      // 提交回复留言
      AnswerMessageSubmit: function () {
        var That = this;
        if (this.AnswerMessageContent && this.AnswerMessageUserName) {
          this.SQFrontAjax({
            Url: '/api/MessageCreate/foreend',
            UploadData: {
              MessageText: this.AnswerMessageContent,
              MessageLeaveName: this.AnswerMessageUserName,
              MessageLeaveDate: new Date()
            },
            Success: function () {
              That.bus.$emit('Tips', {
                Show: true,
                Title: '回复成功'
              });

              That.CloseAnswerMessage();
              That.MessageRead();

              // 存储用户名到本地
              That.SetLocalStorage('SunqBlog', {
                Key: 'ArticleCommentNickName',
                Value: That.AnswerMessageUserName
              });
            }
          });
        } else {
          That.bus.$emit('Tips', {
            Show: true,
            Title: '昵称和回复不能为空呦！'
          });
        }
      },

      // 关闭回复留言框
      CloseAnswerMessage: function () {
        var That = this;
        this.FadeAnimate = false;
        setTimeout(function () {
          That.MessageAnswerFrame = false;
        }, 200)
      },

      ValueByPagition:function (SelectPage) {
        var That = this;
        this.SQFrontAjax({
            Url: '/api/MessageRead/foreend',
            UploadData: {
              PagnationData: {
                  Skip:SelectPage * 8,
                  Limit:8
                }
            },
            Success: function (data) {
              data.forEach(function (Item, I) {
                Item.MessageLeaveDate = That.DateFormat(Item.MessageLeaveDate);
              });
              That.MessageList = data;
            }
        });
      }
    },

    mounted: function () {
      this.MessageRead();
      // 切换Topbar高亮
      this.bus.$emit('Topbar', {
        Active: 1,
        MobileMenuActive: 1
      });
    },
    components:{
      Pagination:Pagination
    }
  }
</script>

<style scoped lang="less">
    @import "../static/css/AboutMe";
    @import "../static/css/BlogIndex";
    @import "../static/css/BlogDetail";
    /*pc端*/
    @media only screen and (min-device-width: 768px) {
        .WriteMessageFrameFadeIn {
            background-color: @fore_color;
            width: 42rem;
            margin: auto;
            .myflex(start);
            position: absolute;
            left: 0;
            right: 0;
            top: 30vh;
            padding: 1.5rem 1.5rem 1.5rem 1rem;
            animation: FadeIn 0.2s linear;
        }

        .WriteMessageFrameFadeOut {
            background-color: @fore_color;
            width: 42rem;
            margin: auto;
            .myflex(start);
            position: absolute;
            left: 0;
            right: 0;
            top: 14rem;
            padding: 1.5rem 1.5rem 1.5rem 1rem;
            animation: FadeOut 0.2s linear;
            /*animation-delay: 1s;*/
        }

        .MessageBoardCover {
            width: 100%;
            height: 95vh;
            position: relative;
            background: url(../static/img/MessageBoardCover2.jpg) no-repeat center bottom;
        }
    }

    /*移动端*/
    @media only screen and (max-device-width: 768px) {
        .WriteMessageFrameFadeIn {
            background-color: @fore_color;
            margin: auto 1rem;
            .myflex(start);
            position: absolute;
            left: 0;
            right: 0;
            top: 30vh;
            padding: 1.5rem 1.5rem 1.5rem 1rem;
            animation: FadeIn 0.2s linear;
        }

        .WriteMessageFrameFadeOut {
            background-color: @fore_color;
            margin: auto 1rem;
            .myflex(start);
            position: absolute;
            left: 0;
            right: 0;
            top: 30vh;
            padding: 1.5rem 1.5rem 1.5rem 1rem;
            animation: FadeOut 0.2s linear;
        }

        .MessageBoardCover {
            width: 100%;
            height: 95vh;
            position: relative;
            background: url(../static/img/MessageBoardCover2.jpg) no-repeat center bottom;
        }
    }

    @keyframes FadeIn {
        0% {
            transform: scale(0.9)
        }
        20% {
            transform: scale(0.925)
        }
        60% {
            transform: scale(0.95)
        }
        80% {
            transform: scale(0.975)
        }
        100% {
            transform: scale(1)
        }
    }

    @keyframes FadeOut {
        0% {
            transform: scale(1)
        }
        20% {
            transform: scale(0.975)
        }
        60% {
            transform: scale(0.95)
        }
        80% {
            transform: scale(0.925)
        }
        100% {
            transform: scale(0.9)
        }
    }

    .WriteMessageFrameLeft {
        width: 4rem;
        text-align: center;
        margin-right: 0.5rem;
        font-size: 0.8rem;
    }

    .WriteMessageFrameLeft img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 5px;
    }

    .WriteMessageFrameContent {
        flex: 1;
        height: 4.5rem;
        line-height: 4.5rem;
        position: relative;
        padding: 0.5rem 0 0 0.5rem;
        border: 1px solid @BorderColor;
    }

    .WriteMessageFrameContentColorBorder {
        border: 1px solid @ThemeColor;
    }

    .WriteMessageFrameContent textarea {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: none;
        outline: none;
    }

    .OpenMessageSubmit {
        .myflex(center);
        margin-top: 1rem;
    }

    .LeaveMessageName {
        flex: 1;
    }

    .LeaveMessageName input {
        width: 8rem;
        height: 1.5rem;
        border: 1px solid @ThemeColor;
    }

    .OpenMessageSubmitButton {
        background-color: @ThemeColor;
        padding: 0.3rem 1rem;
        color: @FontColorWhite;
        width: 2rem;
        font-size: 0.8rem;
        border-radius: 2px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
    }

    .TextAreaCover {
        position: absolute;
        left: 0;
        top: 0;
        height: 5rem;
        line-height: 5rem;
        width: 100%;
        box-sizing: border-box;
        padding-left: 1rem;
        background-color: @fore_color;
    }

    .MessageBoxWrapper {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        opacity: .6;
        filter: opacity(60);
        background-color: #000;
        transition: all 0s ease 0s;
        transform: translate3d(0px, 0px, 0px);
    }

    .CloseAnswerMessage {
        position: absolute;
        right: -1rem;
        top: -1.5rem;
        cursor: pointer;
    }
</style>