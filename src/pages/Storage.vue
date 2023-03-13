<template>
  <div class="w-full">
    <q-carousel v-model="slide" animated arrows autoplay class="tw-my-8 tw-h-auto" infinite navigation>
      <q-carousel-slide class="tw-p-0" v-for="(img, i) in images" :name="i">
        <q-img :ratio="5/3" :src="img" loading="lazy"/>
      </q-carousel-slide>
    </q-carousel>
    <div>
      <div class="tw-flex">
        <svg-icon name="storages" size="4rem"/>
      </div>
      <div class="tw-flex">
        <h1 class="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-red-500 tw-via-blue-500 tw-to-green-500">GitHub</h1>
      </div>
      <Waterfall v-if="github?.length > 0" v-slot="{ item }" :items="github" class="tw-w-full">
        <StorageCard :items="item"/>
      </Waterfall>
    </div>
    <div>
      <div class="tw-flex tw-mt-8">
        <h1 class="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-red-500 tw-via-blue-500 tw-to-green-500">Gitee</h1>
      </div>
      <Waterfall v-if="gitee?.length > 0" v-slot="{ item }" :items="gitee" class="tw-w-full">
        <StorageCard :items="item"/>
      </Waterfall>
    </div>
  </div>
</template>

<!-- 仓库 -->
<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        Loading.show();
        const myStore = useStore(store);
        return myStore.getStorage()
    },
}
</script>

<!-- 仓库 -->
<script setup>
import Waterfall from 'components/common/Waterfall.vue'
import StorageCard from 'components/storage/StorageCard.vue'
import { storeToRefs } from "pinia/dist/pinia";
import { useMeta } from 'quasar'
import { useStore } from "stores/example-store";
import { ref } from "vue";

const store = useStore();
const { github, gitee } = storeToRefs(store);


const slide = ref(0);
const images = store.getRouterData('/storage').imgList

useMeta({
    titleTemplate: title => `仓库|${ title }`,
    meta: {
        //optional; similar to titleTemplate, but allows templating with other meta properties
        title: { template: (title) => `仓库|${ title }` },
        keywords: { template: (keywords) => `${ keywords }|仓库|github|gitee` },
        ogTitle: { template: (title) => `仓库|${ title }` },
        twitterTitle: { template: (title) => `仓库|${ title }` },
    }
});

</script>
