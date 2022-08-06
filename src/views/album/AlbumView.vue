<template>
  <div class="w-full">
    <p class="text-4xl leading-relaxed">{{ album.name }}</p>
    <p class="text-lg mb-8">创建时间为{{ '2022年4月15日' }} - {{ album.number }}个项目</p>
    <el-divider/>
    <div v-if="album?.images?.length > 0" class="content-layout">
      <el-image v-for="(url, index) in album.images" :key="url" :alt="url" :initial-index="index"
                :preview-src-list="album.images" :src="url" class="w-full h-full" fit="cover" loading="lazy"/>
    </div>
    <el-empty v-else/>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { getCurrentInstance, ref } from "vue";

let props = defineProps({
    albumId: { type: Number, default: 0 },
});

const { albums } = useCounterStore();
const { proxy } = getCurrentInstance();

let album = ref(albums?.find(item => item.id === props.albumId));

if (!album.value) {
    //获取相册
    await proxy.axios.get('/album/' + props.albumId).then(response => {
        album.value = response.data;
    });
}

//获取相册的图片URL
if (!album.value?.images || album.value.images.length <= 0) {
    await proxy.axios.get(`/album/${ props.albumId }/images`).then(response => {
        album.value.images = response.data;
    });
}

</script>