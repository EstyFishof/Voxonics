<template>
  <div>
    <!-- Dashboard Squares -->
    <div class="squares">
      <!-- Squares for various metrics, using real data -->
      <div class="square">
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="Active calls icon" class="icon" />
        <span class="number">
          {{ this.agentOnline }}
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
        <span class="number"> {{ this.agentInCalls }} | {{ this.loggedIn }} </span>
        <div class="call-mode">Agents in calls Logged in</div>
      </div>
      <div class="big-square">
        <img src="@/assets/img/icons/TalkingIcon.svg" alt="avg. Talking time icon" class="icon" />
        <div class="call-mode">avg. Talking time</div>
      </div>
    </div>

    <!-- Tables for agent data -->
    <div class="tables">
      <!-- Waiting Table -->
      <table>
        <thead>
          <tr>
            <th :colspan="rowsHeadArr.length">
              <div class="filter-container">
                <span class="filter-label">Filter by:</span>
                <div class="filter-buttons">
                  <FilterButton
                    label="Agent Name"
                    :sortAsc="sortKeyWaiting === 'AgentName' ? sortAscWaiting : true"
                    :sortKey="sortKeyWaiting"
                    @click="sortTable('AgentName', 'waiting')" />
                  <FilterButton
                    label="Role"
                    :sortKey="sortKeyWaiting"
                    :sortAsc="sortKeyWaiting === 'Role' ? sortAscWaiting : true"
                    @click="sortTable('Role', 'waiting')" />
                  <FilterButton
                    label="Avg. Talking Time"
                    :sortKey="sortKeyWaiting"
                    :sortAsc="sortKeyWaiting === 'AVGTalkingTime' ? sortAscWaiting : true"
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
          <tr v-for="(row, index) in sortedFilteredRowsWaiting" :key="index" class="table-row">
            <td class="values-table" v-for="(value, key, idx) in row" :key="idx">{{ value }}</td>
            <td class="actions-buttons" style="visibility: hidden">
              <span class="action" :class="{ able: row.Status === 'online', disabled: row.Status !== 'online' }"
                >SPY</span
              >
              <span class="action" :class="{ able: row.Status === 'online', disabled: row.Status !== 'online' }"
                >WHISPER</span
              >
              <span class="action" :class="{ able: row.Status === 'online', disabled: row.Status !== 'online' }"
                >MERGE</span
              >
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Not Waiting Table -->
      <table>
        <thead>
          <tr>
            <th :colspan="rowsHeadArr.length">
              <div class="filter-container">
                <span class="filter-label">Filter by:</span>
                <div class="filter-buttons">
                  <FilterButton
                    label="Agent Name"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortKeyNotWaiting === 'AgentName' ? sortAscNotWaiting : true"
                    @click="sortTable('AgentName', 'notWaiting')" />
                  <FilterButton
                    label="Role"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortKeyNotWaiting === 'Role' ? sortAscNotWaiting : true"
                    @click="sortTable('Role', 'notWaiting')" />
                  <FilterButton
                    label="Status"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortKeyNotWaiting === 'Status' ? sortAscNotWaiting : true"
                    @click="sortTable('Status', 'notWaiting')" />
                  <FilterButton
                    label="Avg. Talking Time"
                    :sortKey="sortKeyNotWaiting"
                    :sortAsc="sortKeyNotWaiting === 'AVGTalkingTime' ? sortAscNotWaiting : true"
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
          <tr v-for="(row, index) in sortedFilteredRowsNotWaiting" :key="index" class="table-row">
            <td
              v-for="(value, key, idx) in row"
              :key="idx"
              :class="getStatusClass(row.Status, key)"
              class="values-table">
              {{ value }}
            </td>
            <td class="actions-buttons">
              <span
                class="action"
                @click="spy(row)"
                :class="{ able: row.Status === 'online', disabled: row.Status !== 'online' }"
                >SPY</span
              >
              <span
                class="action"
                @click="whisper(row)"
                :class="{ able: row.Status === 'online', disabled: row.Status !== 'online' }"
                >WHISPER</span
              >
              <span
                class="action"
                @click="merge(row)"
                :class="{ able: row.Status === 'online', disabled: row.Status !== 'online' }"
                >MERGE</span
              >
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
      rows: [
        {
          AgentName: "def",
          Role: "agent",
          ID: "123",
          Status: "paused",
          Duration: "7 m, 41 s",
          AVGTalkingTime: "2m 3s",
          Calls: 91,
        },
      ], // Initialize with an empty array, will be populated with real data
      rowsHeadArr: ["AgentName", "Role", "ID", "Status", "Duration", "AVGTalkingTime", "Calls", "Actions"],
      sortKeyWaiting: "",
      sortAscWaiting: true,
      sortKeyNotWaiting: "",
      sortAscNotWaiting: true,
      agentOnline: 0,
      agentInCalls: 0,
      loggedIn: 0,
      ws: null,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    sortedFilteredRowsWaiting() {
      return this.sortAndFilter(
        this.rows.filter((row) => row.Status === "Waiting"),
        this.sortKeyWaiting,
        this.sortAscWaiting
      );
    },
    sortedFilteredRowsNotWaiting() {
      return this.sortAndFilter(
        this.rows.filter((row) => row.Status !== "Waiting"),
        this.sortKeyNotWaiting,
        this.sortAscNotWaiting
      );
    },
  },
  methods: {
    calculateDuration(statusTime) {
      const parsedTime = new Date(statusTime); // המרה ל- Date
      const currentTime = new Date(); // זמן נוכחי
      const duration = currentTime - parsedTime; // חישוב הפרש הזמן במילישניות
      const totalMinutes = Math.floor(duration / (1000 * 60)); // חישוב סך כל הדקות שהצטברו
      const remainingMinutes = totalMinutes % 1440; // חישוב הדקות שלא הצטברו ליום שלם
      const remainingSeconds = Math.floor((duration % (1000 * 60)) / 1000); // חישוב השניות הנוספות

      return ` ${remainingMinutes} m, ${remainingSeconds} s`;
    },
    async fetchData() {
      // Create the WebSocket connection
      this.ws = new WebSocket(`${window.env.WS_URL}/agent-map`, localStorage.getItem("token"));

      // Handle incoming messages
      this.ws.onmessage = (event) => {
        console.log("WebSocket message received:", JSON.parse(event.data)); // Logging raw data
        try {
          const parsedData = JSON.parse(event.data);
          //console.log('Status:', parsedData.data.statusText); // Logging raw data
          console.log("Parsed data:", parsedData.user); // Logging parsed data
          // Assuming `parsedData` has a `data` property that is an array of objects
          const users = parsedData.user;
          Object.keys(users).forEach((key) => {
            const user = users[key];
            console.log("user is: ", user);
            this.rows.push({
              AgentName: user.name,
              Role: user.permission.role,
              ID: user.internalNumber,
              Status: user.status,
              Duration: this.calculateDuration(user.statusTime), // Replace with actual duration if available
              AVGTalkingTime: "2m 3s", // Replace with actual talking time if available
              Calls: 91, // Replace with actual call count if available
            });
          });
          this.agentOnline = this.rows.filter((rows) => rows.Status === "online").length;
          this.agentInCalls = this.rows.filter((rows) => rows.Status === "online" || rows.Status === "paused").length;
          this.loggedIn = this.rows.filter((rows) => rows.Status !== "offline").length;
        } catch (e) {
          this.errorMessage = "Error parsing data.";
          console.error("Error parsing data:", e);
        }
      };

      // Handle errors
      this.ws.onerror = (error) => {
        this.errorMessage = "WebSocket error: " + error.message;
      };

      // Handle connection close
      this.ws.onclose = (event) => {
        if (event.wasClean) {
          console.log("Connection closed cleanly");
        } else {
          this.errorMessage = "Connection closed abruptly";
        }
      };
    },
    sortTable(key, tableType) {
      if (tableType === "waiting") {
        this.sortKeyWaiting = key;
        this.sortAscWaiting = !this.sortAscWaiting;
      } else {
        this.sortKeyNotWaiting = key;
        this.sortAscNotWaiting = !this.sortAscNotWaiting;
      }
    },
    isSortedAscending(rowHead, type) {
      const sortKey = type === "waiting" ? this.sortKeyWaiting : this.sortKeyNotWaiting;
      const sortAsc = type === "waiting" ? this.sortAscWaiting : this.sortAscNotWaiting;
      return sortKey === rowHead && sortAsc;
    },
    sortAndFilter(rows, sortKey, sortAsc) {
      return rows.slice().sort((a, b) => {
        if (sortKey) {
          const aVal = a[sortKey];
          const bVal = b[sortKey];
          if (aVal < bVal) return sortAsc ? -1 : 1;
          if (aVal > bVal) return sortAsc ? 1 : -1;
        }
        return 0;
      });
    },
    getStatusClass(status, key) {
      if (key === "Status" || key === "Duration") {
        return {
          "in-disposition": status === "offline",
          paused: status === "paused",
          online: status === "online",
        };
      }
      return "";
    },

    spy(item) {
      this.$store.commit("showPhoneMutation", true);
      this.$store.dispatch("sipCall", `1*${item.Status}`);
    },
    whisper(item) {
      this.$store.commit("showPhoneMutation", true);
      this.$store.dispatch("sipCall", `2*${item.Status}`);
    },
    merge() {
      this.$store.commit("showPhoneMutation", true);
      this.$store.dispatch("sipCall", `3*${item.internalNumber}`);
    },
  },

  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
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
  border: #1f2833 3px solid;
}

