<template>
  <div class="guestbook">
    <el-card shadow="hover">
      <div style="text-align: left">
        <h1 class="guestbook-title">留言</h1>
      </div>
      <el-image :src="env.serverUrl + '/files/image/background/mmexport1650128636119.jpg'" fit="cover"/>
      <el-image :src="env.serverUrl + '/files/image/background/mmexport1649387413764.jpg'" fit="cover"/>
    </el-card>
    <CommentArea :close-comment="false"/>
  </div>
</template>

<!-- 留言板 -->
<script setup>
import CommentArea from "@/components/details/comment/CommentArea.vue";
//
</script>