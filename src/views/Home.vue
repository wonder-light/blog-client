<template>
  <HomeNav/>
  <HomeHeader/>
  <div class="home-layout">
    <HomeMain/>
    <HomeAside/>
  </div>
  <HomeFooter/>
</template>

<!-- 首页 -->
<script setup>
import HomeNav from "@/components/constructe/nav/HomeNav.vue";
import HomeHeader from "@/components/constructe/home/HomeHeader.vue";
import HomeMain from "@/components/constructe/home/HomeMain.vue";
import HomeFooter from "@/components/constructe/home/HomeFooter.vue";
import HomeAside from "@/components/constructe/home/HomeAside.vue";</script>