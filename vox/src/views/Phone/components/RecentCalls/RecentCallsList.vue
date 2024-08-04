<template>
      <div class="recent-calls-phone-container-list">

      <span class="recent-calls-phone-title">Recent calls</span>

      <div class="recent-calls-phone-list-container">
        <ul class="recent-calls-phone-list">
          <li  v-for="(element, index) of Object.keys(recentCallsList)" :key="index">
            <div class="recent-calls-phone-list-title">
              <span class="recent-calls-phone-list-title__text">{{element.split(' ')[0]}}</span>
              <span class="recent-calls-phone-list-title__text">{{element.split(' ')[1]}}</span>
            </div>
            <ul class="recent-calls-phone-list">
              <li class="recent-calls-phone-list-item" v-for="(item, index) of Object.values(recentCallsList[element])" :key="index" @click="setCall(item)">
                <ul class="recent-calls-phone-secondary-list" :class="{failed: item.at(-1).failed}">
                  <li class="recent-calls-phone-secondary-list-item item-user-and-icon">
                    <span class="item-icon">
                      <img width="24" :src="selectIcon(item.at(-1))" />
                    </span>
                    <span class="item-name-block">
                      <span class="item-name">{{item.at(-1).userName}}</span>
                      <span>
                        <span class="item-number" :class="{'not-user': !item.at(-1).userName}">{{item.at(-1).userNumber}}</span>
                        <span class="item-number length-of-calls" :class="{'not-user': !item.at(-1).userName}" v-if="item.length > 1">({{item.length}})</span>
                      </span>
                      
                    </span>
                  </li>
                  <li class="recent-calls-phone-secondary-list-item item-date-block">
                    <span class="item-time">{{item.at(-1).time}}</span>
                    <img
                      class="info-icon"
                      src="@/assets/img/icons/info-icon.svg"
                      content="Info"
                      v-tippy="{ placement: 'top',  arrow: true, delay : 200, duration: 500, zIndex: 10001 }"
                      @click.stop="setShowCallInfo({ arrayOfCalls: item, date: element.split(' ')[0], dayOfWeek: element.split(' ')[1] })"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
</template>
<script>
import outbound from '@/assets/img/icons/outbound.svg'
import IncomingCallIcon from '@/assets/img/icons/incoming-call-icon.svg'
import OutboundCallIcon from '@/assets/img/icons/outgoing-call-icon.svg'
import OutgoingLocalCallIcon from '@/assets/img/icons/outgoing-local-call-icon.svg'
import IncomingLocalCallIcon from '@/assets/img/icons/incoming-local-call-icon.svg'

import IncomingCallIconLight from '@/assets/img/icons/incoming-call-icon-light.svg'
import OutboundCallIconLight from '@/assets/img/icons/outgoing-call-icon-light.svg'
import OutgoingLocalCallIconLight from '@/assets/img/icons/outgoing-local-call-icon-light.svg'
import IncomingLocalCallIconLight from '@/assets/img/icons/incoming-local-call-icon-light.svg'

import IncomingFailedCallIcon from '@/assets/img/icons/incoming-failed-call-icon.svg'
import IncomingFailedCallIconLight from '@/assets/img/icons/incoming-failed-call-icon-light.svg'
import OutboundFailedCallIcon from '@/assets/img/icons/outbound-failed-call-icon.svg'
import OutboundFailedCallIconLight from '@/assets/img/icons/outbound-failed-call-icon-light.svg'

