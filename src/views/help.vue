<template>
  <div>
    <nv-header></nv-header>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import { mapGetters } from 'vuex';
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header.vue';

  export default {
    data() {
      return {};
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
          if (nav.routerName === 'help') {
            this.$store.dispatch({
              type: CHANGE_NAV,
              nav
            });
          }
        });
      }
    }
  };
</script>
