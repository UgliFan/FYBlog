<template>
  <div>
    <nv-header></nv-header>
    <section class="container-body">
      <list-trans class-name="blog-list">
        <blog-item v-for="(blog, index) in LIST_DATA.list" :blog="blog" :key="blog" :data-index="index"></blog-item>
      </list-trans>
      <scroll-load :loading="loading" :has-more="LIST_DATA.hasMore" :callback="pageList"></scroll-load>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .blog-list {
    list-style: none;
    width: 100%;
    overflow-x: hidden;
    .blog-empty {
      padding: 20px;
      line-height: 30px;
      font-size: 16px;
      color: $grayer;
      text-align: center;
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import store from '../libs/data';
  import { CHANGE_NAV, SET_POS, AJAX_DATA } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import BlogItem from '../components/BlogItem';
  import ListTrans from '../components/ListTrans';
  import ScrollLoad from '../components/ScrollLoad';

  export default {
    data() {
      return {
        loading: false,
        total: 0
      };
    },
    computed: mapGetters([
      'NAV_LIST', 'SCROLL_POS', 'LIST_DATA'
    ]),
    components: {
      nvHeader, BlogItem, ListTrans, ScrollLoad
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {
        document.body.scrollTop = this.SCROLL_POS.list;
        this.NAV_LIST.forEach((nav, index) => {
          if (nav.routerName === 'list') {
            this.$store.dispatch({
              type: CHANGE_NAV,
              nav
            });
          }
        });
        this.getInitList();
      },
      getInitList() {
        if (!this.LIST_DATA.loaded) {
          this.loading = true;
          store.getBlogList().then(data => {
            this.loading = false;
            this.total = data.total;
            this.$store.dispatch({
              type: AJAX_DATA,
              module: 'list',
              page: 0,
              list: data.result,
              hasMore: data.result.length === 20
            });
          });
        }
      },
      pageList() {
        this.loading = true;
        store.getBlogList(this.LIST_DATA.page + 1).then(data => {
          this.loading = false;
          this.total = data.total;
          this.$store.dispatch({
            type: AJAX_DATA,
            module: 'list',
            page: this.LIST_DATA.page + 1,
            list: this.LIST_DATA.list.concat(data.result),
            hasMore: data.result.length === 20
          });
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch({
        type: SET_POS,
        module: 'list',
        pos: document.body.scrollTop
      });
      next();
    }
  };
</script>
