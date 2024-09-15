<template>
  <div>

    <div class="base" v-if="actionShowProp === 'Batch action'">
      <ul class="base-list">
        <li class="base-list-item" @click="changeActionShow('Update description')">Update description</li>
      </ul>
    </div>

    <div class="positions-block" v-if="actionShowProp === 'Update description'">
      <input class="position-input" @input="setOptions('description', $event.target.value)" placeholder="Enter description" />
    </div>

  </div>
</template>
<script>
export default {
  name: 'BatchActionNumber',
  props: ['actionShowProp', 'changeActionShowProp', 'setOptionsProp'],
  data() {
    return {
    }
  },
  methods: {
    changeActionShow(value) {
      this.$emit('changeActionShowProp', value)
      this.$emit('setOptionsProp', 'isCorrectData', null, false)
    },
    setOptions(property, value) {
      this.$emit('setOptionsProp', null, property, value)
      this.$emit('setOptionsProp', 'isCorrectData', null, !!value.length)
    }
  }
}
</script>
<style scoped lang="scss" src="@/assets/styles/batchAction/batchAction.scss"></style>
