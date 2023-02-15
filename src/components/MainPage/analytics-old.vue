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
      <div class="block padding-bottom-10 block-nopadding">
        <div class="title-part padding-left-right">
          <div class="module-title">数据占比</div>
          <div class="day-switch">
            <div :class="pieDateType == '1' ? 'item active' : 'item'" @click="setPie(1)">今天</div>
            <div :class="pieDateType == '14' ? 'item active' : 'item'" @click="setPie(14)">最近14天</div>
            <div :class="pieDateType == '30' ? 'item active' : 'item'" @click="setPie(30)">最近30天</div>
            <div :class="pieDateType == '60' ? 'item active' : 'item'" @click="setPie(60)">最近60天</div>
          </div>
        </div>
        <div class="pie-content" style="padding-bottom: 20px">
          <!-- <div class="pie-item scal-left" id="pie-chart2"></div>
          <div class="pie-item scal-center" id="pie-chart1"></div> -->
          <div class="pie-item scal-right" id="pie-chart4"></div>
          <div class="pie-item scal-right" id="pie-chart1"></div>
        </div>
        <div class="pie-content" style="padding-bottom: 20px">
          <div class="pie-item scal-right" id="pie-chart3"></div>
          <div class="pie-item scal-right" id="pie-chart2"></div>
        </div>
      </div>
      <div class="block">
        <div class="title-part">
          <div class="module-title">用户轨迹</div>
          <div class="day-switch">
            <div :class="userActionDateType == '1' ? 'item active' : 'item'" @click="setUserAction(1)">今天</div>
            <div :class="userActionDateType == '2' ? 'item active' : 'item'" @click="setUserAction(2)">最近2天</div>
            <div :class="userActionDateType == '3' ? 'item active' : 'item'" @click="setUserAction(3)">最近3天</div>
          </div>
          <div class="day-switch total-number give-up">轨迹总数：{{ totalUserAction }}条</div>
        </div>
        <div class="list">
          <div class="list-head">
            <div class="list-td">访问IP</div>
            <div class="list-td">操作内容</div>
            <div class="list-td align give-up">访问位置</div>
            <div class="list-td align give-up">访问设备</div>
            <div class="list-td align give-up">访问时间</div>
          </div>
          <div :class="item.curIp ? 'list-tr single' : 'list-tr'" v-for="(item, i) in userActionData" v-bind:key="i">
            <div class="list-td text-center">
              <div>{{ item.curIp ? item.curIp : i }}</div>
              <div class="your-ip" v-if="item.curIp">（你的轨迹）</div>
            </div>
            <div class="list-td action-padding">
              <ul>
                <li v-for="(item, i) in item.action" v-bind:key="i" v-html="item">{{item}}</li>
              </ul>
            </div>
            <div class="list-td align give-up">{{ item.location }}</div>
            <div class="list-td align line-heigh give-up" v-html="item.browser">
              {{ item.browser }}
            </div>
            <div class="list-td align give-up">{{ item.time }}</div>
          </div>
          <div class="list-item"></div>
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
require('echarts/lib/chart/pie');
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
        xAxis: { data: [] },
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
                label: { show: true },
                lineStyle: { color: '#01aaed' }
              }
            }
          },
          {
            name: '博客访问IP数', type: 'line', data: [],
            itemStyle: {
              normal: {
                color: '#F72C5B',
                label: { show: true },
                lineStyle: { color: '#F72C5B' }
              }
            }
          },
        ],
        grid: {
          bottom: '20px' // 图表距离容器下方边距
        },
      },
      // pieBackColor: ['#fac858','#91cc75','#5470c6','#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      pieBackColor: ['#fac858','#91cc75','#5470c6','#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'],
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
              lineStyle: { color: '#01aaed' }
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
      pieChartOption: {
        title: {
          text: '访问设备',
          textStyle: {
            color: '#333',
            fontSize: 14
          },
          left: 'center',
          // top: 'bottom',
          bottom: '0px'
        },
        tooltip: {},
        series: [
          {
            name: '',
            type: 'pie',
            selectedMode: 'single',
            selectedOffset: 30,
            clockwise: true, // 顺时针渲染
            data: [
              { value: 50, name: '移动端' },
              { value: 30, name: 'PC端' },
              { value: 20, name: '其他' },
            ],
            itemStyle: {
            }
          }
        ],
        label:{
          // normal:{
            position: 'inner',
            show: true,
            fontSize: 11,
            formatter:function(data){
              return data.name + ':' + data.value;
            },
          // }
        }
      },
      pieList: [],
      // 用户行为
      userActionDateType: 1,
      userActionData: '',
      totalUserAction: 0,
      // 折线图对象
      lineChart: '',
      // 地图对象
      map: '',
      // 饼图时间维度
      pieDateType: 1,
      // 饼图对象
      pie: '',
      // 饼图的数据
      pieArray: []
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
          data.cityList.forEach(function (item) {
            let formatLocation;
            if (typeof (item) == 'string') {
              formatLocation = item.replace('市', ''); // 数据库存放的城市名称包含'市'字，但是所有城市维度数据中城市名称没有
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
     * 使用用户轨迹接口，
     * 通过统计用户使用设备的尺寸来展示设备占比
     * 通过统计用户在网页上的动作，展示操作占比
     */
    setPie: function (dayNum,init) {
      let that = this,
        userActionObject = {},
        // 统计移动用户、Pc用户、其他设备用户
        mobileUser = 0,
        pcUser = 0,
        // 各种操作统计
        pie2Object = {
          选择菜单: 0, 
          下拉文章列表到: 0, 
          切换折线图时间维度: 0,
          下拉留言列表到: 0, 
          评论文章: 0, 
          切换地图时间维度: 0,
          切换用户轨迹时间维度: 0, 
          筛选文章分类: 0,
          留言: 0, 
          查看源码: 0, 
          点击联系途径: 0, 
          切换数据占比时间维度: 0,
          浏览文章: 0,
          登录后台: 0,
          其他: 0      // 这里预防博客功能拓展，这里代码没有及时更新
        },
        // 库中存的用户操作，过于啰嗦，不利于前端展示。搞个映射，展示时使用另外一套
        pie2ObjectMap = {
          选择菜单: '切换菜单', 
          下拉文章列表到: '下拉文章', 
          切换折线图时间维度: '切换折线',
          下拉留言列表到: '下拉留言', 
          评论文章: '评论文章', 
          切换地图时间维度: '切换地图',
          切换用户轨迹时间维度: '切换轨迹', 
          筛选文章分类: '筛选文章',
          留言: '留言', 
          查看源码: '查看源码', 
          点击联系途径: '获取联系', 
          切换数据占比时间维度: '切换饼图',
          浏览文章: '浏览文章',
          登录后台: '登录后台',
          其他: '其他'      // 这里预防博客功能拓展，这里代码没有及时更新
        },
        pie2Array = [],
        // 菜单点击统计
        pie3Object = {
          博文: 0,
          留言: 0,
          时间轴: 0,
          试验田: 0,
          关于: 0,
          访问统计: 0,
          管理后台: 0
        },
        pie3Array = [],
        // 老用户占比
        regularUserMap = {
          regularUser: '老用户',
          newUser: '新用户'
        },
        regularUserArray = [];

      that.pieDateType = dayNum;     

      // 设备占比饼图
      this.SQFrontAjax({
        Url: '/api/getUserAction/foreend',
        noLoading: init ? 'yes' : '',
        UploadData: {
          endTime: this.getSQTime().split(' ')[0],
          dayNum: dayNum ? dayNum : 1
        },
        Success: function (data) {
          userActionObject = data.userAction;
          for (let i in userActionObject) {
            let item = userActionObject[i],
            userBrowerWidth = (item.browser.split('\n')[2]).split('*')[0];
            
            if(userBrowerWidth >= 768){
              pcUser += 1;
            }else{
              mobileUser += 1;
            }
          }    
          that.pieArray = [{
            value: pcUser,
            name: 'PC'
          },{
            value: mobileUser,
            name: '手机'
          }];

          // 渲染设备占比饼图
          that.pie1 = that.$echarts.init(document.getElementById('pie-chart1'));
          that.pieChartOption.series[0].data = that.pieArray;
          that.pieChartOption.title.text = '访问设备比例';
          that.pieChartOption.series[0].name = '访问设备';
          that.pieChartOption.color = ['#91cc75', '#fc8452'];
          that.pieChartOption.series[0].clockwise = false;
          that.pie1.setOption(that.pieChartOption, true);  
        }
      });

      // 各项操作占比
      this.SQFrontAjax({
        Url: '/api/visitReadByDay/foreend',
        noLoading: init ? 'yes' : '',
        UploadData: {
          endTime: this.getSQTime().split(' ')[0],
          dayNum: dayNum ? dayNum : 1
        },
        Success: function (data) {
          // 统计各项操作行为的次数
          data.list.forEach(function(item){
            if(pie2Object.hasOwnProperty(item)){
              pie2Object[item] += 1;
            }else{
              // 库中浏览文章动作，是以下面三种文本记录
              if(item == '浏览文章(首页入口)' || item=='浏览文章(试验田入口)' || item=='浏览文章(undefined入口)'){
                pie2Object['浏览文章'] += 1;
              }else{
                pie2Object['其他'] += 1;
              }
            }
          });

          // 转成饼图需要的数据格式，由对象转成数组
          for(let key in pie2Object){
            if(pie2Object[key] > 0){     // 某项如果为0，不再饼图里展示
              pie2Array.push({
                value: pie2Object[key], 
                name: pie2ObjectMap[key]
              });
            }
          }

          that.pie2 = that.$echarts.init(document.getElementById('pie-chart2'));
          that.pieChartOption.series[0].data = pie2Array;
          that.pieChartOption.title.text = '用户行为占比';
          that.pieChartOption.series[0].name = '用户操作';
          that.pieChartOption.label.fontSize = 10;
          that.pieChartOption.color = that.pieBackColor.reverse();
          that.pieChartOption.series[0].clockwise = true;
          // that.pieChartOption.label.formatter = function(data){
          //     return data.name;
          // };
          that.pie2.setOption(that.pieChartOption, true);
        }
      });

      // 菜单点击比例饼图
      this.SQFrontAjax({
        Url: '/api/menuClickByDay/foreend',
        noLoading: init ? 'yes' : '',
        UploadData: {
          endTime: this.getSQTime().split(' ')[0],
          dayNum: dayNum ? dayNum : 1
        },
        Success: function (data) {
          // 统计各个菜单点击次数
          data.list.forEach(function(item){
            if(pie3Object.hasOwnProperty(item)){
              pie3Object[item] += 1;
            }
          });

          // 转成饼图需要的数据格式
          for(let key in pie3Object){
            pie3Array.push({
              value: pie3Object[key], 
              name: key
            });
          }

          that.pie3 = that.$echarts.init(document.getElementById('pie-chart3'));
          that.pieChartOption.series[0].data = pie3Array;
          that.pieChartOption.title.text = '菜单点击比例';
          that.pieChartOption.series[0].name = '点击菜单';
          that.pieChartOption.color = that.pieBackColor.reverse();
          that.pieChartOption.series[0].clockwise = true;
          // that.pieChartOption.label.formatter = function(data){
          //     return data.name;
          // }; 
          that.pie3.setOption(that.pieChartOption, true);
        }
      });

      // 老用户占比
      this.SQFrontAjax({
        Url: '/api/regularUserByDay/foreend',
        noLoading: init ? 'yes' : '',
        UploadData: {
          endTime: this.getSQTime().split(' ')[0],
          dayNum: dayNum ? dayNum : 1
        },
        Success: function (data) {
          // 转成饼图需要的数据格式
          for(let key in data){
            regularUserArray.push({
              value: data[key], 
              name: regularUserMap[key]
            });
          }

          that.pie4 = that.$echarts.init(document.getElementById('pie-chart4'));
          that.pieChartOption.series[0].data = regularUserArray;
          that.pieChartOption.title.text = '新老用户比例';
          that.pieChartOption.series[0].name = '用户类型';
          that.pieChartOption.color = ['#5470c6','#ee6666'];
          // that.pieChartOption.label.formatter = function(data){
          //     return data.name;
          // }; 
          that.pie4.setOption(that.pieChartOption, true);
        }
      });

      // 初始化时不创建日志。切换时间维度后，记日志并刷新日志列表
      if (!init) {
        that.createLog({
          moduleType: 'button',
          operateType: '切换数据占比时间维度',
          operateContent: '近' + dayNum + '天'
        });
      }
    },

    /**
     * 展示用户轨迹
     * dayNum: 加载数据的周期 比如：1/7/14天
     * init: 判断是初始化状态，或是时间周期的切换；  初始状态时只有折线图弹出loading，且不记录操作日志。切换日期时弹出loading并记录日志
     */
    setUserAction: function (dayNum, init) {
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
          let curCompleteIp = data.yourIp; // 当前访客的IP
          // let curCompleteIp = "36.48.127.8"; // 当前访客的IP

          userActionObject = data.userAction;
          that.totalUserAction = data.dateListTotal;

          for (let i in userActionObject) {
            // 保护用户隐私，马赛克掉ip最后一组数字
            let array = i.split('.'),
            item = userActionObject[i],
            currentIp = array[0] + '.' + array[1] + '.' + array[2] + '.***';

            // 处理访问来源
            if (userActionObject[i].fromUrl) {
              userActionObject[i].fromUrl = userActionObject[i].fromUrl.split('/')[2];
            } else {
              userActionObject[i].fromUrl = '直接打开';
            }

            // 标识下当前用户的轨迹
            if(curCompleteIp == i){
              item.curIp = curCompleteIp; // 用户自己的IP不再打码
            }

            // 为用户IP打码
            userActionObject[currentIp] = item;
            delete userActionObject[i];
            

            // 因为对象当前本来的属性名已经被删掉了，所以得修改新的属性名对应的属性值
            if (JSON.stringify(userActionObject[currentIp].location) === '[]') {
              userActionObject[currentIp].location = '地球';
            }
          }

          that.userActionData = userActionObject;
          console.log('轨迹数据',that.userActionData);
          // debugger
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
    Store.commit("ChangeActive", 5); // 切换Topbar高亮
    Store.commit("changeFooter",true); // 展示footer 

    Vue.prototype.$echarts = echarts;
    this.setLineChart(7, 'init');
    this.setMap(1, 'init');
    this.setPie(1,'init');
    this.setUserAction(1, 'init');
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
  @import "../../static/css/analytic";
</style>
