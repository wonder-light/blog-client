<template>
  <div class="about">
    <el-card shadow="hover">
      <h1 class="title">关于我</h1>
      <el-image :src="article.cover" alt="" class="about-head-img" fit="cover"/>
      <div class="tinymce-content" v-html="article.content"/>
    </el-card>
    <CommentArea :close-comment="article.closeComment" :root-number="article.commentCount" :target-id="article.id"/>
  </div>
</template>

<!-- 关于我 -->
<script setup>
import CommentArea from "@/components/details/comment/CommentArea.vue";
import { getCurrentInstance, ref } from "vue";

let { proxy } = getCurrentInstance();

//文章
let article = ref(null);

let baseUrRL = proxy.env.baseURL;
await proxy.axios.get('/article/1651294869000').then(response => {
    article.value = response.data;
    if (article.value == null) {
        article.value = { cover: baseUrRL + '/files/image/background/mmexport1650128636119.jpg' };
    }
}).catch(() => {
    article.value = { cover: baseUrRL + '/files/image/background/mmexport1650128636119.jpg' };
});

</script>