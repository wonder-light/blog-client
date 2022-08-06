<template>
  <div v-if="last || next" class="w-full grid sm:grid-cols-2" style="grid-auto-rows: 180px;">
    <div v-if="last" class="relative w-full h-full image-scale" @click="skipView(last.id)">
      <el-image :alt="last.title" :src="last.cover" class="w-full h-full  brightness-75" fit="cover"/>
      <div class="absolute inset-0 text-gray-100 grid items-center content-center px-8 justify-start">
        <span class="leading-10">上一篇</span>
        <span class="leading-10">{{ last.title }}</span>
      </div>
    </div>
    <div v-if="next" class="relative w-full h-full image-scale" @click="skipView(next.id)">
      <el-image :alt="next.title" :src="next.cover" class="w-full h-full  brightness-75" fit="cover"/>
      <div class="absolute inset-0 text-gray-100 grid items-center content-center px-8 justify-end">
        <span class="leading-10">下一篇</span>
        <span class="leading-10">{{ next.title }}</span>
      </div>
    </div>
  </div>
</template>

<!-- 文章推荐 -->
<script setup>
import { getCurrentInstance, ref } from "vue";

const props = defineProps({
    id: { type: [String, Number], default: 0 },
});

const { proxy } = getCurrentInstance();
//上一篇
const last = ref(null);
//下一篇
const next = ref(null);

//获取next和last文章
await proxy.axios.get(`/article/${ props.id }/ln`).then(response => {
    last.value = response.data.last;
    next.value = response.data.next;
});

//跳转文章
function skipView(id) {
    proxy.$router.push(`/article/${ id }`);
}
</script>