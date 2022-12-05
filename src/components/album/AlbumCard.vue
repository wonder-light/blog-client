<template>
  <q-card class="tw-relative tw-text-lg tw-text-white tw-cursor-pointer hover:tw--translate-y-2 tw-transition-all" @click="goto">
    <q-img :src="album.cover" class="tw-w-full" fit="cover" loading="lazy">
      <template v-slot:loading>
        <q-spinner class="tw-w-8 tw-h-8" color="primary"/>
      </template>
    </q-img>
    <div class="tw-absolute tw-inset-0 tw-bg-black tw-transition-all tw-opacity-0 hover:tw-opacity-100 hover:tw-bg-opacity-40">
      <div class="tw-absolute tw-inset-x-0 tw-top-0 tw-text-right tw-pt-4 tw-px-4">
        <span>[{{ album.imageCount }}] </span>
        <q-icon name="photo" size="1.4rem"/>
      </div>
      <div class="tw-absolute tw-inset-x-0 tw-bottom-0 tw-text-center tw-pb-4">
        {{ album.name }}
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const props = defineProps({
    //相册
    album: { type: Object, default: null },
});

const { proxy } = getCurrentInstance();

//跳转到相册的文章
function goto() {
    proxy.$router.push(`/album/${ props.album.id }`);
}

</script>
