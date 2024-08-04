<template>
    <div class="calendar-container">
        
      <div>
        <label> From : <input type="date" v-model="startDate" @change="updateClosedDays"></label>
        <label> to :   <input type="date" v-model="endDate" @change="updateClosedDays">  </label>
        <button @click="saveChanges">Save</button> 
        <button @click="nextMonth">Next</button>   <!--xx-->
        <!-- <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>  xx -->
        <button @click="prevMonth">Prev</button> <!--xx-->

      </div>
      <div class="calendar">
        <div class="month"><h3>{{ currentMonthName }}</h3>
          <div v-for="(day, index) in currentMonthDays" :key="index" :class="['day', isClosed(day) ? 'closed' : '']">{{ day }}</div>
        </div>
        <div class="month"><h3>{{ nextMonthName }}</h3>
          <div v-for="(day, index) in nextMonthDays" :key="index" :class="['day', isClosed(day) ? 'closed' : '']">{{ day }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      const today = new Date();
      return {
        startDate: '',endDate: '', closedDays: [],
        month: today.getMonth(),
        year: today.getFullYear(),
        currentMonthDays: this.getDaysInMonth(today.getFullYear(), today.getMonth()), //חודש נוכחי
        nextMonthDays: this.getDaysInMonth(today.getFullYear(), today.getMonth() + 1), //חודש הבא
      };
    },
    computed: {
      currentMonthName() {
        return new Date(this.year, this.month).toLocaleString('default', { month: 'long', year: 'numeric' }); },
      nextMonthName() {
        return new Date(this.year, this.month + 1).toLocaleString('default', { month: 'long', year: 'numeric' }); },
    },

    methods: {
      getDaysInMonth(year, month) {
        return Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1); },
      updateClosedDays() {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        this.closedDays = [];
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          this.closedDays.push(new Date(d).getDate());
        }
      },
      isClosed(day) {
        return this.closedDays.includes(day);
      },
      saveChanges() {
        alert('Changes saved!');
        // כאן אפשר להוסיף לוגיקה לשמירה קבועה אם יש צורך
      },
      generateCalendar() {
        let date = new Date(this.currentYear, this.currentMonth, 1);
        let weeks = [];
        let week = [];
  
        // Fill in the first week with empty days if necessary
        for (let i = 0; i < date.getDay(); i++) {
          week.push({ key: `empty-${i}` });
        }
  
        while (date.getMonth() === this.currentMonth) {
          week.push({
            date: date.getDate(),
            isWeekend: date.getDay() === 0 || date.getDay() === 6,
            clicked: false,
            key: `day-${date.getDate()}`
          });
  
          if (date.getDay() === 6) {
            weeks.push(week);
            week = [];
          }
  
          date.setDate(date.getDate() + 1);
        }},
    //   <!--xx-->
        prevMonth() {
        if (this.currentMonth === 0) {
          this.currentMonth = 11;
          this.currentYear--;
        } else {
          this.currentMonth--;
        }
        this.generateCalendar();
      },
    //   <!--xx-->
      nextMonth() { 
        if (this.currentMonth === 11) {
          this.currentMonth = 0;
          this.currentYear++;
        } else {
          this.currentMonth++;
        }
        this.generateCalendar();
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    /* 5555 */
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #37474F;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .month {
    border: 1px solid #ccc;
    padding: 10px;
    width: 200px;
  }
  .day {    
    margin: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: inline-block;
    text-align: center;
    line-height: 30px;
  }
  .closed {
    background-color: red;
    color: white;
  }

  /* .inputs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .inputs label {
    margin-right: 10px;
  }
  .inputs button {
    margin-left: 10px;
  } */
  </style>
  


  