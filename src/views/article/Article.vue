<template>
    <router-view :key="$route.fullPath"/>
    <div v-if="$route.path === '/article'" class="article">
        <div>
            <ArticleItem v-for="(article, index) in articles.slice((currentPage -1)*10, currentPage*10)"
                         :article="article" :large="index % 2 !== 0" :mode="false"/>
        </div>
        <div>
            <el-pagination v-model:current-page="currentPage" :page-size="10" :pager-count="5" :total="articleNumber"
                           background hide-on-single-page layout="prev, pager, next" style="justify-content: center;"
                           @current-change="check"/>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import ArticleItem from "@/components/ArticleItem";

@Options({
    components: {ArticleItem}
})

//文章
export default class Article extends Vue {
    //可以显示的文章集合，与 $store.state.articles 是同一个引用
    articles = [];
    //文章总数量
    articleNumber = 0;
    //当前分页
    currentPage = 1;
    
    created() {
        this.articleNumber = this.$store.state.blogInfo?.articleCount ?? -1;
        this.check();
    }
    
    check() {
        if (this.articles.length === this.articleNumber) {
            return;
        }
        let start = this.currentPage * 10 - 10;
        if (this.articles[start] == null) {
            this.axios.get('/article', {
                params: {start, number: 10, mode: 0}
            }).then(response => {
                for (let e of response.data) {
                    this.articles[start++] = e;
                }
            });
        }
    }
};
</script>

<style lang="stylus">
</style>