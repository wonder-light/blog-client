<template>
    <div class="album">
        <router-view/>
        <div v-if="this.$route.path === '/album'">
            <div class="home-content-display">
                <el-card v-for="item in albums" class="display-item" @click="ClickAlbum(item)">
                    <el-image :src="item.cover" alt="" fit="cover" @click="OpenAlbum(item)"/>
                    <p>{{ item.name }}</p>
                    <small>{{ item.number + ' 个项目' }}</small>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>

import { Options, Vue } from "vue-class-component";

@Options({})

//相册
export default class Album extends Vue {
    //显示修改和删除
    showModifyAndDelete = false;
    //相册集合
    albums = [];
    //选中的相册
    selectAlbum = null;
    
    created() {
        this.albums = this.$store.state.albums;
        this.axios.get('/album').then(response => {
            this.$store.commit('addAlbumArray', response.data);
        });
    }
    
    ClickAlbum(item) {
        this.selectAlbum = item;
        this.showModifyAndDelete = true;
    }
    
    //打开相册
    OpenAlbum(album) {
        this.$router.push({
            name: 'albumView',
            params: {
                id: album.id
            }
        });
    }
}
</script>
