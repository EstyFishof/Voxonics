<template>
  <div class="personal-info-wrap">
    <div class="wrap-head">
      <h2>QUEUE INFO</h2>
      <span class="hr"></span>
    </div>

    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <label>
              Name
              <input placeholder="Enter name of Queue"
                     class="input-field"
                     v-model.trim="name"
                     @change="setQueueName"
                     maxlength="12"
                     required
                     :class="{error: requiredFields.name}"
              />
            </label>
            <label>
              Number of Queue
              <input placeholder="Enter number of Queue"
                     class="input-field"
                     @keydown="onKeyDownHandlerForPriorityInput"
                     v-model.trim="internalNumber"
                     @change="setQueueNumber"
                     maxlength="4"
                     required
                     :class="{error: requiredFields.internalNumber}"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-head options-title">
      <h2>Call Settings</h2>
      <span class="hr"></span>
    </div>
    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err" @click="hideListOptions(); indexRef='false'" v-click-outside="hide" ref="hideList">
            <label class="strategy-label options-label" :ref="'showStrategy'" @click="indexRef = 'showStrategy'" >
              Strategy
              <input class="input-field num" type="text" :value="newQueueStrategy" readonly>
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
              </ul>
            </label>
            <label class="strategy-label options-label" :ref="'showTimeout'" @click="indexRef = 'showTimeout'">
              Dial time
              <input class="input-field num" type="text" :value="newQueueTimeout" readonly>
              <span @click="setShowOptions('showTimeout')" class="triangle" :class="{'rotate-arrow': showOptions === 'showTimeout'}">
                <img src="../../../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <ul v-show="showOptions === 'showTimeout'" class="list-related-numbers">
                <li @click="selectOptions('timeout', `${index + 1}`)" v-for="(value, index) in new Array(60).fill(0)" :key="index">{{index + 1}}</li>
              </ul>
            </label>
            <label class="strategy-label options-label" :ref="'showRing'" @click="indexRef = 'showRing'">
              Ring in use
              <input class="input-field num" type="text" :value="newQueueRing" readonly>
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
  name: "QueueInfo",
  props: ['requiredFields'],
  data() {
    return {
      name: "",
      internalNumber: '',
      showOptions: '',
      strategy: '',
      timeout: '',
      ring: '',
      indexRef: ''
    }
  },
  computed: {
    ...mapGetters(['newQueue', 'newQueueName', 'newQueueInternalNumber', 'newQueueStrategy', 'newQueueTimeout', 'newQueueRing'])
  },
  methods: {
    onKeyDownHandlerForPriorityInput(evt) {
      if(!Number.isInteger(+evt.key) && !['Backspace', 'Delete'].includes(evt.key)) {
        evt.preventDefault()
      }
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.showOptions = ''
    },
    setQueueName() {
      this.$store.dispatch('setNameQueue', this.name)
    },
    setQueueNumber() {
      this.$store.dispatch('setInternalNumberQueue', this.internalNumber)
    },
    setShowOptions(option) {
      if(this.showOptions === option) {
        this.showOptions = ''
      } else {
        this.showOptions = option
      }
    },
    selectOptions(option, value) {
      switch (option) {
        case 'strategy':
            this.$store.dispatch('setStrategyQueue', value)
          break
        case 'timeout':
            this.$store.dispatch('setTimeoutQueue', value)
          break
        case 'ring':
            this.$store.dispatch('setRingQueue', value)
          break
        default:
          break
      }
      this.showOptions = ''
    }
  },
  mounted() {
    this.popupItem = this.$refs.hideList
    this.$store.dispatch('setStrategyQueue', 'Ring all')
    this.$store.dispatch('setTimeoutQueue', '21')
    this.$store.dispatch('setRingQueue', 'Yes')

    if (this.newQueueName) {
      this.name = this.newQueueName
    }
    if(this.newQueueInternalNumber) {
      this.internalNumber = this.newQueueInternalNumber
    }
    if(this.newQueueStrategy) {
      this.strategy = this.newQueueStrategy
    }
    if(this.newQueueTimeout) {
      this.timeout = this.newQueueTimeout
    }
    if(this.newQueueRing) {
      this.ring = this.newQueueRing
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.personal-info-wrap {
  .options-title {
    margin-left: 24px;
    h2 {
      font-weight: bold;
      font-size: 32px;
      line-height: 37px;
    }
  }
  .wrap-body {
    display: flex;
    flex-direction: row;
    margin: 36px 0 36px 24px;

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
              width: calc(104% - 7px);
              margin-bottom: 4px;
            }

            .input-field {
              padding-left: 12px;
            }

            .question {
              width: 10px;
              margin-left: -5px;
              margin-bottom: 8px;
            }

            .error {
              border: 1px solid red;
              outline: red;
            }
          }

          .question {
            width: 10px;
            margin-left: -5px;
            margin-bottom: 8px;
          }

          .options-label {
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            color: var(--light-blue);
            margin-right: 48px;
            position: relative;

            .input-field {
              margin-top: 12px;
              padding: 16px 8px;
              width: 292px;
              height: 35px;
              background: var(--permission-table-bg);
              color: var(--font-panel);
              font-weight: 300;
              padding-left: 12px;
            }

            .triangle {
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

  .with-err {
    position: relative;
    margin-bottom: 30px;
  }

}
@media screen and (max-width: 1724px) {
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
