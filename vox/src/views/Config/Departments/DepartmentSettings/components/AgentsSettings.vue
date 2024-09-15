<template>
  <div class="personal-info-wrap"
       :class="{'disabled-events': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
    <div class="wrap-head">
      <h2>Agents in Department</h2>
    </div>
    <div class="top">
      <div class="left"
           :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
        Add agent
      </div>
      <div class="agents users">
        <div v-if="agentsDep.length" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="agentsDep.length > 1" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="agentsDep.length > 2" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="agentsDep.length > 3" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
      </div>
    </div>
    <div class="wrap-body"
         :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <div class="label" v-click-outside="hideListUsers">
              <input placeholder="Enter name or Agent Number"
                     class="input-field"
                     @click="showList()"
                     @input="showAgents = true; searchDepartments()"
                     v-model.trim="name"/>
              <span @click="showList()" class="triangle" :class="{'rotate-arrow': showAgents}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>

              <DropdownList v-show="showAgents" :classNameList="'list'" :dataList="mainList.getMainList"  @scrollFunc="(event) => funScroll(event)"
                  @clickFunc="(item) => chooseAgent(item)" :itemText="(item) => `<span>${item.name}</span><span>ID ${item.internalNumber}</span>`"
                  :classNameItemComputed="(item) => agentsDep.filter(element => element.uid === item.uid).length ? collapse ? 'selected collapsed row' : 'selected row' : 'row'"
                  :showItem="(item) => agentsDep.filter(element => element.uid === item.uid).length ? !collapse : true">
                <span class="collapse" @click="collapse = !collapse">
                  <img class="button" :src="collapse ? extendImg : collapseImg" alt="collapse">
                  <span class="text">Selected users available to you:</span>
                  <span class="amount">{{ mainList.topList.length }}</span>
                </span>
              </DropdownList>

            </div>
          </div>
        </div>
      </div>
      <div class="agents users">
        <div class="agent user" v-for="(agent, index) of agentsDep" :key="index">
          <div class="block">
            <div class="round"><img :src="agent.avatar || userAva" alt="avatar"></div>
            <span class="name">{{ agent.name }}</span>
          </div>
          <span class="name">{{ agent.internalNumber }}</span>
          <img @click="chooseAgent(agent)" class="union" src="@/assets/img/icons/union.svg" width="19" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userAva from '@/assets/img/icons/user_icon.svg'
import collapseImg from '@/assets/img/icons/collapse.svg'
import extendImg from '@/assets/img/icons/extend.svg'
import DropdownList from '@/components/DropdownList'
import store from '../../../../../store'
import ClickOutside from 'vue-click-outside'
import { dropdownListFetch, dropdownChooseItem } from '@/lib/dropdownListsDepsAndQueues.js'
import _ from 'lodash'

export default {
  name: 'AgentSetting',
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
      name: '',
      showAgents: false,
      userAva: userAva,
      perPage: 9,
      mainList: {
        topList: [],
        bottomList: [],
        getMainList: []
      },
    }
  },
  watch: {
    // agentsDep() {
    //   dropdownListFetch(this, this.mainList.getMainList, 'agentsDep')
    // },
    getGlobalUsersList() {
      dropdownListFetch(this, this.getGlobalUsersList, 'agentsDep')
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    }
  },
  computed: {
    ...mapGetters(['agentsDep', 'userInfo', 'departmentInfo', 'getGlobalUsersList', 'getPaginatorUsers'])
  },
  methods: {
    searchDepartments() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    funScroll({target}) {
      if ((target.clientHeight + target.scrollTop === target.scrollHeight) && (this.getPaginatorUsers.paginator.count > this.perPage)) {
        this.perPage += 9
        this.fetch()
      }
    },
    fetch() {
      this.$store.dispatch('globalUsersListRequest', {peerPage: this.perPage, sort: '', page: 1, search: this.name, role: '', order: 'asc'})
    },
    hideListUsers() {
      this.showAgents = false
    },
    showList() {
      if (!this.showAgents && !this.mainList.getMainList.length) {
        this.fetch()
      }
      this.showAgents = !this.showAgents
    },
    chooseAgent(agentProp) {
      const agent = _.omit(agentProp, 'dateCreated', 'dateUpdated', 'manage', 'relatedWith', 'status', 'statusTime', 'permission')
      dropdownChooseItem(this, agent, 'agentsDep', 'setAgentsDepartment')
    },
    setAgentsDepartment(array) {
      this.$store.dispatch('changeAgentsDepartment', array)
    }
  },
  mounted() {
    this.popupItem = this.$el.children[2].children[0]
    this.unsubscribeStore = store.subscribe((mutation) => {
      if (mutation.type === 'pushDepartment') {
        this.mainList.topList = JSON.parse(JSON.stringify(this.agentsDep))
      }
    })

    this.mainList.topList = JSON.parse(JSON.stringify(this.agentsDep))
  },
  beforeDestroy() {
    this.unsubscribeStore()
  },
  directives: {
    ClickOutside
  }
}
</script>
<style scoped lang="scss" src="@/assets/styles/departmentsAndQueues/agentsSettings.scss"></style>
