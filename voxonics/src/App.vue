<template>
  <div id="app">
    <CampaignForm />
  </div>
</template>

<script>
import CampaignForm from './components/CampaignForm.vue';

export default {
  components: {
    CampaignForm
  }
};
</script>

<style>
/* body{background-color: rgb(247, 240, 240);} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #0f365c;
  /* margin-top: 0px; */
  background-color: rgb(8, 8, 8);
}
body{
    background-color: #000;
  }
</style>
