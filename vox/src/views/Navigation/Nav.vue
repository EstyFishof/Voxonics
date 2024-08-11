<template>
  <div>
    <AdminNav v-if="getCurrentRoutes(currentRoutes, 'admin')"/>
    <div :class="getIsFullNavMenu ? 'full' : 'compact'" class="nav-wrapper" v-if="userInfo && getCurrentRoutes(currentRoutes, 'client')">
      <div id="nav" :class="getIsFullNavMenu ? 'full' : 'compact'">
        <div :style="{width: getIsFullNavMenu ? '220px' : '77px'}" class="bg"></div>
        <div v-if="getIsFullNavMenu" class="full-routes">

          <router-link class="logo" to="/agent-panel">
            <img alt="logo" src="../../assets/img/logo.svg"/>
          </router-link>

          <div @click="toggleVisible('panel')">
            <router-link class="parent agent-panel" to="/agent-panel">
              <img class="icon active" width="20" src="../../assets/img/icons/agent-panel.svg" alt="">
              <img class="icon gray" width="20" src="../../assets/img/icons/agent-panel-gray.svg" alt="">
              Agent Panel
            </router-link>
          </div>

          <div @click="toggleVisible('panel')">
            <router-link to="/campaign">
              <img class="icon active" width="20" src="../../assets/img/icons/agent-panel.svg" alt="">
              <img class="icon gray" width="20" src="../../assets/img/icons/agent-panel-gray.svg" alt="">
              New Campaign
            </router-link>
          </div>

          <template v-if="displayConfig.mainNavigation.showManagersRoutes">

            <div @click="toggleVisible('dashboard')">
              <router-link class="parent" to="/dashboard">
                <img class="icon active" width="20" src="../../assets/img/icons/dashboard.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/dashboard-gray.svg" alt="">
                Dashboard
                <svg :class="show === 'dashboard' ? 'active-arrow arrow' : 'arrow'" fill="transparent" height="18"
                     viewBox="0 0 10 18" width="10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L1 9L9 17" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </router-link>
            </div>
            <div v-show="show === 'campaign'" class="childes">
              <router-link to="/campaign">newCampaign</router-link>
            </div>
            
            <div v-show="show === 'dashboard'" class="childes">
              <router-link to="/dashboard/agents-map"> Agents Map</router-link>
              <router-link to="/dashboard/Test-map"> Test Map</router-link>
            </div>
            <div v-show="this.userInfo.permission.cdr.view || this.userInfo.permission.view.billing"
                 @click="toggleVisible('reports')">
              <router-link class="parent" to="/reports">
                <img class="icon active" width="20" src="../../assets/img/icons/reports.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/reports-gray.svg" alt="">
                Reports
                <svg :class="show === 'reports' ? 'active-arrow arrow' : 'arrow'" fill="transparent" height="18"
                     viewBox="0 0 10 18" width="10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L1 9L9 17" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </router-link>
            </div>
            <div v-show="show === 'reports'" class="childes">
              <router-link v-show="this.userInfo.permission.cdr.view" to="/reports/call-history">
                <img class="icon active" width="20" src="../../assets/img/icons/CDR.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/CDR-gray.svg" alt="">
                Calls history (CDR)
              </router-link>
              <router-link to="/reports/billing" v-show="userInfo.permission.view.billing">
                <img class="icon active" width="20" src="../../assets/img/icons/billing.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/billing-gray.svg" alt="">
                Billing report
              </router-link>
            </div>

            <div @click="toggleVisible('config')">
              <router-link class="parent" to="/config">
                <img class="icon active" width="20" src="../../assets/img/icons/setting.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/setting-gray.svg" alt="">
                Settings
                <svg :class="show === 'config' ? 'active-arrow arrow' : 'arrow'" fill="transparent" height="18"
                     viewBox="0 0 10 18" width="10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L1 9L9 17" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </router-link>
            </div>
            <div v-show="show === 'config'" class="childes">
              <router-link to="/config/users">
                <img class="icon active" width="20" src="../../assets/img/icons/users.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/users-gray.svg" alt="">
                Users
              </router-link>
              <router-link to="/config/departments">
                <img class="icon active" width="22" src="../../assets/img/icons/departments.svg" alt="">
                <img class="icon gray" width="22" src="../../assets/img/icons/departments-gray.svg" alt="">
                Departments
              </router-link>
              <router-link to="/config/queues">
                <img class="icon active" width="22" src="../../assets/img/icons/queues.svg" alt="">
                <img class="icon gray" width="22" src="../../assets/img/icons/queues-gray.svg" alt="">
                Queues
              </router-link>
              <router-link to="/config/external-numbers">
                <img class="icon active" width="20" src="../../assets/img/icons/vnumber.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/vnumber-gray.svg" alt="">
                V-number
              </router-link>
              <router-link to="/config/incoming-route">
                <img class="icon active" width="20" height="20"
                     src="../../assets/img/icons/incoming-route-icon-active.svg" alt="">
                <img class="icon gray" width="20" height="20" src="../../assets/img/icons/incoming-route-icon-gray.svg"
                     alt="">
                Incoming Routing
              </router-link>
              <router-link to="/config/outboundCalls">
                <img class="icon active" width="20" src="../../assets/img/icons/outbound-icon.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/outbound-icon-gray.svg" alt="">
                Outbound Routing
              </router-link>
              <router-link to="/config/whitelistIP" v-if="displayConfig.mainNavigation.showWhiteListIp">
                <img class="icon active" width="20" src="../../assets/img/icons/whitelistIP.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/whitelistIP-gray.svg" alt="">
                Whitelist IP
              </router-link>
            </div>

            <div @click="toggleVisible('support')">
              <router-link class="parent" to="/support">
                <img class="icon active" width="20" src="../../assets/img/icons/support.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/support-gray.svg" alt="">
                Support
                <svg class="arrow" fill="transparent" height="18" viewBox="0 0 10 18" width="10"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L1 9L9 17" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </router-link>
            </div>
            <div v-show="show === 'support'" class="childes">
              <router-link to="/support/manual#faq"
                           :class="getActiveLinkSupport === 'faq' ? 'active-manual-link' : 'not-active'"
                           @click.native="setActiveLink('faq')">
                <img class="icon active" width="20" src="../../assets/img/icons/faq.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/faq-gray.svg" alt="">
                FAQ
              </router-link>
              <router-link to="/support/manual#manual"
                           :class="getActiveLinkSupport === 'manual' ? 'active-manual-link' : 'not-active'"
                           @click.native="setActiveLink('manual')">
                <img class="icon active" width="20" src="../../assets/img/icons/manual.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/manual-gray.svg" alt="">
                Manual
              </router-link>
              <router-link to="/support/manual#contact-us"
                           :class="getActiveLinkSupport === 'contact-us' ? 'active-manual-link' : 'not-active'"
                           @click.native="setActiveLink('contact-us')">
                <img class="icon active" width="20" src="../../assets/img/icons/contactUs.svg" alt="">
                <img class="icon gray" width="20" src="../../assets/img/icons/contactUs-gray.svg" alt="">
                Contact Us
              </router-link>
            </div>

          </template>
        </div>
        <div v-if="!getIsFullNavMenu" class="compact-routes">

          <router-link class="logo2" to="/agent-panel">
            <img alt="logo" src="../../assets/img/logo2.svg"/>
          </router-link>

          <router-link to="/agent-panel">
            <img class="icon active" width="32" src="../../assets/img/icons/agent-panel.svg" alt="">
            <img class="icon gray" width="32" src="../../assets/img/icons/agent-panel-gray.svg" alt="">
          </router-link>

          <template v-if="displayConfig.mainNavigation.showManagersRoutes">

            <router-link to="/dashboard">
              <img class="icon active" width="32" src="../../assets/img/icons/dashboard.svg" alt="">
              <img class="icon gray" width="32" src="../../assets/img/icons/dashboard-gray.svg" alt="">
            </router-link>

            <div v-show="this.userInfo.permission.cdr.view || this.userInfo.permission.view.billing"
                 @click="toggleVisible('reports')">
              <router-link to="/reports">
                <img class="icon active" width="32" src="../../assets/img/icons/reports.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/reports-gray.svg" alt="">
              </router-link>
            </div>
            <div v-show="show === 'reports'" class="childes">
              <router-link v-show="this.userInfo.permission.cdr.view" to="/reports/call-history">
                <img class="icon active" width="32" src="../../assets/img/icons/CDR.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/CDR-gray.svg" alt="">
              </router-link>
              <router-link v-show="this.userInfo.permission.view.billing" to="/reports/billing">
                <img class="icon active" width="32" src="../../assets/img/icons/billing.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/billing-gray.svg" alt="">
              </router-link>
            </div>

            <div @click="toggleVisible('config')">
              <router-link to="/config">
                <img class="icon active" width="32" src="../../assets/img/icons/setting.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/setting-gray.svg" alt="">
              </router-link>
            </div>
            <div v-show="show === 'config'" class="childes">
              <router-link to="/config/users">
                <img class="icon active" width="32" src="../../assets/img/icons/users.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/users-gray.svg" alt="">
              </router-link>
              <router-link to="/config/departments">
                <img class="icon active" width="32" src="../../assets/img/icons/departments.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/departments-gray.svg" alt="">

              </router-link>
              <router-link class="queue-nav-compact" to="/config/queues">
                <img class="icon active" width="32" src="../../assets/img/icons/queues.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/queues-gray.svg" alt="">
              </router-link>

              <router-link to="/config/external-numbers/info">
                <img class="icon active" width="32" src="../../assets/img/icons/vnumber.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/vnumber-gray.svg" alt="">
              </router-link>
              <router-link to="/config/incoming-route">
                <img class="icon active" width="32" src="../../assets/img/icons/incoming-route-icon-active.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/incoming-route-icon-gray.svg" alt="">
              </router-link>
              <router-link to="/config/outboundCalls">
                <img class="icon active" width="32" src="../../assets/img/icons/outbound-icon.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/outbound-icon-gray.svg" alt="">
              </router-link>
              <router-link to="/config/whitelistIP" v-if="displayConfig.mainNavigation.showWhiteListIp">
                <img class="icon active" width="32" src="../../assets/img/icons/whitelistIP.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/whitelistIP-gray.svg" alt="">
              </router-link>
            </div>

            <div @click="toggleVisible('support')">
              <router-link to="/support">
                <img class="icon active" width="32" src="../../assets/img/icons/support.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/support-gray.svg" alt="">
              </router-link>
            </div>
            <div v-show="show === 'support'" class="childes">
              <router-link to="/support/manual#faq"
                           :class="getActiveLinkSupport === 'faq' ? 'active-manual-link' : 'not-active'"
                           @click.native="setActiveLink('faq')">
                <img class="icon active" width="32" src="../../assets/img/icons/faq.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/faq-gray.svg" alt="">
              </router-link>
              <router-link to="/support/manual#manual"
                           :class="getActiveLinkSupport === 'manual' ? 'active-manual-link' : 'not-active'"
                           @click.native="setActiveLink('manual')">
                <img class="icon active" width="32" src="../../assets/img/icons/manual.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/manual-gray.svg" alt="">
              </router-link>
              <router-link to="/support/manual#contact-us"
                           :class="getActiveLinkSupport === 'contact-us' ? 'active-manual-link' : 'not-active'"
                           @click.native="setActiveLink('contact-us')">
                <img class="icon active" width="32" src="../../assets/img/icons/contactUs.svg" alt="">
                <img class="icon gray" width="32" src="../../assets/img/icons/contactUs-gray.svg" alt="">
              </router-link>
            </div>

          </template>
        </div>

        <span class="resize-block">
          <span class="hint">
            {{ collapse }}
            <span>\</span>
          </span>
            <span class="resize-wrap" @click="toggleFull">
                   <svg width="18" height="34" viewBox="0 0 18 34" fill="none"
                        class="resize"
                        :style="{ transform: !getIsFullNavMenu ? 'rotate(360deg)' : 'rotate(180deg)' }"
                        xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 0.999999L17 17L1 33"
                            fill="none"
                            stroke="var(--font-panel)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
            </span>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/mainRoutes'
