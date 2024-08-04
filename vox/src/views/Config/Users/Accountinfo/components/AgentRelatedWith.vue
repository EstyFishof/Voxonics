<template>
  <div class="wrap-queues-setting">
    <div class="wrap-body">
      <div class="item-container">
        <div class="password">
          <label class="options-label">
            Role
            <input class="input-field num" type="text" v-model="userInfo.permission.role" readonly>
          </label>
        </div>
        <div class="password">
          <label>SIP password
            <input ref="secret" class="input-field sip-password" type="text"
                   :value="userInfo.secret"
                   readonly>
          </label>
          <CopyIcon
            @copyHandler="copy()"
          />
        </div>
      </div>
      <div class="table-container">

        <div class="available">
          <div class="table-title">Departments</div>
          <div>
            <ul class="table-header departments-table-header">
              <li>Name of Department</li>
              <li>Agents in Department</li>
            </ul>
            <div class="table-content">
              <ul class="list-group departments-group" v-for="dep in userInfo.relatedWith.department" :key="dep.uid">
                <li class="queue-name">{{ dep.name }}</li>
                <li class="queue-name">{{ dep.userCount }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="selected">
          <div>
            <div class="table-title">Queues</div>

            <div>
              <ul class="table-header">
                <li>Name of Queue</li>
                <li>Queue Number</li>
                <li>Agents in Queue</li>
              </ul>
              <div class="table-content">
                <ul class="list-group" v-for="(queue, idx) in userInfo.relatedWith.queue"
                    :key="queue.uid + idx">
                  <li class="queue-name">{{ queue.name }}</li>
                  <li class="queue-int-num">{{ queue.internalNumber }}</li>
                  <li class="queue-user-uid">{{ queue.userCount }}</li>
                </ul>
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
import CopyIcon from "../../../../../components/CopyIcon.vue"

export default {
    name: "AgentRelatedWith",
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["userInfo"])
    },
    methods: {
        copy() {
            this.$refs.secret.select();
            document.execCommand("copy");
        },
    },
    components: { CopyIcon }
}
</script>
<style lang="scss" scoped>
.wrap-queues-setting {
  padding-bottom: 12px;

  .wrap-body {
    .item-container {
      display: flex;
      flex-direction: row;
      gap: 40px;
      .input-field.num {
        margin-top: 12px;
        width: 200px;
        height: 35px;
        padding: 5px 16px;
        background: var(--input-bg);
      }
    }
    .password {
      position: relative;
      width: 200px;
      margin-bottom: 40px;

      ::v-deep .copy {
        cursor: pointer;
        position: absolute;
        bottom: 4px;
        right: 6px;
      }

      label {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        font-weight: 700;
        text-align: left;
        color: var(--light-blue);

        .sip-password {
          width: 200px;
        }
      }

      .cursor {
        cursor: pointer;
        position: absolute;
        bottom: 4px;
        right: 6px;
      }
    }

    .table-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin: 0 24px 36px 0;

      .available, .selected {
        flex: 1 1 auto;
        min-width: 45%;

        .selected {
          padding: 0 !important;
          margin: 0;

          li {
            display: none;
          }
        }

        .table-header {
          height: 40px;
        }

        .table-content {
          height: 300px;
          background-color: var(--permission-table-bg);
          overflow: auto;
        }

        .list-group {
          @extend .flex;
          padding: 12px 24px;
          position: relative;
          color: var(--font-panel);

          &.departments-group {
            justify-content: space-between;
          }

          &::after {
            content: '';
            position: absolute;
            width: 95%;
            left: 2.5%;
            bottom: 0;
            height: 2px;
            background: var(--bottom-line);
            border-radius: 2px;
          }

          li:nth-child(1),
          li:nth-child(2),
          li:nth-child(3) {
            min-width: 33%;
            padding-right: 20px;
            text-align: center;
          }

          li:nth-child(4) {
            width: 10%;
            text-align: right;

            img {
              margin-right: 2px;
            }
          }

          li {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 16px;

            .select-btn {
              cursor: pointer;
              transition: .3s ease;
              transform: scale(1, 1);

              &:hover {
                transition: .3s ease;
                transform: scale(1.1, 1.1);
              }
            }

            img {
              cursor: pointer;
            }
          }

          &.selected {
            li img {
              cursor: not-allowed;
            }
          }
        }
      }

      .available {
        margin-right: 128px;
      }

      .table-title {
        margin-bottom: 24px;
        font-size: 32px;
        font-weight: 700;
        color: var(--header-user-color);
        white-space: nowrap;
      }

      .flex {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .table-header {
        background: var(--light-blue);
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
        border-radius: 4px 4px 0 0;
        @extend .flex;
        padding: 12px 27px 12px 16px;
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &.departments-table-header {
          justify-content: space-between;
        }

        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3) {
          text-align: center;
          width: 33%;
        }

        li:nth-child(4) {
          width: 10%;
          text-align: right;
        }
      }
    }
  }

}
</style>
