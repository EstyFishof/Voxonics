<template>
  <div class="queues-managing">
    <div class="queues-managing__title">
      Available Queues
    </div>
    <div class="table-content">
      <div class="table-content__sticky">
        <ul class="table-content__list-header">
          <li class="table-content__header-item">
            <button
              @click="setChange()"
              :class="{ 'edit-close-btn': userRole !== 'owner' && userRole !== 'root' && userRole !== 'admin' }"
            >
              <img
                content="Edit mode"
                v-tippy="{ placement: 'top', arrow: true, delay: 800, duration: 500 }"
                v-if="!change"
                src="@/assets/img/icons/edit.svg"
                alt=""
                width="10.67"
                height="10.67"
              />
              <img
                content="Read mode"
                v-tippy="{ placement: 'top', arrow: true, delay: 800, duration: 500 }"
                v-if="change"
                src="@/assets/img/icons/queues-close.png"
                alt=""
                width="10.67"
                height="10.67"
              />
            </button>
          </li>
          <li class="table-content__header-item" @click="sortFunc('name', 'queueList', 'getRelatedQueuesName')">
            Name of Queue
            <img ref="getRelatedQueuesName" src="@/assets/img/icons/sort-arrow.svg" />
          </li>
          <li
            class="table-content__header-item"
            @click="sortFunc('internalNumber', 'queueList', 'getRelatedQueuesNumber')"
          >
            Queue Number
            <img ref="getRelatedQueuesNumber" src="@/assets/img/icons/sort-arrow.svg" />
          </li>
          <li
            class="table-content__header-item"
            @click="sortFunc('option.edit', 'queueList', 'getRelatedQueuesAction')"
          >
            Actions
            <img ref="getRelatedQueuesAction" src="@/assets/img/icons/sort-arrow.svg" />
          </li>
        </ul>
        <div class="table-content__enterQueue" v-show="change">
          <button>
            <img
              content="Show/hide list"
              v-tippy="{ placement: 'top', arrow: true, delay: 800, duration: 500 }"
              v-if="change"
              @click="
                firstOpenList();
                relQueuesValueSearch = '';
              "
              src="@/assets/img/icons/list.svg"
              alt=""
              width="16"
              height="15"
            />
          </button>
          <div>
            <input
              v-model="relQueuesValueSearch"
              @input="
                showList('relQueuesValueSearch', 'showRelQueues');
                searchQueues();
              "
              v-click-outside="hideList"
              type="text"
              @click="relQueuesValueSearch = ''"
              placeholder="Search Queues"
              maxlength="16"
            />
            <DropdownList v-show="showRelQueues" :classNameList="'listRelDeps'" :dataList="viewRelQueues"
                @clickFunc="(item) => chooseRelQueues(item)" :itemText="(item) => item.name"
                :clickFuncAll="null"  @scrollFunc="(event) => funScroll(event)" 
                :classNameItemComputed="() => ''" />
          </div>
        </div>
      </div>
      <ul class="table-content__list-main" v-for="(item, index) in queueList" :key="index">
        <li
          content="Remove item"
          v-tippy="{ placement: 'top', arrow: true, delay: 800, duration: 500 }"
          v-show="change"
          class="table-content__list-item delete"
          @click="deleteQueues(item)"
        >
          <span class="delete-span"></span>
        </li>
        <li class="table-content__list-item ellipsis">{{ item.name }}</li>
        <li class="table-content__list-item">{{ item.internalNumber }}</li>
        <li class="table-content__list-item">
          <label class="table-content__label">
            <input
              type="checkbox"
              :checked="item.option.edit"
              @change="changeEditQueue({ ...item, option: { edit: $event.target.checked } })"
              :disabled="userRole === 'owner' || userRole === 'root' || userRole === 'admin'"
            />
            <span class="check"></span>
            <span class="text">Edit</span>
          </label>
          <span class="table-content__img-settings" @click="viewQueue(item)">
            <img src="@/assets/img/icons/cogwheel.svg" width="20" height="20" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {QueuesGettersApi} from '@/API/getters'
