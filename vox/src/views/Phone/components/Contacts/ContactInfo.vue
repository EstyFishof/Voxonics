<template>
  <div class="contact-info-main-wrapper">
    
    <div class="top-btns-container">

      <div class="back-btn" @click="setDisplayedContact(null)">
        <svg class="back-btn-arrow" width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.60938 20.3906C9.86719 20.6484 10.1953 20.7891 10.582 20.7891C11.3555 20.7891 11.9766 20.1797 11.9766 19.4062C11.9766 19.0195 11.8125 18.668 11.543 18.3984L3.33984 10.3828L11.543 2.39062C11.8125 2.12109 11.9766 1.75781 11.9766 1.38281C11.9766 0.609375 11.3555 0 10.582 0C10.1953 0 9.86719 0.140625 9.60938 0.398438L0.492188 9.30469C0.164062 9.60938 0.0117188 9.98438 0 10.3945C0 10.8047 0.164062 11.1562 0.492188 11.4727L9.60938 20.3906Z" fill="white"/>
        </svg>
        <span class="back-btn-text">Back</span>
      </div>

      <button class="change-mode-btn" @click="setChangeMode()">
        <img v-if="!changeMode" src="@/assets/img/icons/blue-pen-icon.svg" />
        <span v-else class="done-text">Done</span>
      </button>

    </div>

    <div class="info-user-container content-wrapper">

      <CropperPhoneAvatarWrapper 
        sizeWrapper="95px" 
        widthIcon="55px" 
        heightIcon="75px" 
        marginIcon="5px 0 0 0" 
        marginWrapper="0"
        :changeMode="changeMode"
        :stylesForFixesBlock="{top: '-55px', left: '-8px', 'background-color': 'none'}" 
        :userAva="displayedContact.thumbnailPath"
        @done="handleFileUpload"
      />

      <div class="info-name-container">
        <span class="text-span">
          <input class="text-input" v-model="displayedContact.givenName" placeholder="Name" :readonly="!changeMode" />
        </span>
        <span class="text-span">
          <input class="text-input" v-model="displayedContact.familyName" placeholder="Family name" :readonly="!changeMode" />
        </span>
        <span class="text-span">
          <input class="text-input" v-model="displayedContact.company" placeholder="Company" :readonly="!changeMode" />
        </span>
      </div>

    </div>

    <div class="fields-list-container content-wrapper">
      <span class="plus-btn" :class="{disabled: !canToAddNewPhoneNumber}" v-if="isShowAddIcon('phoneNumbers')" @click="addLine('phoneNumbers', {label: '', number: ''})">
        <img class="plus-icon" src="@/assets/img/icons/white-plus-icon.svg" />
      </span>
      <ul class="fields-list">
        <li class="fields-list-item" v-for="(item, index) of displayedContact.phoneNumbers" :key="index">
          <input
            class="list-item-label-input"
            @focus="setFocusedElement(`phoneNumbers${index}`)"
            @blur="setFocusedElement('')"
            v-model="item.label"
            type="text"
            placeholder="mobile"
            :readonly="!changeMode" 
          />
          <input
            class="list-item-value-input"
            @focus="setFocusedElement(`phoneNumbers${index}`)"
            @blur="setFocusedElement('')"
            v-model="item.number"
            placeholder="+XXX (XXX) XXX-XXXX"
            :readonly="!changeMode"
          />
          <span class="not-valid" v-if="item.number && !phoneNumberRegex.test(item.number)">Number not valid</span>

          <span
            v-show="focusedElement !== `phoneNumbers${index}` && changeMode"
            class="list-item-btn delete"
            @click="deleteItem('phoneNumbers', item)"
          >
            <span class="delete-span"></span>
          </span>

          <span
            class="list-item-btn add"
            v-show="focusedElement === `phoneNumbers${index}` && changeMode"
          >
            <img class="plus-icon" src="@/assets/img/icons/white-plus-icon.svg" />
          </span>

        </li>
      </ul>
    </div>

    <div class="fields-list-container content-wrapper">
      <span class="plus-btn" :class="{disabled: !canToAddNewEmail}" v-if="isShowAddIcon('emailAddresses')" @click="addLine('emailAddresses', {label: '', email: ''})">
        <img class="plus-icon" src="@/assets/img/icons/white-plus-icon.svg" />
      </span>
      <ul class="fields-list">
        <li class="fields-list-item" v-for="(item, index) of displayedContact.emailAddresses" :key="index">
          <input 
            class="list-item-label-input" 
            @focus="setFocusedElement(`emailAddresses${index}`)"
            @blur="setFocusedElement('')"
            value="Email" 
            readonly 
          />
          <input 
            class="list-item-value-input" 
            @focus="setFocusedElement(`emailAddresses${index}`)" 
            @blur="setFocusedElement('')"
            v-model="item.email" 
            type="email" 
            placeholder="adam.wong@example.com" 
            :readonly="!changeMode" 
          />
          <span class="not-valid" v-if="item.email && !emailAddressRegex.test(item.email)">Email not valid</span>

          <span
            v-show="focusedElement !== `emailAddresses${index}` && changeMode"
            class="list-item-btn delete"
            @click="deleteItem('emailAddresses', item)"
          >
            <span class="delete-span"></span>
          </span>

          <span
            class="list-item-btn add"
            v-show="focusedElement === `emailAddresses${index}` && changeMode"
          >
            <img class="plus-icon" src="@/assets/img/icons/white-plus-icon.svg" />
          </span>

        </li>
      </ul>
    </div>

    <div class="notes-container content-wrapper">
      <span class="content-title">Notes</span>
      <textarea class="notes-textarea" v-model="displayedContact.note" maxlength="123" rows="3" :readonly="!changeMode" />
    </div>

    <button class="delete-btn-wrapper content-wrapper" :class="{'confirm-delete': deleteConfirm}" @click="deleteContact()">
      <img class="trash-icon" src="@/assets/img/icons/red-trash.svg" />
      <span class="delete-btn-text">{{deleteBtnText}}</span>
    </button>

  </div>
