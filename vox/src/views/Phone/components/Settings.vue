<template>
  <div class="settings-phone-main-conatainer">

    <div class="account-info-block content-wrapper">
      <span class="pointer-status" :style="{'background-color': getColorAndIconAgentPanel.color}"></span>
      <span class="ava"><img :src="userAgentPanel.avatar || defaultAva" alt="user-avatar"/></span>
      <div class="ava-text-block">
        <span class="name-and-name">{{userAgentPanel.name}}</span>
        <span class="name-and-internal-number">{{userAgentPanel.internalNumber}}</span>
      </div>
    </div>


    <div class="choose-microphone-and-speaker-devices content-wrapper">

      <div class="microphone">
        <label class="options-label">Microphone:
          <input
            class="input-field num"
            type="text"
            readonly
            :value="getCurrentMicrophone"
            placeholder="Microphone"
          />
          <span
            @click="setParam('showList', 'microphone')"
            class="triangle"
            :class="{ 'rotate-arrow': showList === 'microphone' }"
          >
            <img src="@/assets/img/icons/select-arrow.svg" alt="select" />
          </span>
          <DropdownList v-show="showList === 'microphone'" :dataList="microphones"
            @clickFunc="(item) =>  setDevice('setCurrentMicrophone', item)" 
            :clickFuncAll="null" :classNameList="'list-related-numbers'" :itemText="(item) => item.label" 
            :classNameItemComputed="(item) => currentMicrophone.deviceId === item.deviceId ? 'selected' : ''" />
        </label>
      </div>

      <div class="speaker">
        <label class="options-label">Speaker:
          <input
            class="input-field num"
            type="text"
            readonly
            :value="getCurrentSpeaker"
            placeholder="Speaker"
          />
          <span
            @click="setParam('showList', 'speaker')"
            class="triangle"
            :class="{ 'rotate-arrow': showList === 'speaker' }"
          >
            <img src="@/assets/img/icons/select-arrow.svg" alt="select" />
          </span>
          <DropdownList v-show="showList === 'speaker'" :dataList="speakers"
            @clickFunc="(item) =>  setDevice('setCurrentSpeaker', item)" 
            :clickFuncAll="null" :classNameList="'list-related-numbers'" :itemText="(item) => item.label" 
            :classNameItemComputed="(item) => currentSpeaker.deviceId === item.deviceId ? 'selected' : ''" />
        </label>
      </div>
      
    </div>

    <div class="volume-settings content-wrapper">
      <div class="checkbox-container">
        <span class="checkbox-container-title">
          Amplification of sound
        </span>
        <label class="checkbox-container-block">
          <input :checked="getSpeakerGain" @input.prevent="toggle('speakerGainMutation', 'getSpeakerGain')" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="microphone-and-speaker-volume">
        <span class="volume-wrapper speaker-volume">
          <svg class="hover" width="21" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5298 0.190362C10.643 -0.183545 9.6641 0.00157259 8.97508 0.673448C8.95887 0.689268 8.94336 0.705752 8.92859 0.722901L4.50398 5.85954H3.12766C1.40523 5.85954 0.00390625 7.26087 0.00390625 8.98329V11.0137C0.00390625 12.7361 1.40523 14.1375 3.12766 14.1375H4.50402L8.92863 19.2741C8.9434 19.2913 8.95891 19.3078 8.97512 19.3236C9.43051 19.7676 10.0115 20 10.6089 20C10.9188 20 11.2331 19.9374 11.5364 19.8095C12.4191 19.4374 12.9674 18.6105 12.9674 17.6517C12.9674 17.2203 12.6178 16.8707 12.1864 16.8707C11.7551 16.8707 11.4055 17.2203 11.4055 17.6517C11.4055 18.1324 11.0412 18.3233 10.9296 18.3704C10.8181 18.4174 10.4329 18.5431 10.0865 18.2252L5.45371 12.8469C5.30539 12.6747 5.08934 12.5757 4.86203 12.5757H3.12766C2.26645 12.5757 1.56578 11.875 1.56578 11.0138V8.98337C1.56578 8.12216 2.26645 7.42149 3.12766 7.42149H4.86203C5.08934 7.42149 5.30535 7.32243 5.45371 7.15024L10.0864 1.77192C10.4291 1.45767 10.8121 1.58286 10.923 1.62958C11.0362 1.67728 11.4055 1.87083 11.4055 2.35673V13.747C11.4055 14.1784 11.7551 14.528 12.1864 14.528C12.6178 14.528 12.9674 14.1784 12.9674 13.747V2.35673C12.9675 1.39435 12.4166 0.564268 11.5298 0.190362Z" fill="white"/>
            <path d="M16.272 12.2457L16.29 12.2128C16.4942 11.8382 16.8743 11.141 16.8743 9.99895C16.8743 8.81426 16.463 8.08856 16.2653 7.73977C16.0526 7.36457 15.5761 7.23273 15.2009 7.44543C14.8257 7.65812 14.6939 8.13469 14.9065 8.50992C15.0682 8.79508 15.3125 9.2261 15.3125 9.99895C15.3125 10.7429 15.0755 11.1775 14.9187 11.4652L14.8995 11.5003C14.6937 11.8793 14.8341 12.3534 15.213 12.5593C15.3315 12.6236 15.4591 12.6541 15.5851 12.6541C15.8621 12.6541 16.1305 12.5063 16.272 12.2457Z" fill="white"/>
          </svg>
          <span class="range-wrapper" :style="{background: `linear-gradient(to right, ${colorRange[theme].start} 0%, ${colorRange[theme].start} ${getSpeakerVolume * 100 /getMaxAudioVolume('getSpeakerGain', '50', '1')}%,
              ${colorRange[theme].finish} ${getSpeakerVolume * 100 / getMaxAudioVolume('getSpeakerGain', '50', '1')}%, ${colorRange[theme].finish} 100%)`}"><input
              @input="$store.commit('speakerVolumeMutation', $event.target.value)" :value="getSpeakerVolume" class="volume" type="range" step="0.01"
              :max="getMaxAudioVolume('getSpeakerGain', '50', '1')"/></span>
          <svg class="hover left-icon" width="21" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5298 0.190362C10.643 -0.183545 9.6641 0.00157259 8.97508 0.673448C8.95887 0.689268 8.94336 0.705752 8.92859 0.722901L4.50398 5.85954H3.12766C1.40523 5.85954 0.00390625 7.26087 0.00390625 8.98329V11.0137C0.00390625 12.7361 1.40523 14.1375 3.12766 14.1375H4.50402L8.92863 19.2741C8.9434 19.2913 8.95891 19.3078 8.97512 19.3236C9.43051 19.7676 10.0115 20 10.6089 20C10.9188 20 11.2331 19.9374 11.5364 19.8095C12.4191 19.4374 12.9674 18.6105 12.9674 17.6517C12.9674 17.2203 12.6178 16.8707 12.1864 16.8707C11.7551 16.8707 11.4055 17.2203 11.4055 17.6517C11.4055 18.1324 11.0412 18.3233 10.9296 18.3704C10.8181 18.4174 10.4329 18.5431 10.0865 18.2252L5.45371 12.8469C5.30539 12.6747 5.08934 12.5757 4.86203 12.5757H3.12766C2.26645 12.5757 1.56578 11.875 1.56578 11.0138V8.98337C1.56578 8.12216 2.26645 7.42149 3.12766 7.42149H4.86203C5.08934 7.42149 5.30535 7.32243 5.45371 7.15024L10.0864 1.77192C10.4291 1.45767 10.8121 1.58286 10.923 1.62958C11.0362 1.67728 11.4055 1.87083 11.4055 2.35673V13.747C11.4055 14.1784 11.7551 14.528 12.1864 14.528C12.6178 14.528 12.9674 14.1784 12.9674 13.747V2.35673C12.9675 1.39435 12.4166 0.564268 11.5298 0.190362Z" fill="white"/>
            <path d="M16.2701 12.2457L16.288 12.2128C16.4922 11.8382 16.8724 11.141 16.8724 9.99895C16.8724 8.81426 16.4611 8.08856 16.2634 7.73977C16.0507 7.36457 15.5742 7.23273 15.1989 7.44543C14.8237 7.65812 14.6919 8.13469 14.9046 8.50992C15.0662 8.79508 15.3105 9.2261 15.3105 9.99895C15.3105 10.7429 15.0735 11.1775 14.9167 11.4652L14.8976 11.5003C14.6917 11.8793 14.8321 12.3534 15.2111 12.5593C15.3295 12.6236 15.4572 12.6541 15.5831 12.6541C15.8601 12.6541 16.1285 12.5063 16.2701 12.2457Z" fill="white"/>
            <path d="M17.4223 3.83939C17.1159 3.53587 16.6214 3.53822 16.3179 3.84466C16.0144 4.15111 16.0167 4.64556 16.3232 4.94908C17.6848 6.29775 18.4346 8.08927 18.4346 9.99357C18.4346 11.9018 17.6848 13.6954 16.3232 15.0441C16.0167 15.3476 16.0144 15.8421 16.3179 16.1485C16.4706 16.3027 16.6716 16.3799 16.8727 16.3799C17.0713 16.3799 17.2701 16.3046 17.4223 16.1538C19.0823 14.5095 19.9964 12.3218 19.9964 9.99353C19.9965 7.66919 19.0823 5.48361 17.4223 3.83939Z" fill="white"/>
          </svg>
        </span>
        <span class="volume-wrapper microphone-volume">
          <svg class="hover" width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0702 13.5193C16.0702 16.5291 13.8032 19.019 10.887 19.3721V18.4132C13.2773 18.0666 15.1196 16.0042 15.1196 13.5193V8.06273L20.3483 2.83402L19.3402 1.82583L15.1196 6.04636V4.94545C15.1196 2.2185 12.9011 0 10.1742 0C7.44727 0 5.22872 2.2185 5.22872 4.94545V13.5193C5.22872 14.2294 5.37942 14.9049 5.65008 15.5158L4.93819 16.2277C4.51673 15.4163 4.27819 14.4951 4.27819 13.5193V11.1288H2.85239V13.5193C2.85239 14.8912 3.23203 16.176 3.89123 17.2747L0 21.1659L1.00819 22.1741L4.75008 18.4322C5.94056 19.7453 7.60003 20.6256 9.4613 20.8063V22.5742H5.94164V24H14.4067V22.5742H10.887V20.8064C14.591 20.4468 17.496 17.3161 17.496 13.5194V11.1289H16.0702V13.5193ZM6.65456 4.94545C6.65456 3.00473 8.2335 1.4258 10.1742 1.4258C12.1149 1.4258 13.6939 3.00473 13.6939 4.94545V7.47216L6.76608 14.3999C6.69333 14.1184 6.65452 13.8233 6.65452 13.5193L6.65456 4.94545ZM9.46125 19.3721C7.99439 19.1945 6.69197 18.4762 5.75953 17.4228L6.43256 16.7498C7.19302 17.6293 8.25764 18.2387 9.46125 18.4132V19.3721ZM10.1742 17.039C9.07388 17.039 8.0903 16.5312 7.44436 15.738L13.6938 9.48853V13.5193C13.6937 15.4601 12.1148 17.039 10.1742 17.039Z" fill="white"/>
          </svg>
          <span class="range-wrapper" :style="{background: `linear-gradient(to right, ${colorRange[theme].start} 0%, ${colorRange[theme].start} ${getMicrophonesVolume * 100 / getMaxAudioVolume('getMicrophoneGain', '2', '1')}%,
              ${colorRange[theme].finish} ${getMicrophonesVolume * 100 / getMaxAudioVolume('getMicrophoneGain', '2', '1')}%, ${colorRange[theme].finish} 100%)`}"><input
              @input="setVolume('setAudioVolume', $event.target.value, 'setStream', 'microphonesVolumeMutation', getLocalStreamMicrophone)" :value="getMicrophonesVolume" class="volume" type="range" step="0.01"
              :max="getMaxAudioVolume('getMicrophoneGain', '2', '1')"/></span>
          <svg class="hover" width="21" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 5C3.75 2.65279 5.65279 0.75 8 0.75C10.3472 0.75 12.25 2.65279 12.25 5V13C12.25 15.3472 10.3472 17.25 8 17.25C5.65279 17.25 3.75 15.3472 3.75 13V5Z" fill="#276899" stroke="#276899" stroke-width="1.5"/>
            <path d="M14.2222 11V13.4375C14.2222 14.9459 13.5667 16.3926 12.3998 17.4592C11.2329 18.5258 9.65024 19.125 8 19.125C6.34976 19.125 4.76712 18.5258 3.60022 17.4592C2.43333 16.3926 1.77778 14.9459 1.77778 13.4375V11H0V13.4375C0.000933753 15.2356 0.726626 16.9704 2.03842 18.3103C3.35021 19.6503 5.15613 20.5015 7.11111 20.7013V22.375H3.55556V24H12.4444V22.375H8.88889V20.7013C10.8439 20.5015 12.6498 19.6503 13.9616 18.3103C15.2734 16.9704 15.9991 15.2356 16 13.4375V11H14.2222Z" fill="#276899"/>
            <rect x="7" y="17" width="2" height="3" fill="#276899"/>
          </svg>    
        </span>
      </div>

      <div class="microphone-gain-block checkbox-container">
        <span class="checkbox-container-title">
          Microphone gain
        </span>
        <label class="checkbox-container-block">
          <input :checked="getMicrophoneGain" @input.prevent="toggle('microphoneGainMutation', 'getMicrophoneGain')" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    

    <div class="notifications checkbox-container content-wrapper">
      <span class="notifications-title checkbox-container-title">
        <svg class="notifications-title-img" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.808 17.8552C19.7127 17.3462 19.2228 17.011 18.7139 17.1064C18.205 17.2018 17.8697 17.6916 17.965 18.2005C18.0358 18.5781 17.8698 18.8471 17.7646 18.9739C17.6597 19.1003 17.4264 19.3125 17.0437 19.3125H2.81284C2.4301 19.3125 2.19685 19.1004 2.0919 18.9739C1.98671 18.8471 1.82073 18.5781 1.89151 18.2005C2.15743 16.7815 2.69101 15.8482 3.20701 14.9455C3.83368 13.8494 4.48168 12.7159 4.48168 10.9687V9.56245C4.48168 6.60619 6.88463 4.16845 9.83959 4.12556H10.0168C12.9618 4.16836 15.3567 6.60609 15.3567 9.5625V10.9688C15.3567 12.4558 15.8431 13.479 16.2991 14.3214C16.4688 14.6349 16.7913 14.8128 17.1244 14.8128C17.2751 14.8128 17.428 14.7764 17.5698 14.6996C18.0252 14.4532 18.1945 13.8842 17.948 13.4289C17.4944 12.5907 17.2317 11.9194 17.2317 10.9688V9.5625C17.2317 7.63308 16.4844 5.81077 15.1273 4.43128C13.9644 3.24905 12.4711 2.51128 10.8567 2.30766V0.9375C10.8567 0.419719 10.437 0 9.91923 0C9.40144 0 8.98173 0.419719 8.98173 0.9375V2.31042C5.39776 2.77542 2.60673 5.86786 2.60673 9.5625V10.9688C2.60673 12.2178 2.1533 13.0109 1.57927 14.015C1.01377 15.0042 0.372757 16.1254 0.0485698 17.8552C-0.106165 18.6809 0.112742 19.5251 0.649179 20.1714C1.1851 20.8172 1.97377 21.1875 2.81284 21.1875H7.12482C7.12482 22.7383 8.38651 24 9.93732 24C11.4881 24 12.7498 22.7383 12.7498 21.1875H17.0437C17.8828 21.1875 18.6714 20.8172 19.2074 20.1714C19.7438 19.5252 19.9627 18.6809 19.808 17.8552ZM9.93732 22.125C9.42038 22.125 8.99982 21.7044 8.99982 21.1875H10.8748C10.8748 21.7044 10.4543 22.125 9.93732 22.125Z" fill="white"/>
        </svg>
        Notifications
      </span>
      <label class="notifications-checkbox checkbox-container-block">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
    </div>

  </div>
</template>
<script>
import ava from '@/assets/img/icons/user_icon.svg'
import DropdownList from '@/components/DropdownList'
import { mapGetters } from 'vuex'
export default {
  name: 'SettingsPhone',
  components: {
    DropdownList
  },
  data() {
    return {
      amplificationOfSound: false,
      defaultAva: ava,
      showList: '',
      colorRange: {
        dark: {start: '#fff', finish: '#515960'},
        light: {start: '#ACBDD7', finish: '#F7F7FA'},
      },
      devices: {
        microphone: {},
        speaker: {}
      },
      listOfMicrophones: [],
      listOfSpeakers: []
    }
  },
  watch: {
    getMicrophoneGain() {
      this.examinationAfterToggleCheckbox('getMicrophoneGain', 'getMicrophonesVolume', 'setAudioVolume')
    },
    getSpeakerGain() {
      if(!this.getSpeakerGain && this.getSpeakerVolume > 1) {
        this.$store.commit('speakerVolumeMutation', 1)
      }
    }
  },
  computed: {
    ...mapGetters(['userAgentPanel', 'getColorAndIconAgentPanel', 'theme', 'deviceManager', 'getMicrophoneGain', 'getMicrophonesVolume', 'microphones', 'speakers', 'currentSpeaker', 'currentMicrophone', 'getLocalStreamMicrophone', 'getSpeakerGain', 'getSpeakerVolume']),
    getCurrentSpeaker() {
      return this.currentSpeaker?.label
    },
    getCurrentMicrophone() {
      return this.currentMicrophone?.label
    }
  },
  methods: {
    toggle(dispatchParam, getParam) {
      this.$store.commit(dispatchParam, !this[getParam])
    },
    getMaxAudioVolume(param, max, min) {
      return this[param] ? max : min
    },
    setParam(param, value) {
      if(this[param] === value) {
        return this[param] = ''
      }
      this[param] = value
    },
    examinationAfterToggleCheckbox(getParam, volumeParam, dispatchParam) {
      if(!this[getParam] && this[volumeParam] > 1) {
        this.setVolume(dispatchParam, '1')
      }
    },
    setVolume(param, volume, streamCommit, volumeCommit, stream) {
      this.$store.dispatch(param, {stream, volume, streamCommit, volumeCommit})
    },
    setDevice(param, value) {
      this.$store.dispatch(param, value)
      this.showList = ''
    }
  }
}
</script>
<style lang="scss">
  .settings-phone-main-conatainer {
    .choose-microphone-and-speaker-devices {
      margin-bottom: 7px;
      padding: 11px;
      position: relative;
      z-index: 1000;
      .speaker, .microphone {
        position: relative;

        .options-label {
          color: var(--phone-settings-text-color);
          .input-field {
            margin-top: 5px;
            display: block;
            padding: 5px 16px;
            width: 292px;
            height: 29px;
            background: var(--input-bg);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            color: var(--font-panel);
            border: none;
          }

          .triangle {
            height: 29px;
            bottom: 0;
            width: calc(292px - 7px);
          }

          .list-related-numbers {
            width: 292px;
            max-height: 277px;
            overflow-y: auto;

            li {

            }
          }
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .settings-phone-main-conatainer {
    margin-top: 20px;
    padding-left: 8px;
    padding-right: 8px;

    .content-wrapper {
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(72px);
      border-radius: 11px;
      margin-bottom: 7px;
    }

    .account-info-block {
      display: flex;
      align-items: center;
      position: relative;
      padding: 13px;

      .pointer-status {
        position: absolute;
        top: 16px;
        left: 19px;
        z-index: 100;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: inline-block;
      }

      .ava {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 2px solid #276899;
        box-sizing: border-box;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.07);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        

        img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
        }
      }

      .ava-text-block {
        display: flex;
        flex-direction: column;
        span {
          font-weight: normal;
          font-size: 24px;
          line-height: 28px;
          color: var(--font-panel);
        }
        .name-and-name {
          margin-right: 27px;
        }
      }

    }

    .checkbox-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      margin-bottom: 21px;

      .checkbox-container-title {
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: var(--phone-settings-text-color);
      }
    }

    .microphone-gain-block {
      margin-bottom: 0;  
    }

    .volume-settings {
      padding: 11px;
      .microphone-and-speaker-volume {
        margin-bottom: 20px;
        .speaker-volume {
          margin-bottom: 21px;
        }
        .volume-wrapper {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
        }
        .range-wrapper {
          position: relative;
          height: 2px;
          min-width: 250px;
          margin: 0 3px;
        }

        input[type="range"] {
          position: absolute;
          top: -11px;
          left: 0;
          width: 100%;
          height: 24px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
          border: none;
          outline: none;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          border-radius: 10px/100%;
          height: 2px;
        }

        input[type="range"]::-webkit-slider-thumb {
          background: var(--light-blue);
          border-radius: 50%;
          cursor: pointer;
          width: 10px;
          height: 10px;
          -webkit-appearance: none;
          margin-top: -4px;
        }

        input[type="range"]::-moz-range-track {
          border-radius: 10px/100%;
          height: 2px;
        }

        input[type="range"]::-moz-range-thumb {
          background: var(--light-blue);
          border-radius: 50%;
          cursor: pointer;
          width: 10px;
          height: 10px;
          -webkit-appearance: none;
          margin-top: -4px;
        }
      }
    }


    .notifications {
      height: 52px;
      padding-left: 11px;
      padding-right: 11px;
      .notifications-title {
        display: flex;
        align-items: center;

        .notifications-title-img {
          margin-right: 15px;
        }
      }
    }
  }

  .checkbox-container-block {
  display: inline-block;
  width: 60px;
  height: 24px;
  position: relative;
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
  background-color: #979797;
  background-position: 95% 4px;
  background-repeat: no-repeat;
  transition: .4s;
  height: 31px;
  width: 51px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 27px;
  width: 27px;
  left: 0px;
  top: 2px;
  background-color: #979797;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.3), 1px 1px 1px rgba(0, 0, 0, 0.1);
  transition: .4s;
}

input:checked + .slider {
  background-position: 4px 6px;
  background-repeat: no-repeat;
  background: #276899;

}

input:checked + .slider:before {
  transform: translateX(23px);
  background: #276899;
  border: 2px solid #276899;
  box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.3), -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

svg {
  path {
    fill: var(--phone-settings-text-color);
  }
}
</style>
