<template>
  <div id="app">
    <CampaignForm />
    <EmployeeTable />
    <NumberAssined />
   
    
  </div>
</template>

<script>
import CampaignForm from './components/CampaignForm.vue';
import EmployeeTable from './components/EmployeeTable.vue';
import NumberAssined from './components/NumberAssined.vue';


export default {
  components: {
    CampaignForm,
    EmployeeTable,
    NumberAssined,
    
  }
};
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #0f365c;
  background-color: #1c1d21
}
body {
  background-color: #1c1d21
}
</style>
