<template>
  <div class="statement-container">
    <BillingMenu/>
    <div class="statement-block">
      <div class="left-sector">

        <div class="balance-block">
          <div class="company-name" v-if="getStatement.company">
            {{ getStatement.company.name }}
          </div>
          <span class="deposit-title">Your deposit balance</span>
          <span v-if="getStatement.company"
                class="deposit-cost">{{
              getStatement.company.billing ? getStatement.company.billing.balance.toFixed(2) : ''
            }}    USD</span>
          <span class="refill">Last refill  {{ lastRefill }} USD</span>
          <span class="deposit-btn" @click="showCreateInvoice = !showCreateInvoice">Account Top-Up</span>
        </div>

        <div v-show="showCreateInvoice" class="create-invoice" @click="hideListOptions(); indexRef=''"
             v-click-outside="hide" ref="hideList">
          <span class="title">Create Invoice</span>
          <span class="choose-method">Choose payment method</span>
          <div class="options-block">
            <label class="options-label" :ref="'showTimeout'" @click="indexRef = 'showTimeout'">
              <input class="input-field num" type="text" :value="paymentMethod || ''" readonly>
              <span @click="setParam('methods', 'showList')" class="triangle"
                    :class="{'rotate-arrow': showList === 'methods'}">
                <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6.5 6L12 1" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <ul v-show="showList === 'methods'" class="list-related-numbers">
                <li @click="setParam('cash', 'paymentMethod')">Cash</li>
                <li @click="setParam('bankTransfer', 'paymentMethod')">Bank transfer</li>
                <li @click="setParam('coinsPaid', 'paymentMethod')">Coins paid</li>
              </ul>
            </label>
          </div>
          <div class="create-invoice-footer">
            <label class="options-label amount">
              <span class="label-span">Amount</span>
              <input class="input-field" minlength="1" @input="setAmount($event.target.value)" :value="amount"
                     ref="amount" :readonly="paymentMethod == ''"/>
            </label>
            <div class="currency-block">
              <label class="options-label" :ref="'showTimeout'" @click="indexRef = 'showTimeout'">
                <span class="label-span">Currency</span>
                <input class="input-field num" type="text" :value="currency || ''" readonly>
                <span @click="setParam('currency', 'showList')" class="triangle"
                      :class="{'rotate-arrow': showList === 'currency' && paymentMethod != ''}">
                  <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6.5 6L12 1" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <ul v-show="showList === 'currency' && paymentMethod != ''" class="list-related-numbers">
                  <li v-if="paymentMethod !== 'coinsPaid'" @click="setParam('USD ', 'currency')">USD</li>
                  <li v-if="paymentMethod !== 'coinsPaid'" @click="setParam('EUR', 'currency')">EUR</li>
                  <li v-if="paymentMethod == 'coinsPaid'" @click="setParam('BTC ', 'currency')">BTC</li>
                  <li v-if="paymentMethod == 'coinsPaid'" @click="setParam('ETH ', 'currency')">ETH</li>
                  <li v-if="paymentMethod == 'coinsPaid'" @click="setParam('LTC ', 'currency')">LTC</li>
                </ul>
              </label>
            </div>
            <span class="btn-submit"
                  :style="{background: amount !== '' && paymentMethod !== '' && currency !== '' ? '#276899' : 'var(--input-ip)'}">
              Submit
            </span>
          </div>
        </div>

        <div class="last-month">
          <span class="last-month-title">Last month spent</span>
          <span class="last-month-value">$ {{ getStatement.lastMonthSpend }}</span>
        </div>

      </div>
      <div class="right-sector">
        <ul class="common-data">
          <li class="common-data-item">
            <span class="common-data-title">Next 10 day’s charges</span>
            <div class="common-data-price">
              ${{ getStatement.nextDaysCharges }}
              <img src="@/assets/img/icons/next-charges.svg" alt="changes"/>
            </div>
          </li>
          <li class="common-data-item">
            <span class="common-data-title">Avarage usage per day</span>
            <div class="common-data-price">
              ${{ getStatement.avarageUsagePerDay }}
              <img v-if="theme === 'dark'" src="@/assets/img/icons/avarage-usage.svg" alt="changes"/>
              <img v-if="theme === 'light'" src="@/assets/img/icons/avarage-usage-white.svg" alt="changes"/>
            </div>
          </li>
          <li class="common-data-item">
            <span class="common-data-title">Agents</span>
            <div class="common-data-price common-data-counter">
              {{ getStatement.users }}
              <img src="@/assets/img/icons/agents-statement.svg" alt="changes"/>
            </div>
          </li>
          <li class="common-data-item">
            <span class="common-data-title">V-Numbers</span>
            <div class="common-data-price common-data-counter">
              {{ getStatement.externalNumbers }}
              <img src="@/assets/img/icons/v-numbers-statement.svg" alt="changes"/>
            </div>
          </li>
        </ul>

        <div class="tables-block">
          <div class="tables-block-top">
            <div class="table-name">
              <img v-if="theme === 'dark'" src="@/assets/img/icons/payments-white.svg"/>
              <img v-if="theme === 'light'" src="@/assets/img/icons/payments-gray.svg"/>
              Last payments
            </div>
            <router-link to="/reports/billing/payments" class="tables-block-top-btn">
              View all
              <img v-if="theme === 'dark'" src="@/assets/img/icons/statement-view-all.svg"/>
              <img v-if="theme === 'light'" src="@/assets/img/icons/statement-view-all-white.svg"/>
            </router-link>
          </div>
          <div class="wrap-table payments-table">
            <table>
              <thead>
                <tr class="header">
                  <th v-for="(item, index) of headPayments" :key="index"
                      @click="sort(item.param, 'getLastPayments', item.refElement)"
                      :class="{'first-th': index === 0, 'second-th': index === 1, 'method': item.text === 'Method', 'paid-at': item.text === 'Paid at'}">
                    {{ item.text }}
                    <svg :ref="item.refElement" width="8" height="5" viewBox="0 0 8 5" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 1L4 4L1 1" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </th>
                  <th>Invoice</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody ref="tbody" v-if="getLastPayments.length">
              <tr v-for="(item, index) in getLastPayments" :key="index">
                <td class="first-item">
                  <img src="@/assets/img/icons/question-mark.svg" width="22" height="22" v-if="getClientWidth <= 1724" :content="item.invoiceNumber"
                    v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" />
                  <span v-else >{{ item.invoiceNumber }}</span>
                </td>
                <td class="second-item">
                  <span v-if="item.dateCreated">
                    <span v-if="getClientWidth <= 1724">{{item.dateCreated.split(' ')[0]}}</span>
                    <span v-else>{{item.dateCreated}}</span>
                  </span>
                </td>
                <td class="method"></td>
                <td class="status"><img width="20" :src="getIconPayment(item.status)" :content="item.status"
                                        v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"/></td>
                <td>{{ item.billAmount }}</td>
                <td>{{ item.invoiceCurrency }}</td>
                <td class="paid-at">{{ item.paidDate }}</td>
                <td><img src="@/assets/img/icons/download.svg"/></td>
                <td><img v-if="item.status === 'success'" src="@/assets/img/icons/download.svg"/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="tables-block">
          <div class="tables-block-top">
            <div class="table-name">
              <img v-if="theme === 'dark'" src="@/assets/img/icons/charges-white.svg"/>
              <img v-if="theme === 'light'" src="@/assets/img/icons/charges-gray.svg"/>
              Future charges
            </div>
            <router-link to="/reports/billing/charges" class="tables-block-top-btn">
              View all
              <img v-if="theme === 'dark'" src="@/assets/img/icons/statement-view-all.svg"/>
              <img v-if="theme === 'light'" src="@/assets/img/icons/statement-view-all-white.svg"/>
            </router-link>
          </div>
          <div class="wrap-table charges-table">
            <table>
              <thead>
              <tr class="header">
                <th v-for="(item, index) of headCharges" :key="index"
                    @click="sort(item.param, 'lastChargesArray', item.refElement)"
                    :class="{'first-th': index === 0, 'second-th': index === 1, 'country-item': item.text === 'Country', 'description-item': item.text === 'Description'}">
                  {{ item.text }}
                  <svg :ref="item.refElement" width="8" height="5" viewBox="0 0 8 5" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L4 4L1 1" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </th>
                <th>ID</th>
              </tr>
              </thead>
              <tbody ref="tbody" v-if="lastChargesArray.length">
              <tr v-for="(item, index) in lastChargesArray" :key="index">
                <td class="first-item first-item-charges">
                  <span v-if="item.date">
                    <span v-if="getClientWidth <= 1724">{{item.date.split(' ')[0]}}</span>
                    <span v-else>{{item.date}}</span>
                  </span>
                </td>
                <td class="second-item">
                  <span v-if="item.connectedService && item.connectedService.service">{{ item.connectedService.service.purpose }}</span>
                </td>
                <td class="country">
                  <span v-if="item.connectedService">{{ item.connectedService.country || '' }}</span>
                </td>
                <td class="description"></td>
                <td class="status">
                  <span v-if="item.connectedService">{{ item.connectedService.description }}</span>
                </td>
                <td>{{ item.chargeAmount }}</td>
                <td><img src="@/assets/img/icons/copy.svg"/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BillingMenu from './components/BillingMenu'
