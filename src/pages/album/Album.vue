<template>
  <div class="tw-w-full">
    <div class="tw-py-6 tw-flex tw-items-center">
      <svg-icon name="albums" size="4rem"/>
    </div>
    <q-infinite-scroll :offset="100" @load="onLoad">
      <Waterfall v-slot="{ item }" :items="albums.items" class="tw-w-full">
        <AlbumCard :album="item"/>
      </Waterfall>
      <template v-slot:loading>
        <div class="tw-mt-8">
          <q-spinner :thickness="3" class="tw-w-8 tw-h-8" color="primary"/>
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<!-- 相册 -->
<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        Loading.show();
        const myStore = useStore(store);
        if (myStore.albums.itemCount <= 0) {
            return myStore.getAlbums(0, 20);
        }
    }
}
</script>

<script setup>
import AlbumCard from 'components/album/AlbumCard.vue'
import Waterfall from 'components/common/Waterfall.vue'
import { storeToRefs } from 'pinia'
import { useMeta } from 'quasar'

const store = useStore();
const { albums } = storeToRefs(store);

useMeta({
    titleTemplate: title => `相册|${ title }`,
    meta: {
        //optional; similar to titleTemplate, but allows templating with other meta properties
        title: { template: (title) => `相册|${ title }` },
        keywords: { template: (keywords) => `${ keywords }|相册|album` },
        ogTitle: { template: (title) => `相册|${ title }` },
        twitterTitle: { template: (title) => `相册|${ title }` },
    }
});


function onLoad(index, done) {
    if (index <= 1) done();
    if (albums.value.totalCount <= albums.value.itemCount) {
        setTimeout(() => done(true), 3000);
    }
    else {
        store.getAlbums(albums.value.itemCount, 20).then(() => {
            done();
        })
    }
}
</script>
