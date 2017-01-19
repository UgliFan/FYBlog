<template>
  <div>
    <nv-header :func-type="1" :callback="sendIssue"></nv-header>
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
  import nvHeader from '../components/Header';

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
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '我要提问',
            routerName: 'issue'
          }
        });
      },
      sendIssue() {

      }
    }
  };
</script>
