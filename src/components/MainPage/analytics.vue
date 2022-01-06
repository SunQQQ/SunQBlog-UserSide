<template>
  <div>
    <div class="FlexContent">
      <div class="LeftPart">
        <div class="block" style="margin-top: 0">
          <div class="quota-content">
            <div class="quota-item">
              <p>今日访问量</p>
              <p class="num">{{ todayVisit }}</p>
            </div>
            <div class="quota-item">
              <p>昨日访问量</p>
              <p class="num">{{ yesterdayVisit }}</p>
            </div>
            <div class="quota-item">
              <p>近{{ lineDateType }}天访问量</p>
              <p class="num">{{ dateVisit }}</p>
            </div>
            <div class="quota-item">
              <p>历史访问量</p>
              <p class="num">{{ allVisitNum }}</p>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="title-part">
            <div class="module-title">访问量趋势</div>
            <div class="day-switch">
              <div :class="lineDateType == '7' ? 'item active' : 'item'" @click="setLineChart(7)">最近7天</div>
              <div :class="lineDateType == '14' ? 'item active' : 'item'" @click="setLineChart(14)">最近14天</div>
              <div :class="lineDateType == '30' ? 'item active' : 'item'" @click="setLineChart(30)">最近30天</div>
              <div :class="lineDateType == '60' ? 'item active' : 'item'" @click="setLineChart(60)">最近60天</div>
            </div>
          </div>
          <div class="line-chart" id="line-chart"></div>
        </div>
        <div class="block">
          <div class="title-part">
            <div class="module-title">访客来源</div>
            <div class="day-switch">
              <div :class="mapDateType == '1' ? 'item active' : 'item'" @click="setMap(1)">今天</div>
              <div :class="mapDateType == '14' ? 'item active' : 'item'" @click="setMap(14)">最近14天</div>
              <div :class="mapDateType == '30' ? 'item active' : 'item'" @click="setMap(30)">最近30天</div>
              <div :class="mapDateType == '60' ? 'item active' : 'item'" @click="setMap(60)">最近60天</div>
            </div>
          </div>
          <div class="map-chart" id="map"></div>
        </div>
        <div class="block">
          <div class="module-title">操作日志</div>
          <div class="list">
            <div class="list-head">
              <div class="list-td">访问IP</div>
              <div class="list-td align">操作内容</div>
              <div class="list-td align">访问位置</div>
              <!--              <div class="list-td align">访问来源</div>-->
              <div class="list-td align">访问浏览器</div>
              <div class="list-td align">访问时间</div>
            </div>
            <div :class="i%2==0 ? 'list-tr single' : 'list-tr'" v-for="(item,i) in visitListData">
              <div class="list-td">{{ item.clientIp ? item.clientIp : '中国' }}</div>
              <div class="list-td align">{{ item.operateType ? item.operateType+item.operateContent : '' }}</div>
              <div class="list-td align">{{ item.location }}</div>
              <!--              <div class="list-td align">{{ item.fromUrl }}</div>-->
              <div class="list-td align">{{ item.browser }}</div>
              <div class="list-td align">{{ item.time }}</div>
            </div>
            <div class="list-item"></div>
          </div>
          <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
        </div>
      </div>
      <div class="RightPart">
        <div class="GitPart">
          <div class="TopBackBlack"></div>
          <div class="GitPic">
            <img src="../../static/img/ZhihuIcon.jpg">
          </div>
          <div class="GitBack">
            <i class="iconfont TopBackBlackGit icon-github1"></i>
          </div>
          <div class="Content">
            <div class="GitName">孙权的Github</div>
            <a class="BlueButton" href="https://github.com/SunQQQ" target="_blank">博客源码</a>
            <div class="BlogStatistic">
              <div class="BlogStatisticItem">
                <div class="BlogStatisticItemNum">13</div>
                <div class="BlogStatisticItemText AboutMeGitData">Followers</div>
              </div>
              <div class="BlogStatisticItem">
                <div class="BlogStatisticItemNum">17</div>
                <div class="BlogStatisticItemText AboutMeGitData">Repositories</div>
              </div>
              <div class="BlogStatisticItem">
                <div class="BlogStatisticItemNum">88</div>
                <div class="BlogStatisticItemText AboutMeGitData">Star</div>
              </div>
            </div>
          </div>
        </div>
        <div class="BigBlock AboutMeMarginTop">
          <div class="TitleFontLine">Contacts</div>
          <div class="BlogStatistic" style="border-top: none;padding-bottom: 0">
            <div class="BlogStatisticItem">
              <a href="https://github.com/SunQQQ" target="_blank"><i class="iconfont icon-github AboutMeIcon"
                                                                     style="color:#948aec"></i></a>
            </div>
            <div class="BlogStatisticItem">
              <a href="https://www.zhihu.com/people/s-q-51-44-23/activities" target="_blank"><i
                class="iconfont icon-zhihu AboutMeIcon" style="color:#3dbd7d"></i></a>
            </div>
            <div class="BlogStatisticItem">
              <a href="https://blog.csdn.net/sun_qqq" target="_blank"><i class="iconfont icon-CN_csdnnet AboutMeIcon"
                                                                         style="color:#f78e3d"></i></a>
            </div>
            <div class="BlogStatisticItem">
              <i class="iconfont icon-youxiang AboutMeIcon" style="color:#49a9ee"></i>
            </div>
            <div class="BlogStatisticItem">
              <a href="https://music.163.com/#/user/home?id=386558098" target="_blank"><i
                class="iconfont AboutMeIcon icon-CN_NetEasemusic" style="color:#f46e65"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Heartfelt></Heartfelt>
  </div>
