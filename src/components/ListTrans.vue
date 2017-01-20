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
  transform: translateX(40%);
  overflow: hidden;
  transition: transform .3s linear;
}
.slide-in-enter {
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
      }
    },
    methods: {
      beforeEnter(el) {
        el.style.transform = 'translateX(40%)';
      },
      enter(el, done) {
        setTimeout(() => {
          el.style.transform = 'translateX(0)';
        }, el.dataset.index * 50);
      }
    }
  };
</script>
