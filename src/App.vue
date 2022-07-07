<template>
  <RouterView v-slot="{Component}">
    <template v-if="Component">
      <!-- 为'加载状态'与'显示状态'提供过渡动画 -->
      <Transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="in-out">
        <KeepAlive>
          <Suspense>
            <!-- 主要内容 -->
            <!-- Component为undefined时Suspense组件的工作方式会变得不正常 -->
            <template #default>
              <div id="home">
                <component :is="Component"></component>
              </div>
            </template>
            <!-- 加载中状态 -->
            <template #fallback>
              <LoadPage full/>
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
    <template v-else>
      <LoadPage full/>
    </template>
  </RouterView>
  <SakuraEffect/>
  <el-config-provider :locale="locale"/>
</template>

<script setup>
import moment from "moment";
import { RouterView } from 'vue-router';
import { inject, ref, watch } from "vue";
import SakuraEffect from "@/components/common/SakuraEffect.vue";

const {language} = inject('language');
//element-plus的语言
const locale = ref(null);
//监听language的变化
watch(language, updateLanguage, {immediate: true});

//语言更新时调用
function updateLanguage(newValue) {
    newValue = 'en';
    let promise = () => import(`../node_modules/element-plus/es/locale/lang/${newValue}`);
    promise().then(module => locale.value = module.default);
    //将 moment 的语言环境设置为中文 https://blog.csdn.net/weixin_44495599/article/details/123701037
    moment.locale(newValue);
}
</script>
