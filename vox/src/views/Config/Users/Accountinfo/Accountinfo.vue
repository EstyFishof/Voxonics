<template>
  <div class="wrap-main">
    <div class="wrap-form account-wrap">
      <div class="form" @submit.prevent="">
        <PersonalInfo/>
        <div class="bottom-field" v-if="userInfo">
          <div v-if="popUp" class="modal2">
            <div class="delete-block">
              <div class="delete-top-block">
                  <span class="delete-image">
                   ?
                  </span>
                <div class="top-content-block">
                  <span class="top-title">Change role?</span>
                  <span class="top-content">Changing users "Role" might affect his permissions and other settings, are you sure you want to change the "Role"?</span>
                </div>
              </div>
              <div class="delete-btn-block">
                <span class="cancel-btn" @click="cancel()">Cancel</span>
                <span class="delete-btn" @click="accept()">Change </span>
              </div>
            </div>
          </div>
          <div class="tabs" v-if="userInfo.permission.role !== 'agent'">
            <div class="left-tabs">
              <div @click="setShowOptions('permission')" :class="{active: showOptions === 'permission'}" class="tab">
                Permissions
              </div>
              <div @click="setShowOptions('department')"
                   :class="{active: showOptions === 'department'}" class="tab">
                Departments
              </div>
              <div @click="setShowOptions('queue-using')"
                   :class="{active: showOptions === 'queue-using' || showOptions === 'queue-managing'}"
                   class="tab queues">Queues
                <ul class="secondary-list" v-show="showOptions === 'queue-using' || showOptions === 'queue-managing'">
                  <li class="secondary-list__item" @click.stop="setShowOptions('queue-using')"
                      :class="{'active-secondary-item': showOptions === 'queue-using'}">Using
                  </li>
                  <li v-if="userInfoVuex.permission.role !== 'agent'" class="secondary-list__item"
                      @click.stop="setShowOptions('queue-managing')"
                      :class="{'active-secondary-item': showOptions === 'queue-managing'}">Managing
                  </li>
                </ul>
              </div>
              <div @click="setShowOptions('outbound-routing')"
                   :class="{active: showOptions === 'outbound-routing'}" class="tab">
                Outbound Routing
              </div>
              <div @click="switchMode" class="tab">Settings overview</div>
            </div>
            <div class="right-tabs">
              <ControlPanel :show="showApplyBtn" :apply="handlerSubmit" :discard="clearUser"/>
            </div>
          </div>
          <div class="body" v-if="userInfo.permission">
            <template v-if="userInfo.permission.role === 'agent'">
              <AgentRelatedWith/>
            </template>
            <template v-else-if="showOptions === 'permission'">
              <Permission/>
            </template>
            <template v-else-if="showOptions === 'queue-using'">
              <QSettings/>
            </template>
            <template v-else-if="showOptions === 'queue-managing'">
              <QManaging/>
            </template>
            <template v-else-if="showOptions === 'outbound-routing'">
              <OutboundRouting/>
            </template>
            <template v-else-if="showOptions === 'department'">
              <Departments/>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import PersonalInfo from '@/views/Config/Users/Accountinfo/components/PersonalInfo'
import Permission from '@/views/Config/Users/Accountinfo/components/Permission'
import QSettings from '@/views/Config/Users/Accountinfo/components/QSettings'
import OutboundRouting from '@/views/Config/Users/Accountinfo/components/OutboundRouting'
import QManaging from '@/views/Config/Users/Accountinfo/components/ManagerSettings/components/QManaging'
import AgentRelatedWith from './components/AgentRelatedWith'
import { UsersGettersApi } from '@/API/getters'
import { UsersEffectsApi } from '@/API/effects'
import Departments from '@/views/Config/Users/Accountinfo/components/ManagerSettings/components/Departments'
import { mapGetters } from 'vuex'
import observables from '../../../../store/observable.mutations'
import { UserParse, isEqual } from '@/lib/parse.user'
import comparator from '@/lib/comparator'
import _ from 'lodash'
import ControlPanel from '../../../../components/ControlPanel'


