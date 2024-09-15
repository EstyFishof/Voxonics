<template>
  <div class="personal-info-wrap" :class="{'non-pointer-events': roleAgent === 'agent'}">
    <div class="wrap-body">
      <span class="file-loader-span">
        <FileLoader :userUidProp="true" />
      </span>
      <div class="personal-info account-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <label>
              Name*
              <input
                @input="changeUserInfo({ name: userInfo.name }); checkName()"
                placeholder="Enter user name"
                class="input-field"
                maxlength="16"
                v-model.trim="userInfo.name"
                :class="{ error: !userInfo.name.length }"
              />
            </label>
            <div v-if="errors.name" class="alert">{{ errors.name }}</div>
          </div>
          <div class="item-container with-err">
            <label
              >Phone
              <input
                placeholder="Only digits"
                class="input-field"
                type="text"
                v-model.trim="userInfo.phone"
                maxlength="15"
                @input="changeUserInfo({ phone: userInfo.phone || null }); checkPhone()"
              />
            </label>
            <div v-if="errors.phone" class="alert">{{ errors.phone }}</div>
          </div>
          <div class="item-container">
            <label class="options-label" ref="list" v-click-outside="hide"
              >Location:
              <input
                class="input-field num"
                type="text"
                @input="search($event.target.value)"
                v-model="userInfo.location"
                placeholder="London, UK"
                maxlength="16"
              />
              <span
                @click="setParam('showList', 'location', 'location')"
                class="triangle"
                :class="{ 'rotate-arrow': showList === 'location' }"
              >
                <img src="@/assets/img/icons/select-arrow.svg" alt="select" />
              </span>
              <DropdownList v-show="showList === 'location'" :dataList="getGlobalLocations"
                @clickFunc="(item) => {setParam('userInfo.location', item.location); changeUserInfo({ location: userInfo.location || null }) }" 
                :clickFuncAll="null" :classNameList="'list-related-numbers'"  @scrollFunc="(event) => funScroll(event)" :itemText="(item) => item.location" 
                :classNameItemComputed="(item) => userInfoVuex.location === item.location ? 'selected' : ''" />
            </label>
          </div>
          <div class="item-container with-err">
            <label
              >Agent Number (id)*
              <input
                placeholder="000"
                class="input-field"
                type="text"
                v-facade="'###'"
                @input="changeUserInfo({ internalNumber: userInfo.internalNumber }); checkInternalNumber()"
                v-model.trim="userInfo.internalNumber"
                :class="{ error: errors.internalNumber }"
                maxlength="3"
              />
            </label>
            <div v-if="errors.internalNumber" class="alert">
              {{ errors.internalNumber }}
            </div>
          </div>
          <div class="item-container with-err">
            <label
              >Email
              <input
                @input="changeUserInfo({ email: userInfo.email || null }); checkEmail()"
                placeholder="example@voxonics.com"
                class="input-field"
                type="email"
                maxlength="36"
                v-model.trim="userInfo.email"
              />
            </label>
            <div v-if="errors.email" class="alert">{{ errors.email }}</div>
          </div>
          <div class="personal-info__second-part">
            <div class="item-container">
              <label
                >Position
                <input
                  @input="changeUserInfo({ position: userInfo.position || null })"
                  placeholder="Sales Manager"
                  class="input-field"
                  type="text"
                  maxlength="16"
                  v-model.trim="userInfo.position"
                />
              </label>
            </div>
          </div>
          <div class="hr"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileLoader from "@/components/FileLoader"
import DropdownList from '@/components/DropdownList'
import Validate from "@/lib/validate"
import { mapGetters } from "vuex"
import Api from "@/API/Global.api.js"
import store from "../../../../../store"
import _ from "lodash"
import ClickOutside from "@/lib/clickDirective"

