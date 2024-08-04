<template>
    <label class="switch">
      <input :checked="!value" @input.prevent="toggleTheme" type="checkbox">

      <span class="slider round"></span>
      <img class="img left-img" v-if="leftImage && leftImageActive" :src="getLeftIcon" />
      <img class="img right-img" v-if="rightImage && rightImageActive" :src="getRightIcon" />
    </label>
  </template>
  <script>
  export default {
    name: 'EnableWSSwitch',
    props: {
      value: Boolean,
      leftImage: String,
      leftImageActive: String,
      rightImage: String,
      rightImageActive: String,
    },
    computed: {
      getLeftIcon() {
        return this.value ? require('@/assets/img/icons/' + this.leftImageActive) : require('@/assets/img/icons/' + this.leftImage)
      },
      getRightIcon() {
        return !this.value ? require('@/assets/img/icons/' + this.rightImageActive) : require('@/assets/img/icons/' + this.rightImage)
      }
    },
    methods: {
      toggleTheme() {
        this.$emit('updateItem', !this.value)
      }
    }
  }
  </script>
  <style lang="scss" scoped src="@/assets/styles/switch.scss"></style>
  <style lang="scss" scoped>
  .switch {  
    cursor: pointer;
    .img {
      position: absolute;
      z-index: 10;
      top: 4px;
  
      &.left-img {
        left: 7px;
      }
      &.right-img {
        right: 7px;
      }
    }
  }

  .slider {
    background-color: var(--enable-ws-checkbox-bg);
  }
  
  .slider:before {
    background-color: var(--enable-ws-checkbox-circle-bg);
  }
  
  input:checked + .slider {
    background-color: var(--enable-ws-checkbox-bg);
  }
  
  input:checked + .slider:before {
    background-color: var(--enable-ws-checkbox-circle-bg);
  }
  
</style>
  