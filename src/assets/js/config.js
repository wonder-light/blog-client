import '../../interface';

import env from "@/assets/js/env";
import '@/assets/css/global.scss';
import axios from "@/assets/js/axios";
import ElementPlus from "element-plus";
import functionLibrary from "@/assets/js/functionLibrary";
import "moment/dist/locale/en-nz";
import "moment/dist/locale/zh-cn";
import { setStoreConfig } from "@/stores/counter";


//配置插件
export default {
    install: (app, options) => {
        app.use(ElementPlus);
        app.config.globalProperties.env = env;
        app.config.globalProperties.axios = axios;
        app.config.globalProperties.$http = axios;
        app.config.globalProperties.functions = new functionLibrary();
    
        setStoreConfig();
    
        if (env.isDev) {
            //设置此项为 true 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪
            app.config.performance = true;
        }
    }
};
