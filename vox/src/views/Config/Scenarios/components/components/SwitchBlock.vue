<template>
  <div class="switch-block-wrapper">
      <span class="options-title">{{title}}</span>
      <CustomSwitch
        :value="valueFromStore"
        @updateItem="changeItem"
      />
  </div>
</template>
<script>
import CustomSwitch from '@/components/CustomSwitch.vue'
export default {
    name: "SwitchBlock",
    props: ["title", "valueFromStore", "updateItem", "propertyName"],
    methods: {
      changeItem(value) {
        this.$emit('updateItem', this.propertyName, value)
      }
    },
    components: { CustomSwitch }
}
</script>
<style lang="scss" scoped>
.switch-block-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 33px;

  .options-title {
    font-size: 19px;
    line-height: 22px;
    color: var(--font-panel);
    display: inline-block;
    margin-bottom: 12px;
  }
}
</style>
