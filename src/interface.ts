import axios from "./assets/js/axios";
import env from "@/assets/js/env";
import functionLibrary from "@/assets/js/functionLibrary";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        env: typeof env;
        axios: typeof axios;
        $http: typeof axios;
        functions: functionLibrary;
    }
}