<template>
  <AnimationHOCOfSessionsContainers>
    <SwipeGestures
      @setIsOpenProp="setIsOpen"
      @setSessionShownProp="() => clickHander(activeSession)">
      <div class="active-session" >

        <span class="other-sessions-list-item" v-if="activeSession" :class="{'not-active': !isOpen}">
          <span v-if="isOpen" class="empty-block"></span>
          <span v-if="isOpen" class="other-sessions-item-name">{{ activeSession.remote_identity.display_name }}</span>
          <span v-if="isOpen" class="other-sessions-item-number-block">
            <span class="other-sessions-item-number">{{ activeSession.remote_identity.uri.user }}</span>
          </span>
          <span v-if="isOpen" class="other-sessions-item-time">{{ activeSessionTime }}</span>
          <span v-if="isOpen" class="other-sessions-item-decline">
            <img id="click" width="34" height="34" src="@/assets/img/icons/Decline.svg" @click="decline(activeSession)" />
          </span>

          <span v-if="!isOpen" class="not-open-text">{{activeSession.remote_identity.display_name ? activeSession.remote_identity.display_name[0] : '?'}}</span>
          <svg v-if="!isOpen" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </span>

        
      </div> 
    </SwipeGestures>
   
  </AnimationHOCOfSessionsContainers>

</template>
<script>
import AnimationHOCOfSessionsContainers from '../../../animationComponents/AnimationHOCOfSessionsContainers.vue'
import SwipeGestures from './SwipeGestures.vue';
export default {
    name: "NotConfirmedSessions",
    components: {
      AnimationHOCOfSessionsContainers,
      SwipeGestures
    },
    props: [
        "item",
        "activeSession",
        "activeSessionTime",
        "declineProps",
        "setSessionShownProps",
    ],
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
        decline(item) {
          this.$emit("declineProps", item);
        },
        clickHander(item) {
          if(!this.isOpen) return this.setIsOpen(true)
          this.setSessionShown(item)
        },
        setSessionShown(item) {
            this.$emit("setSessionShownProps", item);
        },
        setIsOpen(value) {
          this.isOpen = value
        }
    }
}
</script>
<style lang="scss" scoped src="@/assets/styles/phone/sessionsContainer.scss"></style>
