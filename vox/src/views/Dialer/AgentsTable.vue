<template class="template">
  <div>
    <div class="squares">
      <div class="square">
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="Active calls icon" class="icon" />
        <span class="number">
          <!-- {{ sumTalkingAgents() }} -->
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
          <!-- {{ countUniqueAgents() }} -->
        </span>
        <div class="call-mode">Agents in calls Logged in</div>
      </div>
      <div class="big-square">
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="avg. Talking time icon" class="icon" />
        <div class="call-mode">avg. Talking time</div>
      </div>
    </div>

    <div class="tables">
      <!-- Table for Waiting Agents -->
      <table>
        <thead>
          <tr>
            <th class="filter-panel" :colspan="rowsHeadArr.length">
              <div class="filter-container">
                <span class="filter-label">Filter by:</span>
                <div class="filter-buttons">
                  <FilterButton
                    label="Agent Name"
                    :sortAsc="sortKeyWaiting === 'name' ? sortAscWaiting : true"
                    :sortKey="sortKeyWaiting"
                    @click="sortTable('name', 'waiting')" />
                  <FilterButton
                    label="Role"
                    :sortAsc="sortKeyWaiting === 'permission.role' ? sortAscWaiting : true"
                    :sortKey="sortKeyWaiting"
                    @click="sortTable('permission.role', 'waiting')" />
                  <FilterButton
                    label="Avg. Talking Time"
                    :sortAsc="sortKeyWaiting === 'AVGTalkingTime' ? sortAscWaiting : true"
                    :sortKey="sortKeyWaiting"
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
              <img :src="sortArrow" :class="{ rotated: isSortedAscending(rowHead, 'waiting') }" alt="select" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in sortedFilteredRowsWaiting" :key="row.uid" :class="getRowClass(row.Duration)">
            <td class="values-table">{{ row.name }}</td>
            <td class="values-table">{{ row.permission.role }}</td>
            <td class="values-table">{{ row.internalNumber }}</td>
            <td class="values-table">{{ row.status }}</td>
            <td class="values-table"></td>
            <td class="values-table">{{ calculateDuration(row.statusTime) }}</td>
            <td class="content-list-item item-btn">
              <div style="visibility: hidden" class="buttons">
                <span
                  class="btn"
                  @click="spy(item)"
                  :class="{ able: row.status === 'talking', disabled: row.status !== 'Talking' }"
                  >SPY</span
                >
                <span
                  class="btn"
                  @click="whisper(item)"
                  :class="{ able: row.status === 'talking', disabled: row.status !== 'Talking' }"
                  >WHISPER</span
                >
                <span
                  class="btn"
                  @click="merge(item)"
                  :class="{ able: row.status === 'talking', disabled: row.status !== 'Talking' }"
                  >MERGE</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Table for Non-Waiting Agents -->
      <table>
        <thead>
          <tr>
            <th class="filter-panel" :colspan="rowsHeadArr.length">
              <div class="filter-container">
                <span class="filter-label">Filter by:</span>
                <div class="filter-buttons">
                  <FilterButton
                    label="Agent Name"
                    :sortAsc="sortKeyNotWaiting === 'name' ? sortAscNotWaiting : true"
                    :sortKey="sortKeyNotWaiting"
                    @click="sortTable('name', 'notWaiting')" />
                  <FilterButton
                    label="Role"
                    :sortAsc="sortKeyNotWaiting === 'permission.role' ? sortAscNotWaiting : true"
                    :sortKey="sortKeyNotWaiting"
                    @click="sortTable('permission.role', 'notWaiting')" />
                  <FilterButton
                    label="Status"
                    :sortAsc="sortKeyNotWaiting === 'Status' ? sortAscNotWaiting : true"
                    :sortKey="sortKeyNotWaiting"
                    @click="sortTable('status', 'notWaiting')" />
                  <FilterButton
                    label="Avg. Talking Time"
                    :sortAsc="sortKeyNotWaiting === 'AVGTalkingTime' ? sortAscNotWaiting : true"
                    :sortKey="sortKeyNotWaiting"
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
              <img :src="sortArrow" :class="{ rotated: isSortedAscending(rowHead, 'notWaiting') }" alt="select" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in sortedFilteredRowsNotWaiting" :key="row.uid" class="table-row">
            <td class="values-table">{{ row.name }}</td>
            <td class="values-table">{{ row.permission.role }}</td>
            <td class="values-table">{{ row.internalNumber }}</td>
            <td class="values-table">{{ row.status }}</td>
            <td class="values-table"></td>
            <td class="values-table">{{ calculateDuration(row.statusTime) }}</td>
            <td class="content-list-item item-btn">
              <div class="acions-buttons">
                <span class="btn" :class="{ able: row.status === 'Talking', disabled: row.status !== 'Talking' }">
                  SPY
                </span>
                <span class="btn" :class="{ able: row.status === 'Talking', disabled: row.status !== 'Talking' }">
                  WHISPER
                </span>
                <span class="btn" :class="{ able: row.status === 'Talking', disabled: row.status !== 'Talking' }">
                  MERGE
                </span>
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
import sortArrow from "@/assets/img/icons/sort-arrow.svg";

