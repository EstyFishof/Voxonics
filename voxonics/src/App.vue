<template>
  <div id="app">
    <CampaignForm />
    <EmployeeTable />
    <NumberAssined/>
    <NewCalendar/>
    <MyCalendar/>
  </div>
</template>

<script>
import CampaignForm from './components/CampaignForm.vue';
import EmployeeTable from './components/EmployeeTable.vue';
import NumberAssined from './components/NumberAssined.vue';
import NewCalendar from './components/NewCalendar.vue';
import MyCalendar from './components/MyCalendar.vue';



export default {
  components: {
    CampaignForm,
    EmployeeTable,
    NumberAssined,
    NewCalendar,
    MyCalendar
   
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
