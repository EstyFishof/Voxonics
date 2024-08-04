<template>
  <img
    @mouseleave="mouseLeaveHandler()" 
    @click="clickHandler()"
    ref="copyRef"
    :content="content"
    v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: duration, trigger: trigger }"
    class="copy" src="@/assets/img/icons/copy.svg" alt="copy"/>
</template>
<script>
export default {
  name: 'CopyIcon',
  props: ['copyHandler'],
  data() {
    return {
      content: 'Copy',
      duration: 500,
      trigger: 'mouseenter focus'
    }
  },
  methods: {
    clickHandler() {
      this.content = 'Copied to clipboard'
      this.trigger = 'manual'

      this.$nextTick( () => this.$refs['copyRef']._tippy.show())

      this.$emit('copyHandler')
    },
    mouseLeaveHandler() {
      this.$refs['copyRef']._tippy.hide()

      setTimeout(() => {
        this.content = 'Copy'
        this.trigger = 'mouseenter focus'
      }, this.duration);
    }
  }
}
</script>
<style lang="scss" scoped>
.copy {
  cursor: pointer;
}
</style>
