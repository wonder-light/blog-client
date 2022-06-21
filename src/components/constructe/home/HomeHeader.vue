<template>
  <header class="home-header">
    <div class="content">
      <h1>随风飞扬</h1>
      <p>心之所向，素履以往；生如逆旅，一苇以航</p>
    </div>
    <svg class="down" height="100%" viewBox="0 0 32 32" width="100%" @click="scrollToContent">
      <path
        d="M15.992 25.304c-0 0-0 0-0.001 0-0.516 0-0.981-0.216-1.31-0.563l-0.001-0.001-14.187-14.996c-0.306-0.323-0.494-0.76-0.494-1.241 0-0.998 0.809-1.807 1.807-1.807 0.517 0 0.983 0.217 1.313 0.565l0.001 0.001 12.875 13.612 12.886-13.612c0.331-0.348 0.797-0.565 1.314-0.565 0.481 0 0.918 0.187 1.242 0.493l-0.001-0.001c0.723 0.687 0.755 1.832 0.072 2.555l-14.201 14.996c-0.33 0.348-0.795 0.564-1.311 0.564-0.001 0-0.003 0-0.004 0h0z"></path>
    </svg>
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
