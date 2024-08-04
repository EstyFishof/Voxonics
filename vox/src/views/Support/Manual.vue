<template>
  <div class="wrap-container">
    <div class="contact-us">
      <span class="contact-us-text">Still Have Questions? </span>
      <span class="contact-us-btn">
        <a href="mailto:office@voxonics.com">Contact us</a>
      </span>
    </div>
    <span class="title" id="faq">FAQ</span>
    <ul class="main-list faq-list">
      <li class="main-list-item" v-for="(array, index) in dataFAQ" :key="index">
        <div class="main-list-title" @click="array.open = !array.open">
          <span class="main-list-title-text">
            <img src="../../assets/img/icons/arrow-down-white.svg" width="22" height="11" class="title-arrow"
                 :class="{rotateArrow: array.open}"/>
            <span v-html="array.title"></span>
          </span>
          <span class="hr"></span>
        </div>
        <ul class="secondary-list" v-show="array.open">
          <li class="secondary-list-item" v-for="(item, i) in array.value" :key="i" @click="item.open = !item.open">
            <span class="secondary-item-title">
              <span v-html="item.title"></span>
              <img v-if="theme === 'dark'" src="@/assets/img/icons/support-plus.svg" class="plus-img"
                   :class="{rotatePlus: item.open}"/>
              <img v-if="theme === 'light'" src="@/assets/img/icons/support-plus-white.svg" class="plus-img"
                   :class="{rotatePlus: item.open}"/>
            </span>
            <span class="secondary-item-value" v-show="item.open">
              <span v-html="item.value"></span>
            </span>
          </li>
        </ul>
      </li>
    </ul>
    <span class="title manual-title" id="manual">Manual</span>
    <ul class="main-list manual-list">
      <li class="main-list-item manual-item" v-for="(item, index) in dataManual" :key="index"
          :class="{'open-manual-item': item.open}">
        <div class="main-list-title" @click="item.open = !item.open">
          <span class="main-list-title-text">
            <img src="../../assets/img/icons/arrow-down-white.svg" width="22" height="11" class="title-arrow"
                 :class="{rotateArrow: item.open}"/>
            <span v-html="item.title"></span>
          </span>
          <span class="hr"></span>
        </div>
        <span v-show="item.open" class="manual-item">
          <span v-html="item.value"></span>
        </span>
      </li>
    </ul>
    <span class="title manual-title" id="contact-us">Contact us</span>
    <div class="contact-us-block">
      <span class="contact-us-title">
        Still Have Questions?
      </span>
      <div class="links-block">
        <div class="link-item">
          <span class="link-title">
            <img v-if="theme === 'dark'" class="support-img" src="@/assets/img/icons/billing-support.svg"/>
            <img v-if="theme === 'light'" class="support-img" src="@/assets/img/icons/billing-support-white.svg"/>
            Billing
          </span>
          <a class="link" href="mailto:billing@voxonics.com">billing@voxonics.com</a>
        </div>

        <div class="link-item">
          <span class="link-title">
            <img v-if="theme === 'dark'" class="support-img" src="@/assets/img/icons/support-vox.svg"/>
            <img v-if="theme === 'light'" class="support-img" src="@/assets/img/icons/support-vox-white.svg"/>
            Support
          </span>
          <a class="link" href="mailto:support@voxonics.com">support@voxonics.com</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import json from '@/assets/supportText/text.js'
import { mapGetters } from "vuex"
import store from '@/store'
import trash from '@/assets/img/icons/trash.svg'
import trashWhite from '@/assets/img/icons/trash-white.svg'

