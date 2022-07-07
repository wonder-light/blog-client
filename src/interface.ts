import axios from "./assets/js/axios";
import env from "@/assets/js/env";
import SvgImg from "@/components/common/SvgImg.vue";
import LoadPage from "@/components/common/LoadPage.vue";

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        env: typeof env;
        axios: typeof axios;
        $http: typeof axios;
    }
    
    export interface GlobalComponents {
        'SvgImg': typeof SvgImg,
        'LoadPage': typeof LoadPage,
    }
}