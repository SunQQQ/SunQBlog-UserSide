<template>
    <div class="block">
        <div class="title-part">
            <div class="module-title">用户轨迹</div>
            <div class="day-switch">
                <div :class="userActionDateType == '0' ? 'item active' : 'item'" @click="setUserAction(0)">今天</div>
                <div :class="userActionDateType == '1' ? 'item active' : 'item'" @click="setUserAction(1)">昨天</div>
                <div :class="userActionDateType == '2' ? 'item active' : 'item'" @click="setUserAction(2)">前天</div>
            </div>
            <div class="day-switch total-number give-up">日期：{{ curDay }} &nbsp;&nbsp;总计IP：{{ totalIp }}条&nbsp;&nbsp;平均PV：{{ Math.round(totalAction / totalIp).toFixed(0) }}</div>
        </div>
        <div class="list">
            <div class="list-head">
                <div class="list-td align">城市/IP/用户名</div>
                <div class="list-td">操作内容</div>
                <div class="list-td align give-up">访问设备/来源</div>
                <div class="list-td align give-up">停留时间</div>
                <div class="list-td align give-up">进入/离开时间</div>

            </div>
            <div :class="item.curIp ? 'list-tr single' : 'list-tr'" v-for="(item, i) in userActionData" v-bind:key="i">
                <div class="list-td align text-center">
                    <div>{{ item.ipCity }}<br>{{ item.userName ? item.userName : item.ip }}</div>
                    <div class="your-ip" v-if="item.isCurUser">(你的轨迹)</div>
                </div>
                <div class="list-td action-padding">
                    <ul>
                        <li v-for="(item, i) in item.actions" v-bind:key="i" v-html="item"></li>
                    </ul>
                </div>
                <div class="list-td align text-center give-up">
                    <div>{{ item.browser }}<br>{{ item.fromUrl }}</div>
                </div>
                <div class="list-td align give-up">{{ item.stayTime }}秒</div>
                <div class="list-td align give-up">{{ item.entryTime }}<br>{{ item.leaveTime }}</div>
            </div>
            <div class="list-item"></div>
        </div>
    </div>
</template>

<script>
import Store from "../../../store";
export default {
    data: function () {
        return {
            // 用户行为
            userActionDateType: 1,
            userActionData: '',
            totalIp: 0,
            curDay: "",
            totalAction: 0, // 总计操作
        }
    },
    methods: {
        /**
        * 展示用户轨迹
        * dayNum: 加载数据的周期 比如：1/7/14天
        * init: 判断是初始化状态，或是时间周期的切换；  初始状态时只有折线图弹出loading，且不记录操作日志。切换日期时弹出loading并记录日志
        */
        setUserAction: function (day, init) {
            let that = this,
                userActionObject = [];

            that.userActionDateType = day;
            this.SQFrontAjax({
                Url: '/api/getUserAction',
                noLoading: init ? 'yes' : '',
                UploadData: {
                    day: day
                },
                Success: function (data) {
                    // let curCompleteIp = data.yourIp; // 当前访客的IP
                    // // let curCompleteIp = "36.48.127.8"; // 当前访客的IP
                    that.totalAction = 0;
                    
                    userActionObject = data;
                    that.totalIp = userActionObject.length;
                    that.curDay = userActionObject[0] && userActionObject[0].day;
                    
                    for (let i=0; i < userActionObject.length; i++) {
                        let item = userActionObject[i];
                        item.actions = item.actions.split('+');
                        that.totalAction += item.actions.length;
                    }

                    that.userActionData = userActionObject;
                }
            });
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
                    }
                }
            });
        },
    },
    mounted: function () {
        this.setUserAction(0, 'init');
    }
}
</script>

<style scoped lang="less">
@import "../../../static/css/analytic";
</style>   
