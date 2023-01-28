<template>
    <transition name="Fade" mode="out-in">
        <div>
            <div class="TimeFixedBac">
                <div class="flower">
                    <img src="../../static/img/flower.png"/>
                </div>
            </div>
            <div class="clockDev">
                <img src="../../static/img/clock.png"/>
            </div>
            <div class="needleDiv">
                <img src="../../static/img/needle.png"/>
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
                                <span class="TimeLineTime">{{ Item.CreateDate }}</span>{{ Item.TextContent }}
                            </div>
                        </div>
                    </div>
                    <div class="TimeLineTr" v-if="Index%2 != 0">
                        <div class="TimeLineTdLeft">
                            <div class="Bubble bubble-margin">
                                <span class="TimeLineTime">{{ Item.CreateDate }}</span>{{ Item.TextContent }}
                            </div>
                        </div>
                        <div class="TimeLineTdCenter"></div>
                        <div class="TimeLineTdRight"></div>
                    </div>
                </div>
            </div>
        </div>
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
          Url:'/api/TimeLineRead/foreend',
          Success:function (data) {
            data.forEach(function (Item) {
              if(Item.CreateDate){
                Item.CreateDate = Item.CreateDate.slice(0,10);
              }
            });
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

      // 创建日志
      this.createLog({
        moduleType:'menu',
        operateType:'选择菜单',
        operateContent:'时间轴'
      });
    }
  }
</script>

<style scoped lang="less">
   @import '../../static/css/timeLine.less';
</style>
