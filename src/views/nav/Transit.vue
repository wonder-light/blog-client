<template>

</template>

<script>
import { Vue } from "vue-class-component";

//中转路由
export default class Transit extends Vue {
    created() {
        let path = this.$route.query.path;
        if (path != null) {
            this.$router.push(path);
        }
    }
};
</script>

<style scoped>

</style>