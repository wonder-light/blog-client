<template>
  <svg>
    <use :href="dataSrc"/>
  </svg>
</template>

<!-- SVG组件 -->
<script setup>
import svgSet from "/image/svg-set.svg";
import { computed } from "vue";

const props = defineProps({
    svgId: String,
    svg: String,
});

let dataSrc = computed(() => svgSet + '#' + props.svgId);
</script>