<template>
  <Card class="w-full h-full">
    <div class="relative hover:cursor-pointer" style="padding-top: 80%" @click="skipToView">
      <el-image :alt="article.title" :src="article.cover" class="!absolute inset-0" fit="cover"/>
      <p class="absolute left-0 bottom-1 max-w-full px-3 text-white text-2xl truncate text-left">{{ article.title }}</p>
    </div>
    <div class="grid justify-items-start my-3 mx-5">
      <p class="w-full truncate text-left mb-2">{{ article.description }}</p>
      <div class="flex items-center content-center">
        <span class="flex mr-2">
          <SvgImg class="w-5 h-5" svg-id="date-color"/>
        </span>
        <span>{{ moment(article.date).format('Y年M月D日') }}</span>
      </div>
      <el-divider class="!my-4"/>
      <div class="flex flex-wrap">
        <a v-if="article.type" :style="tagStyle" class="inline-block text-xs m-1 py-0.5 px-2.5 rounded-xl">
          {{ article.type.name }}
        </a>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { randomColor } from "@/assets/js/api";
import Card from "@/components/common/Card.vue";
import moment from "moment";
import { getCurrentInstance } from "vue";

const props = defineProps({
    //文章
    article: { type: Object, default: null },
});

const proxy = getCurrentInstance().proxy;

const tagStyle = getColor();

function getColor() {
    let color = randomColor(0x580E0E);
    return ({
        'color': color,
        'background-color': color + '30'
    });
}

//跳转到对应的文章
function skipToView() {
    if (props.article != null) {
        proxy.$router.push(`/article/${ props.article.id }`);
    }
}
</script>