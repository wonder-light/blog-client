<template>
  <div class="album-view">
    <p class="title">{{ album?.name }}</p>
    <p class="description">创建时间为{{ '2022年4月15日' }} - {{ album?.number }}个项目</p>
    <el-divider/>
    <div class="home-content-layout">
      <el-image v-for="(url, index) in album?.images" :key="url" :alt="url" :initial-index="index"
                :preview-src-list="album?.images" :src="url" class="image-item" fit="cover" lazy/>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";

let props = defineProps({
    albumId: {type: Number, default: 0},
});


//相册
let album = ref(null);

let router = useRouter();
let store = useCounterStore();
const {proxy} = getCurrentInstance();

created();

function created() {
    album.value = store.getAlbum(props.albumId);
    if (album.value == null) {
        proxy.axios.get('/album/' + props.albumId).then(response => {
            album.value = response.data;
            if (album.value == null) {
                router.back();
            }
            checkImages();
        }).catch(() => {
            router.back();
        });
    }
    else {
        checkImages();
    }
}

//检测图片列表是否是空
function checkImages() {
    if (album.value.images == null || album.value.images.length <= 0) {
        store.getAlbumImagesFromServer(album.value).then(result => {
            if (result === false) {
                router.back();
            }
        });
    }
}
</script>

<style scoped>

</style>