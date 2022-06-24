import axios from "./assets/js/axios";
import env from "@/assets/js/env";
import functionLibrary from "@/assets/js/functionLibrary";
import SvgImg from "@/components/common/SvgImg.vue";

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        env: typeof env;
        axios: typeof axios;
        $http: typeof axios;
        functions: functionLibrary;
    }
    
    export interface GlobalComponents {
        'SvgImg': typeof SvgImg,
    }
}