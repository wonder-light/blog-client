<template>
    <div class="user-background"/>
    <!-- 居中 -->
    <div class="user-center">
        <router-view/>
    </div>
</template>

<script>
import { Vue } from "vue-class-component";

export default class User extends Vue {
};
</script>

<style scoped>

</style>