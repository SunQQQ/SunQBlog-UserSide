<template>
    <!-- 提示弹层 -->
    <div class="tips" v-show="Tips.Show">
        <div class="tipContent">{{Tips.Title}}</div>
    </div>
</template>

<script>
  export default {
    name: "Tips",
    data(){
      return{
        Tips:{
          Show:false,
          Title:''
        }
      }
    },
    created(){
      this.bus.$on('Tips',(data)=>{
        this.Tips = data;
      });
    },
    watch:{
      Tips:function () {
        if(this.Tips.Show){
          setTimeout( ()=>{
            this.Tips.Show = false;
          },2000)
        }
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../../static/css/base";
    .tips {
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        color:@FontColorWhite;
        height: 3rem;
        line-height: 3rem;
        display: inline-block;
        text-align: center;
    }
    .tipContent{
        display: inline-block;
        background-color: rgba(0,0,0,0.6);
        padding: 0 1rem;
    }
</style>