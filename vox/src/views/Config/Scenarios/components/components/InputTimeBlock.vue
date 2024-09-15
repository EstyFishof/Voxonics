<template>
  <div class="options-block">
    <label class="options-label">
      <span class="options-title">{{title}}</span>
      <span class="time-block">
        <input class="input-field time" type="number" :value="getDialTime" @change="setDialTime($event.target.value)" maxlength="5">
        <span class="minSec" @click="setMinSec()">{{minSec}}</span>
      </span>
    </label>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InputTimeBlock',
  props: ['title', 'valueFromStore', 'updateItem', 'propertyName'],
  data() {
    return {
      minSec: 'sec'
    }
  },
  computed: {
    ...mapGetters(['getItemScenario']),
    getDialTime() {
      if(this.minSec === 'sec') {
        return this.valueFromStore
      } else {
        return (JSON.parse(JSON.stringify(this.valueFromStore || 0)) / 60).toFixed(0)
      }
    }
  },
  methods: {
    setDialTime(value) {
      if(this.minSec === 'sec') {
        return this.setChanges(value)
      }
      return this.setChanges(JSON.parse(JSON.stringify(value)) * 60)      
    },
    setMinSec() {
      this.minSec = this.minSec === 'min' ? 'sec' : 'min'
    },
    setChanges(value) {
      this.$emit('updateItem', this.propertyName, +value)
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

    .input-field {
      margin-top: 16px;
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
      margin-top: 6px;

      .time {
        margin-top: 0;
        border-radius: 6px 0 0 6px;
      }

      .minSec{
        width: 85px;
        height: 47px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--scenario-option-bg);
        border-radius: 0 6px 6px 0;
        font-weight: normal;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        cursor: pointer;
        text-transform: capitalize;
      }
    }
  }
}
</style>
