<template>
  <div v-if="article" class="w-full">
    <el-card class="mb-8" shadow="hover">
      <div class="pb-5">
        <h1 class="text-left mt-5 mb-8">{{ article.title }}</h1>
        <div class="flex justify-start my-5">
          <span class="article-info">
            <SvgImg svg-id="user"/>
            {{ blogger.name }}
          </span>
          <span class="article-info">
            <SvgImg svg-id="date"/>
            {{ moment(article.date).format('Y年M月D日') }}
          </span>
          <span class="article-info">
            <SvgImg svg-id="views"/>
            {{ article.views + ' 次浏览' }}
          </span>
          <span class="article-info">
            <SvgImg svg-id="comment"/>
            {{ article.commentCount + ' 条评论' }}
          </span>
          <span v-if="article.type" class="article-info">
            <SvgImg svg-id="bookmarks"/>
            {{ article.type.name }}
          </span>
        </div>
        <el-image :alt="article.title" :src="article.cover" class="mt-4" fit="cover"/>
      </div>
      <div class="py-5" v-html="article.content"/>
      <ArticleLastNext :id="articleId" class="py-5"/>
    </el-card>
    <CommentArea :close-comment="article.closeComment" :root-number="article.commentCount" :target-id="article.id"/>
  </div>
  <div v-else>
    <el-empty/>
  </div>
</template>

<script setup>
import ArticleLastNext from "@/components/details/article/ArticleLastNext.vue";
import CommentArea from "@/components/details/comment/CommentArea.vue";
import { useCounterStore } from "@/stores/counter";
import moment from "moment";
import { storeToRefs } from "pinia/dist/pinia";
import { getCurrentInstance, ref } from "vue";


const store = useCounterStore();
const { proxy } = getCurrentInstance();
const { blogger } = storeToRefs(store);

//文章ID
const articleId = ref(Number(proxy.$route.params.id));
//文章
const article = ref(store.getArticle(articleId));

if (!article.value) {
    //获取没有的文章
    await proxy.axios.get('/article/' + articleId.value).then(response => {
        article.value = response.data;
        store.addArticles(response.data);
    });
}

</script>