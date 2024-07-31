<template>
  <div id="app">
    <CampaignForm />
    <EmployeeTable />
  </div>
</template>

<script>
import CampaignForm from './components/CampaignForm.vue';
import EmployeeTable from './components/EmployeeTable.vue';

export default {
  components: {
    CampaignForm,
    EmployeeTable
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #0f365c;
  background-color: rgb(8, 8, 8);
}
body {
  background-color: #000;
}
</style>
