import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './interface';
import "./assets/js/registerServiceWorker";

import env from "@/assets/js/env";
import '@/assets/css/global.scss';
import axios from "./assets/js/axios";
import ElementPlus from "element-plus";
import en from "element-plus/es/locale/lang/en";
import { setStoreConfig } from "@/stores/counter";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import functionLibrary from "@/assets/js/functionLibrary";

const app = createApp(App);
app.use(createPinia());

setStoreConfig();

app.use(router);
app.use(ElementPlus, {locale: sessionStorage.getItem('language') === 'en' ? en : zhCn});

app.config.globalProperties.env = env;
app.config.globalProperties.axios = axios;
app.config.globalProperties.$http = axios;
//app.config.globalProperties.cookie = jsCookie;
app.config.globalProperties.functions = new functionLibrary();

app.mount('#app');
