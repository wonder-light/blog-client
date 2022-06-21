<template>
  <div id="he-plugin-standard"></div>
</template>

<script setup>
//https://widget.qweather.com/create-standard?token=d5f19fe95b7f464cbf0d55721cb9a4f7#title
import { onMounted } from "vue";

//true: 横版
let horizontal = window.innerWidth <= 1060;

window.WIDGET = {
    "CONFIG": {
        "layout": horizontal ? "1" : "2",
        "width": horizontal ? 450 : 260,
        "height": horizontal ? 220 : 320,
        "background": "1",
        "dataColor": "FFFFFF",
        "borderRadius": "10",
        "key": window.innerWidth <= 1060 ? "1173a33d567340cbadbe69c90fcb51b2"/*横版*/ : "e366e0c44ac44637b70c1532d38b47ef"/*竖版*/
    }
};

onMounted(() => {
    create();
    setStyle();
});

function create() {
    let WeatherNode = document.createElement('script');
    WeatherNode.type = "text/javascript";
    WeatherNode.src = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
    document.body.appendChild(WeatherNode);
}


function setStyle() {
    let he = document.getElementById('he-plugin-standard');
    //没有子节点就继续定时
    if (he.children.length <= 0) {
        setTimeout(setStyle, 50);
        return;
    }
    //相等时就是加载完成时
    if (he.style.width !== window.WIDGET.CONFIG.width + 'px') {
        setTimeout(setStyle, 50);
    }
    he.style.width = '100%';
}
</script>

<style scoped>

</style>