import SvgIcon from 'components/common/SvgIcon.vue';
import { Dark, LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { computed, ref } from 'vue'


/**
 * 根据条件进行分组
 * @param {(value: any, index?: number, array?: T[]) => any} call
 * @return {{ [_: string]: Array<any> }}
 */
Array.prototype.group = function (call) {
    const groups = {};
    this.forEach(function (o, i) { //注意这里必须是forEach 大写
        //const group = JSON.stringify(call(o, i));
        const group = call(o, i);
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return groups;
    //return Object.keys(groups).tool((group) => groups[group]);
};


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
    //组件
    app.component('SvgIcon', SvgIcon);
    //捕获
    app.config.warnHandler = warnCaptured;
    app.config.errorHandler = errorCaptured;
    //ref
    app.config.unwrapInjectedRef = true;
    //注入
    app.provide('blogger', '百叶');
    app.provide('avatar', '/image/avatar.png');
    configTheme(app);
    
    if (process.env.DEV) {
        //设置此项为 true 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪
        app.config.performance = true;
    }
    
    if (process.env.CLIENT) {
        window.onmessage = receiveMessage;
    }
})

/**
 * 用于为应用内传递的未捕获的错误指定一个全局处理函数
 * @param {Error} err
 * @param {Component} instance
 * @param {string} info
 */
function errorCaptured(err, instance, info) {
    if (process.env.DEV) {
        console.log('网络错误', err, instance, info);
    }
    //跳转404页面
    //instance.$router.push({ name: 'error' });
}

/**
 * 警告处理器将接受警告信息作为其第一个参数，来源组件实例为第二个参数，以及组件追踪字符串作为第三个参数
 * @param {Error} err
 * @param {Component} instance
 * @param {string} info
 */
function warnCaptured(err, instance, info) {
    if (process.env.DEV) {
        console.log(err, instance, info);
    }
}


//接收从'https://admin.nianian.cn'发送过来的数据
function receiveMessage(event) {
    const origin = process.env.DEV ? 'http://localhost' : 'https://blogadmin.nianian.cn';
    if (event.origin !== origin) return;
    if (event.data.key === process.env.KEY) {
        //setUser(event.data.user);
    }
}

function configTheme(app) {
    const themeRef = ref('')
    const theme = computed({
        get: () => themeRef.value,
        set: v => {
            if (themeRef.value === v) return
            LocalStorage.set('theme', themeRef.value = v)
            Dark.set(v === 'dark')
            if (process.env.CLIENT) {
                const list = document.documentElement.classList
                v === 'dark' ? list.add('tw-dark') : list.remove('tw-dark')
            }
        }
    })
    theme.value = LocalStorage.getItem('theme') ?? 'light'
    app.provide('theme', theme)
}