<template>
  <div class="load-more">
    <div v-if="loading" class="load-more-info"><i class="iconfont icon-loading"></i>努力加载中...</div>
    <div v-if="!loading && hasMore" class="load-more-info"><i class="iconfont icon-unfold"></i>下拉加载更多!</div>
    <div v-if="!loading && !hasMore" class="load-more-info"><i class="iconfont icon-info"></i>没有更多喽, 敬请期待。。</div>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .load-more {
    width: 100%;
    height: 40px;
    padding: 10px 0;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.26) inset;
    .load-more-info {
      height: 20px;
      line-height: 22px;
      font-size: 14px;
      color: $graySt;
      text-align: center;
      i {
        margin-right: 4px;
        &.icon-loading {
          display: inline-block;
          width: 14px;
          height: 13px;
          line-height: 14px;
          animation: rotate 1s linear infinite;
        }
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        screenHeight: 0
      };
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      callback: {
        type: Function
      }
    },
    mounted() {
      this.screenHeight = window.screen.height;
      window.addEventListener('scroll', this.scrollListener, false);
    },
    destroyed() {
      this.loading = false;
      window.removeEventListener('scroll', this.scrollListener, false);
    },
    methods: {
      scrollListener() {
        if (this.hasMore && !this.loading && this.screenHeight + document.body.scrollTop >= window.document.body.offsetHeight - 1) {
          this.callback && this.callback();
        }
      }
    }
  };
</script>
