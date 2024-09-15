<template>
  <div class="personal-info-wrap" :class="{'disabled-events': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
    <div class="wrap-head">
      <h2>DEPARTMENT INFO</h2>
      <span class="hr"></span>
      <span>
        <svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg" content="Delete department" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" @click="del()" class="trash" :class="{'grayscale': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}">
          <path d="M2.14286 34.6667C2.14286 37.05 4.07143 39 6.42857 39H23.5714C25.9286 39 27.8571 37.05 27.8571 34.6667V8.66667H2.14286V34.6667ZM30 2.16667H22.5L20.3571 0H9.64286L7.5 2.16667H0V6.5H30V2.16667Z" fill="#276899"/>
          <rect x="10" y="1" width="10" height="1" />
          <rect x="6" y="12" width="2" height="23" />
          <rect x="14" y="12" width="2" height="23" />
          <rect x="22" y="12" width="2" height="23" />
        </svg>
      </span>
    </div>

    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <span>  Name of Department:</span>
          <div class="item-container with-err">
            <div class="left-section-block">
              <input content="Change name" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                :style="{width: computedWidth}"
                    placeholder="Enter name of Department"
                    :class="{'input-field': edit, 'grayscale': !$access.isEditDepAndQueue(userInfo, 'department', departmentInfo)}"
                    :defaulValue="departmentInfoName"
                    v-model.trim="name"
                    maxlength="12"
                    @input="setDepartmentName"
              />
              <span class="last-update-block">
                <span class="last-update-text">Last updated:</span>
                <span class="last-update-data">{{departmentInfo.dateUpdated}}</span>
              </span>
            </div>
            <div class="wrap-static">
              <div class="static">
                <div class="label">Numbers in Department:</div>
                <div class="num">{{ numbersDep.length || 0 }}</div>
              </div>
              <div class="static">
                <div class="label">Agents in Department:</div>
                <div class="num">{{ agentsDep.length || 0 }}</div>
              </div>
              <div class="static">
                <div class="label">Managers in Department:</div>
                <div class="num">{{ managersDep.length || 0 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import store from "../../../../../store"

export default {
  name: "DepartmentInfo",
  data() {
    return {
      name: "",
      edit: false
    }
  },
  computed: {
    ...mapGetters(['numbersDep', 'agentsDep', 'managersDep', 'departmentInfoName', 'userInfo', 'departmentInfo']),
    computedWidth() {
      return this.name.length ? 32 + this.name.length * 1.1 * 24 + 'px' : '100%'
    }
  },
  methods: {
    del() {
      this.$store.dispatch('setDeleteDep', true)
    },
    setDepartmentName() {
      this.$store.dispatch('changeNameDepartment', this.name)
    },
  },
  mounted() {
    this.name = this.departmentInfoName
    store.subscribe((mutation) => {
      if (mutation.type === 'pushDepartment') {
        this.name = this.departmentInfoName
      }
    })

  }
}
</script>

<style scoped lang="scss" src="@/assets/styles/departmentsAndQueues/info.scss"></style>
<style scoped lang="scss">
.personal-info-wrap {
  .wrap-head {
    .trash{
      position: static;
      margin-left: 30px;
      margin-bottom: 10px;
      &:hover {
        transform: scale(1.2, 1.2);
      }
      rect {
        fill: var(--substrate);
      }
    }
  }
  .wrap-body {
    .personal-info {
      &__first-part {
        .item-container {
          input {
            margin-right: 100px;
          }
          .wrap-static {
            .static {
              margin-right: 50px;
            }
          }
        }
      }
    }
  }
}
</style>
