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

<script>
import { Vue } from "vue-class-component";
import { reactive } from "vue";

//注册
export default class Register extends Vue {
    //注册的账户信息
    auth = reactive({
        name: '',
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
    });
    
    //auth 的验证码
    authCode = {
        //验证码
        code: null,
        //冷却时间
        cd: 0,
        //销毁验证码的时间
        destroyTime: 5000,
        destroyHandle: null,
    };
    
    //消息
    ElMessage = require('element-plus').ElMessage;
    
    //验证第二次密码与第一次密码是否相同
    checkConfirmPassword = (rule: any, value: any, callback: any) => {
        if (value === this.auth.password) {
            callback();
        }
        else {
            callback(new Error('两次密码不一致'));
        }
    };
    
    rules = reactive({
        name: [{validator: this.checkUserName, trigger: 'blur'}],
        email: [{validator: this.checkEmail, trigger: 'blur', required: true}],
        code: [{required: true, message: '请输入验证码'}],
        password: [{validator: this.checkPassword, trigger: 'blur'}],
        confirmPassword: [{validator: this.checkConfirmPassword, trigger: 'blur'}],
    });
    
    //验证用户名
    checkUserName(rule: any, value: any, callback: any) {
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
    checkEmail(rule: any, value: any, callback: any) {
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
    checkPassword(rule: any, value: any, callback: any) {
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
    
    //获取验证码
    GetVerificationCode() {
        let options = {message: '邮箱无效', type: 'error', showClose: true, grouping: true,};
        //邮箱 正则验证
        let emailVerify = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
        if (!emailVerify.test(this.auth.email)) {
            options.type = 'warning';
            this.ElMessage(options);
            return;
        }
        
        this.axios.post('/validator/email', null, {
            params: {email: this.auth.email, register: true}
        }).then(response => {
            let data = response.data;
            if (data.code !== 200) {
                options.message = data.message;
                this.ElMessage(options);
                return;
            }
            this.authCode.code = data.data;
            this.authCode.cd = 60;
            let timer = setInterval(() => {
                this.authCode.cd -= 1;
                if (this.authCode.cd === 0) {
                    clearInterval(timer);
                }
            }, 1000);
            clearTimeout(this.authCode.destroyHandle);
            this.authCode.destroyHandle = setTimeout(() => {
                this.authCode.code = null;
                this.authCode.destroyHandle = null;
            }, this.authCode.destroyTime);
            
        }).catch(() => {
            options.message = '网络异常';
            this.ElMessage(options);
        });
    }
    
    //返回登陆
    ReturnToLogin() {
        this.$router.push('/user/login');
    }
    
    //注册用户
    Register() {
        this.$refs.form.validate((isValid, invalidFields ?
    ) =>
        {
            //表单验证数据的回调
            let options = {message: '', type: 'error', showClose: true, grouping: true,};
            if (!isValid) {
                options.message = Object.values(invalidFields)[0][0].message;
                this.ElMessage(options);
                return;
            }
            if (this.authCode.code === null || this.authCode.code !== this.auth.code) {
                options.message = '验证码无效';
                this.ElMessage(options);
                return;
            }
            this.axios.post('/user', {
                name: this.auth.name,
                email: this.auth.email,
                password: this.auth.password,
            }).then(response => {
                let data = response.data;
                if (data.code === 200) {
                    require('element-plus').ElNotification({message: data.message, type: 'success'});
                    setTimeout(() => this.$router.push('/user/login'), 600);
                }
                else {
                    require('element-plus').ElNotification({message: data.message, type: 'error'});
                }
            }).catch(() => {
                options.message = '网络出错，注册失败';
                this.ElMessage(options);
            });
        }
    )
        ;
    }
};
</script>

<style scoped>

</style>