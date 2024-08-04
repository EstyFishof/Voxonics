<template>
  <div class="wrap-queues-setting">
    <div class="wrap-head">
      <h2 class="wrap-head-title">QUEUES SETTINGS</h2>
      <svg @click="displayOptions" class="arrow" :class="{'down': showOptions}" viewBox="0 0 10 18"
           fill="transparent"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1L1 9L9 17" stroke-width="2" stroke="var(--light-blue)" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      <span class="hr"></span>
    </div>

    <div v-show="showOptions" class="wrap-body">
      <div class="table-container">

        <div class="available">
          <div class="table-title">Available Queues</div>
          <div>
            <ul class="table-header">
              <li @click="sortFunc('name', 'getGlobalQueuesList', 'getRelatedQueuesName', 'queuesRelated')">
                Name of Queue
                <img ref="getRelatedQueuesName" src="@/assets/img/icons/sort-arrow.svg"/>
              </li>
              <li @click="sortFunc('internalNumber', 'getGlobalQueuesList', 'getRelatedQueuesNumber', 'queuesRelated')">
                Queue Number
                <img ref="getRelatedQueuesNumber" src="@/assets/img/icons/sort-arrow.svg"/>
              </li>
              <li class="agent-length-title" @click="sortFunc('userCount', 'getGlobalQueuesList', 'getRelatedQueuesAgents', 'queuesRelated')">
                Agents in Queue
                <img ref="getRelatedQueuesAgents" src="@/assets/img/icons/sort-arrow.svg"/>
              </li>
              <li>
                <img content="Select all" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                     @click="dispatchSelectedQueues(selectAllQ)" src="@/assets/img/icons/queues-select-all-arrow.svg"/>
              </li>

            </ul>
            <div class="table-content" :class="{'add-shadow': getGlobalQueuesList.length > 4}" @scroll="funScroll($event)">
              <ul :class="{selected: selectedQueues.some(q => q.uid === queue.uid)}" class="list-group queue"
                  v-for="queue in getGlobalQueuesList" :key="queue.uid">
                <li class="queue-name">{{ queue.name }}</li>
                <li class="queue-int-num"> {{ queue.internalNumber }}</li>
                <li class="queue-user-uid">{{ queue.userCount }}</li>
                <li @click="dispatchSelectedQueues(selectQ, queue)" class="container-icon-to">
                  <img content="Select item" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       width="23" src="@/assets/img/icons/table-icon-to.svg" alt="icon-to"/>
                </li>
              </ul>
            </div>
            <div class="btn-table-container">
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
            <path
              d="M65 17.0005C65 14.7914 63.2092 13.0006 61.0001 13.0006H15.1797L20.5496 7.82879C22.1693 6.26484 22.1693 3.73691 20.5496 2.17296C18.9257 0.609012 16.2968 0.609012 14.6771 2.17296L2.21789 14.1726C0.594037 15.7365 0.594037 18.2645 2.21789 19.8284L14.6771 31.828C15.487 32.608 16.5502 33 17.6134 33C18.6765 33 19.7397 32.608 20.5496 31.828C22.1693 30.2641 22.1693 27.7362 20.5496 26.1722L15.1797 21.0004H61.0001C63.2092 21.0004 65 19.2096 65 17.0005Z"
              stroke="var(--cdr-datepicker-bg)" stroke-width="2"/>
            <path
              d="M51.3229 34.173C49.699 32.609 47.0743 32.609 45.4504 34.173C43.8266 35.7369 43.8266 38.2648 45.4504 39.8288L50.8203 45.0006H4.99988C2.79081 45.0006 1 46.7914 1 49.0005C1 51.2096 2.79081 53.0004 4.99988 53.0004H50.8203L45.4504 58.1722C43.8266 59.7362 43.8266 62.2641 45.4504 63.828C46.2603 64.608 47.3234 65 48.3866 65C49.4498 65 50.513 64.608 51.3229 63.828L63.7821 51.8284C65.406 50.2645 65.406 47.7365 63.7821 46.1726L51.3229 34.173Z"
              stroke="var(--cdr-datepicker-bg)" stroke-width="2"/>
          </svg>
        </div>

        <div class="selected">
          <div>
            <div class="table-title">Selected Queues</div>

            <div>
              <ul class="table-header">
                <li @click="sortFunc('name', 'getSelectedQueues', 'userQueuesName', 'setSelectedQueues')">
                  Name of Queue
                  <img ref="userQueuesName" src="@/assets/img/icons/sort-arrow.svg"/>
                </li>
                <li @click="sortFunc('internalNumber', 'getSelectedQueues', 'userQueuesNumber', 'setSelectedQueues')">
                  Queue Number
                  <img ref="userQueuesNumber" src="@/assets/img/icons/sort-arrow.svg"/>
                </li>
                <li class="agent-length-title" @click="sortFunc('userCount', 'getSelectedQueues', 'userQueuesAgents', 'setSelectedQueues')">
                  Agents in Queue
                  <img ref="userQueuesAgents" src="@/assets/img/icons/sort-arrow.svg"/>
                </li>
                <li>
                  <img content="Remove all" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       width="23" @click="dispatchSelectedQueues(removeAllQ)"
                       src="@/assets/img/icons/queues-remove-all-arrow.svg" alt="table-icon-from"/>
                </li>
              </ul>
              <div class="table-content" :class="{'add-shadow': getSelectedQueues.length > 4}">
                <ul class="list-group" v-for="(queue, idx) in getSelectedQueues" :key="queue.uid + idx">
                  <li class="queue-name">{{ queue.name }}</li>
                  <li class="queue-int-num">{{ queue.internalNumber }}</li>
                  <li class="queue-user-uid">{{ queue.userCount }}</li>
                  <li @click="dispatchSelectedQueues(deleteQ, queue)" class="container-icon-to">
                    <img content="Remove item" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                         width="23" src="@/assets/img/icons/table-icon-err.svg" alt="table-icon-from"/>
                  </li>
                </ul>
              </div>
              <div v-show="getSelectedQueues" class="btn-table-container">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {QueuesGettersApi} from '@/API/getters'
