<template>
  <div class="comment-user">
    <span class="user-name" @click="openWebPage(user.blog)">{{ user?.name }}</span>
    <span v-if="user?.mode > 0" class="blogger">博主</span>
    <span v-if="target">
        <span class="user-reply"> @ </span>
        <span class="user-name" @click="openWebPage(target.blog)"> {{ target?.name }} </span>
        <span v-if="target.mode > 0" class="blogger">博主</span>
    </span>
  </div>
</template>

<script setup>
import { openWebPage } from "@/assets/js/api";

defineProps({
    user: { type: Object, default: () => ({}) },
    target: { type: Object, default: null },
});

</script>