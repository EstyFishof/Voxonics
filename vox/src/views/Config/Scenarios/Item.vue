<template>
  <div v-if="link" class="item-block" @mouseover="mouseoverHandler" @mouseleave="mouseleaveHandler">
    <div class="item" @click="chooseItem(link)"
         :class="{active: link.category === (getItemScenario ? getItemScenario.category : false)}">

      <img class="left-icon"
        v-if="showSwappedIconBlue"
        :src="icon.swappedIconBlue"
        @click.stop="toggleSwappedMode"
      />
      <img class="left-icon"
        v-else-if="showSwappedIconGreen" 
        :src="icon.swappedIconGreen"
        @click="swappedItems"
      />
      <div class="accession" v-else-if="link.schema != 'vnumber-in'">
        <img src="@/assets/img/icons/scenario-arrow.svg"/>
      </div>

      <span class="ivr-input-wrapper" v-if="link.extra && link.extra.hasOwnProperty('ivr')">
        {{link.extra.ivr}}
      </span>

      <div>
        <div class="nowrap">
          <span class="image-block">
            <img class="wrap-dots wrap-phone" :src="getTitleItem(link).icon"/>
          </span>
          <span class="name-block ellipsis">
            {{ getTitleItem(link).text }}
            <span class="numbers-length" v-if="link.schema === 'vnumber-in' && link.options.externalNumbers">
              Selected V-Numbers ( {{ link.options.externalNumbers.length }} )
            </span>
        </span>
        </div>
      </div>

      <div class="wrap-gear">
        <img width="20" :src="theme === 'dark' ? gearBlack : gearWhite"/>
      </div>
      <div class="plus" :class="{'plus-hover': hover && link.schema !== 'hangup', 'end-item': (link.next && !link.next.length && !hover) || link.schema === 'hangup'}" @click.stop="addNewItemHandler">
        <svg v-if="canToAddChildItem" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0625 6.5625H8.4375V0.9375C8.4375 0.419062 8.0175 0 7.5 0C6.9825 0 6.5625 0.419062 6.5625 0.9375V6.5625H0.9375C0.42 6.5625 0 6.98156 0 7.5C0 8.01844 0.42 8.4375 0.9375 8.4375H6.5625V14.0625C6.5625 14.5809 6.9825 15 7.5 15C8.0175 15 8.4375 14.5809 8.4375 14.0625V8.4375H14.0625C14.58 8.4375 15 8.01844 15 7.5C15 6.98156 14.58 6.5625 14.0625 6.5625Z" fill="#FFFFFF"/>
        </svg>
        <img v-else-if="!link.next.length" src="@/assets/img/icons/hangup-icon-red.svg" />
        <span v-else class="point"></span>
      </div>
    </div>

    <div v-if="link.next && link.next.length">
      <drop-list
          :items="link.next"
          class="list"
          @reorder="reorderHandler"
          :column="true"
          ref="dropList"
        >
          <template v-slot:item="{item}">
            <drag :key="item.category">
              <Item @mountedItemProp="mountedItem" :link="item" :counter="counter + 1" :hoverProp="hover" />
            </drag>
          </template>
        </drop-list>

        <svg v-for="(item, index) of link.next" :key="index + link.category" class="svg-line" xmlns="http://www.w3.org/2000/svg">
          <path v-if="renderPaths"
                :d="calculatePath(index)"
                fill="transparent" stroke-width="2">
          </path>
        </svg>

    </div>
  </div>
</template>

<script>
import gearBlack from '../../../assets/img/icons/gear-black.svg'
import gearWhite from '../../../assets/img/icons/gear-white.svg'
import vnumberInBlack from '../../../assets/img/icons/numbers-scenario.svg'
import vnumberInWhite from '../../../assets/img/icons/numbers-scenario-white.svg'
import dialBlack from '../../../assets/img/icons/user-scenario.svg'
import dialWhite from '../../../assets/img/icons/user-scenario-white.svg'
import queueIconBlack from '../../../assets/img/icons/queue-scenario.svg'
import queueIconWhite from '../../../assets/img/icons/queue-scenario-white.svg'
import waitIconBlack from '@/assets/img/icons/wait-scenario.svg'
import waitIconWhite from '@/assets/img/icons/wait-scenario-white.svg'
import ivrIconBlack from '@/assets/img/icons/ivr-scenario.svg'
import ivrIconWhite from '@/assets/img/icons/ivr-scenario-white.svg'
import announcmentIconBlack from '@/assets/img/icons/announcment-scenario.svg'
import announcmentIconWhite from '@/assets/img/icons/announcment-scenario-white.svg'
import hangupIcon from '@/assets/img/icons/hangup-icon.svg'
import hangupIconWhite from '@/assets/img/icons/hangup-icon-white.svg'
import swappedIconBlue from '@/assets/img/icons/swapped-icon-blue.svg'
import swappedIconGreen from '@/assets/img/icons/swapped-icon-green.svg'


