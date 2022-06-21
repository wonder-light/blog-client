import env from "@/assets/js/env";
import axios from "axios";

axios.defaults.baseURL = env.serverUrl;
axios.defaults.timeout = 3000;
axios.defaults.responseType = 'json';//'blob';
//axios.defaults.headers.common['Token'] = 'CustomToken';
//axios.defaults.auth = {username: "User", password: "Huyyej55844KJJifdss"};

// 编码 window.btoa('china is so nb')
// 解码 window.atob("Y2hpbmEgaXMgc28gbmI=")

//sessionStorage.setItem('Token', window.btoa(axios.defaults.auth.username + ':' + axios.defaults.auth.password));

// * http request 拦截器
axios.interceptors.request.use(
    config => {
        // * 判断是否存在token，如果存在的话，则每个http header都加上token
        // * token会在登录之后存储在本地
        // @ts-ignore
        if (env.isDev) console.log('http 请求 拦截器', config);
        return config;
    },
    err => {
        if (env.isDev) console.log('http 请求 拦截器 失败', err);
        return Promise.reject(err);
    });

// * http response 拦截器
axios.interceptors.response.use(
    response => {
        if (env.isDev) console.log('http 响应 拦截器', response);
        updateUrl(response.data);
        return response;
    },
    error => {
        if (env.isDev) console.log('http 响应 拦截器 失败', error);
        return Promise.reject(error);
    });

export default axios;

//替换URL
function updateUrl(obj) {
    if (typeof obj !== 'object') {
        return;
    }
    for (let key in obj) {
        let cop = obj[key];
        let type = typeof cop;
        if (type === 'string') {
            //(server)* 匹配0个或者多个
            let reg = /https:\/\/(server)*blog\.nianian\.cn(:8050)*/;
            obj[key] = cop.replace(reg, 'https://localhost:8050');
        }
        else if (type === 'object') {
            updateUrl(cop);
        }
    }
}