<template>
    <transition name="Fade" mode="out-in">
        <main>
            <h1 class="mainTitle">我们的技术演进历程</h1>
            <div class="TimeFixedBac">
                <div class="flower">
                    <img src="../../static/img/flower.png" alt="背景图中花朵" />
                </div>
            </div>
            <div class="clockDev">
                <img src="../../static/img/clock.png" alt="背景图中时钟" />
            </div>
            <div class="needleDiv">
                <img src="../../static/img/needle.png" alt="背景图中时针" />
            </div>
            
            <div class="FriendUrlBac">
                <div class="FriendUrlTitle TimeLIneTitle">
                    <div class="FriendUrlTitleText" style="margin-bottom: 2rem;color:black;">时间轴</div>
                    <div class="FriendUrlTitleSummary">梦每个人都有，但不是每个人都能一步一步的跟着时间往前走</div>
                    <div class="FriendUrlTitleSummary">我是个自律性不好的人，希望能守住初心</div>
                    <div class="FriendUrlTitleSummary">一步一个脚印的，不畏惧，不空想</div>
                    <div class="FriendUrlTitleSummary">坚持住，往前走</div>
                    <div class="FriendUrlTitleSummary">共勉</div>
                </div>
            </div>
            <div class="UrlCardList TimeLineCardList">
                <div v-for="(Item,Index) in TimeLineList" v-bind:key="Index">
                    <div class="TimeLineTr" v-if="Index%2 == 0">
                        <div class="TimeLineTdLeft"></div>
                        <div class="TimeLineTdCenter"></div>
                        <div class="TimeLineTdRight">
                            <div class="BubbleRight bubble-right-margin">
                                <span class="TimeLineTime">{{ Item.contentDate }}</span>{{ Item.content }}
                            </div>
                        </div>
                    </div>
                    <div class="TimeLineTr" v-if="Index%2 != 0">
                        <div class="TimeLineTdLeft">
                            <div class="Bubble bubble-margin">
                                <span class="TimeLineTime">{{ Item.contentDate }}</span>{{ Item.content }}
                            </div>
                        </div>
                        <div class="TimeLineTdCenter"></div>
                        <div class="TimeLineTdRight"></div>
                    </div>
                </div>
            </div>
          </main>
    </transition>

</template>

<script>
  import Store from '../../store'
  export default {
    name: "TimeLine",
    data:function(){
      return{
        TimeLineList:[]
      }
    },
    methods:{
      GetTimeLineList:function () {
        var That = this;
        this.SQFrontAjax({
          Url:'/api/getTimeLineList',
          Success:function (data) {
            That.TimeLineList = data;
          }
        });
      }
    },
    mounted:function () {
      this.GetTimeLineList();
      // topbar高亮设置
      Store.commit("ChangeActive", 2);
      Store.commit("changeFooter",true); // 展示footer
    }
  }
</script>

<style scoped lang="less">
   @import '../../static/css/timeLine.less';
</style>
