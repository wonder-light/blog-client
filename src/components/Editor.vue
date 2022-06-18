<template>
    <div class="editor">
        <div v-if="type==='comment'" class="comment-area-info">
            <el-form ref="form" :inline="true" :model="user" :rules="rules">
                <el-form-item prop="name">
                    <el-input v-model="user.name" placeholder="名称"/>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="user.email" placeholder="邮箱"/>
                </el-form-item>
                <el-form-item prop="blog">
                    <el-input v-model="user.blog" placeholder="博客或者网站"/>
                </el-form-item>
                <el-form-item prop="avatar">
                    <el-input v-model="user.avatar" placeholder="头像URL"/>
                </el-form-item>
            </el-form>
        </div>
        <div :id="editorId" style="text-align: initial"/>
        <div v-if="type==='comment'" class="comment-area-submit">
            <el-button round type="primary" @click="Submit">发送</el-button>
            <el-button v-if="reply" round type="primary" @click="Cancel">取消</el-button>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";
import { getCurrentInstance, onMounted, onUnmounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

let props = defineProps({
    type: {type: String, default: 'normal'},
    id: {type: String, default: ''},
    reply: {type: Boolean, default: false},
    content: {type: String, default: ''},
});
let emits = defineEmits(['submit', 'cancel', 'initInstance']);

//编辑器ID
let editorId = ref('');
//编辑器配置
let editorConfig = null;
//编辑器实例
let editor = ref(null);
let store = useCounterStore();
//用户信息,可能是游客
const {user} = storeToRefs(store);
//用户信息的副本
let userCopy = null;
//信息校验规则
let rules = reactive({
    name: [{required: true, message: '请输入名称', trigger: 'blur'}],
    email: [{required: true, validator: CheckEmail, trigger: 'blur'}],
    blog: [{validator: CheckLink, trigger: 'blur'}],
    avatar: [{validator: CheckLink, trigger: 'blur'}],
});
//
const form = ref();

let properties = getCurrentInstance().appContext.config.globalProperties;

created();
onMounted(mounted);
onUnmounted(unmounted);

function created() {
    let id = props.id;
    if (id.trim().length > 0 && isNaN(Number(id))) {
        editorId.value = id;
    }
    else {
        editorId.value = properties.functions.NewEditorId();
    }
    userCopy = CopyUser();
}

function mounted() {
    switch (props.type) {
        case 'comment': {
            //评论编辑器
            editorConfig = {
                selector: `#${editorId.value}`, // change this value according to your HTML
                inline: false,
                language: "zh_CN",
                init_instance_callback: InitInstance,
                mobile: {menubar: true},
                icons: 'thin',
                height: 300,
                min_height: 300,
                //emoticons image editimage preview insertdatetime codesample autoresize autosave wordcount
                plugins: 'emoticons image editimage preview insertdatetime codesample autoresize autosave wordcount media searchreplace pageembed',
                toolbar_sticky: true,
                menubar: 'edit insert',
                toolbar: 'undo redo restoredraft emoticons image preview insertdatetime',
                statusbar: true,    //底部状态栏
                elementpath: false, //元素路径
                branding: false,    //TinyMCE 图标
                toolbar_mode: 'wrap',
                autoresize_bottom_margin: 20,
                autosave_interval: '20s', //自动保存的时间间隔
                autosave_ask_before_unload: false, //关闭当前窗口时告知他们有未保存的更改
                custom_undo_redo_levels: 40, //自定义撤消重做级别
                insertdatetime_formats: ['%H:%M:%S', '%Y-%m-%d', '%r', '%D', '%A'],
                tiny_pageembed_inline_styles: true, //呈现嵌入内容时，该选项将内联所有样式
            };
            break;
        }
        case 'readonly': {
            //只读编辑器
            editorConfig = {
                selector: `#${editorId.value}`, // 根据您的HTML更改此值
                language: "zh_CN",
                init_instance_callback: InitInstance,
                toolbar: false,
                menubar: false,
                inline: true,
                readonly: true,
                statusbar: false,
                plugins: 'autoresize',
            };
            break;
        }
        default: {
            //正常编辑器
            editorConfig = {
                selector: `#${editorId.value}`, // change this value according to your HTML
                inline: false,
                language: "zh_CN",
                init_instance_callback: InitInstance,
                mobile: {
                    menubar: true
                },
                icons: 'thin',
                plugins: 'autoresize autosave code codesample a11ychecker advcode casechange emoticons export fullscreen formatpainter insertdatetime image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste searchreplace table advtable tableofcontents tinycomments tinymcespellchecker wordcount',
                toolbar: [
                    'casechange formatpainter permanentpen | tableofcontents showcomments comments checklist | emoticons | editimage code fullscreen',
                    'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
                ],
                //menubar: 'file edit view insert format table tools help',
                toolbar_mode: 'wrap',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                min_height: 400,
                max_height: 1200,
                autosave_ask_before_unload: true,
                custom_undo_redo_levels: 40,
            };
            break;
        }
    }
    tinymce.init(editorConfig);
}

function unmounted() {
    editor.value?.destroy();
}

function InitInstance(instance) {
    //editor.ui.FloatPanel.zIndex = 99;
    //$('tr.mceFirst').css('z-index','1')
    if (props.content != null && props.content.trim().length > 0) {
        instance.setContent(props.content);
    }
    editor.value = instance;
}

//验证邮箱
function CheckEmail(rule, value, callback) {
    //邮箱 正则验证
    let emailVerify = /^([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
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
            let message = Object.values(invalidFields)[0][0].message;
            ElMessage({showClose: true, message, center: true, grouping: true, type: 'error'});
        }
        else {
            let state = false;
            let message = '';
            if (user.id <= 0) {
                await properties.axios.post('/user/match', user).then(response => {
                    store.setUser(response.data);
                    userCopy = CopyUser();
                    localStorage.setItem('touristId', user.id);
                    state = true;
                }).catch(() => {
                    state = false;
                    message = '网络错误';
                });
            }
            else {
                if (properties.functions.ObjectEqual(user, userCopy)) {
                    state = true;
                }
                else {
                    await properties.axios.post(`/user/tourist/${user.id}`, user).then(() => {
                        state = true;
                        userCopy = CopyUser();
                    }).catch(() => {
                        state = false;
                        message = '网络错误';
                    });
                }
            }
            if (state === true) {
                emits('submit', editorId);
            }
            else {
                ElMessage({showClose: true, message, center: true, grouping: true, type: 'error'});
            }
        }
    });
}

function Cancel() {
    emits('cancel', editorId);
}

function CopyUser() {
    return {id: user.id, name: user.name, email: user.email, blog: user.blog, avatar: user.avatar, mode: user.mode};
}

</script>