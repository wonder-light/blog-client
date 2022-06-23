import svg_img from "@/components/common/SvgImg.vue";
import LoadPage from "@/components/common/LoadPage.vue";
import { computed } from "vue";

//注册组件
export default {
    install: (app) => {
        app.component('svg-img', svg_img);
        app.component('load-page', LoadPage);
    
        //自定义指令
        //滚动到一定程度时触发加载
        app.directive('scroll', {
            created(el, binding) {
                //触发加载的距离阈值，单位为px
                let distance = binding.dir.distance = computed(() => Number(el.getAttribute('distance')) ?? 0);
                //true: 自身是一个滚动容器
                const container = binding.modifiers.container;
                //已经触发
                let triggered = false;
                binding.dir.scrollLoad = () => {
                    const dis = (container ? scrollBottom : getBottom)(el);
                    if (!triggered) {
                        if (dis <= distance.value) {
                            binding.value();
                            triggered = true;
                        }
                    }
                    else if (dis > distance.value) {
                        triggered = false;
                    }
                };
                (container ? el : document).addEventListener('scroll', binding.dir.scrollLoad);
            },
            unmounted(el, binding) {
                (binding.modifiers.container ? el : document).removeEventListener('scroll', binding.dir.scrollLoad);
            }
        });
    }
};


//获取元素到视口顶部的距离 https://blog.csdn.net/weichangIT/article/details/88185250
//在顶部的下面为正, 上面为负
function getTop(el) {
    let top = 0;
    while (el.offsetParent) {
        top += el.offsetTop;
        el = el.offsetParent;
    }
    return top;
}

//获取元素到视口底部的距离
//在底部的下面为正, 上面为负
function getBottom(el) {
    let top = getTop(el);
    return (top + el.offsetHeight) - (window.innerHeight + document.documentElement.scrollTop);
}

//获取滚动容器中“滚动内容”到容器顶部的距离
//在顶部的下面为正, 上面为负
function scrollTop(el) {
    return el.scrollTop;
}

//获取滚动容器中“滚动内容”到容器底部的距离
//在底部的下面为正, 上面为负
function scrollBottom(el) {
    return el.scrollHeight - el.offsetHeight - el.scrollTop;
}