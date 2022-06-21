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
    id: {type: [Number, String], default: 0},
});

function OnClick() {
    const id = Number(props.id);
    console.log(id);
    if (isNaN(id) || id <= 0) return;
    router.push(`/article/${id}`);
}
</script>

<style scoped>

</style>