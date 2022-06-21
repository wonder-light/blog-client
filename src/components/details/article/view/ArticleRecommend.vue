<template>
  <el-card shadow="hover">
    <article-simple-view v-if="last || next" style="height: 180px;margin: 20px auto 30px">
      <article-simple-view-item v-if="last" :id="last.id" :src="last.cover">
        <div class="last-article">
          <div>上一篇</div>
          <div>{{ last.title }}</div>
        </div>
      </article-simple-view-item>
      <article-simple-view-item v-if="next" :id="next.id" :src="next.cover">
        <div class="next-article">
          <div>下一篇</div>
          <div>{{ next.title }}</div>
        </div>
      </article-simple-view-item>
    </article-simple-view>
    <div v-if="articleRecommends.length > 0" class="article-views-recommend">
      <div class="article-views-hierarchic">
        <svg class="icon" height="200" p-id="6414" t="1650121714448" version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
            p-id="6415"></path>
        </svg>
        <span>相关推荐</span>
      </div>
      <article-simple-view style="height: 200px;margin-top: 15px">
        <article-simple-view-item v-for="item in articleRecommends" :id="item?.id" :key="item" :src="item?.cover">
          <div class="recommend-article">
            <div>{{ item?.title }}</div>
          </div>
        </article-simple-view-item>
      </article-simple-view>
    </div>
  </el-card>
</template>

<!-- 文章推荐 -->
<script setup>
import ArticleSimpleView from "@/components/details/article/view/ArticleSimpleView.vue";
import ArticleSimpleViewItem from "@/components/details/article/view/ArticleSimpleViewItem.vue";
import { getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";

const props = defineProps({
    id: {type: [String, Number], default: 0},
});

const {proxy} = getCurrentInstance();
const store = useCounterStore();
//推荐文章
const articleRecommends = ref([]);
//上一篇
const last = ref(null);
//下一篇
const next = ref(null);


await loadContext();


//获取上一篇和下一篇文章, 以及推荐文章
async function loadContext() {
    await proxy.axios.get(`/article/${props.id}/ln`).then(response => {
        last.value = response.data.last;
        next.value = response.data.next;
    });
    if (articleRecommends.value.length <= 0) {
        //获取推荐文章信息
        await proxy.axios.get('/article/recommend').then(response => {
            articleRecommends.value = response.data;
        });
    }
    RandomSelection();
}

//随机选择三个推荐文章
function RandomSelection() {
    let length = articleRecommends.value.length;
    if (length < 3) return;
    let numbers = [];
    while (numbers.length < 3) {
        let v = Math.floor(Math.random() * length);
        if (numbers.includes(v) === false) {
            numbers.push(v);
        }
    }
    articleRecommends.value = numbers.map(T => articleRecommends[T]);
}
</script>