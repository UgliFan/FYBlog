<template>
  <div>
    <nv-header :func-type="1" :callback="sendIssue"></nv-header>
    <section class="container-body issue-reply">
      <textarea class="issue-content" v-model="postData.content" placeholder="填写你的内容..."></textarea>
    </section>
    <confirm-dialog></confirm-dialog>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .issue-reply {
    padding: 20px;
    .issue-content {
      width: 100%;
      height: 460px;
      border: none;
      padding: 10px;
      line-height: 24px;
      font-size: 16px;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, .26);
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import { CHANGE_NAV, TRIGGER_CONFIRM, TRIGGER_MESSAGE } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import confirmDialog from '../components/Confirm';
  import store from '../libs/data';

  export default {
    data() {
      return {
        postData: {
          id: '',
          content: '',
          author: JSON.parse(window.sessionStorage.user).name
        }
      };
    },
    computed: mapGetters([
      'NAV_LIST'
    ]),
    components: {
      nvHeader, confirmDialog
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {
        this.id = this.$route.params.id;
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '回复',
            routerName: 'issue-reply'
          }
        });
      },
      sendIssue() {
        if (this.postData.content) {
          this.$store.dispatch({
            type: TRIGGER_CONFIRM,
            confirmInfo: {
              type: 3,
              msg: '确认回复[' + this.typeName + '] ?',
              callBack: () => {
                store.replyIssue(this.id, this.postData).then(data => {
                  this.$store.dispatch({
                    type: TRIGGER_MESSAGE,
                    msgInfo: {
                      type: data.code === 0 ? 1 : 3,
                      msg: data.msg
                    }
                  });
                  if (data.code === 0) {
                    this.$router.replace({
                      name: 'help'
                    });
                  }
                }, () => {
                  this.$store.dispatch({
                    type: TRIGGER_MESSAGE,
                    msgInfo: {
                      type: 2,
                      msg: '网络异常, 请稍后再试'
                    }
                  });
                });
              }
            }
          });
        } else {
          this.$store.dispatch({
            type: TRIGGER_MESSAGE,
            msgInfo: {
              type: 3,
              msg: '内容不能为空'
            }
          });
        }
      }
    }
  };
</script>
