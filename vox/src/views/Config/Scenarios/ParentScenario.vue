<template>
  <div class="wrapper" :style="{width: wrapperWidth}" :class="{'full-screen': fullScreen}">
    <div class="header">

      <ScenariosMenu
        ref="scenariosMenu"
        :getScenario="getScenario"
        :deleteScenarios="getArrayUidsOfDeleteScenarios"
        @setDeleteScenarios="setDeleteScenarios"
        :confirmationConfig="confirmationConfig"
        :confirmationToDeleteConfig="confirmationToDeleteConfig"
        @changeConfirmationConfig="changeConfirmationConfig"
        :confirmationValue="confirmationValue"
        @setConfirmationValue="setConfirmationValue"
        :showApplyBtn="showApplyBtn"
        @setShowApplyBtn="setShowApplyBtn"
        :getListScenarios="getListScenarios"
        :getInitialList="getInitialList"
        @setScenarioProp="setScenario"
      />
      
      <div class="right-tabs">
        <ControlPanel :show="showApplyBtn" :apply="applyChanges" :discard="clearChanges"/>
      </div>
      <div class="secondary-header"></div>
    </div>

    <div class="body" :style="{height: fullScreen ? '95%' : '90%'}">
      <span class="toggle-full-screen" @click="toggleFullScreen(!fullScreen)">
        <img v-if="!fullScreen" :src="theme === 'dark' ? icons.expandToFullScreenIcon : icons.expandToFullScreenIconLight" />
        <img v-else :src="theme === 'dark' ? icons.collapseFullScreenIcon : icons.collapseFullScreenIconLight" />
      </span>

      <div class="list-items" v-if="getScenario && getScenario.scenario">
        <Item @mountedItemProp="() => {}" :link="getScenario.scenario" :counter="counter" :hoverProp="false" />
      </div>

      <NewItemConfiguration v-if="getShowConfig === ''" class="configuration"/>
      <queueConfiguration v-else-if="getShowConfig === 'queue'" class="configuration"/>
      <dial-configuration v-else-if="getShowConfig === 'dial'" class="configuration"/>
      <vNumberConfiguration v-else-if="getShowConfig === 'vnumber-in'" class="configuration"/>
      <IVRConfiguration v-else-if="getShowConfig === 'ivr'" class="configuration" />
      <WaitConfiguration v-else-if="getShowConfig === 'wait'" class="configuration" />
      <AnnouncementConfiguration v-else-if="getShowConfig === 'announcement'" class="configuration" />
      <HangupConfiguration v-else-if="getShowConfig === 'hangup'" class="configuration" />
    </div>
  </div>
</template>

<script>
import Item from './Item'
import queueConfiguration from './components/queueConfiguration.vue'
import dialConfiguration from './components/dialConfiguration.vue'
import vNumberConfiguration from './components/vNumberConfiguration.vue'
import observables from '@/store/observable.mutations'
import { deleteCategory, parseNumbers, parseNextField, parseScenariosToBackEnd, validateScenario } from '@/lib/parse.scenarios'
import { mapGetters } from 'vuex'
import ControlPanel from '../../../components/ControlPanel'
import _ from 'lodash'
import IVRConfiguration from './components/IVRConfiguration.vue'
import WaitConfiguration from './components/waitConfiguration.vue'
import AnnouncementConfiguration from './components/AnnouncementConfiguration.vue'
import HangupConfiguration from './components/hangupConfiguration.vue'
import NewItemConfiguration from './components/newItemConfiguration.vue'

import expandToFullScreenIcon from '@/assets/img/icons/expand-to-full-screen-icon.svg'
import expandToFullScreenIconLight from '@/assets/img/icons/expand-to-full-screen-icon-light.svg'
import collapseFullScreenIcon from '@/assets/img/icons/collapse-icon.svg'
import collapseFullScreenIconLight from '@/assets/img/icons/collapse-icon-light.svg'

import ScenariosMenu from './components/ScenariosMenu.vue'

