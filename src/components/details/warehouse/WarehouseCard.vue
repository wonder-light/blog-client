<template>
  <Card :style="{'background-color': color}" class="warehouse-card">
    <div style="width: 100%">
      <h1>{{ repository.name }}</h1>
      <small>
        <span class="star">
          <SvgImg svg-id="star"/>
          <span>{{ repository.stargazers_count + ' star / ' }}</span>
        </span>
        <span class="star">
          <SvgImg svg-id="fork"/>
          <span>{{ repository.forks_count + ' fork / ' }}</span>
        </span>
        <span class="star">
          <SvgImg svg-id="views"/>
          <span>{{ repository.watchers_count + ' watch' }}</span>
        </span>
      </small>
    </div>
    <div class="description">
      <p class="multiple-lines-show">{{ repository.description ?? '暂无介绍' }}</p>
    </div>
    <div style="width: 100%">
      <span class="time">
      <SvgImg svg-id="date"/>
      <small>{{ moment(repository.updated_at).format('Y-M-D') }}</small>
    </span>
      <el-button class="visit" round @click="openWebPage(repository.html_url)">
        <SvgImg svg-id="click"/>
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