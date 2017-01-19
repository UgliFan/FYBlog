<template>
  <section class="comment-area">
    <h4 class="comment-title">评论（{{commentCount}}）<router-link :to="{name: 'reply', params: {id: blogId}, query: {type: 'blog'}}">回复</router-link></h4>
    <div v-for="(comment, index) in list" class="comment-row">
      <div class="icon">
        <i v-if="!comment.icon" class="iconfont icon-people"></i>
        <img v-if="comment.icon" :src="comment.icon" />
      </div>
      <div class="content">
        <h4 class="comment-author">{{comment.author || comment.author_ip}}</h4>
        <p class="comment-content">{{comment.content}}</p>
        <div class="comment-info">
          #{{page * pageSize + index + 1}}
          <span class="info-item date">{{comment.create_at | formatDate}}</span>
          <span class="info-item zan"><i class="iconfont icon-appreciate"></i>{{comment.zan_count | formatNum}}</span>
          <span class="info-item cai"><i class="iconfont icon-appreciate rotate-180"></i>{{comment.zan_count | formatNum}}</span>
          <router-link :to="{name: 'reply', params: {id: comment._id}, query: {type: 'comment'}}" class="info-item reply">回复</router-link>
          <div v-if="comment.children && comment.children.length > 0" class="children-reply">
            <div v-for="(item, i) in comment.children" class="reply-row">
              <div class="reply-icon">
                <i v-if="!item.icon" class="iconfont icon-people"></i>
                <img v-if="item.icon" :src="item.icon" />
              </div>
              <div class="reply-content">
                <div class="reply-name">{{item.author || item.author_ip}}</div>
                <p class="reply-detail">{{item.content}}</p>
                <div class="reply-info">#{{i + 1}}<span class="reply-date">{{item.create_at | formatDate}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .comment-area {
    h4.comment-title {
      color: $blackSt;
      background: $bgGray;
      line-height: 22px;
      font-size: 20px;
      height: 40px;
      border-left: 6px solid $blue;
      padding: 10px;
      a {
        display: inline-block;
        float: right;
        font-size: 12px;
        line-height: 18px;
        border-radius: $radius;
        border: 1px solid $blue;
        padding: 0 10px;
        color: $blue;
      }
    }
    .comment-row {
      min-height: 100px;
      position: relative;
      .icon {
        float: left;
        width: 60px;
        height: 60px;
        margin: 20px;
        border-radius: 50%;
        border: 1px solid $gray;
        text-align: center;
        line-height: 58px;
        font-size: 30px;
        color: $graySt;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .content {
        padding: 20px 20px 0 100px;
        height: 100%;
        .comment-author {
          font-size: 14px;
          line-height: 14px;
          padding-bottom: 8px;
          color: $black;
        }
        .comment-content {
          font-size: 14px;
          color: $blackSt;
          line-height: 18px;
          padding-bottom: 8px;
        }
        .comment-info {
          font-size: 12px;
          line-height: 20px;
          color: $grayer;
          padding-bottom: 8px;
          border-bottom: 1px solid $gray;
          .info-item {
            margin-left: 10px;
            i {
              margin-right: 4px;
            }
            &.cai {
              i {
                display: inline-block;
              }
            }
            &.reply {
              display: inline-block;
              vertical-align: top;
              width: 40px;
              height: 20px;
              border: 1px solid $gray;
              border-radius: $radius;
              text-align: center;
              line-height: 18px;
              font-size: 12px;
              color: $black;
            }
          }
          .children-reply {
            width: 100%;
            .reply-row {
              min-height: 60px;
              .reply-icon {
                float: left;
                width: 40px;
                height: 40px;
                margin: 10px 10px 10px 0;
                border-radius: 50%;
                border: 1px solid $gray;
                text-align: center;
                line-height: 38px;
                font-size: 20px;
                color: $graySt;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  overflow: hidden;
                }
              }
              .reply-content {
                padding: 10px 0 0 50px;
                height: 100%;
                .reply-name {
                  font-size: 12px;
                  line-height: 14px;
                  padding-bottom: 4px;
                  color: $black;
                }
                .reply-detail {
                  font-size: 12px;
                  color: $blackSt;
                  line-height: 16px;
                  padding-bottom: 4px;
                }
                .reply-info {
                  font-size: 12px;
                  line-height: 20px;
                  color: $grayer;
                  .reply-date {
                    margin-left: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<script>
  import store from '../libs/data';

  export default {
    data() {
      return {
        list: [],
        page: 0,
        pageSize: 20,
        total: 0
      };
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
      store.getBlogComment(this.blogId).then(data => {
        this.list = data.result;
        this.total = data.total;
        console.log(data.result);
      });
    }
  };
</script>
