<template>
    <div></div>
</template>

<script>
  export default {
    name: "Pagination",
    data:function () {
      return{
        // 当前选中页数
        PageActive:0,
        Pagination:false
      }
    },
    methods: {

    },
    created:function(){
      var RefreshCount = 0, That = this;

      if(That.OnScroll){
        window.onscroll = function () {
          var ScrollTop,ClientHeight,ScrollHeight;
          ScrollTop = document.documentElement.scrollTop;
          ClientHeight = document.documentElement.clientHeight;
          ScrollHeight = document.documentElement.scrollHeight;

          if(ScrollHeight == ScrollTop + ClientHeight){
            console.log('到顶');
            RefreshCount += 1;
            That.$emit('PaginationToParent',RefreshCount);
          }
        }
      }

      console.log('That.OnScroll');
      console.log(That.OnScroll);
    },
    props:['OnScroll']
  }
</script>

<style scoped lang="less">
    @import "../../static/css/base.less";

    /*pc端*/
    @media only screen and(min-device-width : 768px){
        .Pagination{
            margin-top: 1rem;
            .myflex(center);
            height: 2.5rem;
            line-height: 2.5rem;
            color: @ThemeColor;
        }
    }

    /*移动端*/
    @media only screen and(max-device-width : 768px){
        .Pagination{
            margin: 0.5rem 0;
            .myflex(center);
            height: 2.5rem;
            line-height: 2.5rem;
            color: @ThemeColor;
        }
    }

    .PageNext{
        background-color: @fore_color;
        width: 4rem;
        text-align: center;
        cursor:pointer;
    }
    .PageNext:hover{
        background-color: @BorderColor;
        color:@FontColorGray
    }
    .PageNextEnable{
        color: @FontColorGrayDeep;
        cursor:default;
    }
    .PageNextEnable:hover{
        color: @FontColorGrayDeep;
        background-color: @fore_color;
        cursor:default;
    }
    .PageTotalNum{
        margin-left: 0.5rem;
    }
    .PageNum{
        background-color: @fore_color;
        width: 2.5rem;
        text-align: center;
    }
    .PageNum:hover{
        background-color: @BorderColor;
        cursor: pointer;
        color:@FontColorGray
    }
    .PageActive{
        background-color: #01aaed;
        color:@FontColorWhite;
        font-size: 1.2rem;
    }
    .PageActive:hover{
        background-color: #01aaed;
        cursor: default;
        color: @FontColorWhite;
    }
</style>