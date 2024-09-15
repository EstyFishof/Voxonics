<template>
  <div class="personal-info-wrap" :class="{'disabled-events': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">
    <div class="wrap-head">
      <h2>QUEUE INFO</h2>
      <span class="hr"></span>
      <img @click="del()" class="trash" src="@/assets/img/icons/trash.svg" alt="trash" width="30" :class="{'grayscale': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">
    </div>

    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <span>  Name of Queue:</span>
          <div class="item-container with-err" :class="{'grayscale': !$access.isEditDepAndQueue(userInfo, 'queue', getQueueInfo)}">
            <div class="left-section-block">
              <input :style="{width: computedWidth}"
                    placeholder="Enter name of Queue"
                    :class="{'input-field': edit}"
                    :defaulValue="getQueueNameInfo"
                    v-model.trim="name"
                    maxlength="12"
                    @input="setQueueName"
              />
              <span class="last-update-block">
                <span class="last-update-text">Last updated:</span>
                <span class="last-update-data">{{getQueueInfo.dateUpdated}}</span>
              </span>
            </div>
            <div class="wrap-static">
              <div class="static">
                <div class="label">Number of Queue:</div>
                <div class="num">{{ getQueueInfo.internalNumber }}</div>
              </div>
              <div class="static">
                <div class="label">Agents in Queue:</div>
                <div class="num">{{ getAgentsLength || 0 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import store from "../../../../../store"

export default {
  name: "QueueInfo",
  data() {
    return {
      name: "",
      edit: false
    }
  },
  computed: {
    ...mapGetters(['numbersDep', 'getAgentsQueueInfo', 'managersDep', 'getQueueNameInfo', 'getQueueInfo', 'getAgentsLength', 'userInfo', 'getQueueInfo']),
    computedWidth() {
      return this.name.length ? 32 + this.name.length * 1.1 * 24 + 'px' : '100%'
    }
  },
  methods: {
    del() {
      this.$store.dispatch('setDeleteQueueInfo', true)
    },
    setQueueName() {
      this.$store.dispatch('setQueueNameInfo', this.name)
    },
  },
  mounted() {
    this.name = this.getQueueNameInfo
    store.subscribe((mutation) => {
      if (mutation.type === 'queueInfoMutation') {
        this.name = this.getQueueNameInfo
      }
    })
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/departmentsAndQueues/info.scss"></style>
