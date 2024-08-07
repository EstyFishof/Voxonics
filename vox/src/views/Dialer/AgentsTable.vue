<template class="template">
  <div>
    <div class="squares">
      <div class="square">
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="Active calls icon" class="icon" />
        <span class="number">
          {{ sumTalkingAgents() }}
        </span>
        <div class="call-mode">Active calls</div>
      </div>
      <div class="square">
        <img src="@/assets/img/icons/phone-keyboard.svg" alt="Calls today icon" class="icon" />
        <div class="call-mode">Calls today</div>
      </div>
      <div class="square">
        <div class="small-square"></div>
        <div class="percent">%</div>
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="Answered calls icon" class="icon" />
        <div class="call-mode">Answered calls</div>
      </div>
      <div class="square">
        <div class="small-square"></div>
        <div class="percent">%</div>
        <img src="@/assets/img/icons/phone-pause.svg" alt="Dropped calls icon" class="icon" />
        <div class="call-mode">Dropped calls</div>
      </div>

      <div class="square">
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="Calls waiting for agents icon" class="icon" />
        <div class="call-mode">Calls waiting for agents</div>
      </div>
      <div class="square">
        <img src="@/assets/img/icons/phone-clock.svg" alt="avg. Waiting time icon" class="icon" />
        <div class="call-mode">avg. Waiting time</div>
      </div>
      <div class="square">
        <div class="medium-square-dial-level"></div>
        <img src="@/assets/img/icons/to-back-map.svg" alt="Dial level icon" class="icon" />
        <div class="x">x</div>
        <img src="@/assets/img/icons/edit.svg" alt="Dial level icon" class="small-icon" />
        <div class="call-mode">Dial level</div>
      </div>

      <div class="big-square">
        <div class="medium-square-dialable-leads"></div>
        <img src="@/assets/img/icons/agent-panel-gray.svg" alt="Dialable leads icon" class="icon" />
        <img src="@/assets/img/icons/to-back-map.svg" alt="Dialable leads icon" class="small-icon" />
        <div class="call-mode">Dialable leads</div>
      </div>
      <div class="big-square">
        <img src="@/assets/img/icons/agents-statement.svg" alt="Agent in calls Logged in icon" class="icon" />
        <span class="number">
          {{ countUniqueAgents() }}
        </span>
        <div class="call-mode">.Agents in calls .Logged in</div>
      </div>
      <div class="big-square">
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="avg. Talking time icon" class="icon" />
        <div class="call-mode">avg. Talking time</div>
      </div>
    </div>

    <div class="tables">
      <table>
        <thead>
          <tr>
            <th class="filter-panel" :colspan="rowsHeadArr.length">
              <div class="filter-container">
                <span class="filter-label">Filter by:</span>
                <div class="filter-buttons">
                  <FilterButton
                    label="Agent Name"
                    :sortKey="sortKeyWaiting"
                    :sortAsc="sortAscWaiting"
                    @click="sortTable('AgentName', 'waiting')" />
                  <FilterButton
                    label="Role"
                    :sortKey="sortKeyWaiting"
                    :sortAsc="sortAscWaiting"
                    @click="sortTable('Role', 'waiting')" />
                  <FilterButton
                    label="Avg. Talking Time"
                    :sortKey="sortKeyWaiting"
                    :sortAsc="sortAscWaiting"
                    @click="sortTable('AVGTalkingTime', 'waiting')" />
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th class="waiting-table-header" :colspan="rowsHeadArr.length">Agents waiting for a call</th>
          </tr>
          <tr class="row-head-panel">
            <th
              class="row-head"
              v-for="(rowHead, index) in rowsHeadArr"
              :key="index"
              :class="{ 'hidden-header': rowHead === 'Actions' }"
              @click="sortTable(rowHead, 'waiting')">
              {{ rowHead }}
              <img :class="{ 'rotated': sortAsc }" src="@/assets/img/icons/arrow-down-white.svg" alt="select" />
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr class="getRowClass(row.Duration)" v-for="(row, index) in sortedFilteredRowsWaiting" :key="index" class="row-waiting-table"> -->
            <tr v-for="(row, index) in sortedFilteredRowsWaiting" :key="index" :class="getRowClass(row.Duration)">


          <!-- <tr class="row-waiting-table" v-for="(row, index) in sortedFilteredRowsWaiting" :key="index"> -->
            <td class="values-table" v-for="(value, key, idx) in row" :key="idx">{{ value }}</td>
            <td class="content-list-item item-btn">
              <div style="visibility: hidden" class="buttons">
                <span class="btn" :class="{ able: row.Status === 'Talking', disabled: row.Status !== 'Talking' }"
                  >SPY</span
                >
                <span class="btn" :class="{ able: row.Status === 'Talking', disabled: row.Status !== 'Talking' }"
                  >WHISPER</span
                >
                <span class="btn" :class="{ able: row.Status === 'Talking', disabled: row.Status !== 'Talking' }"
                  >MERGE</span
                >
              </div>
            </td>
          </tr>
          <!-- </tr> -->
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th class="filter-panel" :colspan="rowsHeadArr.length">
              <div class="filter-container">
                <span class="filter-label">Filter by:</span>
                <div class="filter-buttons">
                  <FilterButton
                    label="Agent Name"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortAscNotWaiting"
                    @click="sortTable('AgentName', 'notWaiting')" />
                  <FilterButton
                    label="Role"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortAscNotWaiting"
                    @click="sortTable('Role', 'notWaiting')" />
                  <FilterButton
                    label="Status"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortAscNotWaiting"
                    @click="sortTable('Status', 'notWaiting')" />
                  <FilterButton
                    label="Avg. Talking Time"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortAscNotWaiting"
                    @click="sortTable('AVGTalkingTime', 'notWaiting')" />
                </div>
              </div>
            </th>
          </tr>
          <tr class="row-head-panel">
            <th
              class="row-head"
              v-for="(rowHead, index) in rowsHeadArr"
              :key="index"
              @click="sortTable(rowHead, 'notWaiting')">
              {{ rowHead }}
              <img :class="{ 'rotated': sortAsc }" src="@/assets/img/icons/arrow-down-white.svg" alt="select" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in sortedFilteredRowsNotWaiting" :key="index" class="table-row">
            <td
              v-for="(value, key, idx) in row"
              :key="idx"
              :class="getStatusClass(row.Status, key)"
              class="values-table">
              {{ value }}
            </td>

            <td class="content-list-item item-btn">
              <div class="buttons">
                <span class="btn" :class="{ able: row.Status === 'Talking', disabled: row.Status !== 'Talking' }"
                  >SPY</span
                >
                <span class="btn" :class="{ able: row.Status === 'Talking', disabled: row.Status !== 'Talking' }"
                  >WHISPER</span
                >
                <span class="btn" :class="{ able: row.Status === 'Talking', disabled: row.Status !== 'Talking' }"
                  >MERGE</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FilterButton from "@/components/FilterButton.vue";

