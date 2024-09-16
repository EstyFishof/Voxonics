<template>
    <div>
      <CampaignForm ref="campaignForm" />
      <EmployeeTable ref="employeeTable"/>
      <NumberAssined />
      <DayClr />
      <button @click="saveData">Save Data</button>
    </div>
  </template>
  
  <script>
  import CampaignForm from './components/CampaignForm.vue'
  import EmployeeTable from './components/EmployeeTable.vue'
  import NumberAssined from './components/NumberAssined.vue'
  import DayClr from './components/DayClr.vue'
  import axios from 'axios'
  
  export default {
    name: '         ',
    components: {
      CampaignForm, EmployeeTable, NumberAssined, DayClr
    },
    methods: {
      async saveData() {
        const campaignForm = this.$refs.campaignForm.form;
        const employeeTable = this.$refs.employeeTable.filteredSelectedAgents;
  
        
        const dataToSave = {
          campaignName: campaignForm.campaignName,
          campaignID: campaignForm.campaignID,
          campaignDescription: campaignForm.campaignDescription,
          campaignStatus: campaignForm.campaignStatus,
          campaignDialLevel: campaignForm.campaignDialLevel,
          campaignFile: campaignForm.campaignFile ? campaignForm.campaignFile.name : '',
          campaignAgents: employeeTable
        };
        console.log(employeeTable,"emp");
  
        try {
          await axios.post('http://localhost:3000/save', dataToSave);
          alert('Data saved successfully!');
        } catch (error) {
          console.error('Error saving data:', error);
        }
      }
    }
  }
  </script>
  
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  