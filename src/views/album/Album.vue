<template>
    <div class="album">
        <router-view/>
        <div v-if="$route.path === '/album'">
            <div class="home-content-display">
                <el-card v-for="item in albums" :key="item.id" class="display-item">
                    <el-image :src="item.cover" alt="" fit="cover" @click="OpenAlbum(item)"/>
                    <p>{{ item.name }}</p>
                    <small>{{ item.number + ' 个项目' }}</small>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";

//相册集合
let albums = ref([]);

let router = useRouter();
let store = useCounterStore();
const {proxy} = getCurrentInstance();

created();

function created() {
    albums.value = store.albums;
    proxy.axios.get('/album').then(response => {
        store.addAlbumArray(response.data);
    });
}

//打开相册
function OpenAlbum(album) {
    router.push({
        name: 'albumView',
        params: {
            id: album.id
        }
    });
}
</script>
