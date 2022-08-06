<template>
  <HomeNav/>
  <HomeHeader/>
  <div class="relative m-auto mt-8 content-width">
    <HomeMain/>
    <HomeAside/>
  </div>
  <HomeFooter/>
</template>

<!-- 首页 -->
<script setup>
import { updateVersion } from "@/assets/js/api";
import HomeAside from "@/components/constructe/home/HomeAside.vue";
import HomeFooter from "@/components/constructe/home/HomeFooter.vue";
import HomeHeader from "@/components/constructe/home/HomeHeader.vue";
import HomeMain from "@/components/constructe/home/HomeMain.vue";
import HomeNav from "@/components/constructe/nav/HomeNav.vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia/dist/pinia";

//更新数据版本
await updateVersion();

const store = useCounterStore();
const { blogger } = storeToRefs(store);

if (!blogger.value) {
    await store.updateBlogger();
}
</script>