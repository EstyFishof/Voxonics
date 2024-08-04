<template>
  <header @click="hideListOptions(); indexRef='false'">
    <div class="header-main" v-click-outside="hide" ref="header">
      <div class="header-title">
        <img :src="icon" height="20"/>
        <h2>{{ title }}</h2>
      </div>
      <div class="user-info">
        <span class="global-search-span" @click="showList = 'search'">
          <div class="global-search" v-if="roleAgent !== 'agent' && roleAgent != undefined && roleAgent != null"
               :ref="'search'"
               @click="indexRef='search'">
            <input type="text" placeholder="You can search anything here" v-model="search"
                   @input="suggestWords($event)"
                   @focus="showList = 'search'">
            <div class="search-list-block" v-if="showList === 'search'">
              <br>
              <span v-show="suggest.length" class="search-suggest">
                <span v-for="word of suggest" :key="word" @click="chooseSuggest(word)">{{ word }}</span>
              </span>
              <span class="search-list-title">Where do you want to search?</span>
              <ul class="search-list">
                <li class="search-item" @click="searchItems('user')">Users</li>
                <li class="search-item" @click="searchItems('queue')">Queues</li>
                <li class="search-item" @click="searchItems('department')">Departments</li>
                <li class="search-item" @click="searchItems('manual')">Support</li>
              </ul>
            </div>
            <img src="../assets/img/icons/global-search.svg" alt="search"/>
          </div>
        </span>

        <span class="bell-block">
          <img class="bell" src="../assets/img/icons/bell-round.svg" alt=""/>
        </span>

        <span class="phone-span" @click="setShowPhone()">
          <img src="@/assets/img/icons/phone-logo.svg"/>
        </span>

        <EnableWSSwitch 
          :value="userInfo.enableWs"
          :leftImage="'desktop-checkbox.svg'"
          :leftImageActive="'desktop-checkbox-active.svg'"
          :rightImage="'phone-checkbox.svg'"
          :rightImageActive="'phone-checkbox-active.svg'"
          @updateItem="switchEnableWS"
        />

        <div class="user-login" @click="toggleVisible('user'); indexRef='user'" :ref="'user'"
             :style="{ borderRadius: showList === 'user' ? '25px 25px 0 0' : '41px' }">
          {{ userLogin }}
          <img src="../assets/img/icons/logo-header.svg" width="36" alt="logo"/>
          <ul class="user-login-list" v-if="showList === 'user'">
            <li class="user-login-list-item">
              <span class="image-block">
                <img src="@/assets/img/icons/Acount-info-header-icon.svg" alt="acount info"/>
              </span>
              <span @click="accountInfo">Acount info</span>
            </li>
            <li class="user-login-list-item" @click="toAdmin()" v-if="getAdminURL">
              <span class="image-block">
                <img src="@/assets/img/icons/Acount-info-header-icon.svg" alt="acount info"/>
              </span>
              <span >{{switchModeText()}}</span>
            </li>
            <li class="user-login-list-item" @click="logOut()">
              <span class="image-block">
                <img
                  src="@/assets/img/icons/log-out-icon.svg"
                  alt="acount info"
                />
              </span>
              <span>Logout</span>
            </li>
          </ul>
        </div>

      </div>
      <div class="switch-wrapper">
        <SwitchTheme/>
      </div>
    </div>
    <template v-if="!pathLocation.includes('agent-panel')">
      <top-nav/>
    </template>
  </header>
</template>

<script>
import TopNav from './Navigation/TopNav.vue'
import SwitchTheme from '@/components/switchTheme'
import EnableWSSwitch from '../components/EnableWSSwitch.vue'
import {mapGetters} from 'vuex'
import {UsersGettersApi} from '@/API/getters'
import ClickOutside from 'vue-click-outside'
import {clickCheck} from '@/lib/clickCheck.js'
import {vocabulary} from '@/assets/supportText/vocabulary'

