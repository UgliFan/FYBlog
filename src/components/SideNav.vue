<template>
  <transition name="fade">
    <section class="side-nav" v-show="navStat" @click="closeNav">
      <div class="user-info">
        <img v-if="USER_INFO.icon" class="img-icon" :src="USER_INFO.icon" />
        <div v-if="!USER_INFO.icon" class="img-icon"><i class="iconfont icon-people"></i></div>
        <router-link v-if="!USER_INFO._id" class="btn login" :to="{name: 'login'}">登录</router-link>
        <router-link v-if="!USER_INFO._id" class="btn register" :to="{name: 'register'}">注册</router-link>
        <div v-if="USER_INFO._id" class="user-params">
          <h4 v-text="USER_INFO.name"></h4><br/>
          <i :class="['iconfont', {'icon-male': USER_INFO.sex === 'male', 'icon-female': USER_INFO.sex === 'female'}]"></i>
          <span>{{USER_INFO.groupId === 0 ? '管理员' : '普通会员'}}</span>
        </div>
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
      margin: -40px auto 0;
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
        margin-top: -40px;
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
      .user-params {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        text-align: left;
        h4 {
          font-size: 20px;
          font-weight: 500;
          color: $white;
          display: inline-block;
          line-height: 20px;
          vertical-align: top;
          margin-left: 20px;
          margin-bottom: 10px;
        }
        i {
          display: inline-block;
          vertical-align: top;
          width: 24px;
          height: 24px;
          line-height: 26px;
          text-align: center;
          font-size: 18px;
          border-radius: 50%;
          color: $white;
          margin-left: 20px;
          &.icon-male {
            background-color: $blue;
          }
          &.icon-female {
            line-height: 24px;
            background-color: $pink;
          }
        }
        span {
          display: inline-block;
          vertical-align: top;
          line-height: 22px;
          height: 24px;
          padding: 0 10px;
          text-align: center;
          font-size: 14px;
          border-radius: $radius;
          border: 1px solid $white;
          color: $white;
          margin-left: 10px;
        }
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
        required: true
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
      }
    }
  };
</script>
