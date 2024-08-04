<template>
  <div class="personal-info-wrap">
    <div class="wrap-head">
      <h2>ADD AGENTS</h2>
      <span class="hr"></span>
    </div>
    <div class="top">
      <div class="left">Add agent
      </div>
      <div class="agents users">
        <div v-if="newDepartmentAgents.length" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="newDepartmentAgents.length > 1" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="newDepartmentAgents.length > 2" class="agent user">
          <div class="block">
            <div class="round">Name</div>
            <span class="name"></span>
          </div>
          <span class="name">Agent Number</span>
          <span class="union"></span>
        </div>
        <div v-if="newDepartmentAgents.length > 3" class="agent user">
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
                     @input="showAgents = true; searchDepartments()"
                     v-model.trim="name"/>
              <span @click="showList()" class="triangle" :class="{'rotate-arrow': showAgents}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <DropdownList v-show="showAgents" :classNameList="'list'" :dataList="mainList.getMainList"  @scrollFunc="(event) => funScroll(event)"
                  @clickFunc="(item) => chooseAgent(item)" :itemText="(item) => `<span>${item.name}</span><span>ID ${item.internalNumber}</span>`"
                  :classNameItemComputed="(item) => newDepartmentAgents.filter(element => element.uid === item.uid).length ? collapse ? 'selected collapsed row' : 'selected row' : 'row'"
                  :showItem="(item) => newDepartmentAgents.filter(element => element.uid === item.uid).length ? !collapse : true">
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
        <div class="agent user" v-for="(agent, index) of newDepartmentAgents" :key="index">
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
import { mapGetters } from "vuex"
import userAva from '@/assets/img/icons/user_icon.svg'
import collapseImg from '@/assets/img/icons/collapse.svg'
import extendImg from '@/assets/img/icons/extend.svg'
import DropdownList from '@/components/DropdownList'
import ClickOutside from "vue-click-outside"
import {dropdownListFetch, dropdownChooseItem} from '@/lib/dropdownListsDepsAndQueues.js'
import _ from 'lodash'

export default {
  name: "AddAgent",
  components: {
    DropdownList
  },
  data() {
    return {
      collapseImg,
      extendImg,
      collapse: false,
      name: "",
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
    getGlobalUsersList() {
      dropdownListFetch(this, this.getGlobalUsersList, 'newDepartmentAgents')
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    }
  },
  computed: {
    ...mapGetters(['newDepartmentAgents', 'getGlobalUsersList', 'getPaginatorUsers']),
  },
  methods: {
    searchDepartments() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    funScroll({target}) {
      if(((target.clientHeight + target.scrollTop === target.scrollHeight) && (this.getPaginatorUsers.paginator.count > this.perPage))) {
        this.perPage += 9
        this.fetch()
      }
    },
    fetch() {
      this.$store.dispatch('globalUsersListRequest', {peerPage: this.perPage, sort: '', page: 1, search: this.name})
    },
    showList() {
      if(!this.showAgents) {
        this.fetch()
      }
      this.showAgents = !this.showAgents
    },
    hideListUsers() {
      this.showAgents = false
    },
    chooseAgent(agent) {
      dropdownChooseItem(this, agent, 'newDepartmentAgents', 'setAgentsDepartment')
    },
    setAgentsDepartment(array) {
      this.$store.dispatch('transferAgentsDepartment', array)
    }
  },
  mounted() {
    this.popupItem = this.$el.children[2].children[0]
    if (this.newDepartmentAgents.length) {
      this.mainList.topList = this.newDepartmentAgents
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
  height: 363px;

  .wrap-head {
    h2 {
      font-size: 48px;
      margin-right: 24px;
    }
  }
  
  .top {
    margin: 50px 24px 0 24px;

    .left {
      margin-right: 44px;
    }
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
  }

  .agents {
    .agent {
      color: var(--font-panel);
    }
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
