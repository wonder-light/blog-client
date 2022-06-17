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

<script>
import { Vue } from "vue-class-component";
import { reactive } from "vue";

//登陆界面
export default class Login extends Vue {
    //激活的标签页
    activeName = '验证码登陆';
    
    //验证码 登陆
    code = reactive({email: '', code: ''});
    
    //账户密码登陆
    auth = reactive({email: '', password: ''});
    
    //email 的验证码
    emailCode = {
        //验证码
        code: null,
        //冷却时间
        cd: 0,
        //销毁验证码的时间
        destroyTime: 5000,
        destroyHandle: null,
    };
    
    //验证码的规则
    codeRules = reactive({
        email: [{validator: this.checkEmail, trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
    });
    
    //密码登陆的验证规则
    authRules = {
        email: [{validator: this.checkEmail, trigger: 'blur'}],
        password: [{validator: this.checkPassword, trigger: 'blur'}],
    };
    
    //消息
    ElMessage = require('element-plus').ElMessage;
    
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
        if (value == null || value.trim().length <= 0) {
            callback(new Error('请输入密码'));
        }
        else {
            callback();
        }
    }
    
    //获取验证码
    GetVerificationCode() {
        let options = {message: '邮箱无效', type: 'error', showClose: true, grouping: true,};
        //邮箱 正则验证
        let emailVerify = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
        if (!emailVerify.test(this.code.email)) {
            options.type = 'warning';
            this.ElMessage(options);
            return;
        }
        
        this.axios.post('/validator/email', null, {
            params: {email: this.code.email}
        }).then(response => {
            let data = response.data;
            if (data.code !== 200) {
                options.message = data.message;
                this.ElMessage(options);
                return;
            }
            this.emailCode.code = data.data;
            this.emailCode.cd = 60;
            let timer = setInterval(() => {
                this.emailCode.cd -= 1;
                if (this.emailCode.cd === 0) {
                    clearInterval(timer);
                }
            }, 1000);
            clearTimeout(this.emailCode.destroyHandle);
            this.emailCode.destroyHandle = setTimeout(() => {
                this.emailCode.code = null;
                this.emailCode.destroyHandle = null;
            }, this.emailCode.destroyTime);
        }).catch(() => {
            options.message = '网络异常';
            this.ElMessage(options);
        });
    }
    
    Register() {
        this.$router.push('/user/register');
    }
    
    //用户登陆
    UserLogin() {
        let token = '';
        let codeLogin = this.activeName === '验证码登陆';
        let emailVerify = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
        if (!emailVerify.test(codeLogin ? this.code.email : this.auth.email)) {
            this.ElMessage({message: '邮箱无效', type: 'error', showClose: true, grouping: true,});
            return;
        }
        if (codeLogin) {
            if (this.code.code === '') {
                this.ElMessage({message: '验证码无效', type: 'error', showClose: true, grouping: true,});
                return;
            }
            if (this.emailCode.code !== this.code.code) {
                this.ElMessage({message: '登陆失败', type: 'error', showClose: true, grouping: true,});
                return;
            }
            token = `${this.code.email}##${this.code.code}`;
        }
        else {
            token = `${this.auth.email}#${this.auth.password}#`;
        }
        let buffer = require('buffer').Buffer;
        token = buffer.from(token, 'utf-8').toString('base64');
        token = buffer.from(token, 'utf-8').toString('base64');
        
        this.axios.get('/user/login', {
            params: {token}
        }).then(response => {
            let data = response.data;
            if (data.code !== 200) {
                this.ElMessage({message: data.message, type: 'error', showClose: true, grouping: true,});
            }
            else {
                let userId = data.id;
                let token = data.token;
                this.cookie.set('userId', userId, {expires: 7});
                this.cookie.set('token', token, {expires: 7});
                
                require('element-plus').ElNotification({message: '登陆成功', type: 'success',});
                setTimeout(() => {
                    this.$router.push('/');
                }, 600);
            }
        }).catch(() => {
            this.ElMessage({message: '网络异常', type: 'warning', showClose: true, grouping: true,});
        });
    }
};
</script>

<style scoped>

</style>