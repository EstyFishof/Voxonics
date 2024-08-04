<template>
  <div class="wrap-agent-setup">

    <div class="wrap-head">
      <h2 class="wrap-head-title">AGENT SETUP</h2>
      <svg @click="showOptions = !showOptions" class="arrow" :class="{'down': showOptions}" viewBox="0 0 10 18"
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

        <div class="item-container">
          <label class="options-label" v-if="userInfo && userInfoVuex" :ref="'Role'" @click="indexRef = 'Role'">
            <span class="options-title">Role</span>
            <input @click.stop="toggleListRole" class="input-field" :value="userInfoVuex.permission.role" type="text"
                   readonly/>
            <span class="triangle"
                  v-if="!disableRole && userInfo.internalNumber != userInfoVuex.internalNumber"
                  :class="{'rotate-arrow': showRole}">
              <img src="@/assets/img/icons/arrow-down-white.svg" alt="select">
            </span>
            <DropdownList v-show="showRole && userInfo.internalNumber != userInfoVuex.internalNumber" 
                :classNameList="'list-related-numbers'" :dataList="listOfRoles"
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
              <img src="../../../../../assets/img/icons/arrow-down-white.svg" alt="select">
            </span>

            <DropdownList v-show="show" :classNameList="'list-related-numbers'" :dataList="getDep"
                @clickFunc="(item) => {chooseDepartments(item); departmentsToArray(item)}" :itemText="(item) => item.name"
                @scrollFunc="(event) => funScroll(event)" :showItem="(item) => departments && (departments.filter(dep => dep.uid === item.uid)).length ? !collapse : true"
                :classNameItemComputed="(item) => departments && (departments.filter(dep => dep.uid === item.uid)).length ? collapse ? 'selected collapsed' : 'selected' : ''">
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
            <input 
              class="input-field num" 
              type="text" 
              value="Preferred" 
              readonly 
              style="pointer-events: none; outline: none"
            />
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
import ClickOutside from "vue-click-outside"
import DropdownList from '@/components/DropdownList'
import collapseImg from '@/assets/img/icons/collapse.svg'
import extendImg from '@/assets/img/icons/extend.svg'
// import {DepartmentGettersApi} from '@/API/getters'
import parseCountries from '@/lib/selectedCountries'
import { clickCheck } from '@/lib/clickCheck'
import _ from 'lodash'

export default {
  name: "AgentSetup",
  components: {
    DropdownList
  },
  data() {
    return {
      unsubscribe: () => {
      },
      collapseImg,
      extendImg,
      collapse: false,
      show: false,
      showOptions: true,
      search: '',
      showSearchResults: false,
      markedDepartments: "0 selected",
      selectedDepartments: [],
      role: "",
      showRole: false,
      topList: [],
      bottomList: [],
      getDep: [],
      perPage: 9,
      indexRef: '',
      depSearchValue: '',
      timer: null
    }
  },
  computed: {
    ...mapGetters(['userInfoVuex', 'getGlobalDepartments', 'departments', 'getOutboundDirection', 'number', 'userRole', 'roleAgent', 'userInfo', 'getPaginatorDepartment']),
    inputDepValue() {
      if (this.show) {
        return this.depSearchValue
      } else {
        return this.markedDepartments
      }
    },
    listOfRoles() {
      return this.$store.state.displayConfig.displayConfig.createUser.agentSetup.listRoles
    },
    disableRole() {
      return this.$store.state.displayConfig.displayConfig.createUser.agentSetup.disableRoles.includes(this.userRole)
    },
  },
  watch: {
    departments () {
      this.chooseDepartments()
    }
  },
  methods: {
    departmentsToArray(item) {
      const obj = parseCountries.changeCountry(item, this.topList, this.bottomList, 'uid')
      this.topList = obj.topList
      this.bottomList = obj.bottomList
      this.getDep = obj.getCountries
    },
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorDepartment.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch()
        }
      }
    },
    searchDeps(value) {
      this.depSearchValue = value
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    fetch() {
      this.$store.dispatch('setGlobalDepartmentsList', {peerPage: this.perPage, search: this.depSearchValue})
    },
    selectRole(role) {
      this.role = role
      this.$store.dispatch('changeRole', this.role)
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.toggleVisible(false, 'show')
      this.showRole = false
    },
    toggleListRole() {
      this.showRole = !this.showRole
    },
    toggleVisible(bool, param) {
      this[param] = bool
    },
    chooseDepartments(department) {
      this.selectedDepartments = this.departments
      if (department) {
        const includes = this.departments?.filter(d => d.uid === department.uid)
        if (!includes.length) {
          this.selectedDepartments.push(department)
        } else {
          this.selectedDepartments = this.departments?.filter(q => q.uid !== department.uid)
        }
        this.$store.dispatch('changeDeps', this.selectedDepartments)
      }
      let deps = ""
      if (!this.departments?.length) {
        this.markedDepartments = "0 selected"
      } else {
        this.departments?.forEach(item => deps += item.name + ", ")
        this.markedDepartments = `${this.departments?.length} selected (${deps})`
        this.markedDepartments = this.markedDepartments.slice(0, 30) + '...)'
      }
    },
    initialisationList() {
      this.topList = JSON.parse(JSON.stringify(this.departments || []))
      const allList = _.uniqBy(_.concat(this.getDep, this.getGlobalDepartments), d => {
        return d.uid
      })
      this.bottomList = allList.filter(dep => !this.topList.some(item => dep.uid === item.uid))
      this.getDep = _.concat(this.topList, this.bottomList)
    }
  },
  mounted() {
    this.chooseDepartments()
    this.initialisationList()
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type === 'pushRelatedDepartments') {
        this.initialisationList()
      }
    })
    this.popupItem = this.$refs.hideList
    this.role = this.userRole
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/AgentSetup.scss"></style>
<style scoped lang="scss">
.wrap-agent-setup {

  .agent-setup {
    &__second-part {
      .item-container {
        input {
          text-transform: capitalize;
        }
      }
    }
  }
}

.description {
  margin-left: 10px;
}

</style>
