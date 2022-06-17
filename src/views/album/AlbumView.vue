<template>
    <div class="album-view">
        <p class="album-view-title">{{ album?.name }}</p>
        <p class="album-view-description">创建时间为{{ '2022年4月15日' }} - {{ album?.number }}个项目</p>
        <el-divider/>
        <el-image v-for="(img, index) in album?.images" :initial-index="index"
                  :preview-src-list="album?.images" :src="img" alt="" fit="cover"
                  lazy/>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        albumId: {type: Number, default: 0},
    }
})

export default class AlbumView extends Vue {
    //相册
    album = null;
    
    created() {
        this.album = this.$store.getters.getAlbum(this.albumId);
        if (this.album == null) {
            this.axios.get('/album/' + this.albumId).then(response => {
                this.album = response.data;
                if (this.album == null) {
                    this.$router.back();
                }
                this.checkImages();
            }).catch(() => {
                this.$router.back();
            });
        }
        else {
            this.checkImages();
        }
    }
    
    //检测图片列表是否是空
    checkImages() {
        if (this.album.images == null || this.album.images.length <= 0) {
            this.$store.dispatch('getAlbumImagesFromServer', this.album).then(result => {
                if (result === false) {
                    this.$router.back();
                }
            });
        }
    }
};
</script>

<style scoped>

</style>