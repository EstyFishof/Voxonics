<template>
  <div class="file-block-wrapper">
      <span class="options-title">{{title}}</span>
      <div class="file-block">

        <button class="file-btn" @click="$refs.file.click()">
          {{valueFromStore ? valueFromStore : 'Select file'}}
        </button>

        <input class="none" type="file" id="file" ref="file" @change="changeFile" />
      </div>

  </div>
</template>
<script>
export default {
  name: 'InputTimeBlock',
  props: ['title', 'valueFromStore', 'updateItem', 'propertyName'],
  data() {
    return {
      file: null
    }
  },
  methods: {
    changeFile() {
      const file = this.$refs.file.files[0]
      this.file = file
      this.setChanges(file.name)
    },
    setChanges(value) {
      this.$emit('updateItem', this.propertyName, value)
    }
  }
}
</script>
<style lang="scss" scoped>
.file-block-wrapper {
  position: relative;
  margin-right: 33px;

  .options-title {
    font-size: 19px;
    line-height: 22px;
    color: var(--font-panel);
  }

  .file-block {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;

    .file-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 45px;
      margin-right: 20px;
      background: var(--file-loader-btn-bg);
      border: 2px solid var(--scenario-option-bg);
      box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      font-weight: 300;
      font-size: 20px;
      line-height: 23px;
      cursor: pointer;
      color: white;
    }

    .none {
      display: none;
    }
  }
}
</style>
