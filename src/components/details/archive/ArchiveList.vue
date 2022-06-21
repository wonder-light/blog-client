<template>
  <div class="archive-list">
    <div class="archive-list-title">{{ title }}</div>
    <div class="archive-item">
      <div v-for="item in items" :key="item" :class="{'archive-year': item.year, 'archive-info': !item.year}">
        <div v-if="!item.year" class="archive-item-main">
          <div class="item-image">
            <el-image :alt="item.title" :src="item.cover" fit="cover" @click="skipView(item.id)"/>
          </div>
          <div>
            <div class="item-date">
              <svg data-v-78e17ca8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
                  fill="currentColor">
                </path>
              </svg>
              <span>{{ moment(item.date).format('Y-M-D') }}</span>
            </div>
            <a class="item-title" @click="skipView(item.id)">{{ item.title }}</a>
          </div>
        </div>
        <a v-else class="year-title">{{ item.year }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { computed, getCurrentInstance } from "vue";

let props = defineProps({
    title: {type: String, default: '文章总览'},
    //从前往后，时间从大到小
    origins: {type: Array, default: () => []},
});

const {proxy} = getCurrentInstance();

//显示的数据
let items = computed(() => {
    let year = 0;
    let origins = [];
    props.origins.forEach((origin) => {
        let y = moment(origin.date).year();
        if (year !== y) {
            year = y;
            origins.push({year});
        }
        origins.push(origin);
    });
    return origins;
});

//跳转到视图
function skipView(id) {
    proxy.$router.push(`/article/${id}`);
}
</script>