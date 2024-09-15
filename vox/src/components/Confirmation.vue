<template>
  <div v-show="getGlobalConfirmation" class="modal-wrap">
    <div class="modal" ref="modal" v-click-outside="hide">
      <div class="modal-content" v-if="getGlobalConfirmation">
        <h2 class="title">{{getGlobalConfirmation.titleText}}</h2>
        <div class="content">
          <span v-html="getGlobalConfirmation.textConfirmation"></span>
        </div>
        <div class="btn-container" :class="{ 'not-apply': !getGlobalConfirmation.executeBtnText }">
          <button @click="cancel" class="btn">{{getGlobalConfirmation.cancelBtnText}}</button>
          <button v-if="getGlobalConfirmation.executeBtnText" @click="execute" class="btn">{{ getGlobalConfirmation.executeBtnText }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ClickOutside from "vue-click-outside"

export default {
  name: "ConfirmationStore",
  data() {
    return {
      canClose: false
    }
  },
  computed: {
    ...mapGetters(['getGlobalConfirmation'])
  },
  watch: {
    getGlobalConfirmation() {
      setTimeout(() => {
        this.canClose = !!this.getGlobalConfirmation
      }, 200);
    }
  },
  methods: {
    cancel() {
      this.getGlobalConfirmation.cancel()
    },
    hide() {
      if(this.canClose) return this.$store.commit('confirmationMutation', null)
    },
    execute() {
      this.getGlobalConfirmation.execute()
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" && this.getGlobalConfirmation) {
        this.cancel()
      }
      if (e.key === "Escape" && this.getGlobalConfirmation) {
        this.cancel()
      }
    })
    this.$nextTick(() => {
      this.popupItem = this.$refs.modal
    })
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/modalComponents/modalComponents.scss"></style>
<style scoped lang="scss">
.btn-container {
  padding: 26px 0px 0 0px;
  display: flex;
  justify-content: space-between;
  width: 325px;

  &.not-apply {
    justify-content: center;
  }
}

.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.btn {
  width: 155px;
  padding: 8px 10px;
}
</style>