th,
td {
  padding: 8px;
  text-align: left;
  min-width: 140px;
}

.filter-container {
  text-align: left;
  display: flex;
  gap: 5px;
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

.waiting-table-header {
  color: var(--font-panel);
  font-weight: initial;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  transform: translateX(-60px);
}

.values-table {
  font-size: 15px;
  color: var(--font-panel);
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
.row-head img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-left: 5px;
  transition: transform 0.3s ease;
  transform: rotate(0deg); /* חץ כלפי מטה כברירת מחדל */
}
.row-head img.rotated {
  transform: rotate(180deg); /* חץ כלפי מעלה לאחר לחיצה */
}

.table-row {
  border-bottom: 2.5px var(--paginator-item) solid;
  height: 45px;
}

.table-row:last-child {
  border-bottom: none;
}

/* .row-waiting-table {
  height: 45px;
} */

.actions-buttons {
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 25px;
  position: relative;
}
.actions-buttons .action {
  cursor: pointer;
  border-radius: 4px;
  padding: 2px 9px;
  font-size: 14px;
  line-height: 16px;
  margin-right: 6px;
}

.actions-buttons .action.disabled {
  pointer-events: none;
  background: var(--paginator-item);
  border: var(--agent-card-border);
  color: var(--paginator-arrow-disabled);
}

.actions-buttons .action.able {
  border: 1px solid #296ba0;
  background: var(--paginator-item);
  color: var(--paginator-arrow);
}
.in-disposition {
  color: #296ba0;
}
.paused {
  color: #fcaf00;
}
.online {
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
  /* color: #fff; */
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
  /* color: #fff; */
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
  /* color: #fff; */
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
  /* color: #fff; */
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
  /* color: #fff; */
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
  /* color: #bdbbbb; */
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
  /* color: #fff; */
}
</style>
