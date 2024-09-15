<template>
  <div class="session-keyboard-container">
    <Keyboard @setNumberProp="setNumber" @callAction="callAction" :marginBottomOfInput="'5px'" />

    <div class="bottom-tabs">
      <span class="phone-down-btn">
        <img src="@/assets/img/icons/Decline.svg" @click="decline()" />
      </span>
      <span class="hide" @click="toggleKeyboard">
        Hide
      </span>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Keyboard from '../../Keyboard.vue'
export default {
  name: 'SessionKeyboard',
  components: {Keyboard},
  props: ['toggleKeyboard'],
  computed: {
    ...mapGetters(['getSetSessionShown'])
  },
  methods: {
    setNumber() {},
    callAction() {},
    decline() {
      this.$store.dispatch('terminateSession', {
        terminateObj: {
          reason_phrase: this.getSetSessionShown.causes.BUSY, status_code: 486
        }, 
        session: this.getSetSessionShown})
    }
  }
}
</script>
<style lang="scss" scoped>
  .session-keyboard-container {
    position: absolute;
    bottom: -25px;
    margin-top: auto;
    // margin-bottom: 92px;

    .bottom-tabs {
      margin-top: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        cursor: pointer;
      }

      .phone-down-btn {
        img {
          border-radius: 50%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
      }

      .hide {
        position: absolute;
        right: 51px;
        top: 5px;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: var(--phone-btn-bg);
        border: 1px solid #276899;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        font-size: 21px;
        line-height: 25px;
        color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
</style>
