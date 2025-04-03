<template>
  <div>
    <div class="content">
      <div class="block" style="margin-top: 0">
        <div class="quota-content">
          <div class="quota-item">
            <p>今日注册用户量</p>
            <p class="num">{{ todayRegist }}</p>
          </div>
          <div class="quota-item">
            <p>今日浏览量(PV)</p>
            <p class="num">{{ todayVisit }}</p>
          </div>
          <div class="quota-item">
            <p>今日IP量</p>
            <p class="num">{{ todayIpNum }}</p>
          </div>
          <div class="quota-item">
            <p>今日文章发布量</p>
            <p class="num">{{ todayArticle }}</p>
          </div>
          <div class="quota-item">
            <p>今日评论量</p>
            <p class="num">{{ todayComment }}</p>
          </div>
          <div class="quota-item">
            <p>今日留言量</p>
            <p class="num">{{ todayLeaveMess }}</p>
          </div>
        </div>
        <div class="quota-content">
          <div class="quota-item">
            <p>累计注册用户量</p>
            <p class="num">{{ totalRegist }}</p>
          </div>
          <div class="quota-item">
            <p>累计浏览量(PV)</p>
            <p class="num">{{ totalVisit }}</p>
          </div>
          <div class="quota-item">
            <p>累计IP量</p>
            <p class="num">{{ totalIpNum }}</p>
          </div>
          <div class="quota-item">
            <p>累计文章发布量</p>
            <p class="num">{{ totalArticle }}</p>
          </div>
          <div class="quota-item">
            <p>累计评论量</p>
            <p class="num">{{ totalComment }}</p>
          </div>
          <div class="quota-item">
            <p>累计留言量</p>
            <p class="num">{{ totalLeaveMess }}</p>
          </div>
        </div>
        <!-- <div class="quota-content">
          <div class="quota-item">
            <p>今日浏览量(PV)</p>
            <p class="num">{{ todayVisit }}</p>
          </div>
          <div class="quota-item">
            <p>今日IP</p>
            <p class="num">{{ todayIpNum }}</p>
          </div>
          <div class="quota-item">
            <p>昨日浏览量</p>
            <p class="num">{{ yesterdayVisit }}</p>
          </div>
          <div class="quota-item">
            <p>昨日IP</p>
            <p class="num">{{ yesterdayIpNum }}</p>
          </div>
          <div class="quota-item">
            <p>近{{ lineDateType }}天PV</p>
            <p class="num">{{ dateVisit }}</p>
          </div>
          <div class="quota-item">
            <p>近{{ lineDateType }}天IP</p>
            <p class="num">{{ allVisitIp }}</p>
          </div>
        </div> -->
      </div>
      <lineChart v-on:getQuotaVal="getQuotaVal"></lineChart>
      <map-chart></map-chart>
      <pie-chart></pie-chart>
      <userAction></userAction>
    </div>
    <Heartfelt></Heartfelt>
  </div>
</template>

<script>
import Store from "../../store";
import Heartfelt from '../SonCompnent/Heartfelt';
import Pagination from '../SonCompnent/Pagination';
// import lineChart from '@/components/SonCompnent/analytics/line-chart';
// import mapChart from '@/components/SonCompnent/analytics/map-chart';
// import pieChart from '@/components/SonCompnent/analytics/pie-chart';
// import userAction from '@/components/SonCompnent/analytics/user-action';

export default {
  name: "analyticsPlus",
  components: {
    Pagination,

    Heartfelt,
    // lineChart,
    // mapChart,
    // pieChart,
    // userAction
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
      totalLeaveMess: 0
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
        }
      });
    }
  },
  mounted: function () {
    var that = this;
    Store.commit("ChangeActive", 5); // 切换Topbar高亮
    Store.commit("changeFooter", true); // 展示footer 

    that.topNum();

    // 创建日志
    // this.createLog({
    //   moduleType: 'menu',
    //   operateType: '选择菜单',
    //   operateContent: '访问统计'
    // });
  }
}
</script>

<style scoped lang="less">
@import "../../static/css/analytic";
</style>
