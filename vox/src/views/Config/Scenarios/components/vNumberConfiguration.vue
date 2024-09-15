<template>
  <ConfigurationWrapper
    title="V-Number Configuration"
    :isRemovedItem="false"
  >
    <div class="body" v-click-outside="hide" @click="hideListOptions(); indexFilter='false'">
      <div class="left-sector sector">
        <div class="filters">
          <div class="options-block">
            <label class="options-label" :ref="'leftNumber'" @click="indexFilter = 'leftNumber'">
              <span class="options-title">V-Number</span>
              <div class="vnumber-block">
                <input class="input-field type-vnumber" type="text" :value="filterParams.allNumbers.vNumber.key" readonly>
                <span @click="toggleVisible('filterParams.allNumbers.vNumber.key')" class="triangle" :class="{'rotate-arrow': showOption === 'filterParams.allNumbers.vNumber.key'}">
                  <img src="../../../../assets/img/icons/select-arrow.svg" alt="select">
                </span>
                <DropdownList v-show="showOption === 'filterParams.allNumbers.vNumber.key'" :classNameList="'list-related-numbers vnumber-list'"
                :dataList="VNumbersTypeValues" @clickFunc="(item) => setFiltersParam('allNumbers', item, 'object')"
                :itemText="(item) => item" />
                <input class="input-field enter-vnumber" type="text" v-model="filterParams.allNumbers.vNumber.value" placeholder="Enter numbers" />
              </div>
            </label>
          </div>

          <div class="options-block country-block">
            <label class="options-label" :ref="'LeftCountries'" @click="indexFilter = 'LeftCountries'">Countries:
              <input class="input-field" type="text" :value="getCountries.left" @input="getCountries = {value: $event.target.value, key: 'leftFilter'}" @focus="showOption === 'showCountry'"
                    placeholder="Enter Country">
              <span @click="toggleVisible('showCountry')" class="triangle" :class="{'rotate-arrow': showOption === 'showCountry'}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <DropdownList v-show="showOption === 'showCountry'" :classNameList="'list-related-numbers'"
                :dataList="countriesList.left.getCountries.filter(c => c.country.toLowerCase().indexOf(countrySearch.leftFilter.toLowerCase()) !== -1)" 
                @clickFunc="(item) => {setFiltersParam('allNumbers', item, 'array'); chooseCountry(item, 'left')}" :itemText="(item) => item.country"
                :classNameItemComputed="item => filterParams.allNumbers.countries.filter(c => c.country === item.country).length ? 'choosed' : ''"
                :contentTippyCondition="item => item.country.length > 13" :clickFuncAll="() => {setFiltersParam('allNumbers', false, 'array', getCountry); chooseCountry(null, 'left')}" />
            </label>
          </div>

          <div class="options-block description-block">
            <label class="options-label">
              <span class="options-title">Description</span>
              <input class="input-field" type="text" v-model="filterParams.allNumbers.description" placeholder="Enter Description">
            </label>
          </div>

          <div class="options-block status-block">
            <label class="options-label" :ref="'leftStatus'" @click="indexFilter = 'leftStatus'">
              <span class="options-title">Status</span>
              <input class="input-field" type="text" readonly placeholder="Used" :value="filterParams.allNumbers.status">
              <span @click="toggleVisible('usedAll')" class="triangle" :class="{'rotate-arrow': showOption === 'usedAll'}">
                <img src="../../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <ul v-show="showOption === 'usedAll'" class="list-related-numbers status-list">
                <li @click="setFiltersParam('allNumbers', 'Used', 'status')" :class="{choosed: filterParams.allNumbers.status === 'Used'}">Used</li>
                <li @click="setFiltersParam('allNumbers', 'Not used', 'status')" :class="{choosed: filterParams.allNumbers.status === 'Not used'}">Not used</li>
              </ul>
            </label>
          </div>
          
          <span class="clear-btn" @click="clearFilters('allNumbers')">
            <img  src="@/assets/img/icons/blue-broom.svg" />
          </span>
        </div>

        <div class="vnumbers">
          <ul class="vnumbers-list" ref="list" @scroll="funScroll">
            <li class="vnumber-item" v-for="(item, index) of relatedNumbersFilter.left" :key="index">
              <img class="flag" :src="item.flag" />
              <span class="vnumber-number">
                {{ item.number }}
                <span class="vnumber-description ellipsis">{{ item.description }}</span>
              </span>
              <span class="vnumber-btn-span" v-if="selectedNumbers.filter(num => num.number == item.number).length">
                <img src="@/assets/img/icons/selected.svg" />
              </span>
              <span class="vnumber-btn-span vnumber-btn-all" v-else-if="numbersUsed.filter(num => num.number == item.number).length" @click.stop="showConfirmation(); findNumber(item)" content="This number is currently used in other route"
              v-tippy="{ placement : 'top',  arrow: true, delay : 200, duration: 500 }">
                <img src="@/assets/img/icons/plus-number.svg" />
              </span>
              <img class="vnumber-btn" v-else src="@/assets/img/icons/plus-numbers.svg" @click="addVNumber(item)" />
            </li>
          </ul>
        </div>
      </div>



      <span class="arrows">
        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M65 17.0005C65 14.7914 63.2092 13.0006 61.0001 13.0006H15.1797L20.5496 7.82879C22.1693 6.26484 22.1693 3.73691 20.5496 2.17296C18.9257 0.609012 16.2968 0.609012 14.6771 2.17296L2.21789 14.1726C0.594037 15.7365 0.594037 18.2645 2.21789 19.8284L14.6771 31.828C15.487 32.608 16.5502 33 17.6134 33C18.6765 33 19.7397 32.608 20.5496 31.828C22.1693 30.2641 22.1693 27.7362 20.5496 26.1722L15.1797 21.0004H61.0001C63.2092 21.0004 65 19.2096 65 17.0005Z"
            fill="white" fill-opacity="0.1"/>
          <path
            d="M51.3229 34.173C49.699 32.609 47.0743 32.609 45.4504 34.173C43.8266 35.7369 43.8266 38.2648 45.4504 39.8288L50.8203 45.0006H4.99988C2.79081 45.0006 1 46.7914 1 49.0005C1 51.2096 2.79081 53.0004 4.99988 53.0004H50.8203L45.4504 58.1722C43.8266 59.7362 43.8266 62.2641 45.4504 63.828C46.2603 64.608 47.3234 65 48.3866 65C49.4498 65 50.513 64.608 51.3229 63.828L63.7821 51.8284C65.406 50.2645 65.406 47.7365 63.7821 46.1726L51.3229 34.173Z"
            fill="white" fill-opacity="0.1"/>
          <path class="stroke-arrow"
                d="M65 17.0005C65 14.7914 63.2092 13.0006 61.0001 13.0006H15.1797L20.5496 7.82879C22.1693 6.26484 22.1693 3.73691 20.5496 2.17296C18.9257 0.609012 16.2968 0.609012 14.6771 2.17296L2.21789 14.1726C0.594037 15.7365 0.594037 18.2645 2.21789 19.8284L14.6771 31.828C15.487 32.608 16.5502 33 17.6134 33C18.6765 33 19.7397 32.608 20.5496 31.828C22.1693 30.2641 22.1693 27.7362 20.5496 26.1722L15.1797 21.0004H61.0001C63.2092 21.0004 65 19.2096 65 17.0005Z"
                stroke-width="2"/>
          <path class="stroke-arrow"
                d="M51.3229 34.173C49.699 32.609 47.0743 32.609 45.4504 34.173C43.8266 35.7369 43.8266 38.2648 45.4504 39.8288L50.8203 45.0006H4.99988C2.79081 45.0006 1 46.7914 1 49.0005C1 51.2096 2.79081 53.0004 4.99988 53.0004H50.8203L45.4504 58.1722C43.8266 59.7362 43.8266 62.2641 45.4504 63.828C46.2603 64.608 47.3234 65 48.3866 65C49.4498 65 50.513 64.608 51.3229 63.828L63.7821 51.8284C65.406 50.2645 65.406 47.7365 63.7821 46.1726L51.3229 34.173Z"
                stroke-width="2"/>
        </svg>
      </span>



      <div class="right-sector sector">
        <div class="vnumbers">
          <ul class="vnumbers-list">
            <li class="vnumber-item" v-for="(item, index) of relatedNumbersFilter.right" :key="index">
              <img class="flag" :src="item.flag" />
              <span class="vnumber-number">
                {{ item.number }}
                <span class="vnumber-description ellipsis">{{ item.description }}</span>
              </span>
              <img class="vnumber-btn" src="@/assets/img/icons/red-cross.svg" @click="delVNumber(item)" />
            </li>
          </ul>
        </div>

        <div class="filters right-filters">
          <div class="options-block">
            <label class="options-label" :ref="'rightV-Number'" @click="indexFilter = 'rightV-Number'">
              <span class="options-title">V-Number</span>
              <div class="vnumber-block">
                <input class="input-field type-vnumber" type="text" :value="filterParams.selectedNumbers.vNumber.key" readonly>
                <span @click="toggleVisible('filterParams.selectedNumbers.vNumber.key')" class="triangle" :class="{'rotate-arrow': showOption === 'filterParams.selectedNumbers.vNumber.key'}">
                  <img src="../../../../assets/img/icons/select-arrow.svg" alt="select">
                </span>
                <DropdownList v-show="showOption === 'filterParams.selectedNumbers.vNumber.key'" :classNameList="'list-related-numbers vnumber-list'"
                  :dataList="VNumbersTypeValues" @clickFunc="(item) => setFiltersParam('selectedNumbers', item, 'object')"
                  :itemText="(item) => item" />
                <input class="input-field enter-vnumber" type="text"  v-model="filterParams.selectedNumbers.vNumber.value" placeholder="Enter numbers">
              </div>
            </label>
          </div>

          <div class="options-block country-block">
            <label class="options-label" :ref="'rightCountries'" @click="indexFilter = 'rightCountries'">Countries:
              <input class="input-field" type="text" @focus="showOption === 'showSelectedCountry'" :value="getCountries.right" @input="getCountries = {value: $event.target.value, key: 'rightFilter'}"
                    placeholder="Enter Country">
              <span @click="toggleVisible('showSelectedCountry')" class="triangle" :class="{'rotate-arrow': showOption === 'showSelectedCountry'}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <DropdownList v-show="showOption === 'showSelectedCountry'" :classNameList="'list-related-numbers'"
                  :dataList="countriesList.right.getCountries.filter(c => c.country.toLowerCase().indexOf(countrySearch.rightFilter.toLowerCase()) !== -1)" 
                  @clickFunc="(item) => {setFiltersParam('selectedNumbers', item, 'array'); chooseCountry(item, 'right')}" :itemText="(item) => item.country"
                  :classNameItemComputed="item => filterParams.selectedNumbers.countries.filter(c => c.country === item.country).length ? 'choosed' : ''"
                  :contentTippyCondition="item => item.country.length > 13" :clickFuncAll="() => {setFiltersParam('selectedNumbers', false, 'array', getCountry); chooseCountry(null, 'right')}" />
            </label>
          </div>

          <div class="options-block description-block">
            <label class="options-label">
              <span class="options-title">Description</span>
              <input class="input-field" type="text" v-model="filterParams.selectedNumbers.description" placeholder="Enter Description">
            </label>
          </div>

          <span class="clear-btn" @click="clearFilters('selectedNumbers')">
            <img  src="@/assets/img/icons/blue-broom.svg" />
          </span>
        </div>
      </div>
    </div>
  </ConfigurationWrapper>
