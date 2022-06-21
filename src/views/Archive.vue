<template>
  <div class="archive">
    <el-card shadow="hover">
      <ArchiveList :origins="showList" :title="'文章总览 - ' +  articleNumber"/>
      <el-pagination :page-size="10" :pager-count="5" :total="articleNumber" class="archive-pagination"
                     hide-on-single-page layout="prev, pager, next" @current-change="pageChang"/>
    </el-card>
  </div>
</template>

<!-- 归档 -->
<script setup>
import { getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";
import ArchiveList from "@/components/details/archive/ArchiveList.vue";

const {blogInfo} = storeToRefs(useCounterStore());
const {proxy} = getCurrentInstance();

//总文章数
let articles = [];
//显示的数据
let showList = ref([]);
//文章总数量
let articleNumber = ref(blogInfo.value?.articleCount ?? -1);

pageChang(1);

//当前页面改变时调用
function pageChang(page) {
    let start = page * 10 - 10;
    showList.value = articles.slice(start, start + 10);
    if (articles.length === articleNumber.value) {
        return;
    }
    if (showList.value.includes(undefined) !== -1) {
        proxy.axios.get('/article', {
            params: {start, number: 10, mode: -1}
        }).then(response => {
            for (let e of response.data) {
                showList.value[start] = e;
                articles[start++] = e;
            }
        });
    }
}

</script>