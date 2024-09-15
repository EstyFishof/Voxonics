<template>
  <div id="app" class="app-wrap">
    <ModalError />
    <ModalSuccess />
    <div class="wrap-content">
      <template v-if="$route.meta.layout === 'login'">
        <Login />
      </template>
      <template v-else>
        <div class="blur" v-if="phoneWindowMode === 'window' && !popup"></div>
        <Nav />
        <div class="grid-content" v-if="userInfo">
          <Header class="page-header" />

          <span class="phone-logo" v-if="phoneWindowMode === 'contain' && userInfo.enableWs">
            <Phone v-show="$route.fullPath === '/agent-panel' || getShowPhone" />
            <CompactPhone
              v-show="
                (notConfirmedSessions.length || deferredSessions.length || activeSession) &&
                $route.fullPath !== '/agent-panel' &&
                !getShowPhone
              " />
          </span>

          <router-view class="wrap-body-main-vox" :class="{ notMargin: $route.meta.layout === 'login' }"> </router-view>
          <ConfirmationStore />
          <div v-show="getGlobalSpinner" class="spinner">
            <img src="@/assets/img/spinner.png" alt="load" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import "./assets/styles.css";
import Nav from "@/views/Navigation/Nav";
import Header from "@/views/Header";
import ModalError from "@/components/ModalError";
import ModalSuccess from "@/components/ModalSuccess";
import Phone from "@/views/Phone/Phone";
import CompactPhone from "@/views/Phone/components/CompactPhone.vue";
import Login from "@/views/Login";
import { mapGetters } from "vuex";
import ConfirmationStore from "./components/Confirmation.vue";

export default {
  name: "App",
  components: { Login, ModalError, ModalSuccess, Nav, Header, Phone, CompactPhone, ConfirmationStore },
  computed: {
    ...mapGetters([
      "getGlobalSpinner",
      "userInfo",
      "phoneWindowMode",
      "parentFrame",
      "popup",
      "activeSession",
      "getShowPhone",
      "notConfirmedSessions",
      "deferredSessions",
      "getSetSessionShown",
    ]),
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      localStorage.setItem("token", urlParams.get("token"));
      await this.$store.dispatch("getUserInfo");

      if (this.userInfo.uid) {
        this.$router.push("/agent-panel");
      }
    }
    if (window.opener) {
      this.$store.commit("toggleTheme", "init");
    }
    window.addEventListener(
      "storage",
      (event) => event.key === "theme" && this.$store.commit("toggleTheme") && this.$store.commit("toggleTheme")
    );

    window.addEventListener("message", (e) => {
      if (e.data === "openSuccess") {
        this.popup.postMessage("windowModeOn", window.location.origin + "/phone");
        this.popup.postMessage("setParentFrameFalse", window.location.origin + "/phone");
      }
      if (e.data === "windowModeOn") {
        this.$store.commit("setPhoneWindowMode", "window");
      }
      if (e.data === "setParentFrameFalse") {
        this.$store.commit("setParentFrame", false);
      }
      if (e.data === "containModeOn" && !window.opener) {
        this.$store.commit("savePopup", null);
        this.$store.commit("setPhoneWindowMode", "contain");
      }
    });
    window.addEventListener("unauthorized", () => {
      this.$store.dispatch("pushLogout");
    });
  },
  beforeDestroy() {
    this.$store.dispatch("closeConnection");
  },
};
</script>

<style lang="scss" src="@/assets/styles/clickedSectorForBatchActions.scss"></style>
<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  behavior: smooth;
  outline: none;
}

div,
span,
a,
p,
li,
button,
td,
th {
  user-select: none;
}

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

html,
body {
  font-family: "Roboto", sans-serif;
  scrollbar-color: #515960 #143861; /* «цвет ползунка» «цвет полосы скроллбара» */
  scrollbar-width: thin; /* толщина */
  behavior: smooth;
}

::-webkit-scrollbar {
  width: 4px; /* ширина для вертикального скролла */
  height: 6px; /* высота для горизонтального скролла */
  background-color: var(--scroll-bg);
}
/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
  background-color: var(--scroll);
  border-radius: 3px;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.disabled-events {
  pointer-events: none;
}