</template>
<script>
import { mapGetters } from "vuex"
import ClickOutside from "vue-click-outside"
import DropdownList from '@/components/DropdownList'
import ControlPanel from "../../../../components/ControlPanel"
import parseCountries from '@/lib/selectedCountries'
import { clickCheck } from '@/lib/clickCheck.js'
import _ from 'lodash'
import ConfigurationWrapper from './components/ConfigurationWrapper.vue'

export default {
  name: 'VNumberConfiguration',
  components: { ControlPanel, DropdownList, ConfigurationWrapper },
  data() {
    return {
      unsubscribeStore: () => {},
      showOption: '',
      user: {},
      changeItem: {},
      VNumbersTypeValues: ['begin', 'contain', 'end', 'equal'],
      filterParams: {
        allNumbers: {
          vNumber: {key: 'begin', value: ''},
          countries: [],
          description: '',
          status: ''
        },
        selectedNumbers: {
          vNumber: {key: 'begin', value: ''},
          countries: [],
          description: '',
          status: ''
        }
      },
      countrySearch: {
        leftFilter: '',
        rightFilter: ''
      },
      countriesList: {
        left: {
          topList: [],
          bottomList: [],
          getCountries: []
        },
        right: {
          topList: [],
          bottomList: [],
          getCountries: []
        }
      },
      selectedNumbers: [],
      numbersUsed: [],
      indexFilter: '',
      number: {},
      perPage: 9,
      confirmationConfig: {
        execute: () => {this.addVNumber(this.number?.number); this.$store.commit('confirmationMutation', null)},
        executeBtnText: 'Confirm',
        cancel: () => this.$store.commit('confirmationMutation', null),
        cancelBtnText: 'Close',
        titleText: 'Confirmation',
        textConfirmation: ''
      }
    }
  },
  watch: {
    getGlobalExternalNumbers() {
      this.addFlagToNumber()
      this.setNumbersUsed()
    }
  },
  computed: {
    ...mapGetters(['getItemScenario', 'getInitialList', 'getScenario', 'getCountry', 'getGlobalExternalNumbers', 'getPaginatorNumbers', 'getInvolvedNumbers']),
    relatedNumbersFilter()  {
      return {left: this.displayNumber(this.getGlobalExternalNumbers, 'allNumbers'), right: this.displayNumber(this.selectedNumbers, 'selectedNumbers')}
    },
    getCountries: {
      get: function() {
        if(this.showOption === 'showCountry') {
          return {left: this.countrySearch.leftFilter, right: this.checkingСountries('selectedNumbers')}
        } else if(this.showOption === 'showSelectedCountry') {
          return {left: this.checkingСountries('allNumbers'), right: this.countrySearch.rightFilter}
        } else if(!this.filterParams.selectedNumbers.countries.length || this.filterParams.selectedNumbers.countries.length === this.getCountry.length) {
          return {left: this.checkingСountries('allNumbers'), right: "All"}
        } else if (!this.filterParams.allNumbers.countries.length || this.filterParams.allNumbers.countries.length === this.getCountry.length) {
          return {left: `All`, right: this.checkingСountries('selectedNumbers')}
        } else {
          return {left: `countries (${this.filterParams.allNumbers.countries.length})`, right: this.checkingСountries('selectedNumbers')}
        }
      },
      set: function(value) {
        this.countrySearch[value.key] = value.value
      }
    }
  },
  methods: {
    onscroll() {
      this.$refs.list?.addEventListener('scroll', this.funScroll)
    },
    deleteScroll() {
      this.$refs.list?.removeEventListener('scroll', this.funScroll)
    },
    funScroll() {
      if ((this.$refs.list.clientHeight + this.$refs.list.scrollTop === this.$refs.list.scrollHeight)) {
        if(this.getPaginatorNumbers.paginator.count > this.perPage) {
          this.perPage += 9
          this.$store.dispatch('setGlobalExternalNumbers', {peerPage: this.perPage})
        }
      }
    },
    showConfirmation() {
      this.$store.commit('confirmationMutation', this.confirmationConfig)
    },
    textConfirmation(value) {
      return `This number is used in the "<b>${value}</b>" route. V-number can be used only in one incoming routing. Are you sure you want to use this V-number here?`
    },
    chooseCountry(item, direction) {
      const obj = parseCountries.changeCountry(item, this.countriesList[direction].topList, this.countriesList[direction].bottomList, 'country')
      this.countriesList[direction].topList = obj.topList
      this.countriesList[direction].bottomList = obj.bottomList
      this.countriesList[direction].getCountries = obj.getCountries
    },
    findNumber(item) {
      const number = {name: _.find(this.numbersUsed, {number: item.number}).name, number: item}
      this.number = number
      this.confirmationConfig.textConfirmation = this.textConfirmation(number.name)
    },
    displayNumber(arr = [], filter) {
      let array = JSON.parse(JSON.stringify(arr))
      array = array.filter(number => number.description?.toLowerCase()?.indexOf(this.filterParams[filter].description?.toLowerCase()) !== -1)

      if(this.filterParams[filter].countries.length !== 0) {
        array = array.filter(number => {
          let bool = false
          this.filterParams[filter].countries.map(item => {
            if(number.iso3 === item.iso3) bool = true
          })
          return bool
        })
      }

      array = array.filter(number => this.filterNumber(this.filterParams[filter].vNumber, number.number))

      if(this.filterParams[filter].status === 'Used') {
        array = array.filter(num => {
          return _.some(this.numbersUsed, {number: num.number})
        })
      } else if(this.filterParams[filter].status === 'Not used') {
        array = array.filter(num => {
          return !_.some(this.numbersUsed, {number: num.number})
        })
      }
      return array
    },
    hideListOptions() {
      clickCheck(this, this.indexFilter, this.$refs)
    },
    hide() {
      this.showOption = ''
    },
    checkingСountries(value) {
      return (!this.filterParams[value].countries.length || 
              this.filterParams[value].countries.length === this.getCountry.length) ? "All" : `countries (${this.filterParams[value].countries.length})`
    },
    filterNumber(param, item) {
      if(!item) return ''
      const itemString = item.toString()
      switch (param.key) {
        case 'begin':
          return itemString.startsWith(param.value)
        case 'contain':
          return itemString.indexOf(param.value) !== -1
        case 'end':
          return itemString.endsWith(param.value)
        case 'equal':
          return itemString === param.value
      
        default:
          break
      }
    },
    clearFilters(param) {
      this.filterParams[param].vNumber = {key: 'begin', value: ''}
      this.filterParams[param].countries = []
      this.filterParams[param].description = ''
      this.filterParams[param].status = []
    },
    setFiltersParam(param, value, type, vuex) {
      switch (type) {
        case 'array':
          if(!value) {
            this.filterParams[param].countries.length === vuex.length
              ? this.filterParams[param].countries = []
              : this.filterParams[param].countries = vuex
          } else {
            if(!this.filterParams[param].countries.includes(value)) {
              this.filterParams[param].countries.push(value)
            } else {
              this.filterParams[param].countries = this.filterParams[param].countries.filter(item => item !== value)
            }
          }
          break
        case 'object':
          this.filterParams[param].vNumber.key = value
          this.showOption = ''
          break
        case 'status':
          if(this.filterParams[param].status === value) {
            this.filterParams[param].status = ''
          } else {
            this.filterParams[param].status = value
          }
          this.showOption = ''
          break
        default:
          break
      }
    },
    addVNumber(number) {
      this.selectedNumbers.push(number)
      this.numbersUsed.push({number: number.number, name: this.getScenario.path.slice(1)})
      this.addVNumberItem()
    },
    toggleVisible(param) {
      if (this.showOption === param) {
        this.showOption = ''
      } else {
        this.showOption = param
      }
    },
    addVNumberItem() {
      this.$store.dispatch(
        'updateExistingScenarioItem',
        _.set({...this.getItemScenario, schema: 'vnumber-in'}, 'options.externalNumbers', this.selectedNumbers)
      )
    },
    delVNumber(item) {
      this.selectedNumbers = this.selectedNumbers.filter(num => num.number !== item.number)
      this.numbersUsed = this.numbersUsed.filter(num => num.number !== item.number)
      this.addVNumberItem()
    },
    setNumbersUsed() {
      this.getInitialList.forEach(item => {
        item.scenario?.options.externalNumbers.forEach(number => {
          if(!_.some(this.numbersUsed, {number: number})) {
            this.numbersUsed.push({number: number, name: item.path.slice(1)})
          }
        })
      })
    },
    addFlagToNumber() {
      this.getGlobalExternalNumbers.forEach(element => {
        this.getCountry.forEach(item => {
          if(element.iso3 === item.iso3) {
            element.flag = item.flag
          }
        })
      })
    },
    mountedFunc() {
      this.$store.dispatch('setGlobalExternalNumbers', {peerPage: this.perPage})
      if(this.getScenario.scenario?.options.externalNumbers) {
        this.selectedNumbers = JSON.parse(JSON.stringify(this.getScenario.scenario.options.externalNumbers))
      } else {
        this.selectedNumbers = []
      }
    }
  },
  mounted() {
    // this.onscroll()
    // this.mountedFunc()
    // this.unsubscribeStore = this.$store.subscribe((mutation) => {
    //   if(mutation.type === 'newScenarioMutation') {
    //     this.mountedFunc()
    //   }
    // })
    this.popupItem = this.$el.children[1]
    this.countriesList.left.getCountries = this.countriesList.right.getCountries = this.countriesList.left.bottomList = this.countriesList.right.bottomList = this.getCountry
  },
  created() {
    // this.onscroll()
    this.mountedFunc()
    this.unsubscribeStore = this.$store.subscribe((mutation) => {
      if(mutation.type === 'newScenarioMutation') {
        this.mountedFunc()
      }
    })
  },
  beforeDestroy() {
    // this.deleteScroll()
    this.unsubscribeStore()
  },
  directives: {
    ClickOutside,
  },
}
</script>
<style lang="scss" scoped>
.body{
  display: flex;
  justify-content: space-between;
  padding: 0 17px 15px 17px;
  align-items: center;
  border-radius: 25px;

  .options-block{
      margin-bottom: 10px;
      position: relative;

    &:not(:last-child) {
      margin-right: 33px;
    }

      .options-label {
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
        color: #8B9095;

        .vnumber-block {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            left: 76px;
            top: 4px;
            width: 1px;
            height: 20px;
            background: var(--outbound-routing-user-header-bg);
            border-radius: 20px;
          }

          .triangle {
            width: calc(41% - 7px);
          }

          .input-field {
            box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
          }
        }

        .input-field {
          display: block;
          padding: 5px 4px 5px 12px;
          width: 150px;
          height: 24px;
          font-weight: 300;
          font-size: 12px;
          line-height: 14px;
          box-sizing: border-box;
          background: var(--scenario-vnumber-input-bg);
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          color: var(--scenario-vnumber-input-placeholder);
          &::placeholder {
            color: var(--scenario-vnumber-input-placeholder);
          }
        }
        
        .type-vnumber{
          width: 83px;
          border-radius: 4px 0 0 4px ;
        }

        .enter-vnumber{
          width: 115px;
          border-radius: 0 4px 4px 0;
        }

        .triangle {
          width: calc(99% - 7px);
          height: 24px;
          color: var(--scenario-vnumber-input-placeholder);
        }

        .list-related-numbers {
          height: 108px;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

          .choosed {
            background-color: var(--light-blue);
          }
        }

        .status-list{
          height: 54px;
        }

        .vnumber-list{
          top: 27px;
        }
      }
    }

  .country-block{
    width: 150px;

    .options-label {
      .input-field {
        width: 150px !important;
      }

      .triangle {
        width: 94%;
      }
    }
  }

  .description-block{
    width: 127px;
    .input-field {
      width: 127px !important;
    }
  }

  .status-block{
    width: 82px;
    .input-field {
      width: 82px !important;
    }
  }
}

