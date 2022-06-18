<template>
    <!-- 背景 -->
    <div class="login-panel">
        <el-tabs v-model="activeName" stretch>
            <el-tab-pane label="验证码登陆" name="验证码登陆">
                <template #label>
                    <div class="login-tabs-item">验证码登录</div>
                </template>
                <el-form :model="code" :rules="codeRules" show-message size="large">
                    <el-form-item label="" prop="phone">
                        <el-input v-model="code.email" placeholder="邮箱登陆"/>
                    </el-form-item>
                    <el-form-item label="" prop="code">
                        <el-input v-model="code.code" placeholder="验证码">
                            <template #suffix>
                                <el-button :disabled="emailCode.cd !== 0" type="text" @click="GetVerificationCode">
                                    {{ emailCode.cd !== 0 ? '已发送(' + emailCode.cd + ')' : '获取验证码' }}
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="密码登陆" name="密码登陆">
                <template #label>
                    <div class="login-tabs-item">密码登陆</div>
                </template>
                <el-form :model="auth" :rules="authRules" show-message size="large">
                    <el-form-item label="" prop="email">
                        <el-input v-model="auth.email" placeholder="邮箱"/>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input v-model="auth.password" placeholder="密码" type="password"/>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <div class="login-bottom">
            <el-button class="login-button" type="primary" @click="UserLogin">登录</el-button>
            <div class="login-help">
                <el-button disabled type="text">忘记密码?</el-button>
                <el-button type="text" @click="Register">立即注册</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { getCurrentInstance, reactive, ref } from "vue";

const {proxy} = getCurrentInstance();

//激活的标签页
let activeName = ref('验证码登陆');
//验证码 登陆
let code = reactive({email: '', code: ''});
//账户密码登陆
let auth = reactive({email: '', password: ''});
//email 的验证码
let emailCode = reactive({
    //验证码
    code: null,
    //冷却时间
    cd: 0,
    //销毁验证码的时间
    destroyTime: 5000,
    destroyHandle: null,
});
//验证码的规则
let codeRules = reactive({
    email: [{validator: checkEmail, trigger: 'blur'}],
    code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
});
//密码登陆的验证规则
let authRules = reactive({
    email: [{validator: checkEmail, trigger: 'blur'}],
    password: [{validator: checkPassword, trigger: 'blur'}],
});

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
    if (value == null || value.trim().length <= 0) {
        callback(new Error('请输入密码'));
    }
    else {
        callback();
    }
}

//获取验证码
function GetVerificationCode() {
    let options = {message: '邮箱无效', type: 'error', showClose: true, grouping: true,};
    //邮箱 正则验证
    let emailVerify = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
    if (!emailVerify.test(code.email)) {
        options.type = 'warning';
        ElMessage(options);
        return;
    }
    
    proxy.axios.post('/validator/email', null, {
        params: {email: code.email}
    }).then(response => {
        let data = response.data;
        if (data.code !== 200) {
            options.message = data.message;
            ElMessage(options);
            return;
        }
        emailCode.code = data.data;
        emailCode.cd = 60;
        let timer = setInterval(() => {
            emailCode.cd -= 1;
            if (emailCode.cd === 0) {
                clearInterval(timer);
            }
        }, 1000);
        clearTimeout(emailCode.destroyHandle);
        emailCode.destroyHandle = setTimeout(() => {
            emailCode.code = null;
            emailCode.destroyHandle = null;
        }, emailCode.destroyTime);
    }).catch(() => {
        options.message = '网络异常';
        ElMessage(options);
    });
}

function Register() {
    proxy.$router.push('/user/register');
}

//用户登陆
function UserLogin() {
    let token = '';
    let codeLogin = activeName.value === '验证码登陆';
    let emailVerify = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
    if (!emailVerify.test(codeLogin ? code.email : auth.email)) {
        ElMessage({message: '邮箱无效', type: 'error', showClose: true, grouping: true,});
        return;
    }
    if (codeLogin) {
        if (code.code === '') {
            ElMessage({message: '验证码无效', type: 'error', showClose: true, grouping: true,});
            return;
        }
        if (emailCode.code !== code.code) {
            ElMessage({message: '登陆失败', type: 'error', showClose: true, grouping: true,});
            return;
        }
        token = `${code.email}##${code.code}`;
    }
    else {
        token = `${auth.email}#${auth.password}#`;
    }
    let buffer = require('buffer').Buffer;
    token = buffer.from(token, 'utf-8').toString('base64');
    token = buffer.from(token, 'utf-8').toString('base64');
    
    proxy.axios.get('/user/login', {
        params: {token}
    }).then(response => {
        let data = response.data;
        if (data.code !== 200) {
            ElMessage({message: data.message, type: 'error', showClose: true, grouping: true,});
        }
        else {
            let userId = data.id;
            let token = data.token;
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            
            require('element-plus').ElNotification({message: '登陆成功', type: 'success',});
            setTimeout(() => {
                proxy.$router.push('/');
            }, 600);
        }
    }).catch(() => {
        ElMessage({message: '网络异常', type: 'warning', showClose: true, grouping: true,});
    });
}
</script>