import {BillingGettersApi} from '@/API/getters'
import { clientSort, serverSort } from '@/lib/sort.js'
import redStatusPayment from '@/assets/img/icons/red-status-shadow.svg'
import successStatusPayment from '@/assets/img/icons/report-success-shadow.svg'
import pendingStatusPayment from '@/assets/img/icons/pending-payment-shadow.svg'
import { mapGetters } from 'vuex'
import ClickOutside from 'vue-click-outside'
import { clickCheck } from '@/lib/clickCheck.js'

export default {
  name: 'Statement',
  components: {BillingMenu},
  data() {
    return {
      lastChargesArray: [],
      redStatusPayment: redStatusPayment,
      successStatusPayment: successStatusPayment,
      pendingStatusPayment: pendingStatusPayment,
      headPayments: [
        {
          text: 'Invoice #',
          param: 'invoiceNumber',
          refElement: 'invoiceNumberRef'
        },
        {
          text: 'Issued',
          param: 'dateCreated',
          refElement: 'dateCreatedRef'
        },
        {
          text: 'Method',
          param: 'method',
          refElement: 'methodRef'
        },
        {
          text: 'Status',
          param: 'status',
          refElement: 'statusRef'
        },
        {
          text: 'Total Paid',
          param: 'billAmount',
          refElement: 'billAmountRef'
        },
        {
          text: 'Currency',
          param: 'invoiceCurrency',
          refElement: 'invoiceCurrencyRef'
        },
        {
          text: 'Paid at',
          param: 'paidDate',
          refElement: 'paidDateRef'
        },

      ],
      headCharges: [
        {
          text: 'Issued',
          param: 'date',
          refElement: 'dateRef'
        },
        {
          text: 'Purpose',
          param: 'connectedService.service.purpose',
          refElement: 'purposeRef'
        },
        {
          text: 'Country',
          param: 'connectedService.country',
          refElement: 'countryRef'
        },
        {
          text: 'V-number',
          param: 'v-number',
          refElement: 'v-numberRef'
        },
        {
          text: 'Description',
          param: 'connectedService.description',
          refElement: 'descriptionRef'
        },
        {
          text: 'Charge',
          param: 'chargeAmount',
          refElement: 'chargeAmountRef'
        },
      ],
      sortParams: {
        getLastPayments: {
          invoiceNumber: 'desc',
          dateCreated: 'desc',
          method: 'desc',
          status: 'desc',
          billAmount: 'desc',
          invoiceCurrency: 'desc',
          paidDate: 'desc',
        },
        lastChargesArray: {
          date: 'desc',
          'connectedService.service.purpose': 'desc',
          'connectedService.country': 'desc',
          'v-number': 'desc',
          'connectedService.description': 'desc',
          'chargeAmount': 'desc',
        }
      },
      paymentMethod: '',
      currency: '',
      amount: '',
      showList: '',
      showCreateInvoice: false,
      indexRef: '',
      getClientWidth: document.documentElement.clientWidth
    }
  },
  computed: {
    ...mapGetters(['getStatement', 'getLastPayments', 'getLastCharges', 'theme']),
    lastRefill() {
      for (let i = 0; i < this.getLastPayments.length; i++) {
        if (this.getLastPayments[i].status === 'success') {
          return this.getLastPayments[i].billAmount
        }
      }
      return ''
    }
  },
  methods: {
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.showList = ''
    },
    sort(param, arrayParam, refElement) {
      if (param !== 'connectedService.service.purpose' || param !== 'connectedService.country' || param !== 'connectedService.description') {
        const dataSort = serverSort(this.fetch, this.$refs[refElement][0], this.sortParams[arrayParam][param], param, arrayParam)
        this.sortParams[arrayParam][param] = dataSort.order
        this.$refs[refElement][0] = dataSort.refArrow
      } else {
        const dataSort = clientSort(param, this[arrayParam], this.$refs[refElement][0], this.sortParams[arrayParam][param])
        this[arrayParam] = dataSort.array
        this.sortParams[arrayParam][param] = dataSort.order
        this.$refs[refElement][0] = dataSort.refArrow
      }
    },
    fetch(sortParam, arrayParam, orderParam) {
      if (arrayParam === 'lastChargesArray') {
        BillingGettersApi.getLastCharges(sortParam, orderParam)
          .then(() => this.lastChargesArray = this.getLastCharges)
      } else {
        BillingGettersApi.getLastPayments(sortParam, orderParam)
      }
    },
    setAmount(value) {
      const pattern = /^\d{0,7}(\.\d{0,2})?$/
      if (!value.match(pattern)) {
        this.amount = value.slice(0, -1)
      } else {
        this.amount = value
      }
      this.$refs.amount.value = this.amount
      return this.amount
    },
    setParam(value, param) {
      if (this[param] === value) {
        this[param] = ''
      } else {
        this[param] = value
      }
      if (param !== 'showList') {
        this.showList = ''
      }
      if (param === 'paymentMethod') {
        this.currency = ''
        this.amount = ''
      }
    },
    getIconPayment(status) {
      switch (status) {
        case 'success':
          return this.successStatusPayment
        case 'pending':
          return this.pendingStatusPayment
        default:
          return this.redStatusPayment
      }
    },
    setClientWidth() {
      this.getClientWidth = document.documentElement.clientWidth
    }
  },
  mounted() {
    window.addEventListener('resize', this.setClientWidth)
    this.popupItem = this.$refs.hideList
    BillingGettersApi.getStatement()
    BillingGettersApi.getLastPayments()
    BillingGettersApi.getLastCharges()
      .then(() => this.lastChargesArray = this.getLastCharges)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setClientWidth)
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.statement-block {
  display: flex;
  gap: 13px;
  padding-right: 26px;

  .left-sector {
    .balance-block {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      background: var(--substrate);
      color: var(--font-panel);
      border-radius: 15px;
      width: 338px;
      padding: 15px 55px 28px 25px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 8px;

      .company-name {
        font-weight: 500;
        font-size: 36px;
        line-height: 42px;
        margin-left: 9px;
        margin-bottom: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 258px;
      }

      .deposit-title, .refill {
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        margin-bottom: 17px;
      }

      .deposit-cost {
        width: 100%;
        font-weight: 500;
        font-size: 36px;
        line-height: 42px;
        color: var(--font-panel);
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .refill {
        margin-bottom: 21px;
      }

      .deposit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #276899;
        box-shadow: 0px 0px 16px rgba(39, 104, 153, 0.3);
        -moz-box-shadow: 0px 0px 16px rgba(39, 104, 153, 0.3);
        -webkit-box-shadow: 0px 0px 16px rgba(39, 104, 153, 0.3);
        border-radius: 4px;
        margin-left: auto;
        margin-right: auto;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: white;
        padding: 4px 6px 5px 10px;
        cursor: pointer;
      }
    }

    .create-invoice {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      background: var(--substrate);
      border-radius: 15px;
      padding: 21px 14px 21px 28px;
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
      color: var(--font-panel);

      .title {
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
      }

      .choose-method {
        margin-top: 21px;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
      }

      .options-block {
        position: relative;
        margin-top: 13px;

        .options-label {
          .input-field {
            width: 140px;
            height: 25px;
            background: #276899;
            border-radius: 4px;
            padding-left: 9px;
            text-transform: capitalize;
            color: white;
          }
        }

        .triangle {
          padding-top: 2px;
          width: 130px;
        }

        .list-related-numbers {
          width: 140px;
        }
      }

      .create-invoice-footer {
        margin-top: 21px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .amount {
          .label-span {
            font-weight: normal;
            font-size: 16px;
            line-height: 19px;
            color: var(--font-panel);
          }

          .input-field {
            width: 140px;
            margin-top: 13px;
            color: white;
          }
        }

        .currency-block {
          position: relative;

          .options-label {
            .label-span {
              font-weight: normal;
              font-size: 16px;
              line-height: 19px;
              color: var(--font-panel);
            }

            .input-field {
              width: 63px;
              margin-top: 13px;
              color: white;
            }

            .triangle {
              width: 58px;
            }

            .list-related-numbers {
              width: 63px;
            }
          }
        }

        .btn-submit {
          border-radius: 4px;
          width: 76px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: normal;
          font-size: 18px;
          line-height: 21px;
          color: white;
        }
      }
    }

    .last-month {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      background: var(--substrate);
      border-radius: 15px;
      width: 338px;
      padding: 9px 83px 21px 28px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .last-month-title {
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        color: var(--font-panel);
        margin-bottom: 20px;
      }

      .last-month-value {
        margin-left: 51px;
        font-weight: bold;
        font-size: 36px;
        line-height: 26px;
        letter-spacing: 0.2px;
        color: var(--font-panel);
        white-space: nowrap;
      }
    }
  }

  .right-sector {
    .common-data {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .common-data-item {
        width: 269px;
        height: 122px;
        background: var(--substrate);
        border-radius: 15px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: var(--font-panel);
        padding: 15px 11px 15px 33px;

        .common-data-title {
          font-weight: normal;
          font-size: 18px;
          line-height: 21px;
          margin-bottom: 9px;
        }

        .common-data-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // font-size: 24px;
          font-size: 36px;
          line-height: 42px;
          letter-spacing: 0.2px;
          color: var(--font-panel);
          white-space: nowrap;
          height: 73px;
          // margin-top: 10px;
        }

        .common-data-counter {
          font-weight: normal;
          font-size: 36px;
          line-height: 42px;
        }
      }
    }

    .tables-block {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      background: var(--substrate);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 15px;
      padding: 20px 12px 6px 12px;
      color: var(--font-panel);

      .tables-block-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .table-name {
          display: flex;
          align-items: center;
          white-space: nowrap;

          img {
            margin-right: 6px;
          }
        }

        .tables-block-top-btn {
          display: flex;
          align-items: center;
          font-weight: normal;
          font-size: 18px;
          line-height: 21px;
          color: var(--font-panel);
          text-decoration: none;

          img {
            margin-left: 15px;
          }
        }
      }

      .wrap-table {
        margin-top: 2px;
        width: 100%;

        table {
          border-collapse: separate;
          width: 100%;
          border-spacing: 0 6px;

          thead {
            .header {

              th {
                font-size: 14px;
                font-weight: 400;
                height: 25px;
                color: var(--font-panel);
                text-align: center;
                padding-left: 18px;

                svg {
                  path {
                    stroke: var(--font-panel);
                  }
                }

                &.first-th {
                  text-align: left;
                  padding-left: 28px;
                }

                &.second-th {
                  text-align: left;
                  padding-left: 36px;
                }
              }
            }
          }

          tbody {
            tr {
              border: 2px solid var(--statement-border);
              box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
              -moz-box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
              -webkit-box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);

              td {
                font-size: 16px;
                font-weight: 300;
                height: 49px;
                color: var(--font-panel);
                text-align: center;
                padding-left: 18px;
                position: relative;
                border-top: 2px solid var(--statement-border);
                border-bottom: 2px solid var(--statement-border);

                &:first-child {
                  border-left: 2px solid var(--statement-border);
                }

                &:last-child {
                  border-right: 2px solid var(--statement-border);
                }

                &.status {
                  img {
                    margin-top: 6px;
                  }
                }

                .flag {
                  margin: 0 2px;
                }

                .cursor {
                  cursor: pointer;

                  &:hover {
                    transform: scale(1.1);
                  }

                  &:active {
                    transform: scale(1);
                  }
                }

                &.first-item {
                  padding-left: 28px;
                  text-align: left;
                }

                &.second-item {
                  text-align: left;
                  padding-left: 34px;
                }
              }
            }
          }
        }
      }
    }
  }
}