export default {
  components: {TopNav, SwitchTheme, EnableWSSwitch},
  name: 'Header',
  data() {
    return {
      isFullLogin: false,
      search: '',
      showList: '',
      indexRef: '',
      suggest: []
    }
  },
  computed: {
    ...mapGetters(['pathLocation', 'userInfo', 'title', 'icon', 'userInfo', 'roleAgent', 'getGlobalSearch', 'getShowPhone']),
    userLogin() {
      if (this.userInfo?.name?.length > 12) {
        return `${this.userInfo?.name.slice(0, 12)}.../ ${this.userInfo?.internalNumber}`
      } else {
        return `${this.userInfo?.name} / ${this.userInfo?.internalNumber}`
      }
    },
    getAdminURL() {
      return process.env.VUE_APP_REMOTE_ADMIN_URL
    },

  },
  methods: {
    switchEnableWS(value) {
      this.$store.dispatch('changeSelf', {enableWs: value})
    },
    switchModeText() {
      return window.location.href.split('/').includes('admin') ? 'Customer mode' : 'Support mode'
    },
    async toAdmin() {
      if (this.$router.currentRoute.fullPath.split('/')?.[1] === 'admin') {
        this.$store.commit('setCurrentRoutes', 'client')
        this.$router.push('/agent-panel')
      } else {
        const res = await import('admin/adminLogin')
        const response = await res.default.getSignature()
        localStorage.setItem('X-Signature', response.data['X-Signature'])
        const data = await import('admin/adminRoutes')
        this.$store.commit('setCurrentRoutes', 'admin')
        for (const route of data.routes) {
          this.$router.addRoute(route)
        }
        this.$router.push(`/admin`)
      }

    },
    setShowPhone() {
      this.$store.commit('showPhoneMutation', !this.getShowPhone)
    },
    suggestWords(e) {
      if (e.target.value.length >= 3) {
        const input = e.target.value.split(' ').pop()
        if (input.length >= 3) {
          this.suggest = vocabulary.filter(el => el.indexOf(input) !== -1)
        }
      }
    },
    chooseSuggest(word) {
      const a = this.search.split(' ')
      a.length = a.length - 1
      this.search = `${a.join(' ')} ${word}`.trimStart()
      this.suggest = []
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.showList = ''
    },
    async accountInfo() {
      sessionStorage.setItem('userUid', this.userInfo.uid)
      if (this.userInfo.permission.role !== 'agent') {
        await UsersGettersApi.viewUser(this.userInfo.uid)
      }
      await this.$store.dispatch('toggleEditMode', true)
      return this.$router.push(`/config/users/account-info/${this.userInfo.internalNumber}`)
    },
    toggleVisible(param) {
      if (this.showList === param) {
        this.showList = ''
      } else {
        this.showList = param
      }
    },
    async logOut() {
      this.$store.dispatch('pushLogout')
    },
    searchItems(param) {
      this.showList = false
      switch (param) {
        case 'user':
          if (this.$router.history.current.path !== '/config/users') {
            this.$router.push('/config/users').then(() => this.$store.dispatch('globalUsersListRequest', {search: this.search}))
          } else {
            this.$store.dispatch('globalUsersListRequest', {search: this.search})
          }
          break
        case 'queue':
          if (this.$router.history.current.path !== '/config/queues') {
            this.$router.push('/config/queues').then(() => this.$store.dispatch('setGlobalQueuesList', {search: this.search}))
          } else {
            this.$store.dispatch('setGlobalQueuesList', {search: this.search})
          }
          break
        case 'department':
          if (this.$router.history.current.path !== '/config/departments') {
            this.$router.push('/config/departments').then(() => this.$store.dispatch('setGlobalDepartmentsList', {search: this.search}))
          } else {
            this.$store.dispatch('setGlobalDepartmentsList', {search: this.search})
          }
          break
        case 'manual':
          this.$store.dispatch('setGlobalSearch', {key: param, value: this.search})
          if (this.$router.history.current.path !== '/support/manual') {
            this.$router.push('/support/manual')
          }
          break
      }
    }
  },
  mounted() {
    this.$store.subscribe(mutation => {
      if (mutation.type === 'globalSearchMutation' && this.getGlobalSearch.key === '') {
        this.search = ''
      }
    })
    this.popupItem = this.$refs.header
  },
  directives: {
    ClickOutside,
  },
}
</script>

<style scoped lang="scss">
.switch-wrapper {
  width: 60px;
  height: 35px;
  position: relative;
  margin-top: -120px;
  margin-left: 60px;
}

