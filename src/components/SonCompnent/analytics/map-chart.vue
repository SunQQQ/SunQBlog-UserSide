<template>
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
</template>

<script>
import Store from "../../../store";
import china from '../../../static/map/china.json'
import citys from '../../../static/map/citys'
import Vue from 'vue';

let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/map');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/chart/scatter');

export default {
    name: "map-chart",
    data: function () {
        return {
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
            // 地图对象
            map: '',
        }
    },
    methods: {
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
    },
    mounted: function () {
        Vue.prototype.$echarts = echarts;
        this.setMap(1, 'init');
    }
}
</script>

<style scoped lang="less">
@import "../../../static/css/analytic";
</style>
