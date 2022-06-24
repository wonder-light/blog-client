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
              <SvgImg svg-id="date"/>
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