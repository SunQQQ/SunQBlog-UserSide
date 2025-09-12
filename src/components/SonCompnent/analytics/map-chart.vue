<template>
    <section class="block">
        <div class="title-part">
            <div class="module-title">访客来源</div>
            <div class="day-switch">
                <div :class="mapDateType == '0' ? 'item active' : 'item'" @click="setMap(0)">今天</div>
                <div :class="mapDateType == '30' ? 'item active' : 'item'" @click="setMap(30)">近30天</div>
                <div :class="mapDateType == '60' ? 'item active' : 'item'" @click="setMap(60)">近60天</div>
                <div :class="mapDateType == '1000' ? 'item active' : 'item'" @click="setMap(1000)">自古以来</div>
            </div>
            <div class="day-switch total-number give-up">国内城市：{{ chinaCityNum }}个，境外城市：{{ foreignCityNum }}个</div>
        </div>
        <div class="map-chart" id="map"></div>
    </section>
</template>

<script>
import china from '../../../static/map/china.json'
import citys from '../../../static/map/citys'

export default {
    name: "map-chart",
    data: function () {
        return {
            // 地图参数
            mapDateType: '今天',
            mapList: [],
            chinaCityNum: 0,
            foreignCityNum: 0,
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
                Url: '/api/city-daily',
                noLoading: init ? 'yes' : '',
                UploadData: {
                    days: dayNum
                },
                Success: function (data) {
                    data.forEach(function (item) {
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

                    that.chinaCityNum = that.mapList.length;
                    that.foreignCityNum = data.length - that.chinaCityNum;

                    if (!that.map) that.map = that.$echarts.init(document.getElementById('map'));
                    if (dayNum == 0) {
                        that.mapOption.series[0].label.show = true;
                    } else {
                        that.mapOption.series[0].label.show = false;
                    }
                    that.mapOption.series[0].data = that.mapList;
                    that.$echarts.registerMap('china', china);
                    that.map.setOption(that.mapOption, true);
                }
            });
        },
    },
    mounted: function () {
        this.setMap(0, 'init');
    }
}
</script>

<style scoped lang="less">
@import "../../../static/css/analytic";
</style>
