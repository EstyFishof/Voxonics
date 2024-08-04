<template>
  
    <div class="active-call-wrapper">
      
      <CallHeader/>
      <AnimationHighOrderComponentPhone>
        <CallMenu v-if="!isShowedKeyboard" :toggleKeyboard="toggleKeyboard"/>

        <SessionKeyboard v-if="isShowedKeyboard" :toggleKeyboard="toggleKeyboard"/>
      </AnimationHighOrderComponentPhone>

    </div>

</template>
<script>
import CallHeader from './CallHeader.vue';
import CallMenu from './CallMenu.vue';
import AnimationHighOrderComponentPhone from '../../../animationComponents/AnimationHighOrderComponentPhone.vue';
import SessionKeyboard from './SessionKeyboard.vue';
export default {
  name: "ActiveCall",
  components: { CallHeader, CallMenu, AnimationHighOrderComponentPhone, SessionKeyboard },
  data() {
    return {
      isShowedKeyboard: false
    }
  },
  methods: {
    toggleKeyboard() {
      this.isShowedKeyboard = !this.isShowedKeyboard
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