import DropdownList from '@/components/DropdownList'
import { mapGetters } from "vuex"
import ClickOutside from "vue-click-outside"
import { clientSort } from "@/lib/sort.js"
import _ from "lodash"
export default {
  name: 'QManaging',
  components: {
    DropdownList
  },
  data() {
    return {
      change: false,
      showRelQueues: false,
      relQueuesValueSearch: "",
      selectedRelQueue: "",
      queueList: [],
      order: {
        number: "desc",
        user: "desc",
        "option.edit": "desc"
      },
      perPage: 9
    }
  },
  watch: {
    userManageQueues() {
      this.queueList = this.userManageQueues
    }
  },
  computed: {
    ...mapGetters(["userManageQueues", "getGlobalQueuesList", "queues", "userRole", 'getPaginatorQueues']),
    viewRelQueues() {
      let globalQueuesArray = JSON.parse(JSON.stringify(this.getGlobalQueuesList))
      const array = globalQueuesArray.filter(x => !this.queueList.some(y => x.uid === y.uid))
      return array
    }
  },
  methods: {
    searchQueues() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorQueues.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch()
        }
      }
    },
    fetch() {
      this.$store.dispatch('setGlobalQueuesList', {peerPage: this.perPage, sort: 'name', search: this.relQueuesValueSearch})
    },
    firstOpenList() {
      if (!this.showRelQueues && !this.viewRelQueues.length) {
        this.fetch()
      }
      this.showRelQueues = !this.showRelQueues
    },
    showList(input, showParam) {
      this[showParam] = this[input].length > 0
    },
    hideList() {
      this.showRelQueues = false
    },
    viewQueue(queue) {
      this.$store.dispatch("setSpinner", true)
      QueuesGettersApi.viewQueue(queue.uid)
      localStorage.setItem("queueUid", queue.uid)
      this.$router.push(`/config/queues/queue-setting/${queue.name}`)
    },
    sortFunc(param, arrayParam, refElement) {
      const dataSort = clientSort(param, this[arrayParam], this.$refs[refElement], this.order[param])
      this[arrayParam] = dataSort.array
      this.order[param] = dataSort.order
      this.$refs[refElement] = dataSort.refArrow
    },
    setChange() {
      if (this.userRole !== "owner" && this.userRole !== "root" && this.userRole !== "admin") {
        this.change = !this.change
      }
    },
    chooseRelQueues(relQueues) {
      this.selectedRelQueue = {
        name: relQueues.name,
        internalNumber: relQueues.internalNumber,
        userCount: relQueues.userCount,
        uid: relQueues.uid,
        option: { edit: false }
      }
      this.showRelQueues = false
      this.relQueuesValueSearch = relQueues.name
      this.addQueues()
    },
    changeEditQueue(queue) {
      this.$store.dispatch("setEditQueue", queue)
    },
    addQueues() {
      const includes = this.queueList.filter(dep => dep.uid === this.selectedRelQueue.uid)
      if (!includes.length) {
        this.selectedRelQueue.option = { edit: false }
        let array = [this.selectedRelQueue, ...this.queueList]
        array = _.sortBy(array, [
          function(o) {
            return o.name
          }
        ])
        this.$store.dispatch("setUserQueuesManaged", array)
        this.selectedRelQueue = ""
        this.relQueuesValueSearch = ""
      }
    },
    deleteQueues(queues) {
      const array = this.queueList.filter(q => q.uid !== queues.uid)
      this.$store.dispatch("setUserQueuesManaged", array)
    }
  },
  mounted() {
    this.popupItem = this.$el.children[1].children[0]
    this.queueList = this.userManageQueues
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.queues-managing {
  &__title {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 35px;
    color: #454d54;
  }

  .table-content {
    height: 360px;
    overflow-y: scroll;

    &__sticky {
      position: sticky;
      background: var(--users-table-bg);
      border: 2px solid var(--cdr-border-row);
      box-sizing: border-box;
      box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);
      border-radius: 6px 6px 0 0;
      top: 0;
      z-index: 10;
    }

    &__enterQueue {
      margin-top: 10px;
      padding-bottom: 0 !important;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center !important;

      button {
        width: 20px;
        height: 20px;
        margin: 16px 22px 13px 14px;
        border-radius: 50%;
        background: transparent;
        border: none;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        cursor: pointer;
      }

      div {
        position: relative;
        width: 100%;

        ::v-deep .listRelDeps {
          position: absolute;
          max-height: 150px;
          overflow: auto;
          z-index: 12;
          border-radius: 4px;
          width: 200px;
          background: var(--queue-select-bg);
          color: rgba(255, 255, 255, 0.5);

          &::-webkit-scrollbar {
            width: 4px; /* ширина для вертикального скролла */
            height: 6px; /* высота для горизонтального скролла */
            background-color: rgba(0, 0, 0, 0);
          }

          li {
            padding: 0 10px;
            border-radius: 4px;
            font-weight: 300;
            font-size: 16px;
            line-height: 19px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);

            &:after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 2.5%;
              height: 2px;
              width: 95%;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 2px;
            }
          }

          li:hover {
            background-color: var(--light-blue);
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }

      input {
        background-color: transparent;
        height: 30px;
        width: auto;
        border: none;
        outline: none;
        font-family: "Roboto", sans-serif;
        font-size: 24px;
        font-weight: 300;
        color: #6d6d6d;

        &:focus {
          border-bottom: 1px solid #6d6d6d;
        }
      }
    }

    &__list-header {
      width: 100%;
      height: 44px;
      padding: 0 107px 0 54px;
      background: #276899;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
      border-radius: 4px 4px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }

    &__header-item {
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      cursor: pointer;

      .edit-close-btn {
        transition: 0.3s ease;
        transform: scale(1, 1);

        &:hover {
          transition: 0.3s ease;
          transform: scale(1.3, 1.3);
        }
      }

      &:first-child {
        position: absolute;
        left: 5px;

        button {
          width: 20px;
          height: 20px;
          margin-left: 4px;
          border-radius: 50%;
          background-color: var(--button-edit-dep-bg);
          border: 2px solid var(--button-edit-dep-border);
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
          cursor: pointer;
        }
      }

      &:nth-child(3) {
        margin-left: 17px;
        cursor: pointer;
      }
    }

    &__list-main {
      display: flex;
      align-items: center;
      padding: 0 20px 0 55px;
      height: 38px;
      background: var(--users-table-bg);
      border: 2px solid var(--cdr-border-row);
      box-sizing: border-box;
      box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);
      margin-top: 6px;
      position: relative;
    }

    &__list-item {
      display: flex;
      width: 33%;
      color: var(--font-panel);

      &:nth-child(3) {
        display: flex;
        justify-content: center;
      }

      &:nth-child(4) {
        display: flex;
        justify-content: flex-end;
      }
    }

    .delete {
      position: absolute !important;
      left: 12px;
      width: 20px;
      height: 20px;
      background: var(--button-edit-dep-bg);
      border: 2px solid var(--button-edit-dep-border);
      box-sizing: border-box;
      border-radius: 50%;
      padding: 7px 4px;
      cursor: pointer;

      .delete-span {
        height: 2px;
        width: 12px;
        background: #ff3a29;
        border-radius: 4px;
      }
    }

    &__label {
      position: relative;
      display: flex;
      align-items: center;
      margin-left: 35px;

      input[type="checkbox"] {
        width: 19px;
        height: 19px;

        &:checked ~ .text {
          color: var(--light-blue);
        }

        &:checked ~ .check {
          top: 0px;
          width: 19px;
          height: 19px;
        }

        &:disabled ~ .check {
          top: 3px !important;
        }

        & ~ .check {
          top: 0px;
          width: 19px;
          height: 19px;
        }
      }

      .text {
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        margin-left: 10px;
        color: var(--font-panel);
      }
    }

    &__img-settings {
      margin-left: 37px;
      cursor: pointer;
      transition: 0.3s ease;
      transform: scale(1, 1);
      display: flex;
      align-items: center;

      &:hover {
        transition: 0.3s ease;
        transform: scale(1.3, 1.3);
      }
    }
  }
}
</style>
