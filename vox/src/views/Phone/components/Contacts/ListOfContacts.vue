<template>
  <div class="list-of-contacts-main-wrapper">

    <div class="top-container">
      <h2 class="contacts-title">Contacts</h2>
      <img class="add-contact-icon" src="@/assets/img/icons/blue-plus.svg" @click="createContact()" />
    </div>

    <label class="search-label">
      <svg class="search-icon" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.7557 16.5014C18.2396 16.0071 17.7374 15.4986 17.2495 14.9765C16.8397 14.5601 16.5929 14.2571 16.5929 14.2571L13.5079 12.784C14.743 11.3832 15.4246 9.58 15.425 7.71249C15.425 3.4607 11.9654 0 7.71249 0C3.4596 0 0 3.4607 0 7.71249C0 11.9643 3.4596 15.425 7.71249 15.425C9.65493 15.425 11.4255 14.6978 12.784 13.509L14.2571 16.594C14.2571 16.594 14.5601 16.8408 14.9765 17.2506C15.4029 17.6506 15.9637 18.1916 16.5014 18.7568L17.9976 20.2905L18.6631 21.0022L21 18.6653L20.2882 17.9998C19.8707 17.59 19.3132 17.0457 18.7557 16.5014V16.5014ZM7.71249 13.2214C4.67487 13.2214 2.20357 10.7501 2.20357 7.71249C2.20357 4.67487 4.67487 2.20357 7.71249 2.20357C10.7501 2.20357 13.2214 4.67487 13.2214 7.71249C13.2214 10.7501 10.7501 13.2214 7.71249 13.2214Z" fill="#B7B7B7"/>
      </svg>
      <input class="search-input" v-model="searchValue" @input="search($event.target.value)" placeholder="Search by name or number" maxlength="24" />
    </label>

    <span class="not-list" v-if="!collectionOfContacts.length">You don't have contacts</span>

    <ul class="list-of-contacts" v-else>
      <li class="list-of-contacts-item" v-for="(item, index) of collectionOfContacts" :key="index" @click.stop="makeCall(item)">
        <div class="left-section-of-list-item">
          <img class="favorite-contact-icon" src="@/assets/img/icons/favorite-contact.svg" />

          <UserDefaultAvatar 
            sizeWrapper="34px" 
            widthIcon="20px" 
            heightIcon="25px" 
            marginIcon="2px 0 0 0" 
            marginWrapper="0 5px 0 0" 
            :userAva="item.thumbnailPath" />

          <div class="name-and-number-block">
            <span class="name ellipsis">{{item.givenName}}</span>
            <span class="number">{{item.phoneNumbers[0].number}}</span>
          </div>
        </div>
        <img class="info-icon" src="@/assets/img/icons/info-icon.svg" @click.stop="setDisplayedContact(item)" content="Info"
              v-tippy="{ placement : 'top',  arrow: true, delay : 200, duration: 500, zIndex: 10001 }" />
      </li>
    </ul>

  </div>
</template>
<script>
import initialContact from '../../../../services/contacts/initialContact'
import UserDefaultAvatar from '@/components/UserDefaultAvatar'
export default {
  name: 'ListOfContacts',
  props: [
    'collectionOfContacts', 
    'setDisplayedContactProp',
    'makeCallProp',
    'searchProp'
    ],
  components: {UserDefaultAvatar},
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    search(value) {
      this.searchValue = value
      this.emittetSearch()
    },
    emittetSearch() {
      this.$emit('searchProp', this.searchValue)
    },
    createContact() {
      this.setDisplayedContact(JSON.parse(JSON.stringify(initialContact)))
    },
    setDisplayedContact(payload) {
      this.$emit('setDisplayedContactProp', payload)
    },
    makeCall(item) {
      this.$emit('makeCallProp', item)
    }
  },
  mounted() {
    
  }
}
</script>
<style lang="scss" scoped>
  .list-of-contacts-main-wrapper {
    padding-top: 55px;
    width: 375px;

    .top-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 16px;

      .contacts-title {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 28px;
        color: var(--font-panel);
      }

      .add-contact-icon {
        cursor: pointer;
        transform: scale(1, 1);
        transition: transform .3s ease-in-out;

        &:hover {
          transform: scale(1.2, 1.2);
          transition: transform .3s ease-in-out;
        }
      }
    }

    .search-label {
      margin: 16px 16px 32px 16px;
      box-shadow: 0px 1px 12px 1px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      height: 40px;
      width: 343px;
      background-color: var(--phone-search-bg);
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .search-icon {
        margin-left: 16px;
      }

      .search-input {
        margin-left: 16px;
        background: none;
        outline: none;
        border: none;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: var(--font-panel);
      }
    }

    .not-list {
      display: flex;
      align-items: center;
      justify-content: center;
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 26px;
      color: var(--font-panel);
    }

    .list-of-contacts {
      max-height: 495px;
      overflow: overlay;
      .list-of-contacts-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(72px);
        margin-bottom: 1px;
        position: relative;
        padding-left: 16px;
        padding-right: 19px;
        cursor: pointer;

        &::after {
          content: '';
          position: absolute;
          bottom: -0.25px;
          left: 11px;
          width: calc(100% - 22px);
          height: 0.5px;
          background-color: #B6B6B6;
        }

        .left-section-of-list-item {
          display: flex;
          align-items: center;
          position: relative;

          .favorite-contact-icon {
            position: absolute;
            left: -5px;
            top: -5px
          }

          .name-and-number-block {
            display: flex;
            flex-direction: column;

            .name {
              font-style: normal;
              width: 200px;
              font-weight: 600;
              font-size: 14px;
              line-height: 16px;
              color: var(--font-panel)
            }

            .number {
              font-style: normal;
              font-weight: 400;
              font-size: 13px;
              line-height: 15px;
              color: #B6B6B6;
            }
          }
        }

        .info-icon {
          cursor: pointer;
          transform: scale(1, 1);
          transition: transform .3s ease-in-out;

          &:hover {
            transform: scale(1.1, 1.1);
          }
        }
      }
    }
  }
</style>
