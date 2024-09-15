<template>
  <div class="options-block">
    <label class="options-label">
      <span class="options-title">Selection key</span>
      <input 
        class="input-field time"
        :class="{invalid: !valid}" 
        :value="valueFromStore" 
        @change="changeInputHandler($event.target.value)" 
        maxlength="5"
        :readonly="isReadonly"
      >
      <span class="ivr-key-text-error" v-if="!valid">Invalid key</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'IVRKeyInput',
  props: ['valueFromStore', 'updateItem', 'propertyName'],
  data() {
    return {
      valid: true
    }
  },
  computed: {
    isReadonly() {
      const keys = ['invalid', 'timeout']
      return keys.includes(this.valueFromStore)
    }
  },
  methods: {
    changeInputHandler(value) {
      if(this.validateKey(value)) {
        this.$emit('updateItem', this.propertyName, value)
      }
    },
    validateKey(value) {
      if(/^[0-9*#]+$/.test(value)) {
        this.valid = true
        return true
      }
      this.valid = false
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.options-block{
  position: relative;
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;

  .options-label {
    font-size: 19px;
    line-height: 22px;
    color: var(--font-panel);

    .options-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: var(--font-panel)
    }

    .input-field {
      margin-top: 2px;
      padding: 4px 16px;
      width: 112px;
      height: 27px;
      color: var(--white);
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      background: #276899;
      border-radius: 4px;

      &.invalid {
        border: 1px solid red;
      }
    }

    .ivr-key-text-error {
      width: 100%;
      text-align: center;
      display: inline-block;
      margin-top: 3px;
      color: red;
      font-size: 14px;
      line-height: 17px;
    }
  }
}
</style>
