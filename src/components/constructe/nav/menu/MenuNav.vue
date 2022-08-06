<template>
  <div class="menu-nav">
    <p>导航</p>
    <el-menu active-text-color="#98a6ad" menu-trigger="click" text-color="#98a6ad" unique-opened>
      <el-menu-item index="1" @click="skip('/')">
        <SvgImg svg-id="home-page"/>
        <p>首页</p>
      </el-menu-item>
      <el-menu-item index="2" @click="skip('/warehouse')">
        <SvgImg svg-id="warehouse"/>
        <p>仓库</p>
      </el-menu-item>
      <el-menu-item index="3" @click="skip('/album')">
        <SvgImg svg-id="album"/>
        <p>相册</p>
      </el-menu-item>
      <el-menu-item index="4">
        <SvgImg svg-id="music"/>
        <p>音乐</p>
      </el-menu-item>
      <el-menu-item index="5" @click="skip('/article')">
        <SvgImg svg-id="article"/>
        <p>文章</p>
      </el-menu-item>
      <el-menu-item index="6" @click="skip('/archive')">
        <SvgImg svg-id="archive"/>
        <p>归档</p>
      </el-menu-item>
      <el-sub-menu index="7">
        <template #title>
          <SvgImg svg-id="about"/>
          <p>关于</p>
        </template>
        <el-menu-item index="7-1" @click="skip('/about')">
          <SvgImg svg-id="about"/>
          <p>关于我</p>
        </el-menu-item>
        <el-menu-item index="7-2" @click="skip('/guestbook')">
          <SvgImg svg-id="guestbook"/>
          <p>留言板</p>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<!-- 菜单导航部分 -->
<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
const { animEnd } = inject('animEnd');
const closeMenuPanel = inject('closeMenuPanel');

function skip(url) {
    if (animEnd.value) {
        router.push(url);
        closeMenuPanel();
    }
}
</script>