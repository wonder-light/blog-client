<template>
  <img :alt="alt" :src="src" :style="{height, width}" class="svg-img">
</template>

<script setup>
defineProps({
    alt: String,
    src: String,
    height: String,
    width: String,
});
</script>