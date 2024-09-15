<template>
  <div class="wrap-agent-setup" v-if="userRole !== 'admin' && userRole !== 'owner'">
    <div class="wrap-head">
      <h2 class="wrap-head-title">Permission</h2>
      <svg @click="showOptions = !showOptions" class="arrow" :class="{'down': showOptions}" viewBox="0 0 10 18"
           fill="transparent"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1L1 9L9 17" stroke-width="2" stroke="var(--light-blue)" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="hr"></span>
    </div>
    <div class="wrap-body" v-if="showOptions && userRole !== 'admin' && userRole !== 'owner'">
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
                         :disabled="cdr.listen || cdr.export || cdr.billing || disablePermission || userSelf"
                         :checked="cdr.view || cdr.listen || cdr.export || cdr.billing"
                         @click="changeCDR('view', 'view')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="transfer"
                         :disabled="disablePermission || userSelf"
                         :checked="cdr.listen" @click="changeCDR('listen', 'listen')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="reject"
                         :disabled="disablePermission || userSelf"
                         :checked="cdr.export" @click="changeCDR('export', 'export')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="hangup"
                         :disabled="disablePermission || userSelf"
                         :checked="cdr.billing" @click="changeCDR('billing', 'billing')"/>
                  <span class="check"></span>
                </label>
              </li>
            </ul>
            <ul class="table-content">
              <li class="table-content__item">Personal</li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-view"
                         :disabled="cdr.view || cdr.listen || cdr.export || cdr.billing || cdr.billingP || cdr.listenP || cdr.exportP || cdr.billingP || disablePermission || userSelf"
                         :checked="cdr.viewP || cdr.view || cdr.listen || cdr.export || cdr.billingP || cdr.viewP || cdr.listenP || cdr.exportP || cdr.billingP"
                         @click="changeCDR('viewP', 'view')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer"
                         :disabled="cdr.listen || disablePermission || userSelf"
                         :checked="cdr.listenP || cdr.listen"
                         @click="changeCDR('listenP', 'listen')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer"
                         :disabled="cdr.export || disablePermission || userSelf"
                         :checked="cdr.exportP || cdr.export"
                         @click="changeCDR('exportP', 'export')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer"
                         :disabled="cdr.billing || disablePermission || userSelf"
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
                    <input type="checkbox" class="view" :disabled="disablePermission || userSelf" v-model="getPermissionBilling.billing" @click="setViewBilling()"/>
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

export default {
  name: "AgentSetup",
  data() {
    return {
      unsubscribe: () => {},
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
    }
  },
  computed: {
    ...mapGetters(['userRole', 'getPermissionCDR', 'getPermissionBilling', 'userInfoVuex', 'userInfo']),
    userSelf() {
      return parseInt(this.userInfo.internalNumber, 10) === parseInt(this.userInfoVuex.internalNumber, 10)
    },
  disablePermission() {
    return this.$store.state.displayConfig.displayConfig.createUser.permissionsDisabled.includes(this.userRole)
  }
  },
  methods: {
    changeCDR(param, storeParam) {
      this.cdr[param] = !this.cdr[param]
      if (!param.includes('P')) {
        this.cdr[param + 'P'] = false
      }
      switch (storeParam) {
        case 'view':
          this.$store.dispatch('setPermissionCDR', {
            param: 'view',
            value: this.cdr.view ? 'all' : this.cdr.viewP ? 'personal' : null
          })
          break
        case 'listen':
          this.$store.dispatch('setPermissionCDR', {
            param: 'listen',
            value: this.cdr.listen ? 'all' : this.cdr.listenP ? 'personal' : null
          })
          break
        case 'export':
          this.$store.dispatch('setPermissionCDR', {
            param: 'export',
            value: this.cdr.export ? 'all' : this.cdr.exportP ? 'personal' : null
          })
          break
        case 'billing':
          this.$store.dispatch('setPermissionCDR', {
            param: 'billing',
            value: this.cdr.billing ? 'all' : this.cdr.billingP ? 'personal' : null
          })
          break
        default:
          break
      }
    },
    setViewBilling() {
      this.$store.dispatch('setViewBillingReports', !this.getPermissionBilling.billing)
    },
    getPermissions() {
      this.role = this.userRole
      if (this.getPermissionCDR?.view === 'all') {
        this.cdr.view = true
        this.cdr.viewP = true
      } else if (this.getPermissionCDR?.view === 'personal') {
        this.cdr.view = false
        this.cdr.viewP = true
      } else {
        this.cdr.view = false
        this.cdr.viewP = false
      }

      if (this.getPermissionCDR?.listen === 'all') {
        this.cdr.listen = true
        this.cdr.listenP = true
      } else if (this.getPermissionCDR?.listen === 'personal') {
        this.cdr.listen = false
        this.cdr.listenP = true
      } else {
        this.cdr.listen = false
        this.cdr.listenP = false
      }

      if (this.getPermissionCDR?.export === 'all') {
        this.cdr.export = true
        this.cdr.exportP = true
      } else if (this.getPermissionCDR?.export === 'personal') {
        this.cdr.export = false
        this.cdr.exportP = true
      } else {
        this.cdr.export = false
        this.cdr.exportP = false
      }

      if (this.getPermissionCDR?.billing === 'all') {
        this.cdr.billing = true
        this.cdr.billingP = true
      } else if (this.getPermissionCDR?.billing === 'personal') {
        this.cdr.billing = false
        this.cdr.billingP = true
      } else {
        this.cdr.billing = false
        this.cdr.billingP = false
      }
    }
  },
  mounted() {
    this.getPermissions()
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'setUserInfo') {
        this.getPermissions()
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/Permission.scss"></style>
<style scoped lang="scss">
.wrap-agent-setup {

  .wrap-head {
    margin-bottom: 16px;
  }
}
</style>