import { mapGetters } from 'vuex'
export default {
  name: 'RecentCallsList',
  props: ['recentCallsList', 'setCallProp', 'setShowCallInfoProp'],
  data() {
    return {
      outboundIcon: outbound,
      IncomingCallIconLight,
      OutboundCallIconLight,
      OutgoingLocalCallIconLight,
      IncomingLocalCallIconLight,

      IncomingCallIcon,
      OutboundCallIcon,
      OutgoingLocalCallIcon,
      IncomingLocalCallIcon,

      IncomingFailedCallIcon,
      IncomingFailedCallIconLight,
      OutboundFailedCallIcon,
      OutboundFailedCallIconLight
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  methods: {
    setCall(value) {
      this.$emit('setCallProp', value)
    },
    setShowCallInfo(payload) {
      this.$emit('setShowCallInfoProp', payload)
    },
    selectIcon(currentCall) {
      if(!currentCall.failed) {
        const isLocal = currentCall?.userNumber.length === 3 || (currentCall?.userNumber.length === 4 && currentCall.userNumber[0] === '*')
        if (isLocal) {
            if (currentCall.direction === 'outgoing') return this.theme === 'dark' ? this.OutgoingLocalCallIcon : this.OutgoingLocalCallIconLight
            if (currentCall.direction === 'incoming') return this.theme === 'dark' ? this.IncomingLocalCallIcon : this.IncomingLocalCallIconLight
        }
        if (currentCall?.direction === 'outgoing') return this.theme === 'dark' ? this.OutboundCallIcon : this.OutboundCallIconLight
        return this.theme === 'dark' ? this.IncomingCallIcon : this.IncomingCallIconLight
      } else {
        if (currentCall.direction === 'outgoing') return this.theme === 'dark' ? this.OutboundFailedCallIcon : this.OutboundFailedCallIconLight
        if (currentCall.direction === 'incoming') return this.theme === 'dark' ? this.IncomingFailedCallIcon : this.IncomingFailedCallIconLight
      }

    }
  }
}
</script>
<style lang="scss" scoped>
  .recent-calls-phone-container-list {
    width: 396px;
    padding: 54px 3px 0 3px;

    .recent-calls-phone-title {
      font-style: normal;
      font-weight: normal;
      font-size: 32px;
      line-height: 37px;
      color: var(--font-panel);
      padding-left: 10px;
    }

    .recent-calls-phone-list-container {
      margin-top: 23px;
      max-height: 555px;
      overflow: overlay;

      .recent-calls-phone-list {
        display: flex;
        flex-direction: column;
        position: relative;

        &::-webkit-scrollbar {
          width: 4px; /* ширина для вертикального скролла */
          height: 6px; /* высота для горизонтального скролла */
          background-color: inherit;
        }

        .recent-calls-phone-list-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;

          &__text {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            color: var(--font-panel)
          }
        }

        .recent-calls-phone-list-item {
          position: relative;
          width: 100%;
          height: 60px;
          padding-left: 10px;
          padding-right: 24px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(72px);

          &:hover {
            background: rgba(0, 0, 0, 0.2);
            box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
            border-radius: 4px;;
          }

          &::after {
            content: '';
            position: absolute;
            width: calc(100% - 20px);
            height: 1px;
            display: block;
            background: #FFFFFF;
            border-radius: 20px;
            left: 10px;
            bottom: 0;
          }

          .recent-calls-phone-secondary-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;

            .recent-calls-phone-secondary-list-item {
              height: 100%;

              &.item-user-and-icon {
                display: flex;
                align-items: center;
              }
              .item-icon {
                display: block;
                width: 24px;
                margin-right: 18px;
              }

              .item-name-block {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                span {
                  font-style: normal;
                  font-weight: normal;
                }

                .item-name {
                  font-size: 16px;
                  line-height: 19px;
                  color: var(--font-panel);
                }

                .item-number {
                  font-size: 12px;
                  line-height: 14px;
                  color: #979797;

                  &.not-user {
                    font-size: 16px;
                  }

                  &.length-of-calls {
                    margin-left: 3px;
                  }
                }
              }

              &.item-date-block {
                display: flex;
                align-items: center;
                justify-content: center;

                .item-time {
                  font-style: normal;
                  font-weight: normal;
                  font-size: 14px;
                  line-height: 16px;
                  color: var(--font-panel);
                  margin-right: 20px;
                }

                .info-icon {
                  cursor: pointer;
                  transition: transfor, .3s ease-in-out;
                  transform: scale(1, 1);

                  &:hover {
                    transform: scale(1.2, 1.2);
                  }
                }
              }
            }

            &.failed {
                span {
                  color: #FF3A29 !important;
                }
              }
          }
        }
      }

    }
  }
</style>
