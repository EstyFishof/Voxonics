<template>
  <ConfigurationWrapper
    title="New element Configuration"
    :isRemovedItem="isRemovedItem"
    :ivrKey="getIVRKey"
  >
    <div class="body">
      <span ref="clickOutside" style="display: flex">

        <ChooseItemSchemeComponent
          title="Select type"
          @setItemScheme="setType"
          currentSchemeType=""
          currentSchemeTitle=""
          :ivrKey="''"
          :showListProp="true"
          :canToggleShowList="false"
        />

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
export default {
  name: 'newItemConfiguration',
  components: {
    DropdownList,
    ConfigurationWrapper,
    ChooseItemSchemeComponent,
    InputTimeBlock,
    IVRKeyInput
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
    }
  }
}
</script>
<style lang="scss" scoped>
.body{
  display: flex;
  justify-content: flex-start;
  padding-left: 26px;
}

</style>
