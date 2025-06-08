<template>
  <transition name="Fade" mode="out-in">
    <article>
      <div class="TopBarHeight"></div>
      <div class="ArticleDetailHeader">
        <div class="HeaderContent">
          <span>{{ Article.title }}</span>
          <span>{{ Article.summary }}</span>
        </div>
      </div>

      <div class="ArticleDetailContent">
        <div class="ArticleDetailContentTab">
          <transition name="Fade" mode="out-in">
            <img src="../../static/img/BlogDetailSkele_PC.jpg" class="BlogDetailSkeletonScreenPC"
              v-show="BlogDetailSkeletonScreen" />
          </transition>

          <img src="../../static/img/BlogDetailSkele_Mobile.jpg" class="BlogDetailSkeletonScreenMobile"
            v-show="BlogDetailSkeletonScreen" />

          <!-- <h1>{{ Article.title }}</h1> -->
          <div class="ArticleCreateTime">
            <div style="margin-right: 1rem;">
              作者：{{ Article.createName }}
            </div>
            <div>
              发布时间：{{ Article.createTime }}
            </div>
          </div>
          <div class="markdown-body" v-html="Article.content"></div>
        </div>
      </div>
      <div class="ArticleDetailContent" style="margin-top: 1rem" v-if="commentList.length > 0">
        <div class="ArticleDetailContentTab" style="padding: 1rem; min-height: unset">
          <div class="ArticleDetailComment">
            <div class="CommentList">
              <div v-for="(item, i) in commentList" class="totalItem" v-bind:key="i">
                <div class="CommentItem" v-bind:key="i" if="commentList.length != 0">
                  <div class="CommentItemIcon">
                    <img :src="getIconAdress(item.createrAvator)" />
                  </div>
                  <div class="CommentItemContent">
                    <div class="createrName">
                      {{ item.createrName }}
                      <span v-if="
                        item.city &&
                        item.city.length > 0
                      ">
                        <i class="iconfont icon-buoumaotubiao23 LocationIconfont"></i>{{ item.city }}
                      </span>
                    </div>
                    <div class="commentContent" v-html="item.commentContent">
                    </div>
                    <div class="DateAnswer">
                      <div class="DateAnswerLeft">
                        {{ item.createTime }}
                      </div>
                      <div class="DateAnswerRight" @click="AnswerComment(item.createrName, item.id)">
                        回复
                      </div>
                    </div>
                  </div>
                </div>
                <div class="CommentItem item-two-level" v-for="(itemTwo, i) in item.child" v-bind:key="i"
                  if="item.child">
                  <div class="CommentItemIcon">
                    <img :src="getIconAdress(itemTwo.createrAvator)" />
                  </div>
                  <div class="CommentItemContent">
                    <div class="createrName">
                      {{ itemTwo.createrName }}
                      <span v-if="
                        itemTwo.city &&
                        itemTwo.city.length > 0
                      ">
                        <i class="iconfont icon-buoumaotubiao23 LocationIconfont"></i>{{ itemTwo.city }}
                      </span>
                    </div>
                    <div class="commentContent" v-html="itemTwo.commentContent">
                    </div>
                    <div class="DateAnswer">
                      <div class="DateAnswerLeft">
                        {{ itemTwo.createTime }}
                      </div>
                      <div class="DateAnswerRight" @click="AnswerComment(itemTwo.createrName, item.id)">
                        回复
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="ArticleDetailContent" style="margin-top: 1rem">
        <div class="ArticleDetailContentTab" style="padding: 1rem; min-height: unset">
          <div class="ArticleDetailCommentFirstLine">
            <div class="UserHeadIcon">
              <img src="../../static/img/DefaultHeadIcon.jpg" />
            </div>
            <!-- <div class="CommentUserInfo">
              <input
                placeholder="昵称（必填）"
                v-model="createrName"
              />
              <input
                placeholder="邮箱（可以不填哦）"
                v-model="ArticleCommentEmail"
              />
              <input
                placeholder="网址（可以不填哦）"
                v-model="ArticleCommentUrl"
              />
            </div> -->
          </div>
          <div class="ArticleDetailCommentContent">
            <textarea v-model="MessageText" ref="MessageText" placeholder="欢迎评论吖，鼓励和板砖我都认真听取哦"></textarea>
            <span class="EmotionButton" @click="OpenEmotions()">
              <i class="iconfont icon-face IconfontSize"></i>
            </span>
          </div>
          <div class="CommentSubmitLine">
            <div class="CommentSubmitButton" @click="CommentSubmit()">评论</div>
          </div>
        </div>
      </section>

      <Emotion ref="EmotionB" @AppendInputValue="AppendMessageText"></Emotion>
    </article>
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
      ArticleCommentEmail: "",
      ArticleCommentUrl: "",

      /*commentContent: '',*/

      createTime: "",
      commentList: "",
      BlogDetailSkeletonScreen: true,
      parentCommentId: 0
    };
  },
  methods: {
    // 初始化页面
    InitPage: function () {
      var That = this;
      this.SQFrontAjax({
        Url: "/api/getBlogDetail",
        UploadData: {
          id: Number(this.$route.params.id),
        },
        Success: function (data) {
          // 关闭骨架屏
          That.BlogDetailSkeletonScreen = false;

          That.Article = data;
          That.Article.createTime = That.DateFormat(That.Article.createTime);

          const rendererMD = new Marked.Renderer();
          rendererMD.image = function (href, title, text) {
            return `<img onclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${title ? title : ""
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

          That.Article.content = Marked(That.Article.content).replace(
            /<pre>/g,
            "<pre class='language-html'>"
          ); //Markdown格式字符串转html
        },
      });
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

      if (Store.getters.GetMessageText) {
        var MatchedMessageText = That.MatchEmotion(
          Store.getters.GetMessageText
        );

        // 新增评论
        That.SQFrontAjax({
          Url: "/api/addComment",
          UploadData: {
            articleId: Number(That.$route.params.id),
            commentContent: MatchedMessageText,
            comParentId: Number(That.parentCommentId)
          },
          Success: function () {
            That.GetCommentList();
          },
        });

        // 清空textarea
        Store.commit("CleanMessageText");
      } else {
        Store.commit("ChangeTip", {
          Show: true,
          title: "评论内容不能为空呦"
        });
      }
    },
    // 获取评论列表
    GetCommentList: function () {
      var That = this;
      this.SQFrontAjax({
        Url: "/api/getCommentList",
        UploadData: {
          articleId: this.$route.params.id,
        },
        Success: function (data) {
          That.commentList = data;
        },
      });
    },
    // 回复评论
    AnswerComment: function (ComentNickName, parentId) {
      Store.commit("ChangeMessageText", "@" + ComentNickName + ":");
      this.$refs.MessageText.focus();

      this.parentCommentId = parentId;
    },
    // 打开表情包弹框
    OpenEmotions: function () {
      this.$refs.EmotionB.OpenEmotion(true);
    },
    //表情选中后追加在input
    AppendMessageText: function () {
      // 光标聚焦
      this.$refs.MessageText.focus();
    },
    getIconAdress: function (iconNo) {
      return require("@/static/img/default_headicon_" +
        iconNo.toString() +
        ".jpeg");
    },
  },
  mounted: function () {
    window.showMarkedImage = function (e, href) {
      let el = e.target
      let rfs =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullscreen ||
        el.msRequestFullscreen
      if (rfs) rfs.call(el); // 这里rfs()会执行失败，因为rfs返回的是个单纯的函数，没有对象去调用它了
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
