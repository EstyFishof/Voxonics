<template>
  <div @click="hideListOptions(); indexRef=''" v-click-outside="hide">

    <div class="base" v-if="actionShowProp === 'Batch action'">
      <ul class="base-list">
        <li class="base-list-item" @click="changeActionShow('Add to ...')">Add to</li>
        <li class="base-list-item" @click="changeActionShow('Rewrite')">Rewrite</li>
        <li class="base-list-item" @click="changeActionShow('Rewrite as'); setShowList(null, null, 'users', $event.target.parentNode.parentNode.parentNode.getElementsByClassName('rewrite-as-block')[0].getElementsByClassName('rewrite-users-list-block')[0].getElementsByClassName('users')[0])">Rewrite as</li>
      </ul>
    </div>

    <div class="add-block" v-if="actionShowProp === 'Add to ...' || actionShowProp === 'Rewrite'">
      <div class="add-container">
        <ul class="add-container-titles">
          <li>Directions</li>
          <li>V-numbers</li>
          <li>Priority</li>
        </ul>
        <ul class="add-container-item horizontal-secondary-list ">
          <li class="btn-item">
            <button @click="valid()" class="btn-create" :style="{'border': borderPlus ? '1px solid orange' : null}">
              <span class="btn-create-span">
                <img src="@/assets/img/icons/add-route-btn.svg" />
              </span>
            </button>
          </li>
          <li class="horizontal-secondary-list-item item-direction">
            <span class="options-label" :ref="'direction'" @click="indexRef = 'direction'">
              <label>
                <input class="input-field num" :style="{'border': this.errors.direction ? '1px solid red' : null}" type="text" :value="newRoute.direction.code ? `${newRoute.direction.code}(${newRoute.direction.type})` : 'Select direction'" readonly>
                <span class="triangle" @click="setShowList('showList', `direction`, 'direction', $event.target.parentNode.parentNode.getElementsByClassName('direction')[0])"
                  :class="{'rotate-arrow': showList === 'direction'}">
                  <svg width="12" height="9" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M1 1L6 6L11 1" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </label>
              <ul v-show="showList === `direction`" class="list-related-numbers direction">
                <li style="background: none !important">
                  <input class="list-related-input" :value="searchValue" @input="search($event.target.value)"/>
                </li>
                <li @click="setParams('newRoute', 'direction', element)" v-for="(element, index) in getDirections.filter(dir => dir.code !== '00')" :key="index"
                  :content="`${element.code}(${element.type})`.length < 10 ? '' : `${element.code}(${element.type})`"
                  v-tippy="{ zIndex: `${element.code}(${element.type})`.length < 10 ? -9999 : 9999, placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">{{element.code}}({{element.type}})</li>
              </ul>
            </span>
          </li>

          <li class="horizontal-secondary-list-item item-number">
            <label class="options-label" :ref="'number'" @click="indexRef = 'number'">
              <input class="input-field num" :style="{'border': this.errors.externalNumber ? '1px solid red' : null}" type="text" :value="externalNumberValue(newRoute) || 'Select V-num'">
              <span class="triangle" @click="setShowList('showList', `externalNumbercreate`, '')" :class="{'rotate-arrow': showList === `externalNumbercreate`}">
                <svg width="12" height="9" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.9" d="M1 1L6 6L11 1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <ul v-show="showList === `externalNumbercreate`" class="list-related-numbers">
                <li @click="setShowList('showList', `externalNumbercreateNumber`, 'externalNumber', $event.target.parentNode.parentNode.getElementsByClassName('externalNumber')[0])">V-number</li>
                <li @click="setShowList('showList', `externalNumbercreateDepartment`, 'department', $event.target.parentNode.parentNode.getElementsByClassName('department')[0])">Department</li>
                <li @click="setVNumber('newRoute', 'preferred', true)">Preferred</li>
              </ul>
              <ul v-show="showList === `externalNumbercreateNumber`" class="list-related-numbers externalNumber">
                <li style="background: none !important">
                  <input class="list-related-input" :value="searchValue"  
                    @input="search($event.target.value)" />
                </li>
                <li @click="setVNumber('newRoute', 'externalNumber', element)" v-for="(element, index) in getGlobalExternalNumbers" :key="index"
                  :content="element.number.length < 10 ? '' : element.number"
                  v-tippy="{ zIndex: element.number.length < 10 ? -9999 : 9999, placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">{{element.number}}</li>
              </ul>
              <ul v-show="showList === `externalNumbercreateDepartment`" class="list-related-numbers department">
                <li style="background: none !important">
                  <input class="list-related-input" :value="searchValue"  
                    @input="search($event.target.value)" />
                </li>
                <li @click="setVNumber('newRoute', 'department', element)" v-for="(element, index) in getGlobalDepartments" :key="index"
                    :content="element.name.length < 10 ? '' : element.name"
                    v-tippy="{ zIndex: element.name.length < 10 ? -9999 : 9999, placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">{{element.name}}</li>
              </ul>
            </label>
          </li>

          <li class="horizontal-secondary-list-item item-priority" :ref="'priority'" @click="indexRef = 'priority'">
            <span class="allowed-span" :class="{'active-allowed': showList === `allowedcreate`}">
              <input class="input-priority" :style="{'border': this.errors.priority ? '1px solid red' : null}" @input="setParams('newRoute', 'priority', $event.target.value, 'number')" :value="newRoute.priority || ''" />
            </span>
            <span class="status-null" v-if="newRoute.allowed === null" @click="showAllowed = !showAllowed"></span>
            <img class="status-img" width="17" v-else :src="newRoute.allowed ? successStatusPayment : redStatusPayment" alt="" @click="showAllowed = !showAllowed">
            <div class="status-block" v-if="showAllowed">
              <div class="status-container">
                <img width="17" @click="newRoute.allowed = true; showAllowed = false" :src="successStatusPayment" />
                <img width="17" @click="newRoute.allowed = false; showAllowed = false" :src="redStatusPayment" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="add-list-block">
        <ul class="add-list">
          <li class="secondary-list-block" v-for="(item, index) in listNewRoutes" :key="index">
            <ul class="secondary-list">
              <li class="btn-item delete-btn" @click="deleteRoute(item)">
                <img width="12" height="12" class="create-btn" src="@/assets/img/icons/delete-routes.svg" />
              </li>
              <li class="secondary-list-item item-direction">{{`${item.direction.code}(${item.direction.type})`}}</li>
              <li class="secondary-list-item item-number">{{externalNumberValue(item)}}</li>
              <li class="secondary-list-item item-priority">{{item.priority}}</li>
              <li class="secondary-list-item item-allowed">
                <img class="status-img" width="17" :src="item.allowed ? successStatusPayment : redStatusPayment" alt="">
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="rewrite-as-block" v-show="actionShowProp === 'Rewrite as'">
      <p class="rewrite-title">Choose agent to rewrite routes for selected agents</p>
      <input class="list-related-input" placeholder="Enter copy agent" :value="searchValue" @input="search($event.target.value)"/>
      <div class="rewrite-users-list-block">
        <ul class="rewrite-users-list users">
          <li class="rewrite-users-list-item" :class="{'select-rewrite-user': selectedItem.uid === item.uid}" @click="selectedItem = item; setOptions('mainList.topList', null, item.route)" v-for="(item, index) in getGlobalUsersRoutes" :key="index">
            <span>{{item.name}}</span>
            <span>{{item.internalNumber}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import redStatusPayment from '@/assets/img/icons/red-status-shadow.svg'
import successStatusPayment from '@/assets/img/icons/report-success-shadow.svg'
import _ from 'lodash'
import routingFunctional from '@/lib/routingFunctional'
import ClickOutside from '@/lib/clickDirective'
import { mapGetters } from "vuex"
import { clickCheck } from '../../../lib/clickCheck'

export default {
  name: 'BatchActionRoutes',
  props: ['actionShowProp', 'changeActionShowProp', 'setOptionsProp', 'fetchProp', 'arrayOfUsers'],
  data() {
    return {
      newRoute: {
        direction: {},
        externalNumber: {},
        department: {},
        priority: '',
        allowed: true,
        preferred: false
      },
      errors: {
        direction: false,
        externalNumber: false,
        priority: false
      },
      showList: '',
      activeListData: '',
      listRef: null,
      indexRef: '',
      searchValue: '',
      showAllowed: false,
      redStatusPayment: redStatusPayment,
      successStatusPayment: successStatusPayment,
      listNewRoutes: [],
      count: 0,
      selectedItem: ''
    }
  },
  watch: {
    actionShowProp() {
      if(this.actionShowProp === 'Batch action') {
        this.$emit('setOptionsProp', 'mainList.topList', null, [])
        this.listNewRoutes = []
        this.selectedItem = ''
      }
    }
  },
  computed: {
    ...mapGetters(['getDirections', 'getGlobalExternalNumbers', 'getGlobalDepartments', 'getGlobalUsersRoutes']),
    borderPlus() {
      if(this.newRoute.direction.code && (this.newRoute.externalNumber?.number || this.newRoute.department?.name || this.newRoute.preferred) && this.newRoute.priority !== '') {
        return true
      } else return false
    },
  },
  methods: {
    onscroll() {
      this.listRef.addEventListener('scroll', this.funScroll)
    },
    deleteScroll() {
      this.listRef.removeEventListener('scroll', this.funScroll)
    },
    funScroll() {
      if(this.listRef.clientHeight + this.listRef.scrollTop === this.listRef.scrollHeight) {
        this.$emit('fetchProp', this.activeListData, this.listRef.querySelectorAll('input.list-related-input')[0].value)
      }
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.showList = ''
    },
    valid() {
      !this.newRoute.direction.code ? this.errors.direction = true : this.errors.direction = false
      this.newRoute.externalNumber?.number || this.newRoute.department?.name || this.newRoute.preferred ? this.errors.externalNumber = false : this.errors.externalNumber = true
      this.newRoute.priority === '' ? this.errors.priority = true : this.errors.priority = false
      if(!this.errors.direction && !this.errors.externalNumber && !this.errors.priority) this.createRoute()
    },
    createRoute() {
      this.listNewRoutes.push({...this.newRoute, id: this.count})
      this.count++
      this.newRoute = {
        direction: {},
        externalNumber: {},
        priority: '',
        allowed: true
      }
      this.$emit('setOptionsProp', 'mainList.topList', null, this.listNewRoutes)
      this.$emit('setOptionsProp', 'isCorrectData', null, true)
    },
    deleteRoute(item) {
      this.listNewRoutes = this.listNewRoutes.filter(route => route.id !== item.id)
      this.$emit('setOptionsProp', 'mainList.topList', null, this.listNewRoutes)
      this.$emit('setOptionsProp', 'isCorrectData', null, this.listNewRoutes.length ? true : false) 
    },
    search(value) {
      this.searchValue = value
      this.$emit('fetchProp', this.activeListData, value)
    },
    setShowList(param, value, prop, event) {
      if(this.listRef) this.deleteScroll()
      if(param) {
        if(_.get(this, param) === value) {
          _.set(this, param, '')
        } else {
          _.set(this, param, value)
        }
      }
      this.searchValue = ''
      this.activeListData = prop
      this.$emit('fetchProp', prop)

      if(event) {
        this.listRef = event
        this.onscroll()
      }
    },
    externalNumberValue(element) {
      return routingFunctional.externalNumberValue(element)
    },
    setVNumber(element, type, value) {
      // routingFunctional.setVNumber(this, this[element], type, value)
      this[element].department = null
      this[element].externalNumber = null
      this[element].preferred = false
      this[element][type] = value
      this.showList = ''

    },
    setParams(element, param, valueParam, type) {
      const value = type === 'number' ? +valueParam : valueParam
      this[element][param] = value
      this.showList = ''
    },
    changeActionShow(value) {
      this.$emit('setOptionsProp', 'actionList', null, value)
      this.$emit('changeActionShowProp', value)
      this.$emit('setOptionsProp', 'isCorrectData', null, false)
    },
    setOptions(option, property, value) {
      this.$emit('setOptionsProp', option, property, value)
      this.$emit('setOptionsProp', 'isCorrectData', null, this.selectedItem !== '')
    }
  },
  mounted() {
    this.popupItem = this.$el.children[0]
  },
  directives: {
    ClickOutside
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/dropdownSearchString.scss"></style>
<style lang="scss" scoped src="@/assets/styles/outboundRouting/horizontal-secondary-list.scss"></style>
<style lang="scss" scoped src="@/assets/styles/outboundRouting/allowed-filter.scss"></style>
<style scoped lang="scss" src="@/assets/styles/batchAction/batchAction.scss"></style>
<style lang="scss" scoped>
.add-block {
  margin-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  .add-container {
    .add-container-titles {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 14px;
      padding-right: 21px;

      li {
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
        color: var(--batch-actions-title);
      }
    }

    .add-container-item {
      margin-top: 3px;

      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 1px;
        bottom: -5px;
        left: 0;
        background: var(--batch-actions-list);
      }

      .horizontal-secondary-list-item {
        font-size: 12px;
        line-height: 14px;

        .options-label {
          .input-field {
            height: 15px;
            width: 79px;
            text-align: center;
            font-size: 12px;
            line-height: 14px;
            padding-right: 12px;
            padding-top: 6px;
            background: var(--substrate);
            margin-left: 0;
          }

          .triangle {
            height: 15px;
            width: calc(98% - 7px);
            margin-left: 0;
            left: 0;
          }
          .list-related-numbers {
            overflow-y: auto;
            max-height: 150px;
            left: 0;
            width: 100%;
            li {
              font-weight: 300;
              font-size: 12px;
              line-height: 14px;
            }
          }
        }

        .status-img {
          margin-left: 6px;
          margin-top: 4px;
          box-shadow: none;
        }

        .status-block {

          .status-container {
            img {
              margin-top: 4px;
              box-shadow: none;
              border-radius: 0;
            }
          }
        }
        
        &.item-direction {
          width: 79px;
        }

        &.item-number {
          margin-left: 7px;
          width: 91px;
          .options-label {
            .input-field {
              width: 91px;
            }
          }
        }

        &.item-priority {
          width: 75px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 10px;
          margin-bottom: -2px;

          .allowed-span {

            &:hover {
              &::after {
                left: 0;
                width: 36px;
              }
            }
            .input-priority {
              background: var(--substrate);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
              text-align: center;
              border-radius: 4px;
              height: 15px;
              width: 36px;
              padding-left: 0;
            }
          }
        }
      }
    }
  }

  .add-list-block {
    margin-top: 5px;
    width: 100%;
    .add-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .secondary-list-block {
        width: 100%;
        .secondary-list {
          height: 27px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 300;
          font-size: 12px;
          line-height: 14px;
          position: relative;
          padding-left: 11px;
          padding-right: 5px;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 1px;
            display: block;
            left: 0;
            background: var(--cdr-border-row);
            border-radius: 2px;
          }

          .item-direction {
            width: 79px;
          }

          .item-number {
            margin-left: 7px;
            width: 80px;
          }

          .item-priority {
            width: 36px;
            text-align: center;
          }

          .item-allowed {
            width: 13px;
            margin-top: 9px;
            margin-left: -3px;
          }
        }
      }
    }
  }
}

