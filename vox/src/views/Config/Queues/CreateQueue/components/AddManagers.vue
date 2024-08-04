<template>
  <div class="personal-info-wrap">
    <div class="wrap-head">
      <h2>ADD MANAGERS</h2>
      <span class="hr"></span>
    </div>
    <div class="top">
      <div class="left">Add manager
      </div>
      <div class="managers users">
        <div v-if="newQueueManagers.length" class="manager user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="newQueueManagers.length > 1" class="manager user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="newQueueManagers.length > 2" class="manager user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
      </div>
    </div>
    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <div class="label" v-click-outside="hideListUsers">
              <input placeholder="Enter name or Agent Number"
                     class="input-field"
                     @click="showList()"
                     @input="showManagers = true; searchQueues()"
                     v-model.trim="name"/>
              <span @click="showList()" class="triangle" :class="{'rotate-arrow': showManagers}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>

              <DropdownList v-show="showManagers" :classNameList="'list'" :dataList="mainList.getMainList"  @scrollFunc="(event) => funScroll(event)"
                  @clickFunc="(item) => chooseAgent(item)" :itemText="(item) => `<span>${item.name}</span><span>ID ${item.internalNumber}</span>`"
                  :classNameItemComputed="(item) => newQueueManagers.filter(element => element.uid === item.uid).length ? collapse ? 'selected collapsed row' : 'selected row' : 'row'"
                  :showItem="(item) => newQueueManagers.filter(element => element.uid === item.uid).length ? !collapse : true">
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
        <div class="manager user" v-for="(manager, index) of newQueueManagers" :key="index">
          <div class="block">
            <div class="round"><img :src="manager.avatar || userAva" alt="avatar"></div>
            <span class="name">{{ manager.name }}</span>
          </div>
          <span class="name">{{ manager.internalNumber }}</span>
          <div class="action">
            <label class="label-container">
              <input class="view" checked disabled type="checkbox"/>
              <span class="check"></span>
              <span class="text">View</span></label>
            <label class="label-container">
              <input @change="changeEdit(manager)" class="edit" v-model="manager.option.edit" type="checkbox"/>
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
import ClickOutside from "vue-click-outside"
import DropdownList from '@/components/DropdownList'
import {dropdownListFetch, dropdownChooseItem} from '@/lib/dropdownListsDepsAndQueues.js'
import _ from 'lodash'

export default {
  name: "AddManager",
  components: {
    DropdownList
  },
  data() {
    return {
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
      dropdownListFetch(this, this.getGlobalUsersList, 'newQueueManagers')
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    }
  },
  computed: {
    ...mapGetters(['newQueueManagers', 'userInfo', 'getGlobalUsersList', 'getPaginatorUsers']),
  },
  methods: {
    searchQueues() {
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
      if(!this.showManagers) {
        this.fetch()
      }
      this.showManagers = !this.showManagers
    },
    chooseAgent(managerArg) {
      dropdownChooseItem(this, JSON.parse(JSON.stringify({...managerArg, option: {edit: false}})), 'newQueueManagers', 'setAgentsQueue')
    },
    changeEdit() {
      this.setAgentsQueue()
    },
    setAgentsQueue(array = this.newQueueManagers) {
      this.$store.dispatch('setBelongToQueue', array)
    }
  },
  mounted() {
    this.$store.dispatch('setBelongToQueue', [])

    this.userInfo.option = { edit: true }
    if (this.userInfo.internalNumber && this.userInfo.internalNumber !== 100 && this.userInfo.internalNumber !== 0) {
      this.mainList.topList.push(this.userInfo)
      this.$store.dispatch('setBelongToQueue', this.mainList.topList)
    }
    if (this.newQueueManagers.length) {
      this.mainList.topList = this.newQueueManagers
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/departmentsAndQueues/agentsSettings.scss"></style>
<style scoped lang="scss">
.personal-info-wrap {
  background: none;
  padding-left: 0;
  border-top: none;

  .wrap-head {
    h2 {
      font-size: 48px;
      margin-right: 24px;
    }
  }
  .top {
    margin: 50px 24px 0 24px;
  }

  .wrap-body {
    margin: 0 0 36px 0;

    .personal-info {
      &__first-part {
        .item-container {
          margin: 0 24px 16px 24px;

          .label {
            .list {
              height: 175px;
            }
          } 
        }
      }
    }
    // .manager {
    //   width: 430px;
    // }
  }
}
@media (max-width: 1780px) {
  .personal-info-wrap {
    .top {
      margin: 50px 0 0 0;
      .left {
        margin-right: 20px;
        margin-left: 24px;
      }
    }
    .wrap-body {
      .personal-info__first-part {
        .item-container {
          margin: 0 0 16px 24px;
        }
      }
    }
  }
}
</style>
