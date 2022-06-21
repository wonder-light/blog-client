import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import config from "@/assets/js/config";
import provide from "@/assets/js/provide";
import register from "@/assets/js/register";


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(config);
app.use(provide);
app.use(register);
app.mount('#app');
