<template>
  <Card class="article-card">
    <div class="article-card-header" @click="skipToView">
      <el-image :alt="article.title" :src="article.cover" fit="cover" @error="errorClass"/>
      <p :class="imgClass">{{ article.title }}</p>
    </div>
    <div class="article-card-bottom">
      <p>{{ article.description }}</p>
      <div class="article-card-time">
        <span>
          <SvgImg svg-id="date-color"/>
        </span>
        <span>{{ moment(article.date).format('Y年M月D日') }}</span>
      </div>
      <el-divider/>
      <div class="article-card-type">
        <a v-if="article.type" :style="tagStyle">
          {{ article.type.name }}
        </a>
      </div>
    </div>
  </Card>
</template>

<script setup>
import moment from "moment";
import Card from "@/components/common/Card.vue";
import { getCurrentInstance, ref } from "vue";
import { randomColor } from "@/assets/js/api";

const props = defineProps({
    //文章
    article: {type: Object, default: null},
});

const proxy = getCurrentInstance().proxy;

const imgClass = ref(['title']);

const tagStyle = getColor();

function getColor() {
    let color = randomColor(0x580E0E);
    return ({
        'color': color,
        'background-color': color + '30'
    });
}

function errorClass() {
    imgClass.value.push('error');
}

//跳转到对应的文章
function skipToView() {
    if (props.article != null) {
        proxy.$router.push(`/article/${props.article.id}`);
    }
}
</script>