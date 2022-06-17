import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import "@/assets/js/registerServiceWorker";
//插件
import axios from "@/assets/js/axios";
import ElementPlus from "element-plus";
//import jsCookie from "js-cookie";
//组件
import env from "@/assets/js/env";
import functionLibrary from "@/assets/js/functionLibrary";
//样式
//import "element-plus/dist/index.css";
import "@/assets/css/element.scss";
import "animate.css";
import '@/assets/css/global.scss';
//资源
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {locale: sessionStorage.getItem('language') === 'en' ? en : zhCn});

app.config.globalProperties.env = env;
app.config.globalProperties.axios = axios;
app.config.globalProperties.$http = axios;
//app.config.globalProperties.cookie = jsCookie;
app.config.globalProperties.functions = new functionLibrary();

app.mount('#app');
