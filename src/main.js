import { createApp } from 'vue';
import Toast from 'vue-toastification';
import './style.css';
import App from './App.vue';
import 'vue-toastification/dist/index.css';

import store from './store';

createApp(App)
  .use(Toast)
  .use(store)
  .mount('#app');