export default {
  name: "AgentsTable",
  components: {
    FilterButton,
  },
  data() {
    return {
      rows: [
        {
          AgentName: "abc",
          Role: "Agent",
          AgentId: "123456789",
          Status: "Waiting",
          Duration: 2.48,
          AVGTalkingTime: "2m 3s",
          Calls: 91,
        },
        {
          AgentName: "def",
          Role: "Agent",
          AgentId: "987654321",
          Status: "Waiting",
          Duration: 7.41,
          AVGTalkingTime: "2m 3s",
          Calls: 28,
        },
        {
          AgentName: "ghi",
          Role: "Admin",
          AgentId: "456123789",
          Status: "Paused",
          Duration: 6.0,
          AVGTalkingTime: "2m 3s",
          Calls: 4,
        },
        {
          AgentName: "jkl",
          Role: "Agent",
          AgentId: "159264873",
          Status: "In Disposition",
          Duration: 5.3,
          AVGTalkingTime: "2m 3s",
          Calls: 7,
        },
        {
          AgentName: "ano",
          Role: "Agent",
          AgentId: "353428619",
          Status: "Talking",
          Duration: 1.9,
          AVGTalkingTime: "1m 3s",
          Calls: 39,
        },
        {
          AgentName: "pqr",
          Role: "Admin",
          AgentId: "852963741",
          Status: "Waiting",
          Duration: 3.0,
          AVGTalkingTime: "2m 3s",
          Calls: 65,
        },
        {
          AgentName: "mno",
          Role: "Agent",
          AgentId: "753428619",
          Status: "Talking",
          Duration: 1.9,
          AVGTalkingTime: "2m 3s",
          Calls: 65,
        },
      ],
      rowsHeadArr: ["AgentName", "Role", "AgentId", "Status", "Duration", "AVGTalkingTime", "Calls", "Actions"],
      sortKeyWaiting: "AgentName",
      sortAscWaiting: true,
      sortKeyNotWaiting: "AgentName",
      sortAscNotWaiting: true,
    };
  },
  computed: {
    sortedFilteredRowsWaiting() {
      return this.sortRows(this.filteredRowsWaiting, "waiting");
    },
    sortedFilteredRowsNotWaiting() {
      return this.sortRows(this.filteredRowsNotWaiting, "notWaiting");
    },
    filteredRowsWaiting() {
      return this.rows.filter((row) => row.Status === "Waiting");
    },
    filteredRowsNotWaiting() {
      return this.rows.filter((row) => row.Status !== "Waiting");
    },
  },
  methods: {
    sortTable(key, type) {
      if (type === "waiting") {
        this.sortKeyWaiting = key;
        this.sortAscWaiting = !this.sortAscWaiting;
      } else {
        this.sortKeyNotWaiting = key;
        this.sortAscNotWaiting = !this.sortAscNotWaiting;
      }
    },
    sortRows(rows, type) {
      const sortKey = type === "waiting" ? this.sortKeyWaiting : this.sortKeyNotWaiting;
      const sortAsc = type === "waiting" ? this.sortAscWaiting : this.sortAscNotWaiting;

      return rows.slice().sort((a, b) => {
        let comparison = 0;

        if (a[sortKey] > b[sortKey]) comparison = 1;
        else if (a[sortKey] < b[sortKey]) comparison = -1;

        return sortAsc ? comparison : -comparison;
      });
    },

    sumTalkingAgents() {
      return this.rows.filter((row) => row.Status === "Talking").length;
    },
    countUniqueAgents() {
      const allRows = [...this.sortedFilteredRowsWaiting, ...this.sortedFilteredRowsNotWaiting];
      const uniqueAgents = new Set(allRows.map((row) => row.AgentName));
      return uniqueAgents.size;
    },
    getStatusClass(status, key) {
      if (key === "Status" || key === "Duration") {
        switch (status) {
          case "In Disposition":
            return "in-disposition";
          case "Paused":
            return "paused";
          case "Talking":
            return "talking";
          default:
            return "";
        }
      }
      return "";
    },
    getRowClass(duration) {
      return duration <= 3 ? 'short-duration' : 'long-duration';
    },
  },
};
</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tables {
  width: 100%;
  border: #1f2833 3px solid;
}

