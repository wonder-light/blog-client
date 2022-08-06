<template>
  <div class="comment-info">
    <small>
      {{ getNearestDate(date) }}
    </small>
    <small class="reply" @click="setAreaId(editorId)">回复</small>
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
