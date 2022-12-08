<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="TopBarHeight"></div>
      <div class="ArticleDetailHeader">
        <img :src="Article.ArticleCover" />
        <div class="HeaderContent" v-if="!Article.ArticleCover">
          <span>{{ Article.Title }}</span>
          <span>{{ Article.Summary }}</span>
        </div>
      </div>

      <div class="ArticleDetailContent">
        <div class="ArticleDetailContentTab">
          <transition name="Fade" mode="out-in">
            <img
              src="../../static/img/BlogDetailSkele_PC.jpg"
              class="BlogDetailSkeletonScreenPC"
              v-show="BlogDetailSkeletonScreen"
            />
          </transition>

          <img
            src="../../static/img/BlogDetailSkele_Mobile.jpg"
            class="BlogDetailSkeletonScreenMobile"
            v-show="BlogDetailSkeletonScreen"
          />

          <h1>{{ Article.Title }}</h1>
          <div class="ArticleCreateTime">
            发布时间：{{ Article.CreateDate }}
          </div>
          <div class="markdown-body" v-html="Article.Content">
            {{ Article.Content }}
          </div>
        </div>
      </div>
      <div
        class="ArticleDetailContent"
        style="margin-top: 1rem"
        v-if="ArticleCommentList.length > 0"
      >
        <div
          class="ArticleDetailContentTab"
          style="padding: 1rem; min-height: unset"
        >
          <div class="ArticleDetailComment">
            <div class="CommentList">
              <div
                class="CommentItem"
                v-for="(item, i) in ArticleCommentList"
                v-bind:key="i"
                if="ArticleCommentList.length != 0"
              >
                <div class="CommentItemIcon">
                  <img
                    src="../../static/img/DefaultHeadIcon.jpg"
                    v-if="item.ArticleCommentNickName != 'sunq'"
                  />
                  <img
                    src="../../static/img/ZhihuIcon.jpg"
                    v-if="item.ArticleCommentNickName == 'sunq'"
                  />
                </div>
                <div class="CommentItemContent">
                  <div class="ArticleCommentNickName">
                    {{ item.ArticleCommentNickName }}
                    <span
                      v-if="
                        item.LocationCityName &&
                        item.LocationCityName.length > 0
                      "
                    >
                      <i
                        class="iconfont icon-buoumaotubiao23 LocationIconfont"
                      ></i
                      >{{ item.LocationCityName }}
                    </span>
                  </div>
                  <div
                    class="ArticleCommentText"
                    v-html="item.ArticleCommentText"
                  >
                    {{ item.ArticleCommentText }}
                  </div>
                  <div class="DateAnswer">
                    <div class="DateAnswerLeft">
                      {{ item.ArticleCommentDate }}
                    </div>
                    <div
                      class="DateAnswerRight"
                      @click="AnswerComment(item.ArticleCommentNickName)"
                    >
                      回复
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ArticleDetailContent" style="margin-top: 1rem">
        <div
          class="ArticleDetailContentTab"
          style="padding: 1rem; min-height: unset"
        >
          <div class="ArticleDetailCommentFirstLine">
            <div class="UserHeadIcon">
              <img src="../../static/img/DefaultHeadIcon.jpg" />
            </div>
            <div class="CommentUserInfo">
              <input
                placeholder="昵称（必填）"
                v-model="ArticleCommentNickName"
              />
              <input
                placeholder="邮箱（可以不填哦）"
                v-model="ArticleCommentEmail"
              />
              <input
                placeholder="网址（可以不填哦）"
                v-model="ArticleCommentUrl"
              />
            </div>
          </div>
          <div class="ArticleDetailCommentContent">
            <textarea
              v-model="MessageText"
              ref="MessageText"
              placeholder="欢迎评论吖，鼓励和板砖我都认真听取哦"
            ></textarea>
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
import Marked from "marked";
import Emotion from "../SonCompnent/Emotion";
import Store from "../../store";
import highlight from "highlight.js";
import "highlight.js/styles/github.css"; // 黑色风格
// import 'highlight.js/styles/atom-one-dark.css' // 清新风格

