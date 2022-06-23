import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            //首页
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue'),
            meta: {title: '念的小世界'},
            children: [
                {
                    //仓库
                    path: 'warehouse',
                    name: 'warehouse',
                    component: () => import('@/views/Warehouse.vue'),
                    meta: {title: '仓库'}
                },
                {
                    //相册
                    path: 'album',
                    name: 'album',
                    component: () => import('@/views/album/Album.vue'),
                    children: [
                        {
                            path: ':id',
                            name: 'albumView',
                            component: () => import('@/views/album/AlbumView.vue'),
                            props: (route) => {
                                let albumId = Number(route.params.id);
                                if (isNaN(albumId)) {
                                    albumId = 0;
                                }
                                return {albumId};
                            },
                        },
                    ]
                },
                {
                    //文章
                    path: 'article',
                    name: 'article',
                    component: () => import('@/views/article/Article.vue'),
                    children: [
                        {
                            //文章视图
                            path: ':id',
                            name: 'articleView',
                            component: () => import('@/views/article/ArticleView.vue'),
                        },
                    ]
                },
                {
                    //归档
                    path: 'archive',
                    name: 'archive',
                    component: () => import('@/views/Archive.vue'),
                },
                {
                    //关于我
                    path: 'about',
                    name: 'about',
                    component: () => import('@/views/About.vue'),
                },
                {
                    //留言板
                    path: 'guestbook',
                    name: 'guestbook',
                    component: () => import('@/views/GuestBook.vue'),
                },
            ]
        },
        {
            //中转路由
            path: '/transit',
            name: 'transit',
            component: () => import('@/views/Transit.vue'),
        },
    ],
    //路由滚动
    scrollBehavior(to, from, savedPosition) {
        //浏览器 前进、后退，savedPosition有效。否则无效
        if (savedPosition) {
            return savedPosition;
        }
        else {
            return {top: 0};
        }
    },
});


router.beforeEach((to) => {
    let title = [];
    for (let route of to.matched) {
        if (route.meta.title) {
            title.push(route.meta.title);
        }
    }
    title = title.join(' | ');
    document.title = title;
    return true;
});

export default router;