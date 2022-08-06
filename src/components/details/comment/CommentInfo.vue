<template>
  <div class="flex">
    <small class="text-gray-400 mr-2.5">
      {{ getNearestDate(date) }}
    </small>
    <small class="text-gray-400 mr-2.5 cursor-pointer py-0.5 px-2 rounded-xl hover:text-sky-400 hover:bg-gray-200" @click="setAreaId(editorId)">回复</small>
  </div>
</template>

<script setup>
import { getNearestDate } from "@/assets/js/api";
import { inject } from "vue";

defineProps({
    date: [Date, String, Number, Object],
    editorId: String,
});

//激活的编辑器ID
const { setAreaId } = inject('areaId');
</script>
