<template>
  <div class="wrap-main">
    <DeleteComponent @deleteFunc="deleteUser" @cancelDeleteFunc="cancelDelete" :deleteInfo="getDeleteUser"
                     :textProp="textToDeleteComponent" :titleProp="titleToDeleteComponent" :topProp="0"/>
    <div class="header-edit-user">
      <button class="go-back-btn" @click="goBack()">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17L1 9L9 1" stroke="#276899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="tab">
        <svg width="33" height="29" viewBox="20 15 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="17" y="16" width="33" height="29" rx="8" :fill="theme === 'light' ? 'none' : '#17212B'"/>
          <mask id="path-2-inside-1" fill="white">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M45.9469 39.0923C45.9469 39.6852 45.4293 40.1663 44.789 40.1663C44.1486 40.1663 43.6311 39.6852 43.6311 39.0923C43.6311 36.1311 41.0339 33.7219 37.8416 33.7219C34.6493 33.7219 32.0521 36.1311 32.0521 39.0923C32.0521 39.6852 31.5345 40.1663 30.8942 40.1663C30.2539 40.1663 29.7363 39.6852 29.7363 39.0923C29.7363 34.9464 33.3733 31.5738 37.8416 31.5738C42.3099 31.5738 45.9469 34.9464 45.9469 39.0923ZM37.8416 23.25C39.1187 23.25 40.1574 24.3339 40.1574 25.6667C40.1574 26.9995 39.1187 28.0833 37.8416 28.0833C36.5644 28.0833 35.5258 26.9995 35.5258 25.6667C35.5258 24.3339 36.5644 23.25 37.8416 23.25ZM37.8425 30.5007C40.3968 30.5007 42.4741 28.3329 42.4741 25.6673C42.4741 23.0017 40.3968 20.834 37.8425 20.834C35.2882 20.834 33.2109 23.0017 33.2109 25.6673C33.2109 28.3329 35.2882 30.5007 37.8425 30.5007Z"/>
          </mask>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M45.9469 39.0923C45.9469 39.6852 45.4293 40.1663 44.789 40.1663C44.1486 40.1663 43.6311 39.6852 43.6311 39.0923C43.6311 36.1311 41.0339 33.7219 37.8416 33.7219C34.6493 33.7219 32.0521 36.1311 32.0521 39.0923C32.0521 39.6852 31.5345 40.1663 30.8942 40.1663C30.2539 40.1663 29.7363 39.6852 29.7363 39.0923C29.7363 34.9464 33.3733 31.5738 37.8416 31.5738C42.3099 31.5738 45.9469 34.9464 45.9469 39.0923ZM37.8416 23.25C39.1187 23.25 40.1574 24.3339 40.1574 25.6667C40.1574 26.9995 39.1187 28.0833 37.8416 28.0833C36.5644 28.0833 35.5258 26.9995 35.5258 25.6667C35.5258 24.3339 36.5644 23.25 37.8416 23.25ZM37.8425 30.5007C40.3968 30.5007 42.4741 28.3329 42.4741 25.6673C42.4741 23.0017 40.3968 20.834 37.8425 20.834C35.2882 20.834 33.2109 23.0017 33.2109 25.6673C33.2109 28.3329 35.2882 30.5007 37.8425 30.5007Z"
                fill="#276899"/>
          <path
            d="M43.9469 39.0923C43.9469 38.4429 44.4676 38.1663 44.789 38.1663V42.1663C46.391 42.1663 47.9469 40.9274 47.9469 39.0923H43.9469ZM44.789 38.1663C45.1104 38.1663 45.6311 38.4429 45.6311 39.0923H41.6311C41.6311 40.9274 43.1869 42.1663 44.789 42.1663V38.1663ZM45.6311 39.0923C45.6311 34.8876 41.9943 31.7219 37.8416 31.7219V35.7219C40.0735 35.7219 41.6311 37.3745 41.6311 39.0923H45.6311ZM37.8416 31.7219C33.6889 31.7219 30.0521 34.8876 30.0521 39.0923H34.0521C34.0521 37.3745 35.6096 35.7219 37.8416 35.7219V31.7219ZM30.0521 39.0923C30.0521 38.4429 30.5728 38.1663 30.8942 38.1663V42.1663C32.4963 42.1663 34.0521 40.9274 34.0521 39.0923H30.0521ZM30.8942 38.1663C31.2156 38.1663 31.7363 38.4429 31.7363 39.0923H27.7363C27.7363 40.9274 29.2922 42.1663 30.8942 42.1663V38.1663ZM31.7363 39.0923C31.7363 36.19 34.3335 33.5738 37.8416 33.5738V29.5738C32.4131 29.5738 27.7363 33.7027 27.7363 39.0923H31.7363ZM37.8416 33.5738C41.3497 33.5738 43.9469 36.19 43.9469 39.0923H47.9469C47.9469 33.7027 43.2701 29.5738 37.8416 29.5738V33.5738ZM37.8416 25.25C37.8982 25.25 37.9661 25.271 38.0344 25.3423C38.104 25.415 38.1574 25.5261 38.1574 25.6667H42.1574C42.1574 23.3105 40.3028 21.25 37.8416 21.25V25.25ZM38.1574 25.6667C38.1574 25.8072 38.104 25.9184 38.0344 25.991C37.9661 26.0623 37.8982 26.0833 37.8416 26.0833V30.0833C40.3028 30.0833 42.1574 28.0228 42.1574 25.6667H38.1574ZM37.8416 26.0833C37.785 26.0833 37.7171 26.0623 37.6488 25.991C37.5792 25.9184 37.5258 25.8072 37.5258 25.6667H33.5258C33.5258 28.0228 35.3804 30.0833 37.8416 30.0833V26.0833ZM37.5258 25.6667C37.5258 25.5261 37.5792 25.415 37.6488 25.3423C37.7171 25.271 37.785 25.25 37.8416 25.25V21.25C35.3804 21.25 33.5258 23.3105 33.5258 25.6667H37.5258ZM37.8425 32.5007C41.5809 32.5007 44.4741 29.3562 44.4741 25.6673H40.4741C40.4741 27.3096 39.2127 28.5007 37.8425 28.5007V32.5007ZM44.4741 25.6673C44.4741 21.9784 41.5809 18.834 37.8425 18.834V22.834C39.2127 22.834 40.4741 24.0251 40.4741 25.6673H44.4741ZM37.8425 18.834C34.1041 18.834 31.2109 21.9784 31.2109 25.6673H35.2109C35.2109 24.0251 36.4723 22.834 37.8425 22.834V18.834ZM31.2109 25.6673C31.2109 29.3562 34.1041 32.5007 37.8425 32.5007V28.5007C36.4723 28.5007 35.2109 27.3096 35.2109 25.6673H31.2109Z"
            fill="#276899" mask="url(#path-2-inside-1)"/>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M29.1942 30.2363H25.9376V26.8379C25.9376 26.5247 25.6944 26.2715 25.3948 26.2715C25.0952 26.2715 24.8521 26.5247 24.8521 26.8379V30.2363H21.5955C21.2959 30.2363 21.0527 30.4895 21.0527 30.8027C21.0527 31.116 21.2959 31.3691 21.5955 31.3691H24.8521V34.7676C24.8521 35.0808 25.0952 35.334 25.3948 35.334C25.6944 35.334 25.9376 35.0808 25.9376 34.7676V31.3691H29.1942C29.4938 31.3691 29.7369 31.116 29.7369 30.8027C29.7369 30.4895 29.4938 30.2363 29.1942 30.2363Z"
                fill="#276899"/>
          <defs>
            <filter id="filter0_d" x="0" y="0" width="65" height="61" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dx="-1"/>
              <feGaussianBlur stdDeviation="8"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <filter id="filter1_d" x="25.7363" y="20.834" width="24.2105" height="27.3323" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <filter id="filter2_d" x="17.0527" y="26.2715" width="16.6842" height="17.0625" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
          </defs>
        </svg>
        <span>Settings overview</span>
      </div>
    </div>
    <img 
      v-show="userInfo.uid !== userUid"
      content="Delete user" 
      v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
      class="trash-user"
      src="../../../../assets/img/icons/trash.svg" alt="trash" width="30" @click="del()"
    />
    <div class="wrap-form">
      <!-- <form @submit.prevent="()=>{}"> -->
        <PersonalInfo/>
        <AgentSetup/>
        <QSettings/>
        <ManagerSettings/>
        <div class="btn-container">
          <button :disabled="!showApplyBtn" @click="handlerSubmit" class="btn-submit">Apply Changes</button>
        </div>
      <!-- </form> -->
    </div>
  </div>

