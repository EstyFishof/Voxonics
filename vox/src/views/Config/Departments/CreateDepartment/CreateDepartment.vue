<template>

  <div class="wrap-main">
    <div class="wrap-form">
      <form @submit.prevent="handlerSubmit">
        <DepartmentInfo :requiredName="requiredName"/>
        <AddAgent/>
        <AddManager/>
        <AddVNumbers/>
        <div class="btn-container">
          <button class="btn-submit" @click="checkValid()">Apply Changes</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import DepartmentInfo from "@/views/Config/Departments/CreateDepartment/components/DepartmentInfo"
import AddAgent from "@/views/Config/Departments/CreateDepartment/components/AddAgent"
import { mapGetters } from "vuex"
import AddManager from "./components/AddManagers"
import AddVNumbers from "./components/AddNumbers"

export default {
  name: "CreateDepartment",
  components: { AddVNumbers, AddManager, AddAgent, DepartmentInfo },
  data() {
    return {
      requiredName: false
    }
  },
  computed: {
    ...mapGetters(['newDepartment']),
  },
  methods: {
    checkValid() {
      if(this.newDepartment.name === '') 
        this.requiredName = true
    },
    handlerSubmit() {
      this.requiredName = false
      this.$store.dispatch('createDepartment', this.newDepartment)
    }
  },
  beforeDestroy() {
    this.$store.dispatch('resetCreateDep')
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
    padding: 24px;
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
        transform: scale(1.3, 1.3);
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
    color: var(--header-user-color) !important;
    white-space: nowrap;
    margin-right: 24px;
  }
}

.hr {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--header-user-color) !important;

  &.line {
    margin: 36px 0 0 24px;
    max-width: 100%;
    flex-basis: 972px;
  }
}
</style>