export default {
  name: "AgentsTable",
  components: {
    FilterButton,
  },
  data() {
    return {
      sortArrow: sortArrow,
      ws: null, // WebSocket connection
      rows: [], // Data received from WebSocket
      errorMessage: "", // Error message
      rowsHeadArr: ["Agent Name", "Role", "Agent ID", "Status", "Avg. Talking Time", "Duration", "Actions"], // Headers
      sortKeyWaiting: "", // Key for sorting waiting agents
      sortKeyNotWaiting: "", // Key for sorting not-waiting agents
      sortAscWaiting: true, // Sort ascending for waiting agents
      sortAscNotWaiting: true, // Sort ascending for not-waiting agents
    };
  },
  created() {
    this.fetchData();
    console.log("WebSocket connection opened");
  },
  computed: {
    // sortedFilteredRowsWaiting() {
    //   // Return filtered and sorted rows for waiting agents
    //   return this.filterAndSortRows(this.rows, "waiting");
    // },
    // sortedFilteredRowsNotWaiting() {
    //   // Return filtered and sorted rows for not-waiting agents
    //   return this.filterAndSortRows(this.rows, "notWaiting");
    // }
    sortedFilteredRowsWaiting() {
      // Return filtered and sorted rows for waiting agents
      return this.filterAndSortRows(
        Object.values(this.rows).filter((row) => row.status !== "Waiting"),
        // this.rows.filter((row) => row.Status === "Waiting"),
        this.sortKeyWaiting,
        this.sortAscWaiting
      );
    },
    sortedFilteredRowsNotWaiting() {
      // Return filtered and sorted rows for not-waiting agents
      return this.filterAndSortRows(
        Object.values(this.rows).filter((row) => row.status !== "notWaiting"),
        // this.rows.filter((row) => row.Status === "notWaiting"),
        this.sortKeyNotWaiting,
        this.sortAscNotWaiting
      );
    },
  },
  methods: {
    async fetchData() {
      this.ws = new WebSocket(`${window.env.WS_URL}/agent-map`, localStorage.getItem("token"));

      this.ws.onmessage = (event) => {
        try {
          const rows = JSON.parse(event.data);
          if (rows.user != undefined) {
            console.log("Parsed data:", rows.user); // Logging parsed data
            this.rows = rows.user;
            console.log(this.ro);
          }
        } catch (e) {
          this.errorMessage = "Error parsing data.";
        }
      };

      this.ws.onerror = (error) => {
        this.errorMessage = "WebSocket error";
        console.error("WebSocket error:", error);
      };

      this.ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
    },
    beforeDestroy() {
      // Close the WebSocket connection when the component is destroyed
      if (this.ws) {
        this.ws.close();
      }
    },
    spy(item) {
      this.$store.commit("showPhoneMutation", true);
      this.$store.dispatch("sipCall", `1*${item.internalNumber}`);
    },
    whisper(item) {
      this.$store.commit("showPhoneMutation", true);
      this.$store.dispatch("sipCall", `2*${item.internalNumber}`);
    },
    merge() {
      this.$store.commit("showPhoneMutation", true);
      this.$store.dispatch("sipCall", `3*${item.internalNumber}`);
    },
    // filterAndSortRows(rows, sortKey, sortAsc) {
    //   return rows.sort((a, b) => {
    //     if (sortKey) {
    //       const aVal = a[sortKey];
    //       const bVal = b[sortKey];
    //       if (aVal < bVal) return sortAsc ? -1 : 1;
    //       if (aVal > bVal) return sortAsc ? 1 : -1;
    //     }
    //     return 0;
    //   });
    // },
    filterAndSortRows(rows, sortKey, sortAsc) {
      return rows.sort((a, b) => {
        const keys = sortKey.split(".");
        let aVal = a;
        let bVal = b;

        keys.forEach((key) => {
          aVal = aVal[key];
          bVal = bVal[key];
        });

        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      });
    },
    // sortTable(column, tableType) {
    //   if (tableType === "waiting") {
    //     this.sortKeyWaiting = column;
    //     this.sortAscWaiting = this.sortKeyWaiting === column ? !this.sortAscWaiting : true;
    //   } else if (tableType === "notWaiting") {
    //     this.sortKeyNotWaiting = column;
    //     this.sortAscNotWaiting = this.sortKeyNotWaiting === column ? !this.sortAscNotWaiting : true;
    //   }
    // },
    sortTable(key, type) {
      if (type === "waiting") {
        if (this.sortKeyWaiting === key) {
          this.sortAscWaiting = !this.sortAscWaiting;
        } else {
          this.sortAscWaiting = true;
        }
        this.sortKeyWaiting = key;
      } else if (type === "notWaiting") {
        if (this.sortKeyNotWaiting === key) {
          this.sortAscNotWaiting = !this.sortAscNotWaiting;
        } else {
          this.sortAscNotWaiting = true;
        }
        this.sortKeyNotWaiting = key;
      }
    },

    getRowClass(duration) {
      return duration >= 10 ? "highlight-row" : "";
    },
    getStatusClass(status, key) {
      return status === "Talking" && key !== "Actions" ? "highlight-status" : "";
    },
    sumTalkingAgents() {
      return this.rows.filter((row) => row.status === "Talking").length;
    },
    countUniqueAgents() {
      const uniqueAgents = new Set(this.rows.map((row) => row.name));
      return uniqueAgents.size;
    },
    isSortedAscending(rowHead, type) {
      const sortKey = type === "waiting" ? this.sortKeyWaiting : this.sortKeyNotWaiting;
      const sortAsc = type === "waiting" ? this.sortAscWaiting : this.sortAscNotWaiting;
      return sortKey === rowHead && sortAsc;
    },
    calculateDuration(statusTime) {
      const parsedTime = new Date(statusTime); // המרה ל- Date
      const currentTime = new Date(); // זמן נוכחי
      const duration = currentTime - parsedTime; // חישוב הפרש הזמן במילישניות

      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);

      return ` ${minutes} minutes, ${seconds} seconds`;
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

.row-head {
  padding-bottom: 20px;
  font-weight: initial;
  font-size: 13px;
  color: var(--agent-card-color);
}

.row-head img {
  width: 12px;
  height: 12px;
  margin-left: 5px;
  transition: transform 0.3s ease;
  transform: rotate(0deg); /* חץ כלפי מטה כברירת מחדל */
}

.row-head img.rotated {
  transition: transform 0.3s ease;
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

.values-table {
  font-size: 15px;
}

.hidden-header {
  visibility: hidden;
  display: none;
}
.hidden-header span {
  display: none;
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

.acions-buttons {
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 25px;
  position: relative;
}

.acions-buttons .btn {
  cursor: pointer;
  border-radius: 4px;
  padding: 2px 9px;
  font-size: 14px;
  line-height: 16px;
  margin-right: 6px;
}

.acions-buttons .btn.disabled {
  pointer-events: none;
  background: var(--paginator-item);
  border: var(--agent-card-border);
  color: var(--paginator-arrow-disabled);
}

.acions-buttons .btn.able {
  border: 1px solid #296ba0;
  background: var(--paginator-item);
  color: var(--paginator-arrow);
}

.blue {
  color: #296ba0;
}
.yellow {
  color: #fcaf00;
}
.green {
  color: #2db152;
}

.squares {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
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
  background-color: #3a5378;
}

.long-duration {
  border-radius: 6px;
  border: none;
  margin-bottom: 12px;
  background-color: #173f75;
}
</style>
