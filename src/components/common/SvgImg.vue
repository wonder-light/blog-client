<template>
  <svg>
    <use :xlink:href="src"/>
  </svg>
</template>

<script setup>
defineProps({
    src: String,
});
</script>