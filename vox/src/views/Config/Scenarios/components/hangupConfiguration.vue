<template>
  <ConfigurationWrapper
    title="Hangup Configuration"
    :isRemovedItem="isRemovedItem"
    :ivrKey="getIVRKey"
  >
    <div class="body">
      <span ref="clickOutside" style="display: flex">

        <ChooseItemSchemeComponent
          title="Select type"
          @setItemScheme="setType"
          currentSchemeType="hangup"
          currentSchemeTitle="Hangup"
          :ivrKey="getIVRKey"
          :canToggleShowList="true"
        >
          <template v-slot:ivr-key>
            <IVRKeyInput
              v-if="getItemScenario.extra && getItemScenario.extra.hasOwnProperty('ivr')"
              :valueFromStore="getIVRKey"
              @updateItem="() => {}"
              propertyName="extra.ivr"
            />
          </template>
          <template v-slot:config>

            <div class="configuration-wrapper" v-if="getIVRKey === 'timeout'">
              <FileBlock
                title="Timeout audio"
                :valueFromStore="getIVRItem.options.timeoutAnnouncement"
                @updateItem="updateIVRItem"
                propertyName="options.timeoutAnnouncement"
              />

              <div class="bottom-block">
                <InputBlock
                  title="Timeout:"
                  :valueFromStore="getIVRItem.options.timeout"
                  @updateItem="updateIVRItem"
                  propertyName="options.timeout"
                  measure="sec"
                />
                <InputBlock
                  title="Wait for digit:"
                  :valueFromStore="getIVRItem.options.digitsTimeout"
                  @updateItem="updateIVRItem"
                  propertyName="options.digitsTimeout"
                  measure="sec"
                />
                <InputBlock
                  title="Timeout attempts:"
                  :valueFromStore="getIVRItem.options.timeoutAttempts"
                  @updateItem="updateIVRItem"
                  propertyName="options.timeoutAttempts"
                />
              </div>
            </div>

            <div class="configuration-wrapper" v-if="getIVRKey === 'invalid'">
              <FileBlock
                title="Invaild audio"
                :valueFromStore="getIVRItem.options.invalidAnnouncement"
                @updateItem="updateIVRItem"
                propertyName="options.invalidAnnouncement"
              />

              <div class="bottom-block">
                <InputBlock
                  title="Invaild attempts:"
                  :valueFromStore="getIVRItem.options.invalidAttempts"
                  @updateItem="updateIVRItem"
                  propertyName="options.invalidAttempts"
                />
              </div>
            </div>

          </template>
        </ChooseItemSchemeComponent>

      </span>
    </div>

  </ConfigurationWrapper>
</template>
<script>
import { mapGetters } from "vuex"
import ConfigurationWrapper from "./components/ConfigurationWrapper.vue"
import ChooseItemSchemeComponent from "./components/ChooseItemSchemeComponent.vue"
import IVRKeyInput from "./components/IVRKeyInput.vue"
import { getParentItem } from "../../../../lib/parse.scenarios"
import InputBlock from "./components/InputBlock.vue"
import FileBlock from "./components/FileBlock.vue"
export default {
  name: 'HangupConfiguration',
  components: {
    ConfigurationWrapper,
    ChooseItemSchemeComponent,
    IVRKeyInput,
    InputBlock,
    FileBlock
},
  computed: {
    ...mapGetters(['getItemScenario', 'getScenario']),
    isRemovedItem() {
      return !['invalid', 'timeout'].includes(this.getItemScenario?.extra?.ivr)
    },
    getIVRItem() {
      return getParentItem(this.getScenario.scenario, this.getItemScenario)
    },
    getIVRKey() {
      return this.getItemScenario?.extra?.ivr ?? ''
    }
  },
  methods: {
    setType(param) {
      this.$store.dispatch('setShowConfig', param)
      this.$store.dispatch('updateParentScenarioItem', {...this.getItemScenario, schema: param, options: {}})
    },
    updateIVRItem(param, value) {
      this.$store.dispatch(
        'updateParentScenarioItem',
        _.set({...this.getIVRItem, schema: 'ivr'}, param, value)
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.body{
  display: flex;
  justify-content: flex-start;
  padding-left: 26px;
  margin-bottom: 34px;

    .configuration-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: 27px;
      position: relative;
      padding-top: 2px;

      &.small-vertical-line {
        height: 76px;
      }


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
