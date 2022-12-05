<template>
  <div class="tw-fixed tw-inset-0 tw-p-4 tw-bg-blue-500 tw-text-white tw-text-center tw-flex tw-justify-center tw-items-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>
      <div class="tw-text-6xl tw-leading-5 tw-opacity-40">
        页面未找到
      </div>
    </div>
  </div>
</template>

<!-- 404页面 -->
<script setup>
// 需要在 setup()中调用
import { useMeta } from 'quasar'
import { inject } from 'vue'

const blogger = inject('blogger');

const data = {
    title: `404页面不存在`,
    description: '天之涯，地之角，知交半零落，一壶浊酒尽余欢，今宵别梦寒。',
    url: `${ process.env.APP_URL }`,
    image: `${ process.env.APP_URL }favicon.png`,
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
