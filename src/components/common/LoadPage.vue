<template>
  <div v-if="inline" :class="className">
    <div v-loading="auto" class="page">
      <slot/>
    </div>
  </div>
  <div v-else :class="className">
    <slot>
      <img alt="加载中..." class="center" src="@/assets/img/loading.gif"/>
    </slot>
  </div>
</template>

<!-- 全局加载页面 -->
<script setup>
import { ref } from "vue";

const props = defineProps({
    inline: {type: Boolean, default: false},
    full: {type: Boolean, default: false},
    auto: {type: Boolean, default: true},
});

const className = ref(props.inline ? 'page-load-inline' : 'page-load fullscreen');

</script>