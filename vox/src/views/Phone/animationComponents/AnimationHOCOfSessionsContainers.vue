<template>
  <!-- <div class="sessions-container-wrapper" :style="{transform: `translateX(${horizontalPosition}px)`}"> -->
      <transition 
        name="sessions-container-wrapper" 
        :duration="1000"
        >
        <slot></slot>

    </transition>
  <!-- </div> -->

</template>
<script>
export default {
  name: 'AnimationHOCOfSessionsContainers'
}
</script>
<style lang="scss" scoped>
.sessions-container-wrapper {
  transform: scaleY(1);
  transition: all .3s ease;
}
  .sessions-container-wrapper-enter-active, .sessions-container-wrapper-leave-active {
    transition: all .3s ease;
  }
  .sessions-container-wrapper-enter-to, .sessions-container-wrapper-leave-to {
    transform: scaleY(0);
    transform-origin: bottom center;
  }
</style>
