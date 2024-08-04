<template>
    <div class="main-block" id="batch-actions-main" :style="{width: (actionShow === 'Add to ...' || actionShow === 'Rewrite') && batchType === 'routes' ? '280px' : '205px'}">

      <div class="header">
        <span class="back-arrow-span" @click="clear()" v-if="actionShow != 'Batch action'">
          <svg class="arrow-back" 
              height="10" viewBox="0 0 10 18" fill="transparent"
              xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L1 9L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        {{actionShow}}
      </div>

      <BatchActionNumber 
        v-if="batchType === 'number'"
        :actionShowProp="actionShow"
        @changeActionShowProp="changeActionShow" 
        @setOptionsProp="setOptions" 
      />
      <BatchActionUsers 
        v-if="batchType === 'user'" 
        :actionShowProp="actionShow" 
        :actionsBlockProp="actionsBlock" 
        :errorDepActionProp="errorAction" 
        :depListProp="mainList" 
        :depActionProp="actionList" 
        @changeActionShowProp="changeActionShow" 
        @setOptionsProp="setOptions" 
        @searchFunc="searchFunc" 
        @chooseItemInList="chooseItemInList"
        @funScrollProp="funScroll" 
        @fetchProp="fetch" 
      />
      <BatchActionNumbersOfDepartments 
        v-if="batchType === 'numbersOfDepartment'" 
        :actionShowProp="actionShow" 
        :errorDepActionProp="errorAction" 
        :numbersListProp="mainList" 
        :depActionProp="actionList" 
        @changeActionShowProp="changeActionShow" 
        @setOptionsProp="setOptions" 
        @searchFunc="searchFunc" 
        @chooseItemInList="chooseItemInList"
        @funScrollProp="funScroll" 
        @fetchProp="fetch" 
      />
      <BatchActionRoutes 
        v-if="batchType === 'routes'"
        :actionShowProp="actionShow" 
        :arrayOfUsers="arrayOfUsers"
        @changeActionShowProp="changeActionShow"
        @setOptionsProp="setOptions" 
        @funScrollProp="funScroll" 
        @fetchProp="fetch" 
      />

      <div class="selected">
        Selected {{dataArray.length}} {{dataView.selectedText}}
        <div class="btn-container">
          <img content="Discard" :class="{'not-events': !isCorrectData}"
            v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
            width="15" class="broom clear" @click="clear()"
            src="../../assets/img/icons/broom-without-shadow.svg" alt="broom">
          <img content="Apply" :class="{'not-events': !isCorrectData}"
            v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
            width="24" height="24" class="broom apply-btn" @click="apply()"
            :src="theme === 'dark' ? btnApply : btnApplyLight" alt="ok">
        </div>
      </div> 
    </div>
</template>
<script>
import {UsersGettersApi} from '@/API/getters'
import User from "@/API/Global.api"
import parseCountries from '@/lib/selectedCountries'
import BatchActionNumber from './components/BatchActionNumber.vue'
import BatchActionUsers from './components/BatchActionUsers.vue'
import BatchActionRoutes from '@/components/BatchAction/components/BatchActionRoutes.vue'
import BatchActionNumbersOfDepartments from '@/components/BatchAction/components/BatchActionNumbersOfDepartments.vue'
import btnApply from '../../assets/img/icons/ok.svg'
import btnApplyLight from '../../assets/img/icons/ok-light.svg'
import { mapGetters } from "vuex"
import _ from 'lodash'

