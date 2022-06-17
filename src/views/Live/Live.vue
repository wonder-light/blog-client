<template>
    <div id="Live">
        <router-view v-slot="{ Component }">
            <transition>
                <keep-alive>
                    <component :is="Component"/>
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script>

import { Vue } from "vue-class-component";

export default class Live extends Vue {

}
</script>
