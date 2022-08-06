<template>
  <el-card :body-style="{padding: '0'}" shadow="hover">
    <div :class="['flex', large ? 'flex-col' : 'flex-row']">
      <div :class="{'relative pl-[40%]': !large}">
        <el-image :alt="article.title" :class="['image-scale el-img-400', {'!absolute inset-0': !large}]"
                  :src="article.cover" fit="cover" @click="skipToView"/>
      </div>
      <div class="my-5 mx-8 grid w-full">
        <h1 class="font-thin">{{ article.title }}</h1>
        <p class="text-gray-400 overflow-hidden whitespace-normal text-ellipsis">{{ article.description }}</p>
        <el-divider/>
        <div class="w-full flex items-center justify-center m-auto">
          <div class="article-info">
            <SvgImg svg-id="user"/>
            <span>{{ blogger.name }}</span>
          </div>
          <div class="article-info">
            <SvgImg svg-id="date"/>
            <span>{{ moment(article.date).format('Y年M月D日') }}</span>
          </div>
          <div v-if="article.type" class="article-info">
            <SvgImg svg-id="bookmarks"/>
            <span>{{ article.type.name }}</span>
          </div>
          <div class="article-info">
            <SvgImg svg-id="views"/>
            <span>{{ article.views }}</span>
          </div>
          <div class="article-info">
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
