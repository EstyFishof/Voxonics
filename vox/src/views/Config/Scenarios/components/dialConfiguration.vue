<template>
  <ConfigurationWrapper
    title="Dial Configuration"
    :isRemovedItem="isRemovedItem"
    :ivrKey="getIVRKey"
  >
    <div class="body">
      <span ref="clickOutside" style="display: flex" v-click-outside="hide" @click="hideListOptions(); indexFilter='false'">

        <ChooseItemSchemeComponent
          title="Select type"
          @setItemScheme="setType"
          currentSchemeType="dial"
          currentSchemeTitle="Dial"
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
            <div class="options-block">
              <label class="options-label" :ref="'user'" @click="indexFilter = 'user'">
                <span class="options-title">Select Agent/Queue</span>
                <input class="input-field num" type="text" :value="inputUserValue" @input="searcUsers($event.target.value)">
                <span @click="toggleShowList('user')" class="triangle" :class="{'rotate-arrow': showOption === 'user'}">
                  <img src="../../../../assets/img/icons/select-arrow.svg" alt="select">
                </span>
                <DropdownList v-show="showOption === 'user'" :classNameList="'list-related-numbers'"
                    :dataList="getGlobalUsersList" @scrollFunc="event => funScroll(event)" @clickFunc="(item) => userClickHandler(item)"
                    :classNameItemComputed="(item) => item.internalNumber === user.internalNumber ? 'active-item' : ''"
                    :itemText="(item) => `${item.name} ${item.internalNumber}`" />

              </label>
            </div>

            <SwitchBlock
              title="Change MOH"
              :valueFromStore="getItemScenario.options.moh"
              @updateItem="updateItem"
              propertyName="options.moh"
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
import ClickOutside from "vue-click-outside" 
import { clickCheck } from '@/lib/clickCheck.js'
import ConfigurationWrapper from "./components/ConfigurationWrapper.vue"
import ChooseItemSchemeComponent from "./components/ChooseItemSchemeComponent.vue"
import _ from 'lodash'
import SwitchBlock from "./components/SwitchBlock.vue"
import IVRKeyInput from "./components/IVRKeyInput.vue"
export default {
  name: 'dialConfiguration',
  components: {
    DropdownList,
    ConfigurationWrapper,
    ChooseItemSchemeComponent,
    SwitchBlock,
    IVRKeyInput
},
  data() {
    return {
      type: 'Dial Queue/Agent',
      showOption: '',
      user: {},
      indexFilter: '',
      perPage: 9,
      timer: null,
      name: '',
      count: 10
    }
  },
  computed: {
    ...mapGetters(['getGlobalUsersList', 'getItemScenario', 'getPaginatorUsers']),
    inputUserValue() {
      if(this.showOption === 'user') {
        return this.name
      } else {
        return this.user.name ? `${this.user.name} ( ${this.user.internalNumber} )` : ''
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
    setType(param) {
      this.$store.dispatch('setShowConfig', param)
      this.$store.dispatch('updateExistingScenarioItem', {...this.getItemScenario, schema: param})
    },
    searcUsers(value) {
      this.name = value
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    funScroll({target}) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.getPaginatorUsers.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch()
        }
      }
    },
    fetch() {
      this.$store.dispatch('globalUsersListRequest', {peerPage: this.perPage, sort: '', page: 1, search: this.name})
    },
    hideListOptions() {
      clickCheck(this, this.indexFilter, this.$refs)
    },
    hide() {
      this.showOption = ''
    },
    setOptions(param, value) {
      this[param] = value
      this.showOption = ''
    },
    userClickHandler(item) {
      this.setOptions('user', item)
      this.updateItem('options.number', item.internalNumber)
    },
    updateItem(param, value) {
      this.$store.dispatch(
        'updateExistingScenarioItem',
        _.set({...this.getItemScenario, schema: 'dial'}, param, value)
      )
    },
    toggleShowList(value) {
      if(this.showOption === value) {
        this.showOption = ''
      } else {
        this.showOption = value
      }
    },
    setUser() {
      this.user = {}
      this.getGlobalUsersList.forEach(element => {
        if(element.internalNumber === this.getItemScenario?.options?.number) {
          this.user = element
        }
      })
    }
  },
  mounted() {
    this.setUser()
    this.$store.subscribe(mutation => {
      if(mutation.type === 'addItemScenMutation') {
        this.user = {}
      } else if(mutation.type === 'setItemMutation') {
        this.setUser()
      }
    })
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
  margin-bottom: 34px;

  .options-block{
      position: relative;

    &:not(:last-child) {
      margin-right: 33px;
    }

      .options-label {
        font-size: 19px;
        line-height: 22px;
        color: var(--font-panel);

        .input-field {
          margin-top: 8px;
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

        .triangle {
          width: calc(99% - 7px);
          height: 47px;
          bottom: 0;
        }

        .list-related-numbers {
          height: 82px;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        }
      }
    }
}

</style>
