<template>
  <div>
    <nv-header :func-type="3"></nv-header>
    <section class="container-body reply-area">
      <textarea v-model="replyContent"></textarea>
      <a class="btn-reply" href="javascript:;" @click="actionReply">提交回复</a>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .container-body.reply-area {
    padding: 20px;
  }
  textarea {
    display: block;
    width: 100%;
    height: 300px;
    border-radius: $radius;
    border: 1px solid $gray;
    padding: 10px;
    font-size: 14px;
    line-height: 20px;
    color: $black;
    margin-bottom: 20px;
  }
  .btn-reply {
    display: inline-block;
    padding: 10px 12px;
    font-size: 16px;
    line-height:18px;
    border-radius: $radius;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    background-color: $blue;
    color: $white;
    float: right;
  }
</style>
<script>
  import store from '../libs/data';
  import { mapGetters } from 'vuex';
  import { CHANGE_NAV, TRIGGER_MESSAGE } from '../vuex/actions';
  import nvHeader from '../components/Header';

  export default {
    data() {
      return {
        committing: false,
        blogId: '',
        commentType: 'blog',
        replyContent: ''
      };
    },
    computed: mapGetters([
      'USER_INFO'
    ]),
    components: {
      nvHeader
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {
        this.blogId = this.$route.params.id;
        this.commentType = this.$route.query.type;
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '编写评论',
            routerName: 'reply'
          }
        });
      },
      actionReply() {
        if (!this.committing) {
          this.committing = true;
          if (this.commentType === 'blog') {
            store.commitReply({
              author: this.USER_INFO.name,
              icon: this.USER_INFO.icon,
              topic_id: this.blogId,
              content: this.replyContent
            }).then(data => {
              this.committing = false;
              if (data.code === 0) {
                this.commitSuccess();
              } else {
                this.$store.dispatch({
                  type: TRIGGER_MESSAGE,
                  msgInfo: {
                    type: 2,
                    msg: data.msg
                  }
                });
              }
            }).catch(() => {
              this.committing = false;
            });
          } else if (this.commentType === 'comment') {
            store.secondReply(this.blogId, {
              author: this.USER_INFO.name,
              icon: this.USER_INFO.icon,
              content: this.replyContent
            }).then(data => {
              this.committing = false;
              if (data.code === 0) {
                this.commitSuccess();
              }
            }).catch(() => {
              this.committing = false;
            });
          }
        }
      },
      commitSuccess() {
        this.$store.dispatch({
          type: TRIGGER_MESSAGE,
          msgInfo: {
            type: 1,
            msg: '评论成功.'
          }
        });
        this.$router.go(-1);
      }
    }
  };
</script>