export default {
  name: 'Accountinfo',
  components: {
    ControlPanel,
    Departments,
    QSettings,
    PersonalInfo,
    Permission,
    QManaging,
    AgentRelatedWith,
    OutboundRouting
  },
  data() {
    return {
      unsubscribe: () => {
      },
      showOptions: 'permission',
      array: ['avatar', 'name', 'phone', 'location', 'position', 'email', 'internalNumber'],
      showApplyBtn: false,
      popUp: false
    }
  },
  watch: {
    getGlobalQueuesList() {
      this.$store.dispatch('queuesRelated', JSON.parse(JSON.stringify(this.getGlobalQueuesList)))
    }
  },
  computed: {
    ...mapGetters(['userInfoVuex', 'userUid', 'changeFields', 'getInitialUser', 'userInfo', 'roleAgent', 'getGlobalQueuesList'])
  },
  methods: {
    cancel() {
      this.popUp = false
      return false
    },
    accept() {
      const form = JSON.parse(JSON.stringify(this.userInfoVuex))
      const user = UserParse(form)
      const final = comparator(user)
      UsersEffectsApi.updateUser(final, this.userUid || sessionStorage.getItem('userUid'))
        .then(() => this.popUp = false)
    },
    setShowOptions(param) {
      this.showOptions = param
      UsersGettersApi.viewUser(this.userUid || sessionStorage.getItem('userUid'), this.array)
    },
    clearUser() {
      this.popUp = false
      UsersGettersApi.viewUser(this.userUid || sessionStorage.getItem('userUid'))
    },
    handlerSubmit() {
      const form = JSON.parse(JSON.stringify(this.userInfoVuex))//избавляемся от обзерверов
      const user = UserParse(form)
      const final = comparator(user)
      if (this.changeFields.includes('setNewRole')) {
        this.popUp = true
      } else {
        UsersEffectsApi.updateUser(final, this.userUid || sessionStorage.getItem('userUid'))
      }

    },
    switchMode() {
      const num = window.location.href.split('/').pop()
      this.$router.push(`/config/users/edit-user/${num}`)
    }
  },
  mounted() {
    const id = sessionStorage.getItem('userUid')
    if (!this.userUid) {
      UsersGettersApi.viewUser(id)
    }
    if (this.roleAgent !== 'agent') {
      this.unsubscribe = this.$store.subscribe((mutation) => {
        if (observables.user.includes(mutation.type)) {
          this.showApplyBtn = isEqual(this.getInitialUser, this.userInfoVuex)
          this.$store.commit('writeChanges', mutation.type)
        } else if (mutation.type === 'setUserInfo') {
          this.showApplyBtn = false
          this.$store.commit('resetChanges')
        }
      })
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.popUp) {
        this.accept()
      }
      if (e.key === 'Escape' && this.popUp) {
        this.cancel()
      }
    })

    // this.$router.beforeEach((to, from, next) => {
    //   console.log('aasdasdasdas')
    // // if(yourCondition){
    //     // next(false); // prevent user from navigating somewhere
    // // } else {
    //     return next(); // navigate to next "page" as usual
    // // }
    // })
  },
  beforeDestroy() {
    this.unsubscribe()
    this.$store.dispatch('reset')

    // this.$router.beforeEach((to, from, next) => {
    //   console.log('99999999999999')
    // // if(yourCondition){
    //     next(false); // prevent user from navigating somewhere
    // // } else {
    // //     return next(); // navigate to next "page" as usual
    // // }
    // })
  }
}
</script>

