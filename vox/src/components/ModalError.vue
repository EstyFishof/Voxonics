<template>
  <div v-if="errorMsg" class="modal-wrap">
    <div class="modal">
      <h2 class="title">You have error:</h2>
      <div class="content">
        {{ errorMsg }}
      </div>
      <div class="btn-container">
        <button @click="closeModal" class="btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import ClickOutside from "vue-click-outside"

export default {
  computed: {
    ...mapGetters(["errorMsg"]),
  },
  methods: {
    closeModal() {
      this.$store.dispatch("emitClearError")
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' && this.errorMsg) {
        this.closeModal()
      }
      if (e.key === "Escape" && this.errorMsg) {
        this.closeModal()
      }
    })
    if(this.$el.children?.length) {
      this.popupItem = this.$el.children[0].children[2]
    }

  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/modalComponents/modalComponents.scss"></style>
