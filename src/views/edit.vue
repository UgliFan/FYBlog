<template>
  <div>
    <nv-header :func-type="funcType" :callback="saveBlog"></nv-header>
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
        funcType: 1
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
