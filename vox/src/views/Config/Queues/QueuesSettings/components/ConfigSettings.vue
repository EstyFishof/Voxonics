<template>
  <div class="personal-info-wrap" :class="{'disabled-events': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">
    <div class="wrap-head">
      <h2>Settings</h2>
    </div>
    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err"  @click="hideListOptions(); indexRef=''" v-click-outside="hide" :class="{'disabled-gray-options-block ': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">
            <label class="strategy-label options-label" :ref="'showStrategy'" @click="indexRef = 'showStrategy'">
              Strategy
              <input class="input-field num" type="text" :value="getStrategyTitle" readonly>
              <span @click="setShowOptions('showStrategy')" class="triangle" :class="{'rotate-arrow': showOptions === 'showStrategy'}">
                <img src="../../../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <ul v-show="showOptions === 'showStrategy'" class="list-related-numbers">
                <li @click="selectOptions('strategy', 'Ring all')"
                  :content="'Calls all users at the same time.'" v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Ring all</li>
                <li @click="selectOptions('strategy', 'Least recent')"
                :content="'Call the user who did not receive calls for the longest time.'" v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Least recent</li>
                <li @click="selectOptions('strategy', 'Fewest calls')"
                :content="'Call the user who received the least number of calls.'" v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Fewest calls</li>
                <li @click="selectOptions('strategy', 'Random')"
                 :content="'Randomly distribute calls.'" v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Random</li>
                <li @click="selectOptions('strategy', 'RR memory')"
                :content="'Calling in a circle, after the agent who answered last.'" v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">RR memory</li>
                <li @click="selectOptions('strategy', 'Linear')"
                :content="'Call starting from the first in the listed order.'" v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Linear</li>
                <!-- <li @click="selectOptions('strategy', 'W random')"
                :content="'Call the user who did not receive calls for the longest time.'" v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">W random</li> -->
              </ul>
            </label>
            <label class="strategy-label options-label" :ref="'showTimeout'" @click="indexRef = 'showTimeout'">
              Dial time
              <input class="input-field num" type="text" :value="getTimeoutInfo || 0" readonly>
              <span @click="setShowOptions('showTimeout')" class="triangle" :class="{'rotate-arrow': showOptions === 'showTimeout'}">
                <img src="../../../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <ul v-show="showOptions === 'showTimeout'" class="list-related-numbers">
                <li @click="selectOptions('timeout', index + 1)" v-for="(value, index) in new Array(60).fill(0)" :key="index">{{index + 1}}</li>
              </ul>
            </label>
            <label class="strategy-label options-label" :ref="'showRing'" @click="indexRef = 'showRing'">
              Ring in use
              <input class="input-field num" type="text" :value="getRingInUseInfo" readonly>
              <span @click="setShowOptions('showRing')" class="triangle" :class="{'rotate-arrow': showOptions === 'showRing'}">
                <img src="../../../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <ul v-show="showOptions === 'showRing'" class="list-related-numbers">
                <li @click="selectOptions('ring', 'Yes')">Yes</li>
                <li @click="selectOptions('ring', 'No')">No</li>
              </ul>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import ClickOutside from "vue-click-outside"
import { clickCheck } from '@/lib/clickCheck.js'
export default {
  name: 'Config',
  data() {
    return {
      showOptions: '',
      indexRef: ''
    }
  },
  computed: {
    ...mapGetters(['getStrategyInfo', 'getTimeoutInfo', 'getRingInUseInfo', 'getMaxWaitInfo', 'userInfo', 'getQueueInfo']),
    getStrategyTitle() {
      switch (this.getStrategyInfo) {
        case 'ringall':
          return 'Ring all'
        case 'leastrecent':
          return 'Least recent'
        case 'fewestcalls':
          return 'Fewest calls'
        case 'random':
          return 'Random'
        case 'rrmemory':
          return 'RR memory'
        case 'linear':
          return 'Linear'
        default:
          break;
      }
    },
  },
  methods: {
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.showOptions = ''
    },
    setShowOptions(option) {
      if(this.showOptions === option) {
        this.showOptions = ''
      } else {
        this.showOptions = option
      }
    },
    formattedString() {

    },
    selectOptions(option, value) {
      if(this.$access.isEditDepAndQueue(this.userInfo, 'queue', this.getQueueInfo)) {

        const formattedString = val => val.toLowerCase().split(' ').join('')

        switch (option) {
          case 'strategy':
              this.$store.dispatch('setStrategyInfo', formattedString(value))
            break
          case 'timeout':
              this.$store.dispatch('setTimeoutInfo', value)
            break
          case 'ring':
              this.$store.dispatch('setRingInUseInfo', formattedString(value))
            break
          default:
            break
        }
        this.showOptions = ''
        this.showStrategy = false
        this.showTimeout = false
        this.showRing = false
        this.showMaxWait = false
      }
    }
  },
  mounted() {
    this.popupItem = this.$el.children[1].children[0]
  },
  directives: {
    ClickOutside
  }
}
</script>
<style scoped lang="scss">
.personal-info-wrap {
  padding-left: 32px;
  height: 50vh;
  width: 100%;
  padding-top: 32px;
  background: var(--dep-child-bg);
  border-top: 2px solid var(--cdr-border-row);
  box-sizing: border-box;

  .wrap-head {
    h2 {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
    }
  }

  .wrap-body {
      display: flex;
      flex-direction: row;
      margin: 24px 0 36px 0;

      .personal-info {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        &__first-part {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          .item-container {
            display: flex;
            margin: 16px 0;

            label {
              font-size: 18px;
              font-weight: 700;
              text-align: left;
              color: var(--light-blue);
              margin-right: 48px;

              .triangle {
                margin-bottom: 4px;
              }

              .question {
                width: 10px;
                margin-left: -5px;
                margin-bottom: 8px;
              }
            }

            .question {
                width: 10px;
                margin-left: -5px;
                margin-bottom: 8px;
              }

            .options-label {
              position: relative;
              font-size: 18px;
              font-weight: 700;
              text-align: left;
              color: var(--light-blue);
              margin-right: 48px;

              .input-field {
                margin-top: 12px;
                padding: 16px 8px;
                width: 292px;
                height: 35px;
                background: var(--permission-table-bg);
                font-weight: 300;
              }

              .triangle {
                width: calc(104% - 7px);
                img {
                  margin-right: 10px;
                }
              }

              .list-related-numbers{
                max-height: 150px;
                overflow: auto;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
                  li {
                    height: 35px;
                    font-weight: 300;
                    padding: 8px 16px;
                  }
                }
              }
          }
        }
      }
    }
}
@media screen and (max-width: 1780px) {
  .personal-info-wrap {
    .wrap-body {
      .personal-info__first-part {
        .item-container {
          .options-label {
            .input-field {
              width: 260px;
            }
          }
        }
      }
    }
  }
}
</style>
