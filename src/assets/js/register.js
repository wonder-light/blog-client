import SvgImg from "@/components/common/SvgImg.vue";
import LoadPage from "@/components/common/LoadPage.vue";
import { computed } from "vue";
import { getBottomToView, scrollBottom } from "@/assets/js/api";

//注册组件
export default {
    install: (app) => {
        app.component('SvgImg', SvgImg);
        app.component('LoadPage', LoadPage);
    
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
                    const dis = (container ? scrollBottom : getBottomToView)(el);
                    if (!triggered) {
                        if (dis >= distance.value) {
                            binding.value();
                            triggered = true;
                        }
                    }
                    else if (dis < distance.value) {
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
