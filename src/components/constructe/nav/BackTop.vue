<template>
  <el-backtop :bottom="bottom" :right="40" :visibility-height="height">
    <svg-img style="width: 100%; height: 100%;" svg-id="backTop"/>
  </el-backtop>
</template>

<!-- 回到首页 back top -->
<script setup>
import { onUnmounted, ref } from "vue";

let minBottom = 200;
let bottom = ref(Math.min(minBottom, window.innerHeight / 2));
let height = ref(window.innerHeight * 0.8);

window.addEventListener('resize', onresize);
onUnmounted(() => window.removeEventListener('resize', onresize));

function onresize() {
    bottom.value = Math.min(minBottom, window.innerHeight / 2);
    height.value = window.innerHeight * 0.8;
}
</script>