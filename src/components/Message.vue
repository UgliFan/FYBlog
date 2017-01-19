<template>
  <transition name="message">
    <div v-if="MSG_INFO.msg" :class="['message-area', typeEnum[MSG_INFO.type].type]">
      <i :class="['iconfont', typeEnum[MSG_INFO.type].icon]"></i>{{MSG_INFO.msg}}
    </div>
  </transition>
</template>
<style lang="scss">
  @import '../styles/variable.scss';
  .message-area {
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: $white;
    padding: 4px 16px;
    font-size: 14px;
    line-height: 20px;
    border-radius: $radius;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.26);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 90%;
    z-index: 9999;
    i {
      margin-right: 5px;
    }
    &.info {
      color: $info;
      background-color: $bgInfo;
    }
    &.success {
      color: $green;
      background-color: $bgGreen;
    }
    &.error {
      color: $red;
      background-color: $bgRed;
    }
    &.warn {
      color: $orange;
      background-color: $bgYellow;
    }
  }
  .message-enter-active, .message-leave-active {
    transform: translate(-50%, 0);
    transition: transform .2s linear;
  }
  .message-enter, .message-leave-active {
    transform:  translate(-50%, -30px);
  }
</style>
<script>
  import { mapGetters } from 'vuex';
  import { TRIGGER_MESSAGE } from '../vuex/actions';

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
        }],
        timer: null
      };
    },
    computed: mapGetters([
      'MSG_INFO'
    ]),
    methods: {
      closeMessage() {
        this.timer = setTimeout(() => {
          this.$store.dispatch({
            type: TRIGGER_MESSAGE,
            msgInfo: {
              type: 0,
              msg: ''
            }
          });
          clearTimeout(this.timer);
          this.timer = null;
        }, 2000);
      }
    },
    updated() {
      if (this.MSG_INFO.msg) {
        this.closeMessage();
      }
    }
  };
</script>
