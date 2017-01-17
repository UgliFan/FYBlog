<template>
  <section class="comment-area">
    <h4>评论 ({{commentCount}})</h4>
  </section>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .comment-area {
    border-top: 20px solid $info;
    padding: 10px;
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
