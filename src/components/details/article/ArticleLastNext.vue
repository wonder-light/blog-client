<template>
  <div v-if="last || next" class="article-last-next">
    <div v-if="last" class="view-item" @click="skipView(last.id)">
      <el-image :alt="last.title" :src="last.cover" fit="cover"/>
      <div class="title last">
        <span>上一篇</span>
        <span>{{ last.title }}</span>
      </div>
    </div>
    <div v-if="next" class="view-item" @click="skipView(next.id)">
      <el-image :alt="next.title" :src="next.cover" fit="cover"/>
      <div class="title next">
        <span>下一篇</span>
        <span>{{ next.title }}</span>
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