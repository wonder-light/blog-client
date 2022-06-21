import moment from "moment";

export default class functionLibrary {
    constructor() {
        //创建 Editor 的 ID 句柄
        this.idHandle = 12234526152101;
        //对象的 ID 句柄
        this.id = Date.now();
    }
    
    // 判断当前设备是否是移动设备
    isMobile() {
        //获取userAgent信息
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag != null && flag.length > 0;
    }
    
    /*
     * 获取距离时间戳最近的日期格式
     * 如： 刚刚，4分钟强，4小时前，3天前，6月-6日，，，，
     * @param TimeStamp 指定的时间戳
     */
    GetNearestDate(TimeStamp) {
        let now = moment();
        let before = moment(TimeStamp);
        let days = Math.abs(now.diff(before, 'days'));
        if (days >= 90) {
            return before.format('Y-M-D');
        }
        return before.fromNow();
    }
    
    //获取 Editor 的 ID 句柄的字符串值
    NewEditorId() {
        this.idHandle += 1;
        return 'id-' + this.idHandle;
    }
    
    //获取对象的 ID 句柄
    GetObjectId() {
        return this.id++;
    }
    
    //刷新对象的 ID 句柄
    RefreshObjectID() {
        let id = Date.now();
        if (id >= this.id) {
            this.id = id;
        }
    }
    
    //随机字符串
    RandomString() {
        //基础数字[1000000000, 99999999999999]
        let min = 1000000000;
        let max = 99999999999999;
        let Basic = Math.floor(Math.random() * (max - min)) + min;
        let BasicString = Basic.toString();
        //from：将数字分割为字符数组
        //map：将数组映射到字母
        let StringArray = Array.from(BasicString).map(item => {
            //获取数字的ASCII值
            let ASCII = item.charCodeAt(0);
            //将ASCII值转化为字母
            return String.fromCharCode(ASCII + 20);
        });
        //将所有字符连接起来， 以指定字符进行分割
        return StringArray.join('');
    }
    
    /*
     * 获取时间戳对应的日期
     * @param TimeStamp 时间戳
     * @param IncludeTime true：包含对应日期下的具体时间
     */
    GetDateFromTimeStamp(TimeStamp, IncludeTime = false) {
        let date = new Date(TimeStamp);
        return IncludeTime ? date.toLocaleString() : date.toLocaleDateString();
    }
    
    //随机颜色
    RandomColor(min = 0) {
        //'| 0' 的作用是去除小数部分
        return '#' + ((Math.random() * (0x1000000 - min) + min) | 0).toString(16);
    }
    
    //随机整数
    RandomNumber(min = 0, max = 1) {
        let value = Math.random() * (max - min) + min;
        return Math.round(value);
    }
    
    //获取DOM元素到页面顶部的距离
    GetElementToPageTop(el) {
        return el.offsetTop - document.documentElement.scrollTop;
    }
    
    //打开网页
    OpenWebPage(url, target = '_blank') {
        window.open(url, target);
    }
    
    //判断两个对象是否相同，相同返回 true，否则返回 false
    ObjectEqual(a, b) {
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
                    if (!this.ObjectEqual(a[prop], b[prop])) {
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
}