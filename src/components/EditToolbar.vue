<template>
  <div class="edit-toolbar">
    <label class="tool-item iconfont icon-pic" for="editImage">
      <form id="formImage">
        <input type="file" id="editImage" name="image" @change="imageChange($event)" accept="image/*"/>
      </form>
    </label>
    <label class="tool-item iconfont icon-preview" @click="previewBlog"></label>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .edit-toolbar {
    position: absolute;
    top: 274px;
    height: 40px;
    width: 100%;
    border-radius: $radius $radius 0 0;
    background-color: $bgGray;
    overflow: hidden;
    padding: 5px;
    label.tool-item {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 32px;
      font-weight: 500;
      font-size: 24px;
      text-align: center;
      background-color: $white;
      border-radius: $radius;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, .26);
      color: $green;
      margin-right: 4px;
      overflow: hidden;
      form {
        display: none;
      }
    }
  }
</style>
<script>
  import { TRIGGER_MESSAGE } from '../vuex/actions';
  import store from '../libs/data';

  export default {
    props: {
      callback: {
        type: Function
      },
      previewBlog: {
        type: Function
      },
      range: {}
    },
    methods: {
      imageChange(e) {
        if (this.range) {
          let formData = new FormData(document.getElementById('formImage'));
          store.uploadImage(formData).then(data => {
            e.target.value = '';
            if (data.code === 0) {
              this.callback && this.callback(data.image);
            } else {
              this.$store.dispatch({
                type: TRIGGER_MESSAGE,
                msgInfo: {
                  type: 3,
                  msg: data.msg
                }
              });
            }
          }, () => {
            e.target.value = '';
            this.$store.dispatch({
              type: TRIGGER_MESSAGE,
              msgInfo: {
                type: 2,
                msg: '网络异常, 请稍后再试'
              }
            });
          });
        } else {
          e.target.value = '';
        }
      }
    }
  };
</script>