import { mapGetters } from 'vuex'

export default {
  name: 'Nav',
  components: {AdminNav: () => import('admin/adminNav')},
  data() {
    return {
      unsubscribe: ()=>{},
      routes: [],
      show: '',
      // full: true
    }
  },
  computed: {
    ...mapGetters(['roleAgent', 'currentRoutes', 'getActiveLinkSupport', 'getGlobalSearch', 'userInfo', 'displayConfig', 'getIsFullNavMenu']),
    collapse: function () {
      return this.getIsFullNavMenu ? 'Collapse' : 'Expand'
    }
  },
  watch: {
    currentRoutes() {
      this.show = ''
    }
  },
  methods: {
    getCurrentRoutes(current, mode) {
      if (!current && mode === 'client') return true
      return mode === current
    },
    slashToggle(e) {
      if (e.keyCode === 220 && document.activeElement.constructor.name !== 'HTMLInputElement') {
        this.toggleFull()
      }
    },
    toggleVisible(param) {
      if (this.show === param) {
        this.show = ''
      } else {
        this.show = param
      }
      return param
    },
    toggleFull() {
      return this.$store.commit('isFullNavMenuMutation', !this.getIsFullNavMenu)
      // return (this.full = !this.full)
    },
    setActiveLink(link) {
      this.$router.push('/support/manual')
      this.$store.dispatch('setActiveLinkSupport', link)
    }
  },
  mounted() {
    this.routes = routes
    window.slashToggle = document.addEventListener('keydown', this.slashToggle)
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type === 'globalSearchMutation') {
        if (this.getGlobalSearch.key === 'manual') {
          this.show = 'support'
        } else if (this.getGlobalSearch.key === 'user' || this.getGlobalSearch.key === 'queue' || this.getGlobalSearch.key === 'department') {
          this.show = 'config'
        }
      }
      if (mutation.type === 'setEditMode') {
        this.show = 'config'
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {

  min-height: 100%;
  margin-right: 25px;
  flex-shrink: 0;
  transition: all 0.1s;


  &.full {
    width: 220px;

    .resize-block {
      .hint {
        left: 190px;
      }
    }

    .resize-wrap {
      left: 203px;

      .resize {
        margin-right: 4px;
      }
    }
  }

  &.compact {
    width: 77px;

    .resize-block {
      .hint {
        left: 50px;
      }
    }

    .resize-wrap {
      left: 60px;

      .resize {
        margin-left: 2px;
        margin-right: 0;
      }
    }
  }

  #nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 50px;

    padding: 25px 25px 0 25px;
    z-index: 1001;
    height: 100vh;
    position: fixed;

    .bg {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      background-color: var(--substrate);
      box-shadow: 8px 0 16px rgba(0, 0, 0, 0.1);
      z-index: -1;
    }

    &:hover {
      .resize-block {
        display: block;
        transition: 0.2s;
      }
    }

    .resize-block {
      display: none;
      position: relative;
      font-size: 16px;
      line-height: 19px;

      color: #515960;
      width: 100%;
      height: 34px;
      min-height: 34px;

      &:hover {
        .hint {
          display: block;
        }
      }

      .hint {
        transition: display 0.5s;
        position: fixed;
        top: calc(100vh - 90px);
        display: none;
        background-color: #172B4D;
        color: #FFFFFF;
        padding: 2px 4px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;


        span {
          margin-left: 5px;
        }
      }

      .resize-wrap {
        width: 34px;
        height: 34px;

        position: fixed;
        top: calc(100vh - 60px);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--substrate);
        border: 1px solid var(--cdr-border-row);
        z-index: 999999;

        &:after {
          content: '';
          position: absolute;
          top: -50px;
          left: -10px;
          width: calc(100% + 30px);
          height: calc(100% + 50px);
        }

        &:hover {
          cursor: pointer;
          background-color: var(--light-blue);

          .resize path {
            stroke: #FFFFFF;
          }
        }

        .resize {
          width: 10px;
          height: 15px;
          z-index: 10000000;
        }
      }
    }

    &.compact {
      padding: 5px 5px 0 5px;
      position: fixed;
      //width: 77px;
      overflow-y: auto;
      //overflow-x: hidden;

      &::-webkit-scrollbar {
        background: none;
      }
    }

    .full {
      position: fixed;
      height: 100vh;
    }

    .compact-routes {
      //position: fixed;
      width: 67px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: calc(100vh + 134px);

      .logo2 {
        margin-bottom: 44px;
      }

      a:not(.logo):not(.logo2) {
        display: flex;
        align-items: center;
        margin-top: 15px;
        margin-bottom: 0;

        .active {
          display: none;
        }

        &.router-link-active {
          width: 73px !important;
          padding: 5px 0;
          background-color: var(--active-link);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0;


          .active {
            display: inline;
          }

          .gray {
            display: none;
          }
        }
      }

      .childes {
        width: 110%;
        margin: 0 -5px 0 -5px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 5px 0;


        a:not(.logo):not(.logo2) {
          padding: 5px 0 4px 3px;
          display: flex;
          align-items: center;
          width: 56px !important;
          justify-content: flex-start;
          margin-top: 0;
          margin-bottom: 10px;

          .active {
            display: none;
          }

          &.router-link-active {
            background-color: var(--active-link);
            border-radius: 4px 0 0 4px;
            width: 61px !important;
            // padding-left: 5px !important;
            padding: 5px 0 4px 8px !important;
            margin-bottom: 10px;

            .active {
              display: inline;
            }

            .gray {
              display: none;
            }
          }

          &:last-child {
            margin-bottom: 0 !important;
          }
        }

        .queue-nav-compact {
          svg {
            margin-bottom: -5px;
            height: 28px;
          }
        }
      }
    }

    &.full {
      //width: 220px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        background: none;
        width: 0;
        height: 0;
      }

      .full-routes {
        width: 170px;
        // height: 100vh;
        height: calc(100vh + 134px);
      }

      a:not(.logo):not(.logo2) {
        display: flex;
        align-items: center;


        &.agent-panel {
          padding: 7px 0;
          margin-bottom: 23px;
        }

        .icon {
          margin-right: 12px;
        }

        .active {
          display: none;
        }

        &.router-link-active {
          width: calc(100% + 50px);
          margin-left: -25px;
          padding: 7px 25px 7px 25px;
          background-color: var(--active-link);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

          .active {
            display: inline;
          }

          .gray {
            display: none;
          }
        }
      }
    }

    .logo {
      margin-bottom: 100px;
      display: inline-block;
    }

    .logo2 {
      width: 100px;

      img {
        width: 100%;
      }
    }

    .childes {
      width: calc(100% + 50px);
      margin: -30px 0 30px -25px;
      padding: 14px 13px 14px 16px;
      font-size: 14px;
      background-color: var(--nav-bg);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 2;

      a:not(.logo):not(.logo2) {
        margin-bottom: 14px;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        padding-left: 8px;
        color: #515960;
        height: 42px;

        .active {
          display: none;
        }

        &.router-link-active.parent {
          background-color: var(--active-link) !important;
        }

        &.router-link-active {
          background-color: var(--active-link);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          width: 100% !important;
          margin-right: 0 !important;
          margin-left: 0;
          padding: 2px 0 2px 8px !important;

          .active {
            display: inline;
          }

          .gray {
            display: none;
          }
        }
      }

      .active-manual-link {
        background-color: var(--active-link);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        width: 100% !important;
        margin-right: 0 !important;
        margin-left: 0;
        padding: 2px 0 2px 8px !important;
        color: var(--light-blue);

        .active {
          display: inline !important;
        }

        .gray {
          display: none;
        }
      }

      .not-active {
        background: none !important;
        box-shadow: none !important;
        color: #515960 !important;
      }
    }

    a:not(.logo):not(.logo2) {
      display: flex;
      font-weight: bold;
      color: #515960;
      margin-bottom: 30px;
      text-decoration: none;

      .fill-path {
        fill: #898e92;
      }

      .stroke-path {
        stroke: #898e92;
      }

      &.router-link-active {
        color: var(--light-blue);

        .fill-path {
          fill: var(--light-blue);
        }

        .stroke-path {
          stroke: var(--light-blue);
        }

        svg {
          fill: var(--light-blue);
        }

        svg.stroke {
          path {
            stroke: var(--light-blue);
          }

          stroke: var(--light-blue);
        }

        .notFill {
          fill: none;
        }

        .notStroke {
          stroke: transparent;
        }

        svg.cdr {
          stroke: transparent;
        }

        .arrow {
          stroke: var(--light-blue);
          fill: transparent;
          text-align: right;
        }

        .active-arrow {
          transform: rotate(-90deg);
        }
      }
    }
  }

  .compact-enter-active {
    animation: showCompact 0.5s;
  }

  .fully-enter-active {
    animation: showCompact 0.5s;
  }

  @keyframes showCompact {
    0% {
      transform: translateX(-200px);
    }
    100% {
      transform: translateX(0);
    }
  }

  .arrow {
    display: block;
    margin-left: auto;
    margin-right: 0;
    stroke: #898e92;
    fill: transparent;
  }

  svg {
    fill: #898e92;
    margin-right: 15px;
  }

  .notFill {
    fill: none;
  }


  .childes .router-link-exact-active,
  .childes .router-link-active,
  .active-manual-link {
    background-color: var(--active-link-child) !important;

    .active {
      display: inline;
    }
  }

  a:not(.logo):not(.logo2) {
    font-size: 18px;

    &.router-link-active {
      color: var(--light-blue) !important;
    }
  }

  .router-link-active {
    z-index: 10;
    position: relative;
  }
}
</style>
