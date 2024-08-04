<template>
  <div class="wrap-queues-setting">
    <div class="wrap-body">
      <div class="table-container">

        <div class="available">
          <div class="table-title">Available Queues</div>
          <div>
            <ul class="table-header">
              <li @click="sortFunc('name', 'getGlobalQueuesList', 'getRelatedQueuesName')">
                Name of Queue
                <img ref="getRelatedQueuesName" src="@/assets/img/icons/sort-arrow.svg"/>
              </li>
              <li @click="sortFunc('internalNumber', 'getGlobalQueuesList', 'getRelatedQueuesNumber')">
                Queue Number
                <img ref="getRelatedQueuesNumber" src="@/assets/img/icons/sort-arrow.svg"/>
              </li>
              <li class="agent-length-title" @click="sortFunc('userCount', 'getGlobalQueuesList', 'getRelatedQueuesAgents')">
                Agents in Queue
                <img ref="getRelatedQueuesAgents" src="@/assets/img/icons/sort-arrow.svg"/>
              </li>
              <li>
                <img content="Select all" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                     width="23" v-if="getGlobalQueuesList.length !== selectedQueues.length"
                     v-show="getGlobalQueuesList.length"
                     @click="dispatchSelectedQueues(selectAllQ)" src="@/assets/img/icons/queues-select-all-arrow.svg"
                     alt="icon-to"
                     class="select-all-btn"/>
              </li>
            </ul>
            <div class="table-content" @scroll="funScroll($event)">
              <ul :class="{selected: userQueues.filter(q => q.uid === queue.uid).length}" class="list-group queue"
                  v-for="queue in getGlobalQueuesList" :key="queue.uid">
                <li class="queue-name ellipsis">{{ queue.name }}</li>
                <li class="queue-int-num"> {{ queue.internalNumber }}</li>
                <li class="queue-user-uid">{{ queue.userCount }}</li>
                <li @click="dispatchSelectedQueues(selectQ, queue)" class="container-icon-to">
                  <img content="Select item" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       width="23" src="@/assets/img/icons/table-icon-to.svg" alt="icon-to" class="select-btn"/>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="switcher">
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
        </div>

        <div class="selected">
          <div>
            <div class="table-title">Selected Queues</div>

            <div>
              <ul class="table-header">
                <li @click="sortFunc('name', 'selectedQueues', 'getSelectedQueuesName')">
                  Name of Queue
                  <img ref="getSelectedQueuesName" src="@/assets/img/icons/sort-arrow.svg"/>
                </li>
                <li @click="sortFunc('internalNumber', 'selectedQueues', 'getSelectedQueuesNumber')">
                  Queue Number
                  <img ref="getSelectedQueuesNumber" src="@/assets/img/icons/sort-arrow.svg"/>
                </li>
                <li class="agent-length-title" @click="sortFunc('userCount', 'selectedQueues', 'getSelectedQueuesAgents')">
                  Agents in Queue
                  <img ref="getSelectedQueuesAgents" src="@/assets/img/icons/sort-arrow.svg"/>
                </li>
                <li>
                  <img content="Remove all" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       width="23" @click="dispatchSelectedQueues(removeAllQ)" class="select-all-btn"
                       src="@/assets/img/icons/queues-remove-all-arrow.svg" alt="table-icon-from"/>
                </li>
              </ul>
              <div class="table-content">
                <ul class="list-group" v-for="(queue, idx) in selectedQueues"
                    :key="queue.uid + idx">
                  <li class="queue-name ellipsis">{{ queue.name }}</li>
                  <li class="queue-int-num">{{ queue.internalNumber }}</li>
                  <li class="queue-user-uid">{{ queue.userCount }}</li>
                  <li @click="dispatchSelectedQueues(deleteQ, queue)" class="container-icon-to">
                    <img content="Remove item" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                         width="23" src="@/assets/img/icons/table-icon-err.svg" alt="table-icon-from"
                         class="select-btn"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { clientSort, serverSort } from '@/lib/sort.js'
import _ from 'lodash'