.grayscale {
  filter: grayscale(1);
}

.disabled-gray-options-block {
  color: #6d6d6d !important;

  .options-label,
  .label {
    color: #6d6d6d !important;

    .input-field {
      background: var(--paginator-item) !important;
      color: #6d6d6d !important;

      &::placeholder {
        color: #6d6d6d !important;
      }
    }
  }

  .triangle,
  .union {
    filter: grayscale(1);
  }
}

html {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--white);
  background: var(--main-bg);
}

.spinner {
  position: fixed;
  bottom: 50px;
  left: 270px;
  width: 50px;
  height: 50px;
  z-index: 10;
  animation: 1s linear 0s rotate infinite;

  img {
    width: 100%;
    height: 100%;
  }
}

.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.container {
  max-width: 1500px;
  padding: 24px;
}
.btn-submit {
  display: block;
  margin: 0 auto;
  border: none;
  background: var(--light-blue);
  border-radius: 8px;
  color: var(--white);
  cursor: pointer;
  outline: none;
}
.app-wrap {
  background-color: var(--main-bg);
  min-height: 100vh;
}

.batch-actions-block {
  margin-left: 9px;
  position: relative;

  .batch-actions-counter {
    position: absolute;
    top: 0;
    left: 35px;
    font-size: 12px;

    &.batch-actions-max-counter {
      color: red;
      right: -37px;
    }
  }
}

