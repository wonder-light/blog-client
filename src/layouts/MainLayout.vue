<template>
  <q-layout view="lhr LpR lfr">
    
    <Sakura/>
    
    <q-header class="tw-border-0 tw-w-full tw-h-screen tw-bg-white" elevated>
      <div class="tw-w-full tw-h-full">
        <q-img :src="routes[matched].cover || routes['/'].cover" alt="首页背景图" class="tw-h-full tw-w-full" fit="cover" loading="eager" spinner-color="white">
          <template v-slot:error>
            <div class="tw-inset-0 tw-flex tw-justify-center tw-items-center" style="background: rgba(255,255,255,0)">
            </div>
          </template>
        </q-img>
        <div class="tw-absolute tw-inset-0 tw-flex tw-justify-center tw-items-center">
          <div class="tw-animate-text-flashing tw-text-center">
            <h1 class="tw-text-5xl tw-font-sans tw-leading-normal">{{ routes[matched].name }}</h1>
            <p class="tw-text-2xl tw-leading-loose">{{ sentence }}</p>
          </div>
          <svg-icon class="tw-absolute tw-bottom-2.5 tw-w-7 tw-h-7 tw-text-white/80 tw-animate-bounce tw-cursor-pointer" name="arrow-down"
                    @click="scrollToContent"/>
        </div>
      </div>
      <div class="tw-fixed tw-top-0 tw-left-0">
        <div
          class="tw-cursor-pointer tw-p-2.5 hover:tw-opacity-70 tw-absolute tw-top-5 tw-left-5 tw-flex tw-content-center tw-items-center tw-text-xs tw-border tw-border-solid tw-rounded tw-animate-text-flashing tw-border-current"
          @click="leftDrawerOpen = !leftDrawerOpen">
          <svg-icon class="tw-stroke-0" name="mini-menu"/>
          <span class="tw-uppercase tw-ml-2.5">menu</span>
        </div>
      </div>
    </q-header>
    
    <q-drawer v-model="leftDrawerOpen" behavior="mobile" elevated overlay side="left">
      <HomeAside/>
    </q-drawer>
    
    <q-page-container>
      <q-page-scroller :offset="[40, 60]" :scroll-offset="150" position="bottom-right">
        <svg-icon class="tw-cursor-pointer tw-w-10 tw-h-10 tw-rounded-full hover:tw-bg-gray-200" name="backTop"/>
      </q-page-scroller>
      <div class="tw-max-w-6xl tw-mx-auto">
        <router-view/>
        <div class="tw-py-8"></div>
      </div>
    </q-page-container>
    
    <q-footer bordered class="tw-border-0">
      <!--q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar-->
    </q-footer>
  
  </q-layout>
</template>

<!-- 页面布局 -->
<script>
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        const arr = [];
        const myStore = useStore(store);
        if (myStore.categories.totalCount <= 0) {
            arr.push(myStore.getCategories(0, 6));
        }
        arr.push(myStore.updateSentence());
        return Promise.all(arr);
    }
}
</script>

<script setup>
import Sakura from 'components/common/Sakura.vue'
import HomeAside from 'components/HomeAside.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed, inject, onUpdated, ref, watch } from 'vue'
import { Loading, useMeta } from 'quasar'

const store = useStore();
const { sentence, routes } = storeToRefs(store);
const blogger = inject('blogger');
const route = useRoute();
const leftDrawerOpen = ref(false);
const matched = computed(() => route.matched[route.matched.length - 1].path);

const data = {
    title: `${ blogger }的小世界`,
    description: '天之涯，地之角，知交半零落，一壶浊酒尽余欢，今宵别梦寒。',
    url: `${ process.env.APP_URL }`,
    image: `${ process.env.APP_URL }favicon.png`,
};

watch(() => route.path, (newValue, oldValue) => {
    //刷新时(oldValue !== undefined)不更新，页面前进后退时更新句子
    store.updateSentence();
}, { immediate: false })

// 需要在 setup()中调用
useMeta({
    // 设置页面 title
    title: data.title,
    // 可选的；设置最终的 title 为“Index Page - My Website”,
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => title,
    
    // meta tags
    meta: {
        title: { name: 'title', content: data.title },
        author: { name: 'author', content: `${ blogger }` },
        description: { name: 'description', content: data.description },
        keywords: { name: 'keywords', content: `${ blogger }|博客|个人博客` },
        url: { name: 'url', content: data.url },
        image: { name: 'image', content: data.image },
        // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
        ogTitle: { property: 'og:title', content: data.title, },
        ogType: { property: 'og:type', content: `website` },
        ogUrl: { property: 'og:url', content: data.url },
        ogDescription: { property: 'og:description', content: data.description },
        ogImage: { property: 'og:image', content: data.image },
        twitterTitle: { property: 'twitter:title', content: data.title, },
        twitterDescription: { property: 'twitter:description', content: data.description },
        twitterCard: { property: 'twitter:card', content: `summary_large_image` },
        twitterUrl: { property: 'twitter:url', content: data.url },
        twitterImage: { property: 'twitter:image', content: data.image },
        
        //微信图片显示问题
        referrer: { name: 'referrer', content: 'origin' /* no-referrer, never */ },
    },
    
    // <body> attributes
    bodyAttr: {
        'action-scope': '', // 生成 <body action-scope>
    },
})

Loading.hide();
onUpdated(() => Loading.hide());

//滚动到内容视图
function scrollToContent() {
    let AnimationFrameId = 0;
    let speed = 0.1;
    let top = 0;
    
    //屏幕滚动帧调用
    function scroll() {
        if (top >= window.innerHeight) {
            window.cancelAnimationFrame(AnimationFrameId);
            return;
        }
        top += speed;
        document.documentElement.scrollTop = top;
        AnimationFrameId = window.requestAnimationFrame(scroll);
    }
    
    top = document.documentElement.scrollTop;
    if (top >= window.innerHeight) {
        return;
    }
    speed = (window.innerHeight - top) / 20.0;
    if (speed > 20) speed = 20;
    if (speed < 4) speed = 4;
    //正常情况下每秒调用60次
    AnimationFrameId = window.requestAnimationFrame(scroll);
}
</script>