th,
td {
  padding: 8px;
  text-align: left;
  min-width: 140px;
}

.filter-panel {
  text-align: left;
}
.filter-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-label {
  margin-right: 3px;
}

.filter-buttons {
  display: flex;
  gap: 3px;
}

.filter-button {
  border-radius: 6px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.filter-button img {
  width: 12px;
  height: 12px;
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.filter-button img.rotated {
  transform: rotate(180deg);
}

th {
  cursor: pointer;
}

th img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-left: 5px;
}

thead tr:first-child th {
  background: var(--paginator-item);
}

.filter-button {
  border-radius: 6px;
  background-color: #546e7a4f;
  border: none;
  padding: 5px 10px;
  margin: 2px;
  cursor: pointer;
}
.waiting-table-header {
  font-weight: initial;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  transform: translateX(-60px);
}

.content-list-item {
  font-weight: normal;
  line-height: 16px;
  position: relative;
}
.values-table {
  font-size: 15px;
}

.hidden-header {
  visibility: hidden;
}
.hidden-header span {
  display: none;
}

.row-head {
  padding-bottom: 20px;
  font-weight: initial;
  font-size: 13px;
  color: var(--agent-card-color);
}

.table-row {
  border-bottom: 2.5px var(--paginator-item) solid;
  height: 45px;
}

.table-row:last-child {
  border-bottom: none;
}

.row-waiting-table {
  height: 45px;
}

.item-btn {
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 25px;
  position: relative;
}
.btn {
  cursor: pointer;
  border-radius: 4px;
  padding: 2px 9px;
  font-size: 14px;
  line-height: 16px;
  margin-right: 6px;
}

.btn.disabled {
  pointer-events: none;
  background: var(--paginator-item);
  border: var(--agent-card-border);
  color: var(--paginator-arrow-disabled);
}

.btn.able {
  border: 1px solid #296ba0;
  background: var(--paginator-item);
  color: var(--paginator-arrow);
}

button img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-left: 5px;
}

