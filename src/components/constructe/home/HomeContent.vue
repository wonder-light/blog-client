<template>
  <div style="width: auto">
    <div v-if="recommendArticles?.length > 0" class="home-content-layout">
      <ArticleCard v-for="item in recommendArticles" :key="item.id" :article="item"/>
    </div>
    <el-empty v-else/>
  </div>
</template>

<!-- 首页默认显示的内容 -->
<script setup>
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";
import ArticleCard from "@/components/details/article/ArticleCard.vue";

const store = useCounterStore();
const {recommendArticles} = storeToRefs(store);

if (!recommendArticles.value) {
    await store.updateRecommendArticles();
}
</script>
