<template>
  <!-- <div class="dialing-number-container"> -->
    <div class="dialing-number-container">
      <Keyboard ref="keyboard" @setNumberProp="setNumber" @callAction="callAction" :marginBottomOfInput="'70px'" />
      
      <span v-if="number" class="add-number-string" @click="addNumber()">Add number</span>

      <div class="bottom-tabs">
        <span class="call-span" @click="callAction">
          <img src="@/assets/img/icons/phone-call-icon.svg" />
        </span>

        <img class="delete-number" v-if="theme === 'dark'" @click="deleteNumber()" src="@/assets/img/icons/delete-number.svg"/>
        <img class="delete-number" v-else @click="deleteNumber()" src="@/assets/img/icons/delete-number-light.svg"/>
      </div>
    </div>



  <!-- </div>   -->
</template>
<script>
import Keyboard from './Keyboard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'DialingNumber',
  components: {Keyboard},
  data() {
    return {
      number: ''
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  methods: {
    setNumber(number) {
      this.number = number
    },
    callAction() {
      this.$store.dispatch('sipCall', JSON.parse(JSON.stringify(this.number)))
    },
    deleteNumber() {
      this.$refs.keyboard.deleteNumber()
    },
    addNumber() {
      this.$store.dispatch('contactAction', {phoneNumbers: [{label: '', number: this.number}]})
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialing-number-container {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    margin-bottom: 0;
    margin-bottom: 30px;

    .add-number-string {
      position: absolute;
      top: 57px;
      cursor: pointer;
      z-index: 1000;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      letter-spacing: -0.01em;
      color: #276899;
    }

    .bottom-tabs {
      margin-top: 8px;
      position: relative;
      .call-span {
        cursor: pointer;

        img {
          border-radius: 50%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
      }

      .delete-number {
        position: absolute;
        right: -80px;
        top: calc(50% - 10.5px);
        cursor: pointer;
        backdrop-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      }
    }
  }
</style>
