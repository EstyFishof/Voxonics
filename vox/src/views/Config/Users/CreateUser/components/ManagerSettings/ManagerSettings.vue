<template>
  <div :class="{disable: getRole !== 'manager'}" v-if="getRole !== 'agent' && getRole != undefined && getRole != null"
       class="wrap-manager-setting">
    <div class="wrap-head">
      <h2 class="wrap-head-title">MANAGER SETTINGS</h2>
      <svg @click="showOptions = !showOptions" class="arrow" :class="{'down': showOptions}" viewBox="0 0 10 18"
           fill="transparent"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1L1 9L9 17" stroke-width="2" stroke="var(--light-blue)" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      <span class="hr"></span>
    </div>

    <template v-if="showOptions">
      <Departments/>
      <AvailableQueues/>
      <Permission/>
    </template>
  </div>
</template>

<script>
import AvailableQueues from "@/views/Config/Users/CreateUser/components/ManagerSettings/components/AvailableQueues"
import Departments from "@/views/Config/Users/CreateUser/components/ManagerSettings/components/Departments"
import Permission from "@/views/Config/Users/CreateUser/components/ManagerSettings/components/Permission"
import { mapGetters } from "vuex"

export default {
  name: "ManagerSettings",
  components: { Departments, AvailableQueues, Permission },
  data() {
    return {
      showOptions: true
    }
  },
  computed: {
    ...mapGetters(['getRole'])
  }
}
</script>

<style scoped lang="scss">
.wrap-manager-setting {
  margin-top: 36px;
  padding-bottom: 36px;
}

.disable {
  pointer-events: none;

  .wrap-head {
    svg {
      transform: rotate(180deg);

      path {
        stroke: #2B343D;
      }
    }
  }
}
</style>
