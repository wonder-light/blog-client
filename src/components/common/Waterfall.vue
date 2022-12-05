<template>
  <div :class="`tw-grid tw-items-start`" :style="col_gap">
    <div v-for="(group, key) in groups" :key="key" :style="row_gap" class="tw-grid">
      <div v-for="item in group" :key="item.id" class="tw-w-full">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<!--瀑布流-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
    col: { type: Number, default: 3 },
    gap: { type: Number, default: 8 },
    items: { type: Array, default: [] },
})

const col_gap = computed(() => `grid-template-columns: repeat(${ props.col }, minmax(0, 1fr));gap: ${ props.gap / 4 }rem;`);
const row_gap = computed(() => `gap: ${ props.gap / 4 }rem;`);
const groups = computed(() => props.items?.group((T, I) => I % props.col));
</script>
