<template>
  <Card :style="{'background-color': color}" class="warehouse-card">
    <div style="width: 100%">
      <h1>{{ repository.name }}</h1>
      <small>
        <span class="star">
          <svg-img :src="env.svg['star.svg']"/>
          <span>{{ repository.stargazers_count + ' star / ' }}</span>
        </span>
        <span class="star">
          <svg-img :src="env.svg['fork.svg']"/>
          <span>{{ repository.forks_count + ' fork / ' }}</span>
        </span>
        <span class="star">
          <svg-img :src="env.svg['views.svg']"/>
          <span>{{ repository.watchers_count + ' watch' }}</span>
        </span>
      </small>
    </div>
    <div class="description">
      <p class="multiple-lines-show">{{ repository.description ?? '暂无介绍' }}</p>
    </div>
    <div style="width: 100%">
      <span class="time">
      <svg-img :src="env.svg['date.svg']"/>
      <small>{{ moment(repository.updated_at).format('Y-M-D') }}</small>
    </span>
      <el-button class="visit" round @click="OpenWebPage(repository.html_url)">
        <svg-img :src="env.svg['click.svg']"/>
        <p>访问</p>
      </el-button>
    </div>
  </Card>
</template>

<!-- 仓库卡片 -->
<script setup>
import moment from "moment";
import Card from "@/components/common/Card.vue";
import { getCurrentInstance } from "vue";

defineProps({
    //存储库
    repository: {type: Object, default: null},
});

const {proxy} = getCurrentInstance();

//卡片颜色
let colors = [
    '#2a9dc9', '#ca4905', '#ad8609',
    '#1bab65', '#5ca603', '#16c397',
    '#0e87c0', '#3e5abb', '#b300be',
];

let color = colors[proxy.functions.RandomNumber(0, colors.length - 1)];

//打开网页
function OpenWebPage(url, target = '_blank') {
    window.open(url, target);
}

</script>

<style scoped>

</style>