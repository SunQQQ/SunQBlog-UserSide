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
        HeartfeltWritter:'',
        LocalHeartFeltData: this.GetLocalStorage('SunqBlog') ? this.GetLocalStorage('SunqBlog').HeartFeltData : '', //本地缓存的心声数据
        LastLoginDate: this.GetLocalStorage('SunqBlog') ? this.GetLocalStorage('SunqBlog').LastLoginDate : '',      //最近一次登录时间
        IntervalTime:-1
      }
    },
    methods:{
      InitView:function () {
        var That = this,
          CurrentDate = (new Date()).getTime();

        if(That.LastLoginDate){
          That.IntervalTime = CurrentDate - That.LastLoginDate;
        }

        // 有缓存并且距最近登录时间小于1天。则使用缓存
        if(That.LocalHeartFeltData && That.IntervalTime < 1000*60*60*24){
          That.GetHeartfelt(That.LocalHeartFeltData.length,That.LocalHeartFeltData);
        // 如果没有缓存(第一次登陆) 或者距最近登录时间大于1天。则重新请求数据，记下缓存
        }else if(!That.LocalHeartFeltData || That.IntervalTime > 1000*60*60*24){
          this.SetLocalStorage('SunqBlog', {
            Key: 'LastLoginDate',
            Value: (new Date()).getTime()
          });

          this.SQFrontAjax({
            Url: '/api/getheartfeltnum',
            Success:function (data) {
              That.GetHeartfelt(data);
            }
          });
        }
      },
      // 获取所有心声数据
      GetHeartfelt:function (HeartfeltNum,LocalData) {
        var That = this;

        if(LocalData){
          That.ChangeView(LocalData,HeartfeltNum);
        }else {
          this.SQFrontAjax({
            Url: '/api/HeartfeltRead/foreend',
            Success: function (data) {
              // 存下心声数据
              That.SetLocalStorage('SunqBlog', {
                Key: 'HeartFeltData',
                Value: data
              });

              //修改最近一次登录时间
              That.SetLocalStorage('SunqBlog', {
                Key: 'LastLoginDate',
                Value: (new Date()).getTime()
              });

              That.ChangeView(data,HeartfeltNum);
            }
          });
        }
      },
      // 修改视图的数据
      ChangeView:function (Array,HeartfeltNum) {
        var That = this;
        this.SetRandomNum(Array,HeartfeltNum);

        window.setInterval(function () {
          That.SetRandomNum(Array,HeartfeltNum);
        },15000);
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