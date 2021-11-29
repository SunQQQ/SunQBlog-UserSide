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
              <p>一周访问量</p>
              <p class="num">{{ weekVisit }}</p>
            </div>
            <div class="quota-item">
              <p>历史访问量</p>
              <p class="num">{{ allVisitNum }}</p>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="line-chart" id="line-chart"></div>
        </div>
        <div class="block">
          <div class="map-chart" id="map"></div>
        </div>
        <div class="block">
          <!--          <div class="block-name">分日报表</div>-->
          <div class="list">
            <div class="list-head">
              <div class="list-td">访问时间</div>
              <div class="list-td align">访问位置</div>
              <!--              <div class="list-td align">访问来源</div>-->
              <div class="list-td align">访问浏览器</div>
            </div>
            <div :class="i%2==0 ? 'list-tr single' : 'list-tr'" v-for="(item,i) in visitListData">
              <div class="list-td">{{ item.time }}</div>
              <div class="list-td align">{{ item.location }}</div>
              <!--              <div class="list-td align">{{ item.fromUrl }}</div>-->
              <div class="list-td align">{{ item.browser }}</div>
            </div>
            <div class="list-item"></div>
          </div>
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

  </div>
</template>

<script>
import Store from "../../store";
import china from '../../static/map/china.json'
import citys from '../../static/map/citys'

export default {
  name: "analytics",
  data: function () {
    return {
      todayVisit: 0,
      yesterdayVisit: 0,
      allVisitNum: 0,
      weekVisit: 0,
      // 折线图数据
      lineChartOption: {
        // title: {text: '数据趋势'},
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          type: 'plain'
        },
        xAxis: {data: []},
        yAxis: {},
        series: [{
          name: '博客访问量(人/天)', type: 'line', data: [],
          itemStyle: {
            normal: {
              color:'#01aaed',
              label: {show: true},
              lineStyle: {color: '#01aaed'}
            }
          }
        }],
        grid: {
          bottom: '20px' // 图表距离容器下方边距
        }
      },
      visitListData: [],
      // 地图参数
      mapList: [],
      mapOption: {
        legend: {
          data: ['博客访问来源']
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
          name: '博客访问来源', type: 'scatter', data: [],
          itemStyle: {
            shadowBlur: 0,
            shadowColor: '#333',
            normal: {
              color:'#01aaed',
              lineStyle: {color: '#01aaed'}
            }
          },
          coordinateSystem: 'geo',
          symbolSize: 5,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
        }
        ]
      }
    }
  },
  methods: {
    // 渲染折线图
    setLineChart: function () {
      let that = this,
        totalVisit = 0,
        lineChart = that.$echarts.init(document.getElementById('line-chart'));
      this.SQFrontAjax({
        Url: '/api/visitCount/foreend',
        UploadData: {
          endTime: this.getSQTime().split(' ')[0],
          dayNum: 7
        },
        Success: function (data) {
          that.todayVisit = data.dateCountList[0].reading;
          that.yesterdayVisit = data.dateCountList[1].reading;

          let dates = [], readings = [];
          data.dateCountList.forEach(function (item) {
            dates.push(item.time);
            readings.push(item.reading);
            totalVisit += item.reading;
          });
          that.lineChartOption.xAxis.data = dates.reverse();
          that.lineChartOption.series[0].data = readings.reverse();
          that.weekVisit = totalVisit;
          lineChart.setOption(that.lineChartOption);
        }
      });
    },
    // 渲染列表
    setVisitList: function () {
      let that = this;
      this.SQFrontAjax({
        Url: '/api/visitRead/foreend',
        UploadData: {},
        Success: function (data) {
          that.allVisitNum = data.length;
          data.forEach(function (item) {
            if (JSON.stringify(item.location) == '[]') item.location = '银河系';
            if (!item.browser) item.browser = "secret";
            if (!item.fromUrl) item.fromUrl = '直接访问';
          });
          that.visitListData = data;
        }
      });
    },
    // 渲染地图
    setMap: function () {
      let map, that = this;

      this.SQFrontAjax({
        Url: '/api/visitCount/foreend',
        UploadData: {
          endTime: this.getSQTime().split(' ')[0],
          dayNum: 1
        },
        Success: function (data) {
          data.dateList.forEach(function (item, i) {
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

          console.log('that.mapList', that.mapList);

          that.mapOption.series[0].data = that.mapList;

          map = that.$echarts.init(document.getElementById('map'));
          that.$echarts.registerMap('china', china);
          map.setOption(that.mapOption);
        }
      });
    }
  },
  mounted: function () {
    Store.commit("ChangeActive", 5);// 切换Topbar高亮

    this.setLineChart();
    this.setVisitList();
    this.setMap();
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
  padding: 1rem;
  border-radius: 2px;
}

.block-name {
  padding: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
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
