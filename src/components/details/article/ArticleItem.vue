<template>
  <el-card class="article-item" shadow="hover">
    <div :class="large ? ['column-layout'] : ['row-layout']">
      <div class="item-image">
        <el-image :alt="article.title" :src="article.cover" fit="cover" @click="SkipToView"/>
      </div>
      <div class="article-item-content">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <el-divider/>
        <div class="item-tags">
          <div>
            <svg-img svg-id="user.svg"/>
            <span>{{ blogger.name }}</span>
          </div>
          <div>
            <svg-img svg-id="date.svg"/>
            <span>{{ moment(article.date).format('Y年M月D日') }}</span>
          </div>
          <div v-if="article.type">
            <svg-img svg-id="bookmarks"/>
            <span>{{ article.type.name }}</span>
          </div>
          <div>
            <svg-img svg-id="views"/>
            <span>{{ article.views }}</span>
          </div>
          <div>
            <svg-img svg-id="comment"/>
            <span>{{ article.commentCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import moment from "moment";
import { getCurrentInstance } from "vue";
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";

let props = defineProps({
    //文章
    article: {type: Object, default: null},
    //true: 竖版, false: 横版
    large: {type: Boolean, default: false},
});

const {proxy} = getCurrentInstance();
const {blogger} = storeToRefs(useCounterStore());


//跳转到对应的文章
function SkipToView() {
    if (props.article != null) {
        proxy.$router.push(`/article/${props.article.id}`);
    }
}
</script>
