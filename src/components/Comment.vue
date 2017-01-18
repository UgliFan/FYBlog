<template>
  <section class="comment-area">
    <h4>评论（{{commentCount}}）</h4>
  </section>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .comment-area {
    h4 {
      color: $blackSt;
      background: $bgGray;
      line-height: 22px;
      font-size: 20px;
      height: 40px;
      border-left: 6px solid $blue;
      padding: 10px;
    }
  }
</style>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      blogId: {
        type: String,
        required: true
      },
      commentCount: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      console.log('[Comment: Mounted]');
    }
  };
</script>
