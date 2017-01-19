<template>
  <div>
    <nv-header></nv-header>
    <section class="container-body">
      <ul class="blog-list">
        <blog-item v-for="blog in list" :blog="blog" :key="blog"></blog-item>
        <li v-if="list.length === 0" class="blog-empty">博主在偷懒, 敬请期待。。。</li>
      </ul>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .blog-list {
    list-style: none;
    width: 100%;
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
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import BlogItem from '../components/BlogItem';

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
        store.getCreamList().then(data => {
          this.list = data.result;
          this.total = data.total;
        });
      }
    }
  };
</script>
