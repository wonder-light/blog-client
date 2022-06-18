import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            //首页
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/Home.vue'),
            children: [
                {
                    //仓库
                    path: '/warehouse',
                    name: 'warehouse',
                    component: () => import('@/views/warehouse/Warehouse.vue'),
                },
                {
                    //相册
                    path: '/album',
                    name: 'album',
                    component: () => import('@/views/album/Album.vue'),
                    children: [
                        {
                            path: '/album/:id',
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
                    path: '/article',
                    name: 'article',
                    component: () => import('@/views/article/Article.vue'),
                    children: [
                        {
                            //文章视图
                            path: '/article/:id',
                            name: 'articleView',
                            component: () => import('@/views/article/ArticleView.vue'),
                        },
                    ]
                },
                {
                    //归档
                    path: '/archive',
                    name: 'archive',
                    component: () => import('@/views/archive/Archive.vue'),
                },
                {
                    //关于我
                    path: '/about',
                    name: 'about',
                    component: () => import('@/views/AboutView.vue'),
                },
                {
                    //留言板
                    path: '/guestbook',
                    name: 'guestbook',
                    component: () => import('@/views/guestbook/GuestBook.vue'),
                },
            ]
        },
        {
            //用户界面
            path: '/user',
            name: 'user',
            component: () => import('@/views/user/User.vue'),
            children: [
                {
                    //登陆界面
                    path: '/user/login',
                    name: 'login',
                    component: () => import('@/views/user/Login.vue'),
                },
                {
                    //注册界面
                    path: '/user/register',
                    name: 'register',
                    component: () => import('@/views/user/Register.vue'),
                },
            ]
        },
        {
            //中转路由
            path: '/transit',
            name: 'transit',
            component: () => import('@/views/nav/Transit.vue'),
        },
    ]
});


router.beforeEach(() => {
    return true;
});

export default router;