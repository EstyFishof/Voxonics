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
     </div><div class="divider2"></div>
       <div class="sheduale">
          <span>Sheduale</span>
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
  font-size: large;
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
.slider {
  width: 34px;
  height: 15px;
  background-color: #2b4b74;;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  margin: 0 15px;
  transition: background-color 0.3s;
}
.slider-circle {
  width: 17px;
  height: 15.1px;
  background-color: #4f6e96;;
  border-radius: 50%;
  position: absolute;
  top: 0.9px;
  left: 0.2px;
  transition: transform 0.3s;
}
.slider-circle.right {
  transform: translateX(15px);
  background-color: #4f6e96;;
}
.slider.right {
  background-color: #4caf50;
}
.divider2{
  height: 1px;
  background-color: rgb(118, 117, 119);
  margin-left: 100px;
  margin-right: 30px;
}

.sheduale{
  color: rgb(118, 117, 119);
  margin-right: 1168px;
  padding: 0px;
  font-size: large;
}
</style>
