<template>
  <div class="phone-main-container"  :class="phoneWindowMode">


    <div class="top-phone-container">
      <span class="phone-time">{{ currentTime }}</span>
      <div class="logo" id="logo-header" @mousedown="dragMouseDown">
        <img v-if="theme === 'dark'" height="24" src="@/assets/img/logo.svg"/>
        <img v-else height="24" src="@/assets/img/icons/logo-light.svg"/>
      </div>
      <div class="connect-checkbox">
        <label class="checkbox-container-block">
          <input :checked="isRegisteredToSoftPhone" @input.prevent="toggleConnection()" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
      <a class="new-tab" @click="togglePhoneMode">
        <img src="@/assets/img/icons/phone-new-tab.svg"/>
      </a>
    </div>

    <marquee class="no-permissions-block" v-if="!getLocalStreamMicrophone">No permissions to access your audio devices/auidio devices not connected</marquee>

    <Speaker v-if="activeSession"/>

    <div class="main-block-for-components">
      <AllSessionsContainer v-if="getAllSession.length"/>
      <AnimationHighOrderComponentPhone>
        <RecentCalls v-if="currentComponent === 'recentCalls'"/>
        <DialingNumber v-if="currentComponent === 'keyboard'"/>
        <Settings v-if="currentComponent === 'settings'"/>      
        <BaseComponent v-if="currentComponent === null && !getAllSession.length"/>
        <Calls v-if="getSetSessionShown"/>
        <Contacts v-if="currentComponent === 'contacts'" />
      </AnimationHighOrderComponentPhone>
    </div>

    <PhoneBottomMenu 
      :show="$route.fullPath === '/agent-panel' || getShowPhone || phoneWindowMode === 'window'" 
      :currentComponent="currentComponent" 
      @setCurrentComponentProp="setCurrentComponent" 
      :goToIndex="getContactFromStore ? 1 : null" 
    />

  </div>
</template>
<script>
import Settings from '@/views/Phone/components/Settings'
import DialingNumber from './components/DialingNumber.vue'
import PhoneBottomMenu from './components/PhoneBottomMenu.vue'
import RecentCalls from './components/RecentCalls/RecentCalls.vue'
import BaseComponent from './components/baseComponent.vue'
import AllSessionsContainer from './components/sessionsContainer/AllSessionsContainer.vue'
import AnimationHighOrderComponentPhone from './animationComponents/AnimationHighOrderComponentPhone.vue'
import Speaker from './components/Speaker.vue'
import { mapGetters } from 'vuex'
import Calls from './components/Calls/Calls'
import Contacts from './components/Contacts/Contacts.vue'
import {phoneScale} from '@/directives/phoneScale'

