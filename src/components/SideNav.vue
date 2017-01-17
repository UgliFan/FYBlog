<template>
  <transition name="fade">
    <section class="side-nav" v-show="navStat" @click="closeNav">
      <div class="user-info">
        <img v-if="USER_INFO.icon" class="img-icon" src="userInfo.icon" />
        <div v-if="!USER_INFO.icon" class="img-icon"><i class="iconfont icon-people"></i></div>
        <router-link v-if="!USER_INFO.id" class="btn login" :to="{'name': 'login'}">登录</router-link>
        <a v-if="!USER_INFO.id" class="btn register" href="javascript:;" @click="register">注册</a>
        <h4 v-if="USER_INFO.id" v-text="USER_INFO.name"></h4>
      </div>
      <transition-group name="rotate" tag="div">
        <router-link v-for="nav in navList" :class="['nav-item', nav.className]" :to="{'name':nav.routerName}" :key="nav"><i :class="nav.icon"></i><span v-text="nav.name"></span></router-link>
      </transition-group>
    </section>
  </transition>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  section.side-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $bgMask;
    perspective: 600px;
    padding: 180px 0 0;
    overflow: hidden;
    z-index: 9000;
    .nav-item {
      display: block;
      width: 80%;
      height: 140px;
      line-height: 140px;
      text-align: center;
      font-size: 30px;
      color: $white;
      margin: -30px auto 0;
      background: $white;
      border-radius: $radius;
      transform: rotateX(-20deg);
      i {
        margin-right: 20px;
      }
      &.recommend {
        background: $red;
        box-shadow: 0 -2px 5px 0 rgba(255, 0, 0, 0.26);
      }
      &.list {
        background: $blue;
        box-shadow: 0 -2px 5px 0 rgba(0, 136, 255, 0.26);
      }
      &.help {
        background: $green;
        box-shadow: 0 -2px 5px 0 rgba(0, 255, 43, 0.26);
      }
      &.cream {
        background: $orange;
        box-shadow: 0 -2px 5px 0 rgba(255, 153, 0, 0.26);
      }
      &.rotate-enter-active, &.rotate-leave-active {
        margin-top: -30px;
        transform: rotateX(-20deg);
        transition: all .3s linear;
      }
      &.rotate-enter, &.rotate-leave-active {
        margin-top: 0;
        transform: rotateX(0deg);
      }
    }
    .user-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 140px;
      line-height: 60px;
      padding: 40px 0;
      text-align: center;
      .img-icon {
        display: inline-block;
        vertical-align: top;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
        background: $white;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        line-height: 60px;
        i {
          font-size: 30px;
          color: $grayer;
        }
      }
      .btn {
        display: inline-block;
        vertical-align: middle;
        height: 30px;
        font-size: 16px;
        line-height: 20px;
        background: $white;
        padding: 5px 20px;
        border-radius: $radius;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        margin-left: 20px;
        &.login {
          color: $red;
        }
        &.register {
          color: $blue;
        }
      }
      h4 {
        font-size: 20px;
        font-weight: 500;
        color: $white;
        display: inline-block;
        line-height: 30px;
        vertical-align: middle;
        margin-left: 20px;
      }
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import { TRIGGER_NAV } from '../vuex/actions';

  export default {
    data() {
      return {
        navList: []
      };
    },
    computed: mapGetters([
      'NAV_LIST', 'USER_INFO'
    ]),
    props: {
      navStat: {
        type: Boolean,
        require: true
      }
    },
    watch: {
      navStat() {
        if (this.navStat) {
          this.navList = this.NAV_LIST;
        } else {
          this.navList = [];
        }
      }
    },
    methods: {
      closeNav() {
        this.$store.dispatch({
          type: TRIGGER_NAV,
          status: false
        });
      },
      register() {
        let rdt = encodeURIComponent(location.href);
        location.href = `//back.fyq2yj.cn/register?rdt=${rdt}`;
      }
    }
  };
</script>
