<template>
  <transition-group
    :class="className"
    :tag="tagType"
    :name="transName"
    @beforeEnter="beforeEnter"
    @enter="enter">
    <slot></slot>
  </transition-group>
</template>
<style lang="scss">
.slide-in-enter-active {
  opacity: 0;
  transform: translateX(0);
  overflow: hidden;
  transition: all .3s linear;
}
.slide-in-enter {
  opacity: 1;
  transform: translateX(40%);
}
</style>
<script>
  export default {
    props: {
      transName: {
        type: String,
        default: 'slide-in'
      },
      className: {
        type: String,
        default: 'blog-list'
      },
      tagType: {
        type: String,
        default: 'ul'
      },
      page: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 20
      }
    },
    methods: {
      beforeEnter(el) {
        if (this.transName === 'fade') {
          el.style.opacity = 0;
        } else {
          el.style.opacity = 0;
          el.style.transform = 'translateX(40%)';
          el.style.WebkitTransform = 'translateX(40%)';
        }
      },
      enter(el, done) {
        setTimeout(() => {
          if (this.transName === 'fade') {
            el.style.opacity = 1;
          } else {
            el.style.opacity = 1;
            el.style.transform = 'translateX(0)';
            el.style.WebkitTransform = 'translateX(0)';
          }
        }, (el.dataset.index - this.page * this.pageSize) * 50);
      }
    }
  };
</script>
