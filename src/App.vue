<template>
  <RouterView v-slot="{Component}">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- 主要内容 -->
          <div id="home">
            <component :is="Component"></component>
          </div>
          <!-- 加载中状态 -->
          <template #fallback>
            <div style="z-index: 999999999;position: fixed;width: 100%;height: 100vh;left: 0;top: 0;background-color: #3ae8f8">
              正在加载...
            </div>
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </RouterView>
  <SakuraEffect/>
  <el-config-provider :locale="locale"/>
</template>

<script setup>
import moment from "moment";
import { RouterView } from 'vue-router';
import { inject, ref, watch } from "vue";
import SakuraEffect from "@/components/common/SakuraEffect.vue";
import el_en from "element-plus/es/locale/lang/en";
import el_zh_cn from "element-plus/es/locale/lang/zh-cn";

const {language} = inject('language');

let locale = ref(null);


//显示加载背景
let load = ref(true);
//将 moment 的语言环境设置为中文

let timer = setInterval(() => {
    // 判断文档和所有子资源(图片、音视频等)已完成加载
    if (document.readyState === 'complete') {
        load.value = false;
        //执行方法
        clearInterval(timer);
    }
}, 0);

watch(language, updateLanguage, {immediate: true});

//语言更新时调用
function updateLanguage(new_v) {
    locale.value = (new_v === 'en' ? el_en : el_zh_cn);
    //将 moment 的语言环境设置为中文 https://blog.csdn.net/weixin_44495599/article/details/123701037
    moment.locale(new_v);
}

//可以使用 import.meta.globEager('moment') 导入模块
</script>
