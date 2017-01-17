<template>
  <div>
    <nv-header></nv-header>
    <div class="container-body"></div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import { mapGetters } from 'vuex';
  import store from '../libs/data';
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header.vue';

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: mapGetters([
      'NAV_LIST'
    ]),
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
        this.NAV_LIST.forEach((nav, index) => {
          if (nav.routerName === 'list') {
            this.$store.dispatch({
              type: CHANGE_NAV,
              nav
            });
          }
        });
        this.getList();
      },
      getList() {
        store.getBlogList().then(data => {
          this.list = data.result;
        });
      }
    }
  };
</script>
