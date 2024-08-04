<template>

  <div class="wrap-main-queue">

    <div class="wrap-form">
      <form @submit.prevent>
        <QueueInfo/>
        <div class="tabs">
          <div class="left-tabs">
            <div @click="setShowOptions('config')" :class="{active: showOptions === 'config'}" class="tab">
              Settings
            </div>
            <div @click="setShowOptions('agents')" :class="{active: showOptions === 'agents'}" class="tab">
              Agents in Queue
            </div>
            <div @click="setShowOptions('managers')" :class="{active: showOptions === 'managers'}" class="tab">
              Managed by
            </div>
          </div>
          <div class="right-tabs">
            <ControlPanel :show="showApplyBtn" :apply="handlerSubmit" :discard="clearDepartment" />
          </div>
        </div>
        <template v-if="showOptions === 'config'">
          <ConfigSettings/>
          <DeleteComponent @deleteFunc="deleteQueue" @cancelDeleteFunc="cancelDelete" :deleteInfo="getDeleteQueueInfo" :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="227" />
        </template>
        <template v-if="showOptions === 'agents'">
          <AgentSetting/>
          <DeleteComponent @deleteFunc="deleteQueue" @cancelDeleteFunc="cancelDelete" :deleteInfo="getDeleteQueueInfo" :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="227" />
        </template>
        <template v-if="showOptions === 'managers'">
          <ManagerSettings/>
          <DeleteComponent @deleteFunc="deleteQueue" @cancelDeleteFunc="cancelDelete" :deleteInfo="getDeleteQueueInfo" :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="227" />
        </template>
      </form>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex"
import {QueueSettings} from "../../../../lib/parse.queues"
import QueueEffects from '../../../../API/effects/Queues.api'
import {QueuesGettersApi} from '../../../../API/getters'
import QueueInfo from "./components/QueueInfo"
import AgentSetting from "./components/AgentsSettings"
import ManagerSettings from "./components/ManagersSettings"
import ConfigSettings from './components/ConfigSettings'
import DeleteComponent from '@/components/DeleteComponent'
import observables from "../../../../store/observable.mutations"
import _ from 'lodash'
import ControlPanel from "../../../../components/ControlPanel"

export default {
  name: "QueueSetting",
  components: { ControlPanel, AgentSetting, QueueInfo, ConfigSettings, DeleteComponent, ManagerSettings },
  data() {
    return {
      unsubscribe: ()=>{},
      showOptions: 'config',
      showApplyBtn: false,
      textToDeleteComponent: 'Are you sure you want to delete this Queue ?',
      titleToDeleteComponent: 'Delete Queue',
    }
  },
  computed: {
    ...mapGetters(['getQueueInfo', 'getDeleteQueueInfo', 'getInitialQueue', 'getDeleteQueueInfo']),
  },
  methods: {
    setShowOptions(param) {
      this.showOptions = param
      QueuesGettersApi.viewQueue(this.getQueueInfo.uid)
    },
    cancelDelete() {
      this.$store.dispatch('setDeleteQueueInfo', false)
    },
    deleteQueue() {
      QueueEffects.deleteQueue(localStorage.getItem('queueUid'))
      this.$store.dispatch('setDeleteQueueInfo', false)
    },
    handlerSubmit() {
      const form = JSON.parse(JSON.stringify(this.getQueueInfo))//избавляемся от обзерверов
      const dep = QueueSettings(form)
      QueueEffects.updateQueue(dep)
    },
    clearDepartment() {
      QueuesGettersApi.viewQueue(this.getQueueInfo.uid)
    },
    isEqual() {
      let queueWithoutObs = JSON.parse(JSON.stringify(this.getQueueInfo))
      let initialQueueWithoutObs = JSON.parse(JSON.stringify(this.getInitialQueue))
      
      queueWithoutObs.relatedWith = _.map(queueWithoutObs.relatedWith, object => _.omit(object, 'option'))
      queueWithoutObs.belongTo = _.map(queueWithoutObs.belongTo, object => {
        object.option.edit = !!object.option.edit
        return object
      })
      queueWithoutObs.belongTo = _.orderBy(queueWithoutObs.belongTo, ['internalNumber'], ['desc'])
      
      initialQueueWithoutObs.relatedWith = _.map(initialQueueWithoutObs.relatedWith, object => _.omit(object, 'option'))
      initialQueueWithoutObs.belongTo = _.map(initialQueueWithoutObs.belongTo, object => {
        object.option.edit = !!object.option.edit
        return object
      })
      initialQueueWithoutObs.belongTo = _.orderBy(initialQueueWithoutObs.belongTo, ['internalNumber'], ['desc'])
      this.showApplyBtn = !_.isEqual(initialQueueWithoutObs, queueWithoutObs)
    }
  },
  mounted() {
    const id = localStorage.getItem('queueUid')
    QueuesGettersApi.viewQueue(id)
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (observables.queues.includes(mutation.type)) {
        this.isEqual()
      } else if (mutation.type === 'queueInfoMutation') {
        this.showApplyBtn = false
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
    this.$store.dispatch('setDeleteQueueInfo', false)
  }
}
</script>
<style lang="scss">
.wrap-main-queue {
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
    box-sizing: border-box;
    border-radius: 0;
    border: 2px solid var(--cdr-border-row);
    border-radius: 8px;

    .tabs {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding-left: 36px;

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

//<<<<<<<<<<<<<---Для вложеных компонентов--->>>>>>>>>>>>>>>>
.wrap-head {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  .arrow {
    width: 15px;
    min-width: 15px;
    margin-right: 14px;
    transition: .3s;

    &.down {
      transform: rotate(-90deg);
    }
  }

  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 48px;
    font-weight: 700;
    white-space: nowrap;
    margin-right: 24px;
  }
}

.hr {
  display: block;
  height: 2px;
  width: 100%;

  &.line {
    margin: 36px 0 0 24px;
    max-width: 100%;
    flex-basis: 972px;
  }
}

@media (max-width: 1920px) {
  .wrap-main-queue {
    width: 1479.41px;
  }
}

@media (max-width: 1780px) {
  .wrap-main-queue {
    width: 1330px;
  }
}

@media (max-width: 1600px) {
  .wrap-main-queue {
    width: 1230px;
  }
}

@media (max-width: 1504px) {
  .wrap-main-queue {
    width: 1130px;
  }
}

@media (max-width: 1408px) {
  .wrap-main-queue {
    width: 1006px;
  }
}

</style>
