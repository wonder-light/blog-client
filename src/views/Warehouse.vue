<template>
  <div class="warehouse">
    <el-image :src="env.serverUrl + '/files/image/background/4955.jpg'" alt="仓库背景图片" fit="cover"/>
    <Suspense v-for="item in set" :key="item.api">
      <WarehouseSet v-bind="item"/>
      <template #fallback>
        <LoadPage/>
      </template>
    </Suspense>
  </div>
</template>

<!-- 仓库 -->
<script setup>
import WarehouseSet from "@/components/details/warehouse/WarehouseSet.vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";
import { ref } from "vue";

const store = useCounterStore();
const {githubRepository, giteeRepository} = storeToRefs(store);

const set = ref([
    {
        repository: githubRepository,
        update: store.setGithubRepository,
        api: '/users/wonder-light/repos',
        baseUrl: 'https://api.github.com',
        name: 'GitHub',
    },
    {
        repository: giteeRepository,
        update: store.setGiteeRepository,
        api: '/users/wonder-light/repos',
        baseUrl: 'https://gitee.com/api/v5',
        name: 'Gitee',
        params: {access_token: '982da8f1bd7e54ccf7a0cf6970699b61'}
    },
]);

</script>