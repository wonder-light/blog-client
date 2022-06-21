<template>
  <div class="home-content-layout">
    <el-card v-for="item in albums" :key="item.id" class="album-content">
      <div class="image">
        <el-image :src="item.cover" alt="" fit="cover" @click="OpenAlbum(item)"/>
      </div>
      <div>
        <p>{{ item.name }}</p>
        <small>{{ item.number + ' 个项目' }}</small>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";

const store = useCounterStore();
const {albums} = storeToRefs(store);
const {proxy} = getCurrentInstance();

await proxy.axios.get('/album').then(response => {
    store.addAlbumArray(response.data);
});

//打开相册
function OpenAlbum(album) {
    proxy.$router.push({
        name: 'albumView',
        params: {
            id: album.id
        }
    });
}
</script>