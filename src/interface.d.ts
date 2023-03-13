//import axios from "./assets/js/axios";
//import LoadPage from "./components/common/LoadPage.vue";
import SvgIcon from './components/common/SvgIcon.vue';

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        //axios: typeof axios;
        //$http: typeof axios;
    }
    
    export interface GlobalComponents {
        SvgIcon: typeof SvgIcon,
        //'LoadPage': typeof LoadPage,
    }
}
