<template>
  <div>
    <nv-header :func-type="-1"></nv-header>
    <section v-if="!isLogin" class="container-body">
      <div class="login-area">
        <div class="input-area inline left">
          <label><i class="iconfont icon-people"></i>头像</label>
          <div class="face-icon">
            <label class="iconfont icon-add" for="file"></label>
          </div>
          <input type="file" id="file" autocomplete="off"/>
        </div>
        <div class="input-area inline right">
          <label><i class="iconfont icon-sex"></i>性别</label>
          <label class="radio"><input type="radio" name="sex-group" checked="checked"/> 男</label>
          <label class="radio"><input type="radio" name="sex-group"/> 女</label>
        </div>
        <div class="input-area">
          <label for="name"><i class="iconfont icon-people"></i>昵称</label>
          <input type="text" id="name" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="email"><i class="iconfont icon-email"></i>邮箱</label>
          <input type="text" id="email" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="tel"><i class="iconfont icon-mobile"></i>手机号</label>
          <input type="text" id="tel" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="pass"><i class="iconfont icon-attentionforbid"></i>密码</label>
          <input type="password" id="pass" autocomplete="off"/>
        </div>
        <div class="submit-area">
          <router-link class="login" :to="{name: 'login'}">登录</router-link>
          <button type="button" class="register">注册</button>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
  @import '../styles/variable.scss';
  .login-area {
    position: absolute;
    width: 280px;
    padding-top: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input-area {
      width: 100%;
      margin-bottom: 10px;
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
        font-size: 18px;
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
        height: 42px;
        font-size: 14px;
        line-height: 14px;
        border: 1px solid $gray;
        border-radius: $radius;
        background: $white!important;
        padding: 12px;
        -webkit-appearance: none;
      }
      input[type="file"] {
        display: none;
      }
      .face-icon {
        width: 60px;
        height: 60px;
        margin-left: 26px;
        border: 1px solid $gray;
        border-radius: $radiusLg;
        overflow: hidden;
        label {
          width: 100%;
          height: 100%;
          display: block;
          line-height: 60px;
          font-size: 40px;
          text-align: center;
          color: $grayer;
        }
      }
    }
    .submit-area {
      width: 100%;
      text-align: center;
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
  import { CHANGE_NAV } from '../vuex/actions';
  import nvHeader from '../components/Header.vue';

  export default {
    data() {
      return {
        isLogin: false
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
      }
    }
  };
</script>