export default {
  name: 'ParentScenario',
  components: {
    ControlPanel,
    Item,
    queueConfiguration,
    dialConfiguration,
    vNumberConfiguration,
    IVRConfiguration,
    WaitConfiguration,
    AnnouncementConfiguration,
    HangupConfiguration,
    NewItemConfiguration,
    ScenariosMenu
},
  data() {
    return {
      confirmationValue: null,
      counter: 0,
      showApplyBtn: false,
      wrapperWidth: '100%',
      fullScreen: false,
      deleteScenarios: [],
      confirmationConfig: {
        execute: () => this.executeConfirnation(this.confirmationValue),
        executeBtnText: 'Confirm',
        cancel: () => this.closeModalConfirmation(),
        cancelBtnText: 'Close',
        titleText: 'Confirmation',
        textConfirmation: ''
      },
      confirmationToDeleteConfig: {
        execute: () => this.moveChildrenRelatedScenarios(this.confirmationValue),
        executeBtnText: 'Move elements',
        cancel: () => this.relatedScenariosToDeleteArray(this.confirmationValue),
        cancelBtnText: 'Delete all',
        titleText: 'Confirmation',
        textConfirmation: 'This scenario contains inner elements Are you sure you want to delete this scenario? You can delete it all or move inner elements on board.'
      },
      invalidModal: {
        execute: () => this.$store.commit('confirmationMutation', null),
        cancel: () => this.closeModalConfirmation(),
        cancelBtnText: 'Close',
        titleText: 'Error',
        textConfirmation: ''
      },
      icons: {
        expandToFullScreenIcon,
        expandToFullScreenIconLight,
        collapseFullScreenIcon,
        collapseFullScreenIconLight
      }
    }
  },
  watch: {
    getIsFullNavMenu() {
      setTimeout(() => {
        this.calcWrapperWidth()       
      }, 100);
    },
    getListScenarios: {
      handler() {
        const changedScenarios = []
        this.getInitialList.forEach(el => {
          const scenario = this.getListScenarios.find(item => item.uid === el.uid)
          if(JSON.stringify(el) !== JSON.stringify(scenario) && this.getScenario?.uid !== scenario?.uid) {
            changedScenarios.push(scenario)
          }
        })
        this.$store.commit('arrayOfScenariosWithChangedNameMutation', changedScenarios)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getListScenarios', 'getShowConfig', 'getScenario', 'getInitialList', 'getInitialScenario', 'getIsFullNavMenu', 'theme', 'getItemScenario', 'getArrayUidsOfDeleteScenarios', 'getArrayOfScenariosWithChangedName'])
  },
  methods: {
    setDeleteScenarios(value) {
      this.$store.commit('arrayUidsOfDeleteScenariosMutation', value)
    },
    setConfirmationValue(value) {
      this.confirmationValue = value
    },
    setShowApplyBtn(value) {
      this.showApplyBtn = value
    },
    changeConfirmationConfig(config) {
      this.confirmationConfig = {...this.confirmationConfig, ...config}
    },
    moveChildrenRelatedScenarios(confirmationValue) {
      const deleteScenariosLocal = JSON.parse(JSON.stringify(this.getArrayUidsOfDeleteScenarios))
      deleteScenariosLocal.push(confirmationValue.item.uid)
      this.setDeleteScenarios(deleteScenariosLocal)

      confirmationValue.list.filter(el => el.uid !== confirmationValue.item.uid).forEach(element => {
      const newName = '/' + element.path.split('/')[2]
       this.$store.dispatch('changeNameOfScenario', {newName, scenario: element})
      });
      return this.closeModalConfirmation()
    },
    relatedScenariosToDeleteArray(confirmationValue) {
      const deleteScenariosLocal = JSON.parse(JSON.stringify(this.getArrayUidsOfDeleteScenarios))
      deleteScenariosLocal.push(...confirmationValue.list.map(el => el.uid))
      this.setDeleteScenarios(deleteScenariosLocal)
      return this.closeModalConfirmation()
    },
    toggleFullScreen(value) {
      if(value) {
        this.$store.commit('isFullNavMenuMutation', false)
      } else {
        this.$store.commit('isFullNavMenuMutation', true)
      }
      this.fullScreen = value
      setTimeout(() => {
        this.calcWrapperWidth()       
      }, 100);
    },
    calcWrapperWidth() {
      if(this.fullScreen) {
        return this.wrapperWidth = `calc(100vw - ${this.$el?.getBoundingClientRect().left + 5}px)`
      }
      return this.wrapperWidth = '100%'
    },
    isValidScenario() {
      const valid = validateScenario(JSON.parse(JSON.stringify(this.getScenario)))

      if(valid) {
        this.invalidModal.textConfirmation = valid
        this.$store.commit('confirmationMutation', this.invalidModal)
      }
      return valid
    },
    applyChanges() {

      if(this.getArrayUidsOfDeleteScenarios.length) {
        this.$store.dispatch('deleteScenarios', this.getArrayUidsOfDeleteScenarios)
      }

      if (this.getScenario?.uid.split(' ')[0] === 'new' && !this.isValidScenario()) {
        this.$store.dispatch('createScenario', 
          parseNumbers(parseScenariosToBackEnd(JSON.parse(JSON.stringify(this.getScenario))))
        )
      }

      if(this.getArrayOfScenariosWithChangedName.length) {
        this.$store.dispatch('updateScenarioWithChangedName', this.getArrayOfScenariosWithChangedName)
      } 

      else if(this.getScenario?.uid && !this.isValidScenario()) {
        this.$store.dispatch('updateScenario', parseNumbers(parseScenariosToBackEnd(JSON.parse(JSON.stringify(this.getScenario)))))
      }

      this.showApplyBtn = false
    },
    executeConfirnation(value) {
      this.setScenario(value)
      this.closeModalConfirmation()
    },
    closeModalConfirmation() {
      this.confirmationConfig.textConfirmation = ''
      this.confirmationValue = null
      this.confirmationConfig.executeBtnText = null
      this.$store.commit('confirmationMutation', null)
    },
    setScenario(scenario) {
      this.$refs.scenariosMenu.setScenario(scenario)
    },
    async clearChanges() {
      await this.$store.dispatch('setListScenarios')
      this.setDeleteScenarios([])
      this.showApplyBtn = false
      this.$store.dispatch('setShowConfig', null)
      this.$store.dispatch('setScenario', this.getInitialList.filter(scen => scen.uid === this.getScenario?.uid)[0])
      this.$store.dispatch('setInitialScenario', this.getInitialList.filter(scen => scen.uid === this.getInitialScenario?.uid)[0])
    },
    isEqual() {
      const item = _.omit(
        parseNextField(parseNumbers(deleteCategory(JSON.parse(JSON.stringify(this.getScenario))))),
        'externalNumbers'
      )
      const initialItem = _.omit(
        parseNextField(parseNumbers(deleteCategory(JSON.parse(JSON.stringify(this.getInitialScenario))))),
        'externalNumbers'
      )

      this.showApplyBtn = !_.isEqual(item, initialItem) || this.getArrayUidsOfDeleteScenarios.length
    }
  },
  mounted() {
    this.$store.dispatch('setListScenarios')
    this.$store.dispatch('globalUsersListRequest', {peerPage: 9})

    this.$store.subscribe(mutation => {
      if (observables.scenarios.includes(mutation.type)) {
        this.isEqual()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 800px;

  &.full-screen {
    position: absolute;
    // top: 52px;
    top: 68px;
    background-color: var(--main-bg);
    left: 0;
    z-index: 10000;
    height: calc(100vh - 52px);
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    position: relative;
    z-index: 10;

    .secondary-header {
      display: block;
      width: 100%;
      height: 24px;
      background: var(--toolbar-bg);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      border-radius: 0 0 8px 8px;
    }
  }

  .right-tabs {
    position: absolute;
    right: 0;
    top: -2px;
    z-index: 10;
  }

  .body {
    height: 90%;
    background: var(--substrate);
    display: flex;
    flex-direction: column;
    border-radius: 0 0 10px 10px;
    position: relative;
    width: 100%;
    margin-top: -5px;

    .toggle-full-screen {
      position: absolute;
      z-index: 1000;
      right: 13px;
      top: 13px;
      cursor: pointer;
      transform: scale(1, 1);
      transition: transform .3s ease-in-out;

      &:hover {
        transform: scale(1.2, 1.2);
      }
    }

    .list-items {
      display: flex;
      overflow: auto;
      // width: 1499px;
      height: 488px;
      padding-left: 27px;
      padding-top: 150px;
      flex: 1;

      &::-webkit-scrollbar {
        background-color: var(--scroll-bg);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--scroll);
      }
    }

    .configuration {
      position: relative;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
