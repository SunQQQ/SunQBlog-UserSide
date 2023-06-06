<template>
  <div class="ArticleDetailContent">
    <div class="ArticleDetailContentTab" style="padding: 1rem;height: 95vh;">
      <div style="text-align: center;padding: 30px 0;"><h2>六零齿成绩查询</h2></div>
      <div class="ArticleDetailCommentFirstLine">
        <div class="UserHeadIcon">
          <img src="../../static/img/DefaultHeadIcon.jpg" />
        </div>
        <div class="CommentUserInfo">
          <input placeholder="准考证号（必填）" v-model="stuId" />
        </div>
      </div>
      <div class="ArticleDetailCommentContent">
        <textarea v-model="MessageText" ref="MessageText" placeholder="成绩结果" readonly></textarea>
      </div>
      <div class="CommentSubmitLine">
        <div class="CommentSubmitButton" @click="getScore()">查询</div>
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
      
      if(this.stuId){
        Store.commit('ChangeLoading', true);
      }else{
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
</style>