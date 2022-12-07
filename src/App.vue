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
        if (process.env.CLIENT && !process.env.DEV) {
            // 参考 https://github.com/theajack/disable-devtool/blob/master/README.cn.md
            import('disable-devtool').then(/*** @param DisableDevtool {IDisableDevtool}*/({ default: DisableDevtool }) => {
                DisableDevtool({
                    disableMenu: true,
                    interval: 100,
                    clearLog: true
                });
            })
        }
    }
})
</script>
