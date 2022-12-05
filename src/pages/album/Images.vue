<template>
  <q-card flat>
    <div v-if="!items || items.length <= 0" class="tw-flex tw-justify-center tw-items-center" style="height: calc(100vh - 4rem)">
      <q-img class="tw-w-80" src="/image/empty.png"/>
    </div>
    <q-infinite-scroll v-else :offset="100" class="tw-mt-12" @load="onLoad">
      <Waterfall v-slot="{ item }" :items="items" class="tw-w-full">
        <q-img :src="`${process.env.API}/media/image/get_image/${item.id}`" class="tw-w-full" fit="cover" loading="lazy">
          <template v-slot:loading>
            <q-spinner class="tw-w-8 tw-h-8" color="primary"/>
          </template>
        </q-img>
      </Waterfall>
      <template v-slot:loading>
        <div class="tw-mt-8">
          <q-spinner :thickness="3" class="tw-w-8 tw-h-8" color="primary"/>
        </div>
      </template>
    </q-infinite-scroll>
  </q-card>
</template>

<!-- 图片集 -->
<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store, currentRoute }) {
        Loading.show();
        const arr = [];
        const myStore = useStore(store);
        const id = currentRoute.params.id;
        const img = myStore.images[id];
        if (!img || img.items.length <= 0) {
            arr.push(myStore.getImages(0, 20, id));
        }
        if (!img?.album) {
            arr.push(myStore.updateAlbum(id))
        }
        return Promise.all(arr).then(() => {
            let key = currentRoute.matched[currentRoute.matched.length - 1].path;
            myStore.routes[key] = myStore.routes[key] || {};
            myStore.routes[key].name = myStore.images[id].album?.name || '全部图片';
            //myStore.routes[key].cover = myStore.images[id].album?.cover;
        })
    }
}
</script>

<script setup>
import Waterfall from 'components/common/Waterfall.vue'
import { storeToRefs } from 'pinia'
import { useMeta } from 'quasar'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore();
const { images } = storeToRefs(store);

const route = useRoute();
const album = images.value[route.params.id].album ?? { name: '全部图片', description: '相册里所有的图片集' };
const items = computed(() => images.value[route.params.id].items);


useMeta({
    titleTemplate: title => `相册|${ title }`,
    meta: {
        //optional; similar to titleTemplate, but allows templating with other meta properties
        title: { template: (title) => `${ album.name }|${ title }` },
        keywords: { template: (keywords) => `${ keywords }|相册|album|${ album.name }` },
        ogTitle: { template: (title) => `${ album.name }|${ title }` },
        twitterTitle: { template: (title) => `${ album.name }|${ title }` },
    }
});


function onLoad(index, done) {
    if (index <= 1) done();
    const img = images.value[route.params.id];
    if (img.totalCount <= img.itemCount) {
        setTimeout(() => done(true), 3000);
    }
    else {
        store.getImages(img.itemCount, 20, route.params.id).then(() => {
            done();
        })
    }
}
</script>