.wrap-content {
  width: 100%;

  .page-header {
    position: sticky;
    top: 0;
    width: calc(100% + 50px);
    margin-bottom: 10px;
    margin-left: -25px;
    padding-left: 25px;
    padding-right: 25px;
    background: var(--main-bg);
    z-index: 1000;
  }

  .notMargin {
    margin-top: 0;
  }
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.input-field,
.item-container select {
  margin-top: 12px;
  display: block;
  padding: 5px 16px;
  width: 292px;
  height: 35px;
  background: var(--input-bg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: var(--font-panel);
  border: none;
  outline-offset: -2px;
}

.input-field::placeholder {
  color: var(--input-color-placeholder);
  font-size: 14px;
  font-weight: 300;
}

.arrow {
  transition: 0.3s;
  cursor: pointer;
}

#app {
  padding-right: 25px;
}

svg {
  shape-rendering: auto;
}

/* For triangle arrow (Sharp) */
.tippy-popper[x-placement^="right"] .tippy-tooltip .tippy-arrow {
  border-right: 7px solid var(--substrate);
}

.tippy-popper[x-placement^="left"] .tippy-tooltip .tippy-arrow {
  border-left: 7px solid var(--substrate);
}

.tippy-popper[x-placement^="top"] .tippy-tooltip .tippy-arrow {
  border-top: 7px solid var(--substrate);
}

.tippy-popper[x-placement^="bottom"] .tippy-tooltip .tippy-arrow {
  border-bottom: 7px solid var(--substrate);
}

.tippy-popper[x-placement^="top"] .tippy-tooltip .tippy-arrow {
  bottom: -7px;
  margin: 0 3px;
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
}

.tippy-tooltip {
  z-index: 999;
  color: var(--font-panel);
  padding: 5px;
  font-size: 12px;
  background-color: var(--substrate);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 4px 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  // text-transform: capitalize;
}

.capitalize {
  text-transform: capitalize;
}

// Выпадающие списки
// ===============================================================================

.options-label {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #8b9095;

  .input-field {
    margin-top: 2px;
    display: flex;
    align-items: center;
    padding: 5px 4px;
    padding-left: 12px;
    width: 110px;
    height: 27px;
    background: var(--queue-select-bg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    color: var(--font-panel);
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .triangle {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    img,
    svg {
      margin-right: -5px;
      transform: rotate(-90deg);
      transition: all 0.3s ease-in-out;
    }

    &.rotate-arrow {
      img,
      svg {
        transform: rotate(0deg);
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .list-related-numbers {
    position: absolute;
    z-index: 10;
    border-radius: 4px;
    width: 100%;
    background: var(--queue-select-bg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    overflow-y: overlay !important;

    &::-webkit-scrollbar {
      width: 4px; /* ширина для вертикального скролла */
      height: 6px; /* высота для горизонтального скролла */
      background-color: rgba(0, 0, 0, 0);
    }

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 27px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: white;
      padding: 0 6px;
      position: relative;
      cursor: pointer;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;

      &:hover {
        background: var(--light-blue) !important;
      }

      &::after {
        content: "";
        position: absolute;
        width: 95%;
        bottom: 0;
        left: 2.5%;
        height: 2px;
        // background: rgba(255, 255, 255, 0.05);
        background: var(--list-item-after-border);
        border-radius: 2px;
      }
    }

    .selected {
      background-color: var(--light-blue) !important;
    }

    .choosed {
      background-color: var(--light-blue);
    }

    .active-item {
      background: #276899;
    }
  }
}

// checkbox
// ===============================================================================

input[type="checkbox"] {
  opacity: 0;
  color: transparent;
  margin-right: 10px;
  z-index: 9;
  width: 16px;
  height: 16px;
  position: relative;

  &:checked + .check {
    position: absolute;
    z-index: 8;
    opacity: 1;
    top: 0;
    left: 2px;
    width: 16px;
    height: 16px;
    background-image: url("./assets/img/icons/checked.svg");
    background-size: cover;
  }

  &:checked ~ .text {
    color: var(--light-blue) !important;
  }

  & + .check {
    position: absolute;
    opacity: 1;
    z-index: 8;
    top: 0;
    left: 2px;
    width: 16px;
    height: 16px;
    background-image: var(--unchecked);
    background-size: cover;
  }

  &:disabled ~ .text {
    color: gray !important;
  }

  &:disabled + .check {
    position: absolute;
    opacity: 1;
    top: 0 !important;
    left: 2px;
    width: 16px !important;
    height: 16px !important;
    background-image: url("./assets/img/icons/disabled-unchecked.svg");
    background-size: cover;
  }

  &:disabled {
    &:checked + .check {
      position: absolute;
      opacity: 1;
      top: 0 !important;
      left: 2px;
      width: 16px !important;
      height: 16px !important;
      background-image: url("./assets/img/icons/checked-disable.svg");
      background-size: cover;
    }
  }
}

// блок фильтрации в шапке компонентов
// ===============================================================================

.sort-tabs {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-right: 24px;
  border-radius: 8px;
  padding: 12px;
  color: #6d6d6d;
  height: 100%;
  align-items: center;

  li {
    padding: 5px 16px;
    margin-right: 8px;
    font-weight: 300;

    &:hover {
      color: var(--white);
    }

    input {
      width: 150px;
      font-size: 16px;
      margin-top: 0;
      background-color: var(--paginator-bg);

      &::placeholder {
        color: white;
        font-size: 16px;
        font-family: "Roboto", sans-serif;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  li:nth-child(1) {
    font-weight: 500;
    border-radius: 8px;
    color: var(--white);
  }
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--main-bg);
  z-index: 9999999;
}
.pointer {
  cursor: pointer;
}

@media (min-width: 2561px) {
  .grid-content {
    width: 2000px;
  }
}

@media (max-width: 2560px) {
  .grid-content {
    width: 1900px;
  }
}

@media (max-width: 2300px) {
  .grid-content {
    width: 1725px;
  }
}

@media (max-width: 2100px) {
  .grid-content {
    width: 1559px;
  }
}

@media (max-width: 1920px) {
  .grid-content {
    width: 1479.41px;
  }
}

@media (max-width: 1780px) {
  .grid-content {
    width: 1330px;
  }
}

@media (max-width: 1600px) {
  .grid-content {
    width: 1230px;
  }
}

@media (max-width: 1504px) {
  .grid-content {
    width: 1136px;
  }
}

@media (max-width: 1408px) {
  .grid-content {
    width: 1006px;
  }
}
</style>
