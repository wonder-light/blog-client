<template>
  <q-card class="tw-mt-12 tw-px-8">
    <q-card-section class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-inline-block">
        <q-chip v-for="tag in article.tags" class="tw-bg-gradient-to-r tw-from-emerald-400 tw-to-blue-400" clickable ripple text-color="white">
          {{ tag.name }}
        </q-chip>
      </div>
      <q-chip class="tw-bg-white" clickable text-color="red">
        <svg-icon name="bookmark" size="1rem"/>
        {{ article.category.name }}
      </q-chip>
    </q-card-section>
    <q-card-section class="tw-py-2 tw-flex tw-text-gray-400">
      <span class="tw-mr-2">{{ article.author }}</span>
      <span class="tw-mr-2">{{ date.formatDate(article.updateTime, 'YYYY-MM-DD HH:MM') }}</span>
      <span class="tw-mr-2">{{ '发表于' + article.updateAddress }}</span>
    </q-card-section>
    <q-card-section>
      <q-img :src="article.cover" loading="eager"/>
    </q-card-section>
    <q-separator class="tw-mx-4"/>
    <q-card-section class="tw-py-12">
      <div id="article_content" class="tw-text-left" v-html='article.content.replace(/data-src=("[^"]*")/g, "src=$1")'/>
    </q-card-section>
    <q-card-section class="tw-flex tw-h-48">
      <!-- 上下篇 -->
      <q-img v-if="pre" :src="pre.cover" class="tw-cursor-pointer image-scale" fit="cover" loading="lazy" @click="goto(pre.id)">
        <div class="tw-inset-0 tw-transition-all tw-duration-300 hover:tw-bg-black/10 tw-flex tw-flex-col tw-items-start tw-justify-center"
             style="padding: 0 2rem 0">
          <span>上一篇</span>
          <span>{{ pre.title }}</span>
        </div>
      </q-img>
      <q-img v-if="next" :src="next.cover" class="tw-cursor-pointer image-scale" fit="cover" loading="lazy" @click="goto(next.id)">
        <div class="tw-inset-0 tw-transition-all tw-duration-300 hover:tw-bg-black/10 tw-flex tw-flex-col tw-items-end tw-justify-center"
             style="padding: 0 2rem 0">
          <span>下一篇</span>
          <span>{{ next.title }}</span>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section/>
  </q-card>
</template>

<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store, currentRoute }) {
        Loading.show();
        const myStore = useStore(store);
        const id = currentRoute.params.id;
        const art = myStore.articles[id];
        if (!art?.article) {
            return myStore.updateArticle(id).then(() => {
                let key = currentRoute.matched[currentRoute.matched.length - 1].path;
                myStore.routes[key] = myStore.routes[key] || {};
                myStore.routes[key].name = myStore.articles[id].item?.title || '文章标题';
                //myStore.routes[key].cover = myStore.articles[id].item?.cover;
            })
        }
    }
}
</script>

<script setup>
import { storeToRefs } from 'pinia'
import { date, useMeta } from 'quasar'
import { computed, getCurrentInstance } from 'vue'

const { articles } = storeToRefs(useStore());
const { proxy } = getCurrentInstance();
const article = computed(() => articles.value[proxy.$route.params.id].item);
const pre = computed(() => articles.value[proxy.$route.params.id].pre);
const next = computed(() => articles.value[proxy.$route.params.id].next);
//封面

useMeta({
    titleTemplate: title => `${ article.value.title }|${ title }`,
    meta: {
        //optional; similar to titleTemplate, but allows templating with other meta properties
        title: { template: (title) => `${ article.value.title }|${ title }` },
        keywords: { template: (keywords) => `${ keywords }|文章|article|${ article.value.title }` },
        ogTitle: { template: (title) => `${ article.value.title }|${ title }` },
        twitterTitle: { template: (title) => `${ article.value.title }|${ title }` },
    },
    link: {
        //微信文章需要用到的样式集
        material: { rel: 'stylesheet', href: 'https://res.wx.qq.com/mmbizappmsg/zh_CN/htmledition/js/assets/tencent_portfolio_light.lb4ict1vce5897ad.css' }
    }
});

function goto(id = '') {
    proxy.$router.push(`/article/${ id }`);
}
</script>
