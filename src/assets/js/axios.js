import { replaceUrl } from "@/assets/js/api";
import env from "@/assets/js/env";
import axios from "axios";

axios.defaults.baseURL = env.serverUrl;
axios.defaults.timeout = 3000;
axios.defaults.responseType = 'json';//'blob';

if (env.isDev) {
    // * http request 拦截器
    axios.interceptors.request.use(config => {
            // * 判断是否存在token，如果存在的话，则每个http header都加上token
            // * token会在登录之后存储在本地
            // @ts-ignore
            console.log('http 请求 拦截器', config);
            return config;
        },
        err => {
            console.log('http 请求 拦截器 失败', err);
            return Promise.reject(err);
        });
    
    // * http response 拦截器
    axios.interceptors.response.use(response => {
            console.log('http 响应 拦截器', response);
            //(server)* 匹配0个或者多个
            let reg = /https:\/\/(server)*blog\.nianian\.cn(:8050)*/;
            replaceUrl(response.data, reg, 'https://localhost:8050');
            return response;
        },
        error => {
            console.log('http 响应 拦截器 失败', error);
            return Promise.reject(error);
        });
}

export default axios;