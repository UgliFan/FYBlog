<template>
  <div>
    <nv-header></nv-header>
    <section class="container-body">
      <ul class="blog-list">
        <blog-item v-for="blog in list" :blog="blog" :key="blog"></blog-item>
      </ul>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .blog-list {
    list-style: none;
    width: 100%;
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import store from '../libs/data';
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header.vue';
  import BlogItem from '../components/BlogItem.vue';

  export default {
    data() {
      return {
        list: [],
        total: 0
      };
    },
    computed: mapGetters([
      'NAV_LIST'
    ]),
    components: {
      nvHeader, BlogItem
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
          if (nav.routerName === 'cream') {
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
          this.total = data.total;
        });
      }
    }
  };
</script>
