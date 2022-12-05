
/*
 * 获取距离时间戳最近的日期格式
 * 如： 刚刚，4分钟强，4小时前，3天前，6月-6日，，，，
 * @param TimeStamp 指定的时间戳
 */
export function getNearestDate(TimeStamp) {
    /*let now = moment();
    let before = moment(TimeStamp);
    let days = Math.abs(now.diff(before, 'days'));
    if (days >= 90) {
        return before.format('Y-M-D');
    }
    return before.fromNow();*/
}

/**
 * 随机颜色
 * @param min {number} 最小值
 * @return {string} 16进制字符串
 */
export function randColor(min = 0) {
    //'| 0' 的作用是去除小数部分
    return '#' + ((Math.random() * (0x1000000 - min) + min) | 0).toString(16);
}

/**
 * 随机整数
 * @param min {number} 最小值
 * @param max {number} 最大值
 * @return {number} 随机数
 */
export function randNumber(min = 0, max = 1) {
    let value = Math.random() * (max - min) + min;
    return Math.round(value);
}

/**
 * 16进制字符串转base64字符串
 * @param str {string} 16进制字符串
 * @return {string} base64字符串
 */
export function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/[\r\n]/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

/**
 * base64字符串转16进制字符串
 * @param str {string} base64字符串
 * @return {string} 16进制字符串
 */
export function base64ToHex(str) {
    let hex = []
    for (let i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")); i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join(" ");
}

/**
 * 判断两个对象是否相同，相同返回 true，否则返回 false
 * @param a {Object} 对象 a
 * @param b {Object} 对象 b
 * @return {boolean} true: 相等, false: 不相等
 */
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

