<template>
  <div class="article">
    <router-view v-slot="{Component}">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <component :is="Component"></component>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
      <template v-else>
        <Suspense>
          <ArticleContent/>
        </Suspense>
      </template>
    </router-view>
  </div>
</template>

<script setup>
import ArticleContent from "@/components/details/article/ArticleContent.vue";</script>