<template>
  <div>
    <nv-header :func-type="1" :callback="saveBlog"></nv-header>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header.vue';

  export default {
    data() {
      return {
      };
    },
    components: {
      nvHeader
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '编辑文章',
            routerName: 'new'
          }
        });
      },
      saveBlog() {

      }
    }
  };
</script>
