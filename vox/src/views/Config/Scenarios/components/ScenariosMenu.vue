<template>
  <ul class="top-tabs">
    <li class="new">
      <span
        class="new-scenario"
        @click="changeMode = !changeMode"
        content="Add new scenario"
        v-tippy="{ placement: 'top', arrow: true, delay: 500, duration: 500 }" >
        <img src="@/assets/img/icons/new-scenario.svg" alt="new"/>
      </span>
    </li>

    <GrabScrolling>
      <ul class="drop-list">
        <li
          v-for="item of getListScenarios.filter(scen => scen.path.split('/').length === 2)"
          :class="{ active: activeTab.split('/')[1] === item.path.split('/')[1] && activeTab.split('/').length === 2, 'active-child-item': activeTab.split('/')[1] === item.path.split('/')[1] && activeTab.split('/').length }"
          class="parent-tab"
          :key="item.path"
          v-show="!deleteScenarios.includes(item.uid)" >
          <span class="parent-tab-span">
            <input
              class="item-input"
              type="text"
              maxlength="16"
              :value="item.path.split('/')[1]"
              :readonly="readonly !== item.uid"
              @dblclick="changeName(item.uid)"
              @click.stop="changeActiveScenario(() => setScenario(item), item)"
              @blur="readonly = ''"
              @change="setName($event.target.value, item)"
              :content="item.path.split('/')[1]"
              v-tippy="{ placement: 'top', arrow: true, delay: 500, duration: 500 }" />
          </span>
          <span class="delete-scenario" @click="deleteScenario(item, 'parent')" v-if="changeMode">
            <img src="@/assets/img/icons/red-cross.svg" width="20" height="20"/>
          </span>
          <svg
            class="child-scenario-arrow"
            v-if="activeTab.split('/')[1] === item.path.split('/')[1] && activeTab.split('/').length > 2"
            width="18"
            height="9"
            viewBox="0 0 18 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg" >
            <path
              d="M2 1L8.29289 7.29289C8.68342 7.68342 9.31658 7.68342 9.70711 7.29289L16 1H9H2Z"
              fill="#AABAD4"
              stroke="#276899"/>
          </svg>
          <NestedScenarioMenuItem
            :tab="item"
            :changeMode="changeMode"
            :getScenario="getScenario"
            :name="name"
            @setNewScenarioProp="changeActiveScenario((name) => setNewScenario(name), {})"
            :activeTab="activeTab"
            :listScenarios="getListScenarios.filter(scen => scen.path.split('/').length === 3 && !deleteScenarios.includes(scen.uid))"
            :readonly="readonly"
            @setReadonlyProp="setReadonly"
            @changeActiveScenarioProp="(item) => changeActiveScenario(() => setScenario(item), item)"
            @setNameProp="setName"
            @deleteScenarioProp="deleteScenario"
            @changedItemProp="changeName"
          />
        </li>
      </ul>
    </GrabScrolling>

    <li class="parent-tab new-scenario-item" v-if="changeMode">
      <input v-model="name.mainName" maxlength="16" placeholder="Enter name..."/>
      <span class="set-name" :class="{'disabled-set-name': !name.mainName.length}" @click="changeActiveScenario(() => setNewScenario(name.mainName), {})">
        <img src="@/assets/img/icons/selected.svg" width="14" height="14"/>
      </span>
    </li>
    <li class="parent-tab duplicate-item" :class="{'duplicate-active': getScenario}" :style="{color: getDuplicateIconAndTextColor.color}" v-if="changeMode" @click="copyScenario">
      Duplicate
      <img :src="getDuplicateIconAndTextColor.icon"/>
    </li>
  </ul>
</template>
<script>
import _ from 'lodash'

