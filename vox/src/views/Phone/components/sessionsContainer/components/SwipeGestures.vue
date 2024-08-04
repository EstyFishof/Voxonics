<template>
  <div ref="swipe" @mousedown.capture="touchStartMethod" @mouseup.capture="touchEndMethod" class="swipe">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "SwipeGestures",
  props: [
    'setIsOpenProp',
    'setSessionShownProp'
  ],
  data() {
    return {
      startTouch: 0
    }
  },
  methods: {
    touchStartMethod(e) {
      this.startTouch = e.clientX
    },
    touchEndMethod(e) {
      if(this.startTouch + 30 < e.clientX) return this.$emit('setIsOpenProp', true)
      if(this.startTouch - 30 > e.clientX) return this.$emit('setIsOpenProp', false)
      if(e.target.id !== 'click') return this.$emit('setSessionShownProp')
      
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
