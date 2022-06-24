<template>
  <svg>
    <use :href="dataSrc"/>
  </svg>
</template>

<!-- SVG组件 -->
<script setup>
import { computed } from "vue";
import svgSet from "@/assets/img/svg-set.svg";

const props = defineProps({
    svgId: String,
    svg: String,
});

let dataSrc = computed(() => svgSet + '#' + props.svgId);
</script>