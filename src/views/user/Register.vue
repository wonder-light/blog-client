<template>
    <div class="login-panel">
        <div class="login-tabs-item">注册通行证</div>
        <el-form ref="form" :model="auth" :rules="rules" show-message size="large">
            <el-form-item label="" prop="name">
                <el-input v-model="auth.name" placeholder="用户名"/>
            </el-form-item>
            <el-form-item label="" prop="email">
                <el-input v-model="auth.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item label="" prop="code">
                <el-input v-model="auth.code" placeholder="验证码">
                    <template #suffix>
                        <el-button :disabled="authCode.cd !== 0" type="text" @click="GetVerificationCode">
                            {{ authCode.cd !== 0 ? '已发送(' + authCode.cd + ')' : '获取验证码' }}
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input v-model="auth.password" placeholder="密码" type="password"/>
            </el-form-item>
            <el-form-item label="" prop="confirmPassword">
                <el-input v-model="auth.confirmPassword" placeholder="确认密码" type="password"/>
            </el-form-item>
        </el-form>
        <div class="login-bottom">
            <el-button class="login-button" type="primary" @click="Register">注册</el-button>
            <div class="login-help" style="justify-content: flex-end">
                <el-button type="text" @click="ReturnToLogin">返回登陆</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { getCurrentInstance, reactive, ref } from "vue";

const {proxy} = getCurrentInstance();

let form = ref();

//注册的账户信息
let auth = reactive({
    name: '',
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
});
//auth 的验证码
let authCode = reactive({
    //验证码
    code: null,
    //冷却时间
    cd: 0,
    //销毁验证码的时间
    destroyTime: 5000,
    destroyHandle: null,
});


let rules = reactive({
    name: [{validator: checkUserName, trigger: 'blur'}],
    email: [{validator: checkEmail, trigger: 'blur', required: true}],
    code: [{required: true, message: '请输入验证码'}],
    password: [{validator: checkPassword, trigger: 'blur'}],
    confirmPassword: [{validator: checkConfirmPassword, trigger: 'blur'}],
});

//验证用户名
function checkUserName(rule, value, callback) {
    //正则验证  \u4e00-\u9fa5 中文字符  _a-zA-Z0-9 下划线、字母、数字
    let verify = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    if (value.length <= 0) {
        callback(new Error('请输入用户名'));
    }
    else if (verify.test(value)) {
        callback();
    }
    else {
        callback(new Error('不能含有特殊字符'));
    }
}

//验证邮箱
function checkEmail(rule, value, callback) {
    //邮箱 正则验证
    let emailVerify = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
    if (emailVerify.test(value)) {
        callback();
    }
    else {
        callback(new Error('邮箱无效'));
    }
}

//验证密码
function checkPassword(rule, value, callback) {
    //密码 正则验证 \w: 数字字母，下划线
    let verify = /^[_a-zA-Z0-9]+$/;
    if (value.length <= 6) {
        callback(new Error('密码长度不足'));
    }
    else if (verify.test(value)) {
        callback();
    }
    else {
        callback(new Error('密码只能由字母，数字，_ 组成'));
    }
}

//验证第二次密码与第一次密码是否相同
function checkConfirmPassword(rule, value, callback) {
    if (value === auth.password) {
        callback();
    }
    else {
        callback(new Error('两次密码不一致'));
    }
}

//获取验证码
function GetVerificationCode() {
    let options = {message: '邮箱无效', type: 'error', showClose: true, grouping: true,};
    //邮箱 正则验证
    let emailVerify = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
    if (!emailVerify.test(auth.email)) {
        options.type = 'warning';
        ElMessage(options);
        return;
    }
    
    proxy.axios.post('/validator/email', null, {
        params: {email: auth.email, register: true}
    }).then(response => {
        let data = response.data;
        if (data.code !== 200) {
            options.message = data.message;
            ElMessage(options);
            return;
        }
        authCode.code = data.data;
        authCode.cd = 60;
        let timer = setInterval(() => {
            authCode.cd -= 1;
            if (authCode.cd === 0) {
                clearInterval(timer);
            }
        }, 1000);
        clearTimeout(authCode.destroyHandle);
        authCode.destroyHandle = setTimeout(() => {
            authCode.code = null;
            authCode.destroyHandle = null;
        }, authCode.destroyTime);
        
    }).catch(() => {
        options.message = '网络异常';
        ElMessage(options);
    });
}

//返回登陆
function ReturnToLogin() {
    proxy.$router.push('/user/login');
}

//注册用户
function Register() {
    form.value.validate((isValid, invalidFields) => {
            //表单验证数据的回调
            let options = {message: '', type: 'error', showClose: true, grouping: true,};
            if (!isValid) {
                options.message = Object.values(invalidFields)[0][0].message;
                ElMessage(options);
                return;
            }
            if (authCode.code === null || authCode.code !== auth.code) {
                options.message = '验证码无效';
                ElMessage(options);
                return;
            }
            proxy.axios.post('/user', {
                name: auth.name,
                email: auth.email,
                password: auth.password,
            }).then(response => {
                let data = response.data;
                if (data.code === 200) {
                    require('element-plus').ElNotification({message: data.message, type: 'success'});
                    setTimeout(() => proxy.$router.push('/user/login'), 600);
                }
                else {
                    require('element-plus').ElNotification({message: data.message, type: 'error'});
                }
            }).catch(() => {
                options.message = '网络出错，注册失败';
                ElMessage(options);
            });
        }
    );
    
}
</script>