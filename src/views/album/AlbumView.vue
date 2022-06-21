<template>
  <div class="album-view">
    <p class="title">{{ album.name }}</p>
    <p class="description">创建时间为{{ '2022年4月15日' }} - {{ album.number }}个项目</p>
    <el-divider/>
    <div class="home-content-layout">
      <el-image v-for="(url, index) in album.images" :key="url" :alt="url" :initial-index="index"
                :preview-src-list="album.images" :src="url" class="image-item" fit="cover" loading="lazy"/>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";

let props = defineProps({
    albumId: {type: Number, default: 0},
});

const albums = useCounterStore().albums;
const {proxy} = getCurrentInstance();

let album = ref(albums?.find(item => item.id === props.albumId));

if (!album.value) {
    //获取相册
    await proxy.axios.get('/album/' + props.albumId).then(response => {
        album.value = response.data;
    });
}

//获取相册的图片URL
if (!album.value?.images || album.value.images.length <= 0) {
    await proxy.axios.get(`/album/${props.albumId}/images`).then(response => {
        album.value.images = response.data;
    });
}

</script>