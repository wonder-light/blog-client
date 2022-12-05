<template>
  <q-card class="tw-text-sm tw-relative">
    <q-card-section :horizontal="horizontal" class="tw-p-0">
      <ImgNode v-if="left"/>
      <CardMain/>
      <ImgNode v-if="!left"/>
    </q-card-section>
  </q-card>
</template>

<script lang="jsx" setup>
import SvgIcon from 'components/common/SvgIcon.vue'
import { date, QCard, QCardSection, QImg, QSeparator } from 'quasar'
import { randColor } from "src/api/api";
import { computed, getCurrentInstance } from "vue";

const props = defineProps({
    //文章
    article: { type: Object, default: null },
    //水平布局
    horizontal: { type: Boolean, default: false },
    //图片在左边
    left: { type: Boolean, default: true },
    //图片宽度
    imgWidth: { type: String, default: '100%' },
    //图片比例
    imgRatio: { type: [Number, String], default: 8 / 7 },
});

const { proxy } = getCurrentInstance();
const cover = computed(() => props.article.cover ?? 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5c8ba350-827c-4df5-bf3c-d7683c79f8bf/d6e68958-7e43-47e9-9607-feaee65ea01c.jpg');
const tagStyle = getColor();


//图片
const ImgNode = computed(() => <QImg ratio={ props.imgRatio } src={ cover.value } style={ { width: props.imgWidth } } class="tw-cursor-pointer"
                                     fit="cover" img-class="hover:tw-scale-110 tw-transition-all" loading="lazy" onClick={ goto }>
    { { error: () => <div className="tw-inset-0 tw-bg-gray-500"></div> } }
</QImg>);

//分类
const category = computed(() => !props.article.category ? null : <div className="tw-flex tw-items-center">
    <SvgIcon class="tw-w-4 tw-h-4" name="bookmark"/>
    <span className="tw-ml-1">{ props.article.category.name }</span>
</div>);
//标签
const tags = computed(() => props.article.tags.length <= 0 ? null : <div>
    <QSeparator class="tw-my-4"/>
    <div className="flex flex-wrap tw-text-xs">
        { props.article.tags.map(tag => <a style={ tagStyle } className="tw-inline-block tw-mr-2 tw-py-0.5 tw-px-2.5 tw-rounded-xl">{ tag.name }</a>) }
    </div>
</div>);

//内容
const CardMain = computed(() => <QCardSection class={ ['tw-relative tw-grid tw-items-center tw-text-left', props.horizontal ? 'tw-py-0 tw-px-8' : 'tw-p-0'] }
                                              style={ { width: props.horizontal ? `calc(100% - ${ props.imgWidth })` : '100%' } }>
    <QCardSection class="tw-pb-2">
        <div className="tw-text-left tw-text-xl tw-cursor-pointer" onClick={ goto }>{ props.article.title }</div>
    </QCardSection>
    <QCardSection class="tw-py-2">
        <div className="tw-text-left tw-line-clamp-3 tw-whitespace-pre-wrap tw-overflow-ellipsis tw-overflow-hidden">
            { props.article.excerpt.replace(/[\r]/g, "") }
        </div>
    </QCardSection>
    <QCardSection class="tw-pt-2">
        <div className="tw-flex tw-items-center tw-content-center tw-justify-between">
            <div className="tw-inline-block">
                <SvgIcon class="tw-w-4 tw-h-4" name="date-color"/>
                <span className="tw-ml-1">{ date.formatDate(props.article.updateTime, 'YYYY年MM月DD日') }</span>
            </div>
            { category.value }
        </div>
        { tags.value }
    </QCardSection>
</QCardSection>);

//跳转到对应的文章
function goto() {
    proxy.$router.push(`/article/${ props.article.id }`);
}

//颜色
function getColor() {
    let color = randColor(0x580E0E);
    return ({
        'color': color,
        'background-color': color + '30'
    });
}
</script>
