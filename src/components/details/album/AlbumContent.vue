<template>
  <div v-if="albums?.length > 0" class="content-layout">
    <el-card v-for="item in albums" :key="item.id" class="w-full h-full">
      <div class="relative" style="padding-top: 80%">
        <el-image :src="item.cover" alt="" class="!absolute inset-0 image-scale" fit="cover" @click="openAlbum(item)"/>
      </div>
      <div>
        <p class="text-left mt-5 mb-3">{{ item.name }}</p>
        <small class="block text-left">{{ item.number + ' 个项目' }}</small>
      </div>
    </el-card>
  </div>
  <el-empty v-else/>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";
import { getCurrentInstance } from "vue";

const store = useCounterStore();
const { albums } = storeToRefs(store);
const { proxy } = getCurrentInstance();

if (!albums.value) {
    //更新相册
    await store.updateAlbum();
}

//打开相册
function openAlbum(album) {
    proxy.$router.push({
        name: 'albumView',
        params: {
            id: album.id
        }
    });
}
</script>