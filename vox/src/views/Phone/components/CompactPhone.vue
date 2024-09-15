<template>
  <div class="compact-phone-fixed-container">
    <div class="compact-phone-block">

      <span class="icon-span" v-if="getSetSessionShown">
        <img class="decline-icon" width="55" src="@/assets/img/icons/Decline.svg" @click.stop="decline()" />
      </span>

      <span class="mute" v-if="notConfirmedSessions.length && notConfirmedSessions.filter(el => el === getSetSessionShown).length && notConfirmedSessions[notConfirmedSessions.length - 1].direction === 'incoming'" @click="muteCall()">
        <img src="@/assets/img/icons/mute-speaker-icon-white.svg" />
      </span>

      <span class="name-and-number-user-block" :class="{'talking-user-block': !!getSetSessionShown}">
        <span class="name-user" v-if="getSetSessionShown">{{userData.name}}</span>
        <span class="number-user" v-if="getSetSessionShown">{{userData.internalNumber}}</span>
      </span>

      <span class="time-span" v-if="getSetSessionShown && getSetSessionShown.status !== 4 && getSetSessionShown.status !== 2">{{currentTime}}</span>

      <div class="btns-block" v-if="getSetSessionShown && getSetSessionShown.status !== 4 && getSetSessionShown.status !== 2">
        <span class="microphone" :class="{active: isMuted()}" @click="toggleMute()">
          <img width="14" height="16" src="@/assets/img/icons/microphone-mute.svg" />
        </span>
        <span class="speakers">
          <img src="@/assets/img/icons/mute-icon.svg" />
        </span>
        <span class="hold" :class="{active: isHold()}" @click="setHold()">
          <img width="22" height="23.76" src="@/assets/img/icons/phone-pause.svg" />
        </span>
      </div>

      <span class="icon-span" v-if="notConfirmedSessions.length && notConfirmedSessions.filter(el => el === getSetSessionShown).length && notConfirmedSessions[notConfirmedSessions.length - 1].direction === 'incoming'">
        <img class="accept-icon" width="55" src="@/assets/img/icons/phone-call-icon.svg" @click.stop="accept()" />
      </span>

      <div class="sessions-list-block">
        <ul class="sessions-list" :class="{'two-items-list': sessionsList.length === 2}" v-if="getSetSessionShown">
          <li class="sessions-list-item" v-for="(item, index) of sessionsList" :key="index" :class="{active: item.id === getSetSessionShown.id, 'not-active': item.id !== getSetSessionShown.id}">
            <svg class="ellipse-icon first-icon" width="6" height="29" viewBox="0 0 6 29" fill="none" xmlns="http://www.w3.org/2000/svg" @click="setSessionShown(item)">
              <mask :id="'path-1-inside-1_7297_20224' + index" fill="white">
              <path d="M2.46051 0.0937119C4.3742 4.51322 5.34138 9.28444 5.29982 14.1003C5.25825 18.9162 4.20885 23.67 2.21916 28.0558L0.938883 27.475C2.84749 23.2679 3.85413 18.7078 3.894 14.0882C3.93388 9.46855 3.00611 4.89176 1.1704 0.652343L2.46051 0.0937119Z" />
              </mask>
              <path :style="{stroke: selectColor(item)}" d="M2.46051 0.0937119C4.3742 4.51322 5.34138 9.28444 5.29982 14.1003C5.25825 18.9162 4.20885 23.67 2.21916 28.0558L0.938883 27.475C2.84749 23.2679 3.85413 18.7078 3.894 14.0882C3.93388 9.46855 3.00611 4.89176 1.1704 0.652343L2.46051 0.0937119Z" fill="#C4C4C4" :mask="`url(#path-1-inside-1_7297_20224${index})`"/>
            </svg>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CompactPhone',
  data() {
    return {
      timeSeconds: 0,
      interval: null,
      currentTime: '',
      userData: {
        name: '',
        internalNumber: ''
      }
    }
  },
  watch: {
    getSetSessionShown() {
      if(this.getSetSessionShown) {
        this.userData.name = this.getSetSessionShown.remote_identity.display_name
        this.userData.internalNumber = this.getSetSessionShown.remote_identity.uri.user
        this.getTime()
      } else {
        clearInterval(this.interval)
      }
    }
  },
  computed: {
    ...mapGetters(['activeSession', 'notConfirmedSessions', 'getSetSessionShown', 'deferredSessions']),
    sessionsList() {
      return [...this.notConfirmedSessions, ...this.deferredSessions, this.activeSession].filter(el => !!el)
    }
  },
  methods: {
    isMuted() {
      return this.getSetSessionShown ? this.getSetSessionShown.isMuted().audio : null
    },
    decline() {
      const session = this.getSetSessionShown
      this.$store.dispatch('terminateSession', {
        terminateObj: {
          reason_phrase: session.causes.BUSY, status_code: 486
        }, 
        session: session})
    },
    selectColor(item) {
      if(item.id === this.activeSession?.id) {
        return '#00C82C'
      } else if (this.notConfirmedSessions.filter(el => el.id === item.id).length) {
        return '#FFFFFF'
      } else if(this.deferredSessions.filter(el => el.id === item.id).length) {
        return '#FFB200'
      }
    },
    setSessionShown(session) {
      this.$store.commit('setSessionShown', session)
    },
    isHold() {
      return this.getSetSessionShown.isOnHold().local
    },
    setHold() {
      if(this.activeSession !== this.getSetSessionShown) {
        return this.$store.commit('changeSession', this.getSetSessionShown)
      }
      this.toggleHold()
    },
    muteCall() {
      this.$store.commit('setSessionShown', this.activeSession || null)
    },
    toggleHold() {
      if(this.isHold()) {
        return this.$store.dispatch('unHoldSession', {session: this.activeSession})
      }
      return this.$store.dispatch('holdSession', {session: this.activeSession})
    },
    getTime() {
      this.interval = setInterval(() => {
        let seconds = Math.round((Date.now() - new Date(this.getSetSessionShown?.start_time).getTime()) / 1000)
        if (seconds < 0) {
            seconds = 0
        }
        let minutes, days, hours
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60)
            seconds = seconds % 60

            if(minutes >= 60) {
              hours = Math.floor(minutes / 60)
              minutes = minutes % 60

                if (minutes >= 1440) {
                  days = Math.floor(minutes / 1440)
                  minutes = minutes % 1440
              }
            }
        }
        minutes = minutes < 10 ? `0${minutes}` : minutes
        seconds = seconds < 10 ? `0${seconds}` : seconds
        hours = hours < 10 ? `0${hours}` : hours
        days = days < 10 ? `0${days}` : days
        if (!minutes) {
            minutes = '00'
        }
        this.currentTime = `${minutes}m : ${seconds}s`
        return [days, `${hours}h : ${minutes}m : ${seconds}s`]
      }, 1000)
    },
    accept() {
      this.$store.dispatch('answerCall', {session: this.getSetSessionShown})
    },
    scrollListener(e) {
      const index = this.sessionsList.findIndex(el => el.id === this.getSetSessionShown.id)
      let nextElement = null
      if(e.deltaY >= 100 || e.deltaX >= 1) {
        nextElement = this.sessionsList[index + 1]
      }
      if(e.deltaY <= -100 || e.deltaX <= -1) {
        nextElement = this.sessionsList[index - 1]
      }
      nextElement ? this.setSessionShown(nextElement) : null
    },
    toggleMute() {
      if(this.isMuted()) {
        return this.$store.dispatch('unmuteSession', {session: this.activeSession})
      }
      return this.$store.dispatch('muteSession', {session: this.activeSession})
    },
    dragElement(elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

      elmnt.onmousedown = dragMouseDown

      function dragMouseDown(e) {
        e = e || window.event
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }

      function elementDrag(e) {
        e = e || window.event
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  },
  mounted() {
    this.dragElement(this.$el)
    this.$el.addEventListener('wheel', this.scrollListener, {capture: true})
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss" scoped>
  .compact-phone-fixed-container {
    position: fixed;
    width: 453px;
    height: 69px;
    z-index: 10000;
    cursor: move;

    .compact-phone-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      border-radius: 999px;
      padding: 2px 7px 0 7px;
      position: relative;
      background-image: url('../../../assets/img/icons/compact-phone-bg.png');
      backdrop-filter: blur(6px);

      .compact-top-list-block {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .compact-top-list {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .compact-top-list-item {
          height: 2px;
          width: 78px;
          border-radius: 8px;
          cursor: pointer;
          transform: scale(1, 1);
          transition: all .2s ease-in-out;
          display: block;
          margin-right: 4px;

          &:hover {
            transform: scale(1.1, 1.1);
            transition: all .2s ease-in-out;
          }

          &.not-confirmed {
            background: #FFFFFF;
          }

          &.deferred {
            background: #FFB200;
          }

          &.active {
            background: #00C82C;
          }
        }
      }

      .icon-span {
        display: block;
        width: 68px;

        img {
          cursor: pointer;
          transform: scale(1, 1);
          transition: all .3s ease-in-out;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

          &:hover {
            transform: scale(1.05, 1.05);
            transition: all .3s ease-in-out;
          }
        }
      }

      .sessions-list-block {
        position: absolute;
        height: 100%;
        right: 0;
        .sessions-list {
          position: relative;
          height: 100%;
          .sessions-list-item {
            position: absolute;
            cursor: pointer;
            &:nth-child(2) {
              top: calc(9% - 14.5px);
              transform: rotate(-55deg);
              right: 11px;
            }
            &:nth-child(1) {
              top: calc(50% - 14.5px);
              right: 0;
              transform: rotate(0);
            }
            &:nth-child(3) {
              top: calc(88% - 14.5px);
              transform: rotate(60deg);
              right: 18px;
            }
            
            

            &.not-active {
              svg {
                stroke: white;
                stroke-width: 1;
              }
            }

            &.active {
              svg {
                stroke: white;
                stroke-width: 4;
              }
            }
          }

          &.two-items-list {
            .sessions-list-item {
              &:nth-child(1) {
                top: calc(69% - 14.5px);
                right: 4px;
                transform: rotate(26deg);
              }
              &:nth-child(2) {
                top: calc(27% - 14.5px);
                transform: rotate(-29deg);
                right: 2px;
              }
            }
          }
        }
      }

      .mute {
        position: absolute;
        left: 77px;
        bottom: 7px;
        cursor: pointer;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.16);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      .toggle-mute {
        position: absolute;
        left: 89px;
        top: 53px;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.16);
      }

      .name-and-number-user-block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        span {
          font-style: normal;
          color: #FFFFFF;
          text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3), 0px 2px 32px rgba(0, 0, 0, 0.16);
        }

        .name-user {
          font-weight: normal;
          font-size: 32px;
          line-height: 37px;
        }

        .number-user {
          font-weight: 300;
          font-size: 24px;
          line-height: 28px;
        }

        &.talking-user-block {
          .name-user {
            font-size: 24px;
            line-height: 28px;
          }
          .number-user {
            font-size: 18px;
            line-height: 21px;
          }
        }
      }

      .time-span {
        font-style: normal;
        font-weight: normal;
        font-size: 21px;
        line-height: 25px;
        color: #FFFFFF;
        text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3), 0px 2px 32px rgba(0, 0, 0, 0.16);
      }

      .btns-block {
        width: 65px;
        position: relative;
        margin-top: 3px;
        margin-bottom: 5px;
        height: calc(100% - 8px);

        span {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          cursor: pointer;
          transform: scale(1, 1);
          transition: all .3s ease-in-out;

          &.active {
            background: var(--phone-call-menu-btn-active-bg);
          }

          &:hover {
            transform: scale(1.1, 1.1);
            transition: all .3s ease-in-out;
          }

          &.microphone, &.speakers {
            width: 28px;
            height: 28px;
            left: 0;
          }

          &.microphone {
            top: 0;
          }

          &.speakers {
            bottom: 0;
          }

          &.hold {
            width: 37px;
            height: 37px;
            right: 0;
            top: calc(50% - 18.5px);
          }
        }
      }

      // .ellipse-icon {
      //   position: absolute;
      //   top: calc(50% - 14.5px);
      //   right: 0;
      // }
    }
  }
</style>
