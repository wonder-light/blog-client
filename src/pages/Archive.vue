<template>
  <div v-if="!upArticle.items || upArticle.items.length <= 0" class="tw-flex tw-justify-center tw-items-center" style="height: calc(100vh - 4rem)">
    <q-img class="tw-w-80" src="/image/empty.png"/>
  </div>
  <q-infinite-scroll v-else :offset="100" class="tw-pt-8" @load="onLoad">
    <q-timeline layout="loose" color="secondary">
      <q-timeline-entry v-for="(item, I) in groups" :side="I % 2 === 0 ? 'left' : 'right'">
        <div v-if="item.heading" class="tw-text-4xl">
          <span v-if="item.type === 'Y'" class="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-red-500 tw-via-blue-500 tw-to-green-500">
            {{ item.title }}
          </span>
          <span v-else-if="item.type === 'M'" class="tw-text-3xl tw-text-blue-500">{{ item.title }}</span>
          <span v-else class="tw-text-2xl tw-text-yellow-500">{{ item.title }}</span>
        </div>
        <div v-else :class="['tw-w-full', 'tw-flex', {'tw-justify-end': I % 2 === 0}]">
          <ArticleCard :article="item" class="tw-w-96 tw-mb-4"/>
        </div>
      </q-timeline-entry>
    </q-timeline>
    <template v-slot:loading>
      <div class="tw-mt-8">
        <q-spinner :thickness="3" class="tw-w-8 tw-h-8" color="primary"/>
      </div>
    </template>
  </q-infinite-scroll>
</template>

<!-- 归档 -->
<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        Loading.show();
        const myStore = useStore(store);
        if (myStore.upArticle.itemCount <= 0) {
            return myStore.getArticles(0, 10, true, 1);
        }
    }
}
</script>

<script setup>
import ArticleCard from 'components/article/ArticleCard.vue'
import { storeToRefs } from 'pinia'
import { useQuasar, date, useMeta } from 'quasar'
import { computed } from 'vue'

const store = useStore();
const $q = useQuasar()
const { upArticle } = storeToRefs(store);
const groups = computed(() => {
    let target = {};
    for (let item of upArticle.value.items) {
        let [y, m, d] = date.formatDate(item.updateTime, 'YYYY-MM-DD').split('-');
        let t = target[y] = target[y] || {};
        t = t[m] = t[m] || {};
        t = t[d] = t[d] || [];
        t.push(item);
    }
    let items = [];
    for (let y of Object.keys(target)) {
        let item = [];
        item.push({ heading: true, type: 'Y', title: y + '年' });
        for (let m of Object.keys(target[y])) {
            item.push({ heading: true, type: 'M', title: m + '月' });
            for (let d of Object.keys(target[y][m])) {
                item.push({ heading: true, type: 'D', title: d + '日' });
                item.push(...target[y][m][d]);
            }
        }
        items.push(...item);
    }
    return items;
});


useMeta({
    titleTemplate: title => `归档|${ title }`,
    meta: {
        //optional; similar to titleTemplate, but allows templating with other meta properties
        title: { template: (title) => `归档|${ title }` },
        keywords: { template: (keywords) => `${ keywords }|归档|archive` },
        ogTitle: { template: (title) => `归档|${ title }` },
        twitterTitle: { template: (title) => `归档|${ title }` },
    }
});


function onLoad(index, done) {
    if (index <= 1) done();
    if (upArticle.value.totalCount <= upArticle.value.itemCount) {
        setTimeout(() => done(true), 3000);
    }
    else {
        store.getArticles(upArticle.value.itemCount, 10, true, 1).then(() => {
            done();
        })
    }
}
</script>
