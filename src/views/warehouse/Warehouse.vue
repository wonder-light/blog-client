<template>
    <div class="warehouse">
        <el-image :src="env.serverUrl + '/files/image/background/4955.jpg'" alt="" fit="cover"/>
        <div v-if="githubRepository.length > 0">
            <div style="display: flex;">
                <h1 class="warehouse-title">GitHub</h1>
            </div>
            <div class="home-content-display">
                <WarehouseCard v-for="item in githubRepository" :key="item" :repository="item" class="display-item"/>
            </div>
        </div>
        <div v-if="giteeRepository.length > 0">
            <el-divider/>
            <div style="display: flex;">
                <h1 class="warehouse-title">Gitee</h1>
            </div>
            <div class="home-content-display">
                <WarehouseCard v-for="item in giteeRepository" :key="item" :repository="item" class="display-item"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import WarehouseCard from "@/views/warehouse/WarehouseCard.vue";
import { useCounterStore } from "@/stores/counter";
import { getCurrentInstance } from "vue";
import { storeToRefs } from "pinia/dist/pinia";

const store = useCounterStore();
const {proxy} = getCurrentInstance();
//GitHub
//更多 GitHub API 请查看 https://docs.github.com/cn/rest/reference/repos#list-repositories-for-a-user
//githubRepository: 用户的GitHub存储库, giteeRepository: 用户的Gitee存储库
const {githubRepository, giteeRepository} = storeToRefs(store);

if (githubRepository.value.length <= 0) {
    getWarehouseFromGitHub(true);
}
if (giteeRepository.value.length <= 0) {
    getWarehouseFromGitHub(false);
}

//异步获取所有公共仓库
async function getWarehouseFromGitHub(isGitHub = true) {
    let currentPage = 1;
    let loop = true;
    while (loop) {
        await proxy.axios({
            method: 'get',
            baseURL: isGitHub ? 'https://api.github.com' : 'https://gitee.com/api/v5',
            url: '/users/wonder-light/repos',
            timeout: 3000,
            headers: {'accept': 'application/vnd.github.v3+json'},
            params: {
                access_token: isGitHub ? null : '982da8f1bd7e54ccf7a0cf6970699b61',
                per_page: 100,
                page: currentPage,
            }
        }).then(response => {
            if (response.data instanceof Array && response.data.length > 0) {
                if (isGitHub) {
                    store.addGithubRepositoryArray(response.data);
                }
                else {
                    store.addGiteeRepositoryArray(response.data);
                }
            }
            else {
                loop = false;
            }
            currentPage += 1;
        }).catch(() => loop = false);
    }
}
</script>

<style scoped>

</style>