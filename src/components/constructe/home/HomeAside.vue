<template>
  <aside class="home-aside">
    <el-card shadow="hover">
      <Weather/>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <p class="home-card-header">博客信息</p>
      </template>
      <ul class="home-blog-info">
        <li>
          <span class="label">
            <SvgImg svg-id="article1"/>
            <span>文章数目</span>
          </span>
          <span :style="{'background-color': getColor()}" class="data">
            {{ blogInfo?.articleCount ?? 0 }}
          </span>
        </li>
        <li>
          <span class="label">
            <SvgImg svg-id="comment"/>
            <span>评论数目</span>
          </span>
          <span :style="{'background-color': getColor()}" class="data">
            {{ blogInfo?.commentCount ?? 0 }}
          </span>
        </li>
        <li>
          <span class="label">
            <SvgImg svg-id="date1"/>
            <span>运行天数</span>
          </span>
          <span :style="{'background-color': getColor()}" class="data">
            {{ moment().diff(blogInfo?.startTime ?? Date.now(), 'day') + '天' }}
          </span>
        </li>
        <li>
          <span class="label">
            <SvgImg svg-id="action1"/>
            <span>最后活动</span>
          </span>
          <span :style="{'background-color': getColor()}" class="data">
            {{ moment(blogInfo?.updateTime ?? Date.now()).fromNow() }}
          </span>
        </li>
      </ul>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <p class="home-card-header">标签云</p>
      </template>
      <TagCloud :tag-list="tags"/>
    </el-card>
  </aside>
</template>

<!-- 侧边栏 -->
<script setup>
import moment from 'moment';
import Weather from "@/components/common/Weather.vue";
import TagCloud from "@/components/common/TagCloud.vue";
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";
import { randomNumber } from "@/assets/js/api";

const store = useCounterStore();
//博客信息
const {blogInfo, tags} = storeToRefs(store);

//颜色
let colors = ['#ff5b00', '#e6af00', '#7fbf03', '#0be617',
    '#00ffc2', '#00abff', '#2428ff', '#f31eff'];

let MaxIndex = colors.length - 1;

if (!blogInfo.value) {
    //更新博客信息
    await store.updateBlogInfo();
}

if (!tags.value) {
    //更新标签信息
    await store.updateTags();
}

function getColor() {
    return colors[randomNumber(0, MaxIndex)];
}

</script>