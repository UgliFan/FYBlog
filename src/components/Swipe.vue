<template>
  <swipe class="fyb-swipe" :speed="500" :auto="4000" :is-static="true" :show-indicators="swipeList.length > 1">
    <swipe-item v-for="item in swipeList" :key="item" class="slide-item">
      <img :src="item.icon"/>
    </swipe-item>
    <router-link slot="static" v-for="item in swipeList" :key="item" class="slide-info" :to="{name: 'detail', params: {id: item._id}}">
      <div class="swipe-info">
        <h4>{{item.title}}</h4>
        <p class="statistics">
          <span class="statistics-item"><i class="iconfont icon-footprint"></i>{{item.visit_count | formatNum}}</span>
          <span class="statistics-item reply"><i class="iconfont icon-message"></i>{{item.reply_count | formatNum}}</span>
          <span class="statistics-item zan"><i class="iconfont icon-appreciate"></i>{{item.zan_count | formatNum}}</span>
        </p>
        <p class="author-info">
          <span class="author-name" v-text="item.author"></span>发表于<span class="author-time">{{item.create_at | formatDate}}</span>
        </p>
      </div>
    </router-link>
  </swipe>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .container-body .fyb-swipe {
    width: 100%;
    height: 180px;
    overflow: hidden;
    .slide-item {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    a.slide-info {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: $white;
      transition: opacity .5s ease;
      .swipe-info {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 54px;
        padding: 10px;
        background: rgba(0,0,0,.6);
        box-shadow: 0 0 5px 0 rgba(0,0,0,.26);
        h4 {
          width: 100%;
          font-size: 14px;
          line-height: 14px;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p.statistics {
          display: inline-block;
          vertical-align: top;
          height: 20px;
          line-height: 20px;
          .statistics-item {
            display: inline-block;
            vertical-align: middle;
            font-size: 10px;
            line-height: 10px;
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
          }
        }
        p.author-info {
          display: inline-block;
          position: absolute;
          height: 20px;
          vertical-align: top;
          font-size: 12px;
          line-height: 20px;
          color: $grayer;
          right: 10px;
          .author-name {
            display: inline-block;
            vertical-align: top;
            margin-right: 5px;
            color: $white;
            font-weight: 700;
            max-width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .author-time {
            color: $gray;
          }
        }
      }
    }
  }
</style>
<script>
  import Swipe from '../assets/vue-swipe/swipe.vue';
  import SwipeItem from '../assets/vue-swipe/swipe-item.vue';
  export default {
    props: {
      swipeList: {
        type: Array,
        required: true
      }
    },
    components: {
      Swipe, SwipeItem
    }
  };
</script>
