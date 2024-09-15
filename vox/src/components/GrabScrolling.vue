<template>
  <div 
    class="grab-scrolling-wrapper" 
    :class="{'active': isDown}"
    ref="slider"
    @mousedown="mousedownHandler"
    @mouseleave="mouseleaveHandler"
    @mouseup="mouseupHandler"
    @mousemove="mousemoveHandler"
    >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'GrabScrolling',
  data() {
    return {
      isDown: false,
      startX: null,
      startY: null,
      scrollLeft: null,
      scrollTop: null
    }
  },
  methods: {
    mousedownHandler(e) {
      this.isDown = true;
      this.startX = e.pageX - this.$refs.slider.offsetLeft
      this.startY = e.pageY - this.$refs.slider.offsetTop
      this.scrollLeft = this.$refs.slider.scrollLeft
      this.scrollTop = this.$refs.slider.scrollTop
    },
    mouseleaveHandler() {
      this.isDown = false
    },
    mouseupHandler() {
      this.isDown = false
    },
    mousemoveHandler(e) {
      if(!this.isDown) return
      e.preventDefault()
      const x = e.pageX - this.$refs.slider.offsetLeft
      const y = e.pageY - this.$refs.slider.offsetTop
      const walkX = (x - this.startX) //scroll-fast
      const walkY = (y - this.startY) //scroll-fast
      this.$refs.slider.scrollLeft = this.scrollLeft - walkX
      this.$refs.slider.scrollTop = this.scrollTop - walkY
    }
  }
}
</script>
<style lang="scss" scoped>
  .grab-scrolling-wrapper {
    cursor: grab;
    overflow: auto;

    &.active {
      cursor: grabbing;
    }
  }
</style>
