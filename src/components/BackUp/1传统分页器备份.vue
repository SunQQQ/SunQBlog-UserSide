<template>
    <div class="Pagination" v-show="Pagination">
        <div :class="PageActive==0 ? 'PageNext PageNextEnable' : 'PageNext'" @click="SelectPage(PageActive-1)">上一页</div>
        <div :class="PageActive== index ? 'PageNum PageActive' : 'PageNum'" v-for="(item,index) in PageNum" @click="SelectPage(index)">
            {{ index+1 }}
        </div>
        <div :class="PageActive+1 == PageNum ? 'PageNext PageNextEnable' : 'PageNext'" @click="SelectPage(PageActive+1)">下一页</div>
        <div class="PageTotalNum">共{{PageTotalNum}}条</div>
    </div>
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
      // 选择分页
      SelectPage:function (SelectPage) {
        var That = this;
        if(SelectPage > -1 && SelectPage < this.PageNum){

          That.PageActive = SelectPage;
          That.$emit('PaginationToParent',SelectPage);
        }
      },
      SwitchPagin:function (bool) {
        this.Pagination = bool;
        this.PageActive = 0;
      }
    },
    props:['PageTotalNum','PageNum']
  }
</script>

<style scoped lang="less">
    @import "../static/css/base.less";

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