<style lang="scss">
.wrap-main {
  min-height: 80%;

  .wrap-form {
    min-height: 100%;
    border-radius: 8px;
  }

  .account-wrap {
    padding: 0 !important;
  }

  .header {
    width: 100%;
    border-radius: 8px 8px 0 0;

    img {
      margin-bottom: -5px;
    }

    span {
      margin-left: 12px;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
    }
  }


  .wrap-form {
    .form {
      height: 100%;

      .bottom-field {
        min-height: 435px;
        position: relative;

        .tabs {
          position: relative;
          background-color: var(--substrate);
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          padding-left: 60px;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.07);
          z-index: 10;
          // border-left: 2px solid var(--cdr-border-row);
          // border-right: 2px solid var(--cdr-border-row);

          .left-tabs, .right-tabs {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;

            .tab {
              font-family: 'Roboto', sans-serif;
              font-size: 16px;
              font-weight: 400;
              line-height: 19px;
              color: #8B9095;
              white-space: nowrap;
              padding: 5px;
              cursor: pointer;
              margin: 0 10px;
              display: flex;
              flex-direction: column;
              position: relative;

              &.active {
                background: var(--light-blue);
                border-radius: 4px 4px 0 0;
                color: var(--white);
                position: relative;
              }

              .secondary-list {
                display: flex;
                position: absolute;
                bottom: -15px;
                z-index: 10;

                &__item {
                  font-weight: normal;
                  font-size: 12px;
                  line-height: 12px;
                  color: rgba(143, 143, 143, 1);
                  cursor: pointer !important;
                  position: relative;

                  &:not(:last-child) {
                    margin-right: 10px;
                  }
                }

                .active-secondary-item {
                  color: var(--light-blue);
                  font-size: 14px;
                }
              }
            }

            .queues {
              position: relative;

              &.active {
                position: relative;

                .active-secondary-item::before {
                  content: '';
                  position: absolute;
                  left: -5px;
                  top: -5px;
                  z-index: 10;
                  height: 21px;
                  width: 17px;
                  background-color: transparent;
                  border-left: 2px solid var(--light-blue);
                  border-bottom: 2px solid var(--light-blue);
                  border-radius: 2px;
                }
              }
            }
          }
        }

        .body {
          background-color: var(--user-body-bg);
          // border: 2px solid var(--cdr-border-row);
          border-radius: 0 0 8px 8px;
          padding: 35px 79px 17px 79px;
          position: relative;
          min-height: 400px;
        }
      }


    }

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

    &.down {
      transform: rotate(-90deg);
    }
  }

  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.1);
    white-space: nowrap;
    margin-right: 24px;
  }
}

.hr {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--cdr-border-row);

  &.line {
    margin: 36px 0 0 24px;
    max-width: 100%;
    flex-basis: 972px;
  }
}

// <<<<<<<<<<<<<POPUP>>>>>>>>>>>>>>>>>>
.modal2 {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.023);
  box-shadow: inset 70px -70px 70px rgba(149, 149, 149, 0.023), inset -70px 70px 70px rgba(255, 255, 255, 0.023);
  backdrop-filter: blur(51.8px);
  display: flex;
  align-items: center;
  justify-content: center;

  .delete-block {
    background: var(--substrate);
    box-shadow: 0 16px 20px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    padding: 117px 142px 76px 142px;
    width: 571px;
    height: 390px;

    .delete-top-block {
      display: flex;
      justify-content: space-between;

      .delete-image {
        width: 85px;
        height: 85px;
        background: #FF3A29;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 35px;
      }

      .top-content-block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .top-title {
          display: inline-block;
          font-weight: normal;
          font-size: 24px;
          line-height: 28px;
          color: var(--font-panel);
          margin-bottom: 15px;
        }

        .top-content {
          display: inline-block;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          color: var(--font-panel);
          width: 154px;
        }
      }
    }

    .delete-btn-block {
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        width: 131px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 4px;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        cursor: pointer;
        transition: .3s ease;
        transform: scale(1, 1);

        &:hover {
          transition: .3s ease;
          transform: scale(1.1, 1.1);
        }
      }

      .cancel-btn {
        border: 2px solid var(--font-panel);
        color: var(--font-panel);
      }

      .delete-btn {
        border: 2px solid #FF3A29;
        color: #FF3A29;
      }
    }
  }
}
</style>
