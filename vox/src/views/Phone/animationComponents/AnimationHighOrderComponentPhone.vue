<template>
  <transition name="main-component-wrapper" mode="out-in">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: 'AnimationHighOrderComponentPhone'
}
</script>
<style lang="scss" scoped>
  .main-component-wrapper-enter-active, .main-component-wrapper-leave-active {
    transition: all .3s ease;
  }
  .main-component-wrapper-enter, .main-component-wrapper-leave-to {
    opacity: 0;
  }
</style>
