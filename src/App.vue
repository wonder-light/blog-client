<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    preFetch() {
        const store = useStore();
    },
    beforeCreate() {
        Loading.setDefaults({
            spinnerSize: 64,
            customClass: 'tw-bg-indigo-400',
            message: '加载中'
        });
    }
})
</script>
