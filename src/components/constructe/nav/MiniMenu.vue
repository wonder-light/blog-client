<template>
  <div :class="['mini-menu', {'edge': miniEdge}]" @click="setShowMenuPane(true)">
    <svg height="100%" viewBox="0 0 32 32" width="100%">
      <path
        d="M30 18h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM30 6.25h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM2 25.75h28c1.1 0 2 0.9 2 2s-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2z">
      </path>
    </svg>
    <span>&nbsp; menu</span>
  </div>
</template>

<!-- 右上角 mini 菜单-->
<script setup>
import { inject, onUnmounted, ref } from "vue";

const {setShowMenuPane} = inject('showMenuPane');

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