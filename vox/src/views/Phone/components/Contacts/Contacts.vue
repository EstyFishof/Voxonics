<template>
  <AnimationHOCOfParallelComponents class="contact-page-main-wrapper" :valueProp="!displayedСontact">
    <template v-slot:left >
      <ListOfContacts
        :collectionOfContacts="collectionOfContacts" 
        @setDisplayedContactProp="setDisplayedContact"
        @searchProp="search" 
        @makeCallProp="makeCall" />
    </template>
    <template v-slot:right >
      <ContactInfo
        ref="ContactInfo"
        :displayedContactProp="displayedСontact" 
        @setDisplayedContactProp="setDisplayedContact"
        @deleteContactProp="deleteContact"
        @applyHandlerProp="applyHandler" />
    </template>
  </AnimationHOCOfParallelComponents>

</template>
<script>
import ListOfContacts from "./ListOfContacts.vue";
import ContactInfo from "./ContactInfo.vue";
import {ContactService} from '@/services/contacts'
import AnimationHOCOfParallelComponents from '../../animationComponents/AnimationHOCOfParallelComponents.vue'
import { mapGetters } from "vuex";

export default {
  name: 'Contacts',
  components: { ListOfContacts, ContactInfo, AnimationHOCOfParallelComponents },
  data() {
    return {
      collectionOfContacts: [],
      displayedСontact: null,
      searchValue: '',
      confirmationConfig: {
        cancel: () => this.$store.commit('confirmationMutation', null),
        cancelBtnText: 'Close',
        titleText: '',
        textConfirmation: 'Contact with such data already exists'
      }
    }
  },
  watch: {
    displayedСontact() {
      this.search(this.searchValue)
    }
  },
  computed: {
    ...mapGetters(['getContactFromStore'])
  },
  methods: {
    setDisplayedContact(value) {
      this.displayedСontact = value
    },
    makeCall(item) {
      const number = item.phoneNumbers[0].number.length === 3 && item.phoneNumbers[0].number[0] !== '*' ? '*' + item.phoneNumbers[0].number : item.phoneNumbers[0].number
      this.$store.dispatch('sipCall', number)
    },
    deleteContact(contact) {
      this.displayedСontact = null
      ContactService.deleteContact(contact)
    },
    search(value) {
      this.searchValue = value
      this.collectionOfContacts = ContactService.search(value)
    },
    isInFavorite(contact) {
      return ContactService.isInFavorite(contact)
    },
    createContact(contact) {
      ContactService.addContact(contact)
    },
    updateContact(contact) {
      ContactService.updateContact(contact)
    },
    isDuplicate(contact) {
      return ContactService.isDuplicate(contact)
    },
    applyHandler(contact) {
      if(this.$refs.ContactInfo.$el.querySelector('.not-valid')) {
        this.confirmationConfig.textConfirmation = 'Contact not valid'
        return this.$store.commit('confirmationMutation', this.confirmationConfig)
      }
      if(this.isInFavorite(contact)) {
        this.displayedСontact = null
        return this.updateContact(contact)
      }
      if(this.isDuplicate(contact)) {
        this.confirmationConfig.textConfirmation = 'Contact with such data already exists'
        return this.$store.commit('confirmationMutation', this.confirmationConfig)
      }
      this.displayedСontact = null
      return this.createContact(contact)
    },
    getAllContacts() {
      this.collectionOfContacts = ContactService.getAll()
    }
  },
  mounted() {
    this.getAllContacts()
    if(this.getContactFromStore) {
      this.displayedСontact = JSON.parse(JSON.stringify(this.getContactFromStore))
      this.$store.commit('setContact', null)
    }

  }
}
</script>
<style lang="scss" scoped>
  .contact-page-main-wrapper {
    display: flex;
    align-items: flex-start;
  }
</style>
