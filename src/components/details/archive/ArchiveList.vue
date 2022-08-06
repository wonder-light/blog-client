<template>
  <div class="ml-3 mb-3">
    <div class="relative text-left pl-5 text-3xl leading-loose before:content-circle after:content-line after:!h-2/4"
         style="--circle-radius: 10px;">{{ title }}
    </div>
    <div class="relative grid gap-6 pt-4 after:content-line">
      <div v-for="item in items" :key="item" :class="['relative pl-5 before:content-circle', {'before:!border-orange-600': item.year}]">
        <div v-if="!item.year" class="flex items-center">
          <div class="relative p-10 mr-2.5">
            <el-image :alt="item.title" :src="item.cover" class="!absolute inset-0 image-scale" fit="cover" @click="skipView(item.id)"/>
          </div>
          <div>
            <div class="flex items-center text-sm text-neutral-500">
              <SvgImg svg-id="date"/>
              <span class="ml-1.5">{{ moment(item.date).format('Y-M-D') }}</span>
            </div>
            <a class="flex text-base text-black decoration-0 transition-right hover:text-blue-500" @click="skipView(item.id)">{{ item.title }}</a>
          </div>
        </div>
        <a v-else class="block text-2xl text-left">{{ item.year }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { computed } from "vue";
import { useRouter } from "vue-router";

let props = defineProps({
    title: { type: String, default: '文章总览' },
    //从前往后，时间从大到小
    origins: { type: Array, default: () => [] },
});

const router = useRouter();

//显示的数据
let items = computed(() => {
    let year = 0;
    let origins = [];
    props.origins.forEach((origin) => {
        let y = moment(origin.date).year();
        if (year !== y) {
            year = y;
            origins.push({ year });
        }
        origins.push(origin);
    });
    return origins;
});

//跳转到视图
function skipView(id) {
    router.push(`/article/${ id }`);
}
</script>