<template>
  <div class="options-block">

    <div class="left-section">
      <span class="options-title">{{title}}</span>
      <div class="btn-content-wrapper">
        <button class="toggle-btn" :class="{'active': showList}" @click="toggleShowList">
          <img src="@/assets/img/icons/select-type-of-scenario-item-icon.svg" />
        </button>
        <span class="current-item-block" v-if="getCurrentItem[0]" :class="{'active': !showList}">
          <img class="current-item-icon" :src="getCurrentItem[0].icon()" />
          <span class="current-item-title">{{getCurrentItem[0].title}}</span>
        </span>
      </div>

      <slot name="ivr-key"></slot>

    </div>

    <div class="right-section">

      <ul class="list" v-if="showList" :style="{width: calcListWidth}">
        <li class="list-item" v-for="(item, index) of getListOfSchemes" :key="index" @click="setScheme(item.type)">
          <img class="item-icon" :src="item.icon()" />
          <span class="item-title">{{item.title}}</span>
        </li>
      </ul>

      <slot name="config" v-else></slot>
    </div>


  </div>
</template>
<script>
import dialBlack from '@/assets/img/icons/user-scenario.svg'
import dialWhite from '@/assets/img/icons/user-scenario-white.svg'
import queueIconBlack from '@/assets/img/icons/queue-scenario.svg'
import queueIconWhite from '@/assets/img/icons/queue-scenario-white.svg'
import waitIconBlack from '@/assets/img/icons/wait-scenario.svg'
import waitIconWhite from '@/assets/img/icons/wait-scenario-white.svg'
import ivrIconBlack from '@/assets/img/icons/ivr-scenario.svg'
import ivrIconWhite from '@/assets/img/icons/ivr-scenario-white.svg'
import announcmentIconBlack from '@/assets/img/icons/announcment-scenario.svg'
import announcmentIconWhite from '@/assets/img/icons/announcment-scenario-white.svg'
import voicemailIconBlack from '@/assets/img/icons/voicemail-icon.svg'
import voicemailIconWhite from '@/assets/img/icons/voicemail-icon-white.svg'
import gotolfTimeIconBlack from '@/assets/img/icons/gotolfTime-icon.svg'
import gotolfTimeIconWhite from '@/assets/img/icons/gotolfTime-icon-white.svg'
import hangupIcon from '@/assets/img/icons/hangup-icon.svg'
import hangupIconWhite from '@/assets/img/icons/hangup-icon-white.svg'

import { mapGetters } from 'vuex'
export default {
  name: 'ChooseItemSchemeComponent',
  props: ['title', 'setItemScheme', 'currentSchemeType', 'currentSchemeTitle', 'ivrKey', 'showListProp', 'canToggleShowList'],
  data() {
    return {
      showList: !!this.showListProp,
      listOfSchemes: [
        {
          type: 'dial',
          title: 'Agent',
          icon: () => this.theme === 'dark' ? dialBlack : dialWhite
        },
        {
          type: 'announcement',
          title: 'Announcement',
          icon: () => this.theme === 'dark' ? announcmentIconBlack : announcmentIconWhite
        },
        {
          type: 'ivr',
          title: 'IVR',
          icon: () => this.theme === 'dark' ? ivrIconBlack : ivrIconWhite
        },
        {
          type: 'wait',
          title: 'Wait',
          icon: () => this.theme === 'dark' ? waitIconBlack : waitIconWhite
        },
        {
          type: 'queue',
          title: 'Queue',
          icon: () => this.theme === 'dark' ? queueIconBlack : queueIconWhite
        },
        // {
        //   type: 'gotolfTime',
        //   title: 'GotolfTime',
        //   icon: () => this.theme === 'dark' ? gotolfTimeIconBlack : gotolfTimeIconWhite
        // },
        // {
        //   type: 'voicemail',
        //   title: 'Voicemail',
        //   icon: () => this.theme === 'dark' ? voicemailIconBlack : voicemailIconWhite
        // },
        {
          type: 'hangup',
          title: 'Hangup',
          icon: () => this.theme === 'dark' ? hangupIcon : hangupIconWhite
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['theme']),
    getListOfSchemes() {
      return this.listOfSchemes.filter(el => {
        if(el.type === 'hangup') {
          return ['invalid', 'timeout'].includes(this.ivrKey) && el.type !== this.currentSchemeType
        }
        return el.type !== this.currentSchemeType
      })
    },
    getCurrentItem() {
      return this.listOfSchemes.filter(el => el.type === this.currentSchemeType)
    },
    calcListWidth() {
      return this.getListOfSchemes.length % 2 === 0 ? '625px' : '825px'
    }
  },
  methods: {
    toggleShowList() {
      if(!this.canToggleShowList) return
      this.showList = !this.showList
    },
    setScheme(type) {
      this.$emit('setItemScheme', type)
      this.showList = false
    }
  }
}
</script>
<style lang="scss" scoped>
.options-block{
    position: relative;
    display: flex;
    align-items: flex-start;

    &:not(:last-child) {
      margin-right: 35px;
    }

  .left-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 231px;
    margin-right: 21px;

    .options-title {
      font-weight: 400;
      font-size: 19px;
      line-height: 22px;
      color: var(--font-panel);
      margin-bottom: 6px;
    }

    .btn-content-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border: 2px solid var(--scenario-option-bg);
      box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background: var(--main-bg);
      height: 52px;

      .toggle-btn {
        height: 100%;
        width: 63px;
        box-sizing: border-box;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--main-bg);
        border: none;
        cursor: pointer;

        &.active {
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.07);
          background: var(--cdr-item-bg);
          border: 2px solid var(--scenario-option-bg);
        }
      }

      .current-item-block {
        display: flex;
        align-items: center;
        height: 101%;
        width: 100%;
        padding-left: 6px;
        border-radius: 4px;
        border: none;
        box-sizing: border-box;
        background: var(--main-bg);

        &.active {
          background: var(--cdr-item-bg);
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.07);

        }

        .current-item-icon {
          margin-right: 8px;
          // margin-bottom: -6px;
        }

        .current-item-title {
          font-weight: 400;
          font-size: 18px;
          line-height: 21px;
          color: var(--font-panel);
        }
      }
    }

  }

  .right-section {
    display: flex;
    flex-wrap: wrap;
    .list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 400px;

      .list-item {
        width: 172px;
        height: 52px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.07);
        border-radius: 4px;
        background-color: var(--item-scenarios-bg);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 13px;
        margin-right: 34px;
        margin-bottom: 21px;
        cursor: pointer;
        transition: all .3s ease-in-out;
        transform: scale(1, 1);

        &:hover {
          transform: scale(1.1, 1.1);
        }

        .item-icon {
          margin-right: 11px;
          // margin-bottom: -6px;
        }

        .item-title {
          font-weight: 400;
          font-size: 18px;
          line-height: 21px;
          color: var(--font-panel);
        }
      }
    }
  }

}
</style>