export default {
  name: "PersonalInfo",
  components: {
    FileLoader,
    DropdownList
  },
  data() {
    return {
      unsubscribe: () => {},
      userInfo: {
        name: "",
        phone: "",
        location: "",
        position: "",
        email: "",
        internalNumber: ""
      },
      errors: {
        name: "",
        phone: "",
        email: "",
        internalNumber: "",
        password: "",
        confirm: ""
      },
      count: 10,
      showList: "",
      perPage: 9,
      timer: null
    }
  },
  computed: {
    ...mapGetters(["userInfoVuex", "userInfoComponent", "roleAgent", "getGlobalLocations"])
  },
  methods: {
    funScroll({ target }) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        if (this.count > this.perPage) {
          this.perPage += 9
          this.fetch("location", this.perPage, this.userInfo.location)
        }
      }
    },
    search(paramSearch) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch("location", this.perPage, paramSearch), 800)
    },
    checkName() {
      Validate.checkName(this)
    },
    checkPhone() {
      Validate.checkPhone(this)
    },
    checkEmail() {
      Validate.checkEmail(this)
    },
    checkInternalNumber() {
      const num = window.location.href.split("/").pop()
      Validate.checkInternalNumber(this, num)
    },
    checkPassword() {
      Validate.checkPassword(this)
    },
    confirmPassword() {
      Validate.confirmPassword(this)
    },
    fetch(fetchParam, perPage, value) {
      this.$store.dispatch("setSpinner", true)
      switch (fetchParam) {
        case "location":
          return Api.getLocation(perPage, value).then(data => {
            this.count = data.paginator.count
            return data.data
          })
        default:
          break
      }
    },
    setParam(param, value, fetchParam) {
      if (_.get(this, param) === value) {
        _.set(this, param, "")
      } else {
        _.set(this, param, value)
      }
      if (fetchParam) {
        this.fetch(fetchParam, this.perPage, this.userInfo.location)
      }
    },
    changeUserInfo(info) {
      this.showList = ""
      if (this.userInfoComponent.permission.role !== "agent") {
        this.checkInternalNumber()
        this.$store.dispatch("changeUserInfo", info)
      }
    },
    hide() {
      this.showList = ""
    }
  },
  mounted() {
    if (this.roleAgent !== "agent") {
      //Если есть записи в сторе, переносим их в компонент
      for (const key in this.userInfoVuex) {
        this.userInfo[key] = this.userInfoVuex[key]
      }
      this.unsubscribe = store.subscribe(mutation => {
        if (mutation.type === "setUserInfo") {
          for (const key in this.userInfoVuex) {
            this.userInfo[key] = this.userInfoVuex[key]
          }
        }
      })
    } else {
      for (const key in this.userInfoComponent) {
        this.userInfo[key] = this.userInfoComponent[key]
      }
    }
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
.personal-info-wrap {
  background-color: var(--substrate);
  border-radius: 8px 8px 0 0;
  // border: 2px solid var(--cdr-border-row);
  border-bottom: none;

  &.non-pointer-events {
    pointer-events: none;
  }

  .wrap-body {
    display: flex;
    flex-direction: row;
    padding: 0 0 36px 36px;

    .file-loader-span {
      margin: 24px;
    }

    .personal-info {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-left: 36px;

      .hr {
        width: 100%;
        height: 2px;
        background: var(--cdr-border-row);
        border-radius: 2px;
        flex-grow: 1;
        margin: 32px 24px 0 24px;
      }

      &__first-part,
      &__second-part {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: flex-start;

        .item-container {
          margin: 16px 24px;
          position: relative;

          label {
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            color: var(--light-blue);
          }

          .error {
            border: 1px solid red;
          }

          .alert {
            position: absolute;
            font-size: 16px;
            font-weight: 300;
            color: #ff0000;
            bottom: -24px;
          }

          .options-label {
            .input-field {
              margin-top: 12px;
              display: block;
              padding: 5px 16px;
              width: 292px;
              height: 35px;
              background: var(--input-bg);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
              border-radius: 4px;
              color: var(--font-panel);
              border: none;
            }

            .triangle {
              height: 35px;
              width: calc(100% - 7px);
            }

            .list-related-numbers {
              max-height: 200px;
              overflow-y: auto;
            }
          }
        }
      }
    }
  }

  .with-err {
    position: relative;
    margin-bottom: 30px;
  }
}
@media (max-width: 1408px) {
  .input-field {
    width: 270px;
  }
}

</style>
<style lang="scss">
@media (max-width: 1408px) {
  .personal-info-wrap {
    .wrap-body {
      .account-info {
        .personal-info {
          &__first-part {
            .item-container {
              .options-label {
                .input-field {
                  width: 270px !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
