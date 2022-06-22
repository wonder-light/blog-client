<template>
  <div class="comment">
    <div :class="['comment-avatar', {'sub': parent}]">
      <el-avatar :alt="comment.member.name" :src="comment.member.avatar" fit="cover" @click="Open"/>
    </div>
    <div class="main">
      <CommentUser :target="parent?.member" :user="comment.member"/>
      <div class="tinymce-content" v-html="comment.content"/>
      <CommentInfo :date="comment.date" :editor-id="IdHandle"/>
      <CommentEditor v-if="areaId === IdHandle" reply @submit="submitComment($event, comment)"/>
      <div v-if="showChild" class="reply">
        <slot :start="page * 10 - 10"/>
        <div v-if="more" class="comment-more">
          <small>共{{ comment.childrenNumber }}条回复</small>
          <small class="view" @click="seeMore">点击查看</small>
        </div>
        <el-pagination v-else-if="pagination" v-model:currentPage="page" :total="comment.childrenNumber" v-bind="v_bind"/>
      </div>
    </div>
  </div>
</template>

<!-- 评论组件 -->
<script setup>
import { computed, getCurrentInstance, inject, ref } from "vue";
import CommentEditor from "@/components/details/comment/CommentEditor.vue";
import CommentUser from "@/components/details/comment/CommentUser.vue";
import CommentInfo from "@/components/details/comment/CommentInfo.vue";

const props = defineProps({
    //评论
    comment: {type: Object, default: null},
    //父评论
    parent: {type: Object, default: null},
});

const proxy = getCurrentInstance().proxy;
//加载评论
const loadComment = inject('loadComment');
//激活的编辑器ID
const {areaId} = inject('areaId');
//提交评论
const submitComment = inject('submitComment');

//自身ID
const IdHandle = ref(proxy.functions.NewEditorId());
//当前页
const page = ref(1);
//分页的绑定对象
const v_bind = {'pager-count': 5, 'hide-on-single-page': true, 'layout': "prev, pager, next", 'small': true};
//显示子评论
const showChild = computed(() => props.comment.children.length > 0);
//更多评论
const more = computed(() => props.comment.childrenNumber > 2 && props.comment.children.length <= 2);
//显示分页
const pagination = computed(() => props.comment.childrenNumber > 2);

//打开博客
function Open() {
    let blog = props.comment?.member?.blog ?? '';
    if (blog.trim().length > 0) {
        window.open(blog, '_blank');
    }
}

//查看更多评论
function seeMore() {
    let start = props.comment.children.length - 1;
    if (start < 0) start = 0;
    let rootId = props.comment.id;
    if (props.comment.rootParentId) {
        rootId = props.comment.rootParentId;
    }
    loadComment(start, null, rootId);
}
</script>