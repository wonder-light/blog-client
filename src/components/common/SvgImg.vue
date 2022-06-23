<template>
  <svg>
    <use :href="dataSrc"/>
  </svg>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    src: Function,
});

let dataSrc = ref('');

dataSrc.value = await props.src().then(module => {
    return module.default + '#id-svg';
});

</script>