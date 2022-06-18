<template>
    <div></div>
</template>

<script element-loading-text="">
import { useRoute, useRouter } from "vue-router";

let route = useRoute();
let router = useRouter();
let path = route.query.path;
if (path != null) {
    router.push(path);
}
</script>

<style scoped>

</style>