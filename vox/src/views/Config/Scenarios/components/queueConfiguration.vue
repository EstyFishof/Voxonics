<template>
  <ConfigurationWrapper
    title="Queue Configuration"
    :isRemovedItem="isRemovedItem"
    :ivrKey="getIVRKey"
  >
    <div class="body" v-click-outside="hide" @click="hideListOptions(); indexFilter='false'">

      <ChooseItemSchemeComponent
        title="Select type"
        @setItemScheme="setType"
        currentSchemeType="queue"
        currentSchemeTitle="Queue"
        :canToggleShowList="true"
        :ivrKey="getIVRKey"
      >
        <template v-slot:ivr-key>
          <IVRKeyInput
            v-if="getItemScenario.extra && getItemScenario.extra.hasOwnProperty('ivr')"
            :valueFromStore="getIVRKey"
            @updateItem="updateItem"
            propertyName="extra.ivr"
          />
        </template>
        <template v-slot:config>
          <div class="options-block">
            <label class="options-label" :ref="'queue'" @click="indexFilter = 'queue'">
              <span class="options-title">Please select a queue</span>
              <input class="input-field num" type="text" :value="inputUserValue" @input="searcQueues($event.target.value)">
              <span @click="setShowList('queue')" class="triangle" :class="{'rotate-arrow': showOption === 'queue'}">
                <img src="../../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <DropdownList v-show="showOption === 'queue'" :classNameList="'list-related-numbers'"
                    :dataList="getGlobalQueuesList" @scrollFunc="event => funScroll(event)" @clickFunc="(item) => chooseQueue(item)"
                    :classNameItemComputed="(item) => item.internalNumber === queue.internalNumber ? 'active-item' : ''"
                    :itemText="(item) => `${item.name} ${item.internalNumber}`" />

            </label>
          </div>

          <InputTimeBlock
            title="Please select a max dial time"
            :valueFromStore="getItemScenario.options.maxWait"
            @updateItem="updateItem"
            propertyName="options.maxWait"
          />

          <SwitchBlock
            title="Change MOH"
            :valueFromStore="getItemScenario.options.moh"
            @updateItem="updateItem"
            propertyName="options.queueMoh"
          />         
        </template>
      </ChooseItemSchemeComponent>

    </div>
  </ConfigurationWrapper>
</template>
<script>
import { mapGetters } from "vuex"
import DropdownList from '@/components/DropdownList'
import ClickOutside from "vue-click-outside" 
import { clickCheck } from '@/lib/clickCheck.js'
import ConfigurationWrapper from "./components/ConfigurationWrapper.vue"
import ChooseItemSchemeComponent from "./components/ChooseItemSchemeComponent.vue"
import InputTimeBlock from "./components/InputTimeBlock.vue"
import _ from 'lodash'
import SwitchBlock from "./components/SwitchBlock.vue"
import IVRKeyInput from "./components/IVRKeyInput.vue"

export default {
  name: 'queueConfiguration',
  components: {
    DropdownList,
    ConfigurationWrapper,
    ChooseItemSchemeComponent,
    InputTimeBlock,
    SwitchBlock,
    IVRKeyInput
},
    data() {
      return {
        showOption: '',
        queue: {},
        type: 'Dial Queue/Agent',
        indexFilter: '',
        perPage: 9,
        name: '',
        timer: null,
        unsubscribe: () => {}
      }
    },
    computed: {
       ...mapGetters(['getGlobalQueuesList', 'getItemScenario', 'getShowConfig', 'getPaginatorQueues']),
      inputUserValue() {
        if(this.showOption === 'queue') {
          return this.name
        } else {
          return this.queue.name ? `${this.queue.name} ( ${this.queue.internalNumber} )` : ''
        }
      },
      isRemovedItem() {
        return !['invalid', 'timeout'].includes(this.getItemScenario?.extra?.ivr)
      },
      getIVRKey() {
        return this.getItemScenario?.extra?.ivr ?? ''
      }
    },
    methods: {
      searcQueues(value) {
        this.name = value
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.fetch(), 800)
      },
      funScroll({target}) {
        if(target.clientHeight + target.scrollTop === target.scrollHeight) {
          if (this.getPaginatorQueues.paginator.count > this.perPage) {
            this.perPage += 9
            this.fetch()
          }
        }
      },
      fetch() {
        this.$store.dispatch('setGlobalQueuesList', {peerPage: this.perPage, sort: 'name', order: 'asc', search: this.name})
      },
      chooseQueue(queue) {
        this.updateItem('options.name', queue.name)
        this.updateItem('options.number', queue.internalNumber)
        this.setOptions('queue', queue)
      },
      setShowList(value) {
        if(this.showOption === value) {
          this.showOption = ''
        } else {
          this.showOption = value
        }
        value === 'queue' ? this.fetch() : null
      },
      setOptions(options, value) {
        this.showOption = ''
        this[options] = value
      },
      hideListOptions() {
        clickCheck(this, this.indexFilter, this.$refs)
      },
      hide() {
        this.showOption = ''
      },
      setType(param) {
        this.$store.dispatch('setShowConfig', param)
        this.$store.dispatch('updateExistingScenarioItem', {...this.getItemScenario, schema: param})
      },
      updateItem(param, value) {
        this.$store.dispatch(
          'updateExistingScenarioItem',
          _.set({...this.getItemScenario, schema: 'queue'}, param, value)
        )
      },
      setQueue() {
        this.queue = {name: this.getItemScenario?.options?.name || '', internalNumber: this.getItemScenario?.options?.number}
      },
    },
    mounted() {
      this.setQueue()
      this.unsubscribe = this.$store.subscribe(mutation => {
        if(mutation.type === 'addItemScenMutation') {
          this.queue = {}
        } else if(mutation.type === 'setItemMutation') {
          this.getShowConfig === 'queue' ? this.setQueue() : null
        }
      })
      this.popupItem = this.$el.children[1]
    },
    beforeDestroy() {
      this.unsubscribe()
    },
    directives: {
      ClickOutside,
    },
}
</script>
<style lang="scss" scoped>
.body{
  display: flex;
  justify-content: flex-start;
  padding-left: 26px;
  margin-bottom: 34px;

  .options-block{
    position: relative;

    &:not(:last-child) {
      margin-right: 35px;
    }

    .options-label {
      font-size: 19px;
      line-height: 22px;
      color: var(--font-panel);

      .input-field {
        margin-top: 8px;
        display: block;
        padding: 5px 12px;
        width: 234px;
        height: 47px;
        color: var(--white);
        font-weight: normal;
        font-size: 19px;
        line-height: 22px;

        background: var(--scenario-vnumber-input-bg);
        border: 2px solid var(--scenario-option-bg);
        box-sizing: border-box;
        box-shadow: 0 7px 16px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
      }

      .triangle {
        width: calc(99% - 7px);
        height: 47px;
        bottom: 0px;
      }

      .list-related-numbers {
        height: 82px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>
