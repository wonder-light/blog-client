<template>
  <!-- 菜单背景 -->
  <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut"
              @after-enter="setAnimEnd(true)">
    <div v-if="showMenuPane" class="fixed top-0 left-0 w-full h-screen z-10 bg-black/30" @click="closeMenuPanel"/>
  </transition>
  <!-- 菜单面板 -->
  <transition enter-active-class="animate__animated animate__rotateInUpRight" leave-active-class="animate__animated animate__rotateOutUpLeft">
    <div v-if="showMenuPane" class="fixed inset-0 z-20 bg-white overflow-y-auto scrollbar-hidden" style="width: 260px">
      <SvgImg class="absolute top-2.5 right-2.5 text-white stroke-0 transition-all hover:text-gray-400 hover:cursor-pointer"
              svg-id="close" @click="setShowMenuPane(false)"/>
      <div class="absolute left-0 right-0 h-8 bg-gradient-to-t from-white" style="top: 268px"/>
      <div class="h-full flex flex-col justify-between items-stretch">
        <div class="h-auto">
          <!-- 头像、说明 -->
          <div class="w-full h-75 mb-5 bg-cover avatar-background">
            <el-avatar :src="env.serverUrl + '/files/image/misc/52162943041122439531598791307246.jpg'" alt="头像" class="avatar-image" fit="cover"/>
            <p class="text-white my-4 text-xl">念</p>
            <p class="text-white my-2.5">路曼曼其修远兮</p>
            <p class="text-white my-2.5">吾将上下而求索</p>
          </div>
          <MenuNav/>
          <el-divider/>
          <MenuCom/>
        </div>
        <MenuMana/>
      </div>
    </div>
  </transition>
</template>

<!-- 导航面板，包括 背景面板 和 菜单面板-->
<script setup>
import MenuCom from "@/components/constructe/nav/menu/MenuCom.vue";
import MenuMana from "@/components/constructe/nav/menu/MenuMana.vue";
import MenuNav from "@/components/constructe/nav/menu/MenuNav.vue";
import { inject } from "vue";

const { showMenuPane, setShowMenuPane } = inject('showMenuPane');
const { setAnimEnd } = inject('animEnd');
const closeMenuPanel = inject('closeMenuPanel');
</script>