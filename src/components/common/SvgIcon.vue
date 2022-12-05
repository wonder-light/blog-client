<template>
  <q-icon :name="src"/>
</template>

<!-- SVG组件 -->
<script setup>
import svgSet from "/image/svg-set.svg";
import { computed } from "vue";

const props = defineProps({
    name: String,
    icon: { type: Boolean, default: false },
});

const src = computed(() => props.icon ? name : `svguse:${ svgSet }#${ props.name }`);
</script>
.
