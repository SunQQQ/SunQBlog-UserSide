<template>
  <div>
    <div class="FlexContent">
      <div class="LeftPart">
        <div class="block" style="margin-top: 0">
          <div class="quota-content">
            <div class="quota-item">
              <p>今日浏览量(PV)</p>
              <p class="num">{{ todayVisit }}</p>
            </div>
            <div class="quota-item">
              <p>今日IP数</p>
              <p class="num">{{ todayIpNum }}</p>
            </div>
            <div class="quota-item">
              <p>昨日浏览量(PV)</p>
              <p class="num">{{ yesterdayVisit }}</p>
            </div>
            <div class="quota-item">
              <p>昨日IP数</p>
              <p class="num">{{ yesterdayIpNum }}</p>
            </div>
            <div class="quota-item">
              <p>近{{ lineDateType }}天浏览量</p>
              <p class="num">{{ dateVisit }}</p>
            </div>
            <div class="quota-item">
              <p>近{{ lineDateType }}天IP数</p>
              <p class="num">{{ allVisitIp }}</p>
            </div>
          </div>
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
          <div class="title-part">
            <div class="module-title">流量趋势</div>
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
            <div class="module-title">用户轨迹</div>
            <div class="day-switch">
              <div :class="userActionDateType == '1' ? 'item active' : 'item'" @click="setUserAction(1)">今天</div>
              <div :class="userActionDateType == '2' ? 'item active' : 'item'" @click="setUserAction(2)">最近2天</div>
              <div :class="userActionDateType == '3' ? 'item active' : 'item'" @click="setUserAction(3)">最近3天</div>
            </div>
          </div>
          <div class="list">
            <div class="list-head">
              <div class="list-td">访问IP</div>
              <div class="list-td">操作内容</div>
              <div class="list-td align">访问位置</div>
              <!--              <div class="list-td align">访问来源</div>-->
              <div class="list-td align">浏览器</div>
              <div class="list-td align">访问时间</div>
            </div>
            <div :class="i%2==0 ? 'list-tr single' : 'list-tr'" v-for="(item,i) in userActionData" v-bind:key="i">
              <div class="list-td">{{ i }}</div>
              <div class="list-td">
                <!--{{ item.action ? item.action : ''}}-->
                <ul>
                  <li v-for="(item,i) in item.action" v-bind:key="i">{{item}}</li>
                </ul>
              </div>
              <div class="list-td align">{{ item.location }}</div>
              <!--<div class="list-td align">{{ item.fromUrl }}</div>-->
              <div class="list-td align">{{ item.browser }}</div>
              <div class="list-td align">{{ item.time }}</div>
            </div>
            <div class="list-item"></div>
          </div>
        </div>
        <!--<div class="block">
          <div class="module-title">操作日志</div>
          <div class="list">
            <div class="list-head">
              <div class="list-td">访问IP</div>
              <div class="list-td align">操作内容</div>
              <div class="list-td align">访问位置</div>
              &lt;!&ndash;              <div class="list-td align">访问来源</div>&ndash;&gt;
              <div class="list-td align">浏览器</div>
              <div class="list-td align">访问时间</div>
            </div>
            <div :class="i%2==0 ? 'list-tr single' : 'list-tr'" v-for="(item,i) in visitListData">
              <div class="list-td">{{ item.clientIp ? item.clientIp : '中国' }}</div>
              <div class="list-td">{{ item.operateType ? item.operateType + ':' + item.operateContent : '' }}</div>
              <div class="list-td align">{{ item.location }}</div>
              &lt;!&ndash;              <div class="list-td align">{{ item.fromUrl }}</div>&ndash;&gt;
              <div class="list-td align">{{ item.browser }}</div>
              <div class="list-td align">{{ item.time }}</div>
            </div>
            <div class="list-item"></div>
          </div>
          <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
        </div>-->
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
        todayVisit: 0, // 今日浏览量
        todayIpNum: 0, // 今日IP数
        dateVisit: 0, // 近7/14/30天访问量
        yesterdayVisit: 0,
        yesterdayIpNum: 0,
        allVisitIp: 0,
        // 折线图数据
        lineDateType: '近7天',
        lineChartOption: {
          // title: {text: '数据趋势'},
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {data: []},
          yAxis: {},
          legend: {
            data: ["博客浏览量", "博客访问IP数"],
            top: "4%"
          },
          series: [
            {
              name: '博客浏览量', type: 'line', data: [],
              itemStyle: {
                normal: {
                  color: '#01aaed',
                  label: {show: true},
                  lineStyle: {color: '#01aaed'}
                }
              }
            },
            {
              name: '博客访问IP数', type: 'line', data: [],
              itemStyle: {
                normal: {
                  color: '#F72C5B',
                  label: {show: true},
                  lineStyle: {color: '#F72C5B'}
                }
              }
            },
          ],
          grid: {
            bottom: '20px' // 图表距离容器下方边距
          },
        },
        visitListData: [],
        // 地图参数
        mapDateType: '今天',
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
        // 用户行为
        userActionDateType: 1,
        userActionData: '',
        // 折线图对象
        lineChart: '',
        // 地图对象
        map: ''
      }
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
        if (!that.lineChart) that.lineChart = that.$echarts.init(document.getElementById('line-chart'));
        this.SQFrontAjax({
          Url: '/api/visitCount/foreend',
          UploadData: {
            endTime: this.getSQTime().split(' ')[0],
            dayNum: dayNum ? dayNum : 7
          },
          Success: function (data) {
            let dates = [], readings = [], ipArray = [];

            // 因处理数据耗时较长，添加loading，并提前渲染折线图，缓解页面空白太久
            Store.commit('ChangeLoading', true);
            that.lineChart.setOption(that.lineChartOption);

            if (!that.todayVisit) that.todayVisit = data.dateCountList[0].reading;     // 设置今日浏览量PV
            if (!that.todayIpNum) that.todayIpNum = data.dateCountList[0].ipNum;     // 设置今日IP数
            if (!that.yesterdayVisit) that.yesterdayVisit = data.dateCountList[1].reading; // 设置昨日浏览量PV
            if (!that.yesterdayIpNum) that.yesterdayIpNum = data.dateCountList[1].ipNum; // 设置昨日IP数

            data.dateCountList.forEach(function (item) {
              dates.push(item.time);
              readings.push(item.reading);
              ipArray.push(item.ipNum);
              totalVisit += item.reading;
              totalIp += item.ipNum;
            });

            that.dateVisit = totalVisit; // 设置选中时间维度下的访问量
            that.allVisitIp = totalIp;
            that.lineChartOption.xAxis.data = dates.reverse();
            that.lineChartOption.series[0].data = readings.reverse();
            that.lineChartOption.series[1].data = ipArray.reverse();
            that.lineChart.setOption(that.lineChartOption);

            Store.commit('ChangeLoading', false);
            // 初始化时不创建日志,切换时间维度后，记日志并刷新日志列表
            if (!init) {
              that.createLog({
                moduleType: 'button',
                operateType: '切换折线图时间维度',
                operateContent: '近' + dayNum + '天'
              });
            }
          }
        });
      },
    
      /**
       * 渲染地图
       * dayNum: 加载数据的周期 比如：1/7/14天
       * init: 判断是初始化状态，或是时间周期的切换；  初始状态时只有折线图弹出loading，且不记录操作日志。切换日期时弹出loading并记录日志
       */
      setMap: function (dayNum, init) {
        let that = this;
        that.mapDateType = dayNum;
        that.mapList = [];

        this.SQFrontAjax({
          Url: '/api/visitCount/foreend',
          noLoading: init ? 'yes' : '',
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

            if (!that.map) that.map = that.$echarts.init(document.getElementById('map'));
            if (dayNum == '1') {
              that.mapOption.series[0].label.show = true;
            } else {
              that.mapOption.series[0].label.show = false;
            }
            that.mapOption.series[0].data = that.mapList;
            that.$echarts.registerMap('china', china);
            that.map.setOption(that.mapOption, true);

            // 初始化时不创建日志。切换时间维度后，记日志并刷新日志列表
            if (!init) {
              that.createLog({
                moduleType: 'button',
                operateType: '切换地图时间维度',
                operateContent: '近' + dayNum + '天'
              });
            }
          }
        });
      },
      
      /**
       * 记录用户轨迹
       * dayNum: 加载数据的周期 比如：1/7/14天
       * init: 判断是初始化状态，或是时间周期的切换；  初始状态时只有折线图弹出loading，且不记录操作日志。切换日期时弹出loading并记录日志
       */
      setUserAction: function (dayNum,init) {
        let that = this,
          userActionObject = {};
        that.userActionDateType = dayNum;

        this.SQFrontAjax({
          Url: '/api/getUserAction/foreend',
          noLoading: init ? 'yes' : '',
          UploadData: {
            endTime: this.getSQTime().split(' ')[0],
            dayNum: dayNum ? dayNum : 1
          },
          Success: function (data) {
            userActionObject = data.userAction;

            for(let i in userActionObject){
              // 保护用户隐私，马赛克掉ip最后一组数字
              let array = i.split('.'),
                  currentIp = array[0] + '.' + array[1] + '.' + array[2] + '.***',
                  item = userActionObject[i];

              // 为用户IP打码
              userActionObject[currentIp] = item;
              delete userActionObject[i];

              // 因为对象当前本来的属性名已经被删掉了，所以得修改新的属性名对应的属性值
              if(JSON.stringify(userActionObject[currentIp].location) === '[]'){
                userActionObject[currentIp].location = '地球';
              }
            }

            that.userActionData = data.userAction;
          }
        });
        // 初始化时不创建日志。切换时间维度后，记日志并刷新日志列表
        if (!init) {
            that.createLog({
              moduleType: 'button',
              operateType: '切换用户轨迹时间维度',
              operateContent: '近' + dayNum + '天'
            });
          }
      },
      // 处理翻页
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

              // 创建日志
              That.createLog({
                moduleType: 'pageTurn',
                operateType: '下拉访问日志列表到',
                operateContent: '第' + (SelectPage + 1) + '页'
              });

            }
          }
        });
      },
    },
    mounted: function () {
      var that = this;
      Store.commit("ChangeActive", 5);// 切换Topbar高亮

      Vue.prototype.$echarts = echarts;
      this.setLineChart(7, 'init');
      this.setMap(1, 'init');
      this.setUserAction(1,'init');
      // this.setVisitList();

      // 创建日志
      this.createLog({
        moduleType: 'menu',
        operateType: '选择菜单',
        operateContent: '访问统计'
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

  .list {
    border: 1px solid #e9e9e9;
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

  .item:hover {
    color: rgba(1, 189, 255, 0.75);
  }

  .active {
    color: #01aaed;
  }

  .line-chart {
    height: 300px;
    margin-top: 1.5rem;
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
    border-bottom: 1px solid #e9e9e9;
  }

  .list-td{
    flex: 1;
    padding-left: 1rem;
  }

  .list-td:nth-child(1){
    flex: 18%;
  }

  .list-td:nth-child(2){
    flex: 37%;
  }

  .list-td:nth-child(3){
    flex: 10%;
  }

  .list-td:nth-child(4){
    flex: 10%;
  }

  .list-td:nth-child(5){
    flex: 25%;
    border-right: none;
  }

  .list-td ul{
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 16px;
  }

  .list .single {
    background: #f6f6f6;
  }

  .list .align {
    text-align: right;
    padding-right: 1rem;
  }
</style>
