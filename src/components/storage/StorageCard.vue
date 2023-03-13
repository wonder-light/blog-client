<template>
  <q-card :style="{'background-color': color}" class="tw-w-full tw-text-center tw-px-7">
    <q-card-section class="tw-text-center">
      <h1 class="tw-leading-normal tw-text-white tw-break-words">{{ items.name }}</h1>
    </q-card-section>
    <q-card-section class="tw-pb-2">
      <div class="tw-text-stone-300">
        <span class="tw-inline-flex tw-items-center">
          <svg-icon class="tw-w-4 tw-h-4 tw-stroke-0 tw-mr-1" name="star"/>
          <span class="tw-mr-1">{{ items.stargazers_count + ' star / ' }}</span>
        </span>
        <span class="tw-inline-flex tw-items-center">
          <svg-icon class="tw-w-4 tw-h-4 tw-stroke-0 tw-mr-1" name="fork"/>
          <span class="tw-mr-1">{{ items.forks_count + ' fork / ' }}</span>
        </span>
        <span class="tw-inline-flex tw-items-center">
          <svg-icon class="tw-w-4 tw-h-4 tw-stroke-0 tw-mr-1" name="views"/>
          <span class="tw-mr-1">{{ items.watchers_count + ' watch' }}</span>
        </span>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="tw-py-2">
        <p class="tw-leading-normal tw-text-base tw-text-stone-100 tw-break-words">
          {{ items.description ?? '暂无介绍' }}
        </p>
      </div>
    </q-card-section>
    <q-card-section>
      <div style="width: 100%">
      <span class="tw-flex tw-items-center tw-justify-start tw-mb-2">
        <svg-icon class="tw-w-4 tw-h-4 tw-mr-1.5 tw-text-stone-300" name="date-out"/>
        <span class="tw-text-stone-300 tw-text-sm">{{ date.formatDate(items.updated_at, 'YYYY-MM-DD') }}</span>
      </span>
        <q-btn class="tw-text-gray-600 tw-text-gray-200" ripple rounded unelevated @click="openURL(items.html_url)">
          <svg-icon class="tw-mr-1.5" name="click"/>
          <p>访问</p>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<!-- 仓库卡片 -->
<script setup>
import { date, openURL } from 'quasar'
import { randNumber } from 'src/api/api';

defineProps({
    //存储库
    items: { type: Object, default: null },
});

//卡片颜色
let colors = [
    '#2a9dc9', '#ca4905', '#ad8609',
    '#1bab65', '#5ca603', '#16c397',
    '#0e87c0', '#3e5abb', '#b300be',
];

const color = colors[randNumber(0, colors.length - 1)];
</script>
