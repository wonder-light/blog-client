<template>
  <nav class="relative">
    <MiniMenu/>
    <BackTop/>
    <NavPanel/>
  </nav>
</template>

<!-- 导航 -->
<script setup>
import BackTop from "@/components/constructe/nav/BackTop.vue";
import MiniMenu from "@/components/constructe/nav/MiniMenu.vue";
import NavPanel from "@/components/constructe/nav/NavPanel.vue";
import { provide, ref } from "vue";

//主页导航
//true：显示导航菜单面板
let showMenuPane = ref(false);
//true: 显示菜单的动画结束, false: 显示菜单的动画没有结束
let animEnd = ref(false);


function setShowMenuPane(value) {
    showMenuPane.value = value;
}

function setAnimEnd(value) {
    animEnd.value = value;
}

//关闭菜单面板
function closeMenuPanel() {
    if (animEnd.value) {
        showMenuPane.value = false;
        animEnd.value = false;
    }
}

provide('animEnd', { animEnd, setAnimEnd });
provide('closeMenuPanel', closeMenuPanel);
provide('showMenuPane', { showMenuPane, setShowMenuPane });
</script>