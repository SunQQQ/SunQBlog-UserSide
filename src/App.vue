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
  import TopBar from './components/TopBar'
  import Footer from './components/Footer'
  import Tips from './components/Common/Tips'
  import Loading from './components/Common/Loading'
  import CanvasBac from './components/Common/CanvasBac'
  import AirPlane from './components/Common/Airplane'

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
