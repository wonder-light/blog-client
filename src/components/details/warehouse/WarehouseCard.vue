<template>
  <Card :style="{'background-color': color}" class="w-full h-full px-7 py-5 flex flex-col justify-between">
    <div style="width: 100%">
      <h1 class="text-white truncate">{{ repository.name }}</h1>
      <div class="text-stone-300 mt-3">
        <small class="star">
          <SvgImg svg-id="star"/>
          <span>{{ repository.stargazers_count + ' star / ' }}</span>
        </small>
        <small class="star">
          <SvgImg svg-id="fork"/>
          <span>{{ repository.forks_count + ' fork / ' }}</span>
        </small>
        <small class="star">
          <SvgImg svg-id="views"/>
          <span>{{ repository.watchers_count + ' watch' }}</span>
        </small>
      </div>
    </div>
    <div class="flex items-center justify-center my-3.5">
      <p class="leading-normal text-stone-100 multiple-lines-show">{{ repository.description ?? '暂无介绍' }}</p>
    </div>
    <div style="width: 100%">
      <span class="flex items-center justify-start my-3.5">
        <SvgImg class="w-4 h-4 mr-1.5 text-stone-300" svg-id="date"/>
        <small class="text-stone-300">{{ moment(repository.updated_at).format('Y-M-D') }}</small>
      </span>
      <el-button class="text-gray-500 hover:text-sky-400" round @click="openWebPage(repository.html_url)">
        <SvgImg class="mr-1.5" svg-id="click"/>
        <p>访问</p>
      </el-button>
    </div>
  </Card>
</template>

<!-- 仓库卡片 -->
<script setup>
import { openWebPage, randomNumber } from "@/assets/js/api";
import Card from "@/components/common/Card.vue";
import moment from "moment";

defineProps({
    //存储库
    repository: { type: Object, default: null },
});

//卡片颜色
let colors = [
    '#2a9dc9', '#ca4905', '#ad8609',
    '#1bab65', '#5ca603', '#16c397',
    '#0e87c0', '#3e5abb', '#b300be',
];

let color = colors[randomNumber(0, colors.length - 1)];
</script>