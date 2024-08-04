<template>
  <section class="table-container" @click="hideListOptions(); indexRef='false'" v-click-outside="hide">
    <div class="managed">
      <div class="table-title">
        <span>In Departments</span>
        <button content="Edit mode" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                @click="editMode('related')" class="btn-edit"><img src="@/assets/img/icons/edit.svg" alt=""></button>
      </div>
      <div class="wrap-table">
        <div v-show="editRelated" class="table-title subtitle" :ref="'relDepValueSearch'"
             @click="indexRef = 'relDepValueSearch'">
          <button content="Show/hide list" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                  @click="showList('relDepValueSearch', 'showRelDeps'); relDepValueSearch = ''"
                  class="btn-edit btn-add"><img
            src="@/assets/img/icons/list.svg" alt=""></button>
          <div>
            <input v-model="relDepValueSearch"
              @input="showList('relDepValueSearch', 'showRelDeps'); searchDepartments('relDepValueSearch')"
              type="text"
              placeholder="Search Departments"
              maxlength="16"
            />
            <DropdownList v-show="showListDeps === 'showRelDeps'" :classNameList="'listRelDeps'" :dataList="viewRelDeps"
                @clickFunc="(item) => chooseRelDep(item)" :itemText="(item) => item.name"
                :clickFuncAll="null"  @scrollFunc="(event) => funScroll(event)" 
                :classNameItemComputed="() => ''" />
          </div>
        </div>
        <div class="br">
          <div class="list-group">
            <ul class="list-group-item" v-for="(dep, index) in departments" :key="index+3">
              <li class="department-name ellipsis">
                <button @click="deleteRelDep(dep)" v-show="editRelated" class="btn-del">
                  <img src="@/assets/img/icons/cross-delete.svg">
                </button>
                {{ dep.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userInfoVuex.permission.role !== 'agent'" class="managed">
      <div class="table-title">
        <span>Managing Departments</span>
        <button content="Edit mode" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                @click="editMode('managed')" class="btn-edit"
                :class="{'no-hover': userRole === 'owner' || userRole === 'root' || userRole === 'admin'}">
          <img src="@/assets/img/icons/edit.svg" alt=""></button>
      </div>
      <div class="wrap-table">
        <div v-show="editManaged" class="table-title subtitle" :ref="'manDepValueSearch'"
             @click="indexRef = 'manDepValueSearch'">
          <button content="Show/hide list" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                  @click="showList('manDepValueSearch', 'showManDeps'); manDepValueSearch = ''"
                  class="btn-edit btn-add"><img
            src="@/assets/img/icons/list.svg" alt=""></button>
          <div>
            <input v-model="manDepValueSearch"
              @input="showList('manDepValueSearch', 'showManDeps'); searchDepartments('manDepValueSearch')"
              type="text"
              placeholder="Search Departments"
              maxlength="16"
            />
            <DropdownList v-show="showListDeps === 'showManDeps'" :classNameList="'listRelDeps'" :dataList="viewManDeps"
                @clickFunc="(item) => chooseManDep(item)" :itemText="(item) => item.name"
                :clickFuncAll="null"  @scrollFunc="(event) => funScroll(event)" 
                :classNameItemComputed="() => ''" />
          </div>
        </div>
        <div class="br">
          <div class="list-group">

            <ul class="list-group-item" v-for="(dep, index) in userManageDeps" :key="index+1">
              <li class="department-name ellipsis">
                <button @click="deleteManDep(dep)" v-show="editManaged" class="btn-del">
                  <img src="@/assets/img/icons/cross-delete.svg">
                </button>
                {{ dep.name }}
                <img @click="viewDepartment(dep)" class="setting-img" src="@/assets/img/icons/setting.svg"/>
              </li>
              <li class="action">
                <label class="label-container">
                  <input class="view" checked disabled type="checkbox"/>
                  <span class="check"></span>
                  <span class="text">View</span></label>
                <label class="label-container">
                  <input @change.prevent="setEdit(dep)" class="edit" v-model="dep.option.edit"
                         :disabled="userRole === 'owner' || userRole === 'root' || userRole === 'admin' || userUid === userInfo.uid"
                         type="checkbox"/>
                  <span class="check"></span>
                  <span class="text">Edit</span></label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import DropdownList from '@/components/DropdownList'
import {DepartmentGettersApi} from '@/API/getters'
import { mapGetters } from "vuex"
import { clickCheck } from '@/lib/clickCheck.js'
import _ from 'lodash'

export default {
  name: "Departments",
  components: {
    DropdownList
  },
  data() {
    return {
      showRelDeps: false,
      showManDeps: false,
      showListDeps: '',
      editRelated: false,
      editManaged: false,
      relDepValueSearch: '',
      manDepValueSearch: '',
      selectedRelDep: '',
      selectedManDep: '',
      mainDepartment: {},
      perPage: 9,
      // count: 10
    }
  },
  computed: {
    ...mapGetters(['getGlobalDepartments', 'userManageDeps', 'userInfoVuex', 'userInfo', 'userUid', 'departments', 'userRole', 'getPaginatorDepartment']),
    viewRelDeps() {
      let globalDepArray = JSON.parse(JSON.stringify(this.getGlobalDepartments))
      let deps = JSON.parse(JSON.stringify(this.departments))
      const array = globalDepArray.filter(x => !deps.some(y => x.uid === y.uid))
      return array
    },
    viewManDeps() {
      let globalDepArray = JSON.parse(JSON.stringify(this.getGlobalDepartments))
      let manageDeps = JSON.parse(JSON.stringify(this.userManageDeps))
      const array = globalDepArray.filter(x => !manageDeps.some(y => x.uid === y.uid))
      return array
    },
  },
  methods: {
    searchDepartments(paramSearch) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(this[paramSearch]), 800)
    },
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorDepartment.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch()
        }
      }
    },
    viewDepartment(dep) {
      DepartmentGettersApi.viewDepartment(dep.uid)
      localStorage.setItem('depUid', dep.uid)
      this.$router.push(`/config/departments/department-setting/${dep.name}`)
    },
    fetch(search = '') {
      this.$store.dispatch('setGlobalDepartmentsList', {peerPage: this.perPage, search})
    },
    showList(input, showParam) {
      if (this[input].length > 0 || this.showListDeps !== showParam) {
        this.showListDeps = showParam
      } else {
        this.showListDeps = ''
      }
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.showListDeps = ''
    },
    editMode(param) {
      if (param === 'related') {
        this.editRelated = !this.editRelated
      } else {
        if (this.userRole !== 'owner' && this.userRole !== 'root' && this.userRole !== 'admin') {
          this.editManaged = !this.editManaged
        }
      }
    },
    //<<<<<<<<<<<<<<Related departments>>>>>>>>>>>>>>>>>>>>>>>>
    addRelDep() {
      if (this.selectedRelDep) {
        const includes = this.departments.filter(dep => dep.uid === this.selectedRelDep.uid)
        if (!includes.length) {
          let array = [this.selectedRelDep, ...this.departments]
          array = _.sortBy(array, [function (o) {
            return o.name
          }])
          this.$store.dispatch('changeDeps', array)
        }
      }
      this.relDepValueSearch = ''
      this.selectedRelDep = ''
    },
    chooseRelDep(dep) {
      this.selectedRelDep = {name: dep.name, uid: dep.uid, userCount: dep.userCount}
      this.relDepValueSearch = dep.name
      this.showListDeps = ''
      this.addRelDep()
    },
    deleteRelDep(dep) {
      const array = this.departments.filter(d => d.uid !== dep.uid)
      if (!this.departments.length) {
        array.unshift({
          name: this.mainDepartment.name,
          uid: this.mainDepartment.uid,
          userCount: this.mainDepartment.userCount
        })
      }
      this.$store.dispatch('changeDeps', array)
    },

    //<<<<<<<<<<<<<<<<Managed departments>>>>>>>>>>>>>>>>>>>>>>
    addManDep() {
      if (this.selectedManDep) {
        const includes = this.userManageDeps.filter(dep => dep.uid === this.selectedManDep.uid)
        if (!includes.length) {
          let array = [this.selectedManDep, ...this.userManageDeps]
          array = _.sortBy(array, [function (o) {
            return o.name
          }])
          this.$store.dispatch('setUserDepsManaged', array)
        }
      }
      this.manDepValueSearch = ''
      this.selectedManDep = ''
    },
    chooseManDep(dep) {
      this.selectedManDep = {name: dep.name, option: {edit: false}, uid: dep.uid, userCount: dep.userCount}
      this.manDepValueSearch = dep.name
      this.showListDeps = ''
      this.showManDeps = false
      this.addManDep()
    },
    deleteManDep(dep) {
      const array = this.userManageDeps.filter(d => d.uid !== dep.uid)
      this.$store.dispatch('setUserDepsManaged', array)
    },
    setEdit() {
      this.$store.dispatch('setUserDepsManaged', this.userManageDeps)
    }
  },
  mounted() {
    this.fetch()
    this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  }
}
</script>

