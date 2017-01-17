<template>
  <div>
    <nv-header></nv-header>
    <section class="container-body">
      <div class="comming-soom">即将到来</div>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';

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
          if (nav.routerName === 'index') {
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
