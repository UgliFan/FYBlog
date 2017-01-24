<template>
  <li class="cream-item">
    <div class="image">
      <i v-if="!blog.icon" class="iconfont icon-pic"></i>
      <img v-if="blog.icon" :src="blog.icon"/>
      <div class="symbol">
        <i v-if="blog.hot" class="iconfont icon-hot"></i><i v-if="blog.top" class="iconfont icon-top"></i>
      </div>
    </div>
    <router-link class="cream-title" :to="{name: 'detail',params: {id: blog._id}}"><h4>{{blog.title}}</h4></router-link>
    <p class="cream-remark"><i class="iconfont icon-form"></i>{{blog.remark}}</p>
    <div class="author-info">
      <span class="author-name" v-text="blog.author"></span>发表于<span class="author-time">{{blog.create_at | formatDate}}</span>
    </div>
    <div class="statistics">
      <span class="statistics-item"><i class="iconfont icon-footprint"></i>{{blog.visit_count | formatNum}}</span>
      <span class="statistics-item reply"><i class="iconfont icon-message"></i>{{blog.reply_count | formatNum}}</span>
      <span class="statistics-item zan"><i class="iconfont icon-appreciate"></i>{{blog.zan_count | formatNum}}</span>
    </div>
  </li>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .cream-item {
    width: 100%;
    padding: 10px;
    overflow: hidden;
    position: relative;
    border-radius: $radiusLg;
    background-color: $bgGray;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    margin-bottom: 20px;
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
    }
    &:last-child {
      margin-bottom: 0;
    }
    .cream-title {
      color: $blackSt;
      display: block;
      h4 {
        font-size: 18px;
        font-weight: 700;
        line-height: 20px;
        padding: 6px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .cream-remark {
      position: relative;
      display: -webkit-box;
      font-size: 12px;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-all;
      word-wrap: break-word;
      color: $grayer;
      height: 54px;
      i {
        margin-right: 5px;
      }
    }
    .image {
      position: relative;
      width: 100%;
      height: 160px;
      border-radius: $radiusLg;
      overflow: hidden;
      line-height: 160px;
      text-align: center;
      background-color: rgba(0,0,0,.8);
      img {
        max-width: 100%;
        max-height: 100%;
      }
      i {
        font-size: 60px;
        color: $gray;
      }
      .symbol {
        position: absolute;
        top: 4px;
        left: 4px;
        height: 20px;
        i {
          display: inline-block;
          vertical-align: top;
          font-size: 14px;
          line-height: 20px;
          height: 20px;
          margin-right: 5px;
          border-radius: 50%;
          color: $white;
          padding: 0 3px;
          overflow: hidden;
          box-shadow: 0 0 5px 0 rgba(0,0,0,.26);
          &.icon-hot {
            background-color: $red;
          }
          &.icon-top {
            background-color: $orange;
          }
        }
      }
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
  }
</style>
<script>
  export default {
    props: {
      blog: {
        type: Object,
        required: true
      }
    }
  };
</script>
