import { defineStore } from 'pinia';
import axios from "@/assets/js/axios";

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        //博主信息
        blogger: null,
        //博客信息
        blogInfo: null,
        //游客信息
        tourist: null,
        //需要显示声明类型
        tags: null,
        //分类集合
        types: null,
        //文章集合
        articles: [],
        //简单文章集合
        simpleArticles: [],
        //推荐文章
        recommendArticles: null,
        //相册集合
        albums: null,
        //用户的GitHub存储库
        githubRepository: null,
        //用户的Gitee存储库
        giteeRepository: null,
        //所有评论集合
        commentSet: {},
        //数据的版本信息
        version: {},
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
        }
    },
    actions: {
        //更新博主信息
        async updateBlogger() {
            await axios.get(`/user/simple/1650659236945`).then(response => {
                this.blogger = response.data;
            });
        },
    
        //更新博客信息
        async updateBlogInfo() {
            await axios.get('/blog/info').then(response => {
                this.blogInfo = response.data;
            });
        },
    
        //更新标签信息
        async updateTags() {
            await axios.get('/tag').then(response => {
                this.tags = response.data;
            });
        },
    
        //更新推荐文章
        async updateRecommendArticles() {
            await axios.get('/article/recommend?mode=0').then(response => {
                this.recommendArticles = response.data;
            });
        },
    
        //更新推荐文章
        async updateTypes() {
            await axios.get('/type').then(response => {
                this.types = response.data;
            });
        },
    
        //更新相册
        async updateAlbum() {
            await axios.get('/album').then(response => {
                this.albums = response.data;
            });
        },
    
        //更新用户信息
        async updateTourist(tourist = null) {
            if (tourist) {
                this.tourist = tourist;
                return;
            }
            //通过游客token获取游客信息
            let userId = localStorage.getItem('touristId') ?? '0';
            await axios.get('/user/simple/' + userId).then(response => {
                this.tourist = response.data;
            }).catch(() => {
                this.tourist = {id: 0, name: '', email: '', blog: '', avatar: '', mode: -1};
            });
        },
    
        //设置GitHub仓库
        setGithubRepository(githubRepository) {
            this.githubRepository = githubRepository;
        },
    
        //设置Gitee仓库
        setGiteeRepository(giteeRepository) {
            this.giteeRepository = giteeRepository;
        },
    
        //在对应的位置覆盖"简单文章"
        setSimpleArticles(start, simpleArticles) {
            for (let simpleArticle of simpleArticles) {
                this.simpleArticles[start++] = simpleArticle;
            }
        },
    
        //添加文章
        addArticles(article) {
            let index = this.articles.findIndex(item => item.id === article.id);
            if (index >= 0) {
                this.articles[index] = article;
                return;
            }
            this.articles.push(article);
        },
    
        //设置指定目标ID的评论
        setCommentSet(targetId) {
            this.commentSet[targetId] = {
                comments: [],
                count: -1
            };
        },
    
        //设置指定ID评论集合的数量
        setCommentCount(targetId, count) {
            this.commentSet[targetId].count = count;
        },
    }
});

//设置状态配置
export function setStoreConfig() {
//数据持久化
    const instance = useCounterStore();
    // 1. 获取保存的数据，先判断有无，无则用先前的
    const old = localStorage.getItem('counter-store');
    if (old) {
        //替换状态
        instance.$state = JSON.parse(old);
        instance.githubRepository = null;
        instance.giteeRepository = null;
    }
    // 2. 订阅保存数据
    instance.$subscribe((_, state) => {
        localStorage.setItem('counter-store', JSON.stringify({...state}));
    });
}


//更新数据的版本
export async function updateVersion() {
    const instance = useCounterStore();
    await axios.get('/blog/version').then(response => {
        let newVersion = response.data;
        let oldVersion = instance.version;
        if (!oldVersion || typeof oldVersion !== 'object') {
            instance.$reset();
        }
        else {
            if (oldVersion.blogInfo !== newVersion.blogInfo) {
                instance.blogInfo = null;
            }
            if (oldVersion.album !== newVersion.album) {
                instance.albums = null;
            }
            if (oldVersion.article !== newVersion.article) {
                instance.articles = [];
            }
            if (oldVersion.comment !== newVersion.comment) {
                instance.commentSet = {};
            }
            if (oldVersion.tag !== newVersion.tag) {
                instance.tags = null;
            }
            if (oldVersion.type !== newVersion.type) {
                instance.types = null;
            }
            if (oldVersion.user !== newVersion.user) {
                instance.blogger = null;
                instance.tourist = null;
            }
        }
        instance.version = newVersion;
    }).catch(() => {
    });
}
