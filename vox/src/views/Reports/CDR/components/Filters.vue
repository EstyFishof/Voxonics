<template>
  <div class="cdr-header" @click="hideListOptions(); indexRef=''" v-click-outside="hideAll">
    <div class="filters-block">
      <div class="left-sector">
        <h2 class="filters-title">Filters:</h2>
        <div class="btn-wrapper">
          <button content="Search CDR" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                  @click="fetch('search')"
                  :class="{anim: highLightBtnSearch}"
                  class="btn-search"><img src="@/assets/img/icons/search-cdr.svg"
                                          alt="search">
          </button>
          <button content="Clear filter" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                  @click="clear"
                  class="btn-clear">
            <img src="@/assets/img/icons/blue-broom.svg" alt="broom"></button>
        </div>
      </div>
      <div class="filters">
        <div class="options-block" :ref="'User'" @click="indexRef = 'User'">
          <label class="options-label">User:
            <input class="input-field num" type="text" readonly
                   :value="getElementSearch('user', 'getUsersCDR', `users (${this.paramsFilter.user.length})`)">
            <span @click="toggleVisible('names')" class="triangle" :class="{'rotate-arrow': showList === 'names'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'names'" :classNameList="'list-related-numbers'"
                          :dataList="viewUsers.filter(u => u.name.indexOf(userSearch) !== -1)"
                          @clickFunc="(element) => setFilterParam('user', element, 'array', getUsersCDR)"
                          :itemText="(element) => element.name"
                          :classNameInput="'list-related-input'" :valueInput="userSearch"
                          @changeInput="event => setInputSearch('userSearch', event.target.value)"
                          :clickFuncAll="() => setFilterParam('user', false, 'array', getUsersCDR)"
                          :classNameItemComputed="element => paramsFilter.user.some(u => element.uid === u.uid) ? 'choosed' : ''"/>
          </label>
        </div>
        <div class="options-block" :ref="'Call Type'" @click="indexRef = 'Call Type'">
          <label class="options-label">Call Type:
            <input class="input-field num" type="text" :value="paramsFilter.callType || 'All'" readonly>
            <span @click="toggleVisible('showCallType')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showCallType'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showCallType'" :classNameList="'list-related-numbers'"
                          :dataList="callTypeValues"
                          @clickFunc="(element) => setFilterParam('callType', element, 'string')"
                          :itemText="(element) => element"
                          :clickFuncAll="() => setFilterParam('callType', false, 'string')"/>
          </label>
        </div>
        <div class="options-block" :ref="'Source(Vnumber)'" @click="indexRef = 'Source(Vnumber)'">
          <label class="options-label">Source(Vnumber):
            <input class="input-field num" type="text" :value="paramsFilter.vnumber.key || 'All'" readonly>
            <span @click="toggleVisible('showVNumbers')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showVNumbers'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showVNumbers'" :classNameList="'list-related-numbers'"
                          :dataList="VNumbersTypeValues"
                          @clickFunc="(element) => setFilterParam('vnumber.key', element,'object')"
                          :itemText="(element) => element"
                          :clickFuncAll="() => setFilterParam('vnumber.key', false, 'object')"/>
          </label>
        </div>
        <div class="options-block">
          <label class="options-label">
            <input class="input-field enter" type="number"
                   :disabled="!paramsFilter.vnumber.key"
                   :value="paramsFilter.vnumber.value"
                   @input="setFilterParam('vnumber.value', $event.target.value, 'object')"
                   placeholder="Enter numbers">
          </label>
        </div>
        <div class="options-block" :ref="'Countries'" @click="indexRef = 'Countries'">
          <label class="options-label">Countries:
            <input class="input-field num" type="text" readonly placeholder="Enter Country"
                   :value="getElementSearch('country', 'getCountries', `countries (${this.paramsFilter.country.length})`)">
            <span @click="toggleVisible('showCountry')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showCountry'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showCountry'" :classNameList="'list-related-numbers'"
                          :dataList="getCountries.filter(c => c.country.toLowerCase().indexOf(this.countrySearch.toLowerCase()) !== -1)"
                          @clickFunc="(element) => {setFilterParam('country', element, 'array', getCountries); changeCountry(element)}"
                          :itemText="(element) => element.country"
                          :classNameInput="'list-related-input'" :valueInput="countrySearch"
                          @changeInput="event => setInputSearch('countrySearch', event.target.value)"
                          :clickFuncAll="() => {setFilterParam('country', false, 'array', getCountries); changeCountry()}"
                          :contentTippyCondition="element => element.country.length > 13"
                          :classNameItemComputed="element => paramsFilter.country.some(u => element.id === u.id) ? 'choosed' : ''"/>
          </label>
        </div>
        <div class="options-block" :ref="'Cost'" @click="indexRef = 'Cost'">
          <label class="options-label">Cost:
            <input class="input-field num" type="text" :value="paramsFilter.cost.key || 'All'" readonly>
            <span @click="toggleVisible('showCostType')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showCostType'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showCostType'" :classNameList="'list-related-numbers'"
                          :dataList="costTypeValues"
                          @clickFunc="(element) => setFilterParam('cost.key', element, 'object')"
                          :itemText="(element) => element"
                          :clickFuncAll="() => setFilterParam('cost.key', false, 'object')"/>
          </label>
        </div>
        <div class="options-block">
          <label class="options-label label-between">
            <input v-if="paramsFilter.cost.key === 'between'"
                   class="input-field enter"
                   :style="{width: '53px'}"
                   type="number"
                   :value="paramsFilter.cost.value[0]"
                   @input="setFilterParam('cost.value', {from: $event.target.value}, 'object')"
                   placeholder="Digits">
            <input v-if="paramsFilter.cost.key === 'between'" class="input-field enter" type="number"
                   :style="{width: paramsFilter.cost.key === 'between' ? '53px' : '115px'}"
                   :value="paramsFilter.cost.value[1]"
                   @input="setFilterParam('cost.value', {to: $event.target.value}, 'object')"
                   placeholder="Digits">
            <input :disabled="!paramsFilter.cost.key" v-if="paramsFilter.cost.key !== 'between'"
                   class="input-field enter" type="number"
                   :value="paramsFilter.cost.value"
                   :style="{width: paramsFilter.cost.key === 'between' ? '53px' : '115px'}"
                   @input="setFilterParam('cost.value', $event.target.value, 'object')" placeholder="Digits">
          </label>
        </div>
        <div class="options-block" :ref="'Agent Number'" @click="indexRef = 'Agent Number'">
          <label class="options-label">Agent Number:
            <input class="input-field num" type="text" readonly
                   :value="getElementSearch('internalNumber', 'getUsersCDR', `users (${this.paramsFilter.internalNumber.length})`)">
            <span @click="toggleVisible('showAgentNumber')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showAgentNumber'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showAgentNumber'" :classNameList="'list-related-numbers'"
                          :dataList="viewUsers.filter(u => u.internalNumber.indexOf(agentNumberSearch) !== -1)"
                          @clickFunc="(element) => setFilterParam('internalNumber', element, 'array', getUsersCDR)"
                          :itemText="(element) => element.internalNumber"
                          :classNameInput="'list-related-input'" :valueInput="agentNumberSearch"
                          @changeInput="event => setInputSearch('agentNumberSearch', event.target.value)"
                          :clickFuncAll="() => setFilterParam('internalNumber', false, 'array', getUsersCDR)"
                          :classNameItemComputed="element => paramsFilter.internalNumber.some(u => element.uid === u.uid) ? 'choosed' : ''"/>
          </label>
        </div>
        <div class="options-block" :ref="'Call Status'" @click="indexRef = 'Call Status'">
          <label class="options-label">Call Status:
            <input class="input-field num" type="text" :value="paramsFilter.disposition || 'All'" readonly>
            <span @click="toggleVisible('showCallStatus')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showCallStatus'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showCallStatus'" :classNameList="'list-related-numbers'"
                          :dataList="callStatusValues"
                          @clickFunc="(element) => setFilterParam('disposition', element, 'string')"
                          :itemText="(element) => element"
                          :clickFuncAll="() => setFilterParam('disposition', false, 'string')"/>
          </label>
        </div>
        <div class="options-block" :ref="'Destination(Phone)'" @click="indexRef = 'Destination(Phone)'">
          <label class="options-label">Destination(Phone):
            <input class="input-field num" type="text" :value="paramsFilter.phone.key || 'All'" readonly>
            <span @click="toggleVisible('showPhoneType')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showPhoneType'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showPhoneType'" :classNameList="'list-related-numbers'"
                          :dataList="phoneTypeValues"
                          @clickFunc="(element) => setFilterParam('phone.key', element,'object')"
                          :itemText="(element) => element"
                          :clickFuncAll="() => setFilterParam('phone.key', false, 'object')"/>
          </label>
        </div>
        <div class="options-block">
          <label class="options-label">
            <input class="input-field enter" type="number"
                   :disabled="!paramsFilter.phone.key"
                   :value="paramsFilter.phone.value"
                   @input="setFilterParam('phone.value', $event.target.value, 'object')" placeholder="Enter numbers">

          </label>
        </div>
        <div class="options-block">
          <label class="options-label">Bill sec
            <input class="input-field" type="number"
                   :value="paramsFilter.billsec.value"
                   @input="setFilterParam('billsec.value', $event.target.value, 'object')" placeholder="Enter sec">
          </label>
        </div>
        <div class="options-block" :ref="'Duration'" @click="indexRef = 'Duration'">
          <label class="options-label">Duration:
            <input class="input-field num" type="text" :value="paramsFilter.duration.key || 'All'" readonly>
            <span @click="toggleVisible('showDurationType')" class="triangle"
                  :class="{'rotate-arrow': showList === 'showDurationType'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
            <DropdownList v-show="showList === 'showDurationType'" :classNameList="'list-related-numbers'"
                          :dataList="durationTypeValues"
                          @clickFunc="(element) => setFilterParam('duration.key', element, 'object')"
                          :itemText="(element) => element"
                          :clickFuncAll="() => setFilterParam('duration.key', false, 'object')"/>
          </label>
        </div>
        <div class="options-block" :style="{width: '70px'}">
          <label class="options-label">Duration
            <div class="between-label">
              <input v-if="paramsFilter.duration.key !== 'between'"
                     class="input-field" type="number"
                     :disabled="!paramsFilter.duration.key"
                     :style="{width: '65px'}"
                     :value="paramsFilter.duration.value"
                     @input="setFilterParam('duration.value', $event.target.value, 'object')"
                     placeholder="Digits">
              <input v-if="paramsFilter.duration.key === 'between'" class="input-field min-input"
                     :style="{width: '30px'}"
                     type="number"
                     :value="paramsFilter.duration.value[0]"
                     @input="setFilterParam('duration.value', {from: $event.target.value}, 'object')"
                     placeholder="Digits">
              <input v-if="paramsFilter.duration.key === 'between'" class="input-field min-input" type="number"
                     :style="{width: paramsFilter.duration.key === 'between' ? '30px' : '65px'}"
                     :value="paramsFilter.duration.value[1]"
                     @input="setFilterParam('duration.value', {to: $event.target.value}, 'object')"

                     placeholder="Digits">
            </div>
          </label>
        </div>
        <div class="options-block min-sec-block">
                  <span class="min-sec">
                        <span class="min" @click="minSecACtive = 'min'"
                              :class="{active: minSecACtive === 'min'}">M</span>
                        <span class="sec" @click="minSecACtive = 'sec'"
                              :class="{active: minSecACtive === 'sec'}">S</span>
                      </span>
        </div>
      </div>
    </div>
    <div class="right-sector">
      <div class="wrap-calendar">
        <img src="@/assets/img/icons/date-CDR.svg" alt="date"/>
        <div content="Open calendar" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
             class="date-filter">
            <span class="date-picker">
              <span class="time-picker" v-if="persistent"
                    :style="{top: $refs.timePickerHeight.$children[1].$children[1].height + 127 + 'px'}">
                <img src="@/assets/img/icons/clock-CDR.svg" alt="clock" class="clock-img"/>
                <span class="options-block" :ref="'showStartHours'" @click="indexRef = 'showStartHours'">
                  <input class="input-field" @click="toggleVisible('showStartHours')" type="text" :value="startHours"
                         readonly>
                  <DropdownList v-show="showList === 'showStartHours'" :classNameList="'list-related-numbers'"
                                :dataList="new Array(24).fill(0).map((item, index) => index)"
                                @clickFunc="(element) => setOptions('startHours', element, 'showStartHours')"
                                :itemText="(element) => element"/>
                </span>
                <span class="colon">
                  <span>*</span>
                  <span>*</span>
                </span>
                <span class="options-block" :ref="'showStartMin'" @click="indexRef = 'showStartMin'">
                  <input class="input-field" @click="toggleVisible('showStartMin')" type="text" :value="startMin"
                         readonly>
                  <DropdownList v-show="showList === 'showStartMin'" :classNameList="'list-related-numbers'"
                                :dataList="new Array(60).fill(0).map((item, index) => index)"
                                @clickFunc="(element) => setOptions('startMin', element, 'showStartMin')"
                                :itemText="(element) => element"/>
                </span>
                <span class="dash"></span>
                <span class="options-block" :ref="'showEndHours'" @click="indexRef = 'showEndHours'">
                  <input class="input-field" @click="toggleVisible('showEndHours')" type="text" :value="endHours"
                         readonly>
                  <DropdownList v-show="showList === 'showEndHours'" :classNameList="'list-related-numbers'"
                                :dataList="new Array(24).fill(0).map((item, index) => index)"
                                @clickFunc="(element) => setOptions('endHours', element, 'showEndHours')"
                                :itemText="(element) => element"/>
                </span>
                <span class="colon">
                  <span>*</span>
                  <span>*</span>
                </span>
                <span class="options-block" :ref="'showEndMin'" @click="indexRef = 'showEndMin'">
                  <input class="input-field" @click="toggleVisible('showEndMin')" type="text" :value="endMin" readonly>
                  <DropdownList v-show="showList === 'showEndMin'" :classNameList="'list-related-numbers'"
                                :dataList="new Array(24).fill(0).map((item, index) => index)"
                                @clickFunc="(element) => setOptions('endMin', element, 'showEndMin')"
                                :itemText="(element) => element"/>
                </span>
                <img src="@/assets/img/icons/clearTime-CDR.svg" alt="clear" class="clear-img" @click="clearDate()"/>
              </span>
              <VueCtkDateTimePicker class="VueCtkDateTimePicker" ref="timePickerHeight" v-model="date"
                                    :color="'#276899'" :range="true" :dark="true" :format="'YYYY-MM-DD'"
                                    :persistent="persistent" :min-date="'YYYY-MM-DD'" :max-date="'YYYY-MM-DD'"
                                    :output-format="'YYYY-MM-DD'" :label="''" @validate="datePicker(this)"
                                    @is-shown="showPicker" @click="datePicker()"
                                    :formatted="'YYYY-MM-DD'"></VueCtkDateTimePicker>
            </span>
          <span class="date-picker-result"
                @click="showDatePicker">{{ date.start }}, {{ startHours }}:{{ startMin }} - {{ date.end }}, {{
              endHours
            }}:{{ endMin }}</span>
          <span class="date-results">{{ getPaginatorCDR.count }} results found</span>
        </div>
      </div>
      <img @click.stop="getCSV" content="Export files"
           v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" class="csv-img"
           src="@/assets/img/icons/CSV-CDR.svg" alt="CSV"/>
    </div>
  </div>
