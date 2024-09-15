
import store from '../index'
import OnlineIcon from "@/assets/img/icons/OnlineIcon.svg"
import PauseIcon from "@/assets/img/icons/PauseIcon.svg"
import OfflineIcon from "@/assets/img/icons/OfflineIcon.svg"
import TalkingIcon from "@/assets/img/icons/TalkingIcon.svg"
import UnreachableIcon from "@/assets/img/icons/UnreachableIcon.svg"
import CallingIcon from "@/assets/img/icons/CallingIcon.svg"

const computedTime = () => {
    const time =
    store.getters.userAgentPanel.status === "onpause"
          ? store.getters.userAgentPanel.statusTime
          : store.getters.userAgentPanel.statusPhone.time
    let seconds = Math.round((Date.now() - +sessionStorage.getItem('offsetTime') - +time) / 1000)
    if (seconds < 0) {
        seconds = 0
    }
    let minutes, days
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60)
        seconds = seconds % 60
        if (minutes >= 1440) {
            days = Math.floor(minutes / 1440)
            minutes = minutes % 1440
        }
    }
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    days = days < 10 ? `0${days}` : days
    if (!minutes) {
        minutes = '00'
    }
    return {days: days, time: `${minutes}m : ${seconds}s`}
}

export default {
    state: {
        time: '',
        timer: null,
        colorAndIcon: {}
    },
    mutations: {
        setTimeAgentPanel(state) {
            state.timer = setInterval(() => {
                state.time = computedTime()
            }, 1000)
        },
        setClearTimerAgentPanel(state) {
            clearInterval(state.timer)
        },
        setColorAgentPanel(state, status) {
            switch (status) {
                case "online":
                  state.colorAndIcon = { color: "#00C82C", icon: OnlineIcon }
                  break
                case "paused":
                    state.colorAndIcon = { color: "#FFB200", icon: PauseIcon }
                    break
                case "onpause":
                    state.colorAndIcon = { color: "#FFB200", icon: PauseIcon }
                    break
                case "offline":
                    state.colorAndIcon = { color: "#FF3A29", icon: OfflineIcon }
                    break
                case "calling":
                    state.colorAndIcon = { color: "#78ABCE", icon: CallingIcon }
                    break
                case "ringing":
                    state.colorAndIcon = { color: "#78ABCE", icon: CallingIcon }
                    break
                case "talking":
                    state.colorAndIcon = { color: "#276899", icon: TalkingIcon }
                    break
                case "blocked":
                    state.colorAndIcon = { color: "#636D75", icon: UnreachableIcon }
                    break
                default:
                  if (status?.indexOf("&") !== -1) {
                    state.colorAndIcon = { color: "#78ABCE", icon: CallingIcon }
                  } else state.colorAndIcon = { color: "#636D75", icon: UnreachableIcon }
              }
        }
    },
    getters: {
        getTimeAgentPanel: state => state.time,
        getColorAndIconAgentPanel: state => state.colorAndIcon
    }
}