</template>

<script>
import {UsersGettersApi} from '@/API/getters'
import PersonalInfo from "@/views/Config/Users/EditUser/components/PersonalInfo"
import AgentSetup from "@/views/Config/Users/EditUser/components/AgentSetup"
import ManagerSettings from "@/views/Config/Users/EditUser/components/ManagerSettings/ManagerSettings"
import QSettings from "@/views/Config/Users/EditUser/components/QSettings"
import DeleteComponent from '@/components/DeleteComponent'
// import User from "@/API/Global.api"
import { mapGetters } from "vuex"
import {UsersEffectsApi} from "@/API/effects"
import { UserParse, isEqual } from "@/lib/parse.user"
import store from "@/store"
import observables from "@/store/observable.mutations"
import comparator from "@/lib/comparator"
import _ from 'lodash'

export default {
  name: "EditUser",
  components: {QSettings, ManagerSettings, AgentSetup, PersonalInfo, DeleteComponent},
  data() {
    return {
      unsubscribe: () => {
      },
      showApplyBtn: false,
      textToDeleteComponent: 'Are you sure you want to delete this User ?',
      titleToDeleteComponent: 'Delete User'
    }
  },
  watch: {
    getGlobalDepartments() {
      this.$store.dispatch('departmentsRelated', this.getGlobalDepartments)
    },
    getGlobalQueuesList() {
      this.$store.dispatch('queuesRelated', this.getGlobalQueuesList)
    }
  },
  computed: {
    ...mapGetters(['userInfoVuex', 'userUid', 'userInfo', 'theme', 'getInitialUser', 'getDeleteUser', 'getGlobalDepartments', 'getGlobalQueuesList'])
  },
  methods: {
    del() {
      this.$store.dispatch('setDeleteUser', true)
    },
    cancelDelete() {
      this.$store.dispatch('setDeleteUser', false)
    },
    deleteUser() {
      UsersEffectsApi.deleteUser(sessionStorage.getItem('userUid'))
      this.$store.dispatch('setDeleteUser', false)
    },
    handlerSubmit() {
      const form = JSON.parse(JSON.stringify(this.userInfoVuex))//избавляемся от обзерверов
      const user = UserParse(form)
      const final = comparator(user)
      UsersEffectsApi.updateUser(final, this.userUid)
    },
    goBack() {
      this.$router.push(`/config/users/account-info/${this.userInfoVuex.internalNumber}`)
    }
  },
  beforeCreate() {
    if (!this.userUid) {
      const id = sessionStorage.getItem('userUid')
      UsersGettersApi.viewUser(id)
    }
  },
  mounted() {
    this.$store.dispatch('setGlobalDepartmentsList', {peerPage: 9})
    this.$store.dispatch('setGlobalQueuesList', {peerPage: 9})
    UsersGettersApi.outboundDirection()

    this.unsubscribe = store.subscribe((mutation) => {
      if (observables.user.includes(mutation.type)) {
        this.showApplyBtn = isEqual(this.getInitialUser, this.userInfoVuex)
        this.$store.commit('writeChanges', mutation.type)
      } else if (mutation.type === 'setUserInfo') {
        this.showApplyBtn = false
        this.$store.commit('resetChanges')
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
    this.$store.dispatch('setDeleteUser', false)
    this.$store.dispatch('reset')
  }
}
</script>

<style lang="scss">
.wrap-main {
  position: relative;

  .trash-user {
    position: absolute;
    top: 86px;
    right: 30px;
    cursor: pointer;

    &:active {
      transform: scale(0.95);
    }
  }

  .header-edit-user {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 4px;
    padding-top: 24px;

    .go-back-btn {
      height: 22px;
      width: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 2px;
      background-color: var(--paginator-item);
      border: none;
      outline: none;
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:hover {
        transform: scale(1.1, 1.1);
      }
    }

    .tab {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      border: 2px solid #276899;
      border-radius: 4px 4px 0 0;
      height: 32px;

      svg {
        margin: -1px 0 0 2px;
      }

      span {
        padding: 5px;
        font-size: 16px;
        font-weight: 300;
        color: var(--font-panel);
      }
    }
  }


  .wrap-form {
    background: var(--substrate);
    padding: 24px;

    .btn-submit {
      display: block;
      margin: 0 auto;
      border: none;
      font-weight: 500;
      font-size: 18px;
      background: var(--light-blue);
      border-radius: 8px;
      color: var(--white);
      width: 165px;
      height: 48px;
      cursor: pointer;
      outline: none;

      &:disabled {
        color: #ccc;
        filter: grayscale(1);
        pointer-events: none;
      }

    }
  }

}

//<<<<<<<<<<<<<---Для вложеных компонентов--->>>>>>>>>>>>>>>>
.wrap-head {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  .arrow {
    width: 15px;
    min-width: 15px;
    margin-right: 14px;
    transition: .3s;
    transform: rotate(-180deg);

    &.down {
      transform: rotate(-90deg);
    }
  }

  .wrap-head-title {
    font-family: 'Roboto', sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: var(--header-user-color);
    white-space: nowrap;
    margin-right: 24px;
  }
}

.hr {
  display: block;
  height: 2px;
  width: 100%;
  margin-right: 75px;
  background-color: var(--header-user-color);

  &.line {
    margin: 36px 0 0 24px;
    max-width: 100%;
    flex-basis: 972px;
  }
}
</style>
