<template>
  <div>
    <div class="base" v-if="actionShowProp === 'Batch action'">
      <ul class="base-list">
        <li class="base-list-item" @click="changeActionShow('Update status')">Update status</li>
        <li class="base-list-item" @click="changeActionShow('Update company positions')">Update company positions</li>
        <li class="base-list-item" @click="changeActionShow('Update departaments')">Update departaments</li>
      </ul>
    </div>

    <div class="actions-block" v-if="actionShowProp === 'Update status'">
      <label class="action">
        User account
        <input @change="setOptions('actionsBlock', 'onBlock', !actionsBlockProp)" :checked="!actionsBlockProp" class="action" type="checkbox">
        <span class="action"></span>
      </label>
      <label class="action">
        Incoming route
        <input class="action" disabled type="checkbox">
        <span class="action"></span>
      </label>
      <label class="action">
        Outbound calls
        <input class="action" disabled type="checkbox">
        <span class="action"></span>
      </label>
    </div>

    <div class="positions-block" v-if="actionShowProp === 'Update company positions'">
      <input class="position-input" @input="setOptions(null, 'position', $event.target.value)" placeholder="Enter company positions" />
    </div>

    <div class="departments-block" v-show="actionShowProp === 'Update departaments'">
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
        <input @input="searchDepartments()" v-model="searchDep" class="input-field" placeholder="Enter Departaments" type="text">
      </label>
      <ul class="assign-list" ref="listDep">
        <li v-for="(dep, index) in depListProp.getMainList" :key="index" 
          class="assign-item" @click="chooseDep(dep)" 
          :class="{choosed: depListProp.topList.filter(item => item.uid === dep.uid).length}">
            {{dep.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ClickOutside from '@/lib/clickDirective'
export default {
  name: 'BatchActionUsers',
  props: ['chooseItemInList', 'searchFunc', 'errorDepActionProp', 'depListProp', 'depActionProp', 'fetchProp', 'actionsBlockProp', 'funScrollProp', 'actionShowProp', 'changeActionShowProp', 'setOptionsProp'],
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

      //тут непонятно.....................
      property !== 'onBlock' && this.$emit('setOptionsProp', 'isCorrectData', null, value?.length && property === 'position')
      option === 'actionList' && this.depListProp.topList.length ? this.$emit('setOptionsProp', 'isCorrectData', null, true) : null
    },
    searchDepartments() {
      this.$emit('searchFunc', 'department', this.searchDep)
    },
    chooseDep(dep) {
      this.$emit('chooseItemInList', dep)
      this.$emit('setOptionsProp', 'isCorrectData', null, !!this.depListProp.topList.length)
    }
  },
  mounted() {
    this.setOptions('listRef', null, this.$refs.listDep)
    this.$emit('fetchProp', 'department')
    this.onscroll()
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