<style src="@/assets/styles/delete-btn.scss" lang="scss" scoped></style>
<style scoped lang="scss">
.table-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;

  .managed {
    width: 45%;
  }

  .subtitle {
    margin-top: 10px;
    padding-bottom: 0 !important;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center !important;

    .btn-add.btn-edit {
      background: transparent;
      border-color: transparent;
    }

    div {
      position: relative;
      width: 100%;

      ::v-deep .listRelDeps {
        position: absolute;
        max-height: 150px;
        min-width: 50%;
        overflow: auto;
        z-index: 12;
        background: var(--queue-select-bg);
        border-radius: 4px;
        color: rgba(255, 255, 255, 0.5);

        &::-webkit-scrollbar {
          width: 4px; /* ширина для вертикального скролла */
          height: 6px; /* высота для горизонтального скролла */
          background-color: rgba(0, 0, 0, 0);
        }

        li {
          padding: 0 5px;
          border-radius: 4px;
          font-weight: 300;
          width: 100%;
          position: relative;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);

          &::after {
            content: '';
            position: absolute;
            width: 95%;
            bottom: 0;
            left: 2.5%;
            height: 2px;
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
      font-family: 'Roboto', sans-serif;
      font-size: 24px;
      font-weight: 300;
      color: #6D6D6D;

      &:focus {
        border-bottom: 1px solid #6D6D6D;
      }

    }

  }

  .table-title {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    font-weight: bold;
    font-size: 24px;
    line-height: 37px;
    color: var(--header-user-color);
    padding: 0 0 16px 0;

    .btn-edit {
      background-color: var(--button-edit-dep-bg);
      height: 30px;
      width: 30px;
      border-radius: 50%;
      border: 2px solid var(--button-edit-dep-border);
      outline: none;
      margin-left: 20px;
      margin-top: 5px;
      transition: .3s ease;
      transform: scale(1, 1);
      cursor: pointer;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);

      img {
        width: 100%;
        height: 100%;
      }

      &:hover {
        transition: .3s ease;
        transform: scale(1.2, 1.2);
      }
    }

    .no-hover {
      transform: scale(1, 1) !important;
    }

    .btn-add {
      height: 20px;
      width: 20px;
      padding: 0;
      color: var(--light-blue);
      font-size: 24px;
      text-align: center;
      line-height: 0;
      margin-top: 0;
      margin-right: 5px;
      margin-left: 0;
      transition: .3s ease;
      transform: scale(1, 1);

      &:hover {
        transition: .3s ease;
        transform: scale(1.3, 1.3);
      }
    }
  }

  input[type="checkbox"] {
    &:disabled + .check {
      top: 2px !important;
    }
  }

  .wrap-table {
    .header-item {
      width: 260px;
    }

    .br {
      border-radius: 4px;
      overflow: visible;
    }

    .list-group {
      max-height: 200px;
      overflow-y: auto;
      overflow-x: visible;
      padding: 0 17px 17px 0;
      font-size: 16px;

      .label-container {
        position: relative;
        margin-right: 24px;
      }

    }

    .list-group-item {
      color: var(--user-deps-input-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
      width: 100%;
      height: 52px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 100%;
        background: var(--cdr-border-row);
        border-radius: 2px;
      }

      .department-name {
        font-size: 18px;
        font-weight: 300;
        display: flex;
        align-items: center;
        padding-left: 4px;
        max-width: 250px;

        .setting-img {
          cursor: pointer;
          margin-left: 16px;
          transition: .3s ease;
          transform: scale(1, 1);

          &:hover {
            transition: .3s ease;
            transform: scale(1.3, 1.3);
          }
        }
      }

      .action {
        width: 165px;
      }
    }

    .department-name {
      text-align: left;
    }
  }
}
</style>
