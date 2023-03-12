import { axios } from 'boot/axios';
import { defineStore } from 'pinia';

export const useStore = defineStore({
    id: 'blogStore',
    state: () => ({
        //句子
        sentence: '',
        //路由值
        routeData: {
            '/': {
                name: '随风飞扬',
                cover: 'http://api.nianian.cn/media/get_media/9d619cc5-b6f4-46b6-8fc8-38dfdd40054c'
            },
            '/storage': {
                name: '仓库',
                imgList: [
                    'http://api.nianian.cn/media/get_media/722f8b69-304f-4781-bf0d-3995756a5610',
                    'http://api.nianian.cn/media/get_media/ddd47f6a-9c1a-483f-83d4-29d9e6b98080',
                    'http://api.nianian.cn/media/get_media/5c7196a8-a8be-47d9-9fc6-a1aafe32e356',
                    'http://api.nianian.cn/media/get_media/d2ade549-0803-47dc-84a7-f42851e23b9a',
                    'http://api.nianian.cn/media/get_media/7703e881-60d2-4e22-898f-98540f4d1e37',
                ]
            },
            '/album': { name: '相册' },
            '/album/:id': {},
            '/archive': { name: '归档' },
            '/article': { name: '文章' },
            '/article/:id': {},
            '/about': { name: '关于' },
        },
        //分类集合
        categories: { totalCount: 0, itemCount: 0, items: [] },
        //首页推荐文章
        recArticle: { totalCount: 0, itemCount: 0, items: [] },
        //归档的文章
        upArticle: { totalCount: 0, itemCount: 0, items: [] },
        //文章集
        articles: { totalCount: 0, itemCount: 0, items: [] },
        //文章
        article: {},
        //用户的GitHub存储库
        github: [],
        //用户的Gitee存储库
        gitee: [],
        //相册
        albums: { totalCount: 0, itemCount: 0, items: [] },
        //图片
        images: {},
        //博客的数量信息
        blogCount: { articleCount: 0, categoryCount: 0, tagCount: 0, albumCount: 0 },
        
    }),
    getters: {
        //文章 articleId<=0 : 创建文章， articleId > 0 : 修改文章
        getArticle: state => function (articleId = 0) {
            //返回的对象是一个副本，防止被组件修改
            return state.articles.find(item => item.id === articleId);
        },
        
        //相册
        getAlbum: state => function (albumId = 0) {
            return state.albums.find(item => item.id === albumId);
        },
        
        // 获取对应路由的数据
        getRouterData: state => function (route = '/') {
            const data = state.routeData[route]
            !data.name && (data.name = '随风飞扬')
            !data.cover && (data.cover = 'http://api.nianian.cn/media/get_media/9d619cc5-b6f4-46b6-8fc8-38dfdd40054c')
            return data
        }
    },
    actions: {
        /**
         * 设置对应目标的数据
         * @param target {Object} 目标对象
         * @param data {Object} 数据
         * @param offset {number} 偏移量
         */
        setData(target, data, offset) {
            
            target.totalCount = data.totalCount;
            for (let i = 0; i < data.itemCount; i++) {
                if (data.items[i]) target.items[offset + i] = data.items[i];
            }
            if (!target.items) target.items = [];
            target.itemCount = target.items.length;
        },
        /**
         * 更新句子
         * @return {Promise<void>}
         */
        async updateSentence() {
            //https://v1.hitokoto.cn/?c=b
            const { data } = await axios.get('https://v1.hitokoto.cn')
                                        .catch(() => ({
                                            data: {
                                                hitokoto: '心之所向，素履以往；生如逆旅，一苇以航'
                                            }
                                        }))
            this.sentence = data.hitokoto;
        },
        /**
         * 获取文章的类别
         * @param offset {number} 偏移量
         * @param count {number} 数量
         * @return {Promise<void>}
         */
        async getCategories(offset = 0, count = 20) {
            await axios.get(`/blog/category/list?offset=${ offset }&count=${ count }`).then(({ data }) => {
                this.setData(this.categories, data, offset);
            });
        },
        /**
         * 获取不完整的文章
         * @param offset {number} 偏移量
         * @param count {number} 数量
         * @param sketchy {Boolean} 部分信息
         * @param mode {Number} 0: 推荐, 1: 更新时间, 2: 经典
         * @param inclCateg {Boolean} true: 包括分类
         * @param inclTag {Boolean} true: 包括标签
         * @return {Promise<void>}
         */
        async getArticles(offset = 0, count = 20, sketchy = true, mode = 2, inclCateg = true, inclTag = true) {
            mode = mode < 0 ? 0 : mode > 2 ? 2 : mode;
            const url = `/blog/article/list?offset=${ offset }&count=${ count }&sketchy=${ sketchy }&mode=${ mode }&inclCateg=${ inclCateg }&inclTag=${ inclTag }`;
            await axios.get(url).then(({ data }) => {
                const target = mode === 0 ? this.recArticle : mode === 1 ? this.upArticle : this.articles;
                this.setData(target, data, offset);
            })
        },
        /**
         * 获取目标文章信息
         * @param id {string} 文章Id
         * @param sketchy {Boolean} 部分信息
         * @param pre_next {Boolean} 山下篇
         * @param inclCateg {Boolean} true: 包括分类
         * @param inclTag {Boolean} true: 包括标签
         * @return {Promise<void>}
         */
        async updateArticle(id = '', sketchy = false, pre_next = true, inclCateg = true, inclTag = true) {
            const url = `/blog/article/get/${ id }?sketchy=${ sketchy }&preNext=${ pre_next }&inclCateg=${ inclCateg }&inclTag=${ inclTag }`;
            await axios.get(url).then(({ data }) => {
                this.articles[id] = data;
            })
        },
        /**
         * 获取相册
         * @param offset {number} 偏移量
         * @param count {number} 数量
         * @return {Promise<void>}
         */
        async getAlbums(offset = 0, count = 20) {
            await axios.get(`/blog/album/list?offset=${ offset }&count=${ count }`).then(({ data }) => {
                this.setData(this.albums, data, offset);
            });
        },
        /**
         * 获取目标相册信息
         * @param id {string} 相册Id
         * @return {Promise<void>}
         */
        async updateAlbum(id = '') {
            await axios.get(`/blog/album/get/${ id }`).then(({ data }) => {
                this.images[id] = this.images[id] || {};
                this.images[id].album = data.item
            })
        },
        /**
         * 获取对应相册的图片
         * @param offset {number} 偏移量
         * @param count {number} 数量
         * @param id {string | null} 相册id
         * @return {Promise<void>}
         */
        async getImages(offset = 0, count = 20, id = null) {
            await axios.get(`/media/image/list?offset=${ offset }&count=${ count }&albumId=${ id }&all=${ !id }`)
                       .then(({ data }) => {
                           this.images[id] = this.images[id] || {};
                           this.setData(this.images[id], data, offset);
                       });
        },
        /**
         * 设置GitHub或者Gitee仓库
         * @param props {{baseUrl: String, api: String, params?:Object}} 需要的续借
         * @param name {'github'|'gitee'} 仓库名字
         * @return {Promise<void>}
         */
        async getGitHub(props, name = 'github') {
            let loop = true;
            let currentPage = 1;
            let params = Object.assign({ per_page: 100 }, props.params);
            while (loop) {
                params.page = currentPage;
                await axios({
                    method: 'get',
                    baseURL: props.baseUrl,
                    url: props.api,
                    timeout: 3000,
                    headers: { 'accept': 'application/vnd.github.v3+json' },
                    params,
                }).then(({ data }) => {
                        if (data instanceof Array && data.length > 0) {
                            if (name === 'github') {
                                this.github.push(...data);
                            }
                            else {
                                this.gitee.push(...data);
                            }
                        }
                        else {
                            loop = false;
                        }
                        currentPage += 1;
                    }
                ).catch(() => loop = false);
            }
        },
        /**
         * 获取GitHub与Gitee仓库
         * @return {Promise<Awaited<unknown>[]>}
         */
        async getStorage() {
            const arr = [];
            if (this.github.length <= 0) {
                arr.push(this.getGitHub({ api: '/users/wonder-light/repos', baseUrl: 'https://api.github.com' }));
            }
            if (this.gitee.length <= 0) {
                arr.push(this.getGitHub({
                    api: '/users/wonder-light/repos', baseUrl: 'https://gitee.com/api/v5',
                    params: { access_token: '982da8f1bd7e54ccf7a0cf6970699b61' }
                }, 'gitee'));
            }
            return Promise.all(arr);
        },
        /**
         * 更新博客数量信息
         * @param article {Boolean|null} true: 获取文章数量
         * @param category {Boolean|null} true: 获取分类数量
         * @param tag {Boolean|null} true: 获取标签数量
         * @param album {Boolean|null} true: 获取相册数量
         * @return {Promise<void>}
         */
        async updateBlogCount(article = true, category = true, tag = true, album = true) {
            const url = `/blog/info/count?article=${ article }&category=${ category }&tag=${ tag }&album=${ album }`;
            await axios.get(url).then(({ data }) => {
                this.blogCount = data;
            })
        },
    }
});
