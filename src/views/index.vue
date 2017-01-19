<template>
  <div>
    <nv-header></nv-header>
    <section class="container-body">
      <swipe v-if="swipeList.length > 0" :swipe-list="swipeList"></swipe>
      <h4 class="recommend-title">吐血推荐 Top 5.</h4>
      <ul class="recommend-list">
        <blog-item v-for="recom in recomList" :key="recom" :blog="recom"></blog-item>
        <li v-if="recomList.length === 0" class="recom-empty">博主在偷懒, 敬请期待。。。</li>
      </ul>
    </section>
    <div class="footer">©2017 by UgliFan. All rights reserved.</div>
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
    min-height:300px;
    .blog-item {
      border-bottom: 1px solid $borderYellow;
    }
    .recom-empty {
      padding: 20px;
      line-height: 30px;
      font-size: 16px;
      color: $grayer;
      text-align: center;
    }
  }
  .footer {
    text-align: center;
    padding: 10px 0;
    line-height: 20px;
    font-size: 14px;
    color: $grayer;
    background-color: $bgGray;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.26) inset;
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
        store.getBlogSlide().then(data => {
          this.swipeList = data.result;
        });
        store.getRecomTop5().then(data => {
          this.recomList = data.result;
        });
      }
    }
  };
</script>
