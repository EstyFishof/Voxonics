<template>
  <div id="contanet1">
    <button class="top-buttons" id="dayS" @click="showDaySetting">Day Setting</button>
    <button class="top-buttons" id="weekP" @click="showWeekPreferenceFunc">Week Preference</button>
    <label id="fromL" for="from">From: </label>
    <input type="date" id="from" v-model="fromDate" />

    <label id="toL" for="to">To: </label>
    <input type="date" id="to" v-model="toDate" />

    <div v-if="showCalendar && !showWeekPreference" class="calendar-time-container">
      <div class="calendar">
        <div class="calendar-header">
          <button id="btNext1" @click="previousMonth">←</button>
          <span>{{ monthNames[leftMonth] }} {{ year }}</span>
        </div>
        <div class="calendar-body">
          <div class="calendar-grid">
            <div v-for="(day, index) in leftMonthDays" :key="index" :class="getDayClass(day, index)">
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
              <button @click="selectDate(day, index)">
                {{ day.getDate() }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save button -->
      <button id="save" @click="saveDates">Save</button>

      <!-- Time Settings -->
      <div v-if="allDatesInRange.length > 0" class="time-settings">
        <h3>Time Settings</h3>
        <div class="time-setting-container">
          <div v-for="date in allDatesInRange" :key="date" @click="selectTimeSetting(date)" class="time-setting-date">
           <div id="day"> {{ formatDate(date).day }}</div>
           <div id="month"> {{ formatDate(date).month }}</div>
           <div id="day-name"> {{ formatDate(date).dayName }}</div>
          </div>
        </div>

        <div v-if="selectedTimeSettingDate" class="time-inputs">
          <h4>Time for {{ formatDate(selectedTimeSettingDate) }}</h4>
          <label>From: <input type="time" v-model="timeFrom1" /></label>
          <label>To: <input type="time" v-model="timeTo1" /></label>
          <label>From: <input type="time" v-model="timeFrom2" /></label>
          <label>To: <input type="time" v-model="timeTo2" /></label>
          <button @click="saveTimeSettings">Save</button>
        </div>
      </div>>
    </div>


    <div v-if="showWeekPreference && !showCalendar" class="week-preferences-settings">
      
   <div class="time-container"> 
  <!-- <div class="time-zone-container"> -->
    <label class="labels-week-preference">Time Zone: </label>
    <select class="select-week-times" v-model="selectedTimeZone">
      <option v-for="zone in timeZones" :key="zone" :value="zone">{{ zone }}</option>
    </select>
  <!-- </div> -->
  <!-- <div class="time-select-container"> -->
    <label class="labels-week-preference">Select time:</label>
    <select class="select-week-times" v-model="selectTimeFrom">
      <option v-for="time in timeSlots" :key="time" :value="time">{{ time }}</option>
    </select>
    <span> – </span>
    <select class="select-week-times" v-model="selectTimeTo">
      <option v-for="time in timeSlots" :key="time" :value="time">{{ time }}</option>
    </select>
    <button id="add-time-title" @click="addTimeSlot(day)">+ Add time</button>
  <!-- </div> -->
</div>  
</div>


      <div class="week-grid">
        <div v-for="(row, index) in WeekPreferences" :key="index" class="week-row">
          <button @click="toggleSelect(index)">
            {{ row.selected ? '♥' : ' ' }}
          </button>
          <span>{{ row.day }}</span>
          <div>
            <div v-for="(slot, slotIndex) in row.timeSlots" :key="slotIndex" class="time-slot">
              <label>From: <input type="time" v-model="slot.from" /></label>
              <label>To: <input type="time" v-model="slot.to" /></label>

              <button @click="addTimeSlot(index)">+ ADD TIME</button>
            </div>
          </div>
          <button @click="addWeekRow(row.day)">+ ADD DAY</button>
        </div>
        
      </div>

      <!-- Week Settings Section -->
      <div id="weekSettings" v-if="(this.showWeekPreference)">
  <div v-for="(day, index) in weekDays" :key="index" class="day-row">
    <input id="checkbox" type="checkbox" v-model="weekPreferences[day].selected" class="custom-checkbox" />
    <label class="days-label" for="checkbox">{{ day }}</label>

    <div v-if="weekPreferences[day].selected" class="time-section">
      <!-- <div v-ix f="weekPreferences[day].selected" class="time-section"> -->
      <div v-for="(time, timeIndex) in weekPreferences[day].times" :key="timeIndex" class="time-row">
        <input type="time" v-model="time.from" />
        <span>–</span>
        <input type="time" v-model="time.to" />
        <!-- <button @click="removeTimeSlot(day, timeIndex)">X</button> -->
        <button id="addT" @click="addTimeSlot(day)">+ Add time</button>
        <img src="C:\Users\USER\Documents\GitHub\Voxonics-FullStack\vox\src\assets\img\delete.png" alt="Delete" class="delete-icon"  @click="removeTimeSlot(day, timeIndex)" />
        <!-- <img src="...\assets\img\delete.png" alt="Delete" class="delete-icon"  @click="removeTimeSlot(day, timeIndex)" /> -->
      </div>
      
    </div>
  </div>
  <button id="saveWeekPreferences" @click="saveWeekPreferences">save</button>
</div>      
    </div>

</template>

<script>
export default {
  data() {
    return {
      allDatesInRange: [],     // המערך שיכיל את כל התאריכים בטווח
      fromDate: '',
      toDate: '',
      showCalendar: false,
      showWeekPreference: false,
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
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // WeekPreferences: [],
      // Week Preferences Data
      isDaySetting: true,
      isWeekPreference: false,
      selectedTimeZone: 'GMT +0',
      selectTimeFrom: '08:00',
      selectTimeTo: '18:00',
      timeZones: ['GMT +0', 'GMT +1', 'GMT +2', 'GMT +3'],
      timeSlots: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekPreferences: {
        Monday: { selected: false, times: [{ from: '', to: '' }] },
        Tuesday: { selected: false, times: [{ from: '', to: '' }] },
        Wednesday: { selected: false, times: [{ from: '', to: '' }] },
        Thursday: { selected: false, times: [{ from: '', to: '' }] },
        Friday: { selected: false, times: [{ from: '', to: '' }] },
        Saturday: { selected: false, times: [{ from: '', to: '' }] },
        Sunday: { selected: false, times: [{ from: '', to: '' }] },
      },


    };
  },

  methods: {
    // Toggle Views
    // showDaySetting() {
    //   this.isDaySetting = true;
    //   this.isWeekPreference = false;
    // },
    // showWeekPreferenceFunc() {
    //   this.isDaySetting = false;
    //   this.isWeekPreference = true;
    // },

    generateDateRange(startDate, endDate) {
      let dateArray = [];
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dateArray;
    },

    updateDateRange() {
      if (this.fromDate && this.toDate) {
        this.allDatesInRange = this.generateDateRange(this.fromDate, this.toDate);
      }
    },

    showDaySetting() {
      this.showCalendar = true;
      this.showWeekPreference = false;

      this.updateDateRange();
    },
    showWeekPreferenceFunc() {
      console.log('week preeeee clicked')
      this.showCalendar = false;
      this.showWeekPreference = true;
    },

    addWeekRow(day) {
      this.WeekPreferences.push({
        day: day,
        timeSlots: [{ from: '', to: '' }]
      })
    },

    addTimeSlot(dayIndex) {
      this.WeekPreferences[dayIndex].timeSlots.push({ from: '', to: '' })
    },

    toggleSelect(dayIndex) {
      const selected = this.WeekPreferences[dayIndex].selected;
      this.$set(this.WeekPreferences, dayIndex, {
        ...this.WeekPreferences[dayIndex],
        selected: !selected
      });
    },

    saveWeekPreferences() {
      const selectedPreferences = this.WeekPreferences.filter(row => row.selected);
      console.log('Selected week Preferences: ', selectedPreferences);
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
        // הוספת תאריך שנבחר
        this.selectedDates.push(day);
        // הסרתו מהמערך של תאריכים בטווח
        this.allDatesInRange = this.allDatesInRange.filter(date =>
          !(date.getDate() === day.getDate() &&
            date.getMonth() === day.getMonth() &&
            date.getFullYear() === day.getFullYear())
        );
      } else {
        // הסרת תאריך שנבחר
        this.selectedDates.splice(index, 1);

        // הוספתו מחדש למערך של תאריכים בטווח
        this.allDatesInRange.push(day);
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
        "calendar-day": true,
        'selected': isSelected,
        'excluded': isExcluded,
        'in-range': !isSelected && isInRange

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
    isExcluded(day) {
      return this.excludeDates.some(excludeDate =>
        excludeDate.getDate() === day.getDate() &&
        excludeDate.getMonth() === day.getMonth() &&
        excludeDate.getFullYear() === day.getFullYear()
      );
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
      return {day,month,dayName}
      
      // `${day} ${month} ${dayName}`;

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
    },

    // Week Preference Methods
    // addTimeSlot(day) {
    //   this.weekPreferences[day].times.push({ from: '', to: '' });
    // },
    removeTimeSlot(day, index) {
      this.weekPreferences[day].times.splice(index, 1);
    },
    saveWeekSettings() {
      console.log("Week Preferences:", this.weekPreferences);
    },
  },
  computed: {
    leftMonthDays() {
      return this.generateDays(this.year, this.leftMonth);
    },
    rightMonthDays() {
      return this.generateDays(this.year, this.rightMonth);
    },
    filteredInRangeDates() {
      return this.selectedDates.filter(date =>
        date >= new Date(this.fromDate) && date <= new Date(this.toDate)
      );
    },
    // formatDate() {
    //   return date => date.toDateString();
    // }
  }
};
</script>



<style>
.calendar-container {
  display: flex;
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
  /* background-color: #27689996; */
}

.selected {
  /* background-color: #8000009e; */
  background-color: #8000005e;
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

/* #save {
  margin-left: 35%;
  font-family: cursive;
} */

#saveDays{
    margin: 20px 0;
    margin-top: 32%;
}

#dayS,
#weekP {
  font-size: small;
  color: #ffffffc4;
  /* background-color: rgb(35,44,54);  */
  border: 1px solid #17272fa8;
  border-radius: 4px;
  padding: 10px;
  font-family: cursive;
  margin-bottom: 5px;
  margin: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

/* #dayS, #weekP :hover{
  background-color: rgb(39,104,153);
}
#dayS, #weekP :active{
  background-color: rgb(39,104,153);
} */

#fromL,
#toL {
  color: #ffffffc4;
  font-family: cursive;
  font-size: small;
  margin-left: 1%;
}


#contanet1 {
  margin-top: 2%;
}

