<template>
  <header class="w-full h-screen relative flex flex-col justify-center items-center bg-cover home-background">
    <div>
      <h1 class="text-4xl text-white leading-loose">随风飞扬</h1>
      <p class="text-xl text-white leading-normal">心之所向，素履以往；生如逆旅，一苇以航</p>
    </div>
    <SvgImg class="absolute bottom-2.5 w-7 h-7 text-white/80 animate-bounce cursor-pointer" svg-id="arrow-down" @click="scrollToContent"/>
  </header>
</template>

<!-- 首页头部 -->
<script setup>

let AnimationFrameId = 0;
let speed = 0.1;
let top = 0;

function scroll() {
    if (top >= window.innerHeight) {
        window.cancelAnimationFrame(AnimationFrameId);
        return;
    }
    top += speed;
    document.documentElement.scrollTop = top;
    AnimationFrameId = window.requestAnimationFrame(scroll);
}

//滚动到内容视图
function scrollToContent() {
    top = document.documentElement.scrollTop;
    if (top >= window.innerHeight) {
        return;
    }
    speed = (window.innerHeight - top) / 20.0;
    if (speed > 20) speed = 20;
    if (speed < 4) speed = 4;
    //正常情况下每秒调用60次
    AnimationFrameId = window.requestAnimationFrame(scroll);
}
</script>
