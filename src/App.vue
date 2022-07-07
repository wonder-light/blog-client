<template>
  <RouterView v-slot="{Component}">
    <template v-if="Component">
      <!-- 为'加载状态'与'显示状态'提供过渡动画 -->
      <Transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="in-out">
        <KeepAlive>
          <Suspense>
            <!-- 主要内容 -->
            <!-- Component为undefined时Suspense组件的工作方式会变得不正常 -->
            <template #default>
              <div id="home">
                <component :is="Component"></component>
              </div>
            </template>
            <!-- 加载中状态 -->
            <template #fallback>
              <LoadPage full/>
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
    <template v-else>
      <LoadPage full/>
    </template>
  </RouterView>
  <SakuraEffect/>
  <el-config-provider :locale="locale"/>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SakuraEffect from "@/components/common/SakuraEffect.vue";
import { locale } from "@/assets/js/api";
//
</script>
