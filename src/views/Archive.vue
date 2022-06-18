<template>
    <div class="archive">
        <el-card shadow="hover">
            <div class="archive-title">文章总览 - {{ articleNumber }}</div>
            <div class="archive-item">
                <div v-for="item in showList" :key="item"
                     :class="{'archive-year': IsNumber(item), 'archive-info': !IsNumber(item)}">
                    <div v-if="!IsNumber(item)" class="archive-info-main">
                        <el-image :src="item.cover" fit="cover" @click="$router.push(`/article/${item.id}`)"/>
                        <div>
                            <div class="archive-info-date">
                                <el-icon>
                                    <calendar/>
                                </el-icon>
                                <span>{{ moment(item.date).format('Y-M-D') }}</span>
                            </div>
                            <router-link :to="`/article/${item.id}`" class="archive-info-title">
                                {{ item.title }}
                            </router-link>
                        </div>
                    </div>
                    <a v-else class="archive-year-title">{{ item }}</a>
                </div>
            </div>
            <el-pagination :page-size="10" :pager-count="5" :total="articleNumber" class="archive-pagination"
                           hide-on-single-page layout="prev, pager, next" @current-change="CurrentPageChang"/>
        </el-card>
    </div>
</template>

<!-- 归档 -->
<script setup>
import moment from "moment";
import { getCurrentInstance, ref } from "vue";
import { Calendar } from "@element-plus/icons-vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";

const {blogInfo} = storeToRefs(useCounterStore());
const {proxy} = getCurrentInstance();

//总文章数
let articles = [];
//显示的数据
let showList = ref([]);
//文章总数量
let articleNumber = ref(blogInfo?.articleCount ?? -1);

CurrentPageChang(1);

//当前页面改变时调用
function CurrentPageChang(currentPage) {
    if (articles.length === articleNumber.value) {
        return;
    }
    let start = currentPage * 10 - 10;
    if (articles[start] == null) {
        proxy.axios.get('/article', {
            params: {start, number: 10, mode: -1}
        }).then(response => {
            for (let e of response.data) {
                articles[start++] = e;
            }
            Remapping(currentPage);
        });
    }
    else {
        Remapping(currentPage);
    }
}

//重映射
function Remapping(currentPage) {
    let year = 0;
    let index = (currentPage - 1) * 10;
    showList.value = [];
    articles.slice(index, index + 10)
        .forEach((elem) => {
            let value = moment(elem.date).year();
            if (year !== value) {
                year = value;
                showList.value.push(year);
            }
            showList.value.push(elem);
        });
}

function IsNumber(item) {
    return typeof (item) === 'number';
}
</script>

<style scoped>

</style>