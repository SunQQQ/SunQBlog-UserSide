<template>
  <main>
    <h1 class="mainTitle">社区数据看板</h1>
    <div class="content">
      <div class="block" style="margin-top: 0">
        <div class="title-part">
          <div class="module-title">数据概览</div>
          <div class="day-switch total-number give-up">数据统计至：{{ latestCutoffTime }}</div>
        </div>
        <!-- <div class="module-title" style="margin-bottom: 1rem;">数据概览</div> -->
        <div class="quota-content">
          <div class="quota-item">
            <p class="num" style="color:#fac858">{{ totalIpNum }}</p>
            <p>累计IP</p>
          </div>
          <div class="quota-item mobile-hide">
            <p class="num" style="color:#91cc75">{{ totalVisit }}</p>
            <p>累计PV</p>
          </div>
          <div class="quota-item">
            <p class="num" style="color:#5470c6">{{ totalRegist }}</p>
            <p>累计注册</p>
          </div>
          <div class="quota-item">
            <p class="num" style="color:#ee6666">{{ totalComment }}</p>
            <p>累计评论</p>
          </div>
          <div class="quota-item mobile-hide">
            <p class="num" style="color:#73c0de">{{ totalLeaveMess }}</p>
            <p>累计留言</p>
          </div>
          <div class="quota-item">
            <p class="num" style="color:#3ba272">{{ totalArticle }}</p>
            <p>累计文章</p>
          </div>
        </div>
        <div class="quota-content">
          <div class="quota-item">
            <p class="num" style="color:#fac858">{{ todayIpNum }}</p>
            <p>今日IP</p>
          </div>
          <div class="quota-item mobile-hide">
            <p class="num" style="color:#91cc75">{{ todayVisit }}</p>
            <p>今日PV</p>
          </div>
          <div class="quota-item">
            <p class="num" style="color:#5470c6">{{ todayRegist }}</p>
            <p>今日注册</p>
          </div>
          <div class="quota-item">
            <p class="num" style="color:#ee6666">{{ todayComment }}</p>
            <p>今日评论</p>
          </div>
          <div class="quota-item mobile-hide">
            <p class="num" style="color:#73c0de">{{ todayLeaveMess }}</p>
            <p>今日留言</p>
          </div>
          <div class="quota-item">
            <p class="num" style="color:#3ba272">{{ todayArticle }}</p>
            <p>今日文章</p>
          </div>
        </div>
      </div>
      <lineChart v-on:getQuotaVal="getQuotaVal"></lineChart>
      <map-chart></map-chart>
      <pie-chart></pie-chart>
      <userAction></userAction>
    </div>
    <Heartfelt></Heartfelt>
  </main>
</template>

<script>
import Store from "../../store";
import Heartfelt from '../SonCompnent/Heartfelt';
import Pagination from '../SonCompnent/Pagination';
import lineChart from '@/components/SonCompnent/analytics/line-chart';
import mapChart from '@/components/SonCompnent/analytics/map-chart';
import pieChart from '@/components/SonCompnent/analytics/pie-chart';
import userAction from '@/components/SonCompnent/analytics/user-action';

export default {
  name: "analyticsPlus",
  components: {
    Pagination,

    Heartfelt,
    lineChart,
    mapChart,
    pieChart,
    userAction
  },
  data: function () {
    return {
      todayVisit: 0, // 今日浏览量
      totalVisit: 0, // 累计浏览量
      todayIpNum: 0, // 今日IP数
      totalIpNum: 0, // 累计IP数

      dateVisit: 0, // 近7/14/30天访问量
      yesterdayVisit: 0,
      yesterdayIpNum: 0,
      allVisitIp: 0,
      lineDateType: 0,

      todayRegist: 0, // 注册数据
      totalRegist: 0,
      todayArticle: 0, // 文章数据
      totalArticle: 0,
      todayComment: 0, // 评论数据
      totalComment: 0,
      todayLeaveMess: 0, // 留言数据
      totalLeaveMess: 0,

      latestCutoffTime: 'XXXX-XX-XX: XX:XX' // 最新数据截止时间
    }
  },
  methods: {
    // 本事件用来监听折线图子组件，从子组件拿到指标数据
    getQuotaVal: function (obj) {
      this.todayVisit = obj.todayVisit; // 今日浏览量
      this.todayIpNum = obj.todayIpNum; // 今日IP数
      this.dateVisit = obj.dateVisit; // 近7/14/30天访问量
      this.yesterdayVisit = obj.yesterdayVisit;
      this.yesterdayIpNum = obj.yesterdayIpNum;
      this.allVisitIp = obj.allVisitIp;

      this.lineDateType = obj.lineDateType;
    },
    // 获取顶部指标区域数据
    topNum() {
      let that = this;
      that.SQFrontAjax({
        Url: "/api/getUserData",
        Success: function (data) {
          // 注册数据
          that.todayRegist = data.todayUser;
          that.totalRegist = data.totalUser;
          // 文章
          that.todayArticle = data.todayArticle;
          that.totalArticle = data.totalArticle;
          // 评论
          that.todayComment = data.todayComment;
          that.totalComment = data.totalComment;
          // 留言
          that.todayLeaveMess = data.todayLeaveMess;
          that.totalLeaveMess = data.totalLeaveMess;
        }
      });

      that.SQFrontAjax({
        Url: "/api/getLogIp",
        Success: function (data) {
          // 浏览量
          that.todayVisit = data.todayPvCount;
          that.totalVisit = data.totalPvCount;
          // IP数
          that.todayIpNum = data.todayIpCount;
          that.totalIpNum = data.totalIpCount;

          that.createLog({
            page: "访问统计",
            action: "打开",
            actionObject: "访问统计页",
            actionDesc: ""
          });
        }
      });
    },
    getLatestCutoffTime() {
      let that = this;
      that.SQFrontAjax({
        Url: "/api/getLatestCutoffTime",
        Success: function (data) {
          that.latestCutoffTime = data.latestCutoffTime;
        }
      });
    }
  },
  mounted: function () {
    var that = this;
    Store.commit("ChangeActive", 5); // 切换Topbar高亮
    Store.commit("changeFooter", true); // 展示footer 

    that.topNum();
    that.getLatestCutoffTime();
  }
}
</script>

<style scoped lang="less">
@import "../../static/css/analytic";
</style>
