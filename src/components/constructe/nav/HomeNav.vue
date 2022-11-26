<template>
  <nav class="fixed z-30">
    <div :class="miniMenuClass" @click="setShowMenuPane(true)">
      <SvgImg class="stroke-0" svg-id="mini-menu"/>
      <span :class="['uppercase ml-2.5', {'hidden': miniEdge}]">menu</span>
    </div>
    <el-backtop :bottom="bottom" :right="60" :visibility-height="height">
      <SvgImg class="w-full h-full" svg-id="backTop"/>
    </el-backtop>
    <!-- 菜单背景 -->
    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut"
                @after-enter="animEnd = true">
      <div v-if="showMenuPane" class="absolute top-0 left-0 w-screen h-screen bg-black/30" @click="closeMenuPanel"/>
    </transition>
    <!-- 菜单面板 -->
    <transition enter-active-class="animate__animated animate__rotateInUpRight" leave-active-class="animate__animated animate__rotateOutUpLeft">
      <div v-if="showMenuPane" class="relative w-65 h-screen grid content-between bg-white overflow-y-auto scrollbar-hidden">
        <SvgImg class="absolute z-30 top-2.5 right-2.5 text-white stroke-0 transition-all hover:text-gray-400 hover:cursor-pointer"
                svg-id="close" @click="setShowMenuPane(false)"/>
        <div class="h-auto w-full">
          <!-- 头像、说明 -->
          <div class="w-full relative h-75 mb-5 bg-cover">
            <el-image alt="背景图" class="w-full h-full" fit="cover"
                      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5c8ba350-827c-4df5-bf3c-d7683c79f8bf/6b82bc17-a73f-4ced-a2c3-8157e167b5f3.jpg"/>
            <div class="absolute inset-0 text-center">
              <el-image :src="env.serverUrl + '/files/image/misc/52162943041122439531598791307246.jpg'" alt="头像" class="h-20 w-20 mt-8 rounded-full"
                        fit="cover"/>
              <p class="text-white my-4 text-xl">念</p>
              <p class="text-white my-2.5">路曼曼其修远兮</p>
              <p class="text-white my-2.5">吾将上下而求索</p>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white"/>
          </div>
          <MenuNav/>
          <el-divider/>
          <MenuCom/>
        </div>
        <MenuMana/>
      </div>
    </transition>
  </nav>
</template>

<!-- 导航 -->
<script setup>
import MenuCom from "@/components/constructe/nav/menu/MenuCom.vue";
import MenuMana from "@/components/constructe/nav/menu/MenuMana.vue";
import MenuNav from "@/components/constructe/nav/menu/MenuNav.vue";
import { computed, onUnmounted, provide, ref } from "vue";


// 改变迷你按钮的样式 true: mini-menu, false: class为 mini-menu mini-menu-edge
const miniEdge = ref(false);
//迷你菜单的样式类
const miniMenuClass = computed(() => {
    let init = 'cursor-pointer p-2.5 hover:opacity-70 absolute flex content-center items-center top-5 text-xs border border-solid rounded';
    //改变 mini 菜单 的样式
    return init + ' ' + (miniEdge.value ? 'left-0 text-white bg-neutral-800 border-gray-300 border-opacity-40' : 'left-5 animate-text-flashing border-current');
});
//出现时的最小滚动高度 - scrollTop
const height = ref(window.innerHeight * 0.7);
//backtop 的最小底部高度
const minBottom = 160;
//backtop 距离底部的高度
const bottom = ref(Math.min(minBottom, window.innerHeight / 2));
//主页导航
//true：显示导航菜单面板
let showMenuPane = ref(false);
//true: 显示菜单的动画结束, false: 显示菜单的动画没有结束
let animEnd = ref(false);

//监听滚动事件
function scrollToTop() {
    let height = window.innerHeight;
    //改变 mini 菜单 的样式
    miniEdge.value = (height - document.documentElement.scrollTop) / height <= 0.3;
}

//监听页面大小变化事件
function onresize() {
    bottom.value = Math.min(minBottom, window.innerHeight / 2);
    height.value = window.innerHeight * 0.8;
}

//设置菜单面板的显示
function setShowMenuPane(value) {
    showMenuPane.value = value;
}

//关闭菜单面板
function closeMenuPanel() {
    console.log('关闭', animEnd)
    if (animEnd.value) {
        showMenuPane.value = false;
        animEnd.value = false;
    }
}

window.addEventListener('scroll', scrollToTop);
window.addEventListener('resize', onresize);

provide('animEnd', animEnd);
provide('closeMenuPanel', closeMenuPanel);

onUnmounted(() => {
    window.removeEventListener('scroll', scrollToTop);
    window.removeEventListener('resize', onresize);
});
</script>