<template>
  <div>
    <nv-header></nv-header>
    <section class="container-body">
      <list-trans class-name="cream-list" trans-name="fade">
        <blog-item-cream v-for="(blog, index) in CREAM_DATA.list" :blog="blog" :key="blog" :data-index="index"></blog-item-cream>
      </list-trans>
      <scroll-load :loading="loading" :has-more="CREAM_DATA.hasMore" :callback="pageList"></scroll-load>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .cream-list {
    list-style: none;
    width: 100%;
    padding: 10px;
    overflow-x: hidden;
    .cream-empty {
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
  import { CHANGE_NAV, SET_POS, AJAX_DATA } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import BlogItemCream from '../components/BlogItemCream';
  import ListTrans from '../components/ListTrans';
  import ScrollLoad from '../components/ScrollLoad';
  import store from '../libs/data';
  import { pageUtils } from '../libs/mixin';

  export default {
    mixins: [pageUtils],
    data() {
      return {
        loading: false,
        total: 0
      };
    },
    computed: mapGetters([
      'NAV_LIST', 'SCROLL_POS', 'CREAM_DATA'
    ]),
    components: {
      nvHeader, BlogItemCream, ListTrans, ScrollLoad
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {
        document.body.scrollTop = this.SCROLL_POS.cream;
        this.NAV_LIST.forEach((nav, index) => {
          if (nav.routerName === 'cream') {
            this.$store.dispatch({
              type: CHANGE_NAV,
              nav
            });
          }
        });
        this.getInitList();
      },
      getInitList() {
        if (!this.CREAM_DATA.loaded) {
          this.loading = true;
          store.getCreamList().then(data => {
            this.loading = false;
            this.total = data.total;
            this.$store.dispatch({
              type: AJAX_DATA,
              module: 'cream',
              page: 0,
              list: data.result,
              hasMore: data.result.length === 20
            });
          });
        }
      },
      pageList() {
        this.loading = true;
        store.getCreamList(this.CREAM_DATA.page + 1).then(data => {
          this.loading = false;
          this.total = data.total;
          this.$store.dispatch({
            type: AJAX_DATA,
            module: 'cream',
            page: this.CREAM_DATA.page + 1,
            list: this.CREAM_DATA.list.concat(data.result),
            hasMore: data.result.length === 20
          });
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch({
        type: SET_POS,
        module: 'cream',
        pos: document.body.scrollTop
      });
      next();
    }
  };
</script>
