<template>
  <div class="menu-mana">
    <el-tooltip content="搜索" effect="customized" placement="top">
      <svg-img :src="env.svg['search.svg']" @click="$router.push('/transit')"/>
    </el-tooltip>
    <el-tooltip v-if="true" content="登陆" effect="customized" placement="top">
      <svg-img :src="env.svg['user.svg']" @click="Login"/>
    </el-tooltip>
    <el-tooltip v-if="false" content="退出登陆" effect="customized" placement="top">
      <svg-img :src="env.svg['logout.svg']"/>
    </el-tooltip>
  </div>
</template>

<!-- 菜单管理部分 -->
<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
let closeMenuPanel = inject('closeMenuPanel');

//用户登陆
function Login() {
    router.push('/user/login');
    closeMenuPanel();
}
</script>