a {
  white-space: nowrap;
}


@media (min-width: 2561px) {
  .statement-block {
    .right-sector {
      .tables-block {
        width: 1645px;
      }
    }
  }
}

@media (max-width: 2560px) and (min-width: 2301px) {
  .statement-block {
    .right-sector {
      .tables-block {
        width: 1545px;
      }
    }
  }
}

@media (min-width: 2101px) and (max-width: 2300px) {
  .statement-block {
    .right-sector {
      .tables-block {
        width: 1370px;
      }
    }
  }
}

@media (min-width: 2101px) {
  .statement-block {
    .right-sector {
      .common-data {
        .common-data-item {
          width: 320px;
        }
      }
    }
  }
}

@media (min-width: 1921px) and (max-width: 2100px) {
  .statement-block {
    .right-sector {
      .tables-block {
        width: 1205px;
      }
    }
  }
}

@media (min-width: 1921px) {
  .statement-block {
    .right-sector {
      .common-data {
        justify-content: space-between;
      }
    }
  }
}

@media (max-width: 1780px) and (min-width: 1601px) {
  .statement-block {
    .right-sector {
      .common-data {
        width: 900px;
      }
    }
  }
}

@media (max-width: 1600px) and (min-width: 1505px) {
  .statement-block {
    .right-sector {
      .tables-block {
        width: 880px;

        .wrap-table {
          table {
            thead {
              .header {
                th {
                  padding-left: 10px;
                }
              }
            }
            tbody {
              tr {
                td {
                  padding-left: 10px;
                }
              }
            }
          }
        }
      }
      .common-data {
        width: 600px;
      }
    }
  }
}

