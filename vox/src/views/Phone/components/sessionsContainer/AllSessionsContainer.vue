<template>
  <div class="other-sessions">

    <NotConfirmedSessions 
      v-for="(item, index) of notConfirmedSessions.filter(el => el !== getSetSessionShown)"
      :key="index"
      :item="item"
      @acceptProps="accept"
      @declineProps="decline"
      @setSessionShownProps="setSessionShown"
    />

    <DeferredSessions
      v-for="(item, index) of deferredSessions.filter(element => element !== getSetSessionShown)" 
      :key="index"
      :item="item"
      :arrayOfDeferredSessions="arrayOfDeferredSessions"
      @setSessionProps="setSession"
      @declineProps="decline"
      @setSessionShownProps="setSessionShown"
    />

    <ActiveSession
      v-if="activeSession && activeSession !== getSetSessionShown"
      :activeSession="activeSession"
      :activeSessionTime="activeSessionTime"
      @declineProps="decline"
      @setSessionShownProps="setSessionShown"
    />

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NotConfirmedSessions from './components/NotConfirmedSessions.vue'
import DeferredSessions from './components/DeferredSessions.vue';
import ActiveSession from './components/ActiveSession.vue';
export default {
    name: "AllSessionsContainer",
    components: {NotConfirmedSessions, DeferredSessions},
    data() {
        return {
            arrayOfDeferredSessions: new Map(),
            sessionTimerId: null,
            activeSessionTime: ""
        };
    },
    computed: {
        ...mapGetters(["activeSession", "deferredSessions", "notConfirmedSessions", "getSetSessionShown"])
    },
    methods: {
        defferedSessionsCalc() {
            this.deferredSessions.forEach(item => {
                const time = this.calcTime(item).time;
                if (this.arrayOfDeferredSessions.has(item)) {
                    this.arrayOfDeferredSessions.delete(item);
                }
                this.arrayOfDeferredSessions.set(item, time);
                this.arrayOfDeferredSessions = new Map(this.arrayOfDeferredSessions);
            });
        },
        activeSessionCalc() {
            this.activeSessionTime = this.calcTime(this.activeSession).time;
        },
        setSessionShown(session) {
            this.$store.commit("setSessionShown", session);
        },
        calcTime(item) {
            if (!item)
                return { time: "" };
            let seconds = Math.round((Date.now() - new Date(item.start_time).getTime()) / 1000);
            if (seconds < 0) {
                seconds = 0;
            }
            let minutes = 0, days = 0, hours = 0;
            if (seconds >= 60) {
                minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
                if (minutes >= 60) {
                    hours = Math.floor(minutes / 60);
                    minutes = minutes % 60;
                    if (minutes >= 1440) {
                        days = Math.floor(minutes / 1440);
                        minutes = minutes % 1440;
                    }
                }
            }
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            hours = hours < 10 ? `0${hours}` : hours;
            days = days < 10 ? `0${days}` : days;
            if (!minutes) {
                minutes = "00";
            }
            this.currentTime = `${minutes}m : ${seconds}s`;
            return { days, time: `${hours}:${minutes}:${seconds}` };
        },
        setIntervalTime() {
            this.sessionTimerId = setInterval(() => {
                this.defferedSessionsCalc();
                this.activeSessionCalc();
            }, 1000);
        },
        accept(item) {
            this.$store.dispatch("answerCall", { session: item });
        },
        decline(item) {
            this.$store.dispatch("terminateSession", {
                terminateObj: {
                    reason_phrase: item.causes.BUSY,
                    status_code: 486
                },
                session: item
            });
        },
        setSession(item) {
            this.$store.commit("changeSession", item);
        },
    },
    mounted() {
        this.setIntervalTime();
    },
    beforeDestroy() {
        clearInterval(this.sessionTimerId);
    },
    components: { NotConfirmedSessions, DeferredSessions, ActiveSession }
}
</script>
<style lang="scss" scoped>
  .other-sessions {
    margin-top: 9px;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1000;
  }
</style>
