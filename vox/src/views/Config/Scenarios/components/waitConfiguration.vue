<template>
  <ConfigurationWrapper
    title="Wait Configuration"
    :isRemovedItem="isRemovedItem"
    :ivrKey="getIVRKey"
  >
    <div class="body">
      <span ref="clickOutside" style="display: flex">

        <ChooseItemSchemeComponent
          title="Select type"
          @setItemScheme="setType"
          currentSchemeType="wait"
          currentSchemeTitle="Wait"
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
            <!-- <InputTimeBlock
              title="Please select a wait time"
              :valueFromStore="getItemScenario.options.second"
              @updateItem="updateItem"
              propertyName="options.second"
            /> -->
            <InputBlock
              title="Please select a wait time:"
              :valueFromStore="getItemScenario.options.second"
              @updateItem="updateItem"
              propertyName="options.second"
            />
          </template>
        </ChooseItemSchemeComponent>

      </span>
    </div>

  </ConfigurationWrapper>
</template>
<script>
import { mapGetters } from "vuex"
import DropdownList from '@/components/DropdownList'
import ConfigurationWrapper from "./components/ConfigurationWrapper.vue"
import ChooseItemSchemeComponent from "./components/ChooseItemSchemeComponent.vue"
import InputTimeBlock from "./components/InputTimeBlock.vue"
import IVRKeyInput from "./components/IVRKeyInput.vue"
import InputBlock from "./components/InputBlock.vue"
export default {
  name: 'WaitConfiguration',
  components: {
    DropdownList,
    ConfigurationWrapper,
    ChooseItemSchemeComponent,
    InputTimeBlock,
    IVRKeyInput,
    InputBlock
},
  computed: {
    ...mapGetters(['getItemScenario']),
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
    updateItem(param, value) {
      this.$store.dispatch(
        'updateExistingScenarioItem',
        _.set({...this.getItemScenario, schema: 'wait'}, param, value)
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

  .options-block{
      margin-bottom: 34px;
      position: relative;

    &:not(:last-child) {
      margin-right: 33px;
    }

      .options-label {
        font-size: 19px;
        line-height: 22px;
        color: var(--font-panel);

        .input-field {
          margin-top: 16px;
          display: block;
          width: 234px;
          height: 47px;
          color: var(--white);
          font-size: 20px;
          line-height: 23px;
          background: var(--scenario-vnumber-input-bg);
          border: 2px solid var(--scenario-option-bg);
          box-sizing: border-box;
          border-radius: 6px;
        }
      }
    }
}

</style>
