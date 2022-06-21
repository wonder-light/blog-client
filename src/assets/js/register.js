import svg_img from "@/components/common/SvgImg.vue";
import LoadPage from "@/components/common/LoadPage.vue";

//注册组件
export default {
    install: (app) => {
        app.component('svg_img', svg_img);
        app.component('load-page', LoadPage);
    }
};
