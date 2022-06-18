<template>
    <router-view :key="$route.fullPath"/>
    <div v-if="$route.path === '/article'" class="article">
        <div>
            <ArticleItem v-for="(article, index) in articles.slice((currentPage -1)*10, currentPage*10)"
                         :key="article.id"
                         :article="article" :large="index % 2 !== 0" :mode="false"/>
        </div>
        <div>
            <el-pagination v-model:current-page="currentPage" :page-size="10" :pager-count="5" :total="articleNumber"
                           background hide-on-single-page layout="prev, pager, next" style="justify-content: center;"
                           @current-change="check"/>
        </div>
    </div>
</template>

<script setup>
import ArticleItem from "@/components/ArticleItem.vue";
import { getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";

const {blogInfo} = storeToRefs(useCounterStore());
const {proxy} = getCurrentInstance();

//可以显示的文章集合，与 $store.state.articles 是同一个引用
let articles = ref([]);
//文章总数量
let articleNumber = ref(blogInfo?.articleCount ?? -1);
//当前分页
let currentPage = ref(1);

check();

function check() {
    if (articles.value.length === articleNumber.value) {
        return;
    }
    let start = currentPage.value * 10 - 10;
    if (articles.value[start] == null) {
        proxy.axios.get('/article', {
            params: {start, number: 10, mode: 0}
        }).then(response => {
            for (let e of response.data) {
                articles.value[start++] = e;
            }
        });
    }
}
</script>

<style lang="stylus">
</style>