.arrows {
  svg {
    stroke: var(--stroke-arrow-scenarios);
  }
}

.sector {
  background: var(--permission-table-bg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  display: flex;
  align-items: flex-start;

  .filters{
    position: relative;
    width: 225px;
    padding: 12px 0 8px 11px;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 13px;
      width: 2px;
      height: 226px;
      background: var(--outbound-routing-user-header-bg);
      border-radius: 20px;
    }

    .clear-btn{
      position: absolute;
      bottom: 9px;
      right: 9px;
      width: 24px;
      height: 24px;
      background: var(--scenario-vnumber-input-bg);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .vnumbers{
    width: 460px;
    height: 252px;

    .vnumbers-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 6px 21px;
      max-height: 252px;
      overflow-y: overlay;
      justify-content: space-between;

      .vnumber-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 15px;
        position: relative;
        margin-bottom: 7px;
        width: 209px;

        .flag{
          margin-top: -12px;
        }

        &::after{
          content: '';
          position: absolute;
          bottom: -4px;
          left: -7.5px;
          width: 100%;
          height: 2px;
          background: var(--header-user-color);
          border-radius: 2px;
        }

        .vnumber-number{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          text-align: right;
          color: var(--font-panel);

          .vnumber-description{
            font-weight: 300;
            font-size: 10px;
            line-height: 12px;
            text-align: center;
            color: #8B9095;
            max-width: 100px;
          }
        }
        .vnumber-btn{
          cursor: pointer;
        }
        .vnumber-btn-span{
          width: 27px;
          height: 27px;
          border-radius: 50%;
          background: var(--scenario-wheel-bg);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}

.left-sector{
  .filters {
    &::after {
      right: 0 !important;
    }
  }
}

.right-sector{
  .filters {
    &::after {
      left: 0 !important;
    }
    .clear-btn {
      bottom: -48px;
    }
  }
}

@media (min-width: 2561px) {
  .sector {
    .vnumbers {
      width: 675px;
    }
  }
}

@media screen and (min-width: 2301px) and (max-width: 2560px) {
  .sector {
    .vnumbers {
      width: 600px;

      .vnumbers-list {
        justify-content: space-between;

        .vnumber-item {
          width: 260px;
        }
      }
    }
  }
}

@media screen and (min-width: 2101px) and (max-width: 2300px) {
  .sector {
    .vnumbers {
      width: 550px;

      .vnumbers-list {
        justify-content: space-between;

        .vnumber-item {
          width: 240px;
        }
      }
    }
  }
}

@media (max-width: 1920px) {
  .body {
    .options-block {
      .options-label {
        .vnumber-block {
          &::after {
            left: 65px;
          }
        }
      }
    }
  }
  .sector {
    .filters {
      width: 200px;
    }
    .vnumbers {
      width: 450px;
      .vnumbers-list {
        padding: 6px 5px 6px 15px;
      }
    }
  }
}
@media (max-width: 1919px) and (min-width: 1781px) {
  .sector {
    .vnumbers {
      width: 450px;
    }
  }
}

@media (max-width: 1780px) {
  .sector {
    .vnumbers {
      width: 400px;

      .vnumbers-list {
        padding: 0 5px 0 15px;
        .vnumber-item {
          width: 185px;
          padding: 5px 8px;
        }
      }
    }
  }
}
@media (max-width: 1724px) {
  .body {
    justify-content: space-around;
  }
  .sector {
    .vnumbers {
      width: 230px;
      .vnumbers-list {
        // padding: 6px 10px;
        justify-content: center;
      }
    }
  }
}
</style>