@media (max-width: 1504px) and (min-width: 1408px) {
  .statement-block {
    .right-sector {
      .tables-block {
        width: 626px;
        .wrap-table {
          table {
            thead {
              .header {
                th {
                  padding-left: 0px;
                  &.paid-at, &.description-item {
                    display: none;
                  }
                  &.second-th {
                    padding-left: 0px;
                  }
                  &.first-item {
                    text-align: left;
                    padding-left: 9px;
                  }
                }
              }
            }
            tbody {
              tr {
                td {
                  padding-left: 0;
                  &.paid-at, &.description{
                    display: none;
                  }
                  &.first-item {
                    text-align: center;
                    padding-left: 9px;
                  }
                  &.first-item-charges {
                    text-align: left;
                    padding-left: 26px;
                  }
                  &.second-item {
                    padding-left: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1408px) {
  .drag-row {
    .list {
      .drop-list {
        gap: 14px;
      }
    }
  }
}
@media (max-width: 1408px) {
  .statement-block {
    .right-sector {
      .tables-block {
        width: 551px;
        .wrap-table {
          table {
            thead {
              .header {
                th {
                  padding-left: 0px;
                  &.paid-at, &.description-item, &.country-item, &.method {
                    display: none;
                  }
                  &.second-th {
                    padding-left: 0px;
                  }
                  &.first-item {
                    text-align: left;
                    padding-left: 9px;
                  }
                }
              }
            }
            tbody {
              tr {
                td {
                  padding-left: 0;
                  &.method, &.paid-at, &.description, &.country {
                    display: none;
                  }
                  &.first-item {
                    text-align: center;
                    padding-left: 9px;
                  }
                  &.second-item {
                    padding-left: 0;
                  }
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
