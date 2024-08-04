<template>
  <div class="wrap-agent-setup">

    <div class="wrap-head">
      <h2 class="wrap-head-title">AGENT SETUP</h2>
      <svg @click="showOptions = !showOptions;chooseDepartments({})" class="arrow" :class="{'down': showOptions}"
           viewBox="0 0 10 18"
           fill="transparent"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1L1 9L9 17" stroke-width="2" stroke="var(--light-blue)" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      <span class="hr"></span>
    </div>

    <div v-show="showOptions" class="wrap-body" @click="hideListOptions(); indexRef='false'" v-click-outside="hide"
         ref="hideList">

      <div class="agent-setup__second-part">
        <div class="item-container" :ref="'Role'" @click="indexRef = 'Role'">
          <label class="options-label">
            <span class="options-title">Role</span>
            <input @click.stop="hideListRole" class="input-field" :value="role" type="text" readonly/>
            <span class="triangle" :class="{'rotate-arrow': showRole}">
              <img src="@/assets/img/icons/arrow-down-white.svg" alt="select">
            </span>
            <DropdownList v-show="showRole" :classNameList="'list-related-numbers agent-setup-user-list'" :dataList="listOfRoles"
                @clickFunc="(item) => selectRole(item)" :itemText="(item) => item" />
          </label>
        </div>

        <div class="item-container">
          <label class="options-label" :ref="'Departments Settings'" @click="indexRef = 'Departments Settings'">
            <span class="options-title">Departments Settings</span>
            <input 
              class="input-field dep" 
              type="text" 
              :value="inputDepValue" 
              @input="searchDeps($event.target.value)"
              maxlength="16"
            />
            <span @click="toggleVisible(!show, 'show')" class="triangle" :class="{'rotate-arrow': show}">
              <img src="@/assets/img/icons/arrow-down-white.svg" alt="select">
            </span>

            <DropdownList v-show="show" :classNameList="'list-related-numbers'" :dataList="getDep"
                @clickFunc="(item) => {departmentsToArray(item); chooseDepartments(item)}" :itemText="(item) => item.name"
                :clickFuncAll="null"  @scrollFunc="(event) => funScroll(event)" :showItem="(item) => topList && (topList.filter(dep => dep.uid === item.uid)).length ? !collapse : true"
                :classNameItemComputed="(item) => (topList.filter(dep => dep.uid === item.uid)).length ? collapse ? 'selected collapsed' : 'selected' : ''">
              <span class="collapse" @click="collapse = !collapse">
                <img class="button" :src="collapse ? extendImg : collapseImg" alt="collapse">
                <span class="text">Selected users available to you:</span>
                <span class="amount">{{ topList.length }}</span>
              </span>
            </DropdownList>

          </label>
        </div>
      </div>
      <span class="hr line-beetwen-sections"></span>
      <div class="agent-setup__second-part">
        <div class="item-container">
          <label class="options-label">
            <span class="options-title">Calls Direction*</span>
            <span class="input-field">
              00 - all
            </span>
          </label>
          <p class="calls-info">
            <span>*You can change it by contacting us</span>
          </p>
        </div>

        <div class="item-container">
          <label class="options-label">
            <span class="options-title">V-number**</span>
            <input class="input-field num" type="text" value="Preferred" readonly
                   style="pointer-events: none; outline: none">
          </label>
          <p class="calls-info">
            <span>**You can change it in Outbound routing</span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex"
import ClickOutside from 'vue-click-outside'
import collapseImg from '@/assets/img/icons/collapse.svg'
import extendImg from '@/assets/img/icons/extend.svg'
import DropdownList from '@/components/DropdownList'
// import {DepartmentGettersApi} from '@/API/getters'
import parseCountries from '@/lib/selectedCountries'
import { clickCheck } from '@/lib/clickCheck.js'
import _ from 'lodash'

export default {
  name: "AgentSetup",
  components: {
    DropdownList
  },
  data() {
    return {
      unsubscribeStore: () => {
      },
      collapseImg,
      extendImg,
      collapse: false,
      show: false,
      showOptions: true,
      search: "",
      showSearchResults: false,
      markedDepartments: "0 selected",
      selectedDepartments: [],
      role: "agent",
      showRole: false,
      perPage: 9,
      count: 10,
      timer: null,
      topList: [],
      bottomList: [],
      getDep: [],
      indexRef: '',
      depSearchValue: '',
    }
  },
  computed: {
    ...mapGetters(["getGlobalDepartments", "getSelectedDepartments", "VNumber", 'getPaginatorDepartment']),
    listOfRoles() {
      return this.$store.state.displayConfig.displayConfig.createUser.agentSetup.listRoles
    },
    inputDepValue() {
      if (this.show) {
        return this.depSearchValue
      } else {
        return this.markedDepartments
      }
    }
  },
  methods: {
    departmentsToArray(item) {
      const obj = parseCountries.changeCountry(item, JSON.parse(JSON.stringify(this.topList)), JSON.parse(JSON.stringify(this.bottomList)), 'uid')
      this.topList = obj.topList
      this.bottomList = obj.bottomList
      this.getDep = obj.getCountries
    },
    searchDeps(value) {
      this.depSearchValue = value
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorDepartment.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch()
        }
      }
    },
    fetch() {
      this.$store.dispatch('setGlobalDepartmentsList', {peerPage: this.perPage, search: this.depSearchValue})
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.toggleVisible(false, 'show')
      this.showRole = false
    },
    hideListRole() {
      this.showRole = !this.showRole
    },
    selectRole(role) {
      this.role = role
      this.$store.dispatch('setRole', this.role)
    },
    toggleVisible(bool, param) {
      this[param] = bool
    },
    chooseDepartments(department) {
      if (department) {
        this.defaultDepartment()
      }
      let deps = ""
      if (!this.topList.length) {
        this.markedDepartments = "0 selected"
      } else {
        this.topList.forEach(item => deps += item.name + ", ")
        this.markedDepartments = `${this.topList.length} selected (${deps})`
        this.markedDepartments = this.markedDepartments.slice(0, 30) + '...)'
      }
    },
    defaultDepartment() {
      this.$store.dispatch('departmentsSelected', this.topList)
    },
    initialisationList() {
      this.topList = JSON.parse(JSON.stringify(this.getSelectedDepartments))
      const allList = _.uniqBy(_.concat(this.getDep, this.getGlobalDepartments), d => {
        return d.uid
      })
      this.bottomList = allList.filter(dep => !this.topList.some(item => dep.uid === item.uid))
      this.getDep = _.concat(this.topList, this.bottomList)
    }
  },
  created() {
    this.$store.dispatch('setRole', this.role)
  },
  mounted() {
    this.popupItem = this.$refs.hideList
    this.chooseDepartments()
    this.initialisationList()
    this.unsubscribeStore = this.$store.subscribe(mutation => {
      if (mutation.type === 'pushRelatedDepartments' || mutation.type === 'pushSelectedDepartments') {
        this.initialisationList()
        this.chooseDepartments()
      }
    })
  },
  beforeDestroy() {
    this.unsubscribeStore()
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/AgentSetup.scss"></style>
<!-- <style lang="scss">
  .list-related-numbers.agent-setup-user-list {
    overflow: auto;
    margin-top: 1px;

    li {
      color: var(--white);
      height: 44px;
      padding-left: 16px;
      font-weight: 300;
      text-transform: capitalize;
    }
  }
</style> -->
