
<template>
  <div class="container">
    <div class="tables-container">
      <div class="main-table">
        <table class="agents-table">
          <thead>
            <tr class="header-row">
              <th></th>
              <th @click="sort('name')"> Name<i :class="getSortIcon('name')"></i></th>
              <th @click="sort('id')">ID <i :class="getSortIcon('id')"></i></th>
              <th @click="sort('department')">Department <i :class="getSortIcon('department')"></i></th>
              <th @click="sort('position')">Position <i :class="getSortIcon('position')"></i></th>
              <th class="actions-header"></th>
            </tr>
            <tr class="filter-row">
              <th>Select</th>
              <th><input type="text" v-model="filters.name" placeholder="Filter by Name" /></th>
              <th><input type="text" v-model="filters.id" placeholder="Filter by ID" /></th>
              <th>
                <select v-model="filters.department">
                  <option value="">Select Departments</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                </select>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in filteredAgents" :key="agent.id">
              <label>
        <input type="checkbox" v-model="selectedInSelectedTable" :value="agent" />
        <span></span>
      </label>
              <td>{{ agent.name }}</td>
              <td>{{ agent.id }}</td>
              <td>{{ agent.department }}</td>
              <td>{{ agent.position }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="button-container">
          <button class="agent-btn" @click="addAgents">Add Agent <i class="icon-user"></i></button>
        </div>
      </div>
      <div class="arrow-container">
        <span class="arrow-right">→</span>
        <span class="arrow-left">←</span>
      </div>
      <div class="selected-table">
        <table class="selected-agents-table">
          <thead>
            <tr class="header-row">
              <th></th>
              <th @click="sort('name', true)">Name <i :class="getSortIcon('name', true)"></i></th>
              <th @click="sort('id', true)">ID <i :class="getSortIcon('id', true)"></i></th>
              <th @click="sort('department', true)">Department <i :class="getSortIcon('department', true)"></i></th>
              <th @click="sort('position', true)">Position <i :class="getSortIcon('position', true)"></i></th>
              <th class="actions-header"></th>
            </tr>
            <tr class="filter-row">
              <th>Select</th>
              <th><input type="text" v-model="selectedFilters.id" placeholder="Filter by ID" /></th>
              <th><input type="text" v-model="selectedFilters.name" placeholder="Filter by Name" /></th>
              <th>
                <select v-model="selectedFilters.department">
                  <option value="">Select Departments</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                </select>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in filteredSelectedAgents" :key="agent.id">
              <td><input type="checkbox" v-model="selectedInSelectedTable" :value="agent" /></td>
              <td>{{ agent.name }}</td>
              <td>{{ agent.id }}</td>
              <td>{{ agent.department }}</td>
              <td>{{ agent.position }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="button-container">
          <button class="remove-agent-btn" @click="removeAgents">Remove Agent <i class="icon-user"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agents: [
        { name: "avi", id: 11, department: "sales", position: "manager" },
        { name: "dani", id: 22, department: "sales", position: "manager" },
        { name: "beny", id: 33, department: "sales", position: "manager" },
        { name: "natan", id: 44, department: "support", position: "manager" },
        { name: "moshe", id: 55, department: "sales", position: "manager" },
        { name: "levi", id: 66, department: "support", position: "manager" }

      ],
      filters: {
        name: "",
        id: "",
        department: ""
      },
      selectedAgents: [],
      addedAgents: [],
      selectedFilters: {
        name: "",
        id: "",
        department: ""
      },
      selectedInSelectedTable: [],
      sortConfig: {
        column: '',
        direction: 'asc', // or 'desc'
        table: 'agents' // Default to the main table
      }
    };
  },
  computed: {
    filteredAgents() {
      let agents = [...this.agents];
      if (this.sortConfig.table === 'agents' && this.sortConfig.column) {
        agents.sort((a, b) => {
          let valueA = a[this.sortConfig.column];
          let valueB = b[this.sortConfig.column];
          if (this.sortConfig.direction === 'asc') {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        });
      }
      return agents.filter(agent => {
        return (
          (this.filters.name === "" || agent.name.includes(this.filters.name)) &&
          (this.filters.id === "" || agent.id.toString().includes(this.filters.id)) &&
          (this.filters.department === "" || agent.department === this.filters.department)
        );
      });
    },
    filteredSelectedAgents() {
      let agents = [...this.addedAgents];
      if (this.sortConfig.table === 'addedAgents' && this.sortConfig.column) {
        agents.sort((a, b) => {
          let valueA = a[this.sortConfig.column];
          let valueB = b[this.sortConfig.column];
          if (this.sortConfig.direction === 'asc') {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        });
      }
      return agents.filter(agent => {
        return (
          (this.selectedFilters.name === "" || agent.name.includes(this.selectedFilters.name)) &&
          (this.selectedFilters.id === "" || agent.id.toString().includes(this.selectedFilters.id)) &&
          (this.selectedFilters.department === "" || agent.department === this.selectedFilters.department)
        );
      });
    }
  },
  methods: {
    addAgents() {
      // Remove duplicates before adding
      const uniqueSelected = [...new Set([...this.addedAgents, ...this.selectedAgents])];
      this.addedAgents = uniqueSelected;
      this.selectedAgents = [];
    },
    removeAgents() {
      this.addedAgents = this.addedAgents.filter(agent => !this.selectedInSelectedTable.includes(agent));
      this.selectedInSelectedTable = [];
    },
    sort(column, isSelectedTable = false) {
      if (this.sortConfig.column === column) {
        this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortConfig.column = column;
        this.sortConfig.direction = 'asc';
      }
      this.sortConfig.table = isSelectedTable ? 'addedAgents' : 'agents';
    },
    getSortIcon(column, isSelectedTable = false) {
      if (this.sortConfig.table !== (isSelectedTable ? 'addedAgents' : 'agents') || this.sortConfig.column !== column) return '';
      return this.sortConfig.direction === 'asc' ? 'icon-sort-up' : 'icon-sort-down';
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #1c1d21;
  color:#e0e3e6;
  padding: 20px;
}

.tables-container {
  display: flex;
  justify-content: space-between;
}

.main-table,
.selected-table {
  width: 48%;
  position: relative;
}

.agents-table,
.selected-agents-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: rgb(39, 40, 40);
  
}

.agents-table th,
.agents-table td,
.selected-agents-table th,
.selected-agents-table td {
  
  padding: 8px;
  text-align: left;
}
.header-row {
  background-color: #4f6e96; /* צבע רקע לשורה הראשונה */
  color: white; /* צבע טקסט */
}

.filter-row th {
  padding: 4px 8px;
  color: rgb(85, 85, 87);
}

.filter-row input,
.filter-row select {
  width: 100%;
  background-color: #333; /* צבע הרקע החדש */
  color: #fff; /* צבע הטקסט */
  border: 1px solid #555; /* גבול הקלט */
  padding: 3px; /* ריפוד פנימי */
}

button {
  background-color: #4f6e96;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

button:hover {
  background-color: #4f6e96;
}

.agent-btn {
  background-color: #4f6e96;
}

.remove-agent-btn {
  background-color: red;
  color: white;
}

.button-container {
  text-align: right;
  margin-top: 10px;
  
}

.arrow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4%;
}

.arrow-right,
.arrow-left {
  font-size: 24px;
  cursor: pointer;
}

.arrow-right {
  margin-bottom: 10px;
}

.icon-user::before {
  content: '\f007'; /* FontAwesome user icon */
  font-family: FontAwesome;
  margin-left: 5px;
}

.icon-sort-up::before {
  content: '↑';
}

.icon-sort-down::before {
  content: '↓';
}

.actions-header {
  width: 100px;
}

.sort-asc::after {
  content: ' ↑';
}

.sort-desc::after {
  content: ' ↓';
}
.selected-table input[type="checkbox"]:checked {
  background-color: red;
}
</style>
