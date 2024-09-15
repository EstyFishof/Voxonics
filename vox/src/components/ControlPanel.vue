<template>
  <div v-show="show" class="btn-container">
    <button @click="apply()" class="apply-btn">{{ text || "Apply Changes" }}</button>
    <div @click="discard()" class="clean-btn">
      <img width="24" height="25" content="Discard"
           v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
           src="@/assets/img/icons/broom.svg" alt="broom">
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlPanel",
  props: ["show", "apply", "discard", "text"],
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && this.show) {
        e.preventDefault()
        this.apply()
        // this.$emit('apply')
      }
      if ((navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.key === 'z') {
        this.discard()
      }
    }, false)
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-right: 25px;
  white-space: nowrap;
  z-index: 10;
  // background: var(--main-bg);


  .apply-btn {
    transition: .3s ease;
    background-color: var(--apply-bg);

    &:hover {
      transform: scale(1.1);
    }
  }

  .clean-btn {
    transition: .3s ease;
    background-color: var(--broom-bg);
    box-shadow: 2px -1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 42px;
    height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.1) translateY(-1px);
    }
  }

  img {
    cursor: pointer;
    margin-top: -2px;

    &:active {
      transform: scale(0.95);
    }
  }

  button {
    margin: 0 10px;
    height: 29px;
    background: none;
    border: 2px solid #34B53A;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    color: var(--apply-color);

    &:active {
      transform: scale(0.95);
    }
  }

  .discard {
    border: 2px solid var(--light-blue);
    background-color: transparent;
    color: var(--light-blue);
  }
}
</style>
