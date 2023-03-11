<template>
  <div class="tw-fixed tw-inset-0 tw-w-full tw-h-screen tw-flex tw-content-center tw-justify-center">
    <img :src="url" alt="404"/>
  </div>
</template>

<!-- 404页面 -->
<script setup>
// 需要在 setup()中调用
import { useMeta } from 'quasar'
import { inject } from 'vue'

const props = defineProps({ code: [Number, String] })
const blogger = inject('blogger');
const url = `/image/${ props.code ?? 404 }.svg`;

const data = {
    title: `404页面不存在`,
    description: '天之涯，地之角，知交半零落，一壶浊酒尽余欢，今宵别梦寒。',
    url: `${ process.env.APP_URL }`,
    image: `${ process.env.APP_URL }/favicon.png`,
};

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
    },
    
    // <body> attributes
    bodyAttr: {
        'action-scope': '', // 生成 <body action-scope>
    },
})
</script>
