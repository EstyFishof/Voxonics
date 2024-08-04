<template>
  <ConfigurationWrapper
    title="IVR Configuration"
    :isRemovedItem="isRemovedItem"
  >
    <div class="body">
      <span ref="clickOutside" style="display: flex" v-click-outside="hide" @click="hideListOptions(); indexFilter='false'">

        <ChooseItemSchemeComponent
          title="Select type"
          @setItemScheme="setType"
          currentSchemeType="ivr"
          currentSchemeTitle="IVR"
          :ivrKey="getIVRKey"
          :canToggleShowList="true"
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
            
            <div class="section-wrappper">
              <FileBlock
                title="Main audio"
                :valueFromStore="getItemScenario.options.record"
                @updateItem="updateItem"
                propertyName="options.record"
              />

              <div class="bottom-block">
                <InputBlock
                  title="Timeout:"
                  :valueFromStore="getItemScenario.options.timeout"
                  @updateItem="updateItem"
                  propertyName="options.timeout"
                  measure="sec"
                />
                <InputBlock
                  title="Wait for digit:"
                  :valueFromStore="getItemScenario.options.digitsTimeout"
                  @updateItem="updateItem"
                  propertyName="options.digitsTimeout"
                  measure="sec"
                />
              </div>
            </div>

            <div class="section-wrappper horizontal-line">
              <FileBlock
                title="Timeout audio"
                :valueFromStore="getItemScenario.options.timeoutAnnouncement"
                @updateItem="updateItem"
                propertyName="options.timeoutAnnouncement"
              />

              <div class="bottom-block">
                <InputBlock
                  title="Timeout attempts:"
                  :valueFromStore="getItemScenario.options.timeoutAttempts"
                  @updateItem="updateItem"
                  propertyName="options.timeoutAttempts"
                />
              </div>
            </div>

            <div class="section-wrappper horizontal-line">
              <FileBlock
                title="Invaild audio"
                :valueFromStore="getItemScenario.options.invalidAnnouncement"
                @updateItem="updateItem"
                propertyName="options.invalidAnnouncement"
              />

              <div class="bottom-block">
                <InputBlock
                  title="Invaild attempts:"
                  :valueFromStore="getItemScenario.options.invalidAttempts"
                  @updateItem="updateItem"
                  propertyName="options.invalidAttempts"
                />
              </div>
            </div>

            <div class="section-wrappper small-vertical-line">
              <FileBlock
                title="Repeat audio"
                :valueFromStore="getItemScenario.options.repeatAnnouncement"
                @updateItem="updateItem"
                propertyName="options.repeatAnnouncement"
              />
            </div>

            <div class="section-wrappper small-vertical-line">
              <SwitchBlock
                title="Direct dial"
                :valueFromStore="getItemScenario.options.directcall"
                @updateItem="updateItem"
                propertyName="options.directcall"
              />
            </div>

          </template>
        </ChooseItemSchemeComponent>

      </span>
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
import SwitchBlock from "./components/SwitchBlock.vue"
import _ from 'lodash'
import InputTimeBlock from "./components/InputTimeBlock.vue"
import InputBlock from "./components/InputBlock.vue"
import FileBlock from "./components/FileBlock.vue"
import IVRKeyInput from "./components/IVRKeyInput.vue"

export default {
  name: 'IVRConfiguration',
  components: {
    DropdownList,
    ConfigurationWrapper,
    ChooseItemSchemeComponent,
    SwitchBlock,
    InputTimeBlock,
    InputBlock,
    FileBlock,
    IVRKeyInput
},
  data() {
    return {
      type: 'ivr',
      showOption: '',
      user: {},
      indexFilter: '',
      perPage: 9,
      timer: null,
      name: '',
      count: 10,
      numberIVR: ''
    }
  },
  computed: {
    ...mapGetters(['getGlobalUsersList', 'getItemScenario', 'getPaginatorUsers']),
    getTimeout() {
      return this.getItemScenario?.options.timeout
    },
    isRemovedItem() {
      return !['invalid', 'timeout'].includes(this.getItemScenario?.extra?.ivr)
    },
    getIVRKey() {
      return this.getItemScenario?.extra?.ivr ?? ''
    }
  },
  methods: {
    setType(param) {
      this.$store.dispatch('setShowConfig', param)
      this.$store.dispatch('updateExistingScenarioItem', {...this.getItemScenario, schema: param})
    },
    hideListOptions() {
      clickCheck(this, this.indexFilter, this.$refs)
    },
    hide() {
      this.showOption = ''
    },
    updateItem(param, value) {
      this.$store.dispatch(
        'updateExistingScenarioItem',
        _.set({...this.getItemScenario, schema: 'ivr'}, param, value)
      )
    },
    toggleShowList(value) {
      if(this.showOption === value) {
        this.showOption = ''
      } else {
        this.showOption = value
      }
    }
  },
  mounted() {
    this.popupItem = this.$refs.clickOutside
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
  margin-bottom: 38px;

  .section-wrappper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 27px;
    position: relative;
    padding-top: 2px;

    &.small-vertical-line {
      height: 76px;
    }

    &.horizontal-line {
      ::v-deep .file-block-wrapper {
        margin-right: 0;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -9px;
          background-color: var(--ivr-lines-bg);
        }
      }

    }


    &:not(:first-child) {
      &:before {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        left: -13.5px;
        background-color: var(--ivr-lines-bg);
      }
    }

    ::v-deep .file-block-wrapper {
      margin-right: 0;
      .file-block {
        .file-btn {
          width: 237px;
          margin-right: 0;
        }
      }
    }

    .bottom-block {
      display: flex;
      align-items: center;
      margin-top: 17px;

      ::v-deep .options-block {

        &:not(:last-child) {
          margin-right: 11px;
        }
        
        .options-label {
          .options-title {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
          }

          .input-field {
            margin-top: 2px;
            height: 27px;
            width: 112px;
            background-color: var(--fill-user-icon);
            border: none;
          }

          .measure-block {
            height: 27px;
            width: 40px;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
          }
        }
      }
    }
  }

}

</style>
