<template>
    <div id="he-plugin-standard"></div>
</template>

<script>
import { Vue } from "vue-class-component";
//https://widget.qweather.com/create-standard?token=d5f19fe95b7f464cbf0d55721cb9a4f7#title
window.WIDGET = {
    "CONFIG": {
        "layout": "2",
        "width": 260,
        "height": 320,
        "background": "1",
        "dataColor": "FFFFFF",
        "key": "e366e0c44ac44637b70c1532d38b47ef"
    }
};
export default class Weather extends Vue {
    
    mounted() {
        let WeatherNode = document.createElement('script');
        WeatherNode.type = "text/javascript";
        WeatherNode.src = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
        document.body.appendChild(WeatherNode);
    }
}
</script>

<style scoped>

</style>