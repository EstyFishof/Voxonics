<template>
  <section class="table-container" v-if="getRole !== 'admin' && getRole !== 'owner'">
    <div class="table-title">Available Queues</div>
    <div class="wrap-table">
      <ul class="table-header">
        <li class="header-item header-name" @click="sortFunc('name', 'queueList', 'getRelatedQueuesName')">
          Name of Queue
          <img ref="getRelatedQueuesName" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="header-item header-number"
            @click="sortFunc('internalNumber', 'queueList', 'getRelatedQueuesNumber')">
          Queue Number
          <img ref="getRelatedQueuesNumber" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="header-item header-length" @click="sortFunc('userCount', 'queueList', 'getRelatedQueuesAgents')">
          Agents in Queue
          <img ref="getRelatedQueuesAgents" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="header-item-action" @click="sortFunc('edit', 'queueList', 'getRelatedQueuesAction')">
          Actions
          <img ref="getRelatedQueuesAction" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
      </ul>
      <div>
        <div class="list-group" :class="{'add-shadow': queueList.length > 4}" @scroll="funScroll($event)">
          <ul class="list-group-item" v-for="que in queueList" :key="que.uid.slice(0, 10)">
            <li class="department-name ellipsis">{{ que.name }}</li>
            <li class="department-user-uid">{{ que.internalNumber }}</li>
            <li class="department-queue-length">{{ que.relatedWith.user.length }}</li>
            <li class="action">
              <label class="label-container">
                <input @change.prevent="chooseDep(que)" class="view" :checked="que.view" type="checkbox"/>
                <span class="check"></span>
                <span class="text">View</span></label>
              <label class="label-container">
                <input @change.prevent="setEdit(que)" class="edit" :checked="que.edit" type="checkbox"/>
                <span class="check"></span>
                <span class="text">Edit</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
// import {QueuesGettersApi} from '@/API/getters'
import { serverSort, clientSort } from '@/lib/sort.js'
import { mapGetters } from "vuex"

export default {
  name: "AvailableQueues",
  data() {
    return {
      queueList: [],
      selectedQueueList: [],
      order: {
        name: 'asc',
        internalNumber: 'asc',
        userCount: 'asc'
      },
      activeSort: 'internalNumber',
      perPage: 9,
    }
  },
  watch: {
    getGlobalQueuesList() {
      this.$store.dispatch('queuesRelated', JSON.parse(JSON.stringify(this.getGlobalQueuesList)))
    },
    getRelatedQueues() {
      if (this.getQueueManaged.length > 0) {
        this.selectedQueueList = this.getQueueManaged
      }
      this.createDataForView()
    },
    getQueueManaged() {
      this.createDataForView()
    }
  },
  computed: {
    ...mapGetters(['getRelatedQueues', 'getQueueManaged', 'getRole', 'getPaginatorQueues', 'getGlobalQueuesList'])
  },
  methods: {
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorQueues.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch(this.perPage, this.activeSort, this.order[this.activeSort] === 'desc' ? 'asc' : 'desc')
        }
      }
    },
    fetch(peerPage, sort, order) {
      this.$store.dispatch('setGlobalQueuesList', {peerPage, sort, order})
    },
    sortFunc(param, arrayParam, refElement) {
      if (param !== 'edit') {
        const dataSort = serverSort(this.fetch, this.$refs[refElement], this.order[param], this.perPage, param)
        this.order[param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
        this.activeSort = param
      } else {
        const dataSort = clientSort(param, this[arrayParam], this.$refs[refElement], this.order[param])
        this[arrayParam] = dataSort.array
        this.order[param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
      }
    },
    chooseDep(que) {
      const includes = this.selectedQueueList.filter(d => d.uid === que.uid)
      if (!includes.length) {
        que.view = true
        this.selectedQueueList.push(que)
      } else {
        this.selectedQueueList = this.selectedQueueList.filter(q => q.uid !== que.uid)
        if (que.edit) {
          que.edit = false
          this.queueList.forEach((de, i) => {
            if (que.uid === de.uid) {
              de.edit = false
              //Vue2 не видит изменений этих полей, поэтому подменяем сам объект
              const dd = {...de}
              this.queueList.splice(i, 1, dd)
            }
          })
        }
      }
      this.$store.dispatch('queueManagerSelected', this.selectedQueueList)
    },
    setEdit(que) {
      const queue = Object.assign({}, que)
      if (!queue.view) {
        queue.view = true
        queue.edit = true
        this.queueList.forEach((de, i) => {
          if (queue.uid === de.uid) {
            de.view = true
            de.edit = true
            //Vue2 не видит изменений этих полей, поэтому подменяем сам объект
            const dd = {...de}
            this.queueList.splice(i, 1, dd)
          }
        })
      } else {
        queue.edit = !queue.edit
      }
      this.selectedQueueList = this.selectedQueueList.filter(q => q.uid !== queue.uid)
      this.selectedQueueList.push(queue)
      this.$store.dispatch('queueManagerSelected', this.selectedQueueList)
    },
    createDataForView() {
      this.queueList = []
      this.getRelatedQueues.forEach(que => {
        que.view = false
        que.edit = false
        let f = false
        if (this.getQueueManaged.length > 0) {
          this.getQueueManaged.forEach(item => {
            let d = JSON.parse(JSON.stringify(item))
            if (d.uid === que.uid) {
              f = true
              d.view = true
              if (d.edit) d.view = true
              this.queueList.push(d)
            }
          })
          if (!f) {
            this.queueList.push(que)
          }
        } else {
          this.queueList.push(que)
        }
      })
    }
  },
  mounted() {
    //Загружаем выбраный массив из стора
    if (this.getQueueManaged.length > 0) {
      this.selectedQueueList = this.getQueueManaged
    }
    //если есть данные в сторе, применяем их для отображения   
    this.createDataForView()
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/AvailableQueues.scss"></style>
