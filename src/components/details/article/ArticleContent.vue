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
const {blogInfo, simpleArticles} = storeToRefs(store);
const {proxy} = getCurrentInstance();

//每页的数量
const pageSize = 10;
//当前分页
const currentPage = ref(1);
//文章总数量
const articleNumber = computed(() => blogInfo.value?.articleCount ?? -1);
//当前显示的文章
const shows = computed(() => simpleArticles.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize));
//分页的绑定
const v_bind = {
    'page-size': pageSize, 'pager-count': 5, 'hide-on-single-page': true,
    background: true, layout: 'prev, pager, next', style: 'justify-content: center;',
};

//初始化, true: 文章数量已经正确配置
const initialize = computed(() => articleNumber.value >= 0);

await check();

//检测并获取文章
async function check() {
    if (initialize.value) {
        if (articleNumber.value <= 0) {
            return;
        }
        if (simpleArticles.value.length === articleNumber.value) {
            return;
        }
    }
    else if (simpleArticles.value.length > 0) {
        //没有正确配置文章数量，但是文章集合中的数量大于0，则退出
        return;
    }
    
    const start = currentPage.value * pageSize - pageSize;
    //获取对应索引的字串
    //[].slice(0, 10) => [],所以需要手动设置长度, [].length = 10 => [(10)undefined]
    const sub = simpleArticles.value.slice(start, start + pageSize);
    sub.length = pageSize;
    if (!sub.includes(undefined)) {
        return;
    }
    
    await proxy.axios.get('/article', {
        params: {start, number: pageSize, mode: 0}
    }).then(response => {
        store.setSimpleArticles(start, response.data);
    });
}

//能够多样化显示
function canDiversified(index) {
    //小于1400时只用竖版显示
    return window.innerWidth <= 1400 || index % 2 !== 0;
}
</script>