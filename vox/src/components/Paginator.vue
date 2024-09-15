<template>
  <div class="paginator-main">
    <div class="paginator">
      <div class="select item-container">

        <div v-click-outside="hideListPerPage" @click="showPerPage = !showPerPage" content="Quantity per page"
             v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
             class="left-item peerpage-wrap">
          <label>
            <svg class="list" width="19" height="19" viewBox="0 -3 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.76953" y="0.5" width="14.2305" height="1.76923" rx="0.884615"/>
              <rect x="4.76953" y="6.26953" width="14.2305" height="1.76923" rx="0.884615"/>
              <rect x="4.76953" y="12.0391" width="14.2305" height="1.76923" rx="0.884615"/>
              <circle cx="1.5" cy="1.5" r="1.5"/>
              <circle cx="1.5" cy="7.19922" r="1.5"/>
              <circle cx="1.5" cy="13" r="1.5"/>
            </svg>
            <span class="per-page">{{ this['per-page'] }}</span>
            <span class="triangle" :class="{'rotate-arrow': showPerPage}">
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0.999999L7 6L13 1" stroke="var(--paginator-arrow-list)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <ul v-show="showPerPage" class="peerpage-select">
              <li @click="setPeerPage('12')">12</li>
              <li @click="setPeerPage('24')">24</li>
              <li @click="setPeerPage('36')">36</li>
              <li @click="setPeerPage('48')">48</li>
            </ul>
          </label>
        </div>
        <div class="pages">
          <div @click="goToStart()" content="First page"
               v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" class="arrow-wrap">
            <svg :class="{disabled: +first === 1}" class="arrow left" width="30"
                 height="18" viewBox="0 0 10 18" fill="transparent"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg :class="{disabled: +first === 1}" class="arrow left" width="30"
                 height="18" viewBox="0 0 10 18" fill="transparent"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div content="Previous page" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
               class="arrow-wrap">
            <svg @click.stop="leafThrough('back')" :class="{disabled: +first === 1}" class="arrow left" width="30"
                 height="18" viewBox="0 0 10 18" fill="transparent"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="first-page peerpage-wrap">
            <span>{{ paginator.currentPage - 1 || '' }}</span>
            <span v-show="paginator.currentPage - 1">,</span>
            <span class="active">{{ paginator.currentPage }}</span>
            <span v-show="lastPage - paginator.currentPage > 1">...</span>
            <span v-show="paginator.currentPage === lastPage - 1">,</span>
            <span v-show="lastPage !== paginator.currentPage"
                  :class="{active: lastPage === paginator.currentPage}">{{ lastPage }}</span>
          </div>
          <div content="Next page" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
               class="arrow-wrap">
            <svg @click.stop="leafThrough('forward')" :class="{disabled: +last === +paginator.count || !paginator.count}"
                 class="arrow right"
                 width="30" height="18" viewBox="0 0 10 18" fill="transparent"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div @click="goToEnd()" content="Last page"
               v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" class="arrow-wrap">
            <svg :class="{disabled: +last === +paginator.count}"
                 class="arrow right"
                 width="30" height="18" viewBox="0 0 10 18" fill="transparent"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg :class="{disabled: +last === +paginator.count}"
                 class="arrow right"
                 width="30" height="18" viewBox="0 0 10 18" fill="transparent"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="right-item peerpage-wrap search-dep">
          <svg class="search" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="circle" opacity="0.7" fill-rule="evenodd" clip-rule="evenodd"
                  d="M1.77843 7.11112C1.77843 4.16979 4.17044 1.77778 7.11177 1.77778C10.0531 1.77778 12.4451 4.16979 12.4451 7.11112C12.4451 10.0525 10.0531 12.4445 7.11177 12.4445C4.17044 12.4445 1.77843 10.0525 1.77843 7.11112ZM15.7396 14.4827L12.7218 11.464C13.6578 10.2605 14.2222 8.75202 14.2222 7.11112C14.2222 3.19023 11.032 0 7.11112 0C3.19023 0 0 3.19023 0 7.11112C0 11.032 3.19023 14.2222 7.11112 14.2222C8.75202 14.2222 10.2605 13.6578 11.464 12.7218L14.4827 15.7396C14.656 15.9129 14.8836 16 15.1111 16C15.3387 16 15.5662 15.9129 15.7396 15.7396C16.0871 15.392 16.0871 14.8302 15.7396 14.4827Z"
            />
            <path d="M5.28784 9.99414L10.995 4.28697L11.9165 5.20842L6.20929 10.9156L5.28784 9.99414Z" fill="#00C82C"
                  fill-opacity="0.6"/>
            <path d="M3 7.70703L3.82635 6.88068L6.11381 9.16814L5.28746 9.99449L3 7.70703Z" fill="#00C82C"
                  fill-opacity="0.6"/>
          </svg>

          <span class="count">{{ paginator.count }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


import ClickOutside from "vue-click-outside"

export default {
  name: "Paginator",
  props: ['paginator', 'methods', 'perPage'],
  data() {
    return {
      'per-page': this.perPage ?? 12,
      page: 1,
      showPerPage: false
    }
  },
  watch: {
    paginator() {
      this['per-page'] = JSON.parse(JSON.stringify(this.paginator.recordsPerPage))
    },
  },
  computed: {
    lastPage() {
      const lastPageNumber = new URLSearchParams(this.paginator.lastPageUrl).get('page')
      if(this.paginator.currentPage > +lastPageNumber) {
        const method = this.methods.page
        this.$store.commit(method, this.paginator.currentPage - 1)
      }
      return (+lastPageNumber) || ''
    },
    first: function () {
      return (this.paginator.currentPage * this.paginator.recordsPerPage - this.paginator.recordsPerPage) || 1
    },
    last: function () {
      let count = ((this.paginator.currentPage + 1) * this.paginator.recordsPerPage - this.paginator.recordsPerPage)
      if (count >= this.paginator.count) {
        return this.paginator.count || 1
      } else {
        return count || 1
      }
    }
  },
  methods: {
    leafThrough(direction) {
      if (direction === 'back') {
        this.page -= 1
      } else {
        this.page += 1
      }
      const method = this.methods.page
      this.$store.commit(method, this.page)
      return this.page
    },
    goToEnd() {
      const method = this.methods.page
      this.page = Math.ceil(this.paginator.count / this['per-page'])
      this.$store.commit(method, this.page)
    },
    goToStart() {
      const method = this.methods.page
      this.page = 1
      this.$store.commit(method, this.page)
    },
    setPeerPage(value) {
      const method = this.methods.peerPage
      this['per-page'] = value
      this.$store.commit(method, this['per-page'])
      return this['per-page']
    },
    hideListPerPage() {
      this.showPerPage = false
    }
  },
  mounted() {
    this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.paginator-main {
  display: flex;
  justify-content: flex-end;
}

.count {
  color: #fff;
  font-size: 16px;
}

.paginator {
  color: #646D75;
  padding: 13px 5px;
  background-color: var(--paginator-bg);
  border-radius: 8px;
  max-height: 48px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .left-item {
    margin-right: 8px;

    label {
      position: relative;

      svg {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      }

      ul {
        position: absolute;
        top: 23px;
        right: 9px;
        z-index: 999;

        li {
          background-color: var(--paginator-item);
          padding: 5px 0 5px 7px;
          width: 53px;

          &:hover {
            background-color: var(--light-blue);
            color: white;
          }
        }
      }
    }
  }

  .right-item {
    margin-left: 8px;
  }

  .active {
    color: var(--light-blue) !important;
  }

  .select {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 18px;
    font-weight: 300;
    box-shadow: none !important;
    border-radius: 2px;

    .first-page {
      margin-right: 4px;
    }

    .peerpage-wrap {
      background-color: var(--paginator-item);
      height: 22px;
      border-radius: 2px;
      padding: 2px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .per-page {
        margin-left: 8px;
        margin-right: 5px;
      }

      .triangle {
        svg {
          transform: rotate(-90deg);
          margin-bottom: 2px;
          transition: all .3s ease-in-out;
        }

        &.rotate-arrow {
          svg {
            transform: rotate(0deg);
            margin-bottom: 2px;
            transition: all .3s ease-in-out;
          }
        }
      }

      .peerpage-select {
        margin-top: 0;
        margin-left: 5px;
        width: 45px;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url(../assets/img/icons/arrow-down-white.svg);
        background-position: 93% 50%;
        background-repeat: no-repeat;
        background-size: 16px;
        padding-left: 3px;
        box-shadow: none;
        background-color: transparent;
        color: var(--paginator-color);
        font-size: 18px;
      }

      .search {
        margin-right: 3px;
      }

      span {
        margin: 0 1px;
        color: var(--paginator-color);
      }
    }

    .pages {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;

      .arrow-wrap:nth-child(5) {
        margin-right: 0;
      }

      .arrow-wrap {
        width: 22px;
        height: 22px;
        background-color: var(--paginator-item);
        margin-right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--paginator-shadow);
        border-radius: 2px;
        padding: 2px;

        svg.arrow {
          stroke: #276899;
          fill: transparent;
          text-align: right;

          &.right {
            transform: rotate(180deg);
          }

          &.disabled {
            stroke: var(--paginator-arrow-disabled) !important;
            pointer-events: none;
          }
        }
      }
    }
  }

  .item-container {
    box-shadow: none;
  }
}

.peerpage-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  height: 22px;
  box-shadow: var(--paginator-shadow);

  &.search-dep {
    svg {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
  }
}

.circle {
  fill: var(--light-blue);
}

.list rect,
.list circle {
  fill: var(--paginator-color);
}
</style>
