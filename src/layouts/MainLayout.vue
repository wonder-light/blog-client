<template>
  <q-layout view="lhr LpR lfr">
    
    <Sakura/>
    
    <q-header class="tw-border-0 tw-w-full tw-h-screen tw-bg-white" elevated>
      <div class="tw-w-full tw-h-full">
        <q-img :src="routeData.cover" alt="首页背景图" class="tw-h-full tw-w-full" fit="cover" loading="eager" spinner-color="white">
          <template v-slot:error>
            <div class="tw-inset-0 tw-flex tw-justify-center tw-items-center" style="background: rgba(255,255,255,0)">
            </div>
          </template>
        </q-img>
        <div class="tw-absolute tw-inset-0 tw-flex tw-justify-center tw-items-center">
          <div class="tw-animate-text-flashing tw-text-center">
            <h1 class="tw-text-5xl tw-font-sans tw-leading-normal">{{ routeData.name }}</h1>
            <p class="tw-text-2xl tw-leading-loose">{{ sentence }}</p>
          </div>
          <svg-icon class="tw-absolute tw-bottom-2.5 tw-w-7 tw-h-7 tw-text-white/80 tw-animate-bounce tw-cursor-pointer" name="arrow-down"
                    @click="scrollToContent"/>
        </div>
      </div>
      <div class="tw-fixed tw-top-0 tw-left-0">
        <div
          class="tw-cursor-pointer tw-p-2.5 hover:tw-opacity-70 tw-absolute tw-top-5 tw-left-5 tw-flex tw-content-center tw-items-center tw-text-xs tw-border tw-border-solid tw-rounded tw-animate-text-flashing tw-border-current"
          @click="leftDrawerOpen = !leftDrawerOpen">
          <svg-icon class="tw-stroke-0" name="mini-menu"/>
          <span class="tw-uppercase tw-ml-2.5">menu</span>
        </div>
      </div>
    </q-header>
    
    <q-drawer v-model="leftDrawerOpen" behavior="mobile" elevated overlay side="left">
      <HomeAside/>
    </q-drawer>
    
    <q-page-container>
      <q-page-scroller :offset="[20, 120]" :scroll-offset="150" position="bottom-right">
        <svg-icon class="tw-cursor-pointer tw-w-10 tw-h-10 tw-rounded-full hover:tw-bg-gray-200" name="backTop"/>
      </q-page-scroller>
      <div class="tw-max-w-7xl tw-px-16 tw-mx-auto">
        <router-view/>
        <div class="tw-py-8"></div>
      </div>
    </q-page-container>
    
    <q-footer bordered class="tw-border-0">
      <!--q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar-->
    </q-footer>
  
  </q-layout>
</template>

<!-- 页面布局 -->
<script>
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        const arr = [];
        const myStore = useStore(store);
        if (myStore.categories.totalCount <= 0) {
            arr.push(myStore.getCategories(0, 6));
        }
        arr.push(myStore.updateSentence());
        return Promise.all(arr);
    }
}
</script>

<script setup>
import Sakura from 'components/common/Sakura.vue'
import HomeAside from 'components/HomeAside.vue'
import { storeToRefs } from 'pinia'
import { randNumber } from 'src/api/api'
import { useRoute } from 'vue-router'
import { computed, inject, onMounted, onUpdated, ref, watch } from 'vue'
import { Loading, useMeta, Platform } from 'quasar'

const store = useStore();
const { sentence } = storeToRefs(store);
const blogger = inject('blogger');
const route = useRoute();
const leftDrawerOpen = ref(false);
//每页的数据：背景与标题
const routeData = computed(() => store.getRouterData(route.matched.at(-1)?.path))

/** 网页的meta数据 */
const metaData = {
    title: `${ blogger }的小世界`,
    description: '天之涯，地之角，知交半零落，一壶浊酒尽余欢，今宵别梦寒。',
    url: `${ process.env.APP_URL }`,
    image: `${ process.env.APP_URL }favicon.png`,
};
/** 监听路由变化 */
watch(() => route.path, (newValue, oldValue) => {
    //刷新时(oldValue !== undefined)不更新，页面前进后退时更新句子
    store.updateSentence();
}, { immediate: false })

