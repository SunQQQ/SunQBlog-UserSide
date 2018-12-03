<template>
    <div class="Heartfelt">
        <p class="HeartfeltContent">{{ HeartfeltContent }}</p>
        <p class="HeartfeltWritter" v-if="HeartfeltWritter">--{{ HeartfeltWritter }}</p>
    </div>
</template>

<script>
  export default {
    name: "Heartfelt",
    data:function () {
      return{
        HeartfeltContent:'',
        HeartfeltWritter:''
      }
    },
    methods:{
      InitView:function () {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/getheartfeltnum',
          Success:function (data) {
            That.GetHeartfelt(data);
          }
        });
      },
      // 获取所有心声数据
      GetHeartfelt:function (HeartfeltNum) {
        var That = this;
        this.SQFrontAjax({
          Url: '/api/HeartfeltRead/foreend',
          Success: function (data) {
            That.ChangeView(data,HeartfeltNum);
          }
        });
      },
      // 修改视图的数据
      ChangeView:function (Array,HeartfeltNum) {
        var That = this;
        this.SetRandomNum(Array,HeartfeltNum);

        window.setInterval(function () {
          That.SetRandomNum(Array,HeartfeltNum);
        },5000);
      },
      // 设置随机值
      SetRandomNum:function (Array,HeartfeltNum) {
        var Random = Math.ceil(Math.random()*HeartfeltNum);
        this.HeartfeltContent = Array[Random-1].HeartfeltContent;
        this.HeartfeltWritter = Array[Random-1].HeartfeltWriter;
      }
    },
    mounted:function () {
      this.InitView();
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