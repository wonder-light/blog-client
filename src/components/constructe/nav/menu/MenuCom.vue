<template>
  <div class="ml-4 text-gray-400">
    <p class="text-left text-lg leading-loose">组成</p>
    <el-menu :default-active="$route.path" active-text-color="#9ca3af" class="menu-style" menu-trigger="click" text-color="#9ca3af">
      <el-sub-menu v-if="true" index="1">
        <template #title>
          <SvgImg svg-id="classify"/>
          <p>分类</p>
        </template>
        <el-menu-item v-for="type in types" :key="type.id.toString()">
          <div class="w-11/12 flex items-center justify-between">
            <p>{{ type.name }}</p>
            <span class="leading-none py-0.5 px-2 rounded-xl text-white bg-sky-400/80">{{ type.articleNumber }}</span>
          </div>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <SvgImg svg-id="page1"/>
          <p>页面</p>
        </template>
        <el-menu-item index="/about" @click="skip('/about', null)">
          <SvgImg svg-id="about"/>
          <p>关于我</p>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <SvgImg svg-id="link"/>
          <p>链接</p>
        </template>
        <el-menu-item index="3-1" @click="skip('https://space.bilibili.com/522577863?spm_id_from=666.4.0.0')">
          <SvgImg svg-id="bilibili"/>
          <p>哔哩哔哩</p>
        </el-menu-item>
        <el-menu-item index="3-1" @click="skip('https://gitHub.com/wonder-light')">
          <SvgImg svg-id="github"/>
          <p>GitHub</p>
        </el-menu-item>
        <el-menu-item index="3-1" @click="skip('https://gitee.com/wonder-light')">
          <SvgImg svg-id="gitee"/>
          <p>Gitee</p>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<!-- 菜单组成部分 -->
<script setup>
import { openWebPage } from "@/assets/js/api";
import { inject } from "vue";

const store = useCounterStore();
const { types } = storeToRefs(store);
//更新分类
if (!types.value) {
    await store.updateTypes();
}

const animEnd = inject('animEnd');
const closeMenuPanel = inject('closeMenuPanel');

//跳转网页
function skip(url, target = '_blank') {
    if (animEnd.value) {
        closeMenuPanel();
        openWebPage(url, target);
    }
}
</script>