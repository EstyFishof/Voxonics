<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="btn-container">
      <input class="login-field" v-model="inputMessage" placeholder="Enter a message" />
      <button class="btn-login" @click="goToHelloWorld">Sign in</button>
      <span v-if="error" class="error">Please, input correct data</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      error: false // Ensure this data property exists for v-if to work
    }
  },
  methods: {
    goToHelloWorld() {
    // Navigate to HelloWorld with inputMessage as a route parameter
    if (this.inputMessage.trim()) { // Check if input is not empty
        this.$router.push({ name: 'HelloWorld', params: { msg: this.inputMessage } });
      } else {
        this.error = true; // Show error if input is empty
      }
    }
  }
}
</script>

<style>
:root {
  --light-blue: #42b983;
  --white: #ffffff;
}

.container-form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: var(--bg_login);
  background-size: cover;
  transition: all 1s;

  .theme {
    right: 80px;
  }

  .form {
    background: var(--bgc_main);
    padding: 35px 75px;
    margin: 50px;
    box-shadow: 0 16px 20px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    text-align: left;
    min-width: 320px;
    width: 30%;
    min-height: 45%;

    .form-group {
      input {
        color: var(--font-panel);
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
      }
    }

    .spin-wrapper {
      margin-top: 30px;

      .spin {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          animation: 3s linear 0s rotate infinite;
        }
      }
    }

    h4 {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: #9B9B9B;
      margin-bottom: 30px;
      text-align: center;
    }

    input {
      border-radius: 12px;
      padding: 5px 50px;
      background: var(--bgc_el_main);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      color: var(--white);
      height: 52px;
    }

    .login-field {
      margin-bottom: 20px;
      background-repeat: no-repeat;
      background-position: 5% 50%;
    }

    .password-field {
      background-repeat: no-repeat;
      background-position: 5% 50%;
    }

    .logo {
      margin: 0 0 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 75%;
      }
    }
  }
}

.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn-container {
  margin: 0 auto;
  padding: 26px 0 0;
}

.btn-login {
  background: var(--light-blue);
  padding: 8px 36px;
  color: var(--white);
  font-size: 18px;
  font-weight: 500;
  border: none;
  width: 170px;
  height: 52px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.5s ease-out;
  opacity: 0.8;
}

.btn-login:hover {
  opacity: 1;
}

.login-field::placeholder {
  color: #515960;
}

.error {
  color: #ff3a29;
  font-size: 14px;
  padding-left: 8px;
}
</style>
