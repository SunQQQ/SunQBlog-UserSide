<template>
  <div class="block">
    <div class="title-part">
      <div class="module-title">流量趋势</div>
      <div class="day-switch">
        <div
          :class="lineDateType == '7' ? 'item active' : 'item'"
          @click="setLineChart(7)"
        >
          最近7天
        </div>
        <div
          :class="lineDateType == '14' ? 'item active' : 'item'"
          @click="setLineChart(14)"
        >
          最近14天
        </div>
        <div
          :class="lineDateType == '30' ? 'item active' : 'item'"
          @click="setLineChart(30)"
        >
          最近30天
        </div>
        <div
          :class="lineDateType == '60' ? 'item active' : 'item'"
          @click="setLineChart(60)"
        >
          最近60天
        </div>
      </div>
    </div>
    <div class="line-chart" id="line-chart"></div>
  </div>
</template>

<script>
import Store from "../../../store";
import Vue from 'vue';
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");

require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/grid");

export default {
  name: "line-chart",
  data: function () {
    return {
      // 折线图数据
      lineDateType: "近7天",
      lineChartOption: {
        // title: {text: '数据趋势'},
        tooltip: {
          trigger: "axis",
        },
        xAxis: { data: [] },
        yAxis: {},
        legend: {
          data: ["博客浏览量", "博客访问IP数"],
          top: "4%",
        },
        series: [
          {
            name: "博客浏览量",
            type: "line",
            data: [],
            itemStyle: {
              normal: {
                color: "#01aaed",
                label: { show: true },
                lineStyle: { color: "#01aaed" },
              },
            },
          },
          {
            name: "博客访问IP数",
            type: "line",
            data: [],
            itemStyle: {
              normal: {
                color: "#F72C5B",
                label: { show: true },
                lineStyle: { color: "#F72C5B" },
              },
            },
          },
        ],
        grid: {
          bottom: "20px", // 图表距离容器下方边距
        },
      },
      // 折线图对象
      lineChart: "",
      // 指标区域的数据
      quateData:{}
    };
  },
  methods: {
    /**
     * 渲染折线图
     * dayNum: 加载数据的周期 比如：1/7/14天
     * init: 判断是初始化状态，或是时间周期的切换；  初始状态时只有折线图弹出loading，且不记录操作日志
     */
    setLineChart: function (dayNum, init) {
      let that = this,
        totalVisit = 0,
        totalIp = 0;

      // 切换时间维度高亮，并修改指标区第三个指标名称
      that.lineDateType = dayNum;
      if (!that.lineChart)
        that.lineChart = that.$echarts.init(
          document.getElementById("line-chart")
        );
      this.SQFrontAjax({
        Url: "/api/visitCount/foreend",
        UploadData: {
          endTime: this.getSQTime().split(" ")[0],
          dayNum: dayNum ? dayNum : 7,
        },
        Success: function (data) {
          let dates = [],
            readings = [],
            ipArray = [];

          // 因处理数据耗时较长，添加loading，并提前渲染折线图，缓解页面空白太久
          Store.commit("ChangeLoading", true);
          that.lineChart.setOption(that.lineChartOption);

          // 指标区域数据
          if (!that.quateData.todayVisit) that.quateData.todayVisit = data.dateCountList[0].reading; // 设置今日浏览量PV
          if (!that.quateData.todayIpNum) that.quateData.todayIpNum = data.dateCountList[0].ipNum; // 设置今日IP数
          if (!that.quateData.yesterdayVisit)
            that.quateData.yesterdayVisit = data.dateCountList[1].reading; // 设置昨日浏览量PV
          if (!that.quateData.yesterdayIpNum)
            that.quateData.yesterdayIpNum = data.dateCountList[1].ipNum; // 设置昨日IP数

          data.dateCountList.forEach(function (item) {
            dates.push(item.time);
            readings.push(item.reading);
            ipArray.push(item.ipNum);
            totalVisit += item.reading;
            totalIp += item.ipNum;
          });

          // 指标区域数据
          that.quateData.dateVisit = totalVisit; // 设置选中时间维度下的访问量
          that.quateData.allVisitIp = totalIp;
          that.quateData.lineDateType = dayNum;

          that.$emit('getQuotaVal',that.quateData);

          that.lineChartOption.xAxis.data = dates.reverse();
          that.lineChartOption.series[0].data = readings.reverse();
          that.lineChartOption.series[1].data = ipArray.reverse();

          that.lineChart.setOption(that.lineChartOption);

          Store.commit("ChangeLoading", false);
          // 初始化时不创建日志,切换时间维度后，记日志并刷新日志列表
          if (!init) {
            that.createLog({
              moduleType: "button",
              operateType: "切换折线图时间维度",
              operateContent: "近" + dayNum + "天",
            });
          }
        },
      });
    },
  },
  mounted: function () {
    Vue.prototype.$echarts = echarts;
    this.setLineChart(7, "init");
  },
};
</script>
    
<style scoped lang="less">
@import "../../../static/css/analytic";
</style>       
 