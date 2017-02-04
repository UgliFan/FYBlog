<template>
  <div>
    <nv-header :func-type="1" :callback="saveBlog"></nv-header>
    <section class="container-body blog-edit">
      <div class="blog-edit-block">
        <label for="blogTitle">文章标题</label>
        <input id="blogTitle" type="text" placeholder="输入文章标题" v-model="postData.title"/>
      </div>
      <div class="blog-edit-block">
        <label for="blogRemark">摘要</label>
        <textarea id="blogRemark" placeholder="可以写一点摘要引起读者的注意 ~" v-model="postData.remark"></textarea>
      </div>
      <div class="blog-edit-content" >
        <label for="blogContent">正文内容<span><i class="iconfont icon-warn"></i>请使用markdown语法书写</span></label>
        <edit-toolbar :callback="insertImage" :range="range" :preview-blog="previewBlog"></edit-toolbar>
        <textarea id="blogContent" :style="areaHeight" v-model="postData.content" @keyup="saveSelection" @mouseup="saveSelection"></textarea>
        <p class="markdown-body preview-markdown" :style="previewHeight" v-if="preview" v-html="previewContent"></p>
      </div>
    </section>
    <confirm-dialog></confirm-dialog>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .blog-edit {
    padding: 10px;
    position: relative;
    .blog-edit-block {
      position: relative;
      width: 100%;
      margin-bottom: 10px;
      z-index: 2;
      label {
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 4px;
        color: $black;
      }
      input {
        width: 100%;
        height: 30px;
        padding: 6px 12px;
        line-height: 18px;
        font-size: 16px;
        margin: 0;
        border: 0;
        border-radius: $radius;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        color: $blackSt;
      }
      textarea {
        width: 100%;
        height: 70px;
        padding: 6px 12px;
        line-height: 18px;
        font-size: 12px;
        margin: 0;
        border: 0;
        border-radius: $radius;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        color: $graySt;
      }
    }
    .blog-edit-content {
      position: absolute;
      top: 0;
      left: 10px;
      right: 10px;
      padding-top: 180px;
      z-index: 1;
      label {
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 4px;
        color: $black;
        span {
          color: $orange;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      textarea {
        width: 100%;
        padding: 46px 6px 6px;
        line-height: 20px;
        font-size: 14px;
        margin: 0;
        border: 0;
        border-radius: $radius;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.26);
        color: $blackSt;
      }
      .preview-markdown {
        position: absolute;
        top: 244px;
        left: 0;
        width: 100%;
        padding: 10px;
        overflow-y: scroll;
        background: $white;
        z-index: 1000;
      }
    }
  }
</style>
<script>
  import { CHANGE_NAV, TRIGGER_MESSAGE, TRIGGER_CONFIRM } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import confirmDialog from '../components/Confirm';
  import EditToolbar from '../components/EditToolbar';
  import store from '../libs/data';
  import marked from 'marked';

  import '../styles/markdown.scss';

  export default {
    data() {
      return {
        areaHeight: 'height: 300px',
        previewHeight: 'height: 300px',
        postData: {
          title: '',
          remark: '',
          content: '',
          author: window.sessionStorage.user && JSON.parse(window.sessionStorage.user).name
        },
        range: null,
        preview: false,
        previewContent: ''
      };
    },
    components: {
      nvHeader, EditToolbar, confirmDialog
    },
    mounted() {
      this.routeEnter();
      this.areaHeight = `height: ${window.screen.height - 280}px`;
      this.previewHeight = `height: ${window.screen.height - 320}px`;
    },
    watch: {
      '$route': 'routeEnter'
    },
    methods: {
      routeEnter() {
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '写文章',
            routerName: 'new'
          }
        });
      },
      saveBlog() {
        if (this.postData.title && this.postData.content) {
          this.$store.dispatch({
            type: TRIGGER_CONFIRM,
            confirmInfo: {
              type: 3,
              msg: '确认发表文章 ?',
              callBack: () => {
                store.saveBlog(this.postData).then(data => {
                  this.$store.dispatch({
                    type: TRIGGER_MESSAGE,
                    msgInfo: {
                      type: data.code === 0 ? 1 : 3,
                      msg: data.msg
                    }
                  });
                  if (data.code === 0) {
                    this.$router.replace({
                      name: 'detail',
                      params: {
                        id: data.result._id
                      }
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
              msg: '标题或内容不能为空'
            }
          });
        }
      },
      insertImage(image) {
        let imageStr = `<img src="//back.fyq2yj.cn/upload${image.position}" alt="${image.name}"/>\n`;
        if (this.range) {
          this.insertText(this.range, imageStr);
        }
      },
      saveSelection() {
        this.range = document.getElementById('blogContent');
      },
      insertText(obj, str) {
        if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
          let startPos = obj.selectionStart;
          let tmpStr = obj.value;
          obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(obj.selectionEnd, tmpStr.length);
          obj.selectionStart = obj.selectionEnd = startPos + str.length;
        } else {
          obj.value += str;
        }
        this.postData.content = obj.value;
      },
      previewBlog() {
        if (this.preview) {
          this.previewContent = '';
        } else {
          this.previewContent = marked(this.postData.content);
        }
        this.preview = !this.preview;
      }
    }
  };
</script>
