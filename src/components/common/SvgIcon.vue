<template>
  <q-icon :name="src"/>
</template>

<!-- SVG组件 -->
<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: String,
    icon: { type: Boolean, default: false },
});

const src = computed(() => props.icon ? name : `svguse:/image/svg-set.svg#${ props.name }`);
</script>
