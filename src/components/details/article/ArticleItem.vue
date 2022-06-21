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
            <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                fill="currentColor">
              </path>
            </svg>
            <span>{{ blogger.name }}</span>
          </div>
          <div>
            <svg class="icon" height="200" p-id="2657" t="1649980705565"
                 version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M512.736 992a483.648 483.648 0 0 1-164.672-28.8 36.88 36.88 0 1 1 25.104-69.36 407.456 407.456 0 1 0-184.608-136.512A36.912 36.912 0 0 1 129.488 801.6a473.424 473.424 0 0 1-97.472-290A480 480 0 1 1 512.736 992z"
                p-id="2658">
              </path>
              <path
                d="M685.6 638.592a32 32 0 0 1-14.032-2.96l-178.048-73.888a36.8 36.8 0 0 1-22.912-34.016V236.672a36.944 36.944 0 1 1 73.888 0v266.72l155.2 64.272a36.336 36.336 0 0 1 19.952 48 37.616 37.616 0 0 1-34.048 22.928z"
                p-id="2659">
              </path>
            </svg>
            <span>{{ moment(article.date).format('Y年M月D日') }}</span>
          </div>
          <div v-if="article.type != null">
            <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"
                fill="currentColor">
              </path>
            </svg>
            <span>{{ article.type.name }}</span>
          </div>
          <div>
            <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
                fill="currentColor">
              </path>
            </svg>
            <span>{{ article.views }}</span>
          </div>
          <div>
            <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
                fill="currentColor">
              
              </path>
              <path
                d="M512 499.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
                fill="currentColor">
              </path>
            </svg>
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
