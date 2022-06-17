<template>
    <div class="guestbook">
        <el-card shadow="hover">
            <div style="display: flex">
                <h1 class="warehouse-title" style="margin: 20px 0 30px">留言</h1>
            </div>
            <el-image :src="env.baseURL + '/files/image/background/mmexport1650128636119.jpg'" fit="cover"/>
            <el-image :src="env.baseURL + '/files/image/background/mmexport1649387413764.jpg'" fit="cover"/>
        </el-card>
        <el-card shadow="hover">
            <comment-area :close-comment="false"/>
        </el-card>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import CommentArea from "@/components/comment/CommentArea";
import Editor from "@/components/Editor";

@Options({
    components: {Editor, CommentArea},
})

//留言板
export default class GuestBook extends Vue {
    
    created() {
    }
    
    mounted() {
    }
}

</script>