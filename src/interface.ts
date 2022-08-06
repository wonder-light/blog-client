import env from "@/assets/js/env";
import LoadPage from "@/components/common/LoadPage.vue";
import SvgImg from "@/components/common/SvgImg.vue";
import axios from "./assets/js/axios";

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