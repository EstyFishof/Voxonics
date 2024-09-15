<template>
  <div class="personal-info-wrap">
    <div class="wrap-head">
      <h2 class="wrap-head-title">PERSONAL INFO</h2>
      <span class="hr"></span>
    </div>

    <div class="wrap-body">
      <FileLoader :userUidProp="false" />
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <label>
              Name*
              <input
                placeholder="Enter user name"
                class="input-field"
                @input="setUserInfo({ name: userInfo.name }); checkName()"
                maxlength="16"
                v-model.trim="userInfo.name"
                required
                :class="{ error: requiredFields.name }"
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
                @input="setUserInfo({ phone: userInfo.phone }); checkPhone()"
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
                @clickFunc="(item) => {setUserInfo({ location: item.location }); setParam('userInfo.location', item.location)}" 
                :clickFuncAll="null" :classNameList="'list-related-numbers'"  @scrollFunc="(event) => funScroll(event)" :itemText="(item) => item.location" 
                :classNameItemComputed="(item) => getForm.location === item.location ? 'selected' : ''" />
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
                @input="setUserInfo({ internalNumber: userInfo.internalNumber }); checkInternalNumber()"
                v-model.trim="userInfo.internalNumber"
                required
                :class="{ error: requiredFields.internalNumber }"
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
                placeholder="example@voxonics.com"
                class="input-field"
                type="email"
                @input="setUserInfo({ email: userInfo.email }); checkEmail()"
                maxlength="36"
                v-model.trim="userInfo.email"
              />
            </label>
            <div v-if="errors.email" class="alert">{{ errors.email }}</div>
          </div>
          <div class="item-container">
            <label
              >Position
              <input
                @input="setUserInfo({ position: userInfo.position })"
                placeholder="Sales Manager"
                class="input-field"
                type="text"
                maxlength="16"
                v-model.trim="userInfo.position"
              />
            </label>
          </div>
                    <div class="item-container password-field">
            <label
              >Password*
              <div
                class="icon-eye"
                :class="{
                  'icon-eye': passwordFieldType === 'text',
                  'icon-eye-close': passwordFieldType === 'password'
                }"
                @click="switchVisibility"
              ></div>
              <input
                placeholder="Enter password"
                class="input-field"
                :type="passwordFieldType"
                @input="setUserInfo({ password: userInfo.password }); checkPassword()"
                v-model.trim="userInfo.password"
                required
                :class="{ error: requiredFields.password }"
                maxlength="16"
              />
            </label>

            <div v-if="errors.password" class="alert-pass">
              {{ errors.password }}
            </div>
          </div>
          <div class="item-container password-field">
            <label
              >Confirm*
              <div v-if="switchVisibilityConfirm" @click="switchVisibilityConfirm">
                <span
                  :class="{
                    'icon-eye': passwordConfirmFieldType === 'text',
                    'icon-eye-close': passwordConfirmFieldType === 'password'
                  }"
                ></span>
              </div>
              <input
                placeholder="Confirm password"
                class="input-field"
                :type="passwordConfirmFieldType"
                v-model.trim="userInfo.confirm"
                @input="setUserInfo({ confirm: userInfo.confirm }); confirmPassword()"
                required
                :class="{ error: requiredFields.password }"
                maxlength="16"
              />
              <div v-if="errors.confirm" class="alert-pass">
                {{ errors.confirm }}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileLoader from "@/components/FileLoader"
import DropdownList from '@/components/DropdownList'
import Validate from "@/lib/validate"
import Api from "@/API/Global.api.js"
import ClickOutside from "@/lib/clickDirective"
import { mapGetters } from "vuex"
import _ from "lodash"

export default {
  name: "PersonalInfo",
  components: {
    FileLoader,
    DropdownList
  },
  props: ["requiredFields"],
  data() {
    return {
      userInfo: {
        name: "",
        phone: "",
        location: "",
        position: "",
        email: "",
        internalNumber: "",
        password: "",
        confirm: ""
      },

      errors: {
        name: "",
        phone: "",
        email: "",
        internalNumber: "",
        password: "",
        confirm: ""
      },

      passwordFieldType: "password",
      passwordConfirmFieldType: "password",
      passwordConfirmIcon: "icon-eye",

      showList: "",
      perPage: 9,
      timer: null
    }
  },
  computed: {
    ...mapGetters(["getForm", "getGlobalLocations"])
  },
  methods: {
    funScroll({ target }) {
      if (target.clientHeight + target.scrollTop === target.scrollHeight) {
        this.perPage += 9
        this.fetch("location", this.perPage, this.userInfo.location)
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
      Validate.checkInternalNumber(this)
    },
    checkPassword() {
      Validate.checkPassword(this)
    },
    confirmPassword() {
      Validate.confirmPassword(this)
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password"
    },
    switchVisibilityConfirm() {
      this.passwordConfirmFieldType = this.passwordConfirmFieldType === "password" ? "text" : "password"
      this.passwordConfirmIcon = this.passwordConfirmIcon === "icon-eye" ? "icon-eye-close" : "icon-eye"
    },
    fetch(fetchParam, perPage, value) {
      this.$store.dispatch("setSpinner", true)
      switch (fetchParam) {
        case "location":
          Api.getLocation(perPage, value)
          break
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
    setUserInfo(info) {
      this.$store.dispatch("setUserInfo", info)
      this.showList = ""
    },
    hide() {
      this.showList = ""
    }
  },
  mounted() {
    //Если есть записи в сторе, переносим их в компонент
    for (const key in this.getForm) {
      if (
        Object.prototype.hasOwnProperty.call(this.userInfo, key) &&
        Object.prototype.hasOwnProperty.call(this.getForm, key)
      ) {
        this.userInfo[key] = this.getForm[key]
      }
    }
    this.popupItem = this.$refs.list
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/users/personalInfo.scss"></style>
<style lang="scss" scoped>
@media (max-width: 1408px) {
  .personal-info-wrap {
    .wrap-body {
      .personal-info__first-part {
        .item-container {
          margin: 16px 22px;
        }
      }
    }
  }
}
</style>