.in-disposition {
  color: #296ba0;
}
.paused {
  color: #fcaf00;
}
.talking {
  color: #2db152;
}

.squares {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* width: 100%; */
  margin-bottom: 20px;
  margin-right: 7%;
}
.square {
  position: relative;
  width: 100px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #19222c, #3c4753);
  padding: 10px;
  border-radius: 3px;
  color: #fff;
  margin: 5px;
  margin-right: -7%;
  text-align: center;
  padding-top: 50px;
}
.square:nth-child(4n) {
  margin-right: -3%;
}

.square:nth-child(7n) {
  margin-right: -3%;
}
.small-square {
  align-items: center;
  justify-content: center;
  background: #323a45;
  border-radius: 3px;
  color: #fff;
  margin: 5px;
  text-align: center;
  position: absolute;
  top: -10px;
  right: -10%;
  transform: translateX(-50%);
  width: 18px;
  height: 10px;
}
.medium-square-dial-level {
  background: linear-gradient(to bottom, #314457, #3b4c60);
  border-radius: 3px;
  color: #fff;
  text-align: center;
  width: 90%;
  height: 32%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.medium-square-dialable-leads {
  background: linear-gradient(to bottom, #314457, #3b4c60);
  border-radius: 3px;
  color: #fff;
  text-align: center;
  width: 75%;
  height: 32%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.big-square {
  position: relative;
  width: 120px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #19222c, #3c4753);
  padding: 10px;
  border-radius: 3px;
  color: #fff;
  margin: 5px;
  margin-right: -7%;
  text-align: center;
  padding-top: 50px;
}
.icon {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
}
.small-icon {
  position: absolute;
  top: 33%;
  left: 80%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  filter: brightness(0) invert(1);
}
.x {
  position: absolute;
  top: 23%;
  left: 62%;
  transform: translateX(-50%);
  font-size: 25px;
  filter: brightness(0) invert(1);
  font-weight: calc(12);
}
.percent {
  color: #bdbbbb;
  margin: 5px;
  text-align: center;
  position: absolute;
  top: -10px;
  right: -2%;
  transform: translateX(-50%);
  font-size: 10px;
}
.call-mode {
  font-size: 10px;
}
.number {
  display: block;
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: calc(12);
  color: #fff;
}

.short-duration {
  border-radius: 20px;
  border: none;
  margin-bottom: 12px;
  background-color: #3A5378;
}

.long-duration {
  border-radius: 6px;
  border: none;
  margin-bottom: 12px;
  /* cursor: pointer;
  display: flex;
  align-items: center; */
  background-color: #173F75;
}
</style>
