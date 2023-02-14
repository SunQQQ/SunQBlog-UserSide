<template>
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
</template>

<script>
import Store from "../../../store";
import Vue from 'vue';

let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');

require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

export default {
    name: 'pie-chart',
    data: function () {
        return {
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
                label: {
                    // normal:{
                    position: 'inner',
                    show: true,
                    fontSize: 11,
                    formatter: function (data) {
                        return data.name + ':' + data.value;
                    },
                    // }
                }
            },
            pieList: [],
            // 饼图的数据
            pieArray: [],
            // 饼图时间维度
            pieDateType: 1,
            pieBackColor: ['#fac858','#91cc75','#5470c6','#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'],
        }
    },
    methods: {
        /**
             * 使用用户轨迹接口，
             * 通过统计用户使用设备的尺寸来展示设备占比
             * 通过统计用户在网页上的动作，展示操作占比
             */
        setPie: function (dayNum, init) {
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

                        if (userBrowerWidth >= 768) {
                            pcUser += 1;
                        } else {
                            mobileUser += 1;
                        }
                    }
                    that.pieArray = [{
                        value: pcUser,
                        name: 'PC'
                    }, {
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
                    data.list.forEach(function (item) {
                        if (pie2Object.hasOwnProperty(item)) {
                            pie2Object[item] += 1;
                        } else {
                            // 库中浏览文章动作，是以下面三种文本记录
                            if (item == '浏览文章(首页入口)' || item == '浏览文章(试验田入口)' || item == '浏览文章(undefined入口)') {
                                pie2Object['浏览文章'] += 1;
                            } else {
                                pie2Object['其他'] += 1;
                            }
                        }
                    });

                    // 转成饼图需要的数据格式，由对象转成数组
                    for (let key in pie2Object) {
                        if (pie2Object[key] > 0) {     // 某项如果为0，不再饼图里展示
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
                    data.list.forEach(function (item) {
                        if (pie3Object.hasOwnProperty(item)) {
                            pie3Object[item] += 1;
                        }
                    });

                    // 转成饼图需要的数据格式
                    for (let key in pie3Object) {
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
                    for (let key in data) {
                        regularUserArray.push({
                            value: data[key],
                            name: regularUserMap[key]
                        });
                    }

                    that.pie4 = that.$echarts.init(document.getElementById('pie-chart4'));
                    that.pieChartOption.series[0].data = regularUserArray;
                    that.pieChartOption.title.text = '新老用户比例';
                    that.pieChartOption.series[0].name = '用户类型';
                    that.pieChartOption.color = ['#5470c6', '#ee6666'];
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

    },
    mounted: function () {
        this.setPie(1,'init');
    }
}
</script>

<style scoped lang="less">
  @import "../../../static/css/analytic";
</style>