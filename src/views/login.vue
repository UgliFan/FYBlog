<template>
  <div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  export default {
    data() {
      return {};
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {

      }
    }
  };
</script>
