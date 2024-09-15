<template>
  <AnimationHOCOfParallelComponents class="recent-calls-phone-container" :valueProp="!showCallInfo">
    <template v-slot:left >
      <RecentCallsList 
        :recentCallsList="recentCallsList" 
        @setCallProp="setCall" 
        @setShowCallInfoProp="setShowCallInfo" />
    </template>
    <template v-slot:right >
      <RecentCallsInfo 
        :showCallInfo="showCallInfo" 
        @setShowCallInfoProp="setShowCallInfo" 
        @setCallProp="setCall" />
    </template>
  </AnimationHOCOfParallelComponents>
</template>
<script>

import RecentCallsList from './RecentCallsList.vue'
import { mapGetters } from 'vuex'
import RecentCallsInfo from './RecentCallsInfo.vue'
import AnimationHOCOfParallelComponents from '../../animationComponents/AnimationHOCOfParallelComponents'
export default {
  name: 'RecentCalls',
  components: { RecentCallsList, RecentCallsInfo, AnimationHOCOfParallelComponents },
  data() {
    return {
      recentCallsList: [],
      showCallInfo: null
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getTime(value) {
      const date = new Date(value)
      return new Intl.DateTimeFormat(navigator.language, {hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(date)
    },
    getDate(value) {
      const date = new Date(value)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    },
    setCall(item) {
      const number = item[0].userNumber.length === 3 && item[0].userNumber[0] !== '*' ? '*' + item[0].userNumber : item[0].userNumber
      this.$store.dispatch('sipCall', number)
    },
    fillingCallsList(callsArray) {

        const getDayOfWeek = (dayOfWeek) => {
            switch (dayOfWeek) {
                case 0: return 'Sunday'
                case 1: return 'Monday'
                case 2: return 'Tuesday'
                case 3: return 'Wednesday'
                case 4: return 'Thursday'
                case 5: return 'Friday'
                case 6: return 'Saturday'
                default: break
            }
        }

        const callMap = {}
        callsArray.forEach(item => {
          item.time = this.getTime(item.startTime)
            if (callMap[`${this.getDate(item?.endTime)} ${getDayOfWeek(new Date(item?.endTime).getDay())}`]) {
                callMap[`${this.getDate(item?.endTime)} ${getDayOfWeek(new Date(item?.endTime).getDay())}`].push(item)
            } else {
                callMap[`${this.getDate(item?.endTime)} ${getDayOfWeek(new Date(item?.endTime).getDay())}`] = [item]
            }
        })

        for(const key in callMap) {
          callMap[key] = this.combinedItemsArray(callMap[key])
        }

        this.recentCallsList = callMap
    },
    combinedItemsArray(arrayOfCalls) {
      let prev
      const getUserNumber = (element) => element.userNumber.length === 4 && element.userNumber[0] === '*' ? element.userNumber.slice(1) : element.userNumber
      const getUserNumberAndStatusFailedAndDirection = (element) => getUserNumber(element) + element.failed.toString() + element.direction

      const combinedItemsArray = arrayOfCalls.reduce((acc, element) => {
          if (!prev) prev = element
          if (getUserNumberAndStatusFailedAndDirection(prev) !== getUserNumberAndStatusFailedAndDirection(element)) {
              prev = element
          }
          if (!acc[getUserNumberAndStatusFailedAndDirection(element) + prev.endTime.toString()]) {
              acc[getUserNumberAndStatusFailedAndDirection(element) + prev.endTime.toString()] = []
          }
          acc[getUserNumberAndStatusFailedAndDirection(element) + prev.endTime.toString()].push(element)
          return acc
      }, {})
      return combinedItemsArray
    },
    setShowCallInfo(payload) {
      this.showCallInfo = payload
    }
  },
  mounted() {
    const storageList = localStorage.getItem('recentCalls')
    this.fillingCallsList((storageList && JSON.parse(storageList)[this.userInfo.uid]) ? JSON.parse(storageList)[this.userInfo.uid] : [])
  }
}
</script>
<style lang="scss" scoped>
  .recent-calls-phone-container {
    display: flex;
    align-items: flex-start;
  }
</style>
