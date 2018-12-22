<template>
    <div class="Airplane">
        <div class="Item" v-show="Show" @click="BackTop()"><i class="iconfont icon-4fanhuidingbubai IconfontSizeAirplane"></i></div>
    </div>
</template>

<script>
  export default {
    name: "Airplane",
    data(){
      return{
        Show:false
      }
    },
    methods:{
      BackTop:function () {
        var ScrollHeigh = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        Timer = setInterval(function () {
          if(ScrollHeigh < 0){
            clearInterval(Timer);
          }
          ScrollHeigh -= 10;
          document.documentElement.scrollTop = ScrollHeigh;
          window.pageYOffset = ScrollHeigh;
        },3);
      }
    },
    mounted:function () {
      var That = this;
      window.onscroll = function () {
        if(document.documentElement.scrollTop > 500){
          That.Show = true;
        }
        if(document.documentElement.scrollTop < 500){
          That.Show = false;
        }
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../../static/css/base";

    /*pc端*/
    @media only screen and (min-device-width : 768px) {
        .Airplane{
            position: fixed;
            right: 0.5rem;
            bottom: 4rem;
            display: inline-block;
            background-color: @TranslucentWhitleBackg;
            box-shadow:@FontColorGrayDeep 0px 0px 6px;
        }
    }

    /*mobile端*/
    @media only screen and (max-device-width : 768px) {
        .Airplane{
            display: none;
        }
    }

    .Item{
        width: 1.3rem;
        height: 1.3rem;
        margin: 0.5rem;
        cursor:pointer;
    }

    .IconfontSizeAirplane{
        font-size: 1.3rem;
        color:@FontColorGrayDeep;
    }
</style>