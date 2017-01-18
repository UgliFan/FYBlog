<template>
  <div>
    <nv-header :func-type="-1"></nv-header>
    <section v-if="!isLogin" class="container-body">
      <div class="login-area">
        <div class="input-area">
          <label for="username"><i class="iconfont icon-people"></i>用户名</label>
          <input type="text" id="username" placeholder="邮箱 / 手机号" autocomplete="off"/>
        </div>
        <div class="input-area">
          <label for="password"><i class="iconfont icon-attentionforbid"></i>密码</label>
          <input type="password" id="password" autocomplete="off"/>
        </div>
        <div class="submit-area">
          <router-link class="login" :to="{name: 'login'}">登录</router-link>
          <button type="button" class="register">注册</button>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .login-area {
    position: absolute;
    width: 280px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input-area {
      width: 100%;
      margin-bottom: 20px;
      label {
        display: block;
        width: 100%;
        font-size: 18px;
        font-weight: 700;
        line-height: 30px;
        i {
          margin-right: 10px;
        }
      }
      input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        line-height: 18px;
        border: 1px solid $gray;
        border-radius: $radius;
        background: $white!important;
        padding: 16px;
      }
    }
    .submit-area {
      width: 100%;
      text-align: center;
      margin-top: 40px;
      a, button {
        display: inline-block;
        vertical-align: top;
        font-size: 20px;
        line-height: 1;
        margin: 0 10px;
        padding: 8px 16px;
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
