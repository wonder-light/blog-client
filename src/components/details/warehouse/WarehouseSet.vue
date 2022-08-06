<template>
  <div class="warehouse-set">
    <div style="display: flex;">
      <h1 class="warehouse-title">{{ name }}</h1>
    </div>
    <div v-if="repository?.length > 0" class="home-content-layout">
      <WarehouseCard v-for="item in repository" :key="item" :repository="item"/>
    </div>
    <el-empty v-else/>
  </div>
</template>

<!-- 仓库集 -->
<script setup>
import WarehouseCard from "@/components/details/warehouse/WarehouseCard.vue";
import { getCurrentInstance } from "vue";

let props = defineProps({
    name: { type: String, default: 'GitHub' },
    repository: { type: [Object, null], required: true },
    method: { type: String, default: 'get' },
    baseUrl: { type: String, default: 'https://api.github.com' },
    api: { type: String, default: '/users/wonder-light/repos' },
    params: { type: Object, default: () => ({}) },
    //更新数据的方法
    update: { type: Function, required: true },
});

const { proxy } = getCurrentInstance();

if (!props.repository) {
    await getRepository();
}

//异步获取所有公共仓库
async function getRepository() {
    let loop = true;
    let currentPage = 1;
    let params = Object.assign({ per_page: 100 }, props.params);
    while (loop) {
        params.page = currentPage;
        await proxy.axios({
            method: props.method,
            baseURL: props.baseUrl,
            url: props.api,
            timeout: 3000,
            headers: { 'accept': 'application/vnd.github.v3+json' },
            params,
        }).then(response => {
            if (response.data instanceof Array && response.data.length > 0) {
                props.update(response.data);
            }
            else {
                loop = false;
            }
            currentPage += 1;
        }).catch(() => loop = false);
    }
}
</script>