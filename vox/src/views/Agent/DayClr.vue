<template>
    <div id="contanet1">
      <button id="dayS" @click="showDaySetting">Day Setting</button>
      <button id="weekP" @click="showWeekPreference">Week Preference</button>
   
       <label id="fromL" for="from"> From</label>
       <input type="date" id="from" v-model="fromDate" />
       <label id="toL" for="to">To</label>
       <input type="date" id="to" v-model="toDate" />
   
       <div v-if="showCalendar" class="calendar-container">
         <div class="calendar">
           <div class="calendar-header">
             <button id="btNext1" @click="previousMonth">←</button>
             <span>{{ monthNames[leftMonth] }} {{ year }}</span>
           </div>
           <div class="calendar-body">
             <div class="calendar-grid">
               <div v-for="(day, index) in leftMonthDays" :key="index" :class="getDayClass(day)">
                 <button @click="selectDate(day)">
                   {{ day.getDate() }}
                 </button>
             </div>
             </div>
           </div>
         </div>
         <div class="calendar">
           <div class="calendar-header">
             <span>{{ monthNames[rightMonth] }} {{ year }}</span>
             <button id="btNext1" @click="nextMonth">→</button>
           </div>
           <div class="calendar-body">
             <div class="calendar-grid">
               <div v-for="(day, index) in rightMonthDays" :key="index" :class="getDayClass(day)">
                 <button @click="selectDate(day)">
                   {{ day.getDate() }}
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
       <button id="save" v-if="showCalendar" @click="saveDates"> Save </button>
   
       <div v-if="showCalendar" class="time-settings">
         <h3> Time Settings </h3>
         <div v-for="date in filteredSelectedDates" :key="date" @click="selectTimeSetting(date)" class="time-setting-date">
            {{ formatDate(date) }}
         </div>
         <div v-if="selectedTimeSettingDate" class="time-inputs">
           <h4>Time for {{ formatDate(selectedTimeSettingDate) }}</h4>
           <label> From: <input type="time" v-model="timeFrom1" /></label>
           <label> To: <input type="time" v-model="timeTo1" /></label>
           <label> From: <input type="time" v-model="timeFrom2" /></label>
           <label> To: <input type="time" v-model="timeTo2" /></label>
           <button @click="saveTimeSettings"> Save </button>
         </div>
       </div>
    </div>
   </template>
 
 <script>
 export default {
   data() {
     return {
       fromDate: '',
       toDate: '',
       showCalendar: false,
       year: new Date().getFullYear(),
       leftMonth: new Date().getMonth(),
       rightMonth: new Date().getMonth() + 1,
       selectedDates: [],
       excludeDates: [],
       selectedTimeSettingDate: null,
       timeSettings: {},
       timeFrom1: '',
       timeTo1: '',
       timeFrom2: '',
       timeTo2: '',
       monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
     };
   },
   computed: {
     leftMonthDays() {
       return this.generateDays(this.year, this.leftMonth);
     },
     rightMonthDays() {
       return this.generateDays(this.year, this.rightMonth);
     },
     filteredSelectedDates() {
       return this.selectedDates.filter(day => this.isInRange(day));
     }
   },
   methods: {
     showDaySetting() {
       this.showCalendar = true;
     },
     showWeekPreference() {
       this.showCalendar = true;
     },
     previousMonth() {
       if (this.leftMonth > 0) {
         this.leftMonth--;
         this.rightMonth--;
       } else {
         this.leftMonth = 11;
         this.rightMonth = 0;
         this.year--;
       }
     },
     nextMonth() {
       if (this.rightMonth < 11) {
         this.leftMonth++;
         this.rightMonth++;
       } else {
         this.leftMonth = 0;
         this.rightMonth = 1;
         this.year++;
       }
     },
     generateDays(year, month) {
       const daysInMonth = new Date(year, month + 1, 0).getDate();
       const days = [];
       for (let i = 1; i <= daysInMonth; i++) {
         days.push(new Date(year, month, i));
       }
       return days;
     },
     selectDate(day) {
       const index = this.selectedDates.findIndex(selectedDate =>
         selectedDate.getDate() === day.getDate() &&
         selectedDate.getMonth() === day.getMonth() &&
         selectedDate.getFullYear() === day.getFullYear()
       );
       if (index === -1) {
         this.selectedDates.push(day);
         this.excludeDates = this.excludeDates.filter(excludeDate =>
           !(excludeDate.getDate() === day.getDate() &&
             excludeDate.getMonth() === day.getMonth() &&
             excludeDate.getFullYear() === day.getFullYear())
         );
       } else {
         this.selectedDates.splice(index, 1);
         this.excludeDates.push(day);
       }
     },
 
 
     getDayClass(day) {
   const isSelected = this.selectedDates.some(selectedDate =>
     selectedDate.getDate() === day.getDate() &&
     selectedDate.getMonth() === day.getMonth() &&
     selectedDate.getFullYear() === day.getFullYear()
   );
   const isExcluded = this.excludeDates.some(excludeDate =>
     excludeDate.getDate() === day.getDate() &&
     excludeDate.getMonth() === day.getMonth() &&
     excludeDate.getFullYear() === day.getFullYear()
   );
   const isInRange = this.isInRange(day) && !isExcluded;
   return {
     'selected': isSelected,
     'in-range': !isSelected && isInRange
     //     'in-range': isInRange זה שינוי לצבע...
 
   };
 },
     isInRange(day) {
       if (!this.fromDate || !this.toDate) {
         return false;
       }
       const fromDate = new Date(this.fromDate);
       const toDate = new Date(this.toDate);
       return day >= fromDate && day <= toDate;
     },
     saveDates() {
       console.log('From date:', this.fromDate);
       console.log('To date:', this.toDate);
       const inRangeDates = this.selectedDates.filter(day => this.isInRange(day));
       console.log('Selected dates in range: ', inRangeDates);
     },
     formatDate(date) {
       const day = date.getDate();
       const month = this.monthNames[date.getMonth()];
       // const year = date.getFullYear();
       const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
       return `${day} ${month} ${dayName}`;
       // return `${day} ${month} ${year} ${dayName}`;
     },  
     selectTimeSetting(date) {
       this.selectedTimeSettingDate = date;
       if (this.timeSettings[date]) {
         const { timeFrom1, timeTo1, timeFrom2, timeTo2 } = this.timeSettings[date];
         this.timeFrom1 = timeFrom1;
         this.timeTo1 = timeTo1;
         this.timeFrom2 = timeFrom2;
         this.timeTo2 = timeTo2;
       } else {
         this.timeFrom1 = '';
         this.timeTo1 = '';
         this.timeFrom2 = '';
         this.timeTo2 = '';
       }
     },
     saveTimeSettings() {
       if (this.selectedTimeSettingDate) {
         this.timeSettings[this.selectedTimeSettingDate] = {
           timeFrom1: this.timeFrom1,
           timeTo1: this.timeTo1,
           timeFrom2: this.timeFrom2,
           timeTo2: this.timeTo2
         };
         console.log('Time settings saved for', this.formatDate(this.selectedTimeSettingDate), ':', this.timeSettings[this.selectedTimeSettingDate]);
       }
     }
   }
 };
 </script>
 
 <style>
 .calendar-container {
   display: flex;
   background-color: #202933;
   max-width: 687px;
   border-radius: 17px;
 }
 .calendar {
   margin: 10px;
 }
 .calendar-header {
   font-family: cursive;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   color: #ffffffc4;
   font-weight: bold;
   margin-bottom: 1px;
   padding: 12px;
   background-color: #276899;
   border-radius: 4px;
 }
 .calendar-body {
   display: flex;
   flex-wrap: wrap;
   background-color: #121a22;
 }
 .calendar-grid {
   display: grid;
   grid-template-columns: repeat(7, 1fr);
 }
 .calendar-grid div {
   text-align: center;
   padding: 5px;
   border: 1px solid #17272fa8;
   border-radius: 3px;
 }
 .calendar-grid button {
   width: 100%;
   padding: 10px;
   border: none;
   background: none;
   cursor: pointer;
   color: #ffffffc4;
 }
 .in-range {
   background-color: #27689996;
 }
 .selected {
   background-color: #8000009e;
   color: white;
 }
 #from,
 #to,
 #save {
   font-size: small;
   color: #ffffffc4;
   background-color: #276899;
   border: 1px solid #17272fa8;
   margin: 2px;
   border-radius: 4px;
   padding: 2px;
   margin-bottom: 7px;
   font-family: cursive;
 }
 #save {
   margin-left: 90%;
   font-family: cursive;
 }
 #dayS,
 #weekP {
   font-size: small;
   color: #ffffffc4;
   background-color: #276899;
   border: 1px solid #17272fa8;
   border-radius: 4px;
   padding: 5px;
   font-family: cursive;
   margin-bottom: 5px;
 }
 #fromL,
 #toL {
   color: #ffffffc4;
   font-family: cursive;
   font-size: small;
 }
 #contanet1 {
   background-color: #202933;
 }
 html {
   background-color: #0f1d28;
   max-width: 715px;
 }
 #btNext1 {
   background-color: #d8e0e724;
   color: #ffffffc4;
   border: none;
   margin: 2px;
   border-radius: 20%;
   margin: 1%;
 }
 .time-settings {
   width: 100%;
   padding: 10px;
   display: grid;
   grid-template-columns: repeat(7, 1fr);
   margin-top: 20px;
   background-color: #202933;
   padding: 10px;
   border-radius: 10px;
   display: table-caption;
 }
 .time-settings h3 {
   color: #ffffffc4;
   font-family: cursive;
 }
 .time-setting-date {
   display: table-cell;
   text-align: center;
   background-color: #121a22;
   border: 1px solid #17272fa8;
   /* padding: 3%; */
   margin: 8% 0;
   border-radius: 5px;
   cursor: pointer;
   color: white;
 }
 .time-inputs {
     margin-top: 10px;
     display: flex;
     margin: 10px;
 }
 .time-inputs label {
   display: block;
   margin: 5px 0;
   color: #ffffff34;
   font-family: cursive;
   font-size: small;
 }
 .time-inputs input {
   padding: 5px;
   border-radius: 5px;
   border: 1px solid #17272fa8;
   background-color: #121a22;
   color: #ffffffc4;
 }
 .time-inputs button {
   background-color: #276899;
   color: white;
   /* padding: 10px; */
   margin: 5px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   /* display: flex; */
 }
 h4{
   font-family: cursive;
   color: #276899;
   text-align: center;
   margin: 9px;
 }
 </style>

 
 
 
 
 
 
 
 
 
 
 
 <!-- <template>
     <div id="contanet1">
       <button id="dayS" @click="showDaySetting">Day Setting</button>
       <button id="weekP" @click="showWeekPreference">Week Preference</button>
     
       <label id="fromL" for="from"> From</label>
       <input type="date" id="from" v-model="fromDate" />
      
       <label id="toL" for="to">To</label>
       <input type="date" id="to" v-model="toDate" />
      
       <div v-if="showCalendar" class="calendar-container">
         <div class="calendar">
           <div class="calendar-header">
           <button id="btNext1" @click="previousMonth">←</button>
             <span>{{ monthNames[leftMonth] }} {{ year }}</span>
           </div>
           <div class="calendar-body">
             <div class="calendar-grid">
               <div v-for="(day, index) in leftMonthDays" :key="index" :class="getDayClass(day)">
                 <button @click="selectDate(day)">
                   {{ day.getDate() }}
                 </button>
               </div>
             </div>
           </div>
         </div>
         <div class="calendar">
           <div class="calendar-header">
             <span>{{ monthNames[rightMonth] }} {{ year }}</span>
             <button id="btNext1" @click="nextMonth">→</button>
           </div>
           <div class="calendar-body">
             <div class="calendar-grid">
               <div v-for="(day, index) in rightMonthDays" :key="index" :class="getDayClass(day)">
                 <button @click="selectDate(day)">
                   {{ day.getDate() }}
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     
     <button id="save" v-if="showCalendar" @click="saveDates">SAVE</button>
 </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         fromDate: '',
         toDate: '',
         showCalendar: false,
         year: new Date().getFullYear(),
         leftMonth: new Date().getMonth(),
         rightMonth: new Date().getMonth() + 1,
         selectedDates: [],
         excludeDates: [],
         monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
       };
     },
     computed: {
       leftMonthDays() {
         return this.generateDays(this.year, this.leftMonth);
       },
       rightMonthDays() {
         return this.generateDays(this.year, this.rightMonth);
       }
     },
     methods: {
       showDaySetting() {
         this.showCalendar = true;
       },
       showWeekPreference() {
         this.showCalendar = true;
       },
       previousMonth() {
         if (this.leftMonth > 0) {
           this.leftMonth--;
           this.rightMonth--;
         } else {
           this.leftMonth = 11;
           this.rightMonth = 0;
           this.year--;
         }
       },
       nextMonth() {
         if (this.rightMonth < 11) {
           this.leftMonth++;
           this.rightMonth++;
         } else {
           this.leftMonth = 0;
           this.rightMonth = 1;
           this.year++;
         }
       },
       generateDays(year, month) {
         const daysInMonth = new Date(year, month + 1, 0).getDate();
         const days = [];
         for (let i = 1; i <= daysInMonth; i++) {
           days.push(new Date(year, month, i));
         }
         return days;
       },
       // selectDate(day) {
       //   const index = this.selectedDates.indexOf(day);
       //   if (index === -1) {
       //     this.selectedDates.push(day);
       //   } else {
       //     this.selectedDates.splice(index, 1);
       //   }
       
       selectDate(day) {
         const index = this.selectedDates.findIndex(selectedDate => 
            selectedDate.getDate() === day.getDate() && 
            selectedDate.getMonth() === day.getMonth() && 
            selectedDate.getFullYear() === day.getFullYear()
         );
         if (index === -1) {
           this.selectedDates.push(day);
           this.excludeDates = this.excludeDates.filter(excludeDate => 
             !(excludeDate.getDate() === day.getDate() && 
               excludeDate.getMonth() === day.getMonth() && 
               excludeDate.getFullYear() === day.getFullYear())
           );
         } else {
           this.selectedDates.splice(index, 1);
           this.excludeDates.push(day);
         }
       },
 
       getDayClass(day) {
         const isSelected = this.selectedDates.some(selectedDate =>
           selectedDate.getDate() === day.getDate() &&
           selectedDate.getMonth() === day.getMonth() &&
           selectedDate.getFullYear() === day.getFullYear()
         );
         const isExcluded = this.excludeDates.some(excludeDate => 
           excludeDate.getDate() === day.getDate() && 
           excludeDate.getMonth() === day.getMonth() &&
           excludeDate.getFullYear() === day.getFullYear()
         );
         const isInRange = this.isInRange(day) && !isExcluded;
         return {
           'selected': isSelected,
           'in-range': isInRange
         };
       },
       isInRange(day) {
         if (!this.fromDate || !this.toDate) {
           return false;
         }
         const fromDate = new Date(this.fromDate);
         const toDate = new Date(this.toDate);
         return day >= fromDate && day <= toDate;
       },
       saveDates(){
         console.log('From date:', this.fromDate)
         console.log('To date:', this.toDate)
         const inRangeDates = this.selectedDates.filter(day => this.isInRange(day));
         console.log('Selected dates in range: ', inRangeDates);
       }
     }
   };
   </script>
   
   <style>
   .calendar-container {
     display: flex;
     background-color: #202933;  
     max-width: 687px;
     /* padding-left: 11px; */
     border-radius: 17px;
   }
   .calendar {
     margin: 10px;
   }
   .calendar-header {
     font-family: cursive;
     display: flex;
     justify-content:center;
     align-items: center;
     text-align: center;
     color: #ffffffc4;
     font-weight: bold;
     margin-bottom: 1px;
     padding: 12px;
     background-color: #276899;
     border-radius: 4px;
     /* background-color: #54a1c7; */
     color: ffffffc4;
   }
   
   .calendar-body {
     display: flex;
     flex-wrap: wrap;
     background-color: #121a22;
 
   }
   .calendar-grid {
     display: grid;
     grid-template-columns: repeat(7, 1fr);
   }
   .calendar-grid div {
     text-align: center;
     padding: 5px;
     /* background-color: #121a22; */
     border: 1px solid #17272fa8;
     border-radius: 3px;
   }
   .calendar-grid button {
     width: 100%;
     padding: 10px;
     border: none;
     background: none;
     cursor: pointer;
     color: #ffffffc4;
   }
   .in-range {
     background-color: #27689996;
   }
   .selected {
     background-color:#8000009e;
     color: white;
   }
   #from,#to,#save{
     font-size: small;
     color: #ffffffc4;
     background-color: #276899;
     border: 1px solid #17272fa8;
     margin: 2px;
     border-radius: 4px;
     padding: 2px;
     margin-bottom: 7px;
     font-family: cursive;
   }
   #save{
     margin-left: 90%;
     font-family: cursive;
   }
   #dayS,#weekP{
     font-size: small;
     color: #ffffffc4;
     background-color: #276899;
     border: 1px solid #17272fa8;
     border-radius: 4px;
     padding: 5px;
     font-family: cursive;
     margin-bottom: 5px;
   }  
   #fromL,#toL{
     color: #ffffffc4;
     font-family: cursive;
     font-size: small;
   }
   #contanet1{
     /* border: 5px solid #17272fa8; */
     background-color: #202933;
   }
   html{
     background-color: #0f1d28;
     max-width: 715px;
 
   }
   #btNext1{
     background-color: #d8e0e724;
     color: #ffffffc4;
     border: none;
     margin: 2px;
     border-radius: 20%;
     margin: 1%
   }
     /* border: 1px solid #17272fa8; */
 
   </style>
    -->