// 需要在 setup()中调用
useMeta({
    // 设置页面 title
    title: metaData.title,
    // 可选的；设置最终的 title 为“Index Page - My Website”,
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => title,
    
    // meta tags
    meta: {
        title: { name: 'title', content: metaData.title },
        author: { name: 'author', content: `${ blogger }` },
        description: { name: 'description', content: metaData.description },
        keywords: { name: 'keywords', content: `${ blogger }|博客|个人博客` },
        url: { name: 'url', content: metaData.url },
        image: { name: 'image', content: metaData.image },
        // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
        ogTitle: { property: 'og:title', content: metaData.title, },
        ogType: { property: 'og:type', content: `website` },
        ogUrl: { property: 'og:url', content: metaData.url },
        ogDescription: { property: 'og:description', content: metaData.description },
        ogImage: { property: 'og:image', content: metaData.image },
        twitterTitle: { property: 'twitter:title', content: metaData.title, },
        twitterDescription: { property: 'twitter:description', content: metaData.description },
        twitterCard: { property: 'twitter:card', content: `summary_large_image` },
        twitterUrl: { property: 'twitter:url', content: metaData.url },
        twitterImage: { property: 'twitter:image', content: metaData.image },
        
        //微信图片显示问题
        referrer: { name: 'referrer', content: 'no-referrer' /* no-referrer, never */ },
    },
    
    // <body> attributes
    bodyAttr: {
        'action-scope': '', // 生成 <body action-scope>
    },
    
    script: {
        //L2Dwidget: { src: 'https://l2dwidget.js.org/lib/L2Dwidget.min.js', type: 'text/javascript'},
        //L2Dwidget0: { src: 'https://l2dwidget.js.org/lib/L2Dwidget.0.min.js', type: 'text/javascript'},
        L2Dwidget: { src: `${ process.env.VUE_ROUTER_BASE }live2d/lib/L2Dwidget.min.js`, type: 'text/javascript' },
        L2Dwidget0: { src: `${ process.env.VUE_ROUTER_BASE }live2d/lib/L2Dwidget.0.min.js`, type: 'text/javascript' },
    }
})

onUpdated(() => Loading.hide());

onMounted(() => {
    function f() {
        if (L2Dwidget) initLive2d();
        else setTimeout(f, 50);
        Loading.hide()
    }
    
    f();
})


//滚动到内容视图
function scrollToContent() {
    let AnimationFrameId = 0;
    let speed = 0.1;
    let top = 0;
    
    //屏幕滚动帧调用
    function scroll() {
        if (top >= window.innerHeight) {
            window.cancelAnimationFrame(AnimationFrameId);
            return;
        }
        top += speed;
        document.documentElement.scrollTop = top;
        AnimationFrameId = window.requestAnimationFrame(scroll);
    }
    
    top = document.documentElement.scrollTop;
    if (top >= window.innerHeight) {
        return;
    }
    speed = (window.innerHeight - top) / 20.0;
    if (speed > 20) speed = 20;
    if (speed < 4) speed = 4;
    //正常情况下每秒调用60次
    AnimationFrameId = window.requestAnimationFrame(scroll);
}

