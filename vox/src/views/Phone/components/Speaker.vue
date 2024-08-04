<template>
  <audio :src="remoteStream" autoplay ref="audio"></audio>
</template>

<script>

export default {
  name: 'Speaker',
  watch: {
    currentSpeaker() {
      this.$refs.audio.setSinkId(this.currentSpeaker.deviceId)
    }
  },
  computed: {
    remoteStream() {
      const receivers = this.$store.getters.activeSession.connection.getReceivers()
      const stream = new MediaStream([receivers[0].track])
      return stream
    },
    currentSpeaker() {
      return this.$store.getters.currentSpeaker
    }
  },
  mounted() {
    this.$refs.audio.srcObject = this.remoteStream
  }
}
</script>
