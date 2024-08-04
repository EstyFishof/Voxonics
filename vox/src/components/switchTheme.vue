<template>
  <label class="toggleTheme switch">
    <input :checked="theme === 'dark'" @input.prevent="toggleTheme" type="checkbox">
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: 'switchTheme',
  computed: {
    theme() {
      return this.$store.getters.theme
    }
  },
  methods: {
    toggleTheme(val) {
      this.$store.commit('toggleTheme', val)
    }
  },
  mounted() {
    if (!this.theme && !window.opener) {
      this.toggleTheme('init')
    }
  }
}
</script>

<style scoped lang="scss">

.toggleTheme {
  position: absolute;
  top: 60px;
  right: 20px;
}

.switch {
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--switch-bg);
  background-image: url('../assets/img/icons/sun.svg');
  background-position: 95% 4px;
  background-repeat: no-repeat;
  transition: .4s;
  height: 32px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 38px;
  width: 38px;
  left: -10px;
  top: -3px;
  background-color: #242D38;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition: .4s;
}

input:checked + .slider {
  background-image: url('../assets/img/icons/moon.svg');
  background-position: 4px 6px;
  background-repeat: no-repeat;
}

input:checked + .slider:before {
  transform: translateX(40px);
  background-color: #F5F5F5;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
