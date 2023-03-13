<template>
  <div class="tw-w-full">
    <div>
      <div class="tw-py-6 tw-flex tw-items-center">
        <svg-icon name="books" size="4rem"/>
        <h1 class="tw-inline-block">文章</h1>
      </div>
      <Waterfall v-slot="{item}" :items="recArticle.items">
        <ArticleCard :article="item"/>
      </Waterfall>
      <div v-if="recArticle.totalCount > 6" class="tw-pt-8">
        <q-btn class="tw-text-purple-400" glossy label="查看更多" ripple rounded to="/article" unelevated/>
      </div>
    </div>
    <div class="tw-mt-4">
      <div class="tw-py-6 tw-flex tw-items-center">
        <svg-icon name="albums" size="4rem"/>
        <h1 class="tw-inline-block">相册</h1>
      </div>
      <Waterfall v-slot="{item}" :items="alb_items">
        <AlbumCard :album="item"/>
      </Waterfall>
      <div v-if="albums.totalCount > 6" class="tw-pt-8">
        <q-btn class="tw-text-purple-400" glossy label="查看更多" ripple rounded to="/album" unelevated/>
      </div>
    </div>
  </div>
</template>

<!-- 首页 -->
<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        Loading.show();
        const arr = [];
        const myStore = useStore(store);
        if (myStore.recArticle.itemCount <= 0) {
            arr.push(myStore.getArticles(0, 6, true, 0));
        }
        if (myStore.albums.itemCount <= 0) {
            arr.push(myStore.getAlbums(0, 6));
        }
        return Promise.all(arr);
    }
}
</script>

<script setup>
import AlbumCard from 'components/album/AlbumCard.vue'
import ArticleCard from 'components/article/ArticleCard.vue'
import Waterfall from 'components/common/Waterfall.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { albums, recArticle } = storeToRefs(useStore());
const alb_items = computed(() => albums.value.items.slice(0, 6));
</script>
