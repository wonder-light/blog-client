<template>
  <div :class="['w-full z-50 grid justify-center content-center page-load', full ? 'fixed top-0 left-0 h-screen' : 'h-56']">
    <slot>
      <img :class="['m-auto animate-load', full ? 'w-40 h-40' : 'w-16 h-16']" alt="加载中..." src="/image/loading.png"/>
    </slot>
  </div>
</template>

<!-- 全局加载页面 -->
<script setup>
defineProps({
    full: { type: Boolean, default: false },
});
</script>