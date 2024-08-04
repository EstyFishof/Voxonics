<template>
  <div class="template">
    <DeleteComponent @deleteFunc="deleteRoute" @cancelDeleteFunc="cancelDelete" :deleteInfo="showDeleteComponents"
                     :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="-10"/>
    <div class="main-outbound-routing-block" @click="hideListOptions($event); indexRoute='false'"
         v-click-outside="hide">
      <div class="head">

        <div class="head-top-block">
          <span class="head-title-and-edit-btn">
            Outbound Routing
            <button class="btn-edit" content="Edit mode" @click="toggleEditMode()"
              v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }">
              <img src="@/assets/img/icons/edit.svg" alt="">
            </button>
          </span>
          <div class="right-tabs">
            <ControlPanel :show="edit" :apply="handlerSubmit" :discard="clearUser"/>
          </div>
        </div>
      </div>

      <div class="head-filters-block">
        <span class="head-filters-block-title">Filter by:</span>
        <input class="input-field" type="text" placeholder="Enter Direct..." v-model="filters.direction" maxlength="16"/>
        <input class="input-field" type="text" placeholder="Enter V-Num" v-model="filters.externalNumber" maxlength="16"/>
        <input class="input-field" type="text" placeholder="Priority" v-model="filters.priority" maxlength="16"/>
        <div class="allowed-filter-item" :class="{'not-open-allowed-filter': showList !== 'filterAllowed'}">
          <span v-if="filters.allowed === ''" class="all-filter-span img-hover"
                @click="setShowList('showList', `filterAllowed` )">All</span>
          <img class="img-hover" v-else :src="filters.allowed === true ? successStatusPayment : redStatusPayment"
                @click="setShowList('showList', `filterAllowed`)"/>
          <svg class="allowed-filter-arrow" :class="{'allowed-filter-arrow-down': showList !== 'filterAllowed'}" width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L1 1V7L4 4Z" fill="var(--allowed-filter-arrow)" stroke="var(--allowed-filter-arrow)" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="allowed-filter-choose-block" v-if="showList === 'filterAllowed'">
            <span @click="filters.allowed = ''; setShowList('showList', `filterAllowed`)"
                  v-if="filters.allowed !== ''" class="all-filter-span img-hover">All</span>
            <img @click="filters.allowed = true; setShowList('showList', `filterAllowed`)" class="img-hover"
                  v-if="filters.allowed !== true" :src="successStatusPayment"/>
            <img @click="filters.allowed = false; setShowList('showList', `filterAllowed`)" class="img-hover"
                  v-if="filters.allowed !== false" :src="redStatusPayment"/>
          </div>
        </div>
        <span class="clear-filters-block" v-if="showClearAllFiltersBtn" content="Clear all" @click="clearAllFilters()"
              v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }">
          <img width="14" height="15" src="@/assets/img/icons/blue-broom.svg" />
        </span>
      </div>

      <div class="outbound-routing-table">
        <div class="header-of-table">
          <ul class="header-list">
            <li class="header-list-item item-direction">
              Direction
              <img ref="sortDirection" src="@/assets/img/icons/sort-arrow.svg"/>
            </li>
            <li class="header-list-item item-number">
              V-Number
              <img ref="sortExternalNumber" src="@/assets/img/icons/sort-arrow.svg"/>
            </li>
            <li class="header-list-item item-priority">
              Priority
              <img ref="sortPriority" src="@/assets/img/icons/sort-arrow.svg"/>
            </li>
            <li class="header-list-item item-status">
              Status
              <img ref="sortStatus" src="@/assets/img/icons/sort-arrow.svg"/>
            </li>
          </ul>
        </div>

        <div class="body-of-table">
          <ul class="body-list">
            <li class="body-list-item" v-if="editMode">
              <ul class="horizontal-secondary-list new-route-list">
                <li class="btn-item">
                  <span class="add-route-btn-span" :class="{'disabled-btn': !validNewRoute(newRoute)}" @click="validNewRoute(newRoute) ? createRoute(newRoute) : newRoute.checkValid = true">
                    <span class="add-route-btn"><img src="@/assets/img/icons/add-route-btn.svg" /></span>
                  </span>
                </li>
                <li class="horizontal-secondary-list-item item-direction" :class="{'red-line': newRoute.checkValid && !newRoute.direction.code}" :ref="`directioncreate`"
                    @click="indexRoute = `directioncreate`">
                  <span class="options-label">
                    <label>
                      <input 
                        class="input-field num" 
                        type="text"
                        :value="newRoute.direction.code ? `${newRoute.direction.code}(${newRoute.direction.type})` : 'Select direction'"
                        readonly
                      />
                      <span class="triangle"
                            @click="setShowList('showList', `directioncreate`, 'direction', $event.target.parentNode.parentNode.getElementsByClassName('direction')[0])"
                            :class="{'rotate-arrow': showList === `directioncreate`}">
                        <svg width="20" height="10" viewBox="0 0 12 7" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.9" d="M1 1L6 6L11 1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </label>
                    <DropdownList v-show="showList === `directioncreate`" :classNameList="'list-related-numbers direction'" :dataList="getDirections.filter(dir => dir.code !== '00')"
                        @clickFunc="(item) => {setParams(newRoute, 'direction', item)}" :itemText="(item) => `${item.code}(${item.type})`"
                        :classNameInput="'list-related-input'" :valueInput="searchValue"
                        :contentTippyCondition="(item) => `${item.code}(${item.type})`.length > 10"
                        @changeInput="(event) => search(event.target.value)"  />
                  </span>
                </li>
                <li class="horizontal-secondary-list-item item-number" :class="{'red-line': newRoute.checkValid && externalNumberValue(newRoute) === ''}" :ref="`externalNumbercreate`"
                    @click="indexRoute = `externalNumbercreate`">
                  <label class="options-label">
                    <input 
                      class="input-field num" 
                      type="text"
                      :value="externalNumberValue(newRoute) || 'Select V-num'"
                      maxlength="16"
                    />
                    <span class="triangle" @click="setShowList('showList', `externalNumbercreate`, '')"
                          :class="{'rotate-arrow': showList === `externalNumbercreate`}">
                      <svg width="20" height="10" viewBox="0 0 12 7" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.9" d="M1 1L6 6L11 1" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <ul v-show="showList === `externalNumbercreate`" class="list-related-numbers">
                      <li
                        @click="setShowList('showList', `externalNumbercreateNumber`, 'externalNumber', $event.target.parentNode.parentNode.getElementsByClassName('externalNumber')[0])">
                        V-number
                      </li>
                      <li
                        @click="setShowList('showList', `externalNumbercreateDepartment`, 'department', $event.target.parentNode.parentNode.getElementsByClassName('department')[0])">
                        Department
                      </li>
                      <li @click="setVNumber(newRoute, 'preferred', true)">Preferred</li>
                    </ul>
                    <DropdownList v-show="showList === `externalNumbercreateNumber`" :classNameList="'list-related-numbers externalNumber external-number-description-list'" :dataList="getGlobalExternalNumbers"
                        @clickFunc="(item) => {setVNumber(newRoute, 'externalNumber', item)}" :itemText="(item) => `${item.number}<span class='description'>${item.description}</span>`"
                        :classNameInput="'list-related-input'" :valueInput="searchValue"
                        :contentTippyCondition="(item) => item.number.length > 10"
                        @changeInput="(event) => search(event.target.value)"  />
                    <DropdownList v-show="showList === `externalNumbercreateDepartment`" :classNameList="'list-related-numbers department'" :dataList="getGlobalDepartments"
                        @clickFunc="(item) => {setVNumber(newRoute, 'department', item)}" :itemText="(item) => item.name"
                        :classNameInput="'list-related-input'" :valueInput="searchValue"
                        :contentTippyCondition="(item) => item.name.length > 10"
                        @changeInput="(event) => search(event.target.value)"  />
                  </label>
                </li>
                <li class="horizontal-secondary-list-item item-priority" :class="{'red-line': newRoute.checkValid && !newRoute.priority}">
                  <span class="allowed-span" :class="{'active-allowed': showList === `prioritycreate`}">
                    <input class="input-priority"
                      @keydown="onKeyDownHandlerForPriorityInput"
                      @input="setParams(newRoute, 'priority', $event.target.value, 'number')"
                      :value="newRoute.priority || ''"
                      @focus="setShowList('showList', `prioritycreate`)"
                      @blur="setShowList('showList', '')"
                      maxlength="3"
                    />
                  </span>
                </li>
                <li class="horizontal-secondary-list-item item-priority item-status" :ref="`allowedcreate`"
                    @click="indexRoute = `allowedcreate`">
                  <span class="status-null" v-if="newRoute.allowed === null"
                        @click="setShowList('showList', `allowedcreate`); indexRoute = `allowedcreate`"></span>
                  <img class="status-img" v-else
                        :src="newRoute.allowed ? successStatusPayment : redStatusPayment" alt=""
                        @click="setShowList('showList', `allowedcreate`); indexRoute = `allowedcreate`">
                  <div class="status-block" v-if="showList === `allowedcreate`">
                    <div class="status-container">
                      <img @click="newRoute.allowed = true; showList = ''"
                            :src="successStatusPayment"/>
                      <img @click="newRoute.allowed = false; showList = ''"
                            :src="redStatusPayment"/>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li class="body-list-item" v-for="(item, index) of listRoutes" :key="index">
              <ul class="horizontal-secondary-list">
                <li v-if="editMode && item.direction.code !== '00'" class="btn-item">
                  <span class="add-route-btn-span" @click="setDeleteRouteActive(item)">
                    <span class="add-route-btn">
                      <img width="12" height="12" class="create-btn" src="@/assets/img/icons/delete-routes.svg"/>
                    </span>
                  </span>
                </li>
                <li class="horizontal-secondary-list-item item-direction" :class="{'non-events': item.direction.code === '00'}" :ref="`direction${item.uid}create`"
                    @click="indexRoute = `direction${item.uid}create`">
                  <span class="options-label">
                    <label>
                      <input 
                        class="input-field num" 
                        type="text"
                        :value="item.direction.code !== '00' ? `${item.direction.code}(${item.direction.type})` : 'Other directions'"
                        readonly
                      />
                      <span class="triangle"
                            @click="setShowList('showList', `direction${item.uid}create`, 'direction', $event.target.parentNode.parentNode.getElementsByClassName('direction')[0])"
                            :class="{'rotate-arrow': showList === `direction${item.uid}create`}">
                        <svg width="20" height="10" viewBox="0 0 12 7" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.9" d="M1 1L6 6L11 1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </label>
                    <DropdownList v-show="showList === `direction${item.uid}create`" :classNameList="'list-related-numbers direction'" :dataList="getDirections.filter(dir => dir.code !== '00')"
                        @clickFunc="(element) => {setParams(item, 'direction', element)}" :itemText="(element) => `${element.code}(${ element.type }`"
                        :classNameInput="'list-related-input'" :valueInput="searchValue"
                        :contentTippyCondition="(element) => `${element.code}(${element.type})`.length > 10"
                        @changeInput="(event) => search(event.target.value)"  />
                  </span>
                </li>
                <li class="horizontal-secondary-list-item item-number" :ref="`externalNumber${item.uid}create`"
                    @click="indexRoute = `externalNumber${item.uid}create`">
                  <label class="options-label">
                    <input 
                      class="input-field num" 
                      type="text"
                      :value="externalNumberValue(item) || 'Select V-num'"
                      maxlength="16"
                    />
                    <span class="triangle" @click="setShowList('showList', `externalNumber${item.uid}create`, '')"
                          :class="{'rotate-arrow': showList === `externalNumber${item.uid}create`}">
                      <svg width="20" height="10" viewBox="0 0 12 7" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.9" d="M1 1L6 6L11 1" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <ul v-show="showList === `externalNumber${item.uid}create`" class="list-related-numbers">
                      <li
                        @click="setShowList('showList', `externalNumber${item.uid}createNumber`, 'externalNumber', $event.target.parentNode.parentNode.getElementsByClassName('externalNumber')[0])">
                        V-number
                      </li>
                      <li
                        @click="setShowList('showList', `externalNumber${item.uid}createDepartment`, 'department', $event.target.parentNode.parentNode.getElementsByClassName('department')[0])">
                        Department
                      </li>
                      <li @click="setVNumber(item, 'preferred', true)">Preferred</li>
                    </ul>
                    <DropdownList v-show="showList === `externalNumber${item.uid}createNumber`" :classNameList="'list-related-numbers externalNumber external-number-description-list'" :dataList="getGlobalExternalNumbers"
                        @clickFunc="(element) => {setVNumber(item, 'externalNumber', element)}" :itemText="(element) => `${element.number}<span class='description'>${element.description}</span>`"
                        :classNameInput="'list-related-input'" :valueInput="searchValue"
                        :contentTippyCondition="(element) => element.number.length > 10"
                        @changeInput="(event) => search(event.target.value)"  />
                    <DropdownList v-show="showList === `externalNumber${item.uid}createDepartment`" :classNameList="'list-related-numbers department'" :dataList="getGlobalDepartments"
                        @clickFunc="(element) => {setVNumber(item, 'department', element)}" :itemText="(element) => element.name"
                        :classNameInput="'list-related-input'" :valueInput="searchValue"
                        :contentTippyCondition="(element) => element.name.length > 10"
                        @changeInput="(event) => search(event.target.value)"  />
                  </label>
                </li>
                <li class="horizontal-secondary-list-item item-priority">
                  <span class="allowed-span" :class="{'active-allowed': showList === `allowed${item.uid}create`}">
                    <input class="input-priority"
                      @keydown="onKeyDownHandlerForPriorityInput"
                      @input="setParams(item, 'priority', $event.target.value, 'number')"
                      :value="item.priority || ''"
                      @focus="setShowList('showList', `allowed${item.uid}create`)"
                      @blur="setShowList('showList', '')"
                      maxlength="3"
                    />
                  </span>
                </li>
                <li class="horizontal-secondary-list-item item-priority item-status" :ref="`allowed${item.uid}create`"
                    @click="indexRoute = `allowed${item.uid}create`">
                  <span class="status-null" v-if="item.allowed === null"
                        @click="item.showAllowed = !item.showAllowed"></span>
                  <img class="status-img" :src="item.allowed ? successStatusPayment : redStatusPayment" alt=""
                        @click="setShowList('showList', `allowed${item.uid}`); indexRoute = `allowed${item.uid}`"
                        :ref="`allowed${item.uid}`">
                  <div class="status-block" v-if="showList === `allowed${item.uid}`" :ref="`allowed${item.uid}`"
                        @click="indexRoute = `allowed${item.uid}`">
                    <div class="status-container">
                      <img @click="setParams(item, 'allowed', true)" :src="successStatusPayment"/>
                      <img @click="setParams(item, 'allowed', false)" :src="redStatusPayment"/>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import ControlPanel from "@/components/ControlPanel"
