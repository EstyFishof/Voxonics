<template>

  <div class="wrap-main">
    <div class="wrap-form">
      <form @submit.prevent="handlerSubmit">
        <QueueInfo :requiredFields="requiredFields"/>
        <AddAgent/>
        <AddManager/>
        <div class="btn-container">
          <button class="btn-submit" @click="checkValid()">Apply Changes</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import QueueInfo from "@/views/Config/Queues/CreateQueue/components/QueueInfo"
import AddAgent from "@/views/Config/Queues/CreateQueue/components/AddAgent"
import { mapGetters } from "vuex"
import AddManager from "./components/AddManagers"

export default {
  name: "CreateQueue",
  components: { AddManager, AddAgent, QueueInfo },
  data() {
    return {
      requiredFields: {
        name: false,
        internalNumber: false
      }
    }
  },
  computed: {
    ...mapGetters(['newQueue']),
  },
  methods: {
    checkValid() {
      this.newQueue.name === '' ? this.requiredFields.name = true : this.requiredFields.name = false
      this.newQueue.internalNumber === '' ? this.requiredFields.internalNumber = true : this.requiredFields.internalNumber = false
    },
    handlerSubmit() {
      this.$store.dispatch('createQueue', this.newQueue)
    }
  },
  beforeDestroy() {
    this.$store.dispatch('resetCreateQueue')
  }
}
</script>
<style lang="scss">
.wrap-main {
  position: relative;
  width: 100%;

  .trash {
    position: absolute;
    top: 150px;
    right: 50px;
    cursor: pointer;

    &:active {
      transform: scale(0.95);
    }
  }

  .header {
    width: 100%;
    border-radius: 8px 8px 0 0;

    img {
      margin-bottom: -5px;
    }

    span {
      margin-left: 12px;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
    }
  }


  .wrap-form {
    background: var(--substrate);
    padding: 24px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
    border: 2px solid var(--cdr-border-row);
    border-radius: 8px;

    .btn-submit {
      display: block;
      margin: 0 auto;
      border: none;
      font-weight: 500;
      font-size: 18px;
      background: var(--light-blue);
      border-radius: 8px;
      color: var(--white);
      width: 165px;
      height: 48px;
      cursor: pointer;
      outline: none;
      transition: .3s ease;
      transform: scale(1, 1);

      &:hover {
        transition: .3s ease;
        transform: scale(1.1, 1.1);
      }
    }
  }

}

//<<<<<<<<<<<<<---Для вложеных компонентов--->>>>>>>>>>>>>>>>
.wrap-head {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  .arrow {
    width: 15px;
    min-width: 15px;
    margin-right: 14px;
    transition: .3s;

    &.down {
      transform: rotate(-90deg);
    }
  }

  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: var(--header-user-color);
    white-space: nowrap;
    margin-right: 24px;
  }
}

.hr {
  display: block;
  height: 2px;
  width: 100%;

  &.line {
    margin: 36px 0 0 24px;
    max-width: 100%;
    flex-basis: 972px;
  }
}
</style>
