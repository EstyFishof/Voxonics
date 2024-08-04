<template>
  <div class="wrap-agent-setup">
    <div class="wrap-body">

      <div class="agent-setup__second-part">
        <div class="item-container">
          <label class="options-label" ref="select" v-click-outside="hideRoleList" v-if="role.length">
            <span class="options-title">Role</span>
            <input class="input-field num" type="text" v-model="role" readonly>
            <span 
              @click="toggleVisible(!showOutNum, 'showOutNum'); showRole = !showRole" 
              class="triangle"
              v-if="!disableRole && userInfo.internalNumber != userInfoVuex.internalNumber" 
              :class="{'rotate-arrow': showRole}"
            >
              <img src="@/assets/img/icons/arrow-down-white.svg" alt="select">
            </span>
            <DropdownList v-show="showRole && userInfo.internalNumber !== userInfoVuex.internalNumber" :dataList="listOfRoles"
                @clickFunc="(role) => {selectRole(role)}" :itemText="(item) => item"
                :clickFuncAll="null" :classNameList="'list-related-numbers'"  @scrollFunc="() => {}" 
                :classNameItemComputed="() => ''" />
          </label>
        </div>
        <div class="password">
          <label>
            <span class="options-label">SIP password</span>
            <input ref="secret" class="input-field sip-password" type="text"
                   :value="getSecret"
                   readonly>
          </label>
          <CopyIcon
            @copyHandler="copy()"
          />
        </div>
      </div>
      <div class="wrap-tables" v-if="getPermissionCDR">
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
                         :disabled="userSelf || cdr.listen || cdr.export || cdr.billing || disablePermission"
                         :checked="cdr.view || cdr.listen || cdr.export || cdr.billing"
                         @click="changeCDR('view', 'view')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="transfer"
                         :disabled="userSelf || disablePermission"
                         :checked="cdr.listen"
                         @click="changeCDR('listen', 'listen')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="reject"
                         :disabled="userSelf || disablePermission"
                         :checked="cdr.export"
                         @click="changeCDR('export', 'export')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="hangup"
                         :disabled="userSelf || disablePermission"
                         :checked="cdr.billing"
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
                         :disabled="userSelf || disablePermission || cdr.view || cdr.listen || cdr.export || cdr.billing || cdr.billingP || cdr.listenP || cdr.exportP || cdr.billingP"
                         :checked="cdr.viewP || cdr.view || cdr.listen || cdr.export || cdr.billingP || cdr.viewP || cdr.listenP || cdr.exportP || cdr.billingP"
                         @click="changeCDR('viewP', 'view')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer"
                         :disabled="userSelf || disablePermission || cdr.listen"
                         :checked="cdr.listenP || cdr.listen"
                         @click="changeCDR('listenP', 'listen')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer"
                         :disabled="userSelf || disablePermission || cdr.export"
                         :checked="cdr.exportP || cdr.export"
                         @click="changeCDR('exportP', 'export')"/>
                  <span class="check"></span>
                </label>
              </li>
              <li class="table-content__item">
                <label class="table-content__label">
                  <input type="checkbox" class="personal-transfer"
                         :disabled="userSelf || disablePermission || cdr.billing"
                         :checked="cdr.billingP || cdr.billing"
                         @click="changeCDR('billingP', 'billing')"/>
                  <span class="check"></span>
                </label>
              </li>
            </ul>
          </ul>
        </div>
        <div class="wrap-tables bottom-wrap" v-if="getPermissionBilling">
          <div class="calls-pipe__block billing">
            <div class="calls-pipe__title">Billing</div>
            <ul class="calls-pipe__table-header">
              <li class="calls-pipe__header-item">Billing <br> Reports</li>
            </ul>
            <ul class="calls-pipe__table-block">
              <ul class="table-content">
                <li class="table-content__item">
                  <label class="table-content__label">
                    <input type="checkbox" class="view"
                           :disabled="userSelf || disablePermission"
                           :checked="getPermissionBilling.billing"
                           @click="setBillingReports()"/>
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
import DropdownList from '@/components/DropdownList'
import ClickOutside from "vue-click-outside"
import CopyIcon from "../../../../../components/CopyIcon.vue"