export default {
  name: 'BatchActions',
  props: ['arrayOfUsers', 'updateUsers', 'dataView', 'batchType'],
  components: {BatchActionNumber, BatchActionUsers, BatchActionRoutes, BatchActionNumbersOfDepartments},
  data() {
    return {
      actionShow: 'Batch action',
      actionsBlock: false,
      actionList: '',
      perPage: 0,
      initialDataArray: [],
      mainList: {
        topList: [],
        bottomList: [],
        getMainList: []
      },
      searchValue: '',
      dataArray: [],
      errorAction: false,
      listRef: null,
      isCorrectData: false,
      btnApply: btnApply,
      btnApplyLight: btnApplyLight
    }
  },
  watch: {
    arrayOfUsers() {
      this.dataArray = JSON.parse(JSON.stringify(this.arrayOfUsers))
      this.actionList = ''
      this.actionShow = 'Batch action' 
    },
    getGlobalDepartments() {
      this.setMainList(this.getGlobalDepartments)
    },
    getGlobalExternalNumbers() {
      this.batchType === 'numbersOfDepartment' ? this.setMainList(JSON.parse(JSON.stringify(this.getGlobalExternalNumbers))) : null
    }
  },
  computed: {
    ...mapGetters(['theme', 'getGlobalDepartments']),
  },
  methods: {
    searchFunc(param, value) {
      clearTimeout(this.timer)
      this.searchValue = value
      this.timer = setTimeout(() => this.fetch(param, value), 800)
    },
    funScroll(param) {
      if(this.listRef.clientHeight + this.listRef.scrollTop === this.listRef.scrollHeight) {
        this.fetch(param, this.searchValue)
      }
    },
    changeActionShow(value) {
      this.actionShow = value
    },
    setOptions(option, property, value) {
      option ? _.set(this, option, value) : null
      if(property) {
        this.dataArray.map(item => {
          item[property] = value
        })
      }
    },
    chooseItemInList(dep) {
      const obj = parseCountries.changeCountry(dep, this.mainList.topList, this.mainList.bottomList, 'uid')
      this.mainList.topList = obj.topList
      this.mainList.bottomList = obj.bottomList
      this.mainList.getMainList = obj.getCountries
    },
    setListActions(action, option, value) {
      switch (action) {
        case 'Rewrite':
          this.dataArray.map(item => {
            _.set(item, option,  _.get(this, value))
          })
          break
        case 'Remove from...':
          this.dataArray.map(item => {
            _.set(item, option, _.get(item, option).filter(dep => {
              let bool = true
              for(let i = 0; i <  _.get(this, value).length; i++)  {
                if(dep.uid ===  _.get(this, value)[i].uid) bool = false
              }
              return bool
            }))
            return item
          })
          break
        case 'Add to ...':
          this.dataArray.map(item => {
            _.get(this, value).forEach(element => {
              _.get(item, option).push(element)
            })
          })
          break
        case 'Rewrite as':
          this.dataArray.map(item => {
            _.set(item, option, _.get(this, value))
          })
          break
        default:
          break
      }
      this.actionList = ''
    },
    fetch(param, search) {
      this.perPage += 6
      switch (param) {
        case 'direction':
          User.getDirections(this.perPage, search)
          break
        case 'externalNumber':
          this.$store.dispatch('setGlobalExternalNumbers', {peerPage: this.perPage, number: search})
          break
        case 'users':
          UsersGettersApi.getRoutes({left: false, right: false}, this.perPage, 1, search)
          break
        case 'department':
          this.$store.dispatch('setGlobalDepartmentsList', {peerPage: this.perPage, search})
          break
        default:
          break
      }
    },
    setMainList(response) {
      response.forEach(item => {
        let bool = false
        this.mainList.getMainList.forEach(element => {
          if(element.uid === item.uid) {
            bool = true
          }
        })
        if(!bool) {
          this.mainList.bottomList.push(item)
        }
      })
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    },
    apply() {
      this.errorAction = false
      if(this.actionList === '' && this.actionShow === 'Update departaments' && this.batchType === 'user') {
        this.errorAction = true
        return true
      }
      if(this.actionList !== '' && this.batchType === 'user') {
        this.setListActions(this.actionList, 'relatedWith.department', 'mainList.topList')
      }
      if(this.actionList !== '' && this.batchType === 'numbersOfDepartment') {
        this.setListActions(this.actionList, 'relatedWith.externalNumber', 'mainList.topList')
      }
      if(this.batchType === 'routes') {
        this.setListActions(this.actionList, 'route', 'mainList.topList')
      }
      if(this.actionShow === 'Update status') {
        this.setOptions('actionsBlock', 'onBlock', this.actionsBlock)
        this.$emit('updateUsers', this.dataArray, 'status')
      } else {
        this.$emit('updateUsers', this.dataArray)
      }
      this.actionList = ''
      this.actionShow = 'Batch action'
    },
    clear() {
      this.actionList = ''
      this.actionShow = 'Batch action'
      this.actionsBlock = false
      this.mainList.topList = []
      this.setOptions('isCorrectData', null, false)
      this.dataArray = JSON.parse(JSON.stringify(this.initialDataArray))
    }
  },
  mounted() {
    this.dataArray = JSON.parse(JSON.stringify(this.arrayOfUsers))
    this.initialDataArray = JSON.parse(JSON.stringify(this.arrayOfUsers))
  }
}
</script>
<style scoped lang="scss" src="@/assets/styles/batchAction/batchAction.scss"></style>
<style lang="scss" scoped>

</style>
