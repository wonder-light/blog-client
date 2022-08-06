<template>
  <div :class="['page-load', full ? 'fullscreen':'inline']">
    <slot>
      <img alt="加载中..." class="center" src="/image/loading.png"/>
    </slot>
  </div>
</template>

<!-- 全局加载页面 -->
<script setup>
defineProps({
    full: { type: Boolean, default: false },
});
</script>