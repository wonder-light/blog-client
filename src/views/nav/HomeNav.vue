<template>
    <div>
        <!--mini 菜单-->
        <div
            :class="{'mini-menu-button': true, 'mini-menu-button-edge': miniEdge}"
            @click="showMenuPane = true">
            <svg
                height="100%"
                viewBox="0 0 32 32"
                width="100%">
                <path
                    d="M30 18h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM30 6.25h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM2 25.75h28c1.1 0 2 0.9 2 2s-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2z"></path>
            </svg>
            <span>&nbsp; menu</span>
        </div>
        <!-- 回到首页 back top -->
        <el-backtop :bottom="400" :right="60" :visibility-height="500">
            <svg class="icon" height="200" p-id="12460" style="width: 40px; height: 40px;" t="1650291331129"
                 version="1.1"
                 viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M523.6736 71.850667a23.1424 23.1424 0 0 0-24.746667 0c-110.592 70.724267-183.876267 196.4032-183.876266 339.7632 0 20.0704 1.399467 40.1408 4.676266 60.2112a24.507733 24.507733 0 0 1-3.2768 16.247466A318.634667 318.634667 0 0 0 273.066667 650.069333c0 26.760533 3.2768 53.521067 9.796266 79.325867a23.4496 23.4496 0 0 0 44.3392 3.822933 306.653867 306.653867 0 0 1 61.1328-88.8832c1.877333 2.389333 3.754667 5.256533 5.597867 8.123734 39.2192 2.8672 78.404267 4.778667 118.0672 4.778666 39.185067 0 78.848-1.4336 118.0672-4.778666 1.877333-2.389333 3.754667-5.256533 5.597867-8.123734a306.688 306.688 0 0 1 61.1328 88.8832 23.4496 23.4496 0 0 0 44.3392-3.822933c6.519467-25.8048 9.796267-52.565333 9.796266-79.325867 0-59.733333-16.349867-115.643733-43.383466-161.9968a24.507733 24.507733 0 0 1-3.2768-16.247466c2.798933-20.0704 4.676267-40.1408 4.676266-60.2112-0.955733-143.36-74.205867-269.038933-185.275733-339.7632z m67.208533 299.144533c0 44.919467-35.498667 81.237333-79.36 81.237333-43.861333 0-79.325867-36.317867-79.325866-81.237333 0-44.919467 35.498667-81.237333 79.325866-81.237333 43.861333 0.477867 79.36 36.795733 79.36 81.237333z"
                    fill="#0dafbb" p-id="12461">
                </path>
                <path
                    d="M464.213333 730.453333c0 36.420267 21.333333 225.28 47.786667 225.28 26.453333 0 47.786667-188.859733 47.786667-225.28 0-36.352-21.333333-65.7408-47.786667-65.7408-26.453333 0.477867-47.786667 29.9008-47.786667 65.774934z"
                    fill="#0dafbb" p-id="12462">
                </path>
            </svg>
        </el-backtop>
        <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            @after-enter="showAfter = true">
            <!-- 菜单背景 -->
            <div v-if="showMenuPane" class="side-background" @click="ClickBackground"/>
        </transition>
        <transition
            enter-active-class="animate__animated animate__rotateInUpRight"
            leave-active-class="animate__animated animate__rotateOutUpLeft">
            <!-- 菜单面板 -->
            <div v-if="showMenuPane" class="side-pane">
                <svg
                    class="side-pane-close"
                    version="1.1"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="showMenuPane = false">
                    <path
                        d="M18.362 19.324c-0.902 0.902-2.363 0.902-3.263 0l-5.098-5.827-5.098 5.825c-0.902 0.902-2.363 0.902-3.263 0-0.902-0.902-0.902-2.363 0-3.263l5.304-6.057-5.306-6.061c-0.902-0.902-0.902-2.361 0-3.263s2.361-0.902 3.263 0l5.1 5.829 5.098-5.829c0.902-0.902 2.361-0.902 3.263 0s0.902 2.363 0 3.263l-5.304 6.061 5.304 6.057c0.902 0.902 0.902 2.363 0 3.265z"></path>
                </svg>
                <div class="side-pane-gradient"/>
                <!-- 主要内内容 -->
                <!-- 头像、说明 -->
                <div class="side-pane-up">
                    <el-avatar :src="env.serverUrl + '/files/image/misc/52162943041122439531598791307246.jpg'" alt="头像"
                               fit="cover"/>
                    <p>念</p>
                    <p>路曼曼其修远兮</p>
                    <p>吾将上下而求索</p>
                </div>
                <el-divider/>
                <HomePanelHeader/>
                <el-divider style="margin-top: 20px;"/>
                <HomePanelCom/>
                <div style="height: 40px"/>
                <HomePanelMana/>
            </div>
        </transition>
    </div>
</template>

<script setup>
import HomePanelHeader from "@/views/nav/HomePanelHeader.vue";
import HomePanelCom from "@/views/nav/HomePanelCom.vue";
import HomePanelMana from "@/views/nav/HomePanelMana.vue";
import { onUnmounted, provide, ref } from "vue";

//主页导航
//true：显示导航菜单面板
let showMenuPane = ref(false);
//true: 完全显示菜单之后
let showAfter = ref(false);
// 改变迷你按钮的样式
// true: class为mini-menu-button, false: class为 mini-menu-button mini-menu-button-edge
let miniEdge = ref(false);

provide('ClickBackground', ClickBackground);

window.addEventListener('scroll', scrollToTop);
onUnmounted(() => window.removeEventListener('scroll', scrollToTop));

//监听滚动事件
function scrollToTop() {
    //改变 mini 菜单 的样式
    miniEdge.value = document.documentElement.scrollTop >= window.innerHeight - 80;
}

//点击除面板之外的其它地方时关闭面板
function ClickBackground() {
    if (showAfter.value) {
        showMenuPane.value = false;
        showAfter.value = false;
    }
}

</script>

<style lang="stylus">

</style>