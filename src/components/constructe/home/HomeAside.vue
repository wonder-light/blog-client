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
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <circle cx="12" cy="8" r="7"></circle>
             <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
           </svg>
            <span>文章数目</span>
          </span>
          <span :style="{'background-color': getColor()}" class="data">
            {{ blogInfo?.articleCount ?? 0 }}
          </span>
        </li>
        <li>
          <span class="label">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
              </path>
            </svg>
            <span>评论数目</span>
          </span>
          <span :style="{'background-color': getColor()}" class="data">
            {{ blogInfo?.commentCount ?? 0 }}
          </span>
        </li>
        <li>
          <span class="label">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
            <span>运行天数</span>
          </span>
          <span :style="{'background-color': getColor()}" class="data">
            {{ moment().diff(blogInfo?.startTime ?? Date.now(), 'day') + '天' }}
          </span>
        </li>
        <li>
          <span class="label">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
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
import { getCurrentInstance } from "vue";

const store = useCounterStore();
const {proxy} = getCurrentInstance();

//颜色
let colors = ['#ff5b00', '#e6af00', '#7fbf03', '#0be617',
    '#00ffc2', '#00abff', '#2428ff', '#f31eff'];

let MaxIndex = colors.length - 1;

//博客信息
const {blogInfo, tags} = storeToRefs(store);

if (!blogInfo.value) {
    //更新博客信息
    await store.updateBlogInfo();
}

if (!tags.value) {
    //更新标签信息
    await store.updateTags();
}

function getColor() {
    return colors[proxy.functions.RandomNumber(0, MaxIndex)];
}

</script>