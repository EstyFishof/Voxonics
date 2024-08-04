<template>
  <div class="get-users-page-container" >
    <div class="toolbar">
      <div class="bar-wrapper">
        <div class="btn-img-department">

          <span content="Add new department" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                class="add-btn-dep" @click="goToAddNewUserPage">
            <img width="12" src="@/assets/img/icons/plus.svg" alt="plus" class="add-btn-plus"/>
            <img width="30" height="29" src="@/assets/img/icons/department.svg" alt="plus"
                 class="add-btn-plus department-icon"/>
          </span>
          <div @click="switchViews()" class="btn-img">
            <svg v-if="!isList" content="List mode"
                 v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                 class="switch-view switch-list"
                 width="23" height="16" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.76953" y="0.5" width="14.2305" height="1.76923" rx="0.884615"/>
              <rect x="4.76953" y="6.26953" width="14.2305" height="1.76923" rx="0.884615"/>
              <rect x="4.76953" y="12.0391" width="14.2305" height="1.76923" rx="0.884615"/>
              <circle cx="1.5" cy="1.5" r="1.5"/>
              <circle cx="1.5" cy="7.19922" r="1.5"/>
              <circle cx="1.5" cy="13" r="1.5"/>
            </svg>
            <svg content="Card mode" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" v-else
                 class="switch-view"
                 width="27" height="27" viewBox="32 27 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="32" y="27" width="11" height="11" rx="1"/>
              <rect x="48" y="27" width="11" height="11" rx="1"/>
              <rect x="32" y="43" width="11" height="11" rx="1"/>
              <rect x="48" y="43" width="11" height="11" rx="1"/>
            </svg>
          </div>

        </div>
        <ul class="sort-tabs">
          <li class="title-tabs">{{filterTitle}}</li>
          <li><label>
            <input @input="searchDepartments()" v-model="searchName" class="input-field" type="text"
                   placeholder="Name">
          </label></li>
          <li class="title-tabs" v-if="!isList">{{sortTitle}}</li>
          <li @click="indexAgent = 'true'" :ref="'true'" v-if="!isList" v-click-outside="hide">
            <label class="options-label">
              <input class="input-field num input-with-direction" type="text" :value="sortBy" readonly>
              <sort-direction :show="true" :is-desc="sortDirection" className="direction"/>
              <span @click="sortByShow = !sortByShow" class="triangle" :class="{'rotate-arrow': sortByShow}">
                <img src="../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <ul v-show="sortByShow" class="list-related-numbers">
                <li @click="sort('name', 'name')">Name
                  <sort-direction :show="sortBy === 'name'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('relatedWith.externalNumber.length', 'number')">Number
                  <sort-direction :show="sortBy === 'number'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('userCount', 'agents')">Agents
                  <sort-direction :show="sortBy === 'agents'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('belongTo.user.length', 'managers')">Managers
                  <sort-direction :show="sortBy === 'managers'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('dateUpdated', 'date updated')">Date Updated
                  <sort-direction :show="sortBy === 'date updated'" :is-desc="sortDirection"/>
                </li>
              </ul>
            </label>
          </li>
        </ul>

      </div>
      <Paginator v-show="getPaginatorDepartment.paginator.recordsPerPage" ref="paginator" perPage="9"
                 :paginator="getPaginatorDepartment.paginator"
                 :methods="{page: 'setDepPage',peerPage: 'setDepPerPage'}"/>
    </div>

    <div class="list-header-block"  v-if="isList">
      <ul class="list-header">
        <li class="list-header-item header-name" @click="sort('name', 'name')">
          Name
          <img ref="name" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-number" @click="sort('relatedWith.externalNumber.length', 'number')">
          Number
          <img ref="number" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-agents" @click="sort('userCount', 'agents')">
          Agents
          <img ref="agents" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-managers" @click="sort('belongTo.user.length', 'managers')">
          Managers
          <img ref="managers" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-create" @click="sort('dateUpdated', 'date updated')">
          Date Updated
          <img ref="date updated" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-settings"></li>
      </ul>
    </div>

    <div class="data-container" ref="dataContainer">
      <div v-if="deps.length">
        <div
          :class="{'dark-bottom': this.getPaginatorDepartment.paginator.recordsPerPage < this.getPaginatorDepartment.paginator.count}"
          class="deps" v-if="!isList">
          <div v-for="dep in deps" :key="dep.uid" class="dep-card">
            <span class="dots" @click="viewDepartment(dep)">
              <img src="@/assets/img/icons/points.svg"/>
            </span>
            <div class="static">
              <span class="dep-title">Name of Departments</span>
              <h4 class="name-title">
                <img @click="viewDepartment(dep)" content="Detail"
                     v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" width="24"
                     src="@/assets/img/icons/cogwheel.svg" alt="cogwheel" class="setting-btn">
                <span class="ellipsis">{{ dep.name }}</span>
              </h4>

            </div>
            <table>
              <tbody>
              <tr>
                <td>Numbers in Department:</td>
                <td>{{ dep.relatedWith.externalNumber.length }}</td>
              </tr>
              <tr>
                <td>Agents in Department:</td>
                <td>{{ dep.relatedWith.user.length }}</td>
              </tr>
              <tr>
                <td>Managers in Department:</td>
                <td>{{ dep.belongTo.user.length }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          :class="{'dark-bottom': this.getPaginatorDepartment.paginator.recordsPerPage < this.getPaginatorDepartment.paginator.count}"
          class="deps deps-list"
          v-else>
          <div v-for="dep in deps" :key="dep.uid" class="dep-card-list-block">
            <ul class="dep-card-list">
              <li class="dep-card-list-item item-name ellipsis">{{ dep.name }}</li>
              <li class="dep-card-list-item item-numbers">{{ dep.relatedWith.externalNumber.length }}</li>
              <li class="dep-card-list-item item-agents">{{ dep.relatedWith.user.length }}</li>
              <li class="dep-card-list-item item-managers">{{ dep.belongTo.user.length }}</li>
              <li class="dep-card-list-item item-create">{{ dep.dateUpdated }}</li>
              <li class="dep-card-list-item item-settings">
                <img content="Detail" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                     width="24" src="@/assets/img/icons/cogwheel.svg" alt="cogwheel" @click="viewDepartment(dep)"
                     class="setting-img">
                <span class="dots" @click="viewDepartment(dep)">
                  <img src="@/assets/img/icons/points.svg"/>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SortDirection from "@/components/sort-direction"
// import {DepartmentGettersApi} from '@/API/getters'
import sortArrow from "@/assets/img/icons/sort-arrow.png"
import Paginator from "@/components/Paginator"
import observables from "@/store/observable.mutations"
import ClickOutside from '@/lib/clickDirective'
import { mapGetters } from "vuex"
import {clientSort, serverSort} from '@/lib/sort.js'

export default {
  name: "Users",
  components: {Paginator, SortDirection},
  data() {
    return {
      unsubscribeStore: () => {
      },
      isList: false,
      sortBy: 'date updated',
      sortParam: {
        name: 'desc',
        number: 'asc',
        userCount: 'asc',
        managers: 'asc',
        'date updated': 'desc'
      },
      deps: [],
      users: [],
      sortArrow: sortArrow,
      searchName: '',
      sortByShow: false,
      getClientWidth: document.documentElement.clientWidth,
    }
  },
  watch: {
    getGlobalDepartments() {
      this.deps = this.getGlobalDepartments
    }
  },
  computed: {
    ...mapGetters(["getPaginatorDepartment", 'getGlobalSearch', 'getGlobalDepartments']),
    sortDirection: function () {
      return this.sortParam[this.sortBy] === 'desc'
    },
    filterTitle() {
      return this.getClientWidth <= 1504 ? 'Filter by:' : 'Filter by department:'
    },
    sortTitle() {
      return this.getClientWidth <= 1504 ? 'Sort by:' : 'Sort by department:'
    }
  },
  methods: {
    hide() {
      this.sortByShow = false
    },
    switchViews() {
      this.isList = !this.isList
    },
    onscroll() {
      window.addEventListener('scroll', this.funScroll)
    },
    deleteScroll() {
      window.removeEventListener('scroll', this.funScroll)
    },
    async funScroll() {
      if (this.getPaginatorDepartment.paginator.recordsPerPage < this.getPaginatorDepartment.paginator.count) {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 30
        if (bottomOfWindow) {
          if (this.getPaginatorDepartment.page !== Math.ceil(this.getPaginatorDepartment.paginator.count / this.getPaginatorDepartment.peerPage)) {
            this.$refs.paginator.setPeerPage(+this.getPaginatorDepartment.peerPage + 12)
          }
        }
      }
    },
    viewDepartment(dep) {
      this.$store.dispatch('setViewDepartmetn', dep)
      // DepartmentGettersApi.viewDepartment(dep.uid)
      // localStorage.setItem('depUid', dep.uid)
      // this.$router.push(`/config/departments/department-setting/${dep.name}`)
    },
    goToAddNewUserPage() {
      this.$store.dispatch('goToAddNewDepartmentPage')
      // this.$router.push("/config/departments/create-department")
    },
    sort(string, sortBy) {
      if (this.$refs[this.sortBy]) {
        this.$refs[this.sortBy].style.transform = ''
      }
      this.sortBy = sortBy
      if (string === 'name' || string === 'userCount' || string === 'dateUpdated') {
        const dataSort = serverSort(this.fetch, this.$refs[sortBy],this.sortParam[sortBy], this.getPaginatorDepartment.peerPage, string, this.getPaginatorDepartment.page)
        this.sortParam[sortBy] = dataSort.order
        this.$refs[sortBy] = dataSort.refArrow
      } else {
        const dataSort = clientSort(string, this.deps, this.$refs[sortBy], this.sortParam[sortBy])
        this.deps = dataSort.array
        this.sortParam[sortBy] = dataSort.order
        this.$refs[sortBy] = dataSort.refArrow
      }
    },
    searchDepartments() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(this.getPaginatorDepartment?.peerPage || 9, this.sortBy, this.getPaginatorDepartment.page, 'asc', this.searchName), 800)
    },
    fetch(peerPage, sort, page = 1, order = 'asc', search = '') {
      let searchParam = ''
      if (this.getGlobalSearch.value && (this.getGlobalSearch.key === 'department' || this.getGlobalSearch.key === 'all')) {
        searchParam = this.getGlobalSearch.value
      } else {
        searchParam = search
      }
      this.$store.dispatch('setGlobalDepartmentsList', {peerPage, search: searchParam, sort, page, order})
    },
    windowResizeHandler() {
      this.getClientWidth = document.documentElement.clientWidth
    }
  },
  created() {
    this.fetch(9, this.sortBy)
    this.onscroll()
  },
  mounted() {
    window.addEventListener('resize', this.windowResizeHandler)
    this.unsubscribeStore = this.$store.subscribe((mutation) => {
      if (observables.paginator.departments.includes(mutation.type)) {
        this.fetch(this.getPaginatorDepartment.peerPage, this.sortBy, this.getPaginatorDepartment.page, 'asc')
      }
    })
    this.popupItem = this.$refs.true
  },
  beforeDestroy() {
    this.deleteScroll()
    this.unsubscribeStore()
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">

.get-users-page-container {
  position: relative;
  width: 100%;
}

.toolbar {
  margin-bottom: 12px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--toolbar-bg);
  padding-left: 5px;
  border-radius: 8px;
  height: 48px;
  position: relative;

  .btn-img {
    cursor: pointer;
    width: 57px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    justify-content: center !important;
    align-items: center;
    background-color: var(--paginator-bg);
    transition: transform .3s ease;
    margin-left: 6px;

    &:hover {
      transform: scale(1.1);
    }

    .switch-view {
      fill: var(--light-blue);
      outline: none;
    }
  }

  .bar-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .sort-tabs {
      .title-tabs {
        font-weight: 500;
        border-radius: 8px;
        color: var(--white);
      }
      .input-field {
        width: 120px;
        height: 24px;
        color: #FFFFFF;
        background: var(--scenario-vnumber-input-bg);
      }
      .options-label {
        .input-field {
          width: 120px;
          height: 24px;
          font-size: 16px;
          margin-top: 0;
          background: var(--scenario-vnumber-input-bg);
          text-transform: capitalize;
          color: white;

          &.input-with-direction {
            padding-right: 35px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .direction {
          position: absolute;
          right: 35px;
          top: calc(50% - 9px);
        }
        .triangle {
          width: 113px;
          height: 24px;
          bottom: 5px;
        }

        .list-related-numbers {
          width: 120px;
          background: var(--scenario-vnumber-input-bg);

          li {
            border-radius: 0;
            margin-right: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
      li {
        position: relative;
      }
    }
  }

  .btn-img-department {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    cursor: pointer;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
    width: 125px;

    .add-btn-dep {

      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--paginator-bg);
      border-radius: 8px;
      padding: 7px 7px 0 7px;
      width: 57px;
      max-width: 57px;
      height: 48px;
      transition: 0.3s;

      &:hover {
        transform: scale(1.1);
      }

      .add-btn-plus {
        margin-right: 0;
        margin-top: -5px;
      }

      .add-btn {
        margin-top: 10px;
      }

      .department-icon {
        margin-top: -7px;
      }
    }

    img:nth-child(1) {
      margin-right: 5px;
    }
  }
}

.list-header-block {
  background: #276899;
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 35px;
  padding-right: 26px;
  margin-bottom: 17px;

  .list-header {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .list-header-item {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
  }

  .header-name {
    width: 20%;
    text-align: left;
  }

  .header-number {
    width: 10%;
    text-align: center;
  }

  .header-agents {
    width: 20%;
    text-align: center;
  }

  .header-managers {
    width: 15%;
    text-align: center;
  }

  .header-create {
    text-align: center;
    width: 25%;
  }

  .header-settings {
    display: block;
    width: 10%;
    position: relative;
    height: 16px;
  }
}

.data-container p {
  padding: 24px;
}

.deps {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;

  &.dark-bottom {
    position: relative;
  }

  .dep-card {
    width: calc((100% - 40px) / 3);
    padding: 27px 34px 134px;
    background: var(--substrate);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border: 2px solid var(--cdr-border-row);
    border-radius: 4px;
    position: relative;
    height: 230px;

    .dots {
      position: absolute;
      top: 12px;
      right: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 20px;
    }

    .static {
      margin-bottom: 34px;
      position: relative;

      h4 {
        color: var(--font-panel);
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        width: 100%;
        height: 2px;
        background: var(--line-dep-queue);
        border-radius: 2px;
      }
    }

    .dep-title {
      display: inline-block;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
      color: #8B9095;
      margin-bottom: 8px;
    }

    .name-title {
      .ellipsis {
        margin-left: 8px;
        max-width: 176px;
      }
    }

    h4 {
      font-size: 32px;
      font-weight: 300;

      .setting-btn {
        transition: .3s ease;
        transform: scale(1, 1);
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);

        &:hover {
          transition: .3s ease;
          transform: scale(1.3, 1.3);
        }
      }
    }

    td {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
      color: #8B9095;

      &:nth-child(2) {
        padding-left: 50px;
        color: var(--font-panel);
      }
    }
  }
}

.deps-list {
  gap: 4px;

  .dep-card-list-block {
    padding-left: 35px;
    padding-right: 26px;
    width: 100%;
    display: flex;
    align-items: center;
    background: var(--substrate);
    border: 2px solid var(--cdr-border-row);
    box-sizing: border-box;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);
    height: 52px;
    margin-bottom: 4px;

    .dep-card-list {
      display: flex;
      width: 100%;

      &-item {
        color: var(--font-panel);
      }

      .item-name {
        width: 20%;
        align-items: flex-start;
      }

      .item-numbers {
        width: 10%;
        text-align: center;
      }

      .item-agents {
        width: 20%;
        text-align: center;
      }

      .item-managers {
        width: 15%;
        text-align: center;
      }

      .item-create {
        width: 25%;
        text-align: center;
      }

      .item-settings {
        width: 10%;
        text-align: right;
        position: relative;
        padding-right: 50px;

        .dots {
          height: 20px;
          display: flex;
          align-items: center;
          position: absolute;
          transform: rotate(90deg);
          top: 4px;
          right: -7%;
          cursor: pointer;
        }
      }

      .setting-img {
        transition: .3s ease;
        transform: scale(1, 1);
        cursor: pointer;

        &:hover {
          transition: .3s ease;
          transform: scale(1.3, 1.3);
        }
      }
    }
  }
}


.deps button {
  background: transparent;
  color: #6d6d6d;
  text-transform: uppercase;
  border: 1px solid #6d6d6d;
  border-radius: 2px;
  font-size: 14px;
  line-height: 16px;
}

.toolbar {
  padding: 24px 0;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

}

.btn-add {
  border: none;
  padding: 10px 12px 10px 46px;
  font-weight: 500;
  font-size: 18px;
  background: var(--light-blue);
  border-radius: 8px;
  color: var(--white);
  cursor: pointer;
  outline: none;
  position: relative;
  transition: all 0.5s ease-out;
}

.btn-add:hover {
  background: #386e97;
}

.btn-add:before {
  content: "";
  left: 12px;
  position: absolute;
  background-image: url("../../../assets/img/icons/upload-img-plus.svg");
  width: 24px;
  height: 24px;
}

.spinner {
  position: fixed;
  bottom: 50px;
  left: 270px;
  width: 50px;
  height: 50px;
  z-index: 10;
  animation: 1s linear 0s rotate infinite;

  img {
    width: 100%;
    height: 100%;

  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 2561px) {

  .deps {
    .dep-card {
      width: calc((100% - 80px) / 5);
    }
  }
}

@media (max-width: 2560px) {
  .deps {
    .dep-card {
      width: calc((100% - 60px) / 4);
    }
  }
}

@media (max-width: 2100px) {

  .deps {
    .dep-card {
      width: calc((100% - 40px) / 3);
    }
  }
}

@media (max-width: 1920px) {
  .deps {
    .dep-card {
      width: calc((100% - 40px) / 3);
    }
  }
}

@media (max-width: 1408px) {
  .deps {
    .dep-card {
      width: calc((100% - 20px) / 2);
    }
  }
}

</style>
