<template>
  <div class="CanvasBackStyle">
    <vue-particles
      color="#d9d9d9"
      :particleOpacity="0.6"
      :particlesNumber="40"
      shapeType="circle"
      :particleSize="15"
      linesColor="#cdcdcd"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.8"
      :linesDistance="200"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
  </div>

</template>

<script>
  export default {
    name: "CanvasBac",
    data: function () {
      return {}
    },
    methods: {},
    mounted: function () {
    }
  }
</script>

<style scoped>
  .lizi {
    width: 100%;
    height: 100%;
  }

  /*pc端*/
  @media only screen and (min-device-width: 768px) {
    .CanvasBackStyle {
      position: fixed;
      z-index: -1;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: block;
    }
  }

  /*移动端*/
  @media only screen and (max-device-width: 768px) {
    .CanvasBackStyle {
      display: none;
    }
  }
</style>