export default {
  name: 'Manual',
  data() {
    return {
      dataFAQ: [],
      dataManual: [],
      dark: trash,
      light: trashWhite,
      hashArray: ['#faq', '#manual', '#contact-us'],
      tags: [`src="`, `li>`, `ul>`, `<p`, `<span`, `<a href=`, `</a>`, `<li`, `<br/>`, `<b>`, `</b>`, `<i>`, `</i>`, `style=`, `</li`, `<div`, `</div>`]
    }
  },
  computed: {
    ...mapGetters(["getGlobalSearch", 'theme']),
  },
  watch: {
    $route(e) {
      const el = document.getElementById(this.$route.hash.slice(1))
      if(el) {
        window.scrollTo({
          top: el.offsetTop,
          behavior: "smooth"
        })
        setTimeout(() => {
          window.scrollTo({
            top: el.offsetTop,
            behavior: "smooth"
          })
        })
        this.dataManual.forEach(element => {
          if(element.title.indexOf(e.hash.slice(1, e.hash.length - 1)) !== -1) {
            element.open = true
          }
          // element.open = element.title.indexOf(e.hash.slice(1, e.hash.length - 1)) !== -1
        })
        this.dataFAQ.forEach(element => {
          if (element.title.indexOf(e.hash.slice(1, e.hash.length - 1)) !== -1) {
            element.open = true
          }
          //  else {
          //   element.open = false
          // }
        })
        if(!this.hashArray.includes(e.hash)) {
          window.location.hash = ''
        }
      }
      // this.deleteObservers()
      // this.scanarioSearch(this.getGlobalSearch.value)
    }
  },
  methods: {
    scanarioSearch(search) {
      let openedItems = []
      if (search?.length) {
        openedItems = this.scenarioItemSearch(openedItems, search, 'exactMatch')
        openedItems = this.scenarioItemSearch(openedItems, search, 'searchByKeywords')
        openedItems = this.scenarioItemSearch(openedItems, search, 'searchByWords')
      }
      this.renderText()
      return openedItems
    },
    renderText() {
      this.dataManual.forEach(element => {
          element.value = element.value.join('')
        })
        this.dataFAQ.forEach(element => {
          element.value.forEach(item => {
            item.value = item.value.join('')
          })
        })
    },
    scenarioItemSearch(openedItems, search, funcName) {
      openedItems.includes(true) ? null : openedItems = this.dataManual.map(element => {
        const open = this.openItem(funcName, element, search)
        if(open) {
          element.value = element.value.map(item => this.backlight(item, search))
        }
        return element.open = open
      }).concat(this.dataFAQ.map(item => {
        let openParrentElement = false
        let openedFAQ = item.value.map(element => {
          const open = this.openItem(funcName, element, search)
          if(open) {
            openParrentElement = true
            element.title = [element.title].map(el => this.backlight(el, search))[0]
            element.value = element.value.map(el => this.backlight(el, search))
          }
          return element.open = open
        })
        item.open = openParrentElement
        return openedFAQ.includes(true)
      }))
      return openedItems
    },
    openItem(funcName, element, search) {
      switch (funcName) {
        case 'exactMatch':
          return this.exactMatch([element.title], search) || this.exactMatch(element.value, search)
        case 'searchByKeywords':
          return this.searchByKeywords(element.keywords, search)
        case 'searchByWords':
          return this.searchByWords([element.title], search) || this.searchByKeywords(element.value, search)
        default:
          break
      }
    },
    exactMatch(itemArrayOfStrings, search) {
      const result = itemArrayOfStrings.filter((string) => new RegExp(search, 'gi').test(string) && this.checkTag(string))
      return !!result.length
    },
    searchByKeywords(arrayOfStrings, search) {
      const result = arrayOfStrings.filter((string) => search.split(' ').filter((searchWord) => new RegExp(searchWord, 'gi').test(string) && this.checkTag(string)).length)
      if(search.split(' ').length > 2) {
        return result.length > 1
      }
      return result.length > 0
    },
    searchByWords(itemArrayOfStrings, search) {
      const result = itemArrayOfStrings.filter((string) => search.split(' ').filter((searchWord) => new RegExp(searchWord, 'gi').test(string) && this.checkTag(string)).length)
      return !!result.length
    },
    backlight(element, search) {
      const substitution = (match) => {
        return `<span style="background: var(--backlight)">${match}</span>`
      }
      this.checkTag(element) ? search.split(' ').forEach(searchWord => element = element.replace(new RegExp(searchWord, 'gi'), substitution)) : null
      return element
    },
    checkTag(element){
      for(let i = 0; i < this.tags.length; i++) {
        if(element.indexOf(this.tags[i]) !== -1) {
          return false
        }
      }
      return true
    },
    deleteObservers() {
      this.dataFAQ = JSON.parse(JSON.stringify(json.FAQ))
      this.dataManual = JSON.parse(JSON.stringify(json.Manual))
    },
    wheelListener() {
      if (window.pageYOffset > document.getElementById('faq').offsetTop) {
        this.$store.dispatch('setActiveLinkSupport', 'faq')
      }
      if (window.pageYOffset + 200 > document.getElementById('manual').offsetTop) {
        this.$store.dispatch('setActiveLinkSupport', 'manual')
      }
      if (window.pageYOffset + 600 > document.getElementById('contact-us').offsetTop) {
        this.$store.dispatch('setActiveLinkSupport', 'contact-us')
      }
    }
  },
  mounted() {
    this.deleteObservers()
    this.dataFAQ[0].open = true
    this.dataFAQ[0].value[0].open = true

    // this.openItems()
    this.scanarioSearch(this.getGlobalSearch.value)

    this.$store.dispatch('setActiveLinkSupport', 'faq')

    window.addEventListener('wheel', this.wheelListener)

    if (this.getGlobalSearch.value && (this.getGlobalSearch.key === 'manual' || this.getGlobalSearch.key === 'all')) {
      this.deleteObservers()
      // this.openItems()
      this.scanarioSearch(this.getGlobalSearch.value)
    }

    store.subscribe((mutation) => {
      if (mutation.type === 'globalSearchMutation') {
        this.deleteObservers()
        // this.openItems()
        this.scanarioSearch(this.getGlobalSearch.value)
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.wheelListener)
    this.$store.dispatch('setGlobalSearch', {key: '', value: ''})
  }
}
</script>
<style lang="scss" scoped>

.wrap-container {
  background: var(--substrate);
  border: 2px solid var(--cdr-filter-bg);
  box-sizing: border-box;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 19px 27px;
  position: relative;
  behavior: smooth;
  // width: 1479.41px;

  .contact-us {
    position: absolute;
    top: 31px;
    right: 25px;
    display: flex;
    align-items: center;

    .contact-us-text {
      font-weight: bold;
      font-size: 28px;
      line-height: 33px;
      color: #454D54;
      margin-right: 8px;
    }

    .contact-us-btn {
      width: 159px;
      height: 36px;
      background: #276899;
      border-radius: 41px;

      a {
        width: 100%;
        height: 100%;
        font-weight: 500;
        font-size: 28px;
        line-height: 33px;
        color: #FFFFFF;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .title {
    display: block;
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    color: #276899;
    margin-bottom: 16px;
  }

  .manual-title {
    margin-top: 26px;
  }

  .main-list {

    &.faq-list {
      padding-right: 4px;
    }

    &.manual-list {
      .open-manual-item {
        .main-list-title {
          .hr {
            margin-left: 29px;
            margin-right: 13px;
          }
        }
      }
    }
    .main-list-item {
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
      width: 100%;

      .main-list-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        flex-wrap: nowrap;
        cursor: pointer;

        .hr {
          display: block;
          width: 100%;
          background: var(--support-line);
          border-radius: 15px;
          height: 1px;
          margin-left: 7px;
        }

        .main-list-title-text {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 28px;
          line-height: 33px;
          color: var(--header-user-color);
          white-space: nowrap;

          .title-arrow {
            margin-right: 7px;
          }

          .title-arrow {
            transform: rotate(-90deg);
            transition: .5s ease;
          }

          .rotateArrow {
            transform: rotate(0deg);
            transition: .5s ease;
          }
        }
      }

      .secondary-list {
        margin-top: 13px;

        .secondary-list-item {
          display: flex;
          flex-direction: column;
          background: var(--substrate);
          border: 2px solid var(--cdr-border-row);
          width: 100%;
          margin-bottom: 8px;
          font-weight: 300;
          font-size: 16px;
          line-height: 19px;
          color: var(--font-panel);

          .secondary-item-title {
            height: 32px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px 0 55px;
            background: var(--substrate);
            font-weight: 400;
            box-sizing: border-box;
            box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);
            cursor: pointer;

            .plus-img {
              transform: rotate(0deg);
              transition: .5s ease;
            }

            .rotatePlus {
              transform: rotate(45deg);
              transition: .5s ease;
            }
          }

          .secondary-item-value {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 7px 12px 7px 55px;
            font-weight: 300;
          }
        }
      }
    }

    .manual-item {
      margin-left: -7px;
      padding-left: 7px;
    }

    .open-manual-item {
      background: var(--substrate);
      box-shadow: 6px -1px 23px rgba(0, 0, 0, 0.48);

      .manual-item {
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: var(--font-panel);
        padding: 14px 32px;
      }
    }
  }

  .contact-us-block {
    margin-top: 34px;
    padding-left: 29px;
    padding-bottom: 350px;

    .contact-us-title {
      font-weight: bold;
      font-size: 28px;
      line-height: 33px;
      color: var(--contact-us-font);
      margin-bottom: 13px;
      display: inline-block;
    }

    .links-block {
      display: flex;
      align-items: center;

      .link-item {
        background: var(--substrate);
        box-shadow: 6px -1px 23px rgba(0, 0, 0, 0.48);
        padding: 15px 0 20px 16px;
        width: 398px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-right: 34px;

        .link-title {
          font-weight: bold;
          font-size: 28px;
          line-height: 33px;
          color: var(--contact-us-font);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 26px;

          .support-img {
            margin-right: 13px;
          }
        }

        .link {
          background: var(--substrate);
          box-shadow: inset 6px -1px 23px rgba(0, 0, 0, 0.18);
          border-radius: 25px;
          font-weight: bold;
          font-size: 28px;
          line-height: 33px;
          color: #276899;
          padding: 6px 13px;
          text-decoration: none;
        }
      }
    }
  }
}

// @media (max-width: 1920px) {
//   .wrap-container {
//     width: 1479.41px;
//   }
// }

// @media (max-width: 1780px) {
//   .wrap-container {
//     width: 1330px;
//   }
// }

// @media (max-width: 1600px) {
//   .wrap-container {
//     width: 1230px;
//   }
// }

// @media (max-width: 1504px) {
//   .wrap-container {
//     width: 1136px;
//   }
// }

// @media (max-width: 1408px) {
//   .wrap-container {
//     width: 1006px;
//   }
// }
</style>
