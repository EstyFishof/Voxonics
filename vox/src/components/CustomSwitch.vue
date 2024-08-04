<template>
  <label class="switch">
    <input :checked="value" @input.prevent="toggleTheme" type="checkbox">
    <span class="slider round"></span>
  </label>
</template>
<script>
export default {
  name: 'CustomSwitch',
  props: ['value', 'updateItem'],
  methods: {
    toggleTheme() {
      this.$emit('updateItem', !this.value)
    }
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/switch.scss"></style>
