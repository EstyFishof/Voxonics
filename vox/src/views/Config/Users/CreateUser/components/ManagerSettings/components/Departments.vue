<template>
  <section class="table-container" v-if="getRole !== 'admin' && getRole !== 'owner'">
    <div class="table-title">Departments to be managed</div>
    <div class="wrap-table">
      <ul class="table-header">
        <li class="header-item" @click="sortFunc('name', 'depList', 'name')">
          Name of Department
          <img ref="name" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="header-item-action" @click="sortFunc('edit', 'depList', 'action')">
          Actions
          <img ref="action" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
      </ul>
      <div>
        <div class="list-group" :class="{'add-shadow': depList.length > 4}" @scroll="funScroll($event)">
          <ul class="list-group-item" v-for="dep in depList" :key="dep.uid.slice(0, 10)">
            <li class="department-name ellipsis">{{ dep.name }}</li>
            <li class="action">
              <label class="label-container">
                <input @change.prevent="chooseDep(dep)" class="view" :checked="dep.view" type="checkbox"/>
                <span class="check"></span>
                <span class="text">View</span></label>
              <label class="label-container">
                <input @change.prevent="setEdit(dep)" class="edit" :checked="dep.edit" type="checkbox"/>
                <span class="check"></span>
                <span class="text">Edit</span></label>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
// import {DepartmentGettersApi} from '@/API/getters'
import { mapGetters } from "vuex"
import { serverSort, clientSort } from '@/lib/sort.js'

export default {
  name: "Departments",
  data() {
    return {
      depList: [],
      selectedDepList: [],
      order: {
        name: 'asc',
        edit: 'asc'
      },
      activeSort: 'name',
      count: 10,
      perPage: 9
    }
  },
  watch: {
    getRelatedDepartments() {
      if (this.getDepManaged.length > 0) {
        this.selectedDepList = this.getDepManaged
      }
      this.createDataForView()
    },
    getDepManaged() {
      this.createDataForView()
    }
  },
  computed: {
    ...mapGetters(['getRelatedDepartments', 'getDepManaged', 'getRole', 'getForm', 'getPaginatorDepartment'])
  },
  methods: {
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorDepartment.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch(this.perPage, this.activeSort, this.order[this.activeSort] === 'desc' ? 'asc' : 'desc')
        }
      }
    },
    fetch(peerPage, sort, order) {
      this.$store.dispatch('setGlobalDepartmentsList', {peerPage, sort, order})
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
    chooseDep(dep) {
      const includes = this.selectedDepList.filter(d => d.uid === dep.uid)
      if (!includes.length) {
        dep.view = true
        this.selectedDepList.push(dep)
      } else {
        this.selectedDepList = this.selectedDepList.filter(q => q.uid !== dep.uid)
        dep.edit = false
        this.depList.forEach((de, i) => {
          if (dep.uid === de.uid) {
            de.edit = false
            //Vue2 не видит изменений этих полей, поэтому подменяем сам объект
            const dd = {...de}
            this.depList.splice(i, 1, dd)
          }
        })
      }
      this.$store.dispatch('depManagerSelected', this.selectedDepList)
    },
    setEdit(dep) {
      const department = Object.assign({}, dep)
      if (!department.view) {
        department.view = true
        department.edit = true
        this.depList.forEach((de, i) => {
          if (department.uid === de.uid) {
            de.view = true
            de.edit = true
            //Vue2 не видит изменений этих полей, поэтому подменяем сам объект
            const dd = {...de}
            this.depList.splice(i, 1, dd)
          }
        })
      } else {
        department.edit = !department.edit
      }
      this.selectedDepList = this.selectedDepList.filter(q => q.uid !== department.uid)
      this.selectedDepList.push(department)
      this.$store.dispatch('depManagerSelected', this.selectedDepList)
    },
    createDataForView() {
      this.depList = []
      this.getRelatedDepartments.map(dep => {
        dep.view = false
        dep.edit = false
        let f = false
        if (this.getDepManaged.length > 0) {
          this.getDepManaged.forEach(item => {
            let d = JSON.parse(JSON.stringify(item))
            if (d.uid === dep.uid) {
              f = true
              d.view = true
              if (d.edit) d.view = true
              this.depList.push(d)
            }
          })
          if (!f) {
            this.depList.push(dep)
          }
        } else {
          this.depList.push(dep)
        }
      })
    }
  },
  mounted() {
    //Загружаем выбраный массив из стора
    if (this.getDepManaged.length > 0) {
      this.selectedDepList = this.getDepManaged
    }
    //если есть данные в сторе, применяем их для отображения
    this.createDataForView()
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/AvailableQueues.scss"></style>
<style scoped lang="scss">
.table-container {
  .wrap-table {
    .table-header {
      justify-content: space-between;
    }

    .header-item {
      width: 260px;
    }

    .header-item-action {
      padding-left: 0;
      width: 150px;
    }

    .list-group-item {
      justify-content: space-between;

      .action {
        width: 150px;
      }
    }

    .department-name {
      width: 220px;
      text-align: left;
    }
  }
}
</style>
