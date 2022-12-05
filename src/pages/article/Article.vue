<template>
  <div v-if="!articles.items || articles.items.length <= 0" class="tw-flex tw-justify-center tw-items-center" style="height: calc(100vh - 4rem)">
    <q-img class="tw-w-80" src="/image/empty.png"/>
  </div>
  <q-card v-else class="tw-mt-4" flat>
    <q-card-section class="tw-flex">
      <svg-icon name="books" size="4rem"/>
    </q-card-section>
    <q-card-section>
      <ArticleCard v-for="(item, I) in items" :article="item" :img-ratio="1.5" :left="I % 2 === 0" class="tw-mb-8" horizontal img-width="44%"/>
    </q-card-section>
    <q-card-section v-if="articles.totalCount > 10">
      <q-pagination
        v-model="page" :max="totalPage" :max-pages="7" direction-links flat gutter="sm" @update:model-value="updatePage"/>
    </q-card-section>
  </q-card>
</template>

<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        Loading.show();
        const myStore = useStore(store);
        if (myStore.articles.totalCount <= 0) {
            return myStore.getArticles(0, 10, true, 2);
        }
    }
}
</script>

<script setup>
import ArticleCard from 'components/article/ArticleCard.vue'
import { storeToRefs } from 'pinia'
import { useMeta } from 'quasar'
import { computed, ref } from 'vue'

const store = useStore();
const { articles } = storeToRefs(store);
//当前页数
const page = ref(1);
//总页数  Math.ceil: 向上取整
const totalPage = computed(() => Math.ceil(articles.value.totalCount / 10));
//每页的项目
const items = computed(() => articles.value.items.slice(page.value * 10 - 10, page.value * 10));

useMeta({
    titleTemplate: title => `文章|${ title }`,
    meta: {
        //optional; similar to titleTemplate, but allows templating with other meta properties
        title: { template: (title) => `文章|${ title }` },
        keywords: { template: (keywords) => `${ keywords }|文章|article` },
        ogTitle: { template: (title) => `文章|${ title }` },
        twitterTitle: { template: (title) => `文章|${ title }` },
    }
});

function updatePage(next) {
    let offset = next * 10 - 10;
    let target_count = articles.value.totalCount - offset;
    let items = articles.value.items.slice(offset, next * 10);
    if (items.length >= target_count) {
        return;
    }
    store.getArticles(offset, 10, true, 2);
}
</script>
