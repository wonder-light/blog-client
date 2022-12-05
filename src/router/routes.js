const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('pages/Home.vue'),
            },
            {
                path: 'storage',
                component: () => import('pages/Storage.vue'),
            },
            {
                path: 'album',
                component: () => import('pages/album/Album.vue'),
            },
            {
                path: 'album/:id',
                component: () => import('pages/album/Images.vue'),
            },
            {
                path: 'archive',
                component: () => import('pages/Archive.vue'),
            },
            {
                path: 'article',
                component: () => import('pages/article/Article.vue'),
            },
            {
                path: 'article/:id',
                component: () => import('pages/article/ArticleDetail.vue'),
            },
            {
                path: 'about',
                component: () => import('pages/About.vue'),
            },
        ]
    },
    {
        path: '/tool',
        children: [
            {
                path: 'map',
                component: () => import('pages/tool/AMap.vue')
            },
            {
                path: 'weather',
                component: () => import('pages/tool/Weather.vue')
            },
        ],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]


export default routes
