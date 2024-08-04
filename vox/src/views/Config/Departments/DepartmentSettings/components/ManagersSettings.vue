<template>
  <div class="personal-info-wrap" :class="{'disabled-events': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
    <div class="wrap-head">
      <h2>Managed by</h2>
    </div>
    <div class="top">
      <div class="left" :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">Add manager
      </div>
      <div class="managers users">
        <div v-if="managersDep.length" class="manager user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="managersDep.length > 1" class="manager user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="managersDep.length > 2" class="manager user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
      </div>
    </div>
    <div class="wrap-body" :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <div class="label" v-click-outside="hideListUsers">
              <input placeholder="Enter name or Agent Number"
                     class="input-field"
                     @click="showList()"
                     @input="showManagers = true; searchDepartments()"
                     v-model.trim="name"/>
              <span @click="showList()" class="triangle" :class="{'rotate-arrow': showManagers}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>

              <DropdownList v-show="showManagers" :classNameList="'list'" :dataList="mainList.getMainList"  @scrollFunc="(event) => funScroll(event)"
                  @clickFunc="(item) => chooseAgent(item)" :itemText="(item) => `<span>${item.name}</span><span>ID ${item.internalNumber}</span>`"
                  :classNameItemComputed="(item) => managersDep.filter(element => element.uid === item.uid).length ? collapse ? 'selected collapsed row' : 'selected row' : 'row'"
                  :showItem="(item) => managersDep.filter(element => element.uid === item.uid).length ? !collapse : true">
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
      <div class="managers users">
        <div class="manager user" v-for="(manager, index) of managersDep" :key="index">
          <div class="block">
            <div class="round"><img :src="manager.avatar || userAva" alt="avatar"></div>
            <span class="name">{{ manager.name }}</span>
          </div>
          <span class="name">{{ manager.internalNumber }}</span>
          <div class="action">
            <label class="label-container" :class="{'disabled-checkbox': manager.role === 'root' || manager.role === 'owner' || manager.role === 'admin'}">
              <input @change="changeEdit(manager)" :disabled="manager.role === 'root' || manager.role === 'owner' || manager.role === 'admin' || !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)" class="edit" v-model="manager.option.edit" type="checkbox"/>
              <span class="check"></span>
              <span class="text">Edit</span></label>
          </div>
          <img @click="chooseAgent(manager)" class="union" src="@/assets/img/icons/union.svg" width="19" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import userAva from "@/assets/img/icons/user_icon.svg"
import collapseImg from '@/assets/img/icons/collapse.svg'
import extendImg from '@/assets/img/icons/extend.svg'
import DropdownList from '@/components/DropdownList'
import store from "../../../../../store"
import ClickOutside from "vue-click-outside"
import {dropdownListFetch, dropdownChooseItem} from '@/lib/dropdownListsDepsAndQueues.js'
import _ from 'lodash'

export default {
  name: "ManagerSetting",
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
      name: "",
      showManagers: false,
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
    getGlobalUsersList() {
      dropdownListFetch(this, this.getGlobalUsersList, 'managersDep')
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    }
  },
  computed: {
    ...mapGetters(['managersDep',  'userInfo', 'departmentInfo', 'getGlobalUsersList', 'getPaginatorUsers']),
  },
  methods: {
    searchDepartments() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    funScroll({target}) {
      if((target.clientHeight + target.scrollTop === target.scrollHeight) && (this.getPaginatorUsers.paginator.count > this.perPage)) {
        this.perPage += 9
        this.fetch()
      }
    },
    fetch() {
      this.$store.dispatch('globalUsersListRequest', {peerPage: this.perPage, sort: '', page: 1, search: this.name, role: 'manager', order: 'asc'})
    },
    hideListUsers() {
      this.showManagers = false
    },
    showList() {
      if(!this.showManagers && !this.mainList.getMainList.length) {
        this.fetch()
      }
      this.showManagers = !this.showManagers
    },
    chooseAgent(managerArg) {
      const manager = _.omit(managerArg, 'dateCreated', 'dateUpdated', 'manage', 'relatedWith', 'status', 'statusTime', 'permission')
      dropdownChooseItem(this, JSON.parse(JSON.stringify({...manager, option: {edit: false}})), 'managersDep', 'setAgentsDepartment')
    },
    changeEdit() {
      this.setAgentsDepartment()
    },
    setAgentsDepartment(array = this.managersDep) {
      this.$store.dispatch('changeManagersDepartment', array)
    }
  },
  mounted() {
    this.popupItem = this.$el.children[2].children[0]
    this.unsubscribeStore = store.subscribe((mutation) => {
      if (mutation.type === 'pushDepartment') {
        this.mainList.topList = JSON.parse(JSON.stringify(this.managersDep))
      }
    })
    this.mainList.topList = JSON.parse(JSON.stringify(this.managersDep))
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
  .wrap-head {
    h2 {
      color: rgba(255, 255, 255, 0.1);
    }
  }
  .top {
    .managers {
      margin-left: 0 !important;
      flex-wrap: nowrap;
    }

    .manager {
      border-bottom: none !important;
      align-items: flex-end;
      justify-content: flex-start !important;

      .name {
        margin-left: 35px;
      }
    }
  }

  .wrap-body {
    .managers {
      min-height: 320px;
    }
  }

  .managers {
    .manager {
      margin-right: 48px;
    }
  }
}
</style>
