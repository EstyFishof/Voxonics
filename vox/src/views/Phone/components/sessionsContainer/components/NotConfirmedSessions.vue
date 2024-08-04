<template>
  <AnimationHOCOfSessionsContainers>
    <SwipeGestures
      @setIsOpenProp="setIsOpen"
      @setSessionShownProp="() => clickHander(item)"
    >

      <div class="other-sessions-list-item not-confirmed-item" :class="{'not-active': !isOpen}">

        <span v-if="isOpen" class="other-sessions-item-btn" >
          <img id="click" width="34" height="34" src="@/assets/img/icons/phone-call-icon.svg" @click="accept(item)"/>
        </span>
        <span v-if="isOpen" class="other-sessions-item-name">{{ item.remote_identity.display_name }}</span>
        <span v-if="isOpen" class="other-sessions-item-number-block">
          <span class="other-sessions-item-number">{{ item.remote_identity.uri.user }}</span>
          <span class="mute-speaker-icon">
              <img src="@/assets/img/icons/mute-icon.svg" />
          </span>
        </span>
        <div v-if="isOpen" class="other-sessions-item-time"></div>
        <span v-if="isOpen" class="other-sessions-item-decline" >
          <img id="click" width="34" height="34" src="@/assets/img/icons/Decline.svg" @click="decline(item)" />
        </span>

        <span v-if="!isOpen" class="not-open-text">{{item.remote_identity.display_name ? item.remote_identity.display_name[0] : '?'}}</span>
        <svg v-if="!isOpen" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>

    </SwipeGestures>

  </AnimationHOCOfSessionsContainers>
</template>
<script>
import AnimationHOCOfSessionsContainers from '../../../animationComponents/AnimationHOCOfSessionsContainers.vue'
import SwipeGestures from './SwipeGestures.vue';
export default {
    name: "NotConfirmedSessions",
    components: {AnimationHOCOfSessionsContainers},
    props: [
        "item",
        "acceptProps",
        "declineProps",
        "setSessionShownProps"
    ],
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
        accept(item) {
            this.$emit("acceptProps", item);
        },
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
    },
    components: { AnimationHOCOfSessionsContainers, SwipeGestures }
}
</script>
<style lang="scss" scoped src="@/assets/styles/phone/sessionsContainer.scss"></style>
