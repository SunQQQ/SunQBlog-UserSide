<template>
    <transition name="Fade" mode="out-in">
        <div class="cover" v-show="Loading">
            <div class="Loading">
                <div class="Rotate">
                    <i class="iconfont icon-loading1" style="color: white;font-size: 2rem;"></i>
            </div>
            <div>加载中</div>
        </div>
        </div>
    </transition>
</template>

<script>
  import Store from '../../store'
  export default {
    name: "Loading",
    computed:{
      Loading(){
        return Store.state.Loading;
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../../static/css/base";
    .cover{
        position: fixed;
        top: 0;
        height: 100%;
        left: 0;
        right: 0;
    }
    .Loading {
        width: 5.5rem;
        height: 5.5rem;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
        background-color: rgba(0,0,0,0.6);
        color:white;
    }
    p {
        padding: .15rem .15rem .2rem;
        color: #fff;
        font-size: .16rem;
    }
    img {
        width: 10rem;
        height: 10rem;
    }
    .Rotate{
        animation: RotateLoading 1.5s linear infinite;
        margin: 1rem 0 0.5rem;
        text-align: center;
    }
    @keyframes RotateLoading {
        0% { transform: rotate(0deg) }
        25% { transform: rotate(90deg) }
        50% { transform: rotate(180deg) }
        75% { transform: rotate(270deg) }
        100% { transform: rotate(360deg) }
    }
</style>
