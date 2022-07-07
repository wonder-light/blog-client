<template>
  <div class="menu-nav">
    <p>组成</p>
    <el-menu active-text-color="#98a6ad" menu-trigger="click" text-color="#98a6ad" unique-opened>
      <el-sub-menu index="1">
        <template #title>
          <SvgImg svg-id="classify1"/>
          <p>分类</p>
        </template>
        <el-menu-item v-for="type in types" :key="type.id.toString()">
          <div class="side-pane-types">
            <p>{{ type.name }}</p>
            <span>{{ type.articleNumber }}</span>
          </div>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <SvgImg svg-id="page1"/>
          <p>页面</p>
        </template>
        <el-menu-item index="2-1" @click="skip('/about', null)">
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
          <SvgImg svg-id="gitHub"/>
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
import { inject } from "vue";
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";
import { openWebPage } from "@/assets/js/api";

const store = useCounterStore();
const {types} = storeToRefs(store);

const {animEnd} = inject('animEnd');
const closeMenuPanel = inject('closeMenuPanel');

//更新分类
if (!types.value) {
    await store.updateTypes();
}

//跳转网页
function skip(url, target = '_blank') {
    if (animEnd.value) {
        closeMenuPanel();
        openWebPage(url, target);
    }
}
</script>