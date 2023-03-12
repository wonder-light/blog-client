import axios from 'axios'
import { boot } from 'quasar/wrappers'
import { authorization } from 'src/api/encrypt'
//动态导入

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

axios.defaults.baseURL = process.env.API;
axios.defaults.proxy = false;
//axios.defaults.responseType = 'json';
if (process.env.SERVER) {
    //node https请求时self signed certificate in certificate chain错误
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// * http request 拦截器
axios.interceptors.request.use(request);
///const api = axios.create({ baseURL: process.env.API })

export default boot(({ app }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api
    
    app.config.globalProperties.$axios = axios
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file
    
    //app.config.globalProperties.$api = api
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
})


export { axios }


function request(config) {
    // * 判断是否存在token，如果存在的话，则每个http header都加上token
    // * token会在登录之后存储在本地
    // @ts-ignore
    if ((/github/).test(config.baseURL)) {
        return config;
    }
    
    //config.headers.Sign = signEncrypt();
    config.headers.Authorization = authorization();
    return config;
}
