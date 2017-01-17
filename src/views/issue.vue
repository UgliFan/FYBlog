<template>
  <div>
    <nv-header :func-type="1" :callback="sendIssue"></nv-header>
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
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '联系我们',
            routerName: 'issue'
          }
        });
      },
      sendIssue() {

      }
    }
  };
</script>
