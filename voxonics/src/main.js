import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/global.css'; // Import the global stylesheet

createApp(App).use(router).mount('#app');
