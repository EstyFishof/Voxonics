<template>
  <div class="options-block">
    <label class="options-label">
      <span class="options-title">{{title}}</span>
      <input class="input-field time" type="number" :value="valueFromStore" @change="changeInputHandler($event.target.value)" maxlength="5">
      <span class="measure-block" v-if="measure">{{measure}}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'InputBlock',
  props: ['title', 'valueFromStore', 'updateItem', 'propertyName', 'measure'],
  methods: {
    changeInputHandler(value) {
      this.$emit('updateItem', this.propertyName, value)
    }
  }
}
</script>
<style lang="scss" scoped>
.options-block{
  position: relative;

  &:not(:last-child) {
    margin-right: 35px;
  }

  .options-label {
    font-size: 19px;
    line-height: 22px;
    color: var(--font-panel);
    position: relative;

    .input-field {
      margin-top: 8px;
      display: block;
      padding: 5px 12px;
      width: 234px;
      height: 47px;
      color: var(--white);
      font-weight: normal;
      font-size: 19px;
      line-height: 22px;

      background: var(--file-loader-btn-bg);
      border: 2px solid var(--scenario-option-bg);
      box-sizing: border-box;
      box-shadow: 0 7px 16px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
    }

    .time {
      width: 163px;
    }
    .time-block {
      display: flex;
      align-items: center;
      margin-top: 16px;

      .time {
        margin-top: 0;
        border-radius: 6px 0 0 6px;
      }
    }

    .measure-block {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 85px;
      height: 47px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 6px 6px 0;
      font-weight: normal;
      font-size: 19px;
      line-height: 22px;
      color: #FFFFFF;
    }
  }
}
</style>
