<template>
  <div>
    <nv-header></nv-header>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import nvHeader from '../components/Header.vue';

  export default {
    data() {
      return {
        msg: 'hello vue'
      };
    },
    components: {
      nvHeader
    },
    mounted() {
      console.log('[detail.vue: Mounted]');
    }
  };
</script>
