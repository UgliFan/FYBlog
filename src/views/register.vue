<template>
  <div>
    <nv-header :func-type="3"></nv-header>
    <section v-if="!isLogin" class="container-body">
      <form class="register-area" id="formData">
        <div class="input-area inline left">
          <label><i class="iconfont icon-people"></i>头像</label>
          <div class="face-icon">
            <label id="imgContainer" for="file">
              <input type="file" id="file" name="file" @change="chooseFile($event)"/>
              <i class="iconfont icon-add" v-if="!hasImg" @click="propagation()"></i>
            </label>
          </div>
        </div>
        <div class="input-area inline right">
          <label><i class="iconfont icon-sex"></i>性别</label>
          <label class="radio"><input type="radio" name="sex" value="male" checked="checked"/> 男</label>
          <label class="radio"><input type="radio" name="sex" value="female"/> 女</label>
        </div>
        <div class="input-area">
          <label for="name"><i class="iconfont icon-people"></i>昵称</label>
          <input type="text" id="name" name="name" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="email"><i class="iconfont icon-email"></i>邮箱</label>
          <input type="text" id="email" name="email" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="tel"><i class="iconfont icon-mobile"></i>手机号</label>
          <input type="text" id="tel" name="tel" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="pass"><i class="iconfont icon-attentionforbid"></i>密码</label>
          <input type="password" id="pass" name="password" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="passVerify"><i class="iconfont icon-attentionforbid"></i>再次输入密码</label>
          <input type="password" id="passVerify" autocomplete="off"/>
        </div>
        <div class="submit-area">
          <router-link class="login" :to="{name: 'login'}">登录</router-link>
          <a href="javascript:;" class="register" @click="register">注册</a>
        </div>
      </form>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .register-area {
    position: absolute;
    width: 280px;
    padding-top: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input-area {
      width: 100%;
      margin-bottom: 4px;
      &.inline {
        vertical-align: top;
        display: inline-block;
        &.left {
          width: 60%;
        }
        &.right {
          width: 38%;
        }
      }
      label {
        display: block;
        width: 100%;
        font-size: 16px;
        font-weight: 700;
        line-height: 30px;
        i {
          margin-right: 10px;
        }
        &.radio {
          display: inline-block;
          width: 100%;
          margin-right: 20px;
          font-weight: 500;
        }
        &.left {
          display: inline-block;
          width: auto;
        }
      }
      input[type="text"], input[type="password"] {
        width: 100%;
        height: 30px;
        font-size: 14px;
        line-height: 14px;
        border: 1px solid $gray;
        border-radius: $radius;
        padding: 6px 12px;
      }
      .face-icon {
        width: 60px;
        height: 60px;
        margin-left: 26px;
        border: 1px solid $gray;
        border-radius: $radiusLg;
        overflow: hidden;
        label {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          line-height: 60px;
          font-size: 40px;
          text-align: center;
          color: $grayer;
          input[type="file"] {
            display: none;
          }
          i {
            margin: 0;
            z-index: -1;
          }
          canvas {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .submit-area {
      width: 100%;
      text-align: center;
      margin-top: 20px;
      a, button {
        display: inline-block;
        vertical-align: top;
        font-size: 20px;
        line-height: 1;
        margin: 0 10px;
        padding: 12px 30px;
        border: none;
        border-radius: $radius;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        &.login {
          background: $white;
          color: $graySt;
        }
        &.register {
          background: $blue;
          color: $white;
        }
      }
    }
  }
</style>
<script>
  import { CHANGE_NAV, TRIGGER_MESSAGE } from '../vuex/actions';
  import nvHeader from '../components/Header.vue';
  import loadImage from '../libs/image-to-canvas';
  import store from '../libs/data';

  export default {
    data() {
      return {
        isLogin: false,
        hasImg: false
      };
    },
    mounted() {
      this.routeEnter();
    },
    watch: {
      '$route': 'routeEnter'
    },
    components: {
      nvHeader
    },
    methods: {
      routeEnter() {
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '注册',
            routerName: 'register'
          }
        });
      },
      chooseFile(e) {
        e.preventDefault();
        e.stopPropagation();
        let imgContainer = document.getElementById('imgContainer');
        let target = e.dataTransfer || e.target;
        let file = target && target.files && target.files[0];
        if (file) {
          loadImage(file, img => {
            if (img.src || img instanceof HTMLCanvasElement) {
              this.hasImg = true;
              if (imgContainer.childNodes[imgContainer.childNodes.length - 1].tagName.toUpperCase() === 'CANVAS') {
                imgContainer.removeChild(imgContainer.childNodes[imgContainer.childNodes.length - 1]);
              }
              imgContainer.appendChild(img);
              img.addEventListener('click', (event) => {
                this.propagation();
              }, false);
            }
          }, {
            maxWidth: 60,
            maxHeight: 60,
            canvas: true,
            pixelRatio: window.devicePixelRatio,
            downsamplingRatio: 0.5,
            orientation: true
          });
        }
      },
      propagation() {
        document.getElementById('file').click();
      },
      register() {
        let formData = new FormData(document.getElementById('formData'));
        store.register(formData).then(data => {
          this.$store.dispatch({
            type: TRIGGER_MESSAGE,
            msgInfo: {
              type: data.code === 0 ? 1 : 3,
              msg: data.msg
            }
          });
          if (data.code === 0) {
            this.$router.replace({
              name: 'login'
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
  };
</script>
