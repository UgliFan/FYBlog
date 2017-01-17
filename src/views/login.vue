<template>
  <div>
    <section class="container-body">
      <div class="comming-soom">即将到来</div>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';

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
