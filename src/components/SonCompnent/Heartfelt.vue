<template>
    <div class="Heartfelt">
        <p class="HeartfeltContent">{{ content }}</p>
        <p class="HeartfeltWritter" v-if="writer">--{{ writer }}</p>
    </div>
</template>

<script>
  export default {
    name: "Heartfelt",
    data:function () {
      return{
        content:'',
        writer:'',
        IntervalTime:-1
      }
    },
    methods:{
      // 获取所有心声数据
      GetHeartfelt:function (HeartfeltNum) {
        var That = this;

        this.SQFrontAjax({
          Url: '/api/userHeartList',
          Success: function (data) {
            That.ChangeView(data);
          }
        })
      },
      // 修改视图的数据
      ChangeView:function (Array) {
        var That = this;
        this.SetRandomNum(Array);

        window.setInterval(function () {
          That.SetRandomNum(Array);
        },15000);
      },
      // 设置随机值
      SetRandomNum:function (Array) {
        var Random = Math.ceil(Math.random()* Array.length);
        this.content = Array[Random-1].content;
        this.writer = Array[Random-1].writer;
      }
    },
    mounted:function () {
      this.GetHeartfelt();
    }
  }
</script>

<style scoped lang="less">
    @import "../../static/css/base";
    /*pc端*/
    @media only screen and (min-device-width : 768px) {
        .Heartfelt{
            writing-mode: vertical-rl;
            font-family: Damion,cursive,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
            color: @FontColorGrayDeep;
            font-size: 16px;
            cursor:default;
            display: block;
        }
    }
    /*移动端*/
    @media only screen and (max-device-width : 768px) {
        .Heartfelt{
            writing-mode: vertical-rl;
            font-family: Damion,cursive,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
            color: @FontColorGrayDeep;
            font-size: 16px;
            cursor:default;
            display: none;
        }
    }

    .Heartfelt:hover{
        color:@FontColorGray;
    }
    .HeartfeltContent{
        max-height: 300px;
        position: fixed;
        right: 0.3rem;
        top: 84px;
    }
    .HeartfeltWritter{
        max-height: 300px;
        position: fixed;
        right: 3rem;
        top: 400px;
    }
</style>