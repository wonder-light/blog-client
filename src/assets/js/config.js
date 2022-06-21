import '../../interface';
import "./registerServiceWorker";

import env from "@/assets/js/env";
import '@/assets/css/global.scss';
import axios from "@/assets/js/axios";
import ElementPlus from "element-plus";
import { setStoreConfig } from "@/stores/counter";
import functionLibrary from "@/assets/js/functionLibrary";
import "moment/dist/locale/en-nz";
import "moment/dist/locale/zh-cn";


//配置插件
export default {
    install: (app, options) => {
        app.use(ElementPlus);
        app.config.globalProperties.env = env;
        app.config.globalProperties.axios = axios;
        app.config.globalProperties.$http = axios;
        //app.config.globalProperties.cookie = jsCookie;
        app.config.globalProperties.functions = new functionLibrary();
        //postcssCustomMedia.process('../css/base.scss' /*, processOptions, pluginOptions */);
        setStoreConfig(app);
    }
};
