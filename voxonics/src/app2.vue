<template>
    <section class="container-form">
      <form class="form" @submit.prevent="submitForm(form)">
        <div v-if="!authStatus" class="form-wrap">
          <div class="logo">
            <img src="../assets/img/logo.svg" alt="logo">
          </div>
          <h4>Enter your credentials to access your account</h4>
          <div class="form-group">
            <input placeholder="Internal Number" v-model.trim="form.internalNumber" class="login-field" required/>
            <input
              placeholder="Enter password"
              type="password"
              v-model.trim="form.password"
              class="password-field"
              required
            />
            <div class="btn-container">
              <button class="btn-login">Sign in</button>
              <span v-if="error" class="error"> Please, input correct data </span>
            </div>
          </div>
        </div>
        <div v-else class="spin-wrapper">
          <div class="logo">
            <img src="../assets/img/logo.svg" alt="logo">
          </div>
          <div class="spin">
            <img src="../assets/img/spinner.png" alt="spinner">
          </div>
        </div>
      </form>
      <SwitchTheme class="theme"/>
    </section>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import SwitchTheme from '@/components/switchTheme'
  
  
  export default {
    name: 'Login',
    components: {SwitchTheme},
    data() {
      return {
        form: {
          internalNumber: '',
          password: '',
        },
        error: false,
      }
    },
    computed: {
      ...mapGetters(['authStatus'])
    },
    methods: {
      submitForm(form) {
        this.$store.dispatch('login', form)
      }
    }
  
  }
  </script>
  
  <style scoped lang="scss">
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
        background-image: url('../assets/img/icons/user_icon.svg');
        background-repeat: no-repeat;
        background-position: 5% 50%;
      }
  
      .password-field {
        background-image: url('../assets/img/icons/pass_lock.svg');
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
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .login-field::placeholder {
    color: #515960;
  }
  
  .password-field::placeholder {
    color: #515960;
  }
  
  input {
    border: none;
    width: 100%;
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
  
  .error {
    color: #ff3a29;
    font-size: 14px;
    padding-left: 8px;
  }
  </style>
  