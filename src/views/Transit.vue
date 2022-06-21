<template>
    <div></div>
</template>

<!-- 中转路由 -->
<script setup>
import { useRoute, useRouter } from "vue-router";

let route = useRoute();
let router = useRouter();
let path = route.query.path;
if (path != null) {
    router.push(path);
}
</script>