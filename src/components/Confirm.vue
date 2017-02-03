<template>
  <transition name="confirm-dialog">
    <section v-show="CONFIRM_INFO.msg" class="confirm-dialog">
      <div class="confirm-area">
        <div :class="['confirm-title', typeEnum[CONFIRM_INFO.type].type]"><i :class="['iconfont', typeEnum[CONFIRM_INFO.type].icon]"></i>系统提醒您</div>
        <div class="confirm-body">
          <p class="confirm-info">{{CONFIRM_INFO.msg}}</p>
          <div class="btn-area">
            <a href="javascript:;" class="btn close" @click="close">我再想想</a>
            <a href="javascript:;" class="btn confirm" @click="confirm">就这样了!</a>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .confirm-dialog {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $bgMask;
    z-index:9999;
    .confirm-area {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%) scale(1);
      width: 300px;
      padding: 20px;
      background-color: $white;
      border-radius: $radiusLg;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
      overflow: hidden;
      .confirm-title {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        &.warn {
          color: $orange;
        }
      }
      .confirm-body {
        width: 100%;
        .confirm-info {
          width: 100%;
          padding: 10px;
          color: $graySt;
          font-size: 14px;
          line-height: 20px;
        }
        .btn-area {
          width: 100%;
          text-align: center;
          margin-top: 10px;
          .btn {
            position: relative;
            display: inline-block;
            margin: 0 10px;
            padding: 10px 16px;
            font-size: 16px;
            line-height: 18px;
            height: 36px;
            border-radius: $radius;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
            &.close {
              color: $grayer;
            }
            &.confirm {
              color: $white;
              background-color: $blue;
            }
          }
        }
      }
    }
  }
  .confirm-dialog-enter-active, .confirm-dialog-leave-active {
    opacity: 1;
    transition: opacity .2s linear;
    .confirm-area {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  .confirm-dialog-enter-active {
    .confirm-area {
      animation: dialog-scale-in .3s;
    }
  }
  .confirm-dialog-leave-active {
    opacity: 0;
    .confirm-area {
      animation: dialog-scale-out .2s;
    }
  }
  @keyframes dialog-scale-in {
    0% { transform: translate(-50%, -50%) scale(0); }
    50% { transform: translate(-50%, -50%) scale(1.2); }
    100% { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes dialog-scale-out {
    0% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.2); }
    100% { transform: translate(-50%, -50%) scale(0); }
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import { TRIGGER_CONFIRM } from '../vuex/actions';

  export default {
    data() {
      return {
        typeEnum: [{
          type: 'info',
          icon: 'icon-info'
        }, {
          type: 'success',
          icon: 'icon-check'
        }, {
          type: 'error',
          icon: 'icon-roundclose'
        }, {
          type: 'warn',
          icon: 'icon-warn'
        }]
      };
    },
    computed: mapGetters([
      'CONFIRM_INFO'
    ]),
    methods: {
      close() {
        this.$store.dispatch({
          type: TRIGGER_CONFIRM,
          confirmInfo: {
            type: 0,
            msg: '',
            callBack: null
          }
        });
      },
      confirm() {
        this.CONFIRM_INFO.callBack && this.CONFIRM_INFO.callBack();
        this.$store.dispatch({
          type: TRIGGER_CONFIRM,
          confirmInfo: {
            type: 0,
            msg: '',
            callBack: null
          }
        });
      }
    }
  };
</script>
