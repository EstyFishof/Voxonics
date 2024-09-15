<template>

    <div class="incoming-call-main-container">

      <audio :src="callMusic" autoplay loop />

      <div class="account-info-block">
        <UserDefaultAvatar class="ava" :class="{'ava__destroyed': isDestroyed}" ref="ava" sizeWrapper="186px" widthIcon="110px" heightIcon="135px" marginIcon="15px 0 0 0" marginWrapper="auto auto 34px auto" />
        <img class="logo-icon" :class="{'logo-icon__destroyed': isDestroyed}" :src="theme === 'dark' ? logo : logoLight" />
        <div class="account-info-text" :class="{'account-info-text__destroyed': isDestroyed}">
          <span class="name" >{{getSetSessionShown.remote_identity.display_name}}</span>
          <span class="number" >{{getSetSessionShown.remote_identity.uri.user}}</span>
          <span class="connecting-text">Calling...</span>
        </div>
      </div>

      <div class="btns" :class="{'btns__destroyed': isDestroyed}">
        <span class="btn-block">
          <span class="mute" @click="muteCall()">
            <img src="@/assets/img/icons/mute-speaker-icon-white.svg" />
          </span>
          <img width="74" src="@/assets/img/icons/Decline.svg" @click="decline()" />
          <span class="btn-title">Decline</span>
        </span>
        <span class="btn-block">
          <img width="74" src="@/assets/img/icons/phone-call-icon.svg" @click="accept()" />
          <span class="btn-title">Accept</span>
        </span>
      </div>
    </div>
</template>
<script>
import callMusic from '@/assets/audio/Exec 10.mp3'
import logo from '@/assets/img/icons/logo-incoming-call.png'
import logoLight from '@/assets/img/icons/logo-incoming-call-light.png'
import UserDefaultAvatar from '@/components/UserDefaultAvatar'
import { mapGetters } from 'vuex'
export default {
  name: 'IncomingCall',
  components: { UserDefaultAvatar },
  data() {
    return {
      callMusic: callMusic,
      logo,
      logoLight,
      isDestroyed: false
    }
  },
  computed: {
    ...mapGetters(['notConfirmedSessions', 'activeSession', 'getSetSessionShown', 'theme'])
  },
  methods: {
    decline() {
      this.$store.dispatch('terminateSession', {
        terminateObj: {
          reason_phrase: this.getSetSessionShown.causes.BUSY, status_code: 486
        }, 
        session: this.getSetSessionShown})
    },
    muteCall() {
      this.$store.commit('setSessionShown', this.activeSession || null)
    },
    accept() {
      this.isDestroyed = true
      setTimeout(() => {
        this.$store.dispatch('answerCall', {session: this.getSetSessionShown})
      }, 500);
    }
  }
}
</script>
<style lang="scss" scoped>
  .incoming-call-main-container {
    padding: 0 47px 0 47px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 30px);

    .account-info-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
      position: relative;

      .ava {
        transition: all 0.5s ease-in-out;

        &__destroyed {
          transform: scale(0.3);
          margin-left: -250px;
        }
      }

      .logo-icon {
        position: absolute;
        top: 133px;
        right: 40px;
        z-index: 10;
        transition: all 0.5s ease-in-out;
        opacity: 1;

        &__destroyed {
          opacity: 0;
        }
      }

      .account-info-text {
        display: flex;
        flex-direction: column;
        transition: all 0.5s ease-in-out;

        &__destroyed {
          margin-top: -150px;
        }
      }
      span {
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        color: white;
        text-align: center;
      }
      .name {
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        line-height: 33px;
        text-align: center;
        color: var(--font-panel);
      }
      .connecting-text {
        font-style: normal;
        font-weight: 400;
        font-size: 21px;
        line-height: 25px;
        color: white;
        opacity: 0.56;
      }

      .number {
        font-weight: 300;
        font-size: 24px;
        line-height: 28px;
      }
    }

    .btns {
      // margin-top: 390px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 180px;

      .btn-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;

        img {
          border-radius: 50%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }

        .mute {
          position: absolute;
          top: -22px;
          right: -22px;
          cursor: pointer;
          width: 21px;
          height: 21px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.16);
        }

        img {
          cursor: pointer;
        }

        .btn-title {
          margin-top: 11px;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          letter-spacing: -0.01em;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
