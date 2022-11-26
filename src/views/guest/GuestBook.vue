<template>
  <div class="w-full">
    <el-card class="mb-8" shadow="hover">
      <div style="text-align: center">
        <h1 class="text-gradient text-left overflow-hidden mt-5 mb-8 text-4xl">留言</h1>
      </div>
      <el-image class="image-min-200" fit="cover"
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5c8ba350-827c-4df5-bf3c-d7683c79f8bf/93bac937-9b1e-40b7-b7e3-dcc5a916b07e.jpg"/>
      <el-image class="image-min-200" fit="cover"
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5c8ba350-827c-4df5-bf3c-d7683c79f8bf/16d8d7c8-98ea-4135-b53d-b7597df02dc2.jpg"/>
      <el-image class="image-min-200" fit="cover"
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5c8ba350-827c-4df5-bf3c-d7683c79f8bf/d6e68958-7e43-47e9-9607-feaee65ea01c.jpg"/>
    </el-card>
    <CommentArea v-if="false" :close-comment="false" class="mb-8"/>
  </div>
</template>

<!-- 留言板 -->
<script setup>
import CommentArea from "@/components/details/comment/CommentArea.vue";
//
</script>