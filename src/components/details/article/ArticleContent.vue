<template>
  <div class="article-content">
    <div class="article-layout">
      <ArticleItem v-for="(article, index) in shows" :key="article.id" :article="article" :large="canDiversified(index)"/>
    </div>
    <el-pagination v-model:current-page="currentPage" :total="articleNumber" v-bind="v_bind" @current-change="check"/>
  </div>
</template>

<script setup>
import ArticleItem from "@/components/details/article/ArticleItem.vue";
import { computed, getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";

const store = useCounterStore();
const {blogInfo, articles} = storeToRefs(store);
const {proxy} = getCurrentInstance();

//文章总数量
const articleNumber = ref(blogInfo.value?.articleCount ?? -1);
//当前分页
const currentPage = ref(1);
//当前显示的文章
const shows = computed(() => articles.value.slice((currentPage.value - 1) * 10, currentPage.value * 10));
//分页的绑定
const v_bind = {
    'page-size': 10, 'pager-count': 5, 'hide-on-single-page': true,
    background: true, layout: 'prev, pager, next', style: 'justify-content: center;',
};

await check();

//检测并获取文章
async function check() {
    if (articleNumber.value <= 0) {
        return;
    }
    if (articles.value.length === articleNumber.value) {
        return;
    }
    const start = currentPage.value * 10 - 10;
    let sub = articles.value.slice(start, start + 10);
    if (!sub.includes(undefined)) {
        return;
    }
    await proxy.axios.get('/article', {
        params: {start, number: 10, mode: 0}
    }).then(response => {
        store.addArticles({start, articles: response.data});
    });
}

//能够多样化显示
function canDiversified(index) {
    //小于1400时只用竖版显示
    return window.innerWidth <= 1400 || index % 2 !== 0;
}
</script>