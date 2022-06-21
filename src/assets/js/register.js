import svg_img from "@/components/common/SvgImg.vue";

//注册组件
export default {
    install: (app) => {
        app.component('svg_img', svg_img);
    }
};
