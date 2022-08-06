<template>
  <div class="w-full">
    <el-card class="mb-8" shadow="hover">
      <div style="text-align: left">
        <h1 class="text-gradient text-left overflow-hidden mt-5 mb-8">留言</h1>
      </div>
      <el-image :src="env.serverUrl + '/files/image/background/mmexport1650128636119.jpg'" class="image-min-200" fit="cover"/>
      <el-image :src="env.serverUrl + '/files/image/background/mmexport1649387413764.jpg'" class="image-min-200" fit="cover"/>
    </el-card>
    <CommentArea :close-comment="false" class="mb-8"/>
  </div>
</template>

<!-- 留言板 -->
<script setup>
import CommentArea from "@/components/details/comment/CommentArea.vue";
//
</script>