</template>
<script>
import initialContact from '../../../../services/contacts/initialContact'
import UserDefaultAvatar from '@/components/UserDefaultAvatar'
import CropperPhoneAvatarWrapper from '../../../../components/CropperPhoneAvatarWrapper.vue'

export default {
  name: 'ContactInfo',
  props: [
    'setDisplayedContactProp', 
    'displayedContactProp',
    'deleteContactProp',
    'applyHandlerProp'
  ],
  components: { UserDefaultAvatar, CropperPhoneAvatarWrapper },
  data() {
    return {
      changeMode: false,
      deleteConfirm: false,
      displayedContact: JSON.parse(JSON.stringify(initialContact)),
      emailAddressRegex: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      phoneNumberRegex: /\b[\+\*]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{1,15}\b/m,
      focusedElement: ''
    }
  },
  computed: {
    deleteBtnText() {
      if(!this.deleteConfirm) return 'Delete contact'
      return 'Press agian to Delete this contact.'
    },
    canToAddNewPhoneNumber() {
      let canToAdd = true
      this.displayedContact.phoneNumbers.forEach(item => {
        if(!item.number || !this.phoneNumberRegex.test(item.number)) {
          canToAdd = false
        }
      })
      return canToAdd
    },
    canToAddNewEmail() {
      let canToAdd = true
      this.displayedContact.emailAddresses.forEach(item => {
        if(!item.email || !this.emailAddressRegex.test(item.email)) {
          canToAdd = false
        }
      })
      return canToAdd
    },
  },
  watch: {
    displayedContactProp() {
      this.changeMode = false
      this.deleteConfirm = false
      this.displayedContact = this.displayedContactProp ? JSON.parse(JSON.stringify(this.displayedContactProp)) : JSON.parse(JSON.stringify(initialContact))
    }
  },
  methods: {
    setFocusedElement(value) {
      this.focusedElement = value
    },
    setDisplayedContact(value) {
      this.$emit('setDisplayedContactProp', value)
    },
    setChangeMode() {
      if(!this.changeMode) return this.changeMode = true
      return (
        () => {
          this.$emit('applyHandlerProp', this.displayedContact)
        }
      )()
    },
    handleFileUpload(imgBase64) {
      this.displayedContact.thumbnailPath = imgBase64
    },
    isShowAddIcon(arrayName) {
      return this.changeMode && this.displayedContact[arrayName].length < 5
    },
    deleteItem(arrayName, item) {
      this.displayedContact[arrayName] = this.displayedContact[arrayName].filter(el => el !== item)
    },  
    addLine(arrayName, newLine) {
      if(!this.changeMode) return
      this.displayedContact[arrayName].push(newLine)
    },
    deleteContact() {
      if(!this.deleteConfirm) return this.deleteConfirm = true
      return (
        () => {
          this.$emit('deleteContactProp', this.displayedContact)
          this.deleteConfirm = false
        }
      )()
    }
  }
}
</script>
<style lang="scss" scoped>
  .contact-info-main-wrapper {
    margin-top: 27px;
    width: 375px;
    height: 630px;
    // overflow-y: auto;
    .top-btns-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 15px;
      margin-right: 8px;

      .back-btn{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 7px;
        cursor: pointer;

        .back-btn-arrow {
          margin-right: 5px;
        }

        .back-btn-text {
          color: var(--font-panel);
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          letter-spacing: -0.408px;
        }
      }

      .change-mode-btn {
        outline: none;
        border: none;
        height: 30px;
        width: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.06);
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(72px);
        border-radius: 11px;
        transform: scale(1, 1);
        transition: transfrom .3s ease-in-out;
        cursor: pointer;

        &:hover {
          transform: scale(1.1, 1.1);
        }

        .done-text {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: #34B53A;
          text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
        }
      }
    }

    .content-wrapper {
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(72px);
      border-radius: 11px;
      margin: 0 8px 8px;

      .content-title {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 22px;
        letter-spacing: -0.408px;
        color: #276899;
      }
    }
    .info-user-container {
      margin-top: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 7px;
      position: relative;
      z-index: 100;

      .info-name-container {
        width: 235px;

        .text-span {
          position: relative;
          height: 38px;
          display: flex;
          align-items: center;
          .text-input {
            background: none;
            border: none;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: var(--font-panel);
          }

          &:not(:last-child)::after {
              content: '';
              position: absolute;
              height: 1px;
              width: 100%;
              left: 0;
              bottom: 0;
              background-color: #0D2031;
            }
        }
      }
    }

    .fields-list {
      width: 100%;
    }

    .fields-list-container {
      padding: 10px 16px;
      display: flex;
      position: relative;
      min-height: 62px;

      .plus-btn {
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background: #276899;
        position: absolute;
        right: 6px;
        top: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(1, 1);
        transition: transform .3s ease-in-out;
        cursor: pointer;

        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }

        &:hover {
          transform: scale(1.2, 1.2);
        }
      }
      .fields-list {
        .fields-list-item {
          display: flex;
          flex-direction: column;
          position: relative;
          .list-item-label-input {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 22px;
            letter-spacing: -0.408px;
            color: #276899;
            background: none;
            outline: none;
            border: none;
          }
          .list-item-value-input {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 22px;
            letter-spacing: -0.408px;
            color: var(--font-panel);
            background: none;
            outline: none;
            border: none;
          }

          .not-valid {
            color: #ff3a29;
            font-size: 12px;
          }

          .list-item-btn {
            position: absolute;
            right: -10px;
            bottom: 1px;
            width: 17px;
            height: 17px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            &.delete {
              background: var(--button-edit-dep-bg);
              border: 2px solid var(--button-edit-dep-border);
              box-sizing: border-box;
              cursor: pointer;

              .delete-span {
                display: inline-block;
                height: 2px;
                width: 8px;
                background: #ff3a29;
                border-radius: 4px;
                margin-left: 1px;
              }
            }

            &.add {
              background: #276899;
            }
          }
        }
      }
    }

    .notes-container {
      padding: 9px 36px 7px 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .notes-textarea {
        background: none;
        outline: none;
        border: none;
        resize: none;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.408px;
        color: var(--font-panel);
        width: 100%;
      }
    }

    .delete-btn-wrapper {
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 17px 19px;
      width: calc(100% - 16px);
      cursor: pointer;
      transform: scale(1, 1);
      transition: all .3s ease-in-out;

      &.confirm-delete {
        box-shadow: 2px 2px 4px rgba(255, 0, 0, 0.25);
      }

      &:hover {
        transform: scale(1.01, 1.02);
      }

      .delete-btn-text {
        font-weight: 500;
        font-size: 12px;
        line-height: 22px;
        letter-spacing: -0.408px;
        color: #EB5545;
        margin-left: 8px;
      }
    }
  }
</style>
