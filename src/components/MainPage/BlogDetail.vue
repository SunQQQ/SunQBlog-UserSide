<template>
    <transition name="Fade" mode="out-in">
    <div>
        <div class="TopBarHeight"></div>
        <div class="ArticleDetailHeader">
            <img :src="Article.ArticleCover">
            <div class="HeaderContent" v-if="!Article.ArticleCover">
                <span>{{ Article.Title }}</span>
                <span>{{ Article.Summary }}</span>
            </div>
        </div>

        <div class="ArticleDetailContent">
            <div class="ArticleDetailContentTab">
                <h1>{{ Article.Title }}</h1>
                <div class="ArticleCreateTime">发布时间：{{ Article.CreateDate }}</div>
                <div class="markdown-body" v-html="Article.Content">{{ Article.Content }}</div>
            </div>
        </div>
        <div class="ArticleDetailContent" style="margin-top: 1rem">
            <div class="ArticleDetailContentTab" style="padding: 2rem 0;">
                <div class="ArticleDetailComment">
                    <div class="CommentList">
                        <div class="CommentItem" v-for="item in ArticleCommentList" if="ArticleCommentList.length != 0">
                            <div class="CommentItemIcon">
                                <img src="../../static/img/DefaultHeadIcon.jpg" v-if="item.ArticleCommentNickName != 'sunq'">
                                <img src="../../static/img/ZhihuIcon.jpg" v-if="item.ArticleCommentNickName == 'sunq'">
                            </div>
                            <div class="CommentItemContent">
                                <div class="ArticleCommentNickName">{{ item.ArticleCommentNickName }}</div>
                                <div class="ArticleCommentText" v-html="item.ArticleCommentText">{{ item.ArticleCommentText }}</div>
                                <div class="DateAnswer">
                                    <div class="DateAnswerLeft">{{ item.ArticleCommentDate }}</div>
                                    <div class="DateAnswerRight" @click="AnswerComment(item.ArticleCommentNickName)">
                                        回复
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ArticleDetailCommentFirstLine">
                    <div class="UserHeadIcon">
                        <img src="../../static/img/DefaultHeadIcon.jpg">
                    </div>
                    <div class="CommentUserInfo">
                        <input placeholder="昵称（必填）" v-model="ArticleCommentNickName"/>
                        <input placeholder="邮箱（可以不填哦）" v-model="ArticleCommentEmail"/>
                        <input placeholder="网址（可以不填哦）" v-model="ArticleCommentUrl"/>
                    </div>
                </div>
                <div class="ArticleDetailCommentContent">
                    <textarea v-model="ArticleCommentText" ref="ArticleCommentText"
                              placeholder="欢迎评论吖，鼓励和板砖我都认真听取哦"></textarea>
                    <span class="EmotionButton" @click="OpenEmotions()">
                        <i class="iconfont icon-face IconfontSize"></i>
                    </span>
                </div>
                <div class="CommentSubmitLine">
                    <div class="CommentSubmitButton" @click="CommentSubmit()">评论</div>
                </div>
            </div>
        </div>
        <Emotion ref="EmotionB" @AppendInputValue="AppendMessageText"></Emotion>
    </div>
    </transition>
</template>

<script>
  import Marked from 'marked';
  import Emotion from '../SonCompnent/Emotion';
  export default {
    name: "BlogDetail",
    data: function () {
      return {
        Article: {},
        ArticleCommentNickName: '',
        ArticleCommentEmail: '',
        ArticleCommentUrl: '',
        ArticleCommentText: '',
        ArticleCommentDate: '',
        ArticleCommentList: ''
      }
    },
    methods: {
      // 初始化页面
      InitPage: function (that) {
        this.SQFrontAjax({
          Url: '/api/ArticleReadOne/foreend',
          UploadData: {
            /*_id: this.$route.query.ID*/
            _id:this.$route.query.ID
          },
          Success:function(data){
            that.Article = data[0];
            that.Article.CreateDate = that.DateFormat(that.Article.CreateDate);
            that.Article.Content = Marked(that.Article.Content);
          }
        });

        // 默认填写文章评论输入框的昵称
        var LocalCommonUser = this.GetLocalStorage('SunqBlog');
        if (LocalCommonUser.toString() != '{}') {
          this.ArticleCommentNickName = LocalCommonUser.ArticleCommentNickName;
        }
      },
      // 提交评论
      CommentSubmit: function () {
        var That = this;

        if (this.ArticleCommentNickName && this.ArticleCommentText) {
          var MatchedMessageText = That.MatchEmotion(That.ArticleCommentText);

          this.SQFrontAjax({
            Url: '/api/ArticleCommentCreate/foreend',
            UploadData: {
              ArticleId: this.$route.query.ID,
              ArticleCommentNickName: this.ArticleCommentNickName,
              ArticleCommentEmail: this.ArticleCommentEmail,
              ArticleCommentUrl: this.ArticleCommentUrl,
              ArticleCommentText: MatchedMessageText,
              ArticleCommentDate: new Date()
            },
            Success: function () {
              That.GetCommentList();

              That.UpdateArticleCommentNum();

              // 存储用户名到本地
              That.SetLocalStorage('SunqBlog', {
                Key: 'ArticleCommentNickName',
                Value: That.ArticleCommentNickName
              });

              That.bus.$emit('Tips', {
                Show: true,
                Title: '回复成功'
              });
            }
          });

          // 清空textarea
          this.ArticleCommentText = "";
        } else {
          this.bus.$emit('Tips', {
            Show: true,
            Title: '昵称和评论不能为空呦！'
          });
        }

      },
      // 获取评论列表
      GetCommentList: function () {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/ArticleCommentRead/foreend',
          UploadData: {
            ArticleId: this.$route.query.ID
          },
          Success: function (data) {
            That.ArticleCommentList = data;
            data.forEach(function (Item, I) {
              Item.ArticleCommentDate = That.DateFormat(Item.ArticleCommentDate);
            });
          }
        });
      },
      // 文章评论数加一
      UpdateArticleCommentNum:function(){
        this.SQFrontAjax({
          Url: '/api/ArticleCommentNumUpdate/foreend',
          UploadData: {
            _id: this.$route.query.ID
          },
          Success: function (data) {

          }
        });
      },
      // 回复评论
      AnswerComment: function (ComentNickName) {
        this.ArticleCommentText = '@' + ComentNickName + ':';
        this.$refs.ArticleCommentText.focus();
      },
      // 打开表情包弹框
      OpenEmotions:function () {
        this.$refs.EmotionB.OpenEmotion(true);
      },
      //表情选中后追加在input
      AppendMessageText:function (EmotionChinese) {
        this.ArticleCommentText += EmotionChinese;
		// 光标聚焦
        this.$refs.ArticleCommentText.focus();
      }
    },
    mounted: function () {
      this.InitPage(this);
      this.GetCommentList();
    },
    components:{
      Emotion
    }
  }
</script>

<style scoped lang="less">
    @import "../../static/css/BlogDetail";
</style>