import DropdownList from '@/components/DropdownList'
import redStatusPayment from '@/assets/img/icons/statement-status.svg'
import successStatusPayment from '@/assets/img/icons/successPayment.svg'
import {UsersGettersApi} from '@/API/getters'
import {UsersEffectsApi} from '@/API/effects'
import { parseRoutes } from '@/lib/parse.Routes.js'
import {newRoute as newRouteState} from '@/store/initial.state.js'
import DeleteComponent from '@/components/DeleteComponent'
import routingFunctional from '@/lib/routingFunctional'
import ClickOutside from 'vue-click-outside'
import _ from 'lodash'
import {mapGetters} from "vuex"
import { clickCheck } from "../../../../../lib/clickCheck"
export default {
  name: "AccountinfoOutboundRouting",
  components: {
    ControlPanel,
    DeleteComponent,
    DropdownList
  },
  data() {
    return {
      filters: {
        direction: '',
        externalNumber: '',
        priority: '',
        allowed: ''
      },
      sort: {
        name: 'asc',
        internalNumber: 'asc',
        department: 'asc',
        direction: 'asc',
        externalNumber: 'asc',
        priority: 'asc'
      },
      activeList: null,
      newRoute: JSON.parse(JSON.stringify(newRouteState)),
      editMode: false,
      edit: false,
      isSearch: false,
      showList: '',
      searchValue: '',
      perPage: 9,
      redStatusPayment: redStatusPayment,
      successStatusPayment: successStatusPayment,
      listRoutes: [],
      initialListRoutes: [],
      showDeleteComponents: false,
      titleToDeleteComponent: 'Delete Route',
      textToDeleteComponent: '',
      deleteRouteActive: {},
      arrayToUpdate: []
    }
  },
  computed: {
    ...mapGetters(['userUid', 'getDirections', 'getGlobalExternalNumbers', 'getGlobalDepartments']),
    showClearAllFiltersBtn() {
      return Object.values(this.filters).filter(el => el !== '').length
    }
  },
  methods: {
    onKeyDownHandlerForPriorityInput(evt) {
      if(!Number.isInteger(+evt.key) && !['Backspace', 'Delete'].includes(evt.key)) {
        evt.preventDefault()
      }
      // ['e', "E", "+", "-"].includes(evt.key) && evt.preventDefault()
    },
    onscroll() {
      this.activeList.addEventListener('scroll', this.funScroll)
    },
    deleteScroll() {
      this.activeList.removeEventListener('scroll', this.funScroll)
    },
    funScroll() {
      routingFunctional.funScroll(this)
    },
    hide() {
      this.showList = ''
      this.showBatchActions = false
    },
    hideListOptions() {
      clickCheck(this, this.indexRoute, this.$refs)
    },
    search(search = '') {
      routingFunctional.search(this, search)
    },
    toggleEditMode() {
      this.editMode = !this.editMode
      this.newRoute.checkValid = false
      this.newRoute = JSON.parse(JSON.stringify(newRouteState))
    },
    getDataFromBack() {
      UsersGettersApi.getRoutesOfUser(this.userUid || sessionStorage.getItem('userUid'))
        .then(res => {
          this.listRoutes = this.sortDataByDirectionsAndPriority(res.data.data)
          this.initialListRoutes = this.sortDataByDirectionsAndPriority(JSON.parse(JSON.stringify(res.data.data)))
          this.isEqual()
        })
    },
    clearAllFilters() {
      this.filters.direction = ''
      this.filters.externalNumber = ''
      this.filters.priority = ''
      this.filters.allowed = ''
    },
    sortDataByDirectionsAndPriority(arrayProp) {
      let array = JSON.parse(JSON.stringify(arrayProp))
      return _.sortBy(array, ['direction.code', 'priority'])
    },
    handlerSubmit(){
      if (this.arrayToUpdate.length !== 0) {
        UsersEffectsApi.updateRoutes(this.userUid || sessionStorage.getItem('userUid'), this.arrayToUpdate[0].uid, parseRoutes(JSON.parse(JSON.stringify(this.arrayToUpdate[0]))))
          .then(res => {
            this.listRoutes = this.listRoutes.map(item => {
              item.uid === res.data.uid ? item = res.data : null
              return item
            })
            this.initialListRoutes = this.initialListRoutes.map(item => {
              item.uid === res.data.uid ? item = JSON.parse(JSON.stringify(res.data)) : null
              return item
            })
            this.arrayToUpdate.shift()
            this.handlerSubmit()
          })
      } else {
        this.edit = false
      }
    },
    clearUser(){
      this.getDataFromBack()
    },
    fetch(prop, search = '') {
      routingFunctional.fetch(this, prop, search)
    },
    cancelDelete() {
      routingFunctional.cancelDelete(this)
    },
    deleteRoute() {
      UsersEffectsApi.deleteRoute(this.userUid || sessionStorage.getItem('userUid'), this.deleteRouteActive.item)
        .then(() => {
          this.listRoutes = this.listRoutes.filter(route => route.uid !== this.deleteRouteActive.item)
          this.initialListRoutes = JSON.parse(JSON.stringify(this.initialListRoutes.filter(route => route.uid !== this.deleteRouteActive.item)))
          this.deleteRouteActive = {}
          this.showDeleteComponents = false
        })
    },
    setDeleteRouteActive(item) {
      this.deleteRouteActive = {item: item.uid}
      this.textToDeleteComponent = `Are you sure you want to delete this Route ?`,
      this.showDeleteComponents = true
    },
    validNewRoute(item) {
      return routingFunctional.validNewRoute(this, item)
    },
    setParams(element, param, valueParam, type) {
      routingFunctional.setParams(this, element, param, valueParam, type)
    },
    setVNumber(element, type, value) {
      routingFunctional.setVNumber(this, element, type, value)
    },
    createRoute() {
      const obj = parseRoutes(this.newRoute)
      UsersEffectsApi.createRoute(this.userUid || sessionStorage.getItem('userUid'), obj)
        .then(res => {
          this.listRoutes.unshift(res.data)
          this.initialListRoutes.unshift(JSON.parse(JSON.stringify(res.data)))
          this.listRoutes = this.sortDataByDirectionsAndPriority(this.listRoutes)
          this.initialListRoutes = this.sortDataByDirectionsAndPriority(this.initialListRoutes)
          this.newRoute = JSON.parse(JSON.stringify(newRouteState))
        })
    },
    setShowList(param, value, prop, event){
      routingFunctional.setShowList(this, param, value, prop, event)
    },
    externalNumberValue(element) {
      return routingFunctional.externalNumberValue(element)
    },
    isEqual() {
      this.arrayToUpdate = []
      let bool = false
      for(let i = 0; i < this.initialListRoutes.length; i++) {
        const item =JSON.parse(JSON.stringify(this.listRoutes[i]))
        const initialItem = JSON.parse(JSON.stringify(this.initialListRoutes[i]))
        if(!_.isEqual(item, initialItem)) {
          this.edit = true
          bool = true
          this.arrayToUpdate.push(JSON.parse(JSON.stringify(this.listRoutes[i])))
        }
      }
      if (!bool) {
        this.edit = false
      }
    }
  },
  mounted() {
    this.popupItem = this.$el.children[0]
    this.getDataFromBack()
  },
  directives: {
    ClickOutside
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/dropdownSearchString.scss"></style>
<style lang="scss" scoped src="@/assets/styles/outboundRouting/horizontal-secondary-list.scss"></style>
<style lang="scss" scoped src="@/assets/styles/outboundRouting/allowed-filter.scss"></style>
<style lang="scss" src="@/assets/styles/outboundRouting/edit-btn-pen.scss"></style>
<style lang="scss" scoped>
.template {
  position: relative;
  .main-outbound-routing-block {
    // width: 526px;
    width: 600px;
    .head {
      width: 100%;
      height: 54px;
      background: var(--outbound-routing-user-header-bg);
      border: 2px solid var(--cdr-border-row);
      box-sizing: border-box;
      border-radius: 8px 8px 0px 0px;

      .head-top-block {
        height: 54px;
        display: flex;
        justify-content: space-between;
        padding: 12px 8px 10px 15px;

        .head-title-and-edit-btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .btn-edit {
            margin-left: 3px;
            width: 30px;
            height: 30px;
          }
        }
      }
    }

    .head-filters-block {
        margin: 3px 0 8px 0;
        background: var(--toolbar-bg);
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 3px 3px 3px 15px;
        position: relative;

        .clear-filters-block {
          position: absolute;
          right: 16px;
          z-index: 1;
          height: 24px;
          width: 21px;
          box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
          background: var(--allowed-block-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .3s ease-in-out;
          transform: scale(1, 1);

          &:hover {
            transition: all .3s ease-in-out;
            transform: scale(1.1, 1.1);
          }
        }

        .head-filters-block-title {
          font-weight: 300;
          font-size: 16px;
          line-height: 19px;
          color: #8B9095;
          margin-right: 15px;
        }

        .input-field {
          width: 120px;
          height: 24px;
          margin-right: 15px;
          margin-top: 0;
        }

        .allowed-filter-item {
          z-index: 10;
          width: 80px;

          &.not-open-allowed-filter {
            width: 36px;
          }
          span {
            margin-left: 0;
          }

          .allowed-filter-choose-block {
            width: 35px;
            height: 13px;
            align-items: flex-start;
          }
        }
      }

    .outbound-routing-table {
      margin-top: 7px;

      .header-of-table {
        height: 28px;
        background: #276899;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4px 4px 0px 0px;

        .header-list {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 27px;
          padding-right: 28px;

          .header-list-item {
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;

            &.item-direction {
              width: 35%;
              text-align: left;
            }

            &.item-number {
              width: 30%;
              text-align: left;
            }

            &.item-priority {
              width: 17.5%;
              text-align: center;
            }

            &.item-status {
              width: 17.5%;
              text-align: center;
            }
          }
        }
      }

      .body-of-table {
        // background: var(--substrate);
        box-shadow: 6px -1px 23px rgba(0, 0, 0, 0.48);
        position: relative;
        width: 100%;
        height: 263px;

        .body-list {
          position: absolute;
          top: 0;
          left: -15px;
          width: calc(100% + 15px);
          padding-left: 15px;
          height: 263px;
          overflow-y: overlay;
          .body-list-item {
            height: 35px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            &::after {
              content: '';
              position: absolute;
              display: block;
              bottom: 0;
              left: 7px;
              width: calc(100% - 14px);
              height: 1px;
              background: var(--cdr-border-row);
            }

            .horizontal-secondary-list {
              padding-left: 27px;
              padding-right: 28px;
              &.new-route-list {
                height: 22px;
                background: var(--paginator-item);
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 2px;
              }

              .horizontal-secondary-list-item {

                &.non-events {
                  pointer-events: none;
                  opacity: 0.5;
                }
                .btn-item {
                  left: -5px;
                }
                .status-block {
                  .status-container {
                    right: -20px;
                  }
                }
                .options-label {
                  .input-field {
                    margin-left: 0 !important;
                    padding-left: 0 !important;
                  }

                  .triangle {
                    width: 120px;
                    left: 0;
                  }

                  .list-related-numbers {
                    width: 120px;
                    left: 0;
                    max-height: 150px;
                  }
                }
                &.item-direction {
                  width: 35%;
                  text-align: left;
                }

                &.item-number {
                  width: 30%;
                  text-align: left;
                }

                &.item-priority {
                  width: 17.5%;
                }

                &.item-status {
                  width: 17.5%;
                  padding-left: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
}

.horizontal-secondary-list {
  .horizontal-secondary-list-item {
    &.item-priority {
      text-align: left;
      .allowed-span {
        padding-left: 17px;
        .input-priority {
          width: 50px;
          text-align: center;
          padding-left: 0;
        }

        &::after {
          left: 32px;
        }
      }
    } 
  }
} 
.red-line {
  &::after {
    left: 0;
    bottom: 0;
    width: 80%;
  }

  &.item-priority {
    &::after {
      bottom: -4px;
      width: 50%;
      left: 30%;
    }
  }
}
</style>
