<template>
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item">

          <router-link to="/reports/billing" exact>
            <img class="statement not-active" :src="statementGray" alt="" >
            <img class="statement active" :src="statementWhite" alt="" >
            Statement</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/reports/billing/payments">
            <img class="statement not-active" :src="paymentsGray" alt="">
            <img class="statement active" :src="paymentsWhite" alt="" >
            Payments</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/reports/billing/charges">
          <img class="statement not-active" :src="chargesGray" alt="">
          <img class="statement active" :src="chargesWhite" alt="" >
            Charges
          </router-link>
        </li>
      </ul>
    </nav>
</template>
<script>
import paymentsGray from '@/assets/img/icons/payments-gray.svg'
import chargesGray from '@/assets/img/icons/charges-gray.svg'
import statementGray from '@/assets/img/icons/statement-gray.svg'
import statementWhite from '@/assets/img/icons/statement-white.svg'
import chargesWhite from '@/assets/img/icons/charges-white.svg'
import paymentsWhite from '@/assets/img/icons/payments-white.svg'
export default {
  name: "BillingMenu",
  data() {
    return {
      paymentsGray: paymentsGray,
      chargesGray: chargesGray,
      statementGray: statementGray,
      statementWhite: statementWhite,
      chargesWhite: chargesWhite,
      paymentsWhite: paymentsWhite
    }
  }
}
</script>
<style scoped lang="scss">

.nav {
  width: 100%;
  position: relative;
  margin-bottom: 30px;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: var(--cdr-border-row);
    border-radius: 8px;
  }

  .nav-list{
    padding-left: 30px;
    display: flex;

    .nav-item{
      margin-right: 24px;

      a {
        padding: 5px 24px 5px 5px;
        cursor: pointer;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        text-decoration: none;
        color: #4B535A;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
          margin-right: 7px;
        }
        svg {
          margin-right: 3px;
        }

        .active {
          display: none;
        }
      }

      .router-link-active{
        color: white;
        background: #276899;
        border-radius: 4px 4px 0px 0px;

        .not-active {
          display: none;
        }

        .active {
          display: block;
        }
      }
    }
  }
}
</style>
