<template>
  <div class="comment-editor">
    <div :id="editorId" style="text-align: initial"/>
    <el-form ref="form" :inline="true" :model="userCopy" :rules="rules" class="form-info">
      <el-form-item prop="name">
        <el-input v-model="userCopy.name" placeholder="名称"/>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="userCopy.email" placeholder="邮箱"/>
      </el-form-item>
      <el-form-item prop="blog">
        <el-input v-model="userCopy.blog" placeholder="博客或者网站"/>
      </el-form-item>
      <el-form-item prop="avatar">
        <el-input v-model="userCopy.avatar" placeholder="头像URL"/>
      </el-form-item>
    </el-form>
    <div class="action-bottom">
      <el-button v-if="reply" round type="primary" @click="setAreaId(null)">取消</el-button>
      <el-button round type="primary" @click="Submit">发送</el-button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";
import { getCurrentInstance, inject, onMounted, onUnmounted, ref } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
    reply: {type: Boolean, default: false},
    content: {type: String, default: ''},
});
const emits = defineEmits(['submit']);

const form = ref();
const {proxy} = getCurrentInstance();
const {setAreaId} = inject('areaId');
const {language} = inject('language');
const store = useCounterStore();
const {tourist} = storeToRefs(store);

if (!tourist.value) {
    await store.updateTourist();
}

//编辑器ID
const editorId = ref(proxy.functions.NewEditorId());
//用户信息,可能是游客
//用户信息的副本
const userCopy = ref(Object.assign({}, tourist.value));
//信息校验规则
const rules = ref({
    name: [{required: true, message: '请输入名称', trigger: 'blur'}],
    email: [{required: true, validator: CheckEmail, trigger: 'blur'}],
    blog: [{validator: CheckLink, trigger: 'blur'}],
    avatar: [{validator: CheckLink, trigger: 'blur'}],
});

//编辑器配置
const editorConfig = {
    selector: `#${editorId.value}`, // change this value according to your HTML
    inline: false,
    language: language.value === 'en' ? "en_US" : "zh_CN",
    init_instance_callback: InitInstance,
    mobile: {
        menubar: false,
        toolbar_mode: 'floating',
    },
    height: 300,
    min_height: 300,
    //media
    plugins: 'emoticons image preview insertdatetime codesample autoresize autosave wordcount searchreplace autolink',
    menubar: false,
    toolbar: 'undo redo restoredraft emoticons image preview insertdatetime',
    statusbar: true,    //底部状态栏
    elementpath: false, //元素路径
    branding: false,    //TinyMCE 图标
    toolbar_mode: 'floating', //工具栏模式: 浮动
    image_advtab: true, //此选项将“高级”选项卡添加到图像对话框中，允许您为图像添加自定义样式，间距和边框
    autoresize_bottom_margin: 20, //到编辑器集底部的大小
    autosave_interval: '20s', //自动保存的时间间隔
    autosave_ask_before_unload: false, //关闭当前窗口时告知他们有未保存的更改
    custom_undo_redo_levels: 40, //自定义撤消重做级别
    insertdatetime_formats: ['%H:%M:%S', '%Y-%m-%d', '%r', '%D', '%A'],
};

onMounted(createEditor);
onUnmounted(() => tinymce.get(editorId.value)?.destroy());

//创建编辑器
function createEditor() {
    tinymce.init(editorConfig).then(() => {
        let editor = tinymce.get(editorId.value);
        if (!editor) {
            setTimeout(createEditor, 10);
        }
    });
}

//编辑器实例化后的回调函数
function InitInstance(instance) {
    if (props.content != null && props.content.trim().length > 0) {
        instance.setContent(props.content);
    }
    //addEventListener("touchstart", (e) =>(console.log(e)), { passive: true });
    instance.on('touchmove', () => {
    });
    instance.on('touchstart', () => {
    });
}

//验证邮箱
function CheckEmail(rule, value, callback) {
    //邮箱 正则验证
    let emailVerify = /^([a-zA-Z\d]+[_|\-.]?)*[a-zA-Z\d]+@([a-zA-Z\d]+[_|\-.]?)*[a-zA-Z\d]+\.[a-zA-Z]{2,3}$/;
    if (emailVerify.test(value)) {
        callback();
    }
    else {
        callback(new Error('邮箱无效'));
    }
}

//验证链接
function CheckLink(rule, value, callback) {
    //网址 正则验证  参考网页: https://www.phpernote.com/javascript-function/337.html
    let strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
        + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    
    //正则表达式对象
    let RE = new RegExp(strRegex);
    if (value == null || value.length <= 0 || RE.test(value)) {
        callback();
    }
    else {
        callback(new Error('链接无效'));
    }
}

//提交发送
function Submit() {
    //验证
    form.value.validate(async (isValid, invalidFields) => {
        //无效
        if (isValid === false) {
            const message = Object.values(invalidFields)[0][0].message;
            ElMessage({showClose: true, message, center: true, grouping: true, type: 'error'});
            return false;
        }
        let state = false;
        let message = '';
        //不存用户,将用户添加到服务器中
        if (tourist.value.id <= 0) {
            //若有匹配的用户，则返回用户数据，否则创建新用户
            await proxy.axios.post('/user/match', userCopy.value).then(response => {
                store.updateTourist(response.data);
                userCopy.value = Object.assign({}, tourist.value);
                localStorage.setItem('touristId', tourist.value.id);
                state = true;
            }).catch(() => {
                state = false;
                message = '网络错误';
            });
        }
        else {
            //先检测用户信息是否变化
            if (proxy.functions.ObjectEqual(tourist.value, userCopy.value)) {
                state = true;
            }
            else {
                await proxy.axios.post(`/user/tourist/${tourist.value.id}`, userCopy.value).then(() => {
                    store.updateTourist(Object.assign({}, userCopy.value));
                    state = true;
                }).catch(() => {
                    state = false;
                    message = '网络错误';
                });
            }
        }
    
        if (tinymce.get(editorId.value).getContent().trim().length <= 0) {
            state = false;
            message = '评论内容为空';
        }
        
        if (state === true) {
            emits('submit', editorId.value);
        }
        else {
            ElMessage({showClose: true, message, center: true, grouping: true, type: 'error'});
        }
    });
}

</script>