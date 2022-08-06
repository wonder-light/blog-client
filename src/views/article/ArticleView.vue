<template>
  <div v-if="article" class="article-views">
    <el-card shadow="hover">
      <div class="article-views-info">
        <h1>{{ article.title }}</h1>
        <div class="infos">
          <span>
            <SvgImg svg-id="user"/>
            {{ blogger.name }}
          </span>
          <span>
            <SvgImg svg-id="date"/>
            {{ moment(article.date).format('Y年M月D日') }}
          </span>
          <span>
            <SvgImg svg-id="views"/>
            {{ article.views + ' 次浏览' }}
          </span>
          <span>
            <SvgImg svg-id="comment"/>
            {{ article.commentCount + ' 条评论' }}
          </span>
          <span v-if="article.type">
            <SvgImg svg-id="bookmarks"/>
            {{ article.type.name }}
          </span>
        </div>
        <el-image :alt="article.title" :src="article.cover" fit="cover"/>
      </div>
      <div class="tinymce-content" v-html="article.content"/>
      <ArticleLastNext :id="articleId"/>
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