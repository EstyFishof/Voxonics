<template>
  <div class="keyboard-main-container">
    <input ref="input" class="phone-number" :style="{marginBottom: marginBottomOfInput}" v-model="phoneNumber"  maxlength="15"/>
    <div class="numbers-keyboard">
      <ul class="buttons-list">
        <li class="buttons-list-item" :style="{'padding-bottom': item === '*' || item === '#' ? '0' : '10px'}" v-for="(item, index) of buttons" :key="index" @click="enterNumber(item)">
          {{ item }}
          <span class="subString">{{subString[index]}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Keyboard",
  props: ["setNumberProp", "callAction", "marginBottomOfInput"],
  data() {
    return {
      phoneNumber: "",
      timerId: null,
      clicks: 0,
      buttons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"],
      subString: [' ', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ', '', '+', '']
    }
  },
  watch: {
    phoneNumber() {
      this.$emit("setNumberProp", this.phoneNumber)
    }
  },
  methods: {
    enterNumber(numberParam) {
      if(this.phoneNumber.length >= 15) return 
      this.clicks++
      if (this.clicks === 1) {
        this.timerId = setTimeout(() => {
          this.clicks = 0
          this.setNumber(numberParam)
        }, 150)
      } else {
        clearTimeout(this.timerId)
        this.clicks = 0
        const number = numberParam === "0" ? "+" : numberParam
        this.setNumber(number)
      }
    },
    setCaretPosition(start, end) {
      this.$nextTick(() => {
        this.$refs.input.selectionStart = start
        this.$refs.input.selectionEnd = end
      })
    },
    setNumber(number) {
      const caretPositioStart = this.$refs.input.selectionStart
      const caretPositionEnd = this.$refs.input.selectionEnd
      this.phoneNumber = this.phoneNumber.slice(0, caretPositioStart) + number + this.phoneNumber.slice(caretPositionEnd)
      this.setCaretPosition(caretPositioStart + 1, caretPositioStart + 1)
    },
    deleteNumber() {
      const caretPositioStart = this.$refs.input.selectionStart
      const caretPositionEnd = this.$refs.input.selectionEnd
      const startSlice = caretPositioStart === caretPositionEnd ? caretPositioStart - 1 : caretPositioStart
      this.phoneNumber = this.phoneNumber.slice(0, startSlice) + this.phoneNumber.slice(caretPositionEnd)
      this.setCaretPosition(startSlice, startSlice)
    },
    makeCall() {
      this.$emit("callAction")
      this.phoneNumber = ""
    },
    keydownHandler(event) {
      event.preventDefault()
      if (event.key === "Enter") {
        this.makeCall()
      }
      if(!isNaN(+event.key) || event.key === '*' || event.key === '+') {
        this.setNumber(event.key)
      }
      if(event.key === 'Backspace') {
        this.deleteNumber()
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.keydownHandler)
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydownHandler)
  }
}
</script>
<style lang="scss" scoped>
.keyboard-main-container {
  .phone-number {
    margin-top: 0px;
    font-weight: normal;
    background-color: rgba(0,0,0,0);
    border: none;
    outline: none;
    font-size: 36px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;
    color: var(--font-panel);
    display: block;
    height: 34px;
    padding-left: 10%;
    padding-right: 10%;
    overflow: hidden;
    width: 375px;
    // margin-bottom: 70px;
  }

  .numbers-keyboard {
    padding: 10px 46px 0px 46px;

    .buttons-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .buttons-list-item {
        width: 75px;
        height: 75px;
        position: relative;
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        background: var(--phone-btn-bg);
        border: 1px solid #276899;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        font-weight: normal;
        font-size: 36px;
        line-height: 34px;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #ffffff;

        .subString {
          position: absolute;
          font-weight: 400;
          font-size: 12px;
          line-height: 34px;
          color: #FFFFFF;
          bottom: -3px;
        }
      }
    }
  }
}
</style>
