<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="TopBarHeight"></div>
      <div class="BlogIndexContent">
        <div class="BlogFlex">
          <BlogList></BlogList>
          <HotTag></HotTag>
        </div>
      </div>
      <Heartfelt></Heartfelt>
    </div>
  </transition>
</template>

<script>
  import Heartfelt from '../SonCompnent/Heartfelt';  
  import BlogList from '../SonCompnent/blog-page/blog-list';
  import HotTag from '../SonCompnent/blog-page/hot-tag';
  import Store from '../../store';

  export default {
    name: "BlogIndex",
    components: {
      Heartfelt,
      BlogList,
      HotTag
    },
    data: function () {
      return {      
        
      }
    },
    mounted: function () {
      let that = this;
      Store.commit("ChangeActive", 0); // 切换Topbar高亮

      Store.commit("changeFooter",false); // 初始化时隐藏footer

      // 创建日志
      // that.createLog({
      //   moduleType: 'menu',
      //   operateType: '选择菜单',
      //   operateContent: '博文'
      // });
    },
  }
</script>

<style scoped lang="less">
  @import "../../static/css/BlogIndex";
</style>
