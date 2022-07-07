import { useCounterStore } from "@/stores/counter";
import axios from "@/assets/js/axios";
import env from "@/assets/js/env";
import moment from "moment";


//设置状态配置
export function setStoreConfig() {
//数据持久化
    const instance = useCounterStore();
    // 1. 获取保存的数据，先判断有无，无则用先前的
    const old = localStorage.getItem('counter-store');
    if (old) {
        //替换状态
        instance.$state = JSON.parse(old);
        instance.$patch(state => {
            state.githubRepository = null;
            state.giteeRepository = null;
        });
    }
    // 2. 订阅保存数据
    instance.$subscribe((_, state) => {
        localStorage.setItem('counter-store', JSON.stringify({...state}));
    });
}

//设置用户(具有权限的用户)
export function setUser(user) {
    const instance = useCounterStore();
    instance.$patch(state => {
        state.tourist = user;
        state.isUser = true;
    });
}

//更新数据的版本
export async function updateVersion() {
    const instance = useCounterStore();
    await axios.get('/blog/version').then(response => {
        let newVersion = response.data; //新版本
        let oldVersion = instance.version; //旧版本
        if (!oldVersion || typeof oldVersion !== 'object') {
            instance.$reset();
        }
        else {
            instance.$patch(state => {
                if (oldVersion.blogInfo !== newVersion.blogInfo) {
                    state.blogInfo = null;
                }
                if (oldVersion.album !== newVersion.album) {
                    state.albums = null;
                }
                if (oldVersion.article !== newVersion.article) {
                    state.articles = [];
                }
                if (oldVersion.comment !== newVersion.comment) {
                    state.commentSet = {};
                }
                if (oldVersion.tag !== newVersion.tag) {
                    state.tags = null;
                }
                if (oldVersion.type !== newVersion.type) {
                    state.types = null;
                }
                if (oldVersion.user !== newVersion.user) {
                    state.blogger = null;
                    state.tourist = null;
                }
            });
        }
        //设置版本
        instance.$patch(state => state.version = newVersion);
    }).catch();
}

//在对象的字符串中替换指定的值
export function replaceUrl(obj, search, replace) {
    if (typeof obj !== 'object') {
        return;
    }
    for (let key in obj) {
        let cop = obj[key];
        let type = typeof cop;
        if (type === 'string') {
            //(server)* 匹配0个或者多个
            //let reg = /https:\/\/(server)*blog\.nianian\.cn(:8050)*/;
            obj[key] = cop.replace(search, replace);
        }
        else if (type === 'object') {
            replaceUrl(cop);
        }
    }
}

//字符串转字节序列
export function stringToByte(str) {
    let bytes = [];
    let len, c;
    len = str.length;
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }
        else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }
        else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        }
        else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}

//字节序列转ASCII码
//[0x24, 0x26, 0x28, 0x2A] ==> "$&C*"
export function byteToString(arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    let str = '', _arr = arr;
    for (let i = 0; i < _arr.length; i++) {
        let one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length === 8) {
            let bytesLength = v[0].length;
            let store = _arr[i].toString(2).slice(7 - bytesLength);
            for (let st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        }
        else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}

//获取元素到文档顶部的距离 https://blog.csdn.net/weichangIT/article/details/88185250
//在顶部的下面为正, 上面为负
export function getTopDistance(el) {
    let top = 0;
    while (el.offsetParent) {
        top += el.offsetTop;
        el = el.offsetParent;
    }
    return top;
}

//获取元素到文档底部的距离
export function getBottomDistance(el) {
    let top = getTopDistance(el);
    return document.documentElement.offsetHeight - (el.offsetHeight + top);
}

//获取元素到视口顶部的距离
//在顶部的下面为正, 上面为负
export function getTopToView(el) {
    let top = getTopDistance(el);
    return top - document.documentElement.scrollTop;
}

//获取元素到视口底部的距离
//在底部的面上为正, 下面为负
export function getBottomToView(el) {
    let top = getTopDistance(el);
    return (window.innerHeight + document.documentElement.scrollTop) - (top + el.offsetHeight);
}

//获取滚动容器中“滚动内容”到容器顶部的距离
//在顶部的下面为正, 上面为负
export function scrollTop(el) {
    return el.scrollTop;
}

//获取滚动容器中“滚动内容”到容器底部的距离
//在底部的下面为正, 上面为负
export function scrollBottom(el) {
    return el.scrollHeight - el.offsetHeight - el.scrollTop;
}

//获取id
export function getId(prefix = 'id') {
    env.id += 1;
    return prefix + env.id;
}

// 判断当前设备是否是移动设备
export function isMobile() {
    //获取userAgent信息
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag != null && flag.length > 0;
}

/*
 * 获取距离时间戳最近的日期格式
 * 如： 刚刚，4分钟强，4小时前，3天前，6月-6日，，，，
 * @param TimeStamp 指定的时间戳
 */
export function getNearestDate(TimeStamp) {
    let now = moment();
    let before = moment(TimeStamp);
    let days = Math.abs(now.diff(before, 'days'));
    if (days >= 90) {
        return before.format('Y-M-D');
    }
    return before.fromNow();
}

//打开网页
export function openWebPage(url, target = '_blank') {
    if (!url) return;
    window.open(url, target);
}

//随机颜色
export function randomColor(min = 0) {
    //'| 0' 的作用是去除小数部分
    return '#' + ((Math.random() * (0x1000000 - min) + min) | 0).toString(16);
}

//随机整数
export function randomNumber(min = 0, max = 1) {
    let value = Math.random() * (max - min) + min;
    return Math.round(value);
}

//判断两个对象是否相同，相同返回 true，否则返回 false
export function objectEqual(a, b) {
    // 判断两个对象是否指向同一内存，指向同一内存返回true
    if (a === b) return true;
    // 获取两个对象键值数组
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    // 判断两个对象键值数组长度是否一致，不一致返回false
    if (aProps.length !== bProps.length) return false;
    // 遍历对象的键值
    for (let prop in a) {
        // 判断a的键值，在b中是否存在，不存在，返回false
        // eslint-disable-next-line no-prototype-builtins
        if (b.hasOwnProperty(prop)) {
            // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
            if (typeof a[prop] === 'object') {
                if (!objectEqual(a[prop], b[prop])) {
                    return false;
                }
            }
            else if (a[prop] !== b[prop]) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return true;
}

//验证邮箱,正确返回true,否则返回false
export function verifyEmail(email) {
    //邮箱 正则验证
    let verify = /^([a-zA-Z\d]+[_|\-.]?)*[a-zA-Z\d]+@([a-zA-Z\d]+[_|\-.]?)*[a-zA-Z\d]+\.[a-zA-Z]{2,3}$/;
    return verify.test(email);
}

//验证链接,正确返回true,否则返回false
export function verifyLink(link) {
    //网址 正则验证  参考网页: https://www.phpernote.com/javascript-function/337.html
    
    //正则表达式对象
    let verify = new RegExp("^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
        + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");
    return (link && link.length > 0 && verify.test(link));
}