export default {
  name: "BlogDetail",
  components: {
    Emotion,
  },
  computed: {
    MessageText: {
      get() {
        return Store.state.MessageText;
      },
      set(Value) {
        Store.commit("ChangeMessageText", Value);
      },
    },
  },
  data() {
    return {
      Article: {},
      ArticleCommentNickName: "",
      ArticleCommentEmail: "",
      ArticleCommentUrl: "",

      /*ArticleCommentText: '',*/

      ArticleCommentDate: "",
      ArticleCommentList: "",
      BlogDetailSkeletonScreen: true,
    };
  },
  methods: {
    // 初始化页面
    InitPage: function () {
      var That = this;
      this.SQFrontAjax({
        Url: "/api/ArticleReadOne/foreend",
        UploadData: {
          _id: this.$route.query._id,
        },
        Success: function (data) {
          // 关闭骨架屏
          That.BlogDetailSkeletonScreen = false;

          That.Article = data[0];
          That.Article.CreateDate = That.DateFormat(That.Article.CreateDate);

          const rendererMD = new Marked.Renderer();
          rendererMD.image = function (href, title, text) {
            return `<img onclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${
              title ? title : ""
            }">`;
          };
          Marked.setOptions({
            renderer: rendererMD,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
              return highlight.highlightAuto(code).value;
            },
          });

          That.Article.Content = Marked(That.Article.Content).replace(
            /<pre>/g,
            "<pre class='language-html'>"
          ); //Markdown格式字符串转html

          // 创建日志
          That.createLog({
            moduleType: "button",
            operateType: "浏览文章(" + That.$route.query.from + "入口)",
            operateContent: That.$route.query.Title,
          });
        },
      });

      // 默认填写文章评论输入框的昵称
      var LocalCommonUser = this.GetLocalStorage("SunqBlog");
      if (LocalCommonUser.toString() != "{}") {
        this.ArticleCommentNickName = LocalCommonUser.ArticleCommentNickName;
      }
    },
    /**
     * 本方法用于提交评论
     *
     * 提交评论功能业务逻辑比较多：
     * 1.先获取用户的定位信息，然后携带定位信息提交新增评论接口。
     * 2.再刷新页面文章下的评论列表
     * 3.再修改该评论id对应的文章数据的评论量字段
     * 4.再将用户昵称存在浏览器
     */
    CommentSubmit: function () {
      var That = this;

      if (this.ArticleCommentNickName && Store.getters.GetMessageText) {
        var MatchedMessageText = That.MatchEmotion(
          Store.getters.GetMessageText
        );

        this.GetLocation(function (LocationCityName) {
          // 新增评论
          That.SQFrontAjax({
            Url: "/api/ArticleCommentCreate/foreend",
            UploadData: {
              ArticleId: That.$route.query._id,
              ArticleName: That.Article.Title,
              ArticleCommentNickName: That.ArticleCommentNickName,
              ArticleCommentEmail: That.ArticleCommentEmail,
              ArticleCommentUrl: That.ArticleCommentUrl,
              ArticleCommentText: MatchedMessageText,
              ArticleCommentDate: new Date(),
              LocationCityName: LocationCityName,
            },
            Success: function () {
              That.GetCommentList();

              // 修改被评论文章的评论数字段
              That.UpdateArticleCommentNum();

              // 存储用户名到本地
              That.SetLocalStorage("SunqBlog", {
                Key: "ArticleCommentNickName",
                Value: That.ArticleCommentNickName,
              });

              Store.commit("ChangeTip", {
                Show: true,
                Title: "评论成功",
              });

              // 创建日志
              That.createLog({
                moduleType: "button",
                operateType: "评论文章",
                operateContent: That.Article.Title,
              });
            },
          });
        });

        // 清空textarea
        Store.commit("CleanMessageText");
      } else {
        Store.commit("ChangeTip", {
          Show: true,
          Title: "昵称和评论不能为空呦",
        });
      }
    },
    // 获取评论列表
    GetCommentList: function () {
      var That = this;
      this.SQFrontAjax({
        Url: "/api/ArticleCommentRead/foreend",
        UploadData: {
          ArticleId: this.$route.query._id,
        },
        Success: function (data) {
          That.ArticleCommentList = data;
          data.forEach(function (Item, I) {
            Item.ArticleCommentDate = That.DateFormat(Item.ArticleCommentDate);
          });
        },
      });
    },
    // 传入文章id，在文章表里给对应文章评论数加一
    UpdateArticleCommentNum: function () {
      this.SQFrontAjax({
        Url: "/api/ArticleCommentNumUpdate/foreend",
        UploadData: {
          _id: this.$route.query._id,
          type: "add",
        },
        Success: function (data) {},
      });
    },
    // 回复评论
    AnswerComment: function (ComentNickName) {
      Store.commit("ChangeMessageText", "@" + ComentNickName + ":");
      this.$refs.MessageText.focus();
    },
    // 打开表情包弹框
    OpenEmotions: function () {
      this.$refs.EmotionB.OpenEmotion(true);
    },
    //表情选中后追加在input
    AppendMessageText: function () {
      // 光标聚焦
      this.$refs.MessageText.focus();
    }
  },
  mounted: function () {
    window.showMarkedImage = function(e, href) {
      let el = e.target
      let rfs =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullscreen ||
        el.msRequestFullscreen
      if(rfs) rfs.call(el); // 这里rfs()会执行失败，因为rfs返回的是个单纯的函数，没有对象去调用它了
    }

    // 初始化文章内容
    this.InitPage();
    // 初始化评论列表
    this.GetCommentList();
  },
};
</script>

<style scoped lang="less">
@import "../../static/css/BlogDetail";
</style>