//设置live2d
function initLive2d() {
    const dialogBody = [
        '哎呀！别碰我！',
        '不要动手动脚的！快把手拿开~~',
        '真…真的是不知羞耻！',
        'Hentai！',
        '再摸的话我可要报警了！⌇●﹏●⌇',
        '110吗，这里有个变态一直在摸我(ó﹏ò｡)'
    ];
    const dialogFace = [
        '人家是在认真写博客哦--前端妹子',
        '是…是不小心碰到了吧',
        '萝莉控是什么呀',
        '你看到我的小熊了吗',
        '再摸的话我可要报警了！⌇●﹏●⌇',
        '110吗，这里有个变态一直在摸我(ó﹏ò｡)'
    ];
    /** @type {HTMLElement} */
    let container;
    /** @type {HTMLElement} */
    let dialog;
    /** @type {HTMLElement} */
    let canvas;
    L2Dwidget.on('create-container', /** @param element {HTMLElement} */(element) => container = element)
             .on('create-dialog', /** @param element {HTMLElement} */(element) => {
                 element.style.userSelect = 'none';
                 dialog = element.getElementsByClassName('live2d-widget-dialog')[0]
             })
             .on('create-canvas', /** @param element {HTMLElement} */(element) => {
                 //设置可以接收鼠标指定事件为
                 element.style['pointer-events'] = 'auto';
                 canvas = element;
             })
             .on('tap', dragLive2D)
             .on('tapbody', () => showDialog(dialogBody))
             .on('tapface', () => showDialog(dialogFace))
             .init({
                 model: {
                     //https://unpkg.com/live2d-widget-model-haru@1.0.5/01/assets/haru01.model.json
                     //https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json
                     jsonPath: '/live2d/model/live2d-widget-model-haru/01/assets/haru01.model.json', //主文件路径
                     scale: 1,//模型与canvas的缩放
                 },
                 display: {
                     superSample: 1, // 超采样等级
                     position: 'right', //显示位置：左或右
                     width: 220,// canvas的长度
                     //height: 360,//canvas的高度
                     hOffset: 50,//canvas水平偏移
                     vOffset: 0,//canvas垂直偏移
                 },
        
                 tagMode: false,//标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
                 debug: false,//调试, 是否在控制台输出日志
                 react: {//透明度条件
                     opacityDefault: 0.8,//默认透明度
                     opacityOnHover: 1//鼠标移上透明度
                 },
                 dev: {
                     border: false,//在canvas周围显示边界
                 },
                 mobile: {
                     show: true,//是否在移动设备上显示
                     scale: 1,//移动设备上的缩放
                     motion: true, // 移动设备是否开启重力感应
                 },
                 dialog: {
                     enable: true,//显示人物对话框
                     //hitokoto: true,//使用一言API
                     script: {
                         // 每空闲 10 秒钟，显示一条一言
                         'every idle 10s': '$hitokoto$',
                         'tap body': '哎呀！别碰我！',
                         'tap face': '人家是在认真写博客哦--前端妹子',
                
                     },
                 },
             })
    
    /**
     * 显示对话
     * @param dialogs {Array<string>}
     */
    function showDialog(dialogs = []) {
        const init = dialog.innerText;
        const text = dialogs[randNumber(0, dialogs.length)];
        setTimeout(() => {
            if (text && text !== init) {
                dialog.innerText = text;
            }
        }, 4);
    }
    
    /**
     * @param event {MouseEvent}
     */
    function dragLive2D(event) {
        //拖动的不是画布则返回
        if (event.target !== canvas) return;
        const target = document.documentElement;
        const initClientX = event.clientX;
        const originRight = document.documentElement.offsetWidth - container.offsetWidth; // 最大 right 值
        const initOffsetX = originRight - container.offsetLeft; //初始 right 的值
        //移动端拖拽
        if (Platform.is.mobile) {
            target.addEventListener('touchmove', touchmove, { passive: false });
            target.addEventListener('touchend', touchend, { passive: false });
            
            /**
             * 拖动（手指在触摸屏上移动）
             * @param e {TouchEvent}
             */
            function touchmove(e) {
                move(e.targetTouches[0]);
                e.preventDefault();
            }
            
            /** 触摸结束（手指从触摸屏上移开） */
            function touchend() {
                target.removeEventListener('touchmove', touchmove);
                target.removeEventListener('touchend', touchend);
            }
        }
        else { //PC端拖拽
            //定时器句柄
            const time = setTimeout(hover, 150);
            //鼠标松开事件
            target.addEventListener('mouseup', up);
            
            /** 鼠标按住 */
            function hover() {
                target.addEventListener('mousemove', move);
                //防止拖动过程中页面滚动
                target.style['user-select'] = 'none';
            }
            
            /** 鼠标左键松开 */
            function up() {
                clearTimeout(time);
                target.style['user-select'] = null;
                target.removeEventListener('mousemove', move);
                target.removeEventListener('mouseup', up);
            }
        }
        
        /**
         * 鼠标移动
         * @param e {MouseEvent|Touch}
         */
        function move(e) {
            //只在水平面上移动
            let offset = (initClientX - e.clientX) + initOffsetX;
            offset = offset < 2  //允许的误差范围
                     ? 0
                     : originRight - offset < 2  //允许的误差范围
                       ? originRight
                       : offset;
            container.style.right = offset + 'px';
        }
    }
}
</script>
