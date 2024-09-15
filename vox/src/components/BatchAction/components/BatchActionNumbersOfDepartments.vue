<template>
  <div>
    <div class="base" v-if="actionShowProp === 'Batch action'">
      <ul class="base-list">
        <li class="base-list-item" @click="changeActionShow('Update departments')">Update departments</li>
      </ul>
    </div>

    <div class="departments-block" v-show="actionShowProp === 'Update departments'">
      <div class="options-block">
        <label class="options-label" ref="list" v-click-outside="hide">
          <input class="input-field num" :style="{'border-radius': showDepActionsList ? '10px 10px 0 0' : '10px', border: errorDepActionProp ? '1px solid red' : null}" type="text" placeholder="Choose action" :value="depActionProp" readonly>
          <span @click="showDepActionsList = !showDepActionsList" class="triangle"><img
            src="@/assets/img/icons/select-arrow.svg" alt="select"></span>
          <ul v-show="showDepActionsList" class="list-related-numbers base-list">
            <li class="base-list-item" :class="{choosed: depActionProp === 'Rewrite'}" @click="setOptions('actionList', null, 'Rewrite')">Rewrite</li>
            <li class="base-list-item" :class="{choosed: depActionProp === 'Remove from...'}" @click="setOptions('actionList', null, 'Remove from...')">Remove from...</li>
            <li class="base-list-item" :class="{choosed: depActionProp === 'Add to ...'}" @click="setOptions('actionList', null, 'Add to ...')">Add to ... </li>
          </ul>
        </label>
      </div>
      <label class="dep-search">
        <input @input="searchNumbers()" v-model="searchDep" class="input-field" placeholder="Enter Departaments" type="text">
      </label>
      <ul class="assign-list" ref="listDep">
        <li v-for="(number, index) in numbersListProp.getMainList" :key="index" 
          class="assign-item" @click="chooseNumber(number)" 
          :class="{choosed: numbersListProp.topList.filter(item => item.uid === number.uid).length}">
            {{number.number}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ClickOutside from '@/lib/clickDirective'
export default {
  name: 'BatchActionUsers',
  props: ['chooseItemInList', 'searchFunc', 'errorDepActionProp', 'numbersListProp', 'depActionProp', 'fetchProp', 'funScrollProp', 'actionShowProp', 'changeActionShowProp', 'setOptionsProp'],
  data() {
    return {
      showDepActionsList: false,
      searchDep: ''
    }
  },
  watch: {
    actionShowProp() {
      this.actionShowProp === 'Batch action' ? this.searchDep = '' : null
    }
  },
  methods: {
    onscroll() {
      this.$refs.listDep.addEventListener('scroll', this.funScroll)
    },
    deleteScroll() {
      this.$refs.listDep.removeEventListener('scroll', this.funScroll)
    },
    funScroll() {
      this.$emit('funScrollProp', 'department')
    },
    changeActionShow(value) {
      this.$emit('changeActionShowProp', value)
      this.$emit('setOptionsProp', 'isCorrectData', null, value === 'Update status')
    },
    hide() {
      this.showDepActionsList = false
    },
    setOptions(option, property, value) {
      this.showDepActionsList = false
      this.$emit('setOptionsProp', option, property, value)

      option === 'actionList' && this.numbersListProp.topList.length ? this.$emit('setOptionsProp', 'isCorrectData', null, true) : null
    },
    searchNumbers() {
      this.$emit('searchFunc', 'numbers', this.searchDep)
    },
    chooseNumber(number) {
      this.$emit('chooseItemInList', number)
      this.$emit('setOptionsProp', 'isCorrectData', null, !!this.numbersListProp.topList.length)
    }
  },
  mounted() {
    this.setOptions('listRef', null, this.$refs.listDep)
    this.$emit('fetchProp', 'externalNumber')
    // this.onscroll();
    this.popupItem = this.$refs.list
  },
  beforeDestroy() {
    this.deleteScroll()
  },
  directives: {
    ClickOutside
  }
}
</script>
<style scoped lang="scss" src="@/assets/styles/batchAction/batchAction.scss"></style>
