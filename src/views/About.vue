<template>
    <div class="about">
        <el-card shadow="hover">
            <h1 class="about-header">关于我</h1>
            <el-image :src="article?.cover" alt="" fit="cover" style="margin-bottom: 20px"/>
            <div :id="IdHandle" style="text-align: initial" v-html="article.content"/>
        </el-card>
        <el-card shadow="hover">
            <CommentArea v-if="article != null" :close-comment="article.closeComment" :target-id="article.id"/>
        </el-card>
    </div>
</template>

<!-- 关于我 -->
<script setup>
import { getCurrentInstance, ref } from "vue";
import CommentArea from "@/components/comment/CommentArea.vue";

let {proxy} = getCurrentInstance();

//显示的内容ID
let IdHandle = ref(proxy.functions.NewEditorId());
//文章
let article = ref(null);

beforeCreate();

function beforeCreate() {
    let baseUrRL = proxy.env.baseURL;
    proxy.axios.get('/article/1651294869000').then(response => {
        article.value = response.data;
        if (article.value == null) {
            article.value = {cover: baseUrRL + '/files/image/background/mmexport1650128636119.jpg'};
        }
    }).catch(() => {
        article.value = {cover: baseUrRL + '/files/image/background/mmexport1650128636119.jpg'};
    });
}

</script>