html {
  background-color: #0f1d28;
  /* max-width: 715px; */
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
  /* width: 100%;
  padding: 10px; */
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 20px;
  /* background-color: #202933; */
  padding: 10px;
  border-radius: 10px;
  /* display: table-caption; */
}

.time-settings h3 {
  color: #414d5b;
  font-family: cursive;
}

.time-setting-date {
  display: table-cell;
  font-size: 10px;
  text-align: center;
  /* חדש */
  /* background-color: #121a22; */

  background: linear-gradient(to bottom, rgb(26,35,45), rgb(59,71,85));  
  border: 1px solid #17272fa8;
  margin: 1%;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  padding: 2%;
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

h4 {
  font-family: cursive;
  font-size: x-small;
  color: #276899;
  text-align: center;
  margin: 9px;
}

.week-preference-settings {
  padding: 10px;
  background-color: #202933;
  border-radius: 10px;
}

.week-row {
  display: flex;
  align-items: left;

  /* חדש */
  /* align-items: center; */
  margin-bottom: 10px;
}

.time-slot {
  margin-bottom: 10px;
}

input[type="time"],
#addT {
  /* חדש */
  width: 150px;
  margin: 0 5px;
  margin: 0 5px;
  color: #ffffffc4;
  background-color: #202933;
  /* z-index: 1000; */
  display: inline;
  justify-content: space-around;
  /* background: var(--cdr-filter-bg); */
  /* margin-top: -22px; */
  /* padding: 16px 18px 0 18px; */
  
  width: 80px;
  height: 28px;
  box-sizing: border-box;
}