header {

  .header-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    background: var(--main-bg);
  }

  .header-title {
    display: flex;
    align-items: center;
    margin-right: auto;

    img {
      margin-right: 11px;
    }

    h2 {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 30px;
      line-height: 35px;
      width: 250px;
      color: var(--h2);
    }
  }

  .global-search-span {
    display: block;
    width: 450px;
    margin-right: 34px;
  }

  .global-search {
    width: 450px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 10px;
    background: var(--paginator-bg);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 4px 0 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    position: relative;

    input::placeholder {
      color: #4b535a;
    }

    .search-suggest {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      color: lightblue;
      padding-top: 2px;
      width: 100%;
      text-align: center;
      overflow-x: auto;

      &::-webkit-scrollbar {
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      span {
        margin-right: 5px;
        cursor: pointer;

        &:hover {
          color: var(--light-blue);
        }
      }
    }

    .search-list-block {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      bottom: -180px;
      left: 0;
      background: var(--substrate);
      border: 2px solid var(--main-border);
      box-sizing: border-box;
      box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);
      width: 100%;
      z-index: 10;
      margin-bottom: 15px;
      padding: 10px;
      color: var(--h2);
      font-family: "Roboto", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;

      .search-list-title {
        font-size: 18px;
      }

      .search-list {
        width: 100%;

        .search-item {
          position: relative;
          padding: 3px 0 3px 15px;
          cursor: pointer;

          &:hover {
            color: #276899;
          }

          &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            background: #2E3740;
            border-radius: 15px;
            left: 0;
            bottom: 0;
          }
        }
      }
    }

    input {
      background-color: transparent;
      border: none;
      outline: none;
      color: var(--white);
      font-family: "Roboto", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      width: 80%;

      &:focus {
        border-bottom: 1px solid #cccccc;
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;

    ::v-deep .switch {
      margin-right: 10px;
    }

    .bell-block {
      margin-right: 34px;
      width: 40px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    .phone-span {
      margin-right: 7px;
      margin-top: 5px;
      cursor: pointer;

      img {
        width: 55px;
        height: 55px;
      }
    }

    .user-login {
      height: 36px;
      width: 234px;
      position: relative;
      background: var(--light-blue);
      box-shadow: 0 0 15px rgba(39, 104, 153, 0.35);
      border-radius: 41px;
      display: flex;
      padding-left: 47px;
      align-items: center;
      color: white;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 19px;

      img {
        position: absolute;
        left: 0;
      }

      &:after {
        content: "";
        width: 20px;
        height: 15px;
        position: absolute;
        right: 6px;
        top: 31%;
        background-image: url("../assets/img/icons/arrow-bottom (2).svg");
      }

      .user-login-list {
        position: absolute;
        height:105px;
        width: 100%;
        left: 0;
        top: 36px;
        background: var(--light-blue);
        box-shadow: 0 0 15px rgba(39, 104, 153, 0.35);
        border-radius: 0 0 25px 25px;
        margin: 0;
        padding: 4px 31px 0 46px;
        z-index: 10000;

        .user-login-list-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          cursor: pointer;
          text-decoration: none;

          .image-block {
            display: inline-block;
            width: 28px;
            height: 25px;
            margin-bottom: 0;
          }

          img {
            position: relative;
            -webkit-transform: translate3d(0, 0, 0)
          }

          span {
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;
            color: #ffffff;
            text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            margin-bottom: 4px;
          }

          &:first-child {
            position: relative;

            &::after {
              content: "";
              position: absolute;
              top: 27px;
              height: 2px;
              width: 100%;
              background: #d2d2d2;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
              border-radius: 8px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1600px) {
  header {
    .header-main {
      justify-content: flex-start;
    }

    .user-info {
      margin-right: 5px;
    }

    .header-title {
      margin-right: 50px;

      h2 {
        width: 187px;
      }
    }

    .global-search-span {
      width: 420px;

      .global-search {
        width: 420px;
        padding-left: 25px;
      }
    }
  }
}

@media (max-width: 1504px) {
  header {

    .user-info {
      .bell-block {
        margin-right: 28px;
      }
    }
    .global-search-span {
      width: 350px;
      margin-right: 28px;

      .global-search {
        width: 350px;
        padding-left: 25px;
      }
    }
  }
}

@media (max-width: 1408px) {

  header {
    .user-info {
      .user-login {
        width: 200px;
      }
    }

    .header-title {
      margin-right: 0;

      h2 {
        width: 187px;
      }
    }

    .global-search-span {
      width: 300px;

      .global-search {
        width: 300px;
        padding-left: 25px;
      }
    }
  }
}
</style>
