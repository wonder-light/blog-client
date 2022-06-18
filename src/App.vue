<template>
    <HomeNav/>
    <router-view/>
    <!-- 背景特效：樱花跑飘落 -->
    <SakuraEffect/>
    <transition
        enter-active-class="animate__animated animate__rotateIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div v-if="load"
             style="z-index: 999999999;position: fixed;width: 100%;height: 100vh;left: 0;top: 0;background-color: #3ae8f8">
        </div>
    </transition>
</template>

<script setup>
import moment from "moment";
import { RouterView } from 'vue-router';
import { ref } from "vue";
import HomeNav from "@/views/nav/HomeNav.vue";
import SakuraEffect from "@/components/SakuraEffect.vue";

//显示加载背景
let load = ref(true);
//将 moment 的语言环境设置为中文
moment.locale(sessionStorage.getItem('language') === 'en' ? 'en' : 'zh-cn');

let timer = setInterval(() => {
    // 判断文档和所有子资源(图片、音视频等)已完成加载
    if (document.readyState === 'complete') {
        load.value = false;
        //执行方法
        clearInterval(timer);
    }
}, 0);
</script>