export default {
  name: 'Phone',
  components: {
    Calls,
    DialingNumber,
    Settings,
    PhoneBottomMenu,
    RecentCalls,
    BaseComponent,
    Speaker,
    AllSessionsContainer,
    Contacts,
    AnimationHighOrderComponentPhone
},
  data() {
    return {
      currentComponent: null,
      currentTime: '',
      sessionTimerId: null,
      dragCoordinates: {pos1: 0, pos2: 0, pos3: 0, pos4: 0},
      options: {
        isPopup: this.phoneWindowMode !== 'window' && !this.popup,
        devicePixelRatio: window.devicePixelRatio
      }
    }
  },
  watch: {
    getSetSessionShown() {
      this.getSetSessionShown ? this.currentComponent = null : null
    },
    getContactFromStore() {
      if(this.getContactFromStore) return this.currentComponent = 'contacts'
    }
  },
  computed: {
    ...mapGetters(['getAllSession', 'phoneWindowMode', 'getShowPhone', 'getLocalStreamMicrophone', 'activeSession', 'getSetSessionShown', 'theme', 'parentFrame', 'popup', 'phoneWindowMode', 'deviceManager', 'isRegisteredToSoftPhone', 'getContactFromStore'])
  },
  methods: {
    togglePhoneMode() {
      if (this.parentFrame) {
        this.$store.commit('setPhoneWindowMode', 'window')
        if (this.phoneWindowMode === 'window' && !this.popup) {
          const popup = window.open(window.location.origin + '/phone', '_blank', `left=0,top=0,width=400,height=820,resizable=no`)
          // popup.addEventListener('load', () => {
          //   console.log(popup.document.body.getElementsByClassName('phone-main-container'))
          //   const phone = popup.document.body.getElementsByClassName('phone-main-container')[0]
          //   phone.style.top = `calc(50% * ${popup.devicePixelRatio})`
          //   phone.style.left = `calc(50% * ${popup.devicePixelRatio})`
          // })
          this.$store.commit('savePopup', popup)
        }
      } else {
        this.$store.commit('setPhoneWindowMode', 'contain')
        if (window.opener) {
          window.opener.postMessage('containModeOn', window.location.origin)
        }
        window.close()
      }
    },
    setCurrentComponent(value) {
      value !== 'sessionKeyboard' ? this.setSessionShown(null) : null
      if (this.currentComponent === value) {
        this.currentComponent = null
      } else {
        this.currentComponent = value
      }
    },
    setSessionShown(payload) {
      this.$store.commit('setSessionShown', payload)
    },
    getCurrentTime() {
      return new Intl.DateTimeFormat(navigator.language, {hour: 'numeric', minute: 'numeric'}).format(new Date())
    },
    calcTime() {
      this.sessionTimerId = setInterval(() => {
        this.currentTime = this.getCurrentTime()
      }, 1000)
    },
    decline(item) {
      this.$store.dispatch('terminateSession', {
        terminateObj: {reason_phrase: item.causes.BUSY, status_code: 487},
        session: item
      })
    },
    toggleConnection() {
      if (this.isRegisteredToSoftPhone === false) {
        return this.$store.dispatch('startConnectionSip')
      }
      return this.$store.dispatch('stopConnectionSip')
    },
    async initialize() {
      await this.$store.dispatch('createDeviceManager')
      const stream = await this.deviceManager.askDevicePermission({audio: true})
      this.$store.commit('setStream', stream)
      await this.$store.dispatch('getMicrophones')
      await this.$store.dispatch('getSpeakers')
    },
    dragMouseDown(e) {
      this.dragCoordinates.pos3 = e.clientX
      this.dragCoordinates.pos4 = e.clientY
      document.addEventListener('mouseup', this.closeDragElement)
      document.addEventListener('mousemove', this.elementDrag)
    },
    elementDrag(e) {
      this.dragCoordinates.pos1 = this.dragCoordinates.pos3 - e.clientX
      this.dragCoordinates.pos2 = this.dragCoordinates.pos4 - e.clientY
      this.dragCoordinates.pos3 = e.clientX
      this.dragCoordinates.pos4 = e.clientY
      this.$el.style.top = this.getTopStyleForPhone() + 'px'
      this.$el.style.left = this.getLeftStyleForPhone() + 'px'
    },
    getTopStyleForPhone() {
      if((this.$el.offsetTop - this.dragCoordinates.pos2) < 0) return 0
      if((this.$el.offsetTop - this.dragCoordinates.pos2) > document.documentElement.clientHeight - 30) return document.documentElement.clientHeight - 30
      return this.$el.offsetTop - this.dragCoordinates.pos2
    },
    getLeftStyleForPhone() {
      if((this.$el.offsetLeft - this.dragCoordinates.pos1) < 0) return 0
      if((this.$el.offsetLeft - this.dragCoordinates.pos1) > document.documentElement.clientWidth - 375) return document.documentElement.clientWidth - 375
      return this.$el.offsetLeft - this.dragCoordinates.pos1
    },
    closeDragElement() {
      document.removeEventListener('mouseup', this.closeDragElement)
      document.removeEventListener('mousemove', this.elementDrag)
    },
  },
  mounted() {
    this.initialize()
    this.calcTime()
    if (window.opener) {
      window.opener.postMessage('openSuccess', window.location.origin)
      window.addEventListener('beforeunload', () => {
        window.opener.postMessage('containModeOn', window.location.origin)
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.sessionTimerId)
  },
  directives: {
    phoneScale
  }
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  position: absolute;
  display: flex;
  margin-top: 60px;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;

  .test {
    padding: 6px;
    border-radius: 8px;
    margin: 10px;
    width: 100px;
  }
}

.phone-main-container {
  position: absolute;
  overflow: hidden;
  right: 22%;
  top: 128px;
  width: 375px;
  height: 812px;
  background-image: url('../../assets/img/icons/phone-bg.svg');
  box-shadow: -1px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  backdrop-filter: blur(300px);
  z-index: 10000;

  &::after {
    content: '';
    position: absolute;
    width: 375px;
    height: 812px;
    background: var(--bg_phone);
    background-position: var(--phone-bg-position);
    background-size: cover;
    left: 0;
    top: 0;
    opacity: var(--phone-bg-opacity);
    z-index: -1;
    filter: blur(3px);
    border-radius: 35px;
  }

  .no-permissions-block {
    width: 304px;
    height: 12px;
    background: #FF3A29;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 46px;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    margin: 4px auto -13px auto;
  }

  .main-block-for-components {
    position: relative;
    height: 660px;
  }

  .top-phone-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;

    .phone-time {
      position: absolute;
      left: 21px;
      top: 14px;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;
      letter-spacing: -0.3px;
      color: var(--font-panel);
    }

    .logo {
      width: 219px;
      height: 30px;
      border-radius: 0 0 40px 40px;
      background: var(--phone-logo-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: move;

      img {
        pointer-events: none;
      }
    }

    .connect-checkbox {
      position: absolute;
      right: 36px;
      top: 8px;

      .checkbox-container-block {
        display: inline-block;
        width: 39px;
        height: 24px;
      }

      .checkbox-container-block input {
        display: none;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        bottom: 0;
        background: #515960;
        border: 2px solid #515960;
        background-position: 95% 4px;
        background-repeat: no-repeat;
        transition: .4s;
        height: 24px;
        width: 39px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 0px;
        top: 0px;
        background-color: #515960;
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
        transform: matrix(-1, 0, 0, 1, 0, 0);
        transition: .4s;
      }

      input:checked + .slider {
        background-position: 4px 6px;
        background-repeat: no-repeat;
        background: #276899;
        border: 2px solid #276899;
      }

      input:checked + .slider:before {
        transform: translateX(15px);
        background: #276899;
        border: 2px solid #276899;
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
      }

      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    }

    .new-tab {
      position: absolute;
      top: 11px;
      right: 11px;
    }
  }
}

.phone-main-container.window {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
}
</style>
