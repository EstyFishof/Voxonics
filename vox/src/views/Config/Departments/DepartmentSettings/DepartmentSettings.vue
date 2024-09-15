<template>

  <div class="wrap-main-department">

    <div class="wrap-form">
      <form @submit.prevent>
        <DepartmentInfo/>
        <div class="tabs">
          <div class="left-tabs">
            <div @click="setShowOptions('agents')" :class="{active: showOptions === 'agents'}" class="tab">
              Agents in Department
            </div>
            <div @click="setShowOptions('managers')" :class="{active: showOptions === 'managers'}" class="tab">
              Managed by
            </div>
            <div @click="setShowOptions('numbers')" :class="{active: showOptions === 'numbers'}" class="tab">
              V-Numbers in Department
            </div>
          </div>
          <div class="right-tabs">
            <ControlPanel :show="showApplyBtn" :apply="handlerSubmit" :discard="clearDepartment"/>
          </div>
        </div>
        <template v-if="showOptions === 'agents'">
          <AgentSetting/>
          <DeleteComponent @deleteFunc="deleteDepartment" @cancelDeleteFunc="cancelDelete" :deleteInfo="getDeleteDep"
                           :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="227"/>
        </template>
        <template v-if="showOptions === 'managers'">
          <ManagerSettings/>
          <DeleteComponent @deleteFunc="deleteDepartment" @cancelDeleteFunc="cancelDelete" :deleteInfo="getDeleteDep"
                           :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="227"/>
        </template>
        <template v-if="showOptions === 'numbers'">
          <VNumbersSetting/>
          <DeleteComponent @deleteFunc="deleteDepartment" @cancelDeleteFunc="cancelDelete" :deleteInfo="getDeleteDep"
                           :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="227"/>
        </template>
      </form>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import DepartmentInfo from './components/DepartmentInfo'
import AgentSetting from './components/AgentsSettings'
import ManagerSettings from './components/ManagersSettings'
import VNumbersSetting from './components/NumbersSettings'
import DeleteComponent from '@/components/DeleteComponent'
import store from '../../../../store'
import observables from '../../../../store/observable.mutations'
import _ from 'lodash'
import ControlPanel from '../../../../components/ControlPanel'

export default {
  name: 'DepartmentSetting',
  components: {ControlPanel, VNumbersSetting, ManagerSettings, AgentSetting, DepartmentInfo, DeleteComponent},
  data() {
    return {
      unsubscribeStore: () => {
      },
      showOptions: 'agents',
      showApplyBtn: false,
      textToDeleteComponent: 'Are you sure you want to delete this Department ?',
      titleToDeleteComponent: 'Delete Department'
    }
  },
  computed: {
    ...mapGetters(['departmentInfo', 'getInitialDep', 'getDeleteDep']),
  },
  methods: {
    setShowOptions(param) {
      this.showOptions = param
      this.$store.dispatch('viewDepartment', this.departmentInfo.uid)
    },
    cancelDelete() {
      this.$store.dispatch('setDeleteDep', false)
    },
    deleteDepartment() {
      this.$store.dispatch('deleteDepartment', localStorage.getItem('depUid'))
      this.$store.dispatch('setDeleteDep', false)
    },
    handlerSubmit() {
      this.$store.dispatch('updateDepartment', this.departmentInfo)
    },
    clearDepartment() {
      this.$store.dispatch('viewDepartment', this.departmentInfo.uid)
    },
    isEqual() {
      const depWithoutObs = JSON.parse(JSON.stringify(this.departmentInfo))
      const initialDepWithoutObs = JSON.parse(JSON.stringify(this.getInitialDep))
      depWithoutObs.relatedWith.user = _.orderBy(depWithoutObs.relatedWith.user, ['internalNumber'], ['desc'])
      depWithoutObs.relatedWith.externalNumber = _.orderBy(depWithoutObs.relatedWith.externalNumber, ['number'], ['desc'])
      depWithoutObs.belongTo.user = _.orderBy(depWithoutObs.belongTo.user, ['internalNumber'], ['desc'])
      initialDepWithoutObs.relatedWith.user = _.orderBy(initialDepWithoutObs.relatedWith.user, ['internalNumber'], ['desc'])
      initialDepWithoutObs.relatedWith.externalNumber = _.orderBy(initialDepWithoutObs.relatedWith.externalNumber, ['number'], ['desc'])
      initialDepWithoutObs.belongTo.user = _.orderBy(initialDepWithoutObs.belongTo.user, ['internalNumber'], ['desc'])
      this.showApplyBtn = !_.isEqual(depWithoutObs, initialDepWithoutObs)
    }
  },
  mounted() {
    if (this.$route.query.exact) {
      this.showOptions = this.$route.query.exact
    }
    const id = localStorage.getItem('depUid')
    this.$store.dispatch('viewDepartment', id)
    this.unsubscribeStore = store.subscribe((mutation) => {
      if (observables.departments.includes(mutation.type)) {
        this.isEqual()
      } else if (mutation.type === 'pushDepartment') {
        this.showApplyBtn = false
      }
    })
  },
  beforeDestroy() {
    this.unsubscribeStore()
    this.$store.dispatch('setDeleteDep', false)
  },
}
</script>
<style lang="scss">
.wrap-main-department {
  position: relative;

  .trash {
    position: absolute;
    top: 150px;
    right: 50px;
    cursor: pointer;

    &:active {
      transform: scale(0.95);
    }
  }

  .header {
    padding: 24px;
    width: 100%;
    border-radius: 8px 8px 0 0;

    img {
      margin-bottom: -5px;
    }

    span {
      margin-left: 12px;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
    }
  }


  .wrap-form {
    background: var(--substrate);
    padding: 24px 0 0 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
    border: 2px solid var(--cdr-border-row);
    border-radius: 8px;

    .tabs {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding-left: 36px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);

      .left-tabs, .right-tabs {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;

        .tab {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 19px;
          color: #8B9095;
          white-space: nowrap;
          padding: 5px;
          cursor: pointer;
          margin: 0 10px;

          &.active {
            background: var(--light-blue);
            border-radius: 4px 4px 0 0;
            color: var(--white);
          }
        }
      }
    }

    .btn-submit {
      display: block;
      margin: 0 auto;
      border: none;
      font-weight: 500;
      font-size: 18px;
      background: var(--light-blue);
      border-radius: 8px;
      color: var(--white);
      width: 165px;
      height: 48px;
      cursor: pointer;
      outline: none;
    }
  }

}
</style>
