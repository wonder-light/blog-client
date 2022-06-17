<template>
    <div class="about">
        <el-card shadow="hover">
            <h1 class="about-header">关于我</h1>
            <el-image :src="article?.cover" alt="" fit="cover" style="margin-bottom: 20px"/>
            <div :id="IdHandle" style="text-align: initial"/>
        </el-card>
        <el-card shadow="hover">
            <CommentArea v-if="article != null" :close-comment="article.closeComment" :target-id="article.id"/>
        </el-card>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import CommentArea from "@/components/comment/CommentArea";
import Editor from "@/components/Editor";

@Options({
    components: {Editor, CommentArea}
})

//关于我
export default class About extends Vue {
    //显示的内容ID
    IdHandle = '';
    //文章
    article = null;
    
    beforeCreate() {
        //设置ID
        this.IdHandle = this.functions.NewEditorId();
        
        let baseUrRL = this.env.baseURL;
        this.axios.get('/article/1651294869000').then(response => {
            this.article = response.data;
            if (this.article == null) {
                this.article = {cover: baseUrRL + '/files/image/background/mmexport1650128636119.jpg'};
            }
            else {
                this.SetContent(this.article.content);
            }
        }).catch(() => {
            this.article = {cover: baseUrRL + '/files/image/background/mmexport1650128636119.jpg'};
        });
    }
    
    SetContent(content: string = '') {
        let elem = document.getElementById(this.IdHandle);
        if (elem != null) {
            elem.innerHTML = content;
        }
    }
};
</script>

<style scoped>

</style>