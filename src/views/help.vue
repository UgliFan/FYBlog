<template>
  <div>
    <nv-header :func-type="2"></nv-header>
    <section class="container-body">
      <div class="comming-soom">即将到来</div>
    </section>
    <confirm-dialog></confirm-dialog>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';

</style>
<script>
  import { mapGetters } from 'vuex';
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import confirmDialog from '../components/Confirm';

  export default {
    data() {
      return {};
    },
    computed: mapGetters([
      'NAV_LIST'
    ]),
    components: {
      nvHeader, confirmDialog
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
