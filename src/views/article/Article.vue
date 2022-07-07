<template>
  <div class="article">
    <router-view v-slot="{Component, route}">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <component :is="Component || ArticleContent" :key="route.path"></component>
            <template #fallback>
              <LoadPage/>
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
import ArticleContent from "@/components/details/article/ArticleContent.vue";
//
</script>