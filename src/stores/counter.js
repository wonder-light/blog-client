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
        user: null,
        //需要显示声明类型
        tags: [],
        //分类集合
        types: [],
        //文章集合
        articles: [],
        //推荐文章
        articleRecommends: [],
        //相册集合
        albums: [],
        //用户的GitHub存储库
        githubRepository: [],
        //用户的Gitee存储库
        giteeRepository: [],
    }),
    getters: {
        //文章 articleId<=0 : 创建文章， articleId > 0 : 修改文章
        getArticle: state => function (articleId = 0, clone = true, recommends = false) {
            if (articleId <= 0) {
                return {
                    type: null, tags: [], up: false, support: false,
                    title: '', description: '', content: null, cover: '',
                };
            }
            else {
                //返回的对象是一个副本，防止被组件修改
                let obj = state.articles.find(item => item.id === articleId);
                if (obj == null) {
                    if (recommends) {
                        obj = state.articleRecommends.find(item => item.id === articleId);
                    }
                    if (obj == null) return null;
                }
                return clone ? Object.create(obj) : obj;
            }
        },
    
        //相册
        getAlbum: state => function (albumId = 0) {
            return state.albums.find(item => item.id === albumId);
        }
    },
    actions: {
        setBlogger(blogger) {
            this.blogger = blogger;
        },
        setBlogInfo(blogInfo) {
            this.blogInfo = blogInfo;
        },
        //设置游客信息
        setUser(tourist) {
            this.user = tourist;
        },
        setTags(tags) {
            this.tags = tags;
        },
        setTypes(types) {
            this.types = types;
        },
        setAlbums(albums) {
            this.albums = albums;
        },
        setArticleRecommends(articleRecommends) {
            this.articleRecommends = articleRecommends;
            for (let article of articleRecommends) {
                let index = this.articles.findIndex(item => item.id === article.id);
                if (index === -1) {
                    this.articles.push(article);
                }
            }
        },
        //添加GitHub仓库
        addGithubRepositoryArray(githubRepository) {
            githubRepository?.forEach((item) => {
                this.githubRepository.push(item);
            });
        },
        //添加Gitee仓库
        addGiteeRepositoryArray(giteeRepository) {
            giteeRepository?.forEach((item) => {
                this.giteeRepository.push(item);
            });
        },
        
        //标签
        addTag(tag) {
            this.tags.push(tag);
        },
        modifyTag(tag) {
            let index = this.tags.findIndex(item => item.id === tag.id);
            if (index !== -1) {
                this.tags[index] = tag;
            }
        },
        deleteTag(tag) {
            let index = this.tags.findIndex(item => item.id === tag.id);
            if (index !== -1) {
                this.tags.splice(index, 1);
            }
        },
        
        //分类
        addType(type) {
            this.types.push(type);
        },
        modifyType(type) {
            let index = this.types.findIndex(item => item.id === type.id);
            if (index !== -1) {
                this.types[index] = type;
            }
        },
        //params:{id:0, deleteAll: true}
        deleteType(params) {
            let id = this.types.findIndex(item => item.id === params.id);
            if (id === -1) {
                return;
            }
            this.types.splice(id, 1);
            let idList = [params.id];
            while (idList.length > 0) {
                id = idList.shift();
                for (let i = 0; i < this.types.length; i++) {
                    let type = this.types[i];
                    if (type.parentId === id) {
                        if (params.deleteAll === false) {
                            type.parentId = 0;
                            continue;
                        }
                        idList.push(type.id);
                        this.types.splice(i, 1);
                        i -= 1;
                    }
                }
            }
        },
        
        //文章
        addArticle(article) {
            let index = this.articles.findIndex(item => item.id === article.id);
            if (index === -1) {
                this.articles.push(article);
            }
            else {
                this.articles[index] = article;
            }
        },
        //添加推荐文章
        addArticleRecommends(articleRecommends) {
            this.articleRecommends.push(articleRecommends);
        },
        //params : { start: 开始插入的索引, articles : 需哟插入的文章 }
        addArticles(params) {
            if (params instanceof Array) {
                for (let article of params) {
                    let index = this.articles.findIndex(item => item.id === article.id);
                    if (index === -1) {
                        this.articles.push(article);
                    }
                    else {
                        this.articles[index] = article;
                    }
                }
                return;
            }
            for (let article of params.articles) {
                this.articles[params.start++] = article;
            }
        },
        modifyArticle(article) {
            let index = this.articles.findIndex(item => item.id === article.id);
            if (index !== -1) {
                this.articles[index] = article;
            }
        },
        deleteArticle(article) {
            let index = this.articles.findIndex(item => item.id === article.id);
            if (index !== -1) {
                this.articles.splice(index, 1);
            }
        },
        
        //相册
        addAlbum(album) {
            this.albums.push(album);
        },
        addAlbumArray(albums) {
            for (let album of albums) {
                this.albums.push(album);
            }
        },
        modifyAlbum(album) {
            let index = this.albums.findIndex(item => item.id === album.id);
            if (index !== -1) {
                this.albums[index] = album;
            }
        },
        deleteAlbum(album) {
            let index = this.albums.findIndex(item => item.id === album.id);
            if (index !== -1) {
                this.albums.splice(index, 1);
            }
        },
        //设置相册的图片集合 params:{id: 相册ID, album: 相册 images: 相册集合}
        setAlbumImages(params) {
            if (params == null) return;
            if (params.images instanceof Array) {
                let album = this.albums.find(item => item.id === params.id);
                if (album == null) {
                    if (params.album != null) {
                        params.album.images = params.images;
                    }
                    return;
                }
                album.images = params.images;
            }
        },
        //添加相册图片 params:{id: 相册ID, url: 图片的URL}
        addAlbumImage(params) {
            if (params?.url == null) return;
            let album = this.albums.find(item => item.id === params.id);
            if (album == null) return;
            if (album.images == null) {
                album.images = [];
            }
            album.images.push(params.url);
            album.number += 1;
        },
        //移除相册图片 params:{id: 相册ID, url: 图片的URL}
        deleteAlbumImage(params) {
            if (params?.url == null) return;
            let album = this.albums.find(item => item.id === params.id);
            if (album == null) return;
            for (let i = 0; i < (album.images ?? []).length; i++) {
                if (album.images[i] === params.url) {
                    album.images.splice(i, 1);
                    album.number -= 1;
                    if (album.number < 0) {
                        album.number = 0;
                    }
                    return;
                }
            }
        },
        
        
        //添加标签到服务器
        async addTagToServer(tag) {
            if (tag == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.post('/tag', tag).then(response => {
                this.addTag(response.data);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        //修改标签并推送到到服务器
        async modifyTagToServer(tag) {
            if (tag == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.put(`/tag/${tag.id}`, tag).then(() => {
                this.modifyTag(tag);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        //删除服务器中的标签
        async deleteTagToServer(tag) {
            if (tag == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.delete(`/tag/${tag.id}`).then(() => {
                this.deleteTag(tag);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        
        
        //添加分类到服务器
        async addTypeToServer(type) {
            if (type == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.post('/type', type).then(response => {
                this.addType(response.data);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        //修改分类并推送到到服务器
        async modifyTypeToServer(type) {
            if (type == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.put(`/type/${type.id}`, type).then(() => {
                this.modifyType(type);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        //删除服务器中的分类 params:{id:0, deleteAll: true}
        async deleteTypeToServer(params) {
            //true: 成功，false: 失败
            if (params?.id == null) return false;
            let state = false;
            await axios.delete(`/type/${params.id}?DeleteAll=${params.deleteAll}`).then(() => {
                this.deleteType(params);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        
        
        //获取指定索引和数量的文章 params:{start: 开始的索引, number: 需要获取的数量}
        async getArticleFromIndex(params) {
            let state = false;
            await axios.get('/article', {
                params: {start: params.start, number: params.number}
            }).then(response => {
                state = true;
                this.addArticles({start: params.start, articles: response.data});
            }).catch(() => state = false);
            return state;
        },
        //添加文章到服务器
        async addArticleToServer(article) {
            if (article == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.post('/article', article).then(response => {
                if (response.data.data != null) {
                    this.addArticle(response.data.data);
                    state = true;
                }
            }).catch(() => state = false);
            return state;
        },
        //修改文章到服务器
        async modifyArticleToServer(article) {
            if (article == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.put(`/article/${article.id}`, article).then(() => {
                this.modifyArticle(article);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        //删除文章到服务器 params:{id:0, deleteAll: true}
        async deleteArticleToServer(article) {
            //true: 成功，false: 失败
            if (article == null) return false;
            let state = false;
            await axios.delete(`/article/${article.id}`).then(() => {
                this.deleteArticle(article);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        
        
        //获取相册图片
        async getAlbumImagesFromServer(album) {
            if (album == null) return false;
            let state = false;
            await axios.get(`/album/${album.id}/images`).then(response => {
                this.setAlbumImages({id: album.id, album, images: response.data ?? []});
                state = true;
            }).catch(() => {
                state = false;
            });
            return state;
        },
        //添加相册
        async addAlbumToServer(album) {
            if (album == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.post('/album', album).then(response => {
                if (response.data.data != null) {
                    this.addAlbum(response.data.data);
                    state = true;
                }
            }).catch(() => state = false);
            return state;
        },
        //修改相册
        async modifyAlbumToServer(album) {
            if (album == null) return false;
            //true: 成功，false: 失败
            let state = false;
            await axios.put(`/album/${album.id}`, album).then(() => {
                this.modifyAlbum(album);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        //删除相册
        async deleteAlbumToServer(album) {
            //true: 成功，false: 失败
            if (album == null) return false;
            let state = false;
            await axios.delete(`/album/${album.id}`).then(() => {
                this.deleteAlbum(album);
                state = true;
            }).catch(() => state = false);
            return state;
        },
        //删除相册的图片 params:{id: 相册ID, url: 图片的url}
        async deleteAlbumImageToServer(params) {
            if (params?.url == null) return false;
            let state = false;
            await axios.delete(`/album/image/${params.id}`, {
                params: {imageName: params.url.split('/').pop()}
            }).then(() => {
                this.deleteAlbumImage(params);
                state = true;
            }).catch(() => {
                state = false;
            });
            return state;
        },
    }
});

//设置状态配置
export function setStoreConfig() {
// 数据持久化
// 1. 保存数据
    const instance = useCounterStore();
    instance.$subscribe((_, state) => {
        localStorage.setItem('counter-store', JSON.stringify({...state}));
    });
// 2. 获取保存的数据，先判断有无，无则用先前的
    const old = localStorage.getItem('counter-store');
    if (old) {
        //instance.$state = JSON.parse(old);
    }
    InitData(instance);
}

async function InitData(instance) {
    if (!instance) return false;
    let isBad = false;
    axios.get(`/user/simple/1650659236945`).then(response => {
        instance.setBlogger(response.data);
    }).catch((e) => {
        //超时 e.code === 'ECONNABORTED'
        if (e.code === 'ECONNABORTED') {
            isBad = true;
        }
    });
    
    if (isBad) return;
    
    //获取博客信息
    axios.get('/blog/info').then(response => {
        instance.setBlogInfo(response.data);
    }).catch(() => isBad = true);
    
    //标签
    axios.get(`/tag`).then(response => {
        instance.setTags(response.data ?? []);
    }).catch(() => isBad = true);
    
    //分类
    axios.get(`/type`).then(response => {
        instance.setTypes(response.data ?? []);
    }).catch(() => isBad = true);
    
    //获取推荐文章信息
    axios.get('/article/recommend').then(response => {
        instance.setArticleRecommends(response.data);
    }).catch(() => isBad = true);
    
    //获取游客信息
    //获取游客token
    let touristId = localStorage.getItem('touristId') ?? '0';
    await axios.get('/user/simple/' + touristId).then(response => {
        instance.setUser(response.data);
    }).catch(() => {
        isBad = true;
        instance.setUser({id: 0, name: '', email: '', blog: '', avatar: '', mode: -1});
    });
}