export default {
  name: 'QSettings',
  data() {
    return {
      selectedQueues: [],
      unsubscribe: () => {
      },
      sort: {
        number: true,
        user: true,
        agents: true
      },
      order: {
        selectedQueues: {
          name: 'asc',
          internalNumber: 'asc',
          userCount: 'asc'
        },
        getGlobalQueuesList: {
          name: 'desc',
          internalNumber: 'desc',
          userCount: 'desc'
        },
      },
      activeSort: 'internalNumber',
      perPage: 18,
      selectAllBool: false
    }
  },
  computed: {
    ...mapGetters(['userQueues', 'userInfoVuex', 'getPaginatorQueues', 'getGlobalQueuesList'])
  },
  methods: {
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorQueues.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch(this.perPage, this.activeSort, this.order.getGlobalQueuesList[this.activeSort] === 'desc' ? 'asc' : 'desc')
        }
      }
    },
    fetch(peerPage, sort, order) {
      this.$store.dispatch('setGlobalQueuesList', {peerPage, sort, order})
    },
    sortFunc(param, arrayParam, refElement) {
      if (arrayParam === 'getGlobalQueuesList') {
        const dataSort = serverSort(this.fetch, this.$refs[refElement], this.order[arrayParam][param], this.perPage, param)
        this.order[arrayParam][param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
        this.activeSort = param
      } else {
        const dataSort = clientSort(param, this[arrayParam], this.$refs[refElement], this.order[arrayParam][param])
        this.order[arrayParam][param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
      }
    },
    selectQ(queue) {
      const {name, internalNumber, userCount = undefined, uid} = queue
      if (!this.selectedQueues.includes(queue)) {
        this.selectedQueues.push({name, internalNumber, userCount, uid})
        if(this.getGlobalQueuesList.length - this.selectedQueues.length < 9 && this.getGlobalQueuesList.length < this.getPaginatorQueues.paginator.count) {
          this.fetch(this.perPage += 9, this.activeSort, this.order.getGlobalQueuesList[this.activeSort])
        }
      }
    },
    deleteQ(queue) {
      if (queue) {
        const array = []
        this.userInfoVuex.relatedWith.queue.forEach(q => {
          if (q.uid !== queue.uid) {
            array.push(q)
          }
        })
        this.selectedQueues = array
      }
    },
    selectAllQ() {
      this.fetch(this.getPaginatorQueues.paginator.count, this.activeSort, this.order.getGlobalQueuesList[this.activeSort])
      const array = this.getGlobalQueuesList.filter(queue => this.userQueues.length ? this.userQueues.some(q => q.uid !== queue.uid) : true)
      this.selectedQueues = [...array, ...this.userQueues]
      this.selectAllBool = true
    },
    removeAllQ() {
      this.selectedQueues = []
    },
    dispatchSelectedQueues(fn, arg) {
      fn(arg)
      this.defaultQueue()
    },
    defaultQueue() {
      this.selectedQueues = _.sortBy(this.selectedQueues, [function (o) {
        return o.name
      }])
      this.$store.dispatch('usersQueuesSelected', JSON.parse(JSON.stringify(this.selectedQueues)))
    }
  },
  mounted() {
    this.selectedQueues = JSON.parse(JSON.stringify(this.userQueues || []))
    this.unsubscribe = this.$store.subscribe((mutation => {
      if (mutation.type === 'setUserInfo') {
        this.selectedQueues = JSON.parse(JSON.stringify(this.userQueues))
      }
      if (mutation.type === 'addSelectedQueues') {
        this.selectedQueues = JSON.parse(JSON.stringify(this.userQueues))
      }
    }))
    this.fetch(this.perPage, this.activeSort, this.order.getGlobalQueuesList[this.activeSort])
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>

<style scoped lang="scss">
.stroke-arrow {
  stroke: var(--stroke-arrow);
  fill: var(--fill-arrow);
}

.wrap-queues-setting {
  padding-bottom: 12px;

  .wrap-body {
    .table-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin: 0 24px 36px 0;

      .available, .selected {
        flex: 1 1 auto;
        min-width: 45%;

        .selected {
          padding: 0 !important;
          margin: 0;

          li {
            display: none;
          }
        }

        .table-header {
          height: 40px;
        }

        .table-content {
          padding-top: 9px;
          height: 320px;
          background-color: var(--permission-table-bg);
          overflow: auto;
        }

        .list-group {
          @extend .flex;
          padding: 8px 24px 0;

          li {
            padding-top: 4px;
          }

          li:nth-child(1),
          li:nth-child(2),
          li:nth-child(3) {
            min-width: 30%;
            padding-right: 20px;
          }

          li:nth-child(4) {
            width: 10%;
            text-align: right;

            img {
              margin-right: 2px;
            }
          }

          li {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 16px;
            color: var(--font-panel);
            position: relative;
            padding-bottom: 5px;

            &:after {
              content: '';
              height: 2px;
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
              background: var(--bottom-line);
              border-radius: 2px;
            }

            .select-btn {
              cursor: pointer;
              transition: .3s ease;
              transform: scale(1, 1);

              &:hover {
                transition: .3s ease;
                transform: scale(1.1, 1.1);
              }
            }

            img {
              cursor: pointer;
            }
          }

          &.selected {
            li img {
              cursor: not-allowed;
            }
          }
        }
      }

      .switcher {
        margin: 209px 32px 0;
      }

      .table-title {
        margin-bottom: 24px;
        font-size: 32px;
        font-weight: 700;
        color: var(--header-user-color);
        white-space: nowrap;
      }

      .flex {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .table-header {
        background: var(--light-blue);
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
        border-radius: 4px 4px 0 0;
        @extend .flex;
        padding: 12px 27px 12px 16px;
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .select-all-btn {
          cursor: pointer;
          transition: .3s ease;

          &:hover {
            transform: scale(1.2, 1.2);
          }
        }

        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3) {
          width: 30%;
        }

        li:nth-child(4) {
          width: 10%;
          text-align: right;
        }
      }
    }
  }
}


@media (max-width: 1504px) {
  .wrap-queues-setting {
    .wrap-body {
      .table-container {
        .table-header {
          li {
            &:nth-child(1) {
              width: 45%;
            }
            &:nth-child(2) {
              width: 45%; 
            }
          }
          .agent-length-title {
            display: none;
          }
        }
        li {
          width: 45%;
        }
        .queue-user-uid {
          display: none;
        }
      }
    }
  }
}
</style>
