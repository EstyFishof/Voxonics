<template>
  <nav class="top-nav" v-if="isPage === 'config' && roleAgent !== 'agent' && roleAgent != undefined && roleAgent != null">
    <ul class="main-list">
      <li class="main-list__item" :class="{active: pathLocation[0] === 'users', children: typeof pathLocation[1] === 'string' }" >
        <router-link to="/config/users">Users</router-link>
        <ul class="secondary-list"  v-if="pathLocation[1] === 'account-info' || pathLocation[1] === 'edit-user'" >
          <li class="secondary-list__item"  v-for="(val, index) in setSecondaryList"  :key="index">
            {{ val }}
          </li>
        </ul>
      </li>
      <li class="main-list__item" :class="{active: pathLocation[0] === 'departments', children: typeof pathLocation[1] === 'string'}">
        <router-link to="/config/departments">Departments</router-link>
        <ul class="secondary-list" v-if="pathLocation[1] === 'department-setting'">
          <li class="secondary-list__item" v-for="(val, index) in setSecondaryList" :key="index">
            {{ val }}
          </li>
        </ul>
      </li>
      <li class="main-list__item" :class="{active: pathLocation[0] === 'queues', children: typeof pathLocation[1] === 'string'}">
        <router-link to="/config/queues">Queues</router-link>
        <ul class="secondary-list" v-if="pathLocation[1] === 'queue-setting'">
          <li class="secondary-list__item" v-for="(val, index) in setSecondaryList" :key="index">
            {{ val }}
          </li>
        </ul>
      </li>
      <li class="main-list__item" :class="{active: pathLocation[0] === 'external-numbers'}">
        <router-link to="/config/external-numbers/info">V-number</router-link>
      </li>
      <li class="main-list__item">
        <router-link to="/config/incoming-route" :class="{active: pathLocation[0] === 'incoming-route', children: typeof pathLocation[1] === 'string'}">
          Incoming Routing
        </router-link>
      </li>
      <li class="main-list__item">
        <router-link to="/config/outboundCalls" :class="{active: pathLocation[0] === 'outboundCalls', children: typeof pathLocation[1] === 'string'}">
          Outbound Routing
        </router-link>
      </li>
      <li class="main-list__item" v-if="roleAgent === 'root'">
        <router-link to="/config/whitelistIP" :class="{active: pathLocation[0] === 'whitelistIP', children: typeof pathLocation[1] === 'string'}">
          Whitelist IP
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapGetters } from "vuex"

export default {
  name: "TopNav",
  data() {
    return {
      active: "",
      role: "",
    }
  },
  computed: {
    ...mapGetters([
      "pathLocation",
      "isPage",
      "userInfoVuex",
      "departmentInfo",
      "getQueueNameInfo",
      "getQueueInfo",
      "userRole",
      'roleAgent'
    ]),
    setSecondaryList() {
      let secondaryList = []
      if (
        this.pathLocation[1] === "account-info" ||
        this.pathLocation[1] === "edit-user"
      ) {
        secondaryList.push(this.userRole)
        secondaryList.push(this.userInfoVuex.internalNumber)
      } else if (this.pathLocation[1] === "department-setting") {
        secondaryList.push(this.departmentInfo.name)
      } else if (this.pathLocation[1] === "queue-setting") {
        secondaryList.push(this.getQueueNameInfo)
        secondaryList.push(this.getQueueInfo.internalNumber)
      }
      return secondaryList
    },
  },
  mounted() {
    this.role = this.userRole
  },
}
</script>
<style scoped lang="scss">
.top-nav {
  width: 100%;
  padding-bottom: 15px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
  background: var(--main-bg);

  .main-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      height: 2px;
      background: var( --cdr-border-row);
      border-radius: 8px;
      bottom: -10px;
      width: calc(82% - 7px);
    }

    &__item {
      position: relative;
      margin-right: 64px;

      &:first-child {
        margin-left: 57px;
      }

      a {
        cursor: pointer;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #4b535a;
        text-decoration: none;
      }
    }
  }

  .secondary-list {
    position: absolute;
    bottom: -25px;
    left: -15px;
    display: flex;
    width: 300%;

    &__item {
      font-weight: normal;
      font-size: 12px;
      line-height: 12px;
      color: #4b535a;

      &:not(:last-child) {
        margin-right: 4px;
      }

      a {
        font-weight: normal;
        font-size: 12px;
        line-height: 12px;
      }
    }
  }

  .active {
    position: relative;
    z-index: 1000;

    a {
      color: #276899 !important;
    }

    &.children {
      &::before {
        content: "";
        position: absolute;
        height: 5px;
        width: 2px;
        background: #276899;
        left: -20px;
        bottom: -13px;
        border-radius: 2px;
      }
    }

    &:after {
      content: "";
      position: absolute;
      height: 2px;
      background: #276899 !important;
      border-radius: 8px;
      bottom: -10px;
      left: -20px;
      width: calc(100% + 40px);
    }
  }
}
@media (max-width: 1724px) {
  .top-nav {
    .main-list__item {
      margin-right: 50px;
    }
  }
}
</style>