import { mapGetters } from 'vuex'
import { clientSort, serverSort } from '@/lib/sort.js'

export default {
  name: 'QSettings',
  data() {
    return {
      showOptions: true,
      selectedQueues: [],
      order: {
        getSelectedQueues: {
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
      perPage: 9,
      selectAllBool: false,
      activeSort: 'internalNumber'
    }
  },
  // watch: {
  //   getGlobalQueuesList() {
  //     if(this.selectAllBool) {
  //       this.getGlobalQueuesList.forEach(queue => {
  //         const {name, internalNumber, userCount, uid} = queue
  //         this.selectedQueues.push({name, internalNumber, userCount, uid})
  //       })
  //       this.selectAllBool = false
  //     }
  //   }
  // },
  computed: {
    ...mapGetters(['getSelectedQueues', 'getPaginatorQueues', 'getGlobalQueuesList'])
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
    sortFunc(param, arrayParam, refElement, dispatchName) {
      if (arrayParam === 'getGlobalQueuesList') {
        const dataSort = serverSort(this.fetch, this.$refs[refElement], this.order[arrayParam][param], this.perPage, param)
        this.order[arrayParam][param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
        this.activeSort = param
      } else {
        const dataSort = clientSort(param, this[arrayParam], this.$refs[refElement], this.order[arrayParam][param], dispatchName)
        this.order[arrayParam][param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
      }
    },
    displayOptions() {
      this.showOptions = !this.showOptions
      this.defaultQueue()
    },
    selectQ(queue) {
      if (!this.selectedQueues.some(q => q.uid === queue.uid)) {
        this.selectedQueues.push(queue)
      }
      if(this.getGlobalQueuesList.length - this.selectedQueues.length < 5 && this.getGlobalQueuesList.length < this.getPaginatorQueues.paginator.count) {
        this.fetch(this.perPage += 9, this.activeSort, this.order.getGlobalQueuesList[this.activeSort])
      }
    },
    deleteQ(queue) {
      this.selectedQueues = this.getSelectedQueues.filter(q => q !== queue)
    },
    selectAllQ() {
      this.fetch(this.getPaginatorQueues.paginator.count, this.activeSort, this.order.getGlobalQueuesList[this.activeSort])
      this.selectedQueues = JSON.parse(JSON.stringify(this.getGlobalQueuesList))
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
      this.$store.dispatch('queuesSelected', this.selectedQueues)
    }
  },
  mounted() {
    this.selectedQueues = this.getSelectedQueues
    this.fetch()
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/qSettings.scss"></style>
