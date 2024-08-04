<template>
    <div class="calendar-container">
      <div class="header">
        <button @click="prevMonth">Prev</button>
        <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
        <button @click="nextMonth">Next</button>
      </div>
      <table class="calendar">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in weeks" :key="week[0].date || week[0].key">
            <td
              v-for="day in week"
              :key="day.date || day.key"
              :class="{
                clickable: day.date && !day.isWeekend,
                nonClickable: day.date && day.isWeekend,
                clicked: day.date && day.clicked
              }"
              @click="toggleClick(day)"
            >
              {{ day.date || '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyCalendar',
    data() {
      return {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        weeks: []
      };
    },
    created() {
      this.generateCalendar();
    },
    methods: {
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
        }
  
        // Fill in the last week with empty days if necessary
        while (week.length < 7) {
          week.push({ key: `empty-${week.length}` });
        }
  
        if (week.length) {
          weeks.push(week);
        }
  
        this.weeks = weeks;
      },
      toggleClick(day) {
        if (day.date && !day.isWeekend) {
          day.clicked = !day.clicked;
        }
      },
      prevMonth() {
        if (this.currentMonth === 0) {
          this.currentMonth = 11;
          this.currentYear--;
        } else {
          this.currentMonth--;
        }
        this.generateCalendar();
      },
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
  .calendar-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #37474F;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #42A5F5; /* צבע רקע לכפתורים */
    
  }
  
  .header button {
    padding: 10px 20px;
    background-color: #64B5F6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .header span {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .calendar {
    width: 100%;
    border-collapse: collapse;
  }
  
  .calendar th,
  .calendar td {
    width: 14.28%;
    padding: 10px;
    text-align: center;
    border: 1px solid #37474F;
    color: white;
  }
  
  .calendar th {
    background-color: #263238;
  }
  
  .clickable {
    background-color: #263238; /* אפור כהה */
  }
  
  .clickable.clicked {
    background-color: #1565C0; /* תכלת */
  }
  
  .nonClickable {
    background-color: #800020; /* בורדו */
    cursor: not-allowed;
  }
  
  @media (max-width: 600px) {
    .header button {
      padding: 5px 10px;
    }
  
    .header span {
      font-size: 1em;
    }
  
    .calendar th,
    .calendar td {
      padding: 5px;
    }
  }
  </style>
  