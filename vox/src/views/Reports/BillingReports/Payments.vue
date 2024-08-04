<template>
  <div>
    <BillingMenu />
    <div class="wrap-table">
      <table>
        <thead>
          <tr class="header">
            <th @click="sort('dateCreated', 'dateCreatedRef')">Date & Time <img src="@/assets/img/icons/sort-arrow.svg" ref="dateCreatedRef" /></th>
            <th>Method </th>
            <th @click="sort('amount', 'amountRef')">Amount <img src="@/assets/img/icons/sort-arrow.svg" ref="amountRef" /></th>
            <th @click="sort('currency', 'currencyRef')">Сurrency <img src="@/assets/img/icons/sort-arrow.svg" ref="currencyRef" /></th>
            <th @click="sort('TAX', 'TAXRef')">VAT/Tax <img src="@/assets/img/icons/sort-arrow.svg" ref="TAXRef" /></th>
            <th  @click="sort('status', 'statusRef')">Status <img src="@/assets/img/icons/sort-arrow.svg" ref="statusRef" /></th>
            <th @click="sort('paidDate', 'paidDateRef')">Paid at <img src="@/assets/img/icons/sort-arrow.svg" ref="paidDateRef" /></th>
            <th @click="sort('billAmount', 'billAmountRef')">Total Paid <img src="@/assets/img/icons/sort-arrow.svg" ref="billAmountRef"/></th>
            <th @click="sort('invoiceCurrency', 'invoiceCurrencyRef')">Сurrency <img src="@/assets/img/icons/sort-arrow.svg" ref="invoiceCurrencyRef" /></th>
            <th class="invoice">Invoice</th>
            <th class="invoice-id question-id">
              ID
              <img class="question" src="@/assets/img/icons/question.svg" />
            </th>
            <th class="receipt">Receipt</th>
            <th class="question-id">
              ID
              <img class="question" src="@/assets/img/icons/question.svg" />
            </th>
          </tr>
        </thead>
        <tbody ref="tbody" v-if="dataPayments.length">
          <tr v-for="(item, index) in dataPayments" :key="index">
            <td>{{item.dateCreated}}</td>
            <td></td>
            <td>{{item.amount}}</td>
            <td>{{item.currency}}</td>
            <td>{{item.tax}}%</td>
            <td>
              <img class="status-icon" :src="getIconPayment(item.status)" :content="item.status" width="20" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" />
            </td>
            <td>{{item.paidDate}}</td>
            <td>{{item.billAmount}}</td>
            <td>{{item.invoiceCurrency}}</td>
            <td class="invoice"><img src="@/assets/img/icons/download.svg" /></td>
            <td class="invoice-id question-id">
              <img src="@/assets/img/icons/copy.svg" />
            </td>
            <td class="receipt">
              <img v-if="item.status === 'success'" src="@/assets/img/icons/download.svg" />
              <div v-if="item.status === 'pending'" class="upload" @click="trigger()" :class="{uploaded: file}">
                <span class="upload-text">{{file ? 'Confirmation Uploaded' : 'Upload confirmation'}}</span>
                <img class="upload-img" :src="file ? successStatusPayment : uploadImg"/>
                <input @change="uploadFile($event)" type="file" class="upload-input" ref="uploadInput">
              </div>
            </td>
            <td>
              <img v-if="item.status === 'success'" src="@/assets/img/icons/copy.svg" />
            </td>
          </tr>
        </tbody>
      </table>
      <Paginator v-if="getPaginatorPayments.paginator.recordsPerPage" :paginator="getPaginatorPayments.paginator" :methods="{page: 'setPaymentsPage', peerPage: 'setPaymentsPerPage'}" perPage="12" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
// import {BillingGettersApi} from '@/API/getters'
import {serverSort} from '@/lib/sort.js'
import BillingMenu from './components/BillingMenu'
import Paginator  from '@/components/Paginator'
import observables from '@/store/observable.mutations'
import redStatusPayment from '@/assets/img/icons/red-status-shadow.svg'
import successStatusPayment from '@/assets/img/icons/report-success-shadow.svg'
import pendingStatusPayment from '@/assets/img/icons/pending-payment-shadow.svg'
import uploadImg from '@/assets/img/icons/upload.svg'