export default {
  name: "AgentSetup",
  components: {
    DropdownList,
    CopyIcon
},
  data() {
    return {
      unsubscribe: () => {},
      showRole: false,
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
      }
    }
  },
  computed: {
    ...mapGetters(['userRole', 'getSecret', 'userInfoVuex', 'getPermissionCDR', 'getPermissionBilling', 'roleAgent', 'userInfo']),
    userSelf() {
      return parseInt(this.userInfo.internalNumber, 10) === parseInt(this.userInfoVuex.internalNumber, 10)
    },
    listOfRoles() {
      return this.$store.state.displayConfig.displayConfig.createUser.agentSetup.listRoles
    },
    disableRole() {
      return this.$store.state.displayConfig.displayConfig.createUser.agentSetup.disableRoles.includes(this.userRole)
    },
    disablePermission() {
      return this.$store.state.displayConfig.displayConfig.createUser.permissionsDisabled.includes(this.userRole)
    }
  },
  methods: {
    copy() {
      this.$refs.secret.select()
      document.execCommand('copy')
    },
    changeCDR(param, storeParam) {
      if(parseInt(this.userInfo.internalNumber, 10) === parseInt(this.userInfoVuex.internalNumber, 10)) return false
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
    hideRoleList() {
      this.showRole = false
    },
    setBillingReports() {
      this.$store.dispatch('setViewBillingReports', !this.getPermissionBilling.billing)
    },
    selectRole(e) {
      this.role = e
      const role = e.toLowerCase()
      this.$store.dispatch('changeRole', role)
      this.showOutNum = false
      this.showRole = false
    },
    toggleVisible(bool, param) {
      this[param] = bool
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
    this.popupItem = this.$refs.select
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.wrap-agent-setup {
  padding-bottom: 36px;

  .agent-setup {
    &__first-part, &__second-part {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: baseline;

      select {
        font-size: 16px;
        font-weight: 300;
      }
    }

    &__second-part {
      .password {
        position: relative;

        ::v-deep .copy {
          cursor: pointer;
          position: absolute;
          bottom: 4px;
          right: 6px;
        }
      }

      .item-container {
        position: relative;

        &:nth-child(1) {
          margin-right: 48px;
        }

        &:nth-child(2) {
          margin-right: 48px;
        }

        &:nth-child(3) {
          margin-right: 48px;
        }
      }


      .options-label {
        font-size: 18px;
        font-weight: 700;
        text-align: left;
        color: var(--light-blue);

        .input-field.num {
          width: 292px;
          height: 35px;
          padding: 5px 12px;
          text-transform: capitalize;
          margin-top: 12px;
          display: block;
          font-weight: 300;
          outline: none;
          background: var(--input-bg);
        }

        .triangle {
          height: 35px;
          width: calc(104% - 7px);
          img {
            margin-right: 10px;
          }
        }

        ::v-deep .list-related-numbers {
          margin-top: 5px;
          li {
            height: 39px;
            font-weight: 300;
            padding: 10px 16px;
            text-transform: capitalize;
          }
        }
      }

      .sip-password {
        width: 200px;
      }
    }
  }

  .wrap-tables {
    display: flex;
    flex-wrap: wrap;
    gap: 36px;
  }

  .calls-pipe {
    &__block {
      margin-top: 16px;
      width: 526px;
    }

    &__title {
      margin: 0 0 15px 0;
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: var(--header-user-color);
    }

    &__table-header {
      width: 100%;
      height: 46px;
      background: #276899;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
      border-radius: 4px 4px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
    }

    &__header-item {
      width: 20%;
      text-align: center;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
    }

    &__table-block {
      width: 100%;
      background: var(--permission-table-bg);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      padding: 0;

      .table-content {
        width: 100%;
        height: 54px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 2.5%;
          width: 95%;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }

        &__item {
          width: 20%;
          text-align: center;
          color: var(--font-panel);
        }

        &__label {
          position: relative;
        }
      }
    }
  }

  .bottom-wrap {
    justify-content: flex-start !important;
  }

  .active-calls {
    width: 413px !important;

    .calls-pipe__header-item {
      width: 25% !important;
    }

    .table-content__item {
      width: 25% !important;
    }
  }

  .billing {
    width: 91px;
    margin-right: 22px;

    .calls-pipe__header-item {
      width: 100% !important;
    }

    .table-content__item {
      width: 100% !important;
    }
  }
}
</style>