/* #save {
  margin-left: 35%;
  font-family: cursive;
} */

#checkbox {
  opacity: 100%;
  color: transparent;
  margin-right: 10px;
  z-index: 9;
  width: 16px;
  height: 16px;
  position: relative;
}

/* #day-row {
  background-color: #4e84c2;
} */
.day-row {
  display: flex;
  flex-direction: row; /* Align items horizontally */
  align-items: center;
  gap: 10px; /* Space between the checkbox, label, and time inputs */
  margin-bottom: 10px; /* Add some space between rows */
}

.time-section {
  display: flex;
  flex-direction: row; /* Align items horizontally */
  align-items: center;
  gap: 10px; /* Space between time inputs and remove button */
  flex-wrap: wrap; /* Allows items to wrap to the next line if necessary */
}

.time-row {
  display: flex;
  align-items: center;
  gap: 5px; /* Space between time inputs and remove button */
}

#addT {
  margin-left: 10px;
  /* padding: 5px 10px; */
  cursor: pointer;
  border: rgb(39,104,152) dotted 2px;
  border-radius: 4px;
  color: rgb(39,104,152);
}
/* 
button {
  border: none;
  background-color: transparent;
  cursor: pointer;
} */

.calendar-time-container {
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
  display: flex;
  align-items: flex-start;
  /* מוודא שהאלמנטים יהיו מיושרים בקצה העליון */
}

