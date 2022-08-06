<template>
  <div :class="['mini-menu', {'edge': miniEdge}]" @click="setShowMenuPane(true)">
    <SvgImg svg-id="mini-menu"/>
    <span>&nbsp; menu</span>
  </div>
</template>

<!-- 右上角 mini 菜单-->
<script setup>
import { inject, onUnmounted, ref } from "vue";

const { setShowMenuPane } = inject('showMenuPane');

// 改变迷你按钮的样式 true: mini-menu, false: class为 mini-menu mini-menu-edge
let miniEdge = ref(false);
window.addEventListener('scroll', scrollToTop);
onUnmounted(() => window.removeEventListener('scroll', scrollToTop));

//监听滚动事件
function scrollToTop() {
    //改变 mini 菜单 的样式
    miniEdge.value = document.documentElement.scrollTop >= window.innerHeight - 80;
}
</script>