<template>
  <el-card shadow="hover">
    <div v-if="closeComment">评论已关闭</div>
    <div v-else class="comment-area">
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
      <CommentEditor v-if="areaId === IdHandle" @submit="submitComment($event.target.value, null)"/>
      <div class="comment-area-main">
        <div class="comment-number">{{ rootNumber + ' 条评论' }}</div>
        <div v-if="rootNumber <= 0">
          <el-empty description="暂无评论"/>
        </div>
        <div v-else class="comment-list">
          <Comment v-for="parent in comments" :key="parent.id" :comment="parent">
            <template v-slot="{start}">
              <Comment v-for="child in parent.children.slice(start, start + 10)" :key="child.id" :comment="child" :parent="parent"/>
            </template>
          </Comment>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { getCurrentInstance, provide, ref } from "vue";
import Comment from "@/components/details/comment/Comment.vue";
import CommentEditor from "@/components/details/comment/CommentEditor.vue";
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";
import { ElMessage } from "element-plus";

const props = defineProps({
    //关闭评论
    closeComment: {type: Boolean, default: false},
    //评论目标ID: 0-留言板
    targetId: {type: Number, default: 0},
});

const {proxy} = getCurrentInstance();
const {user} = storeToRefs(useCounterStore());

//自身ID
const IdHandle = ref(proxy.functions.NewEditorId());
//待显示的评论区ID
const areaId = ref(IdHandle.value);
//评论集合
const comments = ref([]);
//根级评论的数量
const rootNumber = ref(-1);
//每次加载的数量
const loadNumber = 10;

provide('areaId', {areaId, setAreaId});
provide('submitComment', submitComment);

function setAreaId(newId) {
    if (newId && newId.trim().length > 0) {
        areaId.value = newId;
    }
    else {
        areaId.value = IdHandle.value;
    }
}

await loadComment(0, props.targetId);

//加载评论 (父评论, 子评论)
async function loadComment(start, targetId, rootParentId) {
    //子评论加载优先
    let sub = [];
    let params = {start, number: loadNumber};
    let parent = comments.value.find(item => item.id === rootParentId);
    //根级评论有效
    if (parent) {
        params.rootParentId = rootParentId;
        //对应的子评论数组
        sub = parent.children.slice(start, start + loadNumber);
    }
    else if (rootNumber.value <= 0 && rootNumber.value === comments.value.length) {
        //根级评论没有需要获取的必要
        return;
    }
    else {
        //对应的子评论数组
        sub = comments.value.slice(start, start + loadNumber);
        params.targetId = targetId <= 0 ? null : targetId;
    }
    sub.length = loadNumber;
    //全部有效则不需要更新
    if (!sub.includes(undefined)) {
        return;
    }
    await proxy.axios.get('/comment', {params}).then(response => {
        //子评论
        if (parent) {
            parent.childrenNumber = response.data.count;
            for (let info of response.data.comments) {
                parent.children[start++] = info;
            }
        }
        //根评论
        else {
            rootNumber.value = response.data.count;
            for (let info of response.data.comments) {
                comments.value[start++] = info;
            }
        }
    }).catch(() => {
        ElMessage({showClose: true, message: '评论加载失败', center: true, grouping: true, type: 'error'});
    });
}

/*
 * 提交评论, parent == null 则提交父级评论，否则提交子级评论
 * @param editorId 编辑器ID
 * @param parent 父对象评论，即回复的评论对象
 */
async function submitComment(editorId, parent = null) {
    let simpleComment = {
        parentId: parent?.id,
        targetId: props.targetId <= 0 ? null : props.targetId,
        userId: user.id,
        content: tinymce.get(editorId).getContent(),
    };
    
    await proxy.axios.post('/comment', simpleComment).then(response => {
        if (parent == null) {
            comments.value.unshift(response.data);
            rootNumber.value++;
        }
        else {
            let root;
            if (parent.rootParentId) {
                root = comments.value.find(item => item.id === parent.rootParentId);
            }
            else {
                root = parent;
            }
            root.children.unshift(response.data);
            root.childrenNumber++;
        }
    }).catch(() => {
        ElMessage({showClose: true, message: '网络错误', center: true, grouping: true, type: 'error'});
    });
}

provide('loadComment', loadComment);
</script>