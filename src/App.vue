<template>
    <div>
        <TopBar></TopBar>
        <router-view></router-view>
        <Footer></Footer>
        <Tips></Tips>
        <Loading></Loading>
        <CanvasBac></CanvasBac>
        <AirPlane></AirPlane>
    </div>
</template>
<script>
  import TopBar from './components/BrotherCompnent/TopBar'
  import Footer from './components/BrotherCompnent/Footer'
  import Tips from './components/BrotherCompnent/Tips'
  import Loading from './components/BrotherCompnent/Loading'
  import CanvasBac from './components/BrotherCompnent/CanvasBac'
  import AirPlane from './components/BrotherCompnent/Airplane'

  export default {
    name: 'app',
    mounted: function () {
    },
    components: {
      TopBar: TopBar,
      Footer:Footer,
      Tips: Tips,
      Loading:Loading,
      CanvasBac:CanvasBac,
      AirPlane:AirPlane
    }
  }
</script>


<style>

</style>
