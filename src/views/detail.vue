<template>
  <div>
    <nv-header :func-type="3"></nv-header>
    <section class="container-body">
      <div class="blog-info">
        <div class="author-info">
          <span class="author-name" v-text="blog.author"></span>发表于<span class="author-time">{{blog.create_at | formatDate}}</span>
        </div>
        <div class="statistics">
          <span class="statistics-item"><i class="iconfont icon-footprint"></i>{{blog.visit_count | formatNum}}</span>
          <span class="statistics-item reply"><i class="iconfont icon-message"></i>{{blog.reply_count | formatNum}}</span>
          <span class="statistics-item zan"><i class="iconfont icon-appreciate"></i>{{blog.zan_count | formatNum}}</span>
        </div>
        <p v-html="blog.remark"></p>
      </div>
      <div class="markdown-body" v-html="blog.content"></div>
      <comment v-if="blog._id" :blog-id="blog._id" :comment-count="blog.reply_count"></comment>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .blog-info {
    padding: 5px 10px;
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
    }
    .author-info {
      font-size: 12px;
      padding: 8px 0 0;
      float: left;
      line-height: 12px;
      .author-name {
        margin-right: 5px;
        color: $blue;
        font-weight: 700;
      }
      .author-time {
        margin-left: 5px;
        color: $black;
      }
    }
    .statistics {
      color: $graySt;
      float: right;
      padding-top: 5px;
      .statistics-item {
        display: inline-block;
        float: left;
        font-size: 12px;
        line-height: 12px;
        margin-left: 2px;
        border: 1px solid $gray;
        border-radius: $radius;
        padding: 2px 4px;
        i {
          margin-right: 4px;
        }
        &:first-child {
          margin-left: 0;
        }
        &.reply {
          color: $green;
        }
        &.zan {
          color: $red;
        }
      }
    }
    p {
      margin-top: 30px;
      color: $grayer;
      font-size: 14px;
      border-radius: $radius;
      background-color: #fafafa;
      padding: 10px;
    }
  }
  .markdown-body {
    padding: 10px;
  }
</style>
<script>
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header.vue';
  import comment from '../components/Comment.vue';
  import store from '../libs/data';

  import '../styles/markdown.scss';

  export default {
    data() {
      return {
        blog: {}
      };
    },
    components: {
      nvHeader, comment
    },
    watch: {
      '$route'(to, from) {
        this.routeEnter(to, from);
      }
    },
    mounted() {
      this.routeEnter();
    },
    methods: {
      changeTitle(name) {
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: name,
            routerName: 'detail'
          }
        });
      },
      routeEnter(to, from) {
        console.log('[Detail: RouteEnter]');
        this.changeTitle('文章加载中...');
        let blogId = this.$route.params.id;
        store.getBlogInfo(blogId).then(data => {
          this.changeTitle(data.result.title);
          this.blog = data.result;
        });
      }
    }
  };
</script>
