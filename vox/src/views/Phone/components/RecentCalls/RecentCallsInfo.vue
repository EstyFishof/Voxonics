<template>
  <div class="recent-calls-phone-container-details">

    <div class="back-btn" @click="setShowCallInfo(null)">
      <svg class="back-btn-arrow" width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.60938 20.3906C9.86719 20.6484 10.1953 20.7891 10.582 20.7891C11.3555 20.7891 11.9766 20.1797 11.9766 19.4062C11.9766 19.0195 11.8125 18.668 11.543 18.3984L3.33984 10.3828L11.543 2.39062C11.8125 2.12109 11.9766 1.75781 11.9766 1.38281C11.9766 0.609375 11.3555 0 10.582 0C10.1953 0 9.86719 0.140625 9.60938 0.398438L0.492188 9.30469C0.164062 9.60938 0.0117188 9.98438 0 10.3945C0 10.8047 0.164062 11.1562 0.492188 11.4727L9.60938 20.3906Z" fill="white"/>
      </svg>
      <span class="back-btn-text">Recent calls</span>
    </div>

    <UserDefaultAvatar sizeWrapper="86px" widthIcon="50px" heightIcon="65px" marginIcon="5px 0 0 0" marginWrapper="auto auto 13px auto" />

    <div class="user-info-and-btns-block">

      <div class="btn" @click="setCall()">
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1416 28.8C13.3192 28.8 3.7 19.1808 3.7 7.3584C3.7 5.0656 5.5656 3.2 7.86 3.2C8.0344 3.2 8.2088 3.2096 8.3848 3.2336L10.0824 10.6256C9.8008 10.7728 9.4936 10.9328 9.2104 11.0816C7.8168 11.8096 6.8104 12.3376 7.3256 13.6208C9.2056 18.976 13.524 23.2944 18.8152 25.1504C20.1704 25.6928 20.6888 24.6816 21.4168 23.2896C21.5672 23.0048 21.7272 22.6992 21.8744 22.4176L29.2664 24.1152C29.2888 24.2864 29.3 24.4624 29.3 24.64C29.3 26.9344 27.4344 28.8 25.1416 28.8ZM32.3976 23.4208C32.3336 23.0208 32.2328 22.6288 32.1016 22.2528C31.9224 21.7328 31.4856 21.3408 30.9496 21.2176L21.4072 19.0272C20.8808 18.9104 20.3304 19.0592 19.9416 19.432C19.7128 19.6512 19.708 19.656 18.668 21.6432C15.244 20.0832 12.4456 17.2896 10.86 13.8304C12.8424 12.792 12.8488 12.7872 13.068 12.5584C13.4408 12.1696 13.5928 11.6176 13.4728 11.0928L11.2824 1.5504C11.1576 1.0128 10.7672 0.5776 10.2472 0.3984C9.868 0.2656 9.4744 0.1664 9.084 0.104C8.6856 0.0352 8.2776 0 7.86 0C3.8024 0 0.5 3.3008 0.5 7.3584C0.5 20.9456 11.5528 32 25.1416 32C29.1992 32 32.5 28.6976 32.5 24.64C32.5 24.2256 32.4648 23.8176 32.3976 23.4208Z" fill="var(--phone-settings-text-color)"/>
        </svg>
      </div>

      <div class="text-block" v-if="showCallInfo && showCallInfo.arrayOfCalls.length">
        <span class="text-name">{{showCallInfo.arrayOfCalls.slice(-1)[0].userName}}</span>
        <span class="text-number">{{showCallInfo.arrayOfCalls.slice(-1)[0].userNumber}}</span>
      </div>

      <div class="btn" @click="addNumber()">
        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="26" r="10" fill="var(--phone-settings-text-color)"/>
          <rect x="26.2222" y="19" width="1.55556" height="14" rx="0.777778" fill="var(--blue-white-color)"/>
          <rect x="20" y="26.7778" width="1.55556" height="14" rx="0.777778" transform="rotate(-90 20 26.7778)" fill="var(--blue-white-color)"/>
          <path d="M14.6674 25.4452C14.6675 27.9892 15.2854 30.3726 16.3627 32.3934C14.5722 33.3891 12.4192 33.7943 10.5119 33.7943C8.40366 33.7943 5.99198 33.2982 4.1035 32.0571C2.25099 30.8397 0.865872 28.8873 0.756781 25.8356L0.75 25.4385V21.309C0.75 21.3089 0.75 21.3089 0.75 21.3089C0.750131 20.6294 0.968682 19.9922 1.33788 19.5224C1.70138 19.06 2.17276 18.8044 2.64528 18.7583L2.82087 18.75H15.7474C14.8135 20.8315 14.6646 23.1774 14.6674 25.4452ZM14.6674 25.4452C14.6674 25.4451 14.6674 25.445 14.6674 25.4449H15.4174L14.6674 25.4459C14.6674 25.4457 14.6674 25.4454 14.6674 25.4452Z" stroke="var(--phone-settings-text-color)" stroke-width="1.5"/>
          <path d="M26.9853 12.7161C25.8026 12.7152 24.6265 12.8818 23.4923 13.2103C22.4477 12.5153 21.6369 11.5234 21.168 10.3625C20.6589 9.10211 20.5807 7.7112 20.945 6.40269C21.3094 5.0941 22.0967 3.93906 23.1875 3.11536C24.2783 2.29158 25.6123 1.84497 26.9847 1.84497C28.3571 1.84497 29.6911 2.29158 30.7819 3.11536C31.8727 3.93906 32.66 5.0941 33.0244 6.40269C33.3887 7.7112 33.3105 9.10211 32.8014 10.3625C32.3326 11.5233 31.5218 12.5151 30.4774 13.2101C29.3681 12.888 28.1964 12.7162 26.9853 12.7161ZM26.9853 12.7161L26.9847 13.4661V12.7161C26.9849 12.7161 26.9851 12.7161 26.9853 12.7161Z" stroke="var(--phone-settings-text-color)" stroke-width="1.5"/>
        <path d="M9.8357 0.75C10.8642 0.750093 11.8824 0.951152 12.8322 1.34155C13.782 1.73195 14.6446 2.30396 15.3709 3.02463C16.0972 3.74529 16.673 4.60049 17.0656 5.54124C17.4583 6.48197 17.6603 7.49002 17.6602 8.50787C17.6601 9.52573 17.458 10.5337 17.0651 11.4744C16.6722 12.4151 16.0963 13.2702 15.3699 13.9907C14.6434 14.7112 13.7807 15.2831 12.8309 15.6733C11.881 16.0636 10.8627 16.2644 9.83428 16.2643C7.75698 16.2641 5.76603 15.4453 4.2991 13.9897C2.83237 12.5344 2.00958 10.5619 2.00977 8.50646C2.00995 6.45107 2.83311 4.47872 4.30011 3.02363C5.7673 1.56834 7.7584 0.749813 9.8357 0.75Z" stroke="var(--phone-settings-text-color)" stroke-width="1.5"/>
        </svg>
      </div>

    </div>

    <div class="list-of-calls-wrapper">

      <div class="list-title-date" v-if="showCallInfo">
        <span class="title-text day">{{showCallInfo.dayOfWeek}}</span>
        <span class="title-text date">{{showCallInfo.date}}</span>
      </div>

      <ul class="list-of-calls" v-if="showCallInfo">
        <li class="list-of-calls-item" v-for="(item, index) of showCallInfo.arrayOfCalls" :key="index">
          <span class="time" :style="{color: item.failed ? 'red' : 'var(--font-panel)'}">{{item.time}}</span>
          <div class="direction-and-duration-text-block">
            <span class="direction" :style="{color: item.failed ? 'red' : 'var(--font-panel)'}">{{textDirection(item)}}</span>
            <span class="duration">{{countDuration(item)}}</span>
          </div>
        </li>
      </ul>
    </div>


  </div>
