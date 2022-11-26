<template>
  <div class="w-full">
    <el-image alt="仓库背景图片" class="mb-8" fit="cover"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5c8ba350-827c-4df5-bf3c-d7683c79f8bf/f6bd80ff-c8c1-4529-bcb8-816124a8aedd.jpg"/>
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
const { githubRepository, giteeRepository } = storeToRefs(store);

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
        params: { access_token: '982da8f1bd7e54ccf7a0cf6970699b61' }
    },
]);

</script>