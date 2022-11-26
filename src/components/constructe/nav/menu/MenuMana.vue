<template>
  <div class="sticky left-0 bottom-0 w-full flex py-2 bg-white items-center justify-evenly">
    <el-tooltip content="搜索" effect="customized" placement="top">
      <SvgImg :class="svgClass" svg-id="search"/>
    </el-tooltip>
    <el-tooltip v-if="false" content="登陆" effect="customized" placement="top">
      <SvgImg :class="svgClass" svg-id="user"/>
    </el-tooltip>
    <el-tooltip v-if="false" content="退出登陆" effect="customized" placement="top">
      <SvgImg :class="svgClass" svg-id="logout"/>
    </el-tooltip>
  </div>
</template>

<!-- 菜单管理部分 -->
<script setup>
const svgClass = 'h-4 w-4 transition-all cursor-pointer text-gray-400 hover:text-sky-400';
</script>