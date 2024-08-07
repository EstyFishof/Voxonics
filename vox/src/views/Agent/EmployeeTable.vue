<template>
  <div class="container">
    <div class="tables-container">
      <div class="main-table">
        <table class="agents-table">
          <thead>
            <tr class="header-row">
              <th @click="sort('name')">Name <i :class="getSortIcon('name')"></i></th>
              <th @click="sort('id')">ID <i :class="getSortIcon('id')"></i></th>
              <th @click="sort('department')">Department <i :class="getSortIcon('department')"></i></th>
              <th @click="sort('position')">Position <i :class="getSortIcon('position')"></i></th>
              <th></th>
            </tr>
            <tr class="filter-row">
              <th><input type="text" v-model="filters.name" placeholder="Filter by Name" /></th>
              <th><input type="text" v-model="filters.id" placeholder="Filter by ID" /></th>
              <th>
                <select v-model="filters.department">
                  <option value="">Select Department</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                </select>
              </th>
              <th class="select-header">
                <div class="header-content"> Select All
                  <input type="checkbox" @click="toggleSelectAllAgents"/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in filteredAgents" :key="agent.id">
              <td><img :src="customerServiceIcon" alt="Customer Service Icon" class="circular-image">{{ agent.name }}</td>
              <td>{{ agent.id }}</td>
              <td>{{ agent.department }}</td>
              <td>{{ agent.position }}</td>
              <td><input type="checkbox" v-model="selectedAgents" :value="agent" /></td>
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
              <th @click="sort('name', true)">Name <i :class="getSortIcon('name', true)"></i></th>
              <th @click="sort('id', true)">ID <i :class="getSortIcon('id', true)"></i></th>
              <th @click="sort('department', true)">Department <i :class="getSortIcon('department', true)"></i></th>
              <th @click="sort('position', true)">Position <i :class="getSortIcon('position', true)"></i></th>
              <th></th>
            </tr>
            <tr class="filter-row">
              <th><input type="text" v-model="selectedFilters.name" placeholder="Filter by Name" /></th>
              <th><input type="text" v-model="selectedFilters.id" placeholder="Filter by ID" /></th>
              <th>
                <select v-model="selectedFilters.department">
                  <option value="">Select Department</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                </select>
              </th>
              <th class="select-header">
                <div class="header-content"> Select All
                  <input type="checkbox" @click="toggleSelectAllSelectedAgents"/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in filteredSelectedAgents" :key="agent.id">
              <td><img :src="customerServiceIcon" alt="Customer Service Icon" class="circular-image">{{ agent.name }}</td>
              <td>{{ agent.id }}</td>
              <td>{{ agent.department }}</td>
              <td>{{ agent.position }}</td>
              <td><input type="checkbox" v-model="selectedInSelectedTable" :value="agent" /></td>
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
import customerServiceIcon from '@/assets/lovepik-customer-service-personnel-icon-png-image_400960953_wh1200.png';
export default {
  data() {
    return {
      customerServiceIcon,
      agents: [
        { name: "Avi", id: 11, department: "Sales", position: "Manager" },
        { name: "Dani", id: 22, department: "Sales", position: "Manager" },
        { name: "Benny", id: 33, department: "Sales", position: "Manager" },
        { name: "Natan", id: 44, department: "Support", position: "Agent" }
      ],
      filters: {
        name: "",
        id: "",
        department: "",
        position: ""
      },
      selectedAgents: [],
      addedAgents: [],
      selectedFilters: {
        name: "",
        id: "",
        department: "",
        position: ""
      },
      selectedInSelectedTable: [],
      sortConfig: {
        column: '',
        direction: 'asc',
        table: 'agents'
      }
    };
  },
  computed: {
    filteredAgents() {
      let agents = [...this.agents];
      if (this.sortConfig.table === 'agents' && this.sortConfig.column) {
        agents.sort((a, b) => {
          let valueA = a[this.sortConfig.column].toString().toLowerCase();
          let valueB = b[this.sortConfig.column].toString().toLowerCase();
          if (this.sortConfig.direction === 'asc') {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        });
      }
      return agents.filter(agent => {
        return (
          (this.filters.name === "" || agent.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
          (this.filters.id === "" || agent.id.toString().includes(this.filters.id)) &&
          (this.filters.department === "" || agent.department.toLowerCase() === this.filters.department.toLowerCase()) &&
          (this.filters.position === "" || agent.position.toLowerCase() === this.filters.position.toLowerCase())
        );
      });
    },
    filteredSelectedAgents() {
      let agents = [...this.addedAgents];
      if (this.sortConfig.table === 'addedAgents' && this.sortConfig.column) {
        agents.sort((a, b) => {
          let valueA = a[this.sortConfig.column].toString().toLowerCase();
          let valueB = b[this.sortConfig.column].toString().toLowerCase();
          if (this.sortConfig.direction === 'asc') {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        });
      }
      return agents.filter(agent => {
        return (
          (this.selectedFilters.name === "" || agent.name.toLowerCase().includes(this.selectedFilters.name.toLowerCase())) &&
          (this.selectedFilters.id === "" || agent.id.toString().includes(this.selectedFilters.id)) &&
          (this.selectedFilters.department === "" || agent.department.toLowerCase() === this.selectedFilters.department.toLowerCase()) &&
          (this.selectedFilters.position === "" || agent.position.toLowerCase() === this.selectedFilters.position.toLowerCase())
        );
      });
    }
  },
  methods: {
    sort(column, isAddedAgents = false) {
      if (this.sortConfig.column === column && this.sortConfig.table === (isAddedAgents ? 'addedAgents' : 'agents')) {
        this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortConfig.column = column;
        this.sortConfig.direction = 'asc';
      }
      this.sortConfig.table = isAddedAgents ? 'addedAgents' : 'agents';
    },
    getSortIcon(column, isAddedAgents = false) {
      if (this.sortConfig.column === column && this.sortConfig.table === (isAddedAgents ? 'addedAgents' : 'agents')) {
        return this.sortConfig.direction === 'asc' ? 'icon-up' : 'icon-down';
      }
      return '';
    },
    toggleSelectAllAgents() {
      if (this.selectedAgents.length === this.filteredAgents.length) {
        this.selectedAgents = [];
      } else {
        this.selectedAgents = [...this.filteredAgents];
      }
    },
    toggleSelectAllSelectedAgents() {
      if (this.selectedInSelectedTable.length === this.filteredSelectedAgents.length) {
        this.selectedInSelectedTable = [];
      } else {
        this.selectedInSelectedTable = [...this.filteredSelectedAgents];
      }
    },
    addAgents() {
      const uniqueSelected = [...new Set([...this.addedAgents, ...this.selectedAgents])];
      this.addedAgents = uniqueSelected;
      this.selectedAgents = [];
      this.saveAgentsToLocalStorage();
    },
    removeAgents() {
      this.addedAgents = this.addedAgents.filter(agent => !this.selectedInSelectedTable.includes(agent));
      this.selectedInSelectedTable = [];
      this.saveAgentsToLocalStorage();
    },
    saveAgentsToLocalStorage() {
      localStorage.setItem('addedAgents', JSON.stringify(this.addedAgents));
    },
    loadAgentsFromLocalStorage() {
      const storedAgents = localStorage.getItem('addedAgents');
      if (storedAgents) {
        this.addedAgents = JSON.parse(storedAgents);
      }
    }
  },
  created() {
    this.loadAgentsFromLocalStorage();
  }
};
</script>



<style scoped>
.container {
  background-color: #1c1d21;
  color:#a3a9af;
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
  background-color: #4f6e96; /* Header row background color */
  color: rgb(194, 188, 188); /* Header row text color */
 
}
.header-content {
  display: flex;
  align-items: center;
  margin-right:-88px
}

.header-content input[type="checkbox"] {
  margin-right: 8px; /* רווח בין ה-checkbox לטקסט */
  
}

.filter-row th {
  padding: 0.1px;
  color: rgb(85, 85, 87);
  
}

.filter-row input,
.filter-row select {
  width:90px;
  background-color: #2b2626; /* New background color */
  color: #bbb3b3; /* Text color */
  border: 1px solid #555; /* Input border */
  padding: 1px; /* Internal padding */
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
  color: rgb(194, 187, 187);
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
input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #555;
  outline: none;
  cursor: pointer;
  background-color: #b3a6a6;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #4f6e96;
}
.selected-table input[type="checkbox"]:checked {
  background-color: rgb(201, 192, 192);
}

/* input[type="checkbox"]:checked {
  background-color: red;
} */

input[type="checkbox"]:checked::before {
  content: '✔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  font-size: 14px;
}
/* סטיילינג של checkbox בטבלה הימנית */
.selected-table input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #555;
  outline: none;
  cursor: pointer;
  background-color: #b7b1b1;
  position: relative;
}

.selected-table input[type="checkbox"]:checked {
  background-color: #555; 
}

.selected-table input[type="checkbox"]:checked::before {
  content: '✔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  font-size: 14px;
  background-color: #333;
  

}

/* סטיילינג של checkbox בטבלה השמאלית */
.main-table input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #4f6e96; 
  cursor: pointer;
  background-color: rgb(39, 40, 40); 
  position: relative;
}

.main-table input[type="checkbox"]:checked {
  background-color: #4f6e96; 
}
.main-table input[type="checkbox"]:checked::before {
  content: '✔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(182, 178, 178); 
  font-size: 14px;
}

/* סטיילינג של checkbox בטבלה הימנית */
.selected-table input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid red;
  outline: none;
  cursor: pointer;
  background-color: rgb(39, 40, 40); 
  position: relative;
}

/* סטיילינג של checkbox  בטבלה הימנית */
.selected-table input[type="checkbox"]:checked {
  background-color: #333;
  border: 2px solid red;
  
}

.selected-table input[type="checkbox"]:checked::before {
  content: '✔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  border: none;
  background: none;

}
.select-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.circular-image {
  width: 19px; /* גודל התמונה */
  height: 19px; /* גובה התמונה */
  border-radius: 50%; /* הפיכת התמונה לעיגול */
  object-fit: cover; /* התמונה תתאים לגודל המסגרת מבלי לעוות */
}

</style>

