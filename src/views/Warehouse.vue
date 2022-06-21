<template>
  <div class="warehouse">
    <el-image :src="env.serverUrl + '/files/image/background/4955.jpg'" alt="仓库背景图片" fit="cover"/>
    <WarehouseSet :repository="githubRepository" :update="store.addGithubRepositoryArray"
                  api="/users/wonder-light/repos" baseUrl="https://api.github.com" name="GitHub"/>
    <WarehouseSet :params="{access_token: '982da8f1bd7e54ccf7a0cf6970699b61'}" :repository="giteeRepository" :update="store.addGiteeRepositoryArray"
                  api="/users/wonder-light/repos" baseUrl="https://gitee.com/api/v5" name="Gitee"/>
  </div>
</template>

<!-- 仓库 -->
<script setup>
import WarehouseSet from "@/components/details/warehouse/WarehouseSet.vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";

const store = useCounterStore();
const {githubRepository, giteeRepository} = storeToRefs(store);
</script>