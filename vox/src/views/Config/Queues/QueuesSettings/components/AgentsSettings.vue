<template>
  <div class="personal-info-wrap" :class="{'disabled-events': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">
    <div class="wrap-head">
      <h2>Agents in Queue</h2>
    </div>
    <div class="top">
      <div class="left" :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">Add agent
      </div>
      <div class="agents users">
        <div v-if="relatedAgents.length" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="relatedAgents.length > 1" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="relatedAgents.length > 2" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="relatedAgents.length > 3" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
      </div>
    </div>
    <div class="wrap-body" :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">
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
                  :classNameItemComputed="(item) => mainList.topList.filter(element => element.uid === item.uid).length ? collapse ? 'selected collapsed row' : 'selected row' : 'row'"
                  :showItem="(item) => mainList.topList.filter(element => element.uid === item.uid).length ? !collapse : true">
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
        <drop-list :items="relatedAgents" @reorder="$event.apply(relatedAgents); reorderAgents()" @insert="insert1"
                   mode="cut">
          <template v-slot:item="{item}">
            <drag :key="item.uid" :data="item" @cut="remove(relatedAgents, item)">
              <div class="agent user">
                <div class="block">
                  <div class="number">{{relatedAgents.indexOf(item) + 1}}.</div>
                  <div class="round"><img :src="item.avatar || userAva" alt="avatar"></div>
                  <span class="name">{{ item.name }}</span>
                </div>
                <span class="name">{{ item.internalNumber }}</span>
                <img @click="chooseAgent(item)" class="union" src="@/assets/img/icons/union.svg" width="19" alt="">
              </div>
            </drag>
          </template>
        </drop-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import userAva from '@/assets/img/icons/user_icon.svg'
import collapseImg from '@/assets/img/icons/collapse.svg'
import extendImg from '@/assets/img/icons/extend.svg'
import store from "../../../../../store"
import ClickOutside from "vue-click-outside"
import DropdownList from '@/components/DropdownList'
import { Drag, DropList } from "vue-easy-dnd"
import {dropdownListFetch, dropdownChooseItem} from '@/lib/dropdownListsDepsAndQueues.js'
import _ from 'lodash'

export default {
  name: "AgentSetting",
  components: {Drag, DropList, DropdownList},
  data() {
    return {
      unsubscribeStore: () => {
      },
      collapse: false,
      collapseImg,
      extendImg,
      name: "",
      showAgents: false,
      relatedAgents: [],
      userAva: userAva,
      perPage: 12,
      mainList: {
        topList: [],
        bottomList: [],
        getMainList: []
      }
    }
  },
  watch: {
    getGlobalUsersList() {
      dropdownListFetch(this, this.getGlobalUsersList, 'relatedAgents')
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    }
  },
  computed: {
    ...mapGetters(['getAgentsQueueInfo', 'userInfo', 'getQueueInfo', 'getGlobalUsersList', 'getPaginatorUsers']),
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
    showList() {
      if (!this.showAgents && !this.mainList.getMainList.length) {
        this.fetch()
      }
      this.showAgents = !this.showAgents
    },
    hideListUsers() {
      this.showAgents = false
    },
    chooseAgent(agentProp) {
      const agent = _.omit(agentProp, 'dateCreated', 'dateUpdated', 'manage', 'relatedWith', 'status', 'statusTime', 'permission')
      dropdownChooseItem(this, agent, 'relatedAgents', 'setAgentsDepartment', true)
    },
    setAgentsDepartment(array) {
      this.$store.dispatch('setAgentsQueueInfo', array)
    },
    reorderAgents() {
      this.$store.dispatch('setAgentsQueueInfo',this.relatedAgents)
    },
    insert1(event) {
      this.relatedAgents.splice(event.index, 0, event.data)
    },
    remove(array, value) {
      let index = array.indexOf(value)
      array.splice(index, 1)
    },
  },
  mounted() {
    this.popupItem = this.$el.children[2].children[0]
    this.unsubscribeStore = store.subscribe((mutation) => {
      if (mutation.type === 'queueInfoMutation') {
        this.relatedAgents = JSON.parse(JSON.stringify(this.getAgentsQueueInfo))
        this.mainList.topList = JSON.parse(JSON.stringify(this.getAgentsQueueInfo))
      }
    })
    this.relatedAgents = JSON.parse(JSON.stringify(this.getAgentsQueueInfo))
    this.mainList.topList = JSON.parse(JSON.stringify(this.getAgentsQueueInfo))
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
<style scoped lang="scss">
.personal-info-wrap {
  width: 100%;
}

.number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
}

.drop-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.users {
  margin-left: 10px !important;
  padding-left: 10px !important;
}

.wrap-body {
  .agent {
    transition: all .5s ease-in-out;
    border-bottom: 2px solid var(--bottom-line) !important;

    &:hover {
      transition: all .5s ease-in-out;
      transform: scale(1.05);
      border-bottom: 2px solid var(--backlight) !important;
    }
  }
}
</style>
