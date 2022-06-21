<template>
  <div class="comment-info">
    <small>
      {{ functions.GetNearestDate(date) }}
    </small>
    <small @click="setAreaId(editorId)">回复</small>
  </div>
</template>

<script setup>
import { inject } from "vue";

defineProps({
    date: [Date, String, Number, Object],
    editorId: String,
});

//激活的编辑器ID
const {setAreaId} = inject('areaId');
</script>
