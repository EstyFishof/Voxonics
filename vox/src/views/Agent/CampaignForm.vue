<template>
  <div>
  <div class="campaign-form">
    <h1>Create new campaign</h1>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group">
          <label for="campaignName">Campaign Name</label>
          <div class="input-container">
            <input
              type="text"
              id="campaignName"
              v-model="form.campaignName"
              placeholder="Enter campaign name"
              required
            />
            <svg class="icon-pencil1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.707 2.293a1 1 0 00-1.414 0L15.3 7.285l5.001 5.001 5.003-5.003a1 1 0 000-1.414l-3.597-3.576zM2.999 14.707v5.001h5.003l10.89-10.891-5.003-5.003L2.999 14.707zm0 0" />
            </svg>
          </div>
          <span v-if="nameError" class="error-message">{{ nameError }}</span>
        </div>
        <div class="form-group">
          <label for="campaignID">Campaign ID</label>
          <div class="input-container">
            <input
              type="text"
              id="campaignID"
              v-model="form.campaignID"
              placeholder="6Digits"
              required
            />
            <svg class="icon-pencil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.707 2.293a1 1 0 00-1.414 0L15.3 7.285l5.001 5.001 5.003-5.003a1 1 0 000-1.414l-3.597-3.576zM2.999 14.707v5.001h5.003l10.89-10.891-5.003-5.003L2.999 14.707zm0 0" />
            </svg>
          </div>
          <span v-if="idError" class="error-message">{{ idError }}</span>
        </div>
        <div class="form-group">
          <label for="campaignDescription">Campaign Description</label>
          <div class="input-container">
            <input
              type="text"
              id="campaignDescription"
              v-model="form.campaignDescription"
              placeholder="Enter Description"
              required
            />
            <svg class="icon-pencil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.707 2.293a1 1 0 00-1.414 0L15.3 7.285l5.001 5.001 5.003-5.003a1 1 0 000-1.414l-3.597-3.576zM2.999 14.707v5.001h5.003l10.89-10.891-5.003-5.003L2.999 14.707zm0 0" />
            </svg>
          </div>
        </div>
        <div class="form-group">
          <label for="campaignStatus">Campaign Status</label>
          <div class="input-container">
            <input
              type="text"
              id="campaignStatus"
              v-model="form.campaignStatus"
              placeholder="Active"
              required
            />
          
          </div>
        </div>
        <div class="form-group">
          <label for="campaignDialLevel">Campaign Dial Level</label>
          <div class="input-container">
            <input
              type="text"
              id="campaignDialLevel"
              v-model="form.campaignDialLevel"
              placeholder="2"
              required
            />
           
          </div>
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
    <span :class="{'highlight': !isRight, 'unhighlight': isRight}">Real agent</span>
    <div class="slider" @click="togglePosition">
      <div class="slider-circle" :class="{'right': isRight}"></div>
    </div>
    <span :class="{'highlight': isRight, 'unhighlight': !isRight}">Virtual agent</span>
  </div>
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
      isRight: false
    };
  },
  computed: {
    nameError() {
      if (/\d/.test(this.form.campaignName)) {
        return 'Error';
      }
      return '';
    },
    idError() {
      if (/[^\d]/.test(this.form.campaignID)) {
        return 'Error';
      }
      return '';
    }
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
    }
  }
};
</script>

<style scoped>
h1 {
  color: rgb(118, 117, 119);
  margin-right: 1000px;
  font-size: large;
}
.campaign-form {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #1c1d21;
  color: #c7c2c2;
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
.input-container {
  position: relative;
}
.input-container input[type="text"] {
  width: 87%;
  height: 35px;
  padding: 10px 30px 10px 10px; /* Adjust padding to make space for the icon */
  box-sizing: border-box;
  background-color: rgb(47, 43, 50);
  color: #ffffff;
}
.icon-pencil1{
  position: absolute;
  right: 30px;
  top: 60%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: #de1616;
}
.icon-pencil {
  position: absolute;
  right: 30px;
  top: 60%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: #4f6e96; /* Change color as needed */
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
  background-color: rgb(140, 134, 146);
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
.unhighlight {
  color: #b5aeae;
}
.slider {
  width: 34px;
  height: 15px;
  background-color: #2b4b74;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  margin: 0 15px;
  transition: background-color 0.3s;
}
.slider-circle {
  width: 17px;
  height: 15.1px;
  background-color: #4f6e96;
  border-radius: 50%;
  position: absolute;
  top: 0.9px;
  left: 0.2px;
  transition: transform 0.3s;
}
.slider-circle.right {
  transform: translateX(15px);
  background-color: #4f6e96;
}
.slider.right {
  background-color: #4caf50;
}
.error-message {
  color: red;
  font-size: small;
}
</style>
