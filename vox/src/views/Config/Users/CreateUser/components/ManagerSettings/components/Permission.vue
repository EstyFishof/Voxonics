<template>
  <div class="wrap-agent-setup" v-if="getRole !== 'admin' && getRole !== 'owner'">
    <div class="wrap-head">
      <h2 class="wrap-head-title">Permission</h2>
      <svg @click="showOptions = !showOptions" class="arrow" :class="{'down': showOptions}" viewBox="0 0 10 18"
           fill="transparent"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1L1 9L9 17" stroke-width="2" stroke="var(--light-blue)" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      <span class="hr"></span>
    </div>
    <div class="wrap-body" v-if="showOptions && getRole !== 'admin' && getRole !== 'owner'">
      <div class="wrap-tables">
        <div class="calls-pipe__block">
          <div class="calls-pipe__title">Calls History</div>
          <ul class="calls-pipe__table-header">
            <li class="calls-pipe__header-item"></li>
            <li class="calls-pipe__header-item">View</li>
            <li class="calls-pipe__header-item">Listen</li>
            <li class="calls-pipe__header-item">Export</li>
            <li class="calls-pipe__header-item">Billing</li>
          </ul>
          <ul class="calls-pipe__table-block">
            <ul class="table-content">
              <li class="table-content__item">All</li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="view"
                         :disabled="cdr.listen || cdr.export || cdr.billing"
                         :checked="cdr.view || cdr.listen || cdr.export || cdr.billing"
                         @click="changeCDR('view', 'view')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="transfer" :checked="cdr.listen" @click="changeCDR('listen', 'listen')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="reject" :checked="cdr.export" @click="changeCDR('export', 'export')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="hangup" :checked="cdr.billing"
                         @click="changeCDR('billing', 'billing')"/>
                  <span class="check"></span>
                </label>
              </li>
            </ul>
            <ul class="table-content">
              <li class="table-content__item">Personal</li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-view"
                         :disabled="cdr.view || cdr.listen || cdr.export || cdr.billing || cdr.billingP || cdr.listenP || cdr.exportP || cdr.billingP"
                         :checked="cdr.viewP || cdr.view || cdr.listen || cdr.export || cdr.billingP || cdr.viewP || cdr.listenP || cdr.exportP || cdr.billingP"
                         @click="changeCDR('viewP', 'view')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer" :disabled="cdr.listen"
                         :checked="cdr.listenP || cdr.listen"
                         @click="changeCDR('listenP', 'listen')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer" :disabled="cdr.export"
                         :checked="cdr.exportP || cdr.export"
                         @click="changeCDR('exportP', 'export')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer" :disabled="cdr.billing"
                         :checked="cdr.billingP || cdr.billing"
                         @click="changeCDR('billingP', 'billing')"/>
                  <span class="check"></span>
                </label>
              </li>
            </ul>
          </ul>
        </div>
        <div class="wrap-tables bottom-wrap">
          <div class="calls-pipe__block billing">
            <div class="calls-pipe__title">Billing</div>
            <ul class="calls-pipe__table-header">
              <li class="calls-pipe__header-item">Billing <br> Reports</li>
            </ul>
            <ul class="calls-pipe__table-block">
              <ul class="table-content">
                <li class="table-content__item">
                  <label class="table-content__label">
                    <input type="checkbox" class="view" v-model="billing" @click="setViewBilling()"/>
                    <span class="check"></span>
                  </label>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ClickOutside from "vue-click-outside"

export default {
  name: "AgentSetup",
  data() {
    return {
      showOutNum: '',
      role: '',
      cdr: {
        view: false,
        viewP: false,
        listen: false,
        listenP: false,
        export: false,
        exportP: false,
        billing: false,
        billingP: false
      },
      showOptions: true,
      billing: false
    }
  },
  computed: {
    ...mapGetters(['getRole']),
  },
  methods: {
    changeCDR(param, storeParam) {
      this.cdr[param] = !this.cdr[param]
      if (!param.includes('P')) {
        this.cdr[param + 'P'] = false
      }
      switch (storeParam) {
        case 'view':
          this.$store.dispatch('setCreatePermissionCDR', {
            param: 'view',
            value: this.cdr.view ? 'all' : this.cdr.viewP ? 'personal' : ''
          })
          break
        case 'listen':
          this.$store.dispatch('setCreatePermissionCDR', {
            param: 'listen',
            value: this.cdr.listen ? 'all' : this.cdr.listenP ? 'personal' : ''
          })
          break
        case 'export':
          this.$store.dispatch('setCreatePermissionCDR', {
            param: 'export',
            value: this.cdr.export ? 'all' : this.cdr.exportP ? 'personal' : ''
          })
          break
        case 'billing':
          this.$store.dispatch('setCreatePermissionCDR', {
            param: 'billing',
            value: this.cdr.billing ? 'all' : this.cdr.billingP ? 'personal' : ''
          })
          break
        default:
          break
      }
    },
    setViewBilling() {
      this.$store.dispatch('setCreatePermissionBilling', !this.billing)
    },
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/Permission.scss"></style>