import duplicateIconWhite from '@/assets/img/icons/duplicate-icon-white.svg'
import duplicateIconBlue from '@/assets/img/icons/duplicate-icon-blue.svg'
import { Drag, DropList } from 'vue-easy-dnd'
import NestedScenarioMenuItem from './ScenarioMenu/NestedScenarioMenuItem.vue'
import { mapGetters } from 'vuex'
import { getRelatedScenarios } from '../../../../lib/parse.scenarios'
import GrabScrolling from '../../../../components/GrabScrolling.vue'
export default {
  name: 'ScenariosMenu',
  components: {
    Drag,
    DropList,
    NestedScenarioMenuItem,
    GrabScrolling
},
  props: [
    'getScenario',
    'deleteScenarios',
    'setDeleteScenarios',
    'confirmationConfig',
    'confirmationToDeleteConfig',
    'changeConfirmationConfig',
    'confirmationValue',
    'setConfirmationValue',
    'showApplyBtn',
    'setShowApplyBtn',
    'getListScenarios',
    'getInitialList',
    'setScenarioProp'
  ],
  data() {
    return {
      changeMode: false,
      readonly: '',
      activeTab: '',
      name: {
        mainName: '',
        secondaryName: ''
      },
      icons: {
        duplicateIconWhite,
        duplicateIconBlue
      },
      listScenarios: []
    }
  },
  watch: {
    getScenario() {
      this.activeTab = this.getScenario?.path ?? ''
    },
    getListScenarios: {
      handler(){
        this.listScenarios = this.getListScenarios.filter(scen => scen.path?.split('/').length === 2)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['theme']),
    getDuplicateIconAndTextColor() {
      if(this.theme === 'dark') {
        return {icon: this.icons.duplicateIconWhite, color: '#FFFFFF'}
      }
      if(this.theme === 'light' && this.getScenario) {
        return {icon: this.icons.duplicateIconWhite, color: '#FFFFFF'}
      }
      return {icon: this.icons.duplicateIconBlue, color: '#276899'}
    }
  },
  methods: {
    setReadonly(value) {
      this.readonly = value
    },
    copyScenario() {
      this.$store.dispatch('copyScenario', this.getScenario)
    },
    reorderHandler(event) {
      event.apply(this.getListScenarios)
      event.apply(this.getInitialList)
      this.$store.dispatch('setSortedArrayOfUids')
    },
    changeActiveScenario(method, item) {
      if(this.showApplyBtn && (item.uid !== this.getScenario.uid)) {
        this.$emit('changeConfirmationConfig', {textConfirmation: 'You have unsaved changes. Are you sure you want to switch?', executeBtnText: 'Confrim', execute: () => {method(); this.confirmationConfig.cancel()}})
        this.$nextTick(() => this.$store.commit('confirmationMutation', this.confirmationConfig))
        this.$emit('setConfirmationValue', item)
      } else {
        method()
      }
    },
    setScenario(scenario) {
      if (this.activeTab === scenario.path && !this.changeMode) {
        this.activeTab = ''
        this.$store.dispatch('selectCurrentScenario', null)
        return false
      }
      this.$emit('setDeleteScenarios', [])
      this.$emit('setShowApplyBtn', false)
      this.$store.commit('listScenariosMutation', this.getInitialList)
      this.$store.dispatch('selectCurrentScenario', scenario)
    },
    changeName(uid) {
      if (this.changeMode) this.readonly = uid
    },
    setName(valueProp, tab) {
      let value = JSON.parse(JSON.stringify(valueProp))
      !value.length ? value = tab.path.split('/')[tab.path.split('/').length - 1] : null
      this.$store.dispatch('setChangeNameScenario', value)
    },
    deleteScenario(item, position) {
      if (position === 'child') {
        this.childScenarioToDeleteArray(item)
      } else if (position === 'parent') {
        this.parentScenarioToDeleteArray(item)
      }
    },
    childScenarioToDeleteArray(item) {
      const delScenarios = JSON.parse(JSON.stringify(this.deleteScenarios))         
      delScenarios.push(item.uid)
      this.$emit('setDeleteScenarios', delScenarios)
    },
    parentScenarioToDeleteArray(item) {
      const relatedScenarios = getRelatedScenarios(this.getListScenarios, item)
      if(relatedScenarios.length > 1) {
        this.$emit('setConfirmationValue', {list: relatedScenarios, item})
        this.$nextTick(() => this.$store.commit('confirmationMutation', this.confirmationToDeleteConfig))
      } else if(relatedScenarios.length === 1) {
        const delScenarios = JSON.parse(JSON.stringify(this.deleteScenarios))         
        delScenarios.push(relatedScenarios[0].uid)
        this.$emit('setDeleteScenarios', delScenarios)
      }
    },
    setNewScenario(name) {
      let bool = false
      if (name.split('/').length > 1) {
        this.getInitialList.forEach(item => {
          if (item.path === `/${name.split('/')[0]}`) {
            bool = true
          }
        })
      } else {
        bool = true
      }
      if(!bool) {
        this.$emit('changeConfirmationConfig', {textConfirmation: 'To create a child script first save the parent.', executeBtnText: null})
        this.$nextTick(() => this.$store.commit('confirmationMutation', this.confirmationConfig))
        this.$emit('setConfirmationValue', null)
      }
      if (bool) {
        this.changeMode = false
        this.$store.dispatch('setNewScenario', name)
        this.name.mainName = ''
        this.name.secondaryName = ''
        this.activeTab = `/${name}`
        this.$emit('setShowApplyBtn', false)
      }
    },
  },
  mounted() {
    this.activeTab = this.getScenario?.path || ''
  }
}
</script>
<style lang="scss" scoped>
    .top-tabs {
      position: absolute;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      padding-left: 45px;
      height: 29px;
      width: 100%;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        left: 0;
        height: 2px;
        top: 28px;
        background: var(--line-scenario);
      }

      .new {
        .new-scenario {
          position: absolute;
          left: 0;
          top: 0;
          height: 29px;
          width: 34px;
          background: var(--toolbar-bg);
          border-radius: 6px 6px 0 0;
          padding: 2px 3px 3px 7px;
          cursor: pointer;
          z-index: 10;
        }
      }


      ::v-deep .grab-scrolling-wrapper {
        overflow-x: auto;
        overflow-y: hidden;
        padding-top: 13px;
        margin-top: -13px;
        padding-left: 3px;
        height: 63px;
        max-width: 900px;

        &::-webkit-scrollbar {
          height: 0px;
        }
      }
      .drop-list {
        display: flex;
      }

      .parent-tab {
        border-radius: 4px 4px 0 0;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: #ffffff;
        width: 130px;
        height: 29px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 11px;
        cursor: pointer;
        z-index: 10;
        position: relative;

        .parent-tab-span {
          width: 100%;
          height: 100%;
          border: 1px solid #276899;
          transform: scale(1);
          transition: all .3s ease-in-out;
          border-radius: 4px 4px 0 0;

          &:hover {
            transform: scale(1.05);
            transition: all .3s ease-in-out;
          }
        }

        .set-name {
          position: absolute;
          right: calc(0% - 10px);
          top: calc(0% - 10px);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #34b53a;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transform: scale(1);
          transition: transform .15s ease-in-out;

          &.disabled-set-name {
            opacity: 0.3;
            cursor: auto;
            pointer-events: none;
          }

          &:hover {
            transform: scale(1.1);
            transition: transform .15s ease-in-out;
          }

          img {
            border-radius: 50%;
            box-shadow: 0 8px 16px rgba(26, 18, 18, 0.25);
          }
        }

        &.active {
          
          .parent-tab-span{
            background: #276899;
          }

          .item-input {
            color: white;
          }
        }

        &.active-child-item {
          z-index: 100;
        }

        .item-input {
          background: none;
          border: none;
          outline: none;
          font-weight: 300;
          font-size: 16px;
          line-height: 19px;
          color: var(--scenario-tab-color);
          width: 130px;
          height: 29px;
          text-align: center;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          z-index: 1;
        }

        .delete-scenario {
          position: absolute;
          right: calc(0% - 10px);
          top: calc(0% - 10px);

          img {
            border-radius: 50%;
            box-shadow: 0 8px 16px rgba(26, 18, 18, 0.25);transform: scale(1);
            transition: all .3s ease-in-out;

            &:hover {
              transform: scale(1.2);
              transition: all .3s ease-in-out;
            }
          }
        }

        .child-scenario-arrow {
          position: absolute;
          top: 27.5px;
          left: 3px;
          z-index: 10;

          path {
            fill: #276899;
          }
        }
      }

      .new-scenario-item {
        border: 1px solid #276899;
        box-sizing: border-box;
        border-radius: 4px 4px 0 0;
        padding: 0;
        position: relative;
        z-index: 1;
        margin-left: 11px;

        input {
          width: 100%;
          height: 100%;
          background: none;
          color: var(--scenario-tab-color);
          outline: none;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          padding-left: 10px;
          border: 0;
        }
      }

      .duplicate-item {
        border: 1px solid #276899;
        box-sizing: border-box;
        border-radius: 4px 4px 0 0;
        padding: 0;
        position: relative;
        z-index: 1;
        margin-left: 40px;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        &.duplicate-active {
          background-color: #276899;
          color: white;
        }

        &::before { 
          content: '';
          height: 22px;
          width: 2px;
          background: #515960;
          position: absolute;
          border-radius: 4px;
          left: -14px;
          bottom: 0;
        }
      }
    }

@media (max-width: 1920px) {
  .top-tabs {
    ::v-deep .grab-scrolling-wrapper {
      max-width: 900px;
    }
  }
}

@media (max-width: 1780px) {
  .top-tabs {
    ::v-deep .grab-scrolling-wrapper {
      max-width: 760px;
    }
  }
}

@media (max-width: 1600px) {
  .top-tabs {
    ::v-deep.grab-scrolling-wrapper {
      max-width: 660px;
    }
  }
}

@media (max-width: 1504px) {
  .top-tabs {
    ::v-deep .grab-scrolling-wrapper {
      max-width: 570px;
    }
  }
}

@media (max-width: 1408px) {
  .top-tabs {
    ::v-deep .grab-scrolling-wrapper {
      max-width: 446px;
    }
  }
}
</style>