</template>
<script>
import UserDefaultAvatar from '@/components/UserDefaultAvatar'
export default {
  name: 'RecentCallsInfo',
  props: ['showCallInfo', 'setShowCallInfoProp', 'setCallProp'],
  components: {UserDefaultAvatar},
  data() {
    return {

    }
  },
  computed: {
    
  },
  methods: {
    setCall() {
      this.$emit('setCallProp', this.showCallInfo.arrayOfCalls)
    },
    setShowCallInfo(payload) {
      this.$emit('setShowCallInfoProp', payload)
    },
    textDirection(item) {
        if (item.direction === 'outgoing') return 'Outgoing Call'
        if (item.direction === 'incoming') return 'Incoming Call'
        return ''
    },
    countDuration(item) {
        if (item.failed) return ''
        let seconds = Math.round((item.endTime - item.startTime) / 1000),
            minutes = 0,
            hours = 0,
            secondsString = '00',
            minutesString = '00',
            hoursString = '00'

        if (seconds < 0) {
            seconds = 0
        }
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60)
            seconds = seconds % 60
            if (minutes >= 60) {
                hours = Math.floor(minutes / 60)
                minutes = minutes % 60
            }
        }

        hoursString = hours < 10 ? `0${hours}` : hours.toString()
        minutesString = minutes < 10 ? `0${minutes}` : minutes.toString()
        secondsString = seconds < 10 ? `0${seconds}` : seconds.toString()

        return `${hoursString}h ${minutesString}m ${secondsString}s`
    },
    addNumber() {
      const contact = {
        displayName: this.showCallInfo.arrayOfCalls.slice(-1)?.[0]?.userName ?? '', 
        phoneNumbers: [
          {
            label: '', 
            number: this.showCallInfo.arrayOfCalls.slice(-1)[0].userNumber
          }
        ]
      }
      this.$store.dispatch('contactAction', contact)
    }
  }
}
</script>
<style lang="scss" scoped>
  .recent-calls-phone-container-details {
    width: 375px;
    margin: 31px 8px 21px 8px;
    max-height: 653px;
    overflow-x: hidden;
    overflow-y: auto;
    .back-btn{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 7px;
      cursor: pointer;

      .back-btn-arrow {
        margin-right: 5px;
      }

      .back-btn-text {
        color: var(--font-panel);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.408px;
      }
    }

    .user-info-and-btns-block {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btn {
        width: 69px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--phone-elements-bg);
        backdrop-filter: blur(72px);
        border-radius: 11px;
        cursor: pointer;
        transform: scale(1,1);
        transition: all 0.3s;

        &:hover {
          transform: scale(1.1,1.1);
          transition: all 0.3s;
        }
      }

      .text-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .text-name {
          font-weight: 500;
          font-size: 24px;
          line-height: 22px;
          letter-spacing: -0.408px;
          color: var(--font-panel);
        }

        .text-number {
          font-weight: 400;
          font-size: 18px;
          line-height: 34px;
          color: var(--font-panel);
        }
      }
    }

    .list-of-calls-wrapper {
      margin-top: 17px;
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(72px);
      border-radius: 11px;
      padding: 8px 16px 0px 16px;

      .list-title-date {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title-text {
          font-weight: 500;
          font-size: 12px;
          line-height: 22px;
          letter-spacing: -0.408px;
          text-transform: capitalize;
          color: #276899;
        }
      }

      .list-of-calls {
        .list-of-calls-item {
          margin-bottom: 3px;
          display: flex;
          
          .time, .direction {
            font-weight: 500;
            font-size: 12px;
            line-height: 22px;
            letter-spacing: -0.408px;
            text-transform: lowercase;
            margin-right: 8px;
          }

          .direction-and-duration-text-block {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .duration {
            font-weight: 500;
            font-size: 10px;
            line-height: 22px;
            letter-spacing: -0.408px;
            text-transform: lowercase;
            color: #979797;
          }
          .loca-user {
            margin-left: 5px;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
          }
        }
      }
    }
  }
</style>