export default {
  name: "Payments",
  components: {BillingMenu, Paginator},
  data() {
    return {
      dataPayments: [],
      sortParam: {
        dateCreated: 'desc',
        amount: 'desc',
        currency: 'desc',
        TAX: 'desc',
        paymentDescription: 'desc',
        paidDate: 'desc',
        billAmount: 'desc',
        invoiceCurrency: 'desc',
        invoiceNumber: 'desc',
      },
      redStatusPayment: redStatusPayment,
      successStatusPayment: successStatusPayment,
      pendingStatusPayment: pendingStatusPayment,
      uploadImg: uploadImg,
      file: null
    }
  },
  watch: {
    getGlobalPayments() {
      this.dataPayments = JSON.parse(JSON.stringify(this.getGlobalPayments))
    }
  },
  computed: {
    ...mapGetters(["getGlobalPayments", 'getPaginatorPayments']),
  },
  methods: {
    sort(param, refElement) {
      const dataSort = serverSort(this.fetch, this.$refs[refElement], this.sortParam[param], this.getPaginatorPayments.peerPage, this.getPaginatorPayments.page, param)
      this.sortParam[param] = dataSort.order
      this.$refs[refElement] = dataSort.refArrow
    },
    fetch(peerPage, page, param, order) {
      this.$store.dispatch('setGlobalPayments', {peerPage, page, param, order})
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
    trigger() {
      this.$refs.uploadInput[0].click()
    },
    uploadFile(event) {
      this.file = event.target.files[0]
    },
  },
  mounted() {
    this.$store.dispatch('setGlobalPayments', {peerPage: 12, page: 1})

    this.$store.subscribe((mutation) => {
      if (observables.paginator.payments.includes(mutation.type)) {
        this.$store.dispatch('setGlobalPayments', {peerPage: this.getPaginatorPayments.peerPage, page: this.getPaginatorPayments.page})
      }
    })
  }
}
</script>

<style scoped lang="scss">
.wrap-table {
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 6px;

    thead {
      .header {
        border: 2px solid var(--light-blue);
        background-color: var(--light-blue);

        th {
          font-size: 14px;
          font-weight: 400;
          height: 44px;
          text-align: left;
          padding-left: 18px;
          cursor: pointer;
          position: relative;

          &.invoice {
            &::before {
              content: '';
              position: absolute;
              width: 2px;
              height: 38px;
              top: 3px;
              left: 0;
              background: var(--paginator-bg);
              border-radius: 20px;
            }
          }

          &.invoice, &.receipt {
            width: 70px;
            padding-left: 22px;
          }

          &.invoice-id {
            padding-right: 18px;
            text-align: center;
            &::after {
              content: '';
              position: absolute;
              width: 2px;
              height: 38px;
              top: 3px;
              right: 0;
              background: var(--paginator-bg);
              border-radius: 20px;
            }
          }

          &.question-id {
            position: relative;
            padding-right: 28px;
            padding-left: 25px;
            text-align: center;
            width: 67px;
            .question {
              position: absolute;
              top: 12px;
              right: 20px;
            }
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
          height: 52px;
          text-align: left;
          padding-left: 18px;
          position: relative;
          color: var(--font-panel);
          border-top: 2px solid var(--statement-border);
          border-bottom: 2px solid var(--statement-border);
          position: relative;

          &:first-child {
            border-left: 2px solid var(--statement-border);
          }

          &:last-child {
            border-right: 2px solid var(--statement-border);
          }
          .status-icon {
            margin-top: 6px;
          }

          &.invoice {
            padding-left: 0;
            text-align: center;
            &::before {
              content: '';
              position: absolute;
              width: 2px;
              height: 38px;
              top: 3px;
              left: 0;
              background: var(--scenario-option-bg);
              border-radius: 20px;
            }
          }

          &.invoice-id {
            padding-left: 0;
            text-align: center;
            &::after {
              content: '';
              position: absolute;
              width: 2px;
              height: 38px;
              top: 3px;
              right: 0;
              background: var(--scenario-option-bg);
              border-radius: 20px;
            }
          }

          &.receipt {
            padding-left: 0;
            text-align: center;
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

          .upload {
            width: 101px;
            height: 34px;
            padding: 3px 6px 4px 7px;
            position: absolute;
            top: 7px;
            left: 23px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #276899;
            box-sizing: border-box;
            border-radius: 4px;
            cursor: pointer;

            .upload-text {
              font-weight: normal;
              font-size: 11px;
              line-height: 14px;
              color: var(--scenario-tab-color);
              text-align: left;
            }

            .upload-input {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
