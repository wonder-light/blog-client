<template>
    <div class="archive">
        <el-card shadow="hover">
            <div class="archive-title">文章总览 - {{ articleNumber }}</div>
            <div class="archive-item">
                <div v-for="item in showList"
                     :class="{'archive-year': IsNumber(item), 'archive-info': !IsNumber(item)}">
                    <div v-if="!IsNumber(item)" class="archive-info-main">
                        <el-image :src="item.cover" fit="cover" @click="$router.push(`/article/${item.id}`)"/>
                        <div>
                            <div class="archive-info-date">
                                <el-icon>
                                    <calendar/>
                                </el-icon>
                                <span>{{ require('moment')(item.date).format('Y-M-D') }}</span>
                            </div>
                            <router-link :to="`/article/${item.id}`" class="archive-info-title">
                                {{ item.title }}
                            </router-link>
                        </div>
                    </div>
                    <a v-else class="archive-year-title">{{ item }}</a>
                </div>
            </div>
            <el-pagination :page-size="10" :pager-count="5" :total="articleNumber" class="archive-pagination"
                           hide-on-single-page layout="prev, pager, next" @current-change="CurrentPageChang"/>
        </el-card>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import moment from "moment";
import { Calendar } from "@element-plus/icons-vue";

@Options({
    components: {Calendar}
})

//归档
export default class Archive extends Vue {
    //总文章数
    articles = [];
    //显示的数据
    showList = [];
    //文章总数量
    articleNumber = 0;
    
    created() {
        this.articleNumber = this.$store.state.blogInfo?.articleCount ?? -1;
        this.CurrentPageChang(1);
    }
    
    //当前页面改变时调用
    CurrentPageChang(currentPage) {
        if (this.articles.length === this.articleNumber) {
            return;
        }
        let start = currentPage * 10 - 10;
        if (this.articles[start] == null) {
            this.axios.get('/article', {
                params: {start, number: 10, mode: -1}
            }).then(response => {
                for (let e of response.data) {
                    this.articles[start++] = e;
                }
                this.Remapping(currentPage);
            });
        }
        else {
            this.Remapping(currentPage);
        }
    }
    
    //重映射
    Remapping(currentPage) {
        let year = 0;
        let index = (currentPage - 1) * 10;
        this.showList = [];
        this.articles.slice(index, index + 10)
            .forEach((elem) => {
                let value = moment(elem.date).year();
                if (year !== value) {
                    year = value;
                    this.showList.push(year);
                }
                this.showList.push(elem);
            });
    }
    
    IsNumber = (item) => typeof (item) === 'number';
};
</script>

<style scoped>

</style>