<template>
  <el-card class="article-item" shadow="hover">
    <div :class="large ? ['column-layout'] : ['row-layout']">
      <div class="item-image">
        <el-image :alt="article.title" :src="article.cover" fit="cover" @click="skipToView"/>
      </div>
      <div class="article-item-content">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <el-divider/>
        <div class="item-tags">
          <div>
            <SvgImg svg-id="user.svg"/>
            <span>{{ blogger.name }}</span>
          </div>
          <div>
            <SvgImg svg-id="date.svg"/>
            <span>{{ moment(article.date).format('Y年M月D日') }}</span>
          </div>
          <div v-if="article.type">
            <SvgImg svg-id="bookmarks"/>
            <span>{{ article.type.name }}</span>
          </div>
          <div>
            <SvgImg svg-id="views"/>
            <span>{{ article.views }}</span>
          </div>
          <div>
            <SvgImg svg-id="comment"/>
            <span>{{ article.commentCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import moment from "moment";
import { storeToRefs } from "pinia/dist/pinia";
import { getCurrentInstance } from "vue";

let props = defineProps({
    //文章
    article: { type: Object, default: null },
    //true: 竖版, false: 横版
    large: { type: Boolean, default: false },
});

const { proxy } = getCurrentInstance();
const { blogger } = storeToRefs(useCounterStore());


//跳转到对应的文章
function skipToView() {
    if (props.article != null) {
        proxy.$router.push(`/article/${ props.article.id }`);
    }
}
</script>
