import { createRouter, createWebHistory } from 'vue-router';

const modules = import.meta.glob('../views/**/**.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            //首页
            path: '/',
            name: 'home',
            component: modules['../views/Home.vue'],
            meta: {title: '念的小世界'},
            children: [
                {
                    //仓库
                    path: 'warehouse',
                    name: 'warehouse',
                    component: modules['../views/Warehouse.vue'],
                    meta: {title: '仓库'}
                },
                {
                    //相册
                    path: 'album',
                    name: 'album',
                    component: modules['../views/album/Album.vue'],
                    children: [
                        {
                            path: ':id',
                            name: 'albumView',
                            component: modules['../views/album/AlbumView.vue'],
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
                    component: modules['../views/article/Article.vue'],
                    children: [
                        {
                            //文章视图
                            path: ':id',
                            name: 'articleView',
                            component: modules['../views/article/ArticleView.vue'],
                        },
                    ]
                },
                {
                    //归档
                    path: 'archive',
                    name: 'archive',
                    component: modules['../views/Archive.vue'],
                },
                {
                    //关于我
                    path: 'about',
                    name: 'about',
                    component: modules['../views/About.vue'],
                },
                {
                    //留言板
                    path: 'guestbook',
                    name: 'guestbook',
                    component: modules['../views/GuestBook.vue'],
                },
            ]
        },
        {
            //中转路由
            path: '/transit',
            name: 'transit',
            component: modules['../views/Transit.vue'],
        },
        {
            //错误页面
            path: '/:error*',
            name: 'error',
            component: () => import("@/views/error/404.vue"),
        }
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