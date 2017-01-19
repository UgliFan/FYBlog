<template>
  <div>
    <nv-header></nv-header>
    <section class="container-body">
      <swipe :swipe-list="swipeList"></swipe>
      <h4 class="recommend-title">精选推荐 Top 5.</h4>
      <ul class="recommend-list">
        <blog-item v-for="recom in recomList" :key="recom" :blog="recom"></blog-item>
      </ul>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .recommend-title {
    font-size: 20px;
    line-height: 22px;
    height: 40px;
    padding: 10px;
    border-left: 6px solid $red;
    background: $bgRed;
    color: $red;
  }
  .recommend-list {
    .blog-item {
      border-bottom: 1px solid $borderYellow;
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import Swipe from '../components/Swipe';
  import BlogItem from '../components/BlogItem';
  import store from '../libs/data';

  export default {
    data() {
      return {
        swipeList: [],
        recomList: []
      };
    },
    computed: mapGetters([
      'NAV_LIST'
    ]),
    components: {
      nvHeader, Swipe, BlogItem
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
        store.getBlogList().then(data => {
          this.swipeList = data.result.slice(0, 5);
          this.recomList = data.result.slice(0, 5);
        });
      }
    }
  };
</script>
