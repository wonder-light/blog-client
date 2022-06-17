<template>
    <div class="article-simple-view-item" @click="OnClick">
        <el-image :src="src" alt="" fit="cover"/>
        <div class="article-simple-view-item-content">
            <slot/>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

let router = useRouter();
let props = defineProps({
    src: {type: String, default: ''},
    id: {type: Number, default: 0},
});

function OnClick() {
    if (props.id <= 0) return;
    router.push(`/article/${props.id}`);
}
</script>

<style scoped>

</style>