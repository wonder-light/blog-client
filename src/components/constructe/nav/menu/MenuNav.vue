<template>
  <div class="menu-nav">
    <p>导航</p>
    <el-menu active-text-color="#98a6ad" menu-trigger="click" text-color="#98a6ad" unique-opened>
      <el-menu-item index="1" @click="skip('/')">
        <svg fill="none" height="16px" stroke="currentColor"
             stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
             width="16px" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <p>首页</p>
      </el-menu-item>
      <el-menu-item index="2" @click="skip('/warehouse')">
        <svg fill="none" height="16px" stroke="currentColor"
             stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
             width="16px" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
          </path>
        </svg>
        <p>仓库</p>
      </el-menu-item>
      <el-menu-item index="3" @click="skip('/album')">
        <svg fill="none" height="16px" stroke="currentColor"
             stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
             width="16px" xmlns="http://www.w3.org/2000/svg">
          <rect height="18" rx="2" ry="2" width="18" x="3" y="3"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <p>相册</p>
      </el-menu-item>
      <el-menu-item index="4">
        <svg class="icon" height="200" p-id="3943" t="1649931785957"
             version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M951.195857 793.868669 951.195857 107.301841c0-23.847128-14.686491-43.225477-39.304168-43.225477L374.844224 64.076364c-24.949228 0-47.865147 19.763113-47.865147 43.225477l0 591.558987c-22.512736-28.092825-64.692395-45.542242-107.262956-45.542242-84.609003 0-152.599514 68.832691-152.599514 153.442718s69.254294 153.442718 153.863297 153.442718 152.047951-68.832691 152.047951-153.442718c0-4.351098 8.18645-8.630564-2.046612-12.891611L370.981243 272.830829l537.235754 0 0 426.028976c-22.512736-28.092825-64.866357-45.542242-107.437941-45.542242-84.609003 0-152.686495 68.832691-152.686495 153.442718s69.210291 153.442718 153.820318 153.442718 151.688771-68.832691 151.688771-153.442718C953.60165 802.409183 962.452225 798.130739 951.195857 793.868669zM221.401506 916.362514c-60.430324 0-109.60121-49.170886-109.60121-109.60121s47.485501-109.60121 107.915825-109.60121c56.459896 0 107.262956 42.929742 107.262956 97.852632l0 4.780887c0 1.623987 1.889023 3.195785 2.224668 4.718465 0.014326 0.756223 0.956791 1.489934 0.956791 2.249227C330.160535 867.191628 281.832853 916.362514 221.401506 916.362514zM370.981243 228.828662 370.981243 109.346407c10.233062-0.031722 0.511653-0.042979 0.747014-0.042979l536.488741 0.107447 0 119.41881L370.981243 228.829685zM802.290479 916.362514c-60.430324 0-109.60121-49.170886-109.60121-109.60121s47.659463-109.60121 108.09081-109.60121c56.459896 0 107.437941 42.929742 107.437941 97.852632l0 15.741519c0 1.01819 1.677199 1.991354 1.810229 2.972705C906.404722 870.909299 860.370269 916.362514 802.290479 916.362514z"
            fill="currentColor" p-id="3944" stroke-width="28"></path>
        </svg>
        <p>音乐</p>
      </el-menu-item>
      <el-menu-item index="5" @click="skip('/article')">
        <svg class="icon" height="200" p-id="12315" t="1649931908159"
             version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M930.36339 92.946902c-18.975167-18.975167-44.166919-29.426193-70.939679-29.426193l-736.175689 0.468674-0.12689 148.804071H64.021106v51.27685h59.057047l-0.106424 125.070531H64.021106v51.27685h58.908668l-0.107448 124.746142H64.021106v51.27685h58.757218l-0.106424 125.07053H64.019059v51.276851h58.607816l-0.141216 165.513637 736.941122-0.687661c55.338353 0 100.359732-45.02138 100.359732-100.359732V163.881464c0-26.767644-10.44898-51.959396-29.423123-70.934562z m-20.675902 70.936609v693.371814c0 27.713178-22.545482 50.258661-50.260707 50.258661l-73.241095 0.019442V113.658619L859.427804 113.62178c27.713178 0 50.259684 22.547529 50.259684 50.261731zM170.417321 741.511207l0.23536-125.07053h66.537416v-51.27685h-66.440201l0.236383-124.746142h66.204841v-51.27685h-66.10865l0.236384-125.070531h65.87022v-51.27685h-65.775053l0.186242-98.825796 564.484352-0.283456v793.863553l-565.982472 0.150426 0.218987-114.910123h66.86999V741.511207h-66.773799z"
            fill="currentColor" p-id="12316" stroke-width="28"></path>
        </svg>
        <p>文章</p>
      </el-menu-item>
      <el-menu-item index="6" @click="skip('/archive')">
        <svg fill="none" height="16px" stroke="currentColor"
             stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
             width="16px" xmlns="http://www.w3.org/2000/svg">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect height="5" width="22" x="1" y="3"></rect>
          <line x1="10" x2="14" y1="12" y2="12"></line>
        </svg>
        <p>归档</p>
      </el-menu-item>
      <el-sub-menu index="7">
        <template #title>
          <svg fill="none" height="16px"
               stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
               stroke-width="2" viewBox="0 0 24 24" width="16px"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" x2="6" y1="1" y2="4"></line>
            <line x1="10" x2="10" y1="1" y2="4"></line>
            <line x1="14" x2="14" y1="1" y2="4"></line>
          </svg>
          <p>关于</p>
        </template>
        <el-menu-item index="7-1" @click="skip('/about')">
          <svg fill="none" height="16px"
               stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
               stroke-width="2" viewBox="0 0 24 24" width="16px"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" x2="6" y1="1" y2="4"></line>
            <line x1="10" x2="10" y1="1" y2="4"></line>
            <line x1="14" x2="14" y1="1" y2="4"></line>
          </svg>
          <p>关于我</p>
        </el-menu-item>
        <el-menu-item index="7-2" @click="skip('/guestbook')">
          <svg fill="none" height="16px" stroke="currentColor"
               stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
               width="16px" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
          </svg>
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
const {animEnd} = inject('animEnd');
const closeMenuPanel = inject('closeMenuPanel');

function skip(url) {
    if (animEnd.value) {
        router.push(url);
        closeMenuPanel();
    }
}
</script>