</template>
<script>
import { UsersGettersApi, CDRGettersApi } from '@/API/getters'
import { mapGetters } from 'vuex'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import moment from 'moment'
import store from '@/store'
import observables from '@/store/observable.mutations'
import DropdownList from '@/components/DropdownList'
import parser from '@/lib/parse.CDR'
import ClickOutside from 'vue-click-outside'
import { clickCheck } from '@/lib/clickCheck.js'
import _ from 'lodash'

export default {
  name: 'FiltersCDR',
  components: {
    VueCtkDateTimePicker,
    DropdownList
  },
  data() {
    return {
      paramsFilter: {
        user: [],
        internalNumber: [],
        country: [],
        callType: '',
        disposition: '',
        vnumber: {key: '', value: ''},
        phone: {key: '', value: ''},
        cost: {key: '', value: ''},
        duration: {key: '', value: ''},
        billsec: {key: 'equal', value: ''},
      },
      showList: '',
      highLightBtnSearch: false,
      callTypeValues: ['inbound', 'outbound', 'local', 'service', 'emergency', 'prefferred'],
      callStatusValues: ['NO ANSWER', 'BUSY', 'ANSWERED', 'FAILED', 'CONGESTION', 'UNKNOWN'],
      VNumbersTypeValues: ['begin', 'contain', 'end', 'equal'],
      phoneTypeValues: ['begin', 'contain', 'end', 'equal'],
      costTypeValues: ['less', 'greater', 'equal', 'between'],
      durationTypeValues: ['less', 'greater', 'equal', 'between'],

      userSearch: '',
      countrySearch: '',
      agentNumberSearch: '',

      startHours: '00',
      startMin: '00',
      endHours: '00',
      endMin: '00',
      date: {
        start: '',
        end: ''
      },
      persistent: false,
      minSecACtive: 'sec',
      isOpenDatePicker: false,
      topList: [],
      bottomList: [],
      getCountries: [],
      indexRef: '',
      unsubscribe: () => {},
      confirmationConfig: {
        cancel: () => this.$store.commit('confirmationMutation', null),
        cancelBtnText: 'Close',
        titleText: '',
        textConfirmation: 'There is no data for export'
      }
    }
  },
  watch: {
    getCountry() {
      this.getCountries = this.bottomList = this.getCountry
    }
  },
  computed: {
    ...mapGetters(['getUsersCDR', 'getPageCDR', 'getPeerPageCDR', 'getPaginatorCDR', 'getCDR', 'getCountry']),
    viewUsers() {
      return this.getUsersCDR.filter(u => !u.name.indexOf(this.userSearch))
    },
  },
  methods: {
    async getCSV() {
      if (this.getCDR.length) {
        const res = await CDRGettersApi.getCSV(this.queryString())
        !res ? this.$store.commit('confirmationMutation', this.confirmationConfig) : null
        let csvContent = 'data:text/csv;charset=utf-8,' + res
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `${this.date.start} ${this.startHours}:${this.startMin}:00 - ${this.date.end} ${this.endHours}:${this.endMin}:00.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        this.$store.commit('confirmationMutation', this.confirmationConfig)
      }
    },
    setInputSearch(param, value) {
      this[param] = value
    },
    getElementSearch(itemParam, initialArrayParam, selectedValuesReturn) {
      if (!this.paramsFilter[itemParam].length || this.paramsFilter[itemParam].length === this[initialArrayParam].length) {
        return `All`
      } else {
        return selectedValuesReturn
      }
    },
    changeCountry(item) {
      if (item) {
        const includes = this.topList.filter(c => c.country === item.country)
        if (includes.length) {
          this.topList = this.topList.filter(c => c.country !== item.country)
          this.bottomList.push(item)
        } else {
          this.bottomList = this.bottomList.filter(c => c.country !== item.country)
          this.topList.push(item)
        }
        this.topList = _.sortBy(this.topList, ['country'])
        this.bottomList = _.sortBy(this.bottomList, ['country'])
        this.getCountries = _.concat(this.topList, this.bottomList)
      } else {
        this.getCountries = _.concat(JSON.parse(JSON.stringify(this.topList)), JSON.parse(JSON.stringify(this.bottomList)))
        this.topList = []
        this.bottomList = this.getCountries
      }
    },
    clear() {
      this.paramsFilter = {
        user: [],
        internalNumber: [],
        country: [],
        callType: '',
        disposition: '',
        vnumber: {key: '', value: ''},
        phone: {key: '', value: ''},
        cost: {key: '', value: ''},
        duration: {key: '', value: ''},
        billsec: {key: 'equal', value: ''},
      }
      this.fetch('clear')
    },
    setFilterParam(name, value, scenario, vuex) {
      const param = name.split('.')[0]
      const type = name.split('.')[1]
      switch (scenario) {
        case 'array':
          if (!value) {
            this.paramsFilter[name].length === vuex.length
              ? this.paramsFilter[name] = []
              : this.paramsFilter[name] = vuex
          } else {
            this.paramsFilter[name].length === new Set([...this.paramsFilter[name], value]).size
              ? this.paramsFilter[name] = this.paramsFilter[name].filter(v => {
                if (v.uid) {
                  return v.uid !== value.uid
                } else {
                  return v.id !== value.id
                }
              })
              : this.paramsFilter[name].push(value)
          }
          break
        case 'object':
          if (!value) {
            this.paramsFilter[param] = {key: '', value: ''}
          } else if (this.paramsFilter[param].key === 'between') {
            if (!Array.isArray(this.paramsFilter[param][type])) {
              this.paramsFilter[param][type] = []
            }
            if (typeof value === 'object') {
              for (const key in value) {
                key === 'from'
                  ? this.paramsFilter[param][type][0] = value[key]
                  : this.paramsFilter[param][type][1] = value[key]
              }
            } else {
              this.paramsFilter[param].value = ''
              this.paramsFilter[param][type] = value
            }
          } else {
            this.paramsFilter[param].value = ''
            this.paramsFilter[param][type] = value
          }
          this.showList = ''
          break
        case 'string':
          value
            ? this.paramsFilter[name] === value ? this.paramsFilter[name] = '' : this.paramsFilter[name] = value
            : this.paramsFilter[name] = ''
          this.showList = ''
          break
        default:
          return
      }

      this.userSearch = ''
      this.countrySearch = ''
      this.agentNumberSearch = ''
      this.highLightBtnSearch = true
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hideAll() {
      this.$refs.timePickerHeight.toggleDatePicker(false)
      this.isOpenDatePicker = false
      this.persistent = false
      this.hide()
    },
    hide() {
      this.showList = ''
    },
    showDatePicker() {
      if (this.isOpenDatePicker === false) {
        this.persistent = true
        this.$refs.timePickerHeight.toggleDatePicker(true)
        this.isOpenDatePicker = true
      } else {
        this.persistent = false
        this.$refs.timePickerHeight.toggleDatePicker(false)
        this.isOpenDatePicker = false
      }
    },
    clearDate() {
      this.date.start = moment().set('date', moment().get('date') - 1).format('YYYY-MM-DD')
      this.startHours = '23'
      this.startMin = '59'
      this.date.end = moment().set('date', moment().get('date') + 1).format('YYYY-MM-DD')
      this.endHours = '00'
      this.endMin = '00'
    },
    toggleVisible(param) {
      if ((param === 'names' || param === 'showAgentNumber') && !this.getUsersCDR.length) {
        UsersGettersApi.getUsersSimple()
      }
      if (this.showList === param) {
        this.showList = ''
      } else {
        this.showList = param
      }
    },
    setOptions(param, value, show, index) {
      if (index === undefined) {
        this[param] = value
        if (show) {
          this[show] = !this[show]
        }
      } else {
        if (index === 0) {
          this[param][0] = value
        }
        if (index === 1) {
          this[param][1] = value
        }
      }
    },
    datePicker() {
      this.isOpenDatePicker = false
      if (this.date.end === '' || this.date.end === null) {
        this.date.end = this.date.start
        this.endHours = '23'
        this.endMin = '59'
      }
      this.persistent = false
      this.fetch('datePicker')
    },
    showPicker() {
      this.persistent = true
    },
    queryString() {
      let date = {}
      if (this.date.start) {
        date.from = `${this.date.start} ${this.startHours}:${this.startMin}:00`
        date.to = `${this.date.end} ${this.endHours}:${this.endMin}:00`
      } else {
        date = ''
      }
      const fetchOjb = {
        ...this.paramsFilter,
        date: {key: 'date', value: date},
        page: this.getPageCDR + '',
        'per-page': this.getPeerPageCDR,
        sort: 'calldate',
        order: 'desc'
      }
      return parser.toScalarFilterParams(fetchOjb, this.minSecACtive).checkFilterParams().toStringFilterParam()
    },
    fetch(argument) {
      CDRGettersApi.getCDR(this.queryString())
        .then(() => this.highLightBtnSearch = false)
        .catch((e) => {
          throw new Error(e)
        })
    }
  },
  mounted() {
    this.popupItem = this.$el
    this.date.start = moment().set('date', moment().get('date')).format('YYYY-MM-DD')
    this.startHours = '00'
    this.startMin = '00'
    this.date.end = moment().set('date', moment().get('date')).format('YYYY-MM-DD')
    this.endHours = '23'
    this.endMin = '59'
    this.unsubscribe = store.subscribe((mutation) => {
      if (observables.paginator.CDR.includes(mutation.type)) {
        this.fetch('mutation')
      }
    })
    this.getCountries = this.bottomList = this.getCountry
    this.fetch('mounted')
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  directives: {
    ClickOutside
  }
}
</script>
<style scoped lang="scss">
.date-picker {
  .time-picker {
    border-top: none !important;
  }

  .date-time-picker {
    .field.is-dark .field-input {
      background-color: var(--cdr-item-bg) !important;
      color: red !important;
    }
  }

  .date-time-picker .lm-btn-dark {
    background-color: var(--cdr-datepicker-bg) !important;
  }

  .date-time-picker .dark .lm-btn.option {
    background-color: var(--cdr-datepicker-bg) !important;
  }
}

.cdr-header {
  width: 100%;
  background: var(--toolbar-bg);
  border: 2px solid var(--toolbar-bg);
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;


  .filters-block {
    padding: 13px 0 0 24px;
    display: flex;
    align-items: flex-start;

    .left-sector {
      display: flex;
      flex-direction: column;
      margin-top: 5px;

      .filters-title {
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        color: #FFFFFF;
        margin-right: 29px;
      }

      .btn-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-top: 10px;
        .anim {
          box-shadow: 0 0 10px var(--light-blue);
        }
      }

      button {
        outline: none;
        border: none;
        height: 79px;
        width: 28px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--cdr-item-bg);
        border-radius: 4px;

        &:nth-child(1) {
          margin-right: 10px;
        }

        &:hover {
          transform: scale(1.05);
        }

        &:active {
          transform: scale(1);
        }

        img {
          margin-left: 3px;
        }
      }

    }

    .choosed {
      background-color: var(--light-blue);
    }

    .filters {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 840px;

      .options-block {
        position: relative;
        width: 114px;
        margin-bottom: 13px;

        .options-label {
          color: var(--cdr-filter-label-color);

          .input-field {
            margin-right: 13px !important;
            display: inline-block;
            padding: 6px 0 4px 12px;
            width: 105px;
            background: var(--cdr-item-bg);
            color: var(--white);
            font-weight: 300;
            font-size: 12px;
            line-height: 14px;
            text-transform: capitalize;

            &::placeholder {
              font-style: normal;
              font-weight: 300;
              font-size: 12px;
              line-height: 14px;
            }
          }

          &.label-between {
            display: flex;
            justify-content: space-between;

            .input-field {
              margin-right: 0 !important;
            }
          }

          .enter {
            display: inline-block;
            width: 105px;
            font-style: normal;
            font-weight: 300;
            font-size: 12px;
            line-height: 14px;
            margin-top: 24px;
          }

          .triangle {
            width: calc(100% - 7px);

            img {
              margin-right: 5px;
            }
          }

          .list-related-numbers {
            // background: var(--cdr-item-bg);
            width: 92%;
            max-height: 300px;
            overflow-y: auto;
            padding: 0;

            li {
              font-weight: 300;
              font-size: 12px;
              line-height: 14px;
              padding-left: 3px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;

              .list-related-input {
                display: block;
                padding: 5px 16px;
                background: var(--input-bg);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
                border-radius: 4px;
                color: var(--font-panel);
                border: none;
                width: 100%;
                height: 18px;
                margin: 0;
                background-image: url('../../../../assets/img/icons/search-blue.svg');
                background-size: 12px;
                background-position: 95% 50%;
                background-repeat: no-repeat;
              }

              &::after {
                width: 110%;
                left: 0%;
              }
            }
          }

          .between-label {
            input {
              &:not(:last-child) {
                margin-right: 5px !important;
              }

              &:last-child {
                margin-right: 0 !important;
              }
            }

            .min-input {
              padding-left: 6px;
            }
          }
        }

        .min-sec {
          width: 44px;
          height: 27px;
          background: var(--cdr-item-bg);
          border-radius: 4px;
          padding: 0 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          span {
            font-weight: 300;
            font-size: 12px;
            line-height: 14px;
            color: var(--paginator-color);
            cursor: pointer;
            padding: 3px 2px;
            width: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .active {
            background: var(--light-blue);
            box-shadow: 0 0 15px rgba(39, 104, 153, 0.35);
            border-radius: 41px;
          }
        }
      }

      .min-sec-block {
        width: 45px;
        margin-bottom: -10px;
      }
    }
  }

  .right-sector {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: -10px;
    width: 100%;
    padding: 0 50px;

    .wrap-calendar {
      display: flex;
      justify-content: space-between;
    }

    .date-filter {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
      width: 300px;
      position: relative;
      border: none;
      outline: none;

      .date-picker {
        position: relative;

        .time-picker {
          position: absolute;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: var(--cdr-filter-bg);
          margin-top: -22px;
          padding: 16px 18px 0 18px;
          width: 400px;
          border-left: 1px solid var(--cdr-datepicker-main-bg);
          border-right: 1px solid var(--cdr-datepicker-main-bg);
          height: 67px;

          .clock-img {
            margin-right: 21px;
          }

          .clear-img {
            cursor: pointer;
            margin-left: 21px;
          }

          .options-block {
            position: relative;

            .list-related-numbers {
              position: absolute;
              z-index: 10;
              background: var(--cdr-item-bg);
              border-radius: 4px;
              width: 92%;
              max-height: 150px;
              overflow-y: scroll;
              padding: 0 6px;

              li {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 27px;
                font-weight: 300;
                font-size: 12px;
                line-height: 14px;
                color: white;
                position: relative;
                padding-left: 3px;
                cursor: pointer;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;


                &:hover {
                  background: #276899 !important;
                }

                &::after {
                  content: '';
                  position: absolute;
                  width: 100%;
                  bottom: 0;
                  left: 5%;
                  height: 2px;
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 2px;
                }
              }
            }
          }

          input {
            width: 40px;
            height: 25px;
            background: var(--cdr-item-bg);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 4px;
            outline: none;
            border: none;
            margin-right: 7px;
            color: white;
            padding-left: 10px;
            letter-spacing: 1.5px;
            margin-top: 0;
            padding-right: 0;
          }

          .colon {
            margin-right: 7px;
            display: flex;
            flex-direction: column;

            span {
              width: 6px;
              height: 6px;
              background: var(--cdr-item-bg);
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
              border-radius: 2px;
              font-size: 0;

              &:not(:last-child) {
                margin-bottom: 8px;
              }

            }
          }

          .dash {
            width: 19px;
            height: 6px;
            background: var(--cdr-item-bg);
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 2px;
            margin-right: 7px;
          }
        }
      }

      .date {
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
      }

      .VueCtkDateTimePicker {
        margin-top: 8px;
        width: 300px;
      }

      .date-picker-result {
        cursor: pointer;
        position: absolute;
        top: 15px;
        left: 11px;
        font-weight: 300;
        font-size: 17px;
        line-height: 21px;
        background: var(--cdr-item-bg);
        width: 288px;
        padding: 5px 5px 10px 0;
      }

      .date-results {
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
        color: #8B9095;
        margin-left: 13px;
      }
    }

    .csv-img {
      cursor: pointer;
      margin-left: 55px;
    }
  }
}

.spinner {
  position: fixed;
  bottom: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  z-index: 10;
  animation: 1s linear 0s rotate infinite;

  img {
    width: 100%;
    height: 100%;

  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

li {
  text-transform: capitalize;
}
</style>
