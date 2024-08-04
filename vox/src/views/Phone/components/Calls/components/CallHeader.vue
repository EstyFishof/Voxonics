<template>
  <div class="call-header-container">
    <div class="account-info-block">
      <UserDefaultAvatar sizeWrapper="55px" widthIcon="35px" heightIcon="45px" marginIcon="5px 0 0 0" marginWrapper="10px 10px auto auto" />
      <div class="account-info-text">
        <span class="name"
              v-if="getSetSessionShown && getSetSessionShown.remote_identity">{{ getSetSessionShown.remote_identity.display_name }}</span>
        <span class="number"
              v-if="getSetSessionShown && getSetSessionShown.remote_identity">{{ getSetSessionShown.remote_identity.uri.user }}</span>
        <span
          class="time-span">{{ getSetSessionShown && getSetSessionShown.status !== 2 ? currentTime : 'Ringing...' }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import UserDefaultAvatar from '@/components/UserDefaultAvatar'
import { mapGetters } from 'vuex'

export default {
  name: 'CallHeader',
  components: {
    UserDefaultAvatar
  },
  data() {
    return {
      interval: null,
      currentTime: '00:00:00'
    }
  },
  computed: {
    ...mapGetters(['activeSession', 'getSetSessionShown'])
  },
  methods: {
    getTime() {
      this.interval = setInterval(() => {
        let seconds = Math.round((Date.now() - new Date(this.getSetSessionShown?.start_time).getTime()) / 1000)
        if (seconds < 0) {
          seconds = 0
        }
        let minutes = 0, days = 0, hours = 0
        if (seconds >= 60) {
          minutes = Math.floor(seconds / 60)
          seconds = seconds % 60

          if (minutes >= 60) {
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
        this.currentTime = `${hours}:${minutes}:${seconds}`
        return [days, `${hours}:${minutes}:${seconds}`]
      }, 1000)
    }
  },
  mounted() {
    this.getTime()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss" scoped>
.call-header-container {
  margin-top: 100px;
  padding-left: 36px;
  width: 100%;

  .account-info-block {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;

    .account-info-text {
      display: flex;
      flex-direction: column;
    }

    span {
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      color: var(--font-panel);
    }

    .name {
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 38px;
      // margin-right: 27px;
    }

    .number {
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
    }

    .time-span {
      font-style: normal;
      font-weight: 400;
      font-size: 21px;
      line-height: 25px;
      color: var(--font-panel);
    }
  }
}
</style>