.calendar-container {
  flex: 1;
  margin-right: 20px;
  /* הוסף רווח בין הלוח שנה לגדרות הזמן */
}

.calendar {
  margin-bottom: 20px;
  /* רווח בין הלוחות שנה אם יש יותר מלוח אחד */
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.calendar-body {
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-grid div {
  padding: 5px;
  text-align: center;
}

.time-settings {
  padding: 15px;
}

.time-inputs label {
  display: block;
  margin-bottom: 10px;
}

#save {
  margin-top: auto;
  display: block;
  font-family: cursive;
  /* margin: 20px 0; */
}

.time-settings {
  display: flex;
  flex-direction: column;
}

.time-inputs {
  margin-top: 20px;
  /* שמירת רווח בין התאריכים להגדרות הזמן */
}

/* button {
  margin-top: 10px;
} */

/* Time Settings Container */
.time-settings {
  background-color: var(--substrate);
  /* background-color: #2f3a47; */
  padding: 20px;
  /* border-radius: 10px; */
  /* max-width: 900px; */
  max-width: 55%;
  color: #e2e8f0;
  font-family: Arial, sans-serif;
}

/* Date Container - שתי שורות עם גלילה לרוחב */


/* Individual Date Style */
.time-setting-date {
  /* background-color: #3a4654; */
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  width: 80px;
  height: 85px;
  /* קביעת גובה ורוחב קבועים */
  color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  /* כל תוכן בתוך הריבוע יישאר בעמודה */
  justify-content: center;
  /* ממקם את התוכן במרכז האנכי */
  align-items: center;
  /* ממקם את התוכן במרכז האופקי */
  overflow: hidden;
  /* טקסט שלא מתאים לא יגלוש מחוץ לריבוע */
}

.time-setting-date span {
  font-size: 14px;
  /* גודל טקסט אחיד */
}

.time-setting-date:hover {
  background-color: #4b5765;
}

/* Input Times Section */
.time-inputs {
  /* background-color: #3a4654; */
  /* padding: 10px; */
  border-radius: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

/* Time Inputs */
input[type="time"] {
  background-color: #2f3a47;
  border: 1px solid #4b5765;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  width: 80px;
}

/* Toggle Settings (Enable/Disable) */
.toggle-settings {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.toggle-settings label {
  color: #e2e8f0;
}

input[type="radio"] {
  margin-right: 5px;
}


.time-setting-container {
  display: grid;
  grid-template-columns: repeat(10, 2fr);
  /* 6 תאריכים בשורה */
  grid-auto-rows: minmax(100px, auto);
  gap: 1%;
  /* רווח בין התאריכים */
  overflow-x: auto;
  /* גלילה לרוחב */
  max-width: 100%;
  /* גודל הגלילה */
  /* padding: 10px 3; */
  margin-bottom: 5px;
  /* white-space: nowrap; */
  /* white-space: break-spaces; */
  padding: 1%
}

.top-buttons {
  background-color: rgb(35, 44, 54);
}

.top-buttons:active {
  background-color: rgb(39, 104, 153);

}

.top-buttons:hover {
  background-color: rgb(39, 104, 153);

}

.week-preferences-settings {
  display: flex;
  flex-direction: column;
  /* סדר את האלמנטים אחד מתחת לשני */
  align-items: flex-start;
  /* יישר את התוכן בצד שמאל */
  margin-left: 0;
  /* הצב את ה-div בצד השמאלי של העמוד */
  width: 300px;
  /* אתה יכול לשנות את הרוחב לפי הצורך */
  padding: 10px;
}

.week-preferences-settings>* {
  margin-bottom: 10px;
  /* ריווח בין האלמנטים */
}

#weekSettings{
  background-color: var(--substrate);
    padding: 20px;
    max-width: 55%;
    font-family: Arial, sans-serif;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.custom-checkbox {
  position: relative;
  width: 20px;
  height: 20px;
  -webkit-appearance: none; /* Hide the default checkbox */
  appearance: none;
  border-radius: 50%; /* Make it a circle */
  /* border: 2px solid #ccc; Gray border */
  background-color: white; /* White background */
  border:3px solid rgb(39,104,152); /* Light blue border */

  cursor: pointer;
}
.custom-checkbox::after {
  font-size: 25px; /* Increase font size for thicker '+' */
  font-weight: bold; 
  content: '+'; /* Add '+' symbol */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: rgb(39,104,152); /* Light blue color for '+' symbol */
  pointer-events: none; /* Make sure the symbol doesn't interfere with checkbox interaction */
}

.custom-checkbox:checked {
  background-color:rgb(39,104,152); /* Light blue when checked */
  /* border-color: #add8e6; Change border color when checked */
}

.custom-checkbox:checked::after {
  content: '✔'; /* Check mark */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: white; /* Checkmark color */
  border:rgb(39,104,152);

}
.delete-icon{
  height: 20px;
  width: 20px;
}
.settings-container {
  background-color: rgb(39,104,152);
  color: #ffffff;
  display: flex;
  align-items: center; /* Center items vertically */
  gap: 20px; /* Space between elements */
}


#saveWeekPreferences{
  background-color: rgb(39,104,152);
  
}
.days-label{
  color: #ffffff;
}




.labels-week-preference{
  color: #ffffff;
  /* padding-top: 3%; */
 
  margin: 0; /* מבטל את הרווחים הסטנדרטיים של הלייבלים */


}
.time-container{
padding-top: 3%;
padding-bottom: 3%;
background-color: rgb(39,104,152);
width: 600px;
height: 30px;
display: flex;
align-items: center; /* מרכז אנכית את כל האלמנטים */
gap: 15px; /* רווח של 15px בין האלמנטים */
}
.select-week-times{
  padding: 3px;
  background-color: rgb(74,128,169);
  border: none;
  color:#ffffff;
}
#add-time-title{
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  border: #ffffff dotted 2px;
  border-radius: 4px;
  color:  #ffffff;
  background-color: rgb(39,104,152);
}
#day{
  font-family: 'Arial Narrow', Arial, sans-serif;

font-size: 15px;
font-weight: 20;

}
#month{
font-size: 14px;
font-weight: 20;



}
#day-name{
  font-size: 15px;
  font-weight: 20;

}
</style>
