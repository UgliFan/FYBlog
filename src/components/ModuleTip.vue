<template>
  <div class="module-tip" v-if="shown && tips">
    <i class="iconfont icon-close" @click="closeTip()"></i><span v-text="tips"></span>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .module-tip {
    height: auto;
    padding: 20px;
    margin: 10px;
    overflow: hidden;
    position: relative;
    background-color: $bgYellow;
    border-radius: $radiusLg;
    color: $orange;
    font-size: 14px;
    i {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      line-height: 30px;
      width: 30px;
      text-align: center;
      font-size: 20px;
      z-index: 2;
    }
    span {
      z-index: 1;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        shown: true
      };
    },
    props: {
      tips: {
        type: String,
        default: ''
      }
    },
    methods: {
      closeTip() {
        this.shown = false;
      }
    }
  };
</script>