.rewrite-as-block {
  margin: 5px 0 7px 7px;
  .rewrite-title {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: var(--batch-actions-title);
    margin-bottom: 10px;
    margin-left: 7px;
    margin-right: 7px;
  }

  .rewrite-users-list-block {
    margin-top: 11px;
    .rewrite-users-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 66px;

      &::-webkit-scrollbar {
        width: 3px; /* ширина для вертикального скролла */
        height: 6px; /* высота для горизонтального скролла */
        background-color: rgba(0, 0, 0, 0);
      }
      
      /* ползунок скроллбара */
      &::-webkit-scrollbar-thumb {
        background-color: #276899;
        border-radius: 3px 0 0 3px;
        -webkit-border-radius: 3px 0 0 3px;
        -moz-border-radius: 3px 0 0 3px;
        -ms-border-radius: 3px 0 0 3px;
        -o-border-radius: 3px 0 0 3px;
      }

      &::before {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        display: block;
        left: 0;
        top: -6px;
        background: var(--batch-actions-list);
      }

      .rewrite-users-list-item {
        width: 187px;
        height: 17px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 10px;
        margin-bottom: 5px;
        background-color: var(--substrate);

        span {
          font-weight: 300;
          font-size: 12px;
          line-height: 14px;
          color: var(--font-panel);
        }

        &.select-rewrite-user {
          background: #276899;
          span {
            color: white;
          }
        }
      }
    }
  }
  
}

.btn-item {
  position: absolute;
  left: -15px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.delete-btn {
    background-color: var(--button-edit-dep-bg);
    border: 2px solid var(--main-bg);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    left: -10px;
  }

  img {
    border-radius: 100%;
    box-shadow: 0 8px 16px rgba(26, 18, 18, 0.25);
  }

  .btn-create {
    width: 20px;
    height: 20px;
    padding: 0;
    color: #276899;
    font-size: 20px;
    text-align: center;
    line-height: 0;
    border-radius: 50%;
    outline: none;
    background-color: var(--main-bg);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px rgba(26, 18, 18, 0.12);
    border: none;

    .btn-create-span {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--button-edit-dep-bg);
      transition: .3s ease;
      transform: scale(1, 1);

        &:hover {
          transform: scale(1.15, 1.15);
          transition: transform .2s ease-in-out;
        }
    }
  }

  img {
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform .2s ease-in-out;

    &:hover {
      transform: scale(1.2, 1.2);
      transition: transform .2s ease-in-out;
    }
  }
}
</style>
