<template>
  <div class="personal-info-wrap" :class="{'disabled-events': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
    <div class="wrap-head">
      <h2>Numbers in Department</h2>
    </div>
    <div class="top">
      <div class="left" :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">Assign number
      </div>
      <div class="numbers">
        <div v-if="numbersDep.length" class="number">
          <div class="block">
            <div class="round">№ <span class="vnumber">VNumber</span></div>
            <span class="name"></span>
          </div>
          <span class="name"></span>
          <span class="union"></span>
        </div>
        <div v-if="numbersDep.length > 1" class="number">
          <div class="block">
            <div class="round">№ <span class="vnumber">VNumber</span></div>
            <span class="name"></span>
          </div>
          <span class="name"></span>
          <span class="union"></span>
        </div>
        <div v-if="numbersDep.length > 2" class="number">
          <div class="block">
            <div class="round">№ <span class="vnumber">VNumber</span></div>
            <span class="name"></span>
          </div>
          <span class="name"></span>
          <span class="union"></span>
        </div>
        <div v-if="numbersDep.length > 3" class="number">
          <div class="block">
            <div class="round">№ <span class="vnumber">VNumber</span></div>
            <span class="name"></span>
          </div>
          <span class="name"></span>
          <span class="union"></span>
        </div>
      </div>
    </div>
    <div class="wrap-body" :class="{'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <div class="label" v-click-outside="hideListNumbers">
              <input placeholder="Enter or select number"
                     class="input-field"
                     @click="showList()"
                     @input="showNumbers = true; searchNumbers()"
                     v-model.trim="name"/>
              <span @click="showList()" class="triangle" :class="{'rotate-arrow': showNumbers}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <DropdownList v-show="showNumbers" :classNameList="'list'" :dataList="mainList.getMainList"  @scrollFunc="(event) => funScroll(event)"
                  @clickFunc="(item) => chooseNumber(item)" :itemText="(item) => `<span>${item.description} ${item.number}</span>`"
                  :classNameItemComputed="(item) => numbersDep.filter(element => element.uid === item.uid).length ? 'selected row' : 'row'" />

            </div>
          </div>
        </div>
      </div>
      <div class="numbers">
        <div class="number" v-for="(number, index) of numbersDep" :key="index">
          <div class="block">
            <div class="round">{{ index + 1 }}.</div>
            <span class="name">{{ number.number }}</span>
            <span class="description">{{ number.description }}</span>
          </div>
          <span class="name">{{ number.internalNumber }}</span>
          <img @click="chooseNumber(number)" class="union" src="@/assets/img/icons/union.svg" width="19" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import store from "../../../../../store"
import ClickOutside from "vue-click-outside"
import DropdownList from '@/components/DropdownList'
import {dropdownListFetch, dropdownChooseItem} from '@/lib/dropdownListsDepsAndQueues.js'
import _ from 'lodash'

export default {
  name: "VNumbersSetting",
  components: {
    DropdownList
  },
  data() {
    return {
      unsubscribeStore: () => {
      },
      name: "",
      showNumbers: false,
      perPage: 12,
      mainList: {
        topList: [],
        bottomList: [],
        getMainList: []
      },
    }
  },
  watch: {
    getGlobalExternalNumbers() {
      dropdownListFetch(this, this.getGlobalExternalNumbers, 'numbersDep')
      this.mainList.getMainList = _.concat(this.mainList.topList, this.mainList.bottomList)
    }
  },
  computed: {
    ...mapGetters(['numbersDep', 'userInfo', 'departmentInfo', 'getGlobalExternalNumbers', 'getPaginatorNumbers']),
  },
  methods: {
    searchNumbers() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(), 800)
    },
    funScroll({target}) {
      if((target.clientHeight + target.scrollTop === target.scrollHeight)) {
        if(this.getPaginatorNumbers.paginator.count > this.perPage) {
          this.perPage += 9
          this.fetch()
        }
      }
    },
    fetch() {
      this.$store.dispatch('setGlobalExternalNumbers', {peerPage: this.perPage, number: this.name})
    },
    showList() {
      this.fetch()
      this.showNumbers = !this.showNumbers
    },
    hideListNumbers() {
      this.showNumbers = false
    },
    chooseNumber(numProp) {
      const num = _.omit(numProp, 'usedIn')
      dropdownChooseItem(this, num, 'numbersDep', 'setNumbersDepartment')
    },
    setNumbersDepartment(array) {
      this.$store.dispatch('changeNumbersDepartment', array)
    }
  },
  mounted() {
    this.popupItem = this.$el.children[2].children[0]
    this.unsubscribeStore = store.subscribe((mutation) => {
      if (mutation.type === 'pushDepartment') {
        this.mainList.topList = JSON.parse(JSON.stringify(this.numbersDep))
      }
    })
    this.mainList.topList = JSON.parse(JSON.stringify(this.numbersDep))
  },
  beforeDestroy() {
    this.unsubscribeStore()
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/departmentsAndQueues/agentsSettings.scss"></style>
<style scoped lang="scss">
.personal-info-wrap {
  width: 100%;
  .top {
    .number {
      .vnumber {
        margin-left: 20px;
      }
    }
  }

  .numbers {
    .number {
      .block {
        position: relative;

        .round {
          border-radius: 0;
          margin-right: 0;
          border: none;
        }

        .description {
          position: absolute;
          left: 25px;
          top: 21px;
          font-weight: 300;
          font-size: 10px;
          line-height: 9px;
          color: #8F8F8F;
        }
      }
    }
  }
}
</style>
