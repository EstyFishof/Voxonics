<template>
  <div class="calls-container">
    <AnimationHighOrderComponentPhone>
      <IncomingCall v-if="getSetSessionShown.direction === 'incoming' && getSetSessionShown.status === 4"/>
    </AnimationHighOrderComponentPhone>

    <ActiveCall v-if="getSetSessionShown.status !== 4" />
    
    <!-- <AnimationHighOrderComponentPhone>
      <CallHeader v-if="getSetSessionShown.status !== 4"/>
    </AnimationHighOrderComponentPhone>
    
    <AnimationHighOrderComponentPhone>
      <CallMenu v-if="getSetSessionShown.status !== 4"/>
    </AnimationHighOrderComponentPhone> -->
    
  </div>

</template>

<script>

import CallMenu from './components/CallMenu'
import CallHeader from './components/CallHeader'
import IncomingCall from './components/IncomingCall'
import SessionKeyboard from './components/SessionKeyboard'
import { mapGetters } from 'vuex'
import AnimationHighOrderComponentPhone from '../../animationComponents/AnimationHighOrderComponentPhone.vue'
import ActiveCall from './components/ActiveCall.vue'

export default {
  name: 'Calls',
  components: {
    CallMenu,
    CallHeader,
    IncomingCall,
    SessionKeyboard,
    AnimationHighOrderComponentPhone,
    ActiveCall
},
  computed: {
    ...mapGetters(['getSetSessionShown', 'notConfirmedSessions']),
  }
}
</script>

<style>
.calls-container {
  height: calc(100% - 103px);
  position: relative;
}
</style>
