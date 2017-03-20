<template>
  <li class="issue-item">
    <div class="issue-title">
      <span class="issue-type">{{types[issue.type].name}}</span><span class="author-name" v-text="issue.author"></span>发表于<span class="author-time">{{issue.create_at | formatDate}}</span>
      <span :class="['issue-state', states[issue.state].className]">{{states[issue.state].name}}</span>
    </div>
    <p class="issue-content">{{issue.content}}</p>
    <div class="statistics">
      <span class="statistics-item reply"><i class="iconfont icon-message"></i>{{issue.reply.length | formatNum}}</span>
      <span class="statistics-item zan"><i class="iconfont icon-appreciate"></i>{{issue.zan_count | formatNum}}</span>
      <span class="show-more-reply" @click="triggerExpand" v-if="issue.reply.length > 0"><i :class="['iconfont', {'icon-fold': expand, 'icon-unfold': !expand}]"></i>{{expand ? '收起评论' : '展开评论'}}</span>
      <span class="go-to-reply" @click="goToReply(issue._id)" v-if="issue.state === 0">我要评论</span>
    </div>
    <transition name="slider-show">
      <div class="reply-list" v-if="expand" :style="replyStyle">
        <div v-for="reply in issue.reply" class="reply-row">
          <div class="reply-title">
            <span class="reply-name">{{reply.name}}</span>发表于<span class="reply-date">{{reply.reply_at | formatDate}}</span>
          </div>
          <p class="reply-content">{{reply.content}}</p>
        </div>
      </div>
    </transition>
  </li>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .issue-item {
    width: 100%;
    padding: 10px;
    overflow: hidden;
    position: relative;
    background-color: $bgGray;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.26);
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
    .issue-title {
      color: $grayer;
      display: block;
      font-size: 14px;
      line-height: 24px;
      height: 24px;
      .author-name {
        margin-right: 5px;
        color: $blue;
        font-weight: 700;
      }
      .author-time {
        margin-left: 5px;
        color: $black;
      }
      .issue-state {
        display: inline-block;
        vertical-align: top;
        height: 24px;
        float: right;
        padding: 0 8px;
        font-size: 14px;
        line-height: 24px;
        border-radius: $radius;
        color: $white;
        &.open {
          background-color: $orange;
        }
        &.resolve {
          background-color: $green;
        }
        &.reject {
          background-color: $red;
        }
      }
      .issue-type {
        display: inline-block;
        vertical-align: top;
        height: 24px;
        padding: 0 6px;
        font-size: 14px;
        line-height: 24px;
        border-radius: $radius;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.26);
        margin-right: 10px;
        color: $white;
        background-color: $blue;
      }
    }
    .issue-content {
      position: relative;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      word-wrap: break-word;
      color: $blackSt;
      padding: 10px 0;
      i {
        margin-right: 5px;
      }
    }
    .statistics {
      color: $graySt;
      padding-top: 5px;
      height: 26px;
      margin-bottom: 5px;
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
      .go-to-reply {
        display: inline-block;
        float: right;
        font-size: 12px;
        line-height: 16px;
        border-radius: $radius;
        padding: 2px 4px;
        cursor: pointer;
      }
      .show-more-reply {
        display: inline-block;
        float: right;
        font-size: 12px;
        line-height: 16px;
        border-radius: $radius;
        padding: 2px 4px;
        margin-left: 10px;
        i {
          margin-right: 4px;
        }
      }
    }
    .reply-list {
      padding: 6px 10px 0 20px;
      background-color: $white;
      overflow: hidden;
      .reply-row {
        border-bottom: 1px solid $gray;
        &:last-child {
          border-bottom: none;
        }
        .reply-title {
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          color: $grayer;
          .reply-name {
            display: inline-block;
            vertical-align: middle;
            height: 24px;
            line-height: 24px;
            font-size: 18px;
            font-weight: 700;
            color: $blue;
            margin-right: 10px;
          }
          .reply-date {
            display: inline-block;
            vertical-align: middle;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: $graySt;
            margin-left: 10px;
          }
        }
        .reply-content {
          padding: 0 0 10px 10px;
          color: $graySt;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        expand: false,
        states: [{
          key: 0,
          name: '打开中',
          className: 'open'
        }, {
          key: 1,
          name: '已解决',
          className: 'resolve'
        }, {
          key: 2,
          name: '已拒绝',
          className: 'reject'
        }],
        types: [{
          key: 0,
          name: '提问'
        }, {
          key: 1,
          name: '改进意见'
        }, {
          key: 2,
          name: 'bug反馈'
        }, {
          key: 3,
          name: '情感交流'
        }]
      };
    },
    props: {
      issue: {
        type: Object,
        required: true
      }
    },
    computed: {
      replyStyle() {
        return 'height: ' + (this.issue.reply.length * 55 + 6) + 'px;';
      }
    },
    methods: {
      triggerExpand() {
        this.expand = !this.expand;
      },
      goToReply(id) {
        if (window.sessionStorage && window.sessionStorage.user && JSON.parse(window.sessionStorage.user)._id) {
          this.$router.push({
            name: 'issue-reply',
            params: {
              id: id
            }
          });
        } else {
          this.$router.push({
            name: 'login'
          });
        }
      }
    }
  };
</script>
