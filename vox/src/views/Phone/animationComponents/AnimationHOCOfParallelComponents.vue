<template>
  <div :style="{transform: valueProp ? 'translateX(0)' : 'translateX(-375px)'}">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>

</template>
<script>
export default {
  name: 'AnimationHOCOfParallelComponents',
  props: ['valueProp']
}
</script>
<style lang="scss" scoped>

  div {
    transition: all .5s ease;
    transform: translateX(0px);
    width: 750px
  }
</style>
