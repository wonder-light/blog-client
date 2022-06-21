<template>
  <!-- 菜单背景 -->
  <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut"
              @after-enter="setAnimEnd(true)">
    <div v-if="showMenuPane" class="menu-background" @click="closeMenuPanel"/>
  </transition>
  <!-- 菜单面板 -->
  <transition enter-active-class="animate__animated animate__rotateInUpRight" leave-active-class="animate__animated animate__rotateOutUpLeft">
    <div v-if="showMenuPane" class="menu-pane">
      <svg class="menu-close" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" @click="setShowMenuPane(false)">
        <path
          d="M18.362 19.324c-0.902 0.902-2.363 0.902-3.263 0l-5.098-5.827-5.098 5.825c-0.902 0.902-2.363 0.902-3.263 0-0.902-0.902-0.902-2.363 0-3.263l5.304-6.057-5.306-6.061c-0.902-0.902-0.902-2.361 0-3.263s2.361-0.902 3.263 0l5.1 5.829 5.098-5.829c0.902-0.902 2.361-0.902 3.263 0s0.902 2.363 0 3.263l-5.304 6.061 5.304 6.057c0.902 0.902 0.902 2.363 0 3.265z"></path>
      </svg>
      <div class="menu-gradient"/>
      <div class="menu-layout">
        <div class="menu-main">
          <!-- 头像、说明 -->
          <div class="menu-header">
            <el-avatar :src="env.serverUrl + '/files/image/misc/52162943041122439531598791307246.jpg'" alt="头像" fit="cover"/>
            <p>念</p>
            <p>路曼曼其修远兮</p>
            <p>吾将上下而求索</p>
          </div>
          <MenuNav/>
          <el-divider style="margin-top: 20px;"/>
          <MenuCom/>
        </div>
        <MenuMana/>
      </div>
    </div>
  </transition>
</template>

<!-- 导航面板，包括 背景面板 和 菜单面板-->
<script setup>
import MenuNav from "@/components/constructe/nav/menu/MenuNav.vue";
import MenuCom from "@/components/constructe/nav/menu/MenuCom.vue";
import MenuMana from "@/components/constructe/nav/menu/MenuMana.vue";
import { inject } from "vue";

const {showMenuPane, setShowMenuPane} = inject('showMenuPane');
const {setAnimEnd} = inject('animEnd');
const closeMenuPanel = inject('closeMenuPanel');
</script>

<style scoped>

</style>