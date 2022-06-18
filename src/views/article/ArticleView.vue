<template>
    <div class="article-views">
        <el-card class="article-views-header" shadow="hover">
            <h1>{{ article.title }}</h1>
            <div class="article-views-header-up">
                <span>
                    <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                            fill="currentColor">
                        </path>
                    </svg>
                    {{ store.blogger.name }}
                </span>
                <span>
                    <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path
                        d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
                        fill="currentColor"></path>
                    </svg>
                    {{ require("moment")(article.date).format('Y年M月D日') }}
                </span>
                <span>
                    <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
                            fill="currentColor">
                        </path>
                    </svg>
                    {{ article.views + ' 次浏览' }}
                </span>
                <span v-if="false">
                    <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
                            fill="currentColor">
                        </path>
                    </svg>
                    {{ wordNumber + ' 字数' }}
                </span>
                <span>
                    <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
                            fill="currentColor">
                        
                        </path>
                        <path
                            d="M512 499.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
                            fill="currentColor">
                        </path>
                    </svg>
                    {{ article.commentCount + ' 条评论' }}
                </span>
                <span v-if="article.type?.name != null">
                    <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"
                            fill="currentColor">
                        </path>
                    </svg>
                    {{ article.type.name }}
                </span>
            </div>
            <el-collapse v-if="article.tags.length > 0" class="article-views-header-tags">
                <el-collapse-item name="1" title="标签">
                    <span v-for="item in article.tags" :key="item"
                          :style="{'background-color': colors[functions.RandomNumber(0, colors.length-1)]}">
                        {{ item.name }}
                    </span>
                </el-collapse-item>
            </el-collapse>
            <el-image :src="article.cover" alt="" fit="cover"/>
        </el-card>
        <el-card shadow="hover">
            <div :id="IdHandle" style="text-align: initial;padding-bottom: 20px;" v-html="article.content"/>
        </el-card>
        <el-card shadow="hover">
            <article-simple-view v-if="last != null || next != null"
                                 style="height: 180px;margin: 20px auto 30px">
                <article-simple-view-item v-if="last != null" :id="last.id" :src="last.cover">
                    <div class="last-article">
                        <div>上一篇</div>
                        <div>{{ last.title }}</div>
                    </div>
                </article-simple-view-item>
                <article-simple-view-item v-if="next != null" :id="next.id" :src="next.cover">
                    <div class="next-article">
                        <div>下一篇</div>
                        <div>{{ next.title }}</div>
                    </div>
                </article-simple-view-item>
            </article-simple-view>
            <div v-if="articleRecommends.length > 0" class="article-views-recommend">
                <div class="article-views-hierarchic">
                    <svg class="icon" height="200" p-id="6414" t="1650121714448"
                         version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
                            p-id="6415">
                        </path>
                    </svg>
                    <span>相关推荐</span>
                </div>
                <article-simple-view style="height: 200px;margin-top: 15px">
                    <article-simple-view-item v-for="item in articleRecommends" :id="item.id" :key="item"
                                              :src="item.cover">
                        <div class="recommend-article">
                            <div>{{ item.title }}</div>
                        </div>
                    </article-simple-view-item>
                </article-simple-view>
            </div>
        </el-card>
        <el-card shadow="hover">
            <CommentArea v-if="article != null" :close-comment="article.closeComment" :target-id="article.id"/>
        </el-card>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import CommentArea from "@/components/comment/CommentArea.vue";
import ArticleSimpleView from "@/components/articleSimpleView/ArticleSimpleView.vue";
import ArticleSimpleViewItem from "@/components/articleSimpleView/ArticleSimpleViewItem.vue";
import { useCounterStore } from "@/stores/counter";


const store = useCounterStore();
const {proxy} = getCurrentInstance();

//文本内容ID
let IdHandle = ref(proxy.functions.NewEditorId());
//文章
let article = ref(null);
//上一篇
let last = ref(null);
//下一篇
let next = ref(null);
//推荐文章
let articleRecommends = ref([]);
//字数
let wordNumber = ref(0);

let colors = ['#ff5b00', '#e6af00', '#7fbf03', '#0be617', '#00ffc2', '#00abff', '#2428ff', '#f31eff'];


created();

function created() {
    let id = Number(proxy.$route.params.id);
    //获取文章,包括推荐文章
    article.value = store.getArticle(id, false, true);
    //相关推荐
    articleRecommends.value = store.articleRecommends;
    if (article.value == null) {
        //获取没有的文章
        proxy.axios.get('/article/' + id).then(response => {
            article.value = response.data;
            GetLastAndNext();
        }).catch(() => {
            proxy.$router.back();
        });
    }
    else {
        GetLastAndNext();
    }
    if (articleRecommends.value.length <= 0) {
        //获取推荐文章信息
        proxy.axios.get('/article/recommend').then(response => {
            store.setArticleRecommends(response.data);
            articleRecommends.value = response.data;
            RandomSelection();
        });
    }
    else {
        RandomSelection();
    }
}

//获取上一篇和下一篇文章
function GetLastAndNext() {
    if (article.value == null) return;
    store.addArticle(article.value);
    proxy.axios.get(`/article/${article.value.id}/ln`).then(response => {
        last.value = response.data.last;
        next.value = response.data.next;
    });
    //添加文章浏览量
    proxy.axios.post(`/article/${article.value.id}/views`).then(() => {
        article.value.views += 1;
    });
}

//随机选择三个推荐文章
function RandomSelection() {
    let length = articleRecommends.value.length;
    if (length < 3) return;
    let numbers = [];
    while (numbers.length < 3) {
        let v = Math.floor(Math.random() * length);
        if (numbers.includes(v) === false) {
            numbers.push(v);
        }
    }
    articleRecommends.value = numbers.map(T => articleRecommends[T]);
}
</script>

<style scoped>

</style>