<template>
  <div class="leading-10 text-left">
    <span class="font-bold text-black pr-1 cursor-default" @click="openWebPage(user.blog)">{{ user?.name }}</span>
    <span v-if="user?.mode > 0" class="blogger">博主</span>
    <span v-if="target">
        <span class="text-sky-400 px-1"> @ </span>
        <span class="font-bold text-black pr-1 cursor-default" @click="openWebPage(target.blog)"> {{ target?.name }} </span>
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