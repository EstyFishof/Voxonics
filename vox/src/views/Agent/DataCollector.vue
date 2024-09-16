<template>
  <div>
    <CampaignForm ref="campaignForm" /> 
    <EmployeeTable ref="employeeTable" />
    <NumberAssined ref="numberAssined" />
    <DayClr ref="dayClr" />
    <button @click="saveData">save</button>
  </div>
</template>

<script>
import axios from 'axios';
import CampaignForm from './CampaignForm.vue';
import EmployeeTable from './EmployeeTable.vue';
import NumberAssined from './NumberAssined.vue';
import DayClr from './DayClr.vue';

export default {
  name: 'App',
  components: {
    // CampaignForm,
    // EmployeeTable,
    // NumberAssined,
    // DayClr
  },
  methods: {
    async saveData() {
  try {
    // שליפת הנתונים מהטפסים באמצעות $refs
    const campaignData = this.$refs.campaignForm.getData();
    const employeeData = this.$refs.employeeTable.getData();
    const numberData = this.$refs.numberAssined.getData();
    const dayClrData = this.$refs.dayClr.getData();

    // הדפסת הנתונים לקונסול לבדיקה
    console.log('Campaign Data:', campaignData);
    console.log('Employee Data:', employeeData);
    console.log('Number Data:', numberData);
    console.log('Day CLR Data:', dayClrData);

    // איסוף כל הנתונים לאובייקט אחד
    const allData = {
      campaignData,
      employeeData,
      numberData,
      dayClrData
    };

    // שליחת הנתונים לשרת
    const response = await axios.post('http://localhost:8080/saveCampaignData', allData);
    console.log('Response:', response.data);
    alert('הנתונים נשמרו בהצלחה!');
  } catch (error) {
    console.error('Error saving data:', error.response ? error.response.data : error.message);
    alert('The data was saved successfully.');
  }
}
  }}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: rgb(39, 104, 153);
  color: white;
  border: none;
  cursor: pointer;
}
</style>
