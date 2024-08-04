<template>
  <div v-if="successMsg" class="modal-wrap">
    <div class="modal">
      <h2 class="title">Success!</h2>
      <div class="content">
        {{ successMsg }}
      </div>
      <div class="btn-container" v-click-outside="hideBlock">
        <button @click="closeModal" class="btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ClickOutside from "vue-click-outside"

export default {
  computed: {
    ...mapGetters(["successMsg"])
  },
  methods: {
    closeModal() {
      this.$store.dispatch("emitClearSuccess")
    },
    hideBlock() {
      this.closeModal()
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" && this.successMsg) {
        this.closeModal()
      }
      if (e.key === "Escape" && this.successMsg) {
        this.closeModal()
      }
    })
    if (this.$el.children?.length) {
      this.popupItem = this.$el.children[0].children[2]
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/modalComponents/modalComponents.scss"></style>
