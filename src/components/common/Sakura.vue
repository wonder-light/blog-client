<template>
  <canvas :id="sakuraId" class="tw-fixed tw-inset-0 tw-pointer-events-none z-max"/>
</template>

<!-- 背景特效：樱花跑飘落 -->
<script setup>
import { onMounted, ref } from 'vue';

//背景特效：樱花跑飘落 Id
const sakuraId = ref('id_sakura');

onMounted(sakuraEffect);

//背景特效：樱花跑飘落
function sakuraEffect() {
    const canvas = document.getElementById(sakuraId.value);
    const ctx = canvas.getContext('2d');
    
    //樱花图片
    let img = new Image();
    img.src = '/image/sakura.png'
    let list = [];
    let snowsLen = 40;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 增加一个樱花
    function addSakura() {
        let speedY = Math.random() * 0.8 + 0.8;
        let maxY = speedY * Math.tan(Math.PI / 3);
        let minY = speedY * Math.tan(Math.PI / 6);
        let speedX = Math.random() * (maxY - minY) + minY;
        list.push({
            x: Math.random() * (canvas.width * 3),
            y: -1 * Math.random() * (canvas.height * 0.3),
            r: Math.random() * 0.5,
            s: Math.random() * 0.5 + 0.5,//缩放 [0.5, 1]
            speedX: -speedX,
            speedY: speedY,
        });
    }
    
    // 初始化100个雪花
    for (let i = 0; i < snowsLen; i++) {
        addSakura();
    }
    
    //画樱花
    function drawSakura() {
        // 清除
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let remove = [];
        list.forEach((e, index) => { // 雪花的位置变化
            e.x = e.y >= canvas.height ? e.x : e.x + e.speedX;
            e.y = e.y >= canvas.height ? canvas.height : e.y + e.speedY;
            e.r += 0.02;
            //当一个雪花落地就新增一个雪花
            if (e.y >= canvas.height || e.x <= 0) {
                remove.push(index);
                addSakura();
            }
        });
        remove.forEach(index => {
            list.splice(index, 1);
        });
        list.forEach(e => {
            ctx.save();
            ctx.translate(e.x, e.y);
            ctx.rotate(e.r);
            ctx.drawImage(img, 0, 0, 30 * e.s, 30 * e.s);
            ctx.restore();
        });
        //window.requestAnimationFrame 与 requestAnimationFrame 相同
        window.requestAnimationFrame(drawSakura);
    }
    
    window.requestAnimationFrame(drawSakura);
}
</script>
