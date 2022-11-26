<template>
  <div></div>
</template>

<!-- 中转路由 -->
<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

let path = proxy.$route.query.path;

proxy.$router.push(path ? path : '/');
</script>