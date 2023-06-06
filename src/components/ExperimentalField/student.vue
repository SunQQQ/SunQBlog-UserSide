<template>
  <div class="ArticleDetailContent">
    <div class="ArticleDetailContentTab student-page">
      <div class="top-div">
        2023年国家医师资格（临床类别、口腔类别）实践技能考试周口考点成绩查询
      </div>
      <div class="score-content">
        <div class="score-title">考试成绩查询</div>
        <div class="UserHeadIcon">
          准考证号：
        </div>
        <div class="ArticleDetailCommentFirstLine" style="padding: 10px 0 10px 0rem;">
          <div class="CommentUserInfo">
            <input class="score-input" placeholder="准考证号（必填）" v-model="stuId" />
          </div>
        </div>
        <div class="UserHeadIcon">
          考试结果：
        </div>
        <div class="ArticleDetailCommentContent" style="margin:10px 0">
          <textarea class="score-textarea" v-model="MessageText" ref="MessageText" placeholder="成绩结果" readonly></textarea>
        </div>
        <div class="CommentSubmitLine" style="text-align: center;">
          <div class="CommentSubmitButton score-submit" @click="getScore()">查询</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Store from '../../store';
export default {
  name: "TimeLine",
  data: function () {
    return {
      stuId: '',
      MessageText: '查询结果'
    }
  },
  methods: {
    getScore: function () {
      let that = this;

      if (this.stuId) {
        Store.commit('ChangeLoading', true);
      } else {
        that.MessageText = '准考证号未输入';
        return
      }


      axios.post('/api/getScore/foreend', { stuId: this.stuId }, { timeout: 10000 }).then(function (response) {
        Store.commit('ChangeLoading', false);
        console.log('data', response.data);
        if (response.data.length == 0) {
          that.MessageText = '查无数据';
        } else {
          that.MessageText = response.data[0];
        }
      }).catch(function (error) {
        Store.commit('ChangeLoading', false);
        that.MessageText = "服务器异常";
      });
    }
  },
  mounted: function () {
    document.getElementsByClassName("MobileTopBar")[0].style.display = 'none';
    document.getElementsByClassName("PcTopBar")[0].style.display = 'none';
    document.title = '六零齿学院';
    // 创建日志
    // this.createLog({
    //   moduleType:'menu',
    //   operateType:'选择菜单',
    //   operateContent:'时间轴'
    // });
  }
}
</script>

<style scoped lang="less">
@import "../../static/css/BlogDetail";
.student-page{
  background-color: #ECF1F7;
  height: 95vh;
  padding: 0;
}
.top-div {
  text-align: center;
  padding: 30px 0;
  background-color: #3B75A7;
  color: white;
  font-size: 14px;
  margin-bottom: 5rem;
}
.score-content{
  padding: 1rem;
  margin: 1rem;
  background-color: white;
}
.score-title{
  font-size: 18px;
  margin-bottom: 25px;
  font-weight: bolder;
}
.score-input{
  margin: 0!important;
}
.score-submit{
  width: 16rem;
  border-radius: 15px;
  background-color: #3B75A7;
  color: white;
  border: 1px solid #3B75A7;
  margin: 1.5rem 0;
}
.score-textarea{
  margin: 5px 0;
  font-size: 16px;
}
</style>