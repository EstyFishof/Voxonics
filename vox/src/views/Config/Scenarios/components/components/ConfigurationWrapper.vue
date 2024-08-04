<template>
  <div class="configuration-block">
    <div class="header">
      <div class="left-sector">
        <img class="arrow" src="@/assets/img/icons/configuration-arrow.svg" @click="full = !full" :class="{'arrow-top': !full}" />
        <span class="header-title">{{getTitle}}</span>
        <svg class="delete-item" v-if="isRemovedItem" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg"  @click="removeItemCheck()" content="Delete" v-tippy="{ placement : 'top',  arrow: true, delay : 500, duration: 500 }">
          <path d="M0.879121 14.2222C0.879121 15.2 1.67033 16 2.63736 16H9.67033C10.6374 16 11.4286 15.2 11.4286 14.2222V3.55556H0.879121V14.2222ZM12.3077 0.888889H9.23077L8.35165 0H3.95604L3.07692 0.888889H0V2.66667H12.3077V0.888889Z" fill="var( --support-line)"/>
          <rect x="4.10352" y="0.410156" width="4.10256" height="0.410256" fill="#276899"/>
          <rect x="2.46289" y="4.92334" width="0.820513" height="9.4359" fill="#276899"/>
          <rect x="5.74023" y="4.92334" width="0.820513" height="9.4359" fill="#276899"/>
          <rect x="9.02539" y="4.92334" width="0.820513" height="9.4359" fill="#276899"/>
        </svg>
      </div>
    </div>
    <div v-if="full">
      <slot></slot>
    </div>
</div> 
</template>
<script>
import { mapGetters } from 'vuex'
import { getParentItem } from '../../../../../lib/parse.scenarios'
export default {
  name: 'ConfigurationWrapper',
  props: ['title', 'isRemovedItem', 'ivrKey'],
  data() {
    return {
      full: true,
      confirmationConfig: {
        execute: () => this.confirmationExecute(),
        executeBtnText: 'Confirm',
        cancel: () => this.closeModalConfirmation(),
        cancelBtnText: 'Close',
        titleText: 'Confirmation delete',
        textConfirmation: 'Are you sure you want to remove an element that has children?'
      }
    }
  },
  computed: {
    ...mapGetters(['getScenario', 'getItemScenario']),
    getTitle() {
      if(this.parentItem()?.schema === 'ivr') return `IVR ${this.title}`
      return this.title
    }
  },
  methods: {
    parentItem() {
      return getParentItem(this.getScenario.scenario, this.getItemScenario)
    },
    clearStore() {
      this.$store.dispatch('setItemScenario', null)
      this.$store.dispatch('setShowConfig', null)
      this.closeModalConfirmation()
    },
    confirmToDeleteBranch() {
      if(this.getItemScenario.next?.length) {
        return this.$store.commit('confirmationMutation', this.setConfirmationConfigToDeleteBranch())
      }
      return this.deleteBranch()
    },
    setConfirmationConfigToChooseTypeOfDelete() {
      return this.confirmationConfig = {
        execute: () => this.confirmToDeleteBranch(),
        executeBtnText: 'Branch',
        cancel: () => this.deleteCurrentItem(),
        cancelBtnText: 'Current link',
        titleText: 'Confirmation delete',
        textConfirmation: 'Would you like to remove ?'
      }
    },
    setConfirmationConfigToDeleteBranch() {
      return this.confirmationConfig = {
        execute: () => this.deleteBranch(),
        executeBtnText: 'Confirm',
        cancel: () => this.closeModalConfirmation(),
        cancelBtnText: 'Close',
        titleText: 'Confirmation delete',
        textConfirmation: 'Are you sure you want to remove an element that has children?'
      }
    },
    deleteBranch() {
      this.$store.dispatch('setDeleteBranch', this.getItemScenario)
      this.clearStore()
    },
    deleteCurrentItem() {
      this.$store.dispatch('setDeleteItem', this.getItemScenario)
      this.clearStore()
    },
    removeItemCheck() {
      if(this.getItemScenario.next?.length && this.getItemScenario.schema !== 'ivr') {
        return this.$store.commit('confirmationMutation', this.setConfirmationConfigToChooseTypeOfDelete())
      }
      if(this.getItemScenario.next?.length && this.getItemScenario.schema === 'ivr') {
        return this.$store.commit('confirmationMutation', this.setConfirmationConfigToDeleteBranch())
      }
      return this.deleteBranch()
    },
    closeModalConfirmation() {
      this.$store.commit('confirmationMutation', null)
    }
  }
}
</script>
<style lang="scss" scoped>
.configuration-block {
  display: flex;
  flex-direction: column;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 26px;
    height: 35px;
    background: #276899;
    margin-bottom: 22px;
    border-radius: 8px 8px 0 0;

    .left-sector {
      display: flex;
      align-items: center;
    }

    .arrow {
      margin-right: 12px;
      transition: all .5s ease;
    }

    .arrow-top{
      transform: rotate(180deg);
      transition: all .5s ease;
    }

    .header-title{
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      word-wrap: normal;
    }

    .delete-item{
      margin-left: 34px;
      cursor: pointer;
      transition: .3s ease;
      transform: scale(1, 1);

      &:hover {
        transition: .3s ease;
        transform: scale(1.2, 1.2);
      }
    }
  }
}
</style>
