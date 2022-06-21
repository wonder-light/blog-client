<template>
  <div class="comment-user">
    <span class="user-name" @click="Open(user.blog)">{{ user?.name }}</span>
    <span v-if="user?.mode > 0" class="blogger">博主</span>
    <span v-if="target != null">
        <span class="user-reply"> @ </span>
        <span class="user-name" @click="Open(target.blog)"> {{ target?.name }} </span>
        <span v-if="target?.mode > 0" class="blogger">博主</span>
      </span>
  </div>
</template>

<script setup>
defineProps({
    user: {type: Object, default: () => ({})},
    target: {type: Object, default: null},
});

//打开博客
function Open(blog) {
    if (blog && blog.trim().length > 0) {
        window.open(blog, '_blank');
    }
}
</script>