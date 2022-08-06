<template>
  <div ref="tagCloud" class="tag-cloud">
    <a v-for="item in tagList" :key="item.url" :href="item.url" :style="'color:' + randomColor() + ';top: 0;left: 0;'">
      {{ item.name }}
    </a>
  </div>
</template>


<script setup>
import { randomNumber } from "@/assets/js/api";
import { nextTick, onMounted, onUnmounted, ref } from "vue";

let props = defineProps({
    tagList: { type: Array, default: () => [] },
});

//标签列表
let tagPositionList = [];
//文档元素的引用
let tagCloud = ref();
//dev.a 元素数组
let elementA = null;
//X轴的旋转速度
let rX = -12;
//Y轴的旋转速度
let rY = 12;
//tagCloud 的宽高
let origin = { x: 0, y: 0 };
//标签云的半径
let radius = 0;
//动画帧ID
let AnimationFrameId = 0;

window.addEventListener('resize', setOrigin);
onMounted(() => nextTick(createTagCloud));
onUnmounted(() => {
    tagCloud.value.onmousedown = null;
    window.cancelAnimationFrame(AnimationFrameId);
    window.removeEventListener('resize', setOrigin);
});

//随机颜色
function randomColor() {
    let color = [];
    color.push(randomNumber(0, 255));
    color.push(randomNumber(0, 255));
    color.push(randomNumber(0, 255));
    color[randomNumber(0, 2)] = randomNumber(0, 145);
    return `rgb(${ color[0] },${ color[1] },${ color[2] })`;
}

// 设置初始定位
function initPosition() {
    //极坐标 (θ,φ,r) => (theta, phi, r)
    //x = r*sin(θ)cos(φ)
    //y = r*cos(θ)sin(φ)
    //z = r*cos(θ)
    
    let theta = 0;
    let phi = 0;
    const r = radius;
    const number = props.tagList.length;
    for (let i = 0; i < number; i++) {
        const unit = -1 + (2 * (i + 1) - 1) / number;
        const elem = elementA[i];
        theta = Math.acos(unit);
        phi = theta * Math.sqrt(number * Math.PI);//计算标签相对于球心的角度
        // 坐标变换 取 (x,y) z 与透明度有关
        //以原点(0,0,0)为球心
        let x = r * Math.sin(theta) * Math.cos(phi);
        let y = r * Math.sin(theta) * Math.sin(phi);
        let z = r * Math.cos(theta);
        //该标签对应的半宽
        let w = (origin.x - elem.offsetWidth / 2);
        //该标签对应的半高
        let h = (origin.y - elem.offsetHeight / 2);
        tagPositionList.push({ x, y, z, w, h });
        z = (z / r + 1) * 0.45 + 0.1;//[0.1, 1]
        //设置位置
        elem.style.left = x + w + 'px';
        elem.style.top = y + h + 'px';
        elem.style.opacity = z;
    }
}

function rotateX(angleX) {
    let cos = Math.cos(angleX);
    let sin = Math.sin(angleX);
    tagPositionList.forEach((tag, index) => {
        let elem = elementA[index];
        let y1 = tag.y * cos - tag.z * sin;
        let z1 = tag.z * cos + tag.y * sin;
        tag.y = y1;
        tag.z = z1;
        elem.style.top = tag.y + tag.h + 'px';
        elem.style.opacity = (tag.z / radius + 1) * 0.45 + 0.1;//[0.1, 1];
    });
}

function rotateY(angleY) {
    let cos = Math.cos(angleY);
    let sin = Math.sin(angleY);
    
    tagPositionList.forEach((tag, index) => {
        let elem = elementA[index];
        let x1 = tag.x * cos - tag.z * sin;
        let z1 = tag.z * cos + tag.x * sin;
        tag.x = x1;
        tag.z = z1;
        elem.style.left = tag.x + tag.w + 'px';
        elem.style.opacity = (tag.z / radius + 1) * 0.45 + 0.1;//[0.1, 1];
    });
}

/*function rotateXY(angleX, angleY) {
    let cosX = Math.cos(angleX);
    let sinX = Math.sin(angleX);
    let cosY = Math.cos(angleY);
    let sinY = Math.sin(angleY);
    tagPositionList.forEach((tag, index) => {
        let elem = elementA[index];
        let y = tag.y * cosX - tag.z * sinX;
        tag.z = tag.z * cosX + tag.y * sinX;
        let x = tag.x * cosY - tag.z * sinY;
        let z = tag.z * cosY + tag.x * sinY;
        tag.x = x;
        tag.y = y;
        tag.z = z;
        elem.style.top = tag.y + tag.h + 'px';
        elem.style.left = tag.x + tag.w + 'px';
        elem.style.opacity = (tag.z / radius + 1) * 0.45 + 0.1;//[0.1, 1];
    });
}*/

function update() {
    // 坐标更新 让标签动起来
    //旋转球体
    rotateX(rX * 0.001);
    rotateY(rY * 0.001);
    
    AnimationFrameId = window.requestAnimationFrame(update);
}

// 生成标签云
function createTagCloud() {
    setOrigin();
    elementA = tagCloud.value.getElementsByTagName('a');
    initPosition();
    //鼠标点击时调用
    tagCloud.value.onmousedown = drag;
    AnimationFrameId = window.requestAnimationFrame(update);
}

//设置原点
function setOrigin() {
    origin.x = tagCloud.value.offsetWidth / 2;
    origin.y = tagCloud.value.offsetHeight / 2;
    radius = Math.min(origin.x, origin.y) * 0.8;
}

//鼠标左键拖动标签云
function drag(ev) {
    //不是鼠标左键
    if (ev.button !== 0 || props.tagList.length <= 0) {
        return;
    }
    
    const el = tagCloud.value;
    //鼠标在网页中的坐标
    let pageX = ev.pageX;
    let pageY = ev.pageY;
    //鼠标移动时调用
    el.onmousemove = (ev) => {
        let x = ev.pageX - pageX;
        let y = ev.pageY - pageY;
        
        rX = clamp(rX - (y / 10.0), -48, 48);
        rY = clamp(rY - (x / 10.0), -48, 48);
        
        pageX = ev.pageX;
        pageY = ev.pageY;
    };
    
    //清理鼠标事件
    function clean() {
        el.onmouseup = null;
        el.onmousemove = null;
        el.onmouseleave = null;
    }
    
    el.onmouseleave = clean;
    el.onmouseup = clean;
}

function clamp(v, min, max) {
    if (v < min) return min;
    if (v > max) return max;
    return v;
}
</script>
