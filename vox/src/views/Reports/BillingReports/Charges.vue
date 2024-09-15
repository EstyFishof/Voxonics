<template>
  <div>
    <div class="top-block">
      <BillingMenu />
    </div>
    <div class="wrap-table">
      <table>
        <thead>
          <tr class="header">
            <th @click="sort('date', 'dataArray', 'dateRef')">Date & Time <img src="@/assets/img/icons/sort-arrow.svg" ref="dateRef" /></th>
            <th @click="sort('connectedService.service.purpose', 'dataArray', 'purposeRef')">Purpose <img src="@/assets/img/icons/sort-arrow.svg" ref="purposeRef" /></th>
            <th @click="sort('v-number', 'dataArray', 'v-numberRef')" class="v-number">V-number <img src="@/assets/img/icons/sort-arrow.svg" ref="v-numberRef" /></th>
            <th @click="sort('connectedService.description', 'dataArray', 'descriptionRef')" class="description">Description <img src="@/assets/img/icons/sort-arrow.svg" ref="descriptionRef" /></th>
            <th @click="sort('completed', 'dataArray', 'completedRef')">Charged <img src="@/assets/img/icons/sort-arrow.svg" ref="completedRef" /></th>
            <th @click="sort('chargeAmount', 'dataArray', 'chargeAmountRef')">Amount <img src="@/assets/img/icons/sort-arrow.svg" ref="chargeAmountRef" /></th>
            <th @click="sort('currency', 'dataArray', 'currencyRef')">Сurrency<img src="@/assets/img/icons/sort-arrow.svg" ref="currencyRef" /></th>
            <th>ID</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody ref="tbody" v-if="dataArray.length">
          <tr v-for="(item, index) of dataArray" :key="index">
            <td>{{item.date}}</td>
            <td>
              <span v-if="item.connectedService && item.connectedService.service">{{item.connectedService.service.purpose}}</span>
            </td>
            <td class="v-number">{{ item.connectedService.number ?? '' }}</td>
            <td>
              <input v-if="item.connectedService" class="description-input" v-model="item.connectedService.description" :readonly="roleAgent !== 'root'" :style="{outline: roleAgent !== 'root' ? 'none' : null}"/>
            </td>
            <td>
              <span class="charged" :style="{background: item.completed ? '#276899' : 'var(--stroke-arrow)'}">{{item.completed ? 'YES' : 'NO'}}</span>
            </td>
            <td>{{item.chargeAmount}}</td>
            <td>{{item.currency}}</td>
            <td><img src="@/assets/img/icons/copy.svg" /></td>
            <td><img src="@/assets/img/icons/info-charges.svg"/></td>
          </tr>
        </tbody>
      </table>
      <Paginator v-if="getPaginatorCharges.paginator.recordsPerPage" :paginator="getPaginatorCharges.paginator" :methods="{page: 'setChargesPage', peerPage: 'setChargesPerPage'}" perPage="12" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
// import {BillingGettersApi} from '@/API/getters'
import {clientSort, serverSort} from '@/lib/sort.js'
import BillingMenu from './components/BillingMenu'
import Paginator  from '@/components/Paginator'
import observables from '@/store/observable.mutations'

export default {
  name: "Charges",
  components: {BillingMenu, Paginator},
  data() {
    return {
      dataArray: [],
      sortParams: {
        date: 'desc',
        purpose: 'asc',
        'v-number': 'asc',
        description: 'asc',
        completed: 'asc',
        chargeType: 'asc',
        chargeAmount: 'asc',
        currency: 'asc'
      }
    }
  },
  watch: {
    getGlobalCharges() {
      this.dataArray = JSON.parse(JSON.stringify(this.getGlobalCharges))
    }
  },
  computed: {
    ...mapGetters(["getGlobalCharges", 'getPaginatorCharges', 'roleAgent']),
  },
  methods: {
    fetch(peerPage, page, sortParam, orderParam) {
      console.log(orderParam)
      this.$store.dispatch('setGlobalChanges', {peerPage, page, sort: sortParam, orderParam})
    },
    sort(param, arrayParam, refElement) {
      if(param === 'completed' || param === 'chargeAmount' || param === 'date' || param === 'currency') {
        const dataSort = serverSort(this.fetch, this.$refs[refElement], this.sortParams[param], this.getPaginatorCharges.peerPage, this.getPaginatorCharges.page, param)
        this.sortParams[param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
      } else {
        const dataSort = clientSort(param, this[arrayParam], this.$refs[refElement], this.sortParams[param])
        this[arrayParam] = dataSort.array
        this.sortParams[param] = dataSort.order
        this.$refs[refElement] = dataSort.refArrow
      }
    }
  },
  mounted() {
    this.$store.dispatch('setGlobalChanges', {peerPage: 12, page: 1, sort: 'date', orderParam: 'desc'})

    this.$store.subscribe((mutation) => {
      if (observables.paginator.charges.includes(mutation.type)) {
        this.$store.dispatch('setGlobalChanges', {peerPage: this.getPaginatorCharges.peerPage, page: this.getPaginatorCharges.page, sort: 'date', orderParam: 'desc'})
      }
    })
  }
}
</script>

<style scoped lang="scss">
.top-block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 26px;
    background: var(--cdr-border-row);
    border-radius: 8px;
  }
}
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

          &.v-number {
            width: 13%;
            text-align: center;
            padding-left: 0;
          }
          &.description{
            width: 27%;
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

          &:first-child {
            border-left: 2px solid var(--statement-border);
          }

          &:last-child {
            border-right: 2px solid var(--statement-border);
          }
          .flag {
            margin: 0 2px;
          }
          &.v-number{
            text-align: center;
          }
          .description-input{
            background: var(--input-bg);
            border-radius: 4px;
            width: 331px;
            height: 24px;
            padding: 2px 13px;
            font-weight: 300;
            font-size: 16px;
            line-height: 19px;
            border: none;
            color: var(--font-panel);
          }
          .charged {
            width: 46px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            color: white;
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
        }
      }
    }
  }
}
</style>
