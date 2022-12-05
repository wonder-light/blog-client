<template>
  <div :id="mapId" class="tw-w-screen tw-h-screen tw-p-0"></div>
</template>

<!-- 高德地图 -->
<script setup>
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';

const mapId = ref('id_a_map_container');
//地图 (使用 shallowRef 进行非深度监听)
const map = shallowRef(null);


onMounted(async () => {
    const AMapLoader = await import('@amap/amap-jsapi-loader');
    await AMapLoader.load({
        key: process.env.A_MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''], // 需要使用的的插件列表，如比例尺 AMap.Scale 等
        viewMode: '3D', // 地图模式
        terrain: true, // 开启地形图
    }).then(AMap => {
        const m = map.value = new AMap.Map(mapId.value, {
            showIndoorMap: true, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
            dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
            keyboardEnable: false, //地图是否可通过键盘控制，默认为true
            doubleClickZoom: true, // 地图是否可通过双击鼠标放大地图，默认为true
            zoomEnable: true, //地图是否可缩放，默认值为true
            rotateEnable: true, // 地图是否可旋转，3D视图默认为true，2D视图默认false
            pitchEnable: true,
            //设置地图容器id
            viewMode: '3D', //是否为3D地图模式
            zoom: 17, //初始化地图级别
            pitch: 50,
            center: [116.333926, 39.997245], //初始化地图中心点位置 - 北京
            features: ['bg', 'road', 'building', 'point'], //地图显示要素
        });
        m.plugin([
            'AMap.ToolBar',
            'AMap.Scale',
            'AMap.MapType',
            'AMap.ControlBar',
            'AMap.Geolocation'
        ], function () {
            //异步同时加载多个插件
            m.addControl(new AMap.ToolBar({
                position: 'RB',
                offset: [20, 60],
            }));
            m.addControl(new AMap.Scale());
            m.addControl(new AMap.MapType());
            m.addControl(new AMap.ControlBar());
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：5s
                position: 'RB', //定位按钮的停靠位置
                offset: [18, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
                zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
            });
            m.addControl(geolocation);
            geolocation.getCurrentPosition(onComplete, onError);
        });
    }).catch(e => {
        console.log(e);
    });
});

onUnmounted(() => map.value?.destroy());

function onComplete(data) {
    // data是具体的定位信息
}

function onError(data) {
    // 定位出错
}
</script>
