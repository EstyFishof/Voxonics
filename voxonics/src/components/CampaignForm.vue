<template>
  <div class="campaign-form">
    <h1>Create new campaign</h1>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group">
          <label for="campaignName">Campaign Name</label>
          <input type="text" id="campaignName" v-model="form.campaignName" placeholder="Enter campaign name" required>
        </div>
        <div class="form-group">
          <label for="campaignID">Campaign ID</label>
          <input type="text" id="campaignID" v-model="form.campaignID" placeholder="6Digits" required>
        </div>
        <div class="form-group">
          <label for="campaignDescription">Campaign Description</label>
          <input type="text" id="campaignDescription" v-model="form.campaignDescription" placeholder="Enter Description" required>
        </div>
        <div class="form-group">
          <label for="campaignStatus">Campaign Status</label>
          <input type="text" id="campaignStatus" v-model="form.campaignStatus" placeholder="Active" required>
        </div>
        <div class="form-group">
          <label for="campaignDialLevel">Campaign Dial Level</label>
          <input type="text" id="campaignDialLevel" v-model="form.campaignDialLevel" placeholder="2" required>
        </div>
      </div>
      <div class="form-group">
        <label for="campaignFile" class="left-align">Music on Hold</label>
        <div class="custom-file-input" @click="triggerFileUpload">
          <input type="file" id="campaignFile" @change="handleFileUpload" ref="campaignFile">
          <input type="text" :value="form.campaignFile ? form.campaignFile.name : ' Select or drop your files here or select from template'" readonly>
        </div>
      </div>
    </form>
  </div>
  <div class="divider-container">
    <div class="divider"></div>
    <span>Agent assigned</span>
  </div>
  <div class="highlight-container">
    <span :class="{'highlight': !isRight}">Real agent</span>
    <div class="slider" @click="togglePosition">
      <div class="slider-circle" :class="{'right': isRight}"></div>
    </div>
    <span :class="{'highlight': isRight}">Virtual agent</span>
  </div>
</template>

<script>
export default {
  name: 'CampaignForm',
  data() {
    return {
      form: {
        campaignName: '',
        campaignID: '',
        campaignDescription: '',
        campaignStatus: '',
        campaignDialLevel: '',
        campaignFile: null
      },
      isRight: false,
      employees: [] //הוספת מערך עובדים
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.campaignFile = file;
      }
    },
    triggerFileUpload() {
      this.$refs.campaignFile.click();
    },
    togglePosition() {
      this.isRight = !this.isRight;
    },
    addEmployee() {
      this.employees.push({ name: '', role: '', age: '' });
    }
  }
};
</script>

<style scoped>
h1 {
  color:rgb(118, 117, 119);
  margin-right: 1000px;
  font-size: large;
}
.campaign-form {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  color: #fff;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.form-group {
  margin-bottom: 15px;
  flex: 1;
  min-width: 150px;
  margin-right: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: #4f6e96;
}
label.left-align {
  text-align: left;
  margin-left: 0;
}
input[type="text"] {
  width: 80%;
  padding: 4px;
  box-sizing: border-box;
  background-color: rgb(160, 159, 161);
}
.custom-file-input {
  position: relative;
  width: 100%;
}
.custom-file-input input[type="file"] {
  display: none;
}
.custom-file-input input[type="text"] {
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  background-color: rgb(118, 117, 119);
  cursor: pointer;
  text-align: center;
  font-size: medium;
}
.divider {
  height: 1px;
  background-color: rgb(118, 117, 119);
  margin-left: 165px;
  margin-right: 30px;
}
.divider-container span {
  color: rgb(118, 117, 119);
  margin-right: 1100px;
  padding: 0px;
}
.highlight-container {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
  margin-left: 20px;
}
.highlight {
  font-weight: bold;
  color: #4f6e96;
}
.slider {
  width: 34px;
  height: 13px;
  background-color: #2b4b74;;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  margin: 0 20px;
  transition: background-color 0.3s;
}
.slider-circle {
  width: 20px;
  height: 19px;
  background-color: #4f6e96;;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 0.5px;
  transition: transform 0.3s;
}
.slider-circle.right {
  transform: translateX(25px);
  background-color: #4f6e96;;
}
.slider.right {
  background-color: #4caf50;
}
</style>
