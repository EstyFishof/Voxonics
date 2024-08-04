<template>
    <div>
      <div>
        <div class="custom-file-input" @click="triggerFileUpload">
          <input type="file" id="campaignFile" @change="handleFileUpload" ref="campaignFile">
         
        </div>
      </div>
     
      <div class="divider-container">
        <div class="divider"></div> 
        <span>Number assigned</span>
        
      </div>
      <div class="highlight-container">
        <span :class="{'highlight': !isRight, 'unhighlight': isRight}">Preferred numbers</span>
        <div class="slider" @click="togglePosition">
          <div class="slider-circle" :class="{'right': isRight}"></div>
        </div>
        <span :class="{'highlight': isRight, 'unhighlight': !isRight}">Assigned numbers</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          campaignFile: null
        },
        isRight: false
      };
    },
    methods: {
      triggerFileUpload() {
        this.$refs.campaignFile.click();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.form.campaignFile = file;
      },
      togglePosition() {
        this.isRight = !this.isRight;
      }
    }
  };
  </script>
  
  <style>
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
.unhighlight {
  color: #999494;
}
