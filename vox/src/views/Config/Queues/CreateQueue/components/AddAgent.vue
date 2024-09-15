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
    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <div class="label" v-click-outside="hideListUsers">
              <input placeholder="Enter name or Agent Number"
                     class="input-field"
                     @click="showList()"
                     @input="showAgents = true; searchQueues()"
                     v-model.trim="name"/>
              <span @click="showList()" class="triangle" :class="{'rotate-arrow': showAgents}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>

              <DropdownList v-show="showAgents" :classNameList="'list'" :dataList="mainList.getMainList"  @scrollFunc="(event) => funScroll(event)"
                  @clickFunc="(item) => chooseAgent(item)" :itemText="(item) => `<span>${item.name}</span><span>ID ${item.internalNumber}</span>`"
                  :classNameItemComputed="(item) =>  relatedAgents.filter(element => element.uid === item.uid).length ? collapse ? 'selected collapsed row' : 'selected row' : 'row'"
                  :showItem="(item) => relatedAgents.filter(element => element.uid === item.uid).length ? !collapse : true">
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
        <drop-list :items="relatedAgents" @reorder="$event.apply(relatedAgents); reorderAgents()" @insert="insert1" mode="cut">
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
import userAva from "@/assets/img/icons/user_icon.svg"
import collapseImg from '@/assets/img/icons/collapse.svg'
import extendImg from '@/assets/img/icons/extend.svg'
import ClickOutside from "vue-click-outside"
import DropdownList from '@/components/DropdownList'
import { Drag, DropList } from "vue-easy-dnd"
import {dropdownListFetch, dropdownChooseItem} from '@/lib/dropdownListsDepsAndQueues.js'
import _ from 'lodash'

export default {
  name: "AddAgent",
  components: {Drag, DropList, DropdownList},
  data() {
    return {
      collapseImg,
      extendImg,
      collapse: false,
      name: "",
      showAgents: false,
      relatedAgents: [],
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
      dropdownListFetch(this, this.getGlobalUsersList, 'relatedAgents')
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    }
  },
  computed: {
    ...mapGetters(['newQueueAgents', 'userInfo', 'getGlobalUsersList', 'getPaginatorUsers']),
  },
  methods: {
    searchQueues() {
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
      if (!this.showAgents) {
        this.fetch()
      }
      this.showAgents = !this.showAgents
    },
    chooseAgent(agent) {
      dropdownChooseItem(this, agent, 'relatedAgents', 'setAgentsQueue', true)
    },
    setAgentsQueue(array) {
      this.$store.dispatch('setRelatedWithQueue', array)
    },
    reorderAgents() {
      this.setAgentsQueue(this.relatedAgents)
    },
    insert1(event) {
      let array = this.relatedAgents.splice(event.index, 0, event.data)
      this.setAgentsQueue(array)
    },
    remove(array, value) {
      let index = array.indexOf(value)
      array.splice(index, 1)
      this.setAgentsQueue(array)
    },
  },
  mounted() {
    this.popupItem = this.$el.children[2].children[0]
    if (this.newQueueAgents.length) {
      this.relatedAgents = this.newQueueAgents
      this.mainList.topList = this.newQueueAgents
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
  .drop-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

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
