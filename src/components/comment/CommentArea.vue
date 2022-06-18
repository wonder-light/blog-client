<template>
    <div class="comment-area">
        <div class="comment-area-header">
            <svg class="icon" height="200" p-id="3343" t="1650124420186"
                 version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M523.636364 954.181818c-79.476364 0-158.114909-18.269091-228.305455-52.852363l-136.866909 28.811636a34.885818 34.885818 0 0 1-41.355636-41.332364l23.016727-109.358545C78.824727 704.907636 46.545455 616.843636 46.545455 523.636364 46.545455 286.208 260.561455 93.090909 523.636364 93.090909 786.688 93.090909 1000.727273 286.208 1000.727273 523.636364 1000.727273 761.041455 786.688 954.181818 523.636364 954.181818z m-223.441455-124.462545c5.608727 0 11.194182 1.373091 16.244364 4.002909C379.438545 866.862545 451.095273 884.363636 523.636364 884.363636 748.194909 884.363636 930.909091 722.548364 930.909091 523.636364S748.194909 162.909091 523.636364 162.909091C299.054545 162.909091 116.363636 324.724364 116.363636 523.636364c0 81.547636 30.254545 158.626909 87.528728 222.976 7.377455 8.261818 10.402909 19.549091 8.098909 30.370909l-15.546182 73.821091 96.535273-20.340364c2.397091-0.488727 4.794182-0.744727 7.214545-0.744727z m37.236364-306.082909a46.545455 46.545455 0 1 1-93.090909-0.046546 46.545455 46.545455 0 0 1 93.090909 0.046546z m232.727272 0a46.545455 46.545455 0 1 1-93.090909-0.046546 46.545455 46.545455 0 0 1 93.090909 0.046546z m232.727273 0a46.545455 46.545455 0 1 1-93.090909-0.046546 46.545455 46.545455 0 0 1 93.090909 0.046546z"
                    fill="#797979" p-id="3344">
                </path>
            </svg>
            <span>评论</span>
        </div>
        <div v-if="closeComment">评论已关闭</div>
        <div v-else style="width: 100%">
            <editor v-if="areaId === IdHandle" type="comment" @submit="SubmitComment"/>
            <div class="comment-area-number">{{ commentNumber + ' 条评论' }}</div>
            <div v-if="commentNumber > 0">
                <Comment v-for="p in comments.slice(currentPage*10-10, currentPage*10)" :key="p.id" :comment="p">
                    <div v-if="p.childrenNumber > 0" class="comment-reply-background">
                        <Comment v-for="c in p.children.slice(0, 2)" :key="c.id" :comment="c" :parent="p"/>
                        <el-button v-if="p.childrenNumber > 2" round type="text" @click="SeeMore(p)">
                            查看更多
                        </el-button>
                    </div>
                </Comment>
            </div>
            <div v-else>
                <el-empty description="暂无评论"/>
            </div>
            <!-- 查看更多回复评论 -->
            <el-dialog v-model="showMoreReply" destroy-on-close title="查看评论" top="4vh" width="53.2%">
                <ul class="comment-area-ul">
                    <li>
                        <Comment :comment="selectComment"/>
                    </li>
                    <li v-for="item in selectComment.children" :key="item.id">
                        <Comment :comment="item" :parent="selectComment"/>
                    </li>
                    <el-button v-if="selectComment.childrenNumber !== selectComment.children.length"
                               round type="text" @click="LoadChildrenComment">
                        {{ isLoad ? '加载中...' : '点击查看更多' }}
                    </el-button>
                </ul>
            </el-dialog>
        </div>
        <div>
            <el-pagination v-model:current-page="currentPage" :page-size="10" :pager-count="5" :total="commentNumber"
                           background class="archive-pagination" hide-on-single-page layout="prev, pager, next"
                           @current-change="CurrentChange"/>
        </div>
    </div>
</template>

<script setup>
import Comment from "@/components/comment/Comment.vue";
import Editor from "@/components/Editor.vue";
import { ElMessage } from "element-plus";
import { getCurrentInstance, provide, ref, watch } from "vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";

const props = defineProps({
    //关闭评论
    closeComment: {type: Boolean, default: false},
    //评论目标ID: 0-留言板
    targetId: {type: Number, default: 0},
});

//待显示的评论区ID
let areaId = ref('id12234526152100');
let setAreaId = (id) => areaId.value = id;
provide('areaId', {areaId, setAreaId});

const {proxy} = getCurrentInstance();

//自身ID
let IdHandle = ref(proxy.functions.NewEditorId());
//显示更多的回复评论
let showMoreReply = ref(false);
//加载中
let isLoad = ref(false);
//评论集合
let comments = ref([]);
//评论数量
let commentNumber = ref(-1);
//当前选择查看的父评论
let selectComment = ref(null);
//当前选择的页
let currentPage = ref(1);
//store中的用户
const {user} = storeToRefs(useCounterStore());

areaId.value = IdHandle.value;
watch(areaId, (newId) => {
    if (newId == null || newId.trim().length <= 0) {
        areaId.value = this.IdHandle;
    }
});

if (props.closeComment === false) {
    CurrentChange(1);
}
window.commentArea = {SubmitComment};


//加载子评论
function LoadChildrenComment() {
    let info = selectComment;
    if (info.start === info.childrenNumber) {
        return;
    }
    isLoad = true;
    proxy.axios.get('/comment', {
        params: {start: info.start, number: 20, rootParentId: info.id}
    }).then(response => {
        for (let comment of response.data.comments) {
            info.children[info.start++] = comment;
        }
        isLoad = false;
    }).catch(() => {
        ElMessage({showClose: true, message: '加载失败', center: true, grouping: true, type: 'error'});
        isLoad = false;
    });
}

//分页改变时，加载评论 (父评论)
function CurrentChange(value) {
    if (commentNumber.value === comments.value.length) {
        return;
    }
    let start = value * 10 - 10;
    if (comments.value[start] == null || comments.value[start + 9] == null) {
        proxy.axios.get('/comment', {
            params: {
                start, number: 10, targetId: props.targetId <= 0 ? null : props.targetId
            }
        }).then(response => {
            commentNumber = response.data.count;
            for (let info of response.data.comments) {
                comments.value[start++] = info;
            }
        }).catch(() => {
            ElMessage({showClose: true, message: '评论加载失败', center: true, grouping: true, type: 'error'});
        });
    }
}

//查看更多子评论
function SeeMore(info) {
    selectComment = info;
    if (info.start == null) {
        info.start = 0;
    }
    showMoreReply = true;
    LoadChildrenComment();
}

/*
 * 提交评论, reply == null 则提交父级评论，否则提交子级评论
 * @param reply 评论的回复对象
 * @param root 评论的根级对象
 * @param editorId 编辑器ID
 */
function SubmitComment(editorId, reply = null, root = null) {
    let simpleComment = {
        parentId: reply?.id,
        rootParentId: root?.id,
        targetId: props.targetId <= 0 ? null : props.targetId,
        userId: user.id,
        content: tinymce.get(editorId).getContent(),
    };
    
    proxy.axios.post('/comment', simpleComment).then(response => {
        if (reply == null) {
            comments.value.unshift(response.data);
            commentNumber.value++;
        }
        else {
            root.children.unshift(response.data);
            root.childrenNumber++;
        }
    }).catch(() => {
        ElMessage({showClose: true, message: '网络错误', center: true, grouping: true, type: 'error'});
    });
}

</script>