<template>
  <div>
    <div class="content">
      <div class="block" style="margin-top: 0">
        <div class="quota-content">
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
        </div>
      </div>
      <lineChart></lineChart>

    </div>
    <Heartfelt></Heartfelt>
  </div>
</template>

<script>
import Store from "../../store";
import Heartfelt from '../SonCompnent/Heartfelt';
import Pagination from '../SonCompnent/Pagination';
import lineChart from '@/components/SonCompnent/analytics/line-chart'

export default {
  name: "analyticsPlus",
  components: {
    Pagination,
    Heartfelt,
    lineChart
  },
  data: function () {
    return {
      todayVisit: 0, // 今日浏览量
      todayIpNum: 0, // 今日IP数
      dateVisit: 0, // 近7/14/30天访问量
      yesterdayVisit: 0,
      yesterdayIpNum: 0,
      allVisitIp: 0,
      lineDateType: 0
    }
  },
  methods: {
  
  },
  mounted: function () {
    var that = this;
    Store.commit("ChangeActive", 5); // 切换Topbar高亮
    Store.commit("changeFooter",true); // 展示footer 

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
