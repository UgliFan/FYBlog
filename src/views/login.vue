<template>
  <div>
    <nv-header :func-type="-1"></nv-header>
    <section v-if="!isLogin" class="container-body">
      <div class="login-area">
        <div class="input-area">
          <label for="username"><i class="iconfont icon-people"></i>用户名</label>
          <input type="text" id="username" placeholder="邮箱 / 手机号" autocomplete="off" v-model="userName"/>
        </div>
        <div class="input-area">
          <label for="password"><i class="iconfont icon-attentionforbid"></i>密码</label>
          <input type="password" id="password" autocomplete="off" v-model="password"/>
        </div>
        <div class="submit-area">
          <router-link class="register" :to="{name: 'register'}">注册</router-link>
          <a href="javascript:;" class="login" @click="submitLogin()">登录</a>
        </div>
      </div>
    </section>
    <section v-if="isLogin" class="container-body is-login">
      当前状态已登录, 即将跳转(<span>{{second}}s</span>)...
    </section>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .is-login {
    text-align: center;
    padding: 100px 0;
    font-size: 20px;
    line-height: 20px;
    color: $graySt;
    span {
      color: $orange;
    }
  }
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
        font-size: 22px;
        font-weight: 700;
        line-height: 40px;
        i {
          margin-right: 10px;
        }
      }
      input {
        width: 100%;
        height: 50px;
        font-size: 16px;
        line-height: 18px;
        border: 1px solid $gray;
        border-radius: $radius;
        background: $white!important;
        padding: 16px;
        -webkit-appearance: none;
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
        padding: 12px 30px;
        border: none;
        border-radius: $radius;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        &.login {
          background: $blue;
          color: $white;
        }
        &.register {
          background: $white;
          color: $graySt;
        }
      }
    }
  }
</style>
<script>
  import { CHANGE_NAV, SET_USER } from '../vuex/actions';
  import nvHeader from '../components/Header';
  import store from '../libs/data';

  export default {
    data() {
      return {
        isLogin: false,
        second: 3,
        timer: null,
        userName: '',
        password: '',
        rdt: 'index'
      };
    },
    mounted() {
      this.routeEnter();
    },
    destroyed() {
      clearInterval(this.timer);
      this.timer = null;
    },
    watch: {
      '$route': 'routeEnter'
    },
    components: {
      nvHeader
    },
    methods: {
      routeEnter() {
        if (this.$route.params.rdt) {
          this.rdt = this.$route.params.rdt;
        }
        this.$store.dispatch({
          type: CHANGE_NAV,
          nav: {
            name: '登录',
            routerName: 'login'
          }
        });
        if (window.sessionStorage && window.sessionStorage.user) {
          this.isLogin = true;
          this.$store.dispatch({
            type: SET_USER,
            user: JSON.parse(window.sessionStorage.user)
          });
          this.countDown();
        }
      },
      countDown() {
        this.timer = setInterval(() => {
          if (this.second > 1) {
            this.second = this.second - 1;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.$router.replace({
              name: this.rdt
            });
          }
        }, 1000);
      },
      submitLogin() {
        store.postLogin(this.userName, this.password).then(data => {
          if (data.code === 0) {
            this.isLogin = true;
            window.sessionStorage.user = JSON.stringify(data.result);
            this.$store.dispatch({
              type: SET_USER,
              user: data.result
            });
            this.$router.replace({
              name: this.rdt
            });
          }
        });
      }
    }
  };
</script>
