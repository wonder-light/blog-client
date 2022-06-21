<template>
  <div v-if="article" class="article-views">
    <el-card class="article-views-info" shadow="hover">
      <h1>{{ article.title }}</h1>
      <div class="infos">
        <span>
          <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                          fill="currentColor">
                        </path>
                    </svg>
          {{ store.blogger.name }}
        </span>
        <span>
          <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
              fill="currentColor"></path>
          </svg>
          {{ moment(article.date).format('Y年M月D日') }}
        </span>
        <span>
          <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
              fill="currentColor"></path>
          </svg>
          {{ article.views + ' 次浏览' }}
        </span>
        <span v-if="false">
          <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
              fill="currentColor"></path>
          </svg>
          {{ wordNumber + ' 字数' }}
        </span>
        <span>
          <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
              fill="currentColor"></path>
            <path
              d="M512 499.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
              fill="currentColor"></path>
          </svg>
          {{ article.commentCount + ' 条评论' }}
        </span>
        <span v-if="article.type?.name">
          <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"
              fill="currentColor"></path>
          </svg>
          {{ article.type.name }}
        </span>
      </div>
      <el-image :alt="article.title" :src="article.cover" fit="cover"/>
    </el-card>
    <el-card shadow="hover">
      <div :id="IdHandle" class="tinymce-content" v-html="article.content"/>
    </el-card>
    <ArticleRecommend :id="articleId"/>
    <CommentArea :close-comment="article.closeComment" :target-id="article.id"/>
  </div>
  <div v-else>
    <el-empty/>
  </div>
</template>

<script setup>
import moment from "moment";
import { getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import CommentArea from "@/components/details/comment/CommentArea.vue";
import ArticleRecommend from "@/components/details/article/view/ArticleRecommend.vue";


const store = useCounterStore();
const {proxy} = getCurrentInstance();

//文章ID
const articleId = ref(Number(proxy.$route.params.id));
//文章
const article = ref(store.getArticle(articleId, false, true));
//文本内容ID
const IdHandle = ref(proxy.functions.NewEditorId());
//字数
let wordNumber = ref(0);

let colors = ['#ff5b00', '#e6af00', '#7fbf03', '#0be617', '#00ffc2', '#00abff', '#2428ff', '#f31eff'];


if (!article.value) {
    //获取没有的文章
    await proxy.axios.get('/article/' + articleId.value).then(response => {
        article.value = response.data;
    });
}

</script>