<template>
  <main class="home-main">
    <RouterView v-slot="{Component}">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <component :is="Component || HomeContent"></component>
            <template #fallback>
              <load-page/>
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
</template>

<!-- 首页主要内容 -->
<script setup>
import HomeContent from "@/components/constructe/home/HomeContent.vue";
//当组件无效时就是用 HomeContent 组件

</script>