</template>

<script>
  import Store from "../../store";
  import china from '../../static/map/china.json'
  import citys from '../../static/map/citys'
  import Vue from 'vue';
  import Heartfelt from '../SonCompnent/Heartfelt';
  import Pagination from '../SonCompnent/Pagination';

  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/map');
  require('echarts/lib/chart/scatter');

  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  export default {
    name: "analytics",
    components: {
      Pagination,
      Heartfelt
    },
    data: function () {
      return {
        lineDateType:'近7天',
        mapDateType:'今天',
        todayVisit:0,
        dateVisit: 0, // 近7/14/30天访问量
        yesterdayVisit: 0,
        allVisitNum: 0,
        // 折线图数据
        lineChartOption: {
          // title: {text: '数据趋势'},
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {data: []},
          yAxis: {},
          series: [{
            name: '博客访问量', type: 'line', data: [],
            itemStyle: {
              normal: {
                color: '#01aaed',
                label: {show: true},
                lineStyle: {color: '#01aaed'}
              }
            }
          }],
          grid: {
            bottom: '20px' // 图表距离容器下方边距
          },
        },
        visitListData: [],
        // 地图参数
        mapList: [],
        mapOption: {
          legend: {
            data: []
          },
          tooltip: {
            show: false
          },
          geo: {
            map: "china",
            roam: false,// 一定要关闭拖拽
            zoom: 1.7,
            center: [105, 36], // 调整地图位置
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#000000"
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: "white",
                borderColor: "#aeaeae",
                borderWidth: 0.5
              },
              emphasis: {
                areaColor: "#f6f6f6",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0
              }
            }
          },
          series: [{
            name: '博客访问来源( 今日 )', type: 'scatter', data: [],
            itemStyle: {
              shadowBlur: 0,
              shadowColor: '#333',
              normal: {
                color: '#01aaed',
                lineStyle: {color: '#01aaed'}
              }
            },
            coordinateSystem: 'geo',
            symbolSize: 5,
            label: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color: '#727272'
            },
          }
          ]
        },

        // 折线图对象
        lineChart:'',
        // 地图对象
        map:''
      }
    },
    methods: {
      // 渲染折线图
      setLineChart: function (dayNum) {
        let that = this,
          totalVisit = 0;

        // 切换时间维度高亮，并修改指标区第三个指标名称
        that.lineDateType = dayNum;
        if(!that.lineChart) that.lineChart = that.$echarts.init(document.getElementById('line-chart'));
        this.SQFrontAjax({
          Url: '/api/visitCount/foreend',
          UploadData: {
            endTime: this.getSQTime().split(' ')[0],
            dayNum: dayNum ? dayNum : 7
          },
          Success: function (data) {
            let dates = [], readings = [];

            if(!that.todayVisit) that.todayVisit = data.dateCountList[0].reading;     // 设置今日访问量
            if(!that.yesterdayVisit) that.yesterdayVisit = data.dateCountList[1].reading; // 设置昨日访问量

            data.dateCountList.forEach(function (item) {
              dates.push(item.time);
              readings.push(item.reading);
              totalVisit += item.reading;
            });

            that.dateVisit = totalVisit; // 设置选中时间维度下的访问量
            that.lineChartOption.xAxis.data = dates.reverse();
            that.lineChartOption.series[0].data = readings.reverse();
            that.lineChart.setOption(that.lineChartOption);
          }
        });
      },
      // 渲染列表
      setVisitList: function () {
        let that = this;
        this.SQFrontAjax({
          Url: '/api/visitRead/foreend',
          UploadData: {
            PagnationData: {
              Skip: 0,
              Limit: 10
            }
          },
          Success: function (data) {
            that.allVisitNum = data.totalNum;
            data.list.forEach(function (item) {
              if (JSON.stringify(item.location) == '[]') item.location = '银河系';
              if (!item.browser) item.browser = "secret";
              if (!item.fromUrl) {
                item.fromUrl = '直接访问';
              } else {
                item.fromUrl = item.fromUrl.split('/')[2];
              }
            });
            that.visitListData = data.list;
          }
        });
      },
      // 渲染地图
      setMap: function (dayNum) {
        let that = this;
        that.mapDateType = dayNum;

        that.mapList = [];

        this.SQFrontAjax({
          Url: '/api/visitCount/foreend',
          UploadData: {
            endTime: this.getSQTime().split(' ')[0],
            dayNum: dayNum
          },
          Success: function (data) {
            data.dateList.forEach(function (item) {
              let location = item.location, formatLocation;
              if (typeof (location) == 'string') {
                formatLocation = location.replace('市', ''); // 数据库存放的城市名称包含'市'字，但是所有城市维度数据中城市名称没有
                if (citys[formatLocation]) {
                  that.mapList.push({
                    name: formatLocation,
                    value: citys[formatLocation]
                  });
                }
              }
            });

            console.log(that.mapList);
            // that.mapList = that.dedupe(that.mapList);
            console.log(that.mapList);

            if(!that.map) that.map = that.$echarts.init(document.getElementById('map'));
            if(dayNum == '1'){
              that.mapOption.series[0].label.show = true;
            }else {
              that.mapOption.series[0].label.show = false;
            }
            that.mapOption.series[0].data = that.mapList;
            that.$echarts.registerMap('china', china);
            that.map.setOption(that.mapOption,true);
          }
        });
      },
      //处理翻页
      ValueByPagition: function (SelectPage) {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/visitRead/foreend',
          UploadData: {
            PagnationData: {
              Skip: SelectPage * 10,
              Limit: 10
            }
          },
          Success: function (data) {
            data.list.forEach(function (item) {
              if (JSON.stringify(item.location) == '[]') item.location = '银河系';
              if (!item.browser) item.browser = "secret";
              if (!item.fromUrl) {
                item.fromUrl = '直接访问';
              } else {
                item.fromUrl = item.fromUrl.split('/')[2];
              }
            });
            That.visitListData = That.visitListData.concat(data.list);

            if (data.list.length != 10) {
              That.AticleBottom = true;
              // 停止分页器的滚动监听
              That.$refs.Pagi.SetUpdate(false);
            } else {
              That.$refs.Pagi.SetUpdate(true);
            }
          }
        });
      },
    },
    mounted: function () {
      Store.commit("ChangeActive", 5);// 切换Topbar高亮

      Vue.prototype.$echarts = echarts;
      this.setLineChart(7);
      this.setVisitList();
      this.setMap(1);

      // 创建日志
      this.createLog({
        moduleType:'menu',
        operateType:'菜单6'
      });
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/css/base";
  @import "../../static/css/AboutMe";

  .quota-content {
    .myflex(center);
    color: rgba(0, 0, 0, 0.65);
  }

  .quota-item {
    flex: 1;
    text-align: center;
  }

  .quota-item .num {
    font-size: 1.2rem;
    margin-bottom: 0;
  }

  .block {
    background-color: #FFFFFF;
    margin-top: 1rem;
    padding: 1.5rem;
    border-radius: 2px;
  }

  .block-name {
    padding: 0.5rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .title-part {
    display: flex;
    align-items: end;
  }

  .module-title {
    font-size: 18px;
    font-weight: 500;
    height: 18px;
    line-height: 18px;
  }

  .list{
    border:1px solid #e9e9e9;
    margin-top: 1.5rem;
  }

  .day-switch {
    color: #999;
    font-size: 12px;
    line-height: 12px;
    display: flex;
    vertical-align: middle;
    margin-left: 1rem;
    cursor: pointer;
  }

  .item {
    padding: 0 0.5rem;
    border-right: 1px solid #999;
  }

  .item:first-child {
    padding-left: 0;
  }

  .item:last-child {
    border-right: none;
  }

  .item:hover{
    color: rgba(1, 189, 255, 0.75);
  }

  .active {
    color: #01aaed;
  }

  .line-chart {
    height: 300px;
  }

  .map-chart {
    height: 400px;
  }

  .list-head {
    color: #8590a6;
    .myflex(center);
    border-bottom: 1px solid #f0f0f0;
    padding: 8px 0;
  }

  .list-tr {
    .myflex(center);
    //border-bottom: 1px solid #f0f0f0;
    padding: 8px 0;
  }

  .list-td {
    flex: 1;
    padding-left: 1rem;
  }

  .list .single {
    background: #f6f6f6;
  }

  .list .align {
    text-align: right;
    padding-right: 1rem;
  }
</style>