import { Drag, DropList } from 'vue-easy-dnd'
import { mapGetters } from 'vuex'

export default {
  name: 'Item',
  props: ['link', 'counter', 'mountedItemProp', 'hoverProp'],
  components: {Drag, DropList},
  data() {
    return {
      icon: {
        vnumberInBlack,
        vnumberInWhite,
        queueIconBlack,
        queueIconWhite,
        dialBlack,
        dialWhite,
        waitIconBlack,
        waitIconWhite,
        ivrIconBlack,
        ivrIconWhite,
        announcmentIconBlack,
        announcmentIconWhite,
        hangupIcon,
        hangupIconWhite,
        swappedIconBlue,
        swappedIconGreen
      },
      itemWidth: 244,
      itemHeight: 52,
      gapVertival: 48,
      gapHorizontal: 85,
      gearBlack: gearBlack,
      gearWhite: gearWhite,
      renderPaths: false,
      hover: this.hoverProp,
      paths: []
    }
  },
  computed: {
    ...mapGetters(['getGlobalUsersList', 'getScenario', 'getItemScenario', 'theme', 'getIsSwappedMode']),
    canToAddChildItem() {
      return this.hover && (this.link.schema === 'ivr' || (!this.link.next?.length && this.link.schema !== 'hangup'))
    },
    showSwappedIconBlue() {
      return (this.link.category === this.getItemScenario?.category) && (this.link.schema != 'vnumber-in') && this.link.schema !== 'ivr' && this.link.schema !== 'hangup'
    },
    showSwappedIconGreen() {
      return this.getIsSwappedMode && this.link.schema != 'vnumber-in' && this.link.schema !== 'ivr' && this.link.schema !== 'hangup'
    }
  },
  watch: {
    hoverProp() {
      this.hover = this.hoverProp
    },
    link: { 
      handler(){
        this.forceUpdate()
      },
      deep: true
    },
    getItemScenario: {
      handler(){
        setTimeout(() => {
          this.forceUpdate()
        }, 200);
      },
      deep: true
    }
  },
  methods: {
    toggleSwappedMode() {
      this.$store.commit('isSwappedModeMutation', !this.getIsSwappedMode)
    },
    swappedItems() {
      this.$store.dispatch('swapItems', this.link)
    },
    reorderHandler(event) {
      event.apply(this.link.next)
      this.$store.dispatch('updateExistingScenarioItem', this.link)
      this.forceUpdate()
    },
    forceUpdate() {
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    mouseoverHandler() {
      this.counter === 0 ? this.hover = true : null
    },
    mouseleaveHandler() {
      this.counter === 0 ? this.hover = false : null
    },
    addNewItemHandler() {
      if(this.canToAddChildItem) {
        this.addItem(this.link)
      }
    },
    getTitleItem(item) {
      switch (item.schema) {
        case 'vnumber-in':
          return {text: 'V-Numbers', icon: this.theme === 'light' ? this.icon.vnumberInWhite : this.icon.vnumberInBlack}
        case 'hangup':
          return {text: 'Hangup', icon: this.theme === 'light' ? this.icon.hangupIconWhite : this.icon.hangupIcon}
        case 'ivr':
          return {text: 'IVR', icon: this.theme === 'light' ? this.icon.ivrIconWhite : this.icon.ivrIconBlack}
        case 'wait':
          return {text: 'Wait', icon: this.theme === 'light' ? this.icon.waitIconWhite : this.icon.waitIconBlack}
        case 'announcement':
          return {text: 'Announcement', icon: this.theme === 'light' ? this.icon.announcmentIconWhite : this.icon.announcmentIconBlack}
        case 'queue':
          if(!item.options.name) {
            return {
              text: '',
              icon: this.theme === 'light' ? this.icon.queueIconWhite : this.icon.queueIconBlack
            }
          }
          return {
            text: `${item.options.name.length > 6 ? item.options.name.slice(0, 6) + '...' : item.options.name} (${item.options.number})`,
            icon: this.theme === 'light' ? this.icon.queueIconWhite : this.icon.queueIconBlack
          }
        case 'dial':
          if (this.getGlobalUsersList) {
            for (let i = 0; i < this.getGlobalUsersList.length; i++) {
              if (this.getGlobalUsersList[i].internalNumber === item.options.number) {
                return {
                  text: `${this.getGlobalUsersList[i].name?.length > 7 ? this.getGlobalUsersList[i].name.slice(0, 7) + '...' : this.getGlobalUsersList[i].name} (${item.options.number})`,
                  icon: this.theme === 'light' ? this.icon.dialWhite : this.icon.dialBlack
                }
              }
              if(!item.options.number) {
                return {
                  text: '',
                  icon: this.theme === 'light' ? this.icon.dialWhite : this.icon.dialBlack
                }
              }
            }
          }
          return {
            text: `dial (${item.options.number})`,
            icon: this.theme === 'light' ? this.icon.dialWhite : this.icon.dialBlack
          }
        default:
          return {text: '', icon: ''}
      }
    },
    addItem(item) {
      this.$store.dispatch('addItemScen', item)
    },
    chooseItem(item) {
      if (item?.category === this.getItemScenario?.category) {
        this.$store.dispatch('setShowConfig', null)
        this.$store.dispatch('setItemScenario', null)
        return false
      }
      if (this.counter === 0) {
        this.$store.dispatch('setShowConfig', 'vnumber-in')
      } else {
        this.$store.dispatch('setShowConfig', item.schema)
      }
      this.$store.dispatch('setItemScenario', item)
    },
    calculateRelativePos(current, child) {
      const currentPos = current.getBoundingClientRect()
      const childPos = child.getBoundingClientRect()
      const relativePos = {}
      relativePos.top = childPos.top - currentPos.top
      relativePos.right = childPos.right - currentPos.right
      relativePos.bottom = childPos.bottom - currentPos.bottom
      relativePos.left = childPos.left - currentPos.left
      return relativePos
    },
    calculatePath(index) {
      if(!this.$refs.dropList?.$children[0]?.$children[index]) return ''
      const pos = this.calculateRelativePos(this.$el, this.$refs.dropList.$children[0]?.$children[index].$el)

      return `M${this.itemWidth},${this.itemHeight / 2}
              C${this.itemWidth + this.gapVertival / 2},${this.itemHeight / 2}
              ${this.itemWidth + this.gapHorizontal / 2},${pos.top + this.itemHeight / 2}
              ${this.itemWidth + this.gapHorizontal},${pos.top + this.itemHeight / 2} `
    },
    mountedItem() {
      this.renderPaths = true
    }
  },
  mounted() {
    this.$emit('mountedItemProp')
  }
}
</script>

<style scoped lang="scss">

.list {
  z-index: 10;
  position: relative;
}

.svg-line {
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  overflow: visible;

  path {
    stroke: var(--scenario-lines-stroke);
  }
}

.ivr-number-circle {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: var(--permission-table-bg);
  background-color: #4b535a;
  z-index: 10;
}
.item-block {
  display: flex;
  position: relative;

  .item {
    width: 244px;
    height: 52px;
    padding-left: 19px;
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--permission-table-bg);
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.11);
    position: relative;
    cursor: pointer;
    margin-right: 85px;
    z-index: 100;

    .plus, .accession {
      position: absolute;
      right: calc(0% - 12px);
      top: calc(50% - 12px);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #276899;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .left-icon {
      position: absolute;
      right: calc(100% - 12px);
      top: calc(50% - 12px);
      cursor: pointer;
      transform: scale(1, 1);
      transition: transform .3s ease-in-out;

      &:hover {
        transform: scale(1.2, 1.2);
      }
    }

    .ivr-input-wrapper {
      position: absolute;
      height: 24px;
      top: -15px;
      left: -10px;
      min-width: 24px;
      background: #276899;
      padding: 2px 6px;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      color: #FFFFFF;
    }

    .accession {
      right: calc(100% - 12px);
    }

    .plus {
      z-index: 10;

      &.end-item {
        background-color: var(--permission-table-bg);
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
      }

      &-hover {
        transform: scale(1,1);
        transition: transform .3s ease-in-out;

        &:hover {
          transform: scale(1.2, 1.2);
        }
      }

      .point {
        display: block;
        border-radius: 50%;
        background-color: #fff;
        width: 8px;
        height: 8px;
      }
    }

    .wrap-gear {
      width: 32px;
      height: 32px;
      padding: 6px;
      background-color: var(--scenario-wheel-bg);
      border-radius: 50%;
      cursor: initial;
      margin-right: 20px;
      box-shadow: 0 8px 16px rgba(26, 18, 18, 0.25);
    }

    .wrap-dots {
      margin-right: 7px;
    }

    .wrap-phone {
      // margin-top: 5px;
    }

    .nowrap {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      font-size: 18px;
      font-weight: 400;

      .image-block {
        display: inline-block;
        width: 33px;
        height: 29px;

        .wrap-phone {
          margin-top: 3px;
          -webkit-transform: translate3d(0, 0, 0)
        }
      }

      .name-block {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
        flex-wrap: wrap;
        color: var(--font-panel);

        .numbers-length {
          font-weight: 300;
          font-size: 10px;
          line-height: 9px;
          color: #8F8F8F;
        }
      }
    }
  }

  .active {
    box-shadow: 0 0 16px rgba(39, 104, 153, 1) !important;
  }

  .add-block {
    width: 244px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--scenario-add-block-bg);
    border: 2px solid #276899;
    box-sizing: border-box;
    box-shadow: var(--scenario-add-block-shadow);
    border-radius: 8px;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: var(--font-panel);
  }
}
</style>
