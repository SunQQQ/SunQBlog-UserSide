<template>
  <section class="block">
    <div class="title-part">
      <div class="module-title">流量趋势</div>
      <div class="day-switch">
        <div
          :class="lineDateType == '8' ? 'item active' : 'item'"
          @click="setLineChart(8)"
        >
          近8天
        </div>
        <div
          :class="lineDateType == '14' ? 'item active' : 'item'"
          @click="setLineChart(14)"
        >
          近14天
        </div>
        <div
          :class="lineDateType == '30' ? 'item active' : 'item'"
          @click="setLineChart(30)"
        >
          近30天
        </div>
        <div
          :class="lineDateType == '60' ? 'item active' : 'item'"
          @click="setLineChart(60)"
        >
          近60天
        </div>
      </div>
    </div>
    <div class="line-chart" id="line-chart"></div>
  </section>
</template>

<script>
import Store from "../../../store";

export default {
  name: "line-chart",
  data: function () {
    return {
      // 折线图数据
      lineDateType: "近8天",
      lineChartOption: {
        // title: {text: '数据趋势'},
        tooltip: {
          trigger: "axis",
        },
        xAxis: { data: [] },
        yAxis: {},
        legend: {
          data: ["浏览量", "IP数","注册量"],
          top: "4%",
          left: "right"
        },
        series: [
          {
            name: "浏览量",
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
            name: "IP数",
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
          {
            name: "注册量",
            type: "line",
            data: [],
            itemStyle: {
              normal: {
                color: "#fac858",
                label: { show: true },
                lineStyle: { color: "#fac858" },
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
     * dayNum: 加载数据的周期 比如：1/8/14天
     * init: 判断是初始化状态，或是时间周期的切换；  初始状态时只有折线图弹出loading，且不记录操作日志
     */
    setLineChart: function (dayNum, init) {
      let that = this;

      // 切换时间维度高亮，并修改指标区第三个指标名称
      that.lineDateType = dayNum;
      if (!that.lineChart)
        that.lineChart = that.$echarts.init(
          document.getElementById("line-chart")
        );
      this.SQFrontAjax({
        Url: "/api/ip-daily",
        UploadData: {
          days: dayNum ? dayNum : 8,
        },
        Success: function (data) {
          let dates = [],
            readings = [],
            ipArray = [],
            register = [];

          // 因处理数据耗时较长，添加loading，并提前渲染折线图，缓解页面空白太久
          Store.commit("ChangeLoading", true);
          that.lineChart.setOption(that.lineChartOption);

          data.forEach(function (item) {
            dates.push(item.visitDay);
            readings.push(item.pv);
            ipArray.push(item.ip);
            register.push(item.register);
          });
          
          that.lineChartOption.xAxis.data = dates;
          that.lineChartOption.series[0].data = readings;
          that.lineChartOption.series[1].data = ipArray;
          that.lineChartOption.series[2].data = register;

          // that.$emit('getQuotaVal',that.quateData);

          that.lineChart.setOption(that.lineChartOption);

          Store.commit("ChangeLoading", false);
        },
      });
    },
  },
  mounted: function () {
    this.setLineChart(8, "init");
  },
};
</script>
    
<style scoped lang="less">
@import "../../../static/css/analytic";
</style>       
 