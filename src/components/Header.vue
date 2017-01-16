<template>
  <div class="container-header">
    <header>
      <div @click="triggerSlide" :class="['header-btn', 'more-icon', {'active': NAV_STAT}]"><i class="iconfont icon-more"></i></div>
      <span class="title" v-text="ACTIVE_NAV.name">推荐</span>
      <router-link v-if="!funcInfo.needBack" class="header-btn new" :to="{'name': 'new'}"><i class="iconfont icon-write"></i></router-link>
      <router-link v-if="funcInfo.needBack" class="header-btn back" :to="{'name': funcInfo.backRoute}"><i class="iconfont icon-back"></i></router-link>
      <a v-if="funcInfo.needBack" class="header-btn ok" href="javascript:;" @click="saveClick"><i class="iconfont icon-check"></i></a>
    </header>
    <SideNav :nav-stat="NAV_STAT"></SideNav>
  </div>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .container-header:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    background: $white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    .header-btn {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 0;
      line-height: 60px;
      text-align: center;
      font-size: 24px;
      transform: rotateZ(0deg);
      transition: transform .3s ease;
      &.more-icon {
        left: 0;
        color: $red;
      }
      &.new, &.ok {
        right: 0;
        color: $green;
      }
      &.back {
        right: 60px;
        color: $grayer;
      }
      &.active {
        transform: rotateZ(-90deg);
      }
    }
    .title {
      line-height: 60px;
      font-size: 20px;
      color: $blackSt;
    }
  }
</style>
<script>
  import { TRIGGER_NAV } from '../vuex/actions';
  import { mapGetters } from 'vuex';
  import SideNav from './SideNav';

  export default {
    data() {
      return {};
    },
    computed: mapGetters([
      'NAV_STAT', 'ACTIVE_NAV'
    ]),
    props: {
      funcInfo: {
        type: Object,
        default: function() {
          return {
            needBack: false,
            backRoute: 'index'
          };
        }
      },
      callback: {
        type: Function,
        default: function() {
          return function() {};
        }
      }
    },
    mounted() {
      console.log('[header.vue: Mounted]');
    },
    components: {
      SideNav
    },
    methods: {
      triggerSlide() {
        this.$store.dispatch({
          type: TRIGGER_NAV,
          status: true
        });
      },
      saveClick() {
        this.callback();
        this.$router.go(-1);
      }
    }
  };
</script>
