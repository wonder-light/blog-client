<template>
    <div ref="tagCloud" class="tag-cloud-all">
        <a v-for="item in tagList" :key="item.url" :href="item.url"
           :style="'color:' + RandomColor() + ';top: 0;left: 0;filter:none;'">{{ item.name }}</a>
    </div>
</template>


<script setup>
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";

let props = defineProps({
    tagList: {type: Array, default: () => []},
    radius: {type: Number, default: 100}
});

const {proxy} = getCurrentInstance();

let tagPositionList = [];
let tagCloud = ref();
let elementA = null;
//X轴的旋转速度
let rX = ref(-0.01);
//Y轴的旋转速度
let rY = ref(0.01);
//动画帧ID
let AnimationFrameId = 0;

onMounted(createTagCloud);
onUnmounted(() => window.cancelAnimationFrame(AnimationFrameId));

//随机颜色
function RandomColor() {
    let color = [];
    color.push(proxy.functions.RandomNumber(0, 255));
    color.push(proxy.functions.RandomNumber(0, 255));
    color.push(proxy.functions.RandomNumber(0, 255));
    color[proxy.functions.RandomNumber(0, 2)] = proxy.functions.RandomNumber(0, 145);
    return `rgb(${color[0]},${color[1]},${color[2]})`;
}

// 设置初始定位
function InitPosition() {
    //极坐标 (θ,φ,r) => (theta, phi, r)
    //x = r*sin(θ)cos(φ)
    //y = r*cos(θ)sin(φ)
    //z = r*cos(θ)
    
    let theta = 0;
    let phi = 0;
    let r = props.radius;
    
    let number = props.tagList.length;
    for (let i = 0; i < number; i++) {
        let unit = -1 + (2 * (i + 1) - 1) / number;
        let elem = elementA[i];
        theta = Math.acos(unit);
        phi = theta * Math.sqrt(number * Math.PI);//计算标签相对于球心的角度
        // 坐标变换 取 (x,y) z 与透明度有关
        let x = r + r * Math.sin(theta) * Math.cos(phi);
        let y = r + r * Math.sin(theta) * Math.sin(phi);
        let z = r * Math.cos(theta);
        tagPositionList.push({x: x, y: y, z: z});
        z = (z / r + 1) * 0.45 + 0.1;//[0.1, 1]
        //设置位置
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        elem.style.opacity = z;
    }
}

function RotateX(angleX) {
    let cos = Math.cos(angleX);
    let sin = Math.sin(angleX);
    let r = props.radius;
    tagPositionList.forEach((tag, index) => {
        let elem = elementA[index];
        let y1 = (tag.y - r) * cos - tag.z * sin + r;
        let z1 = tag.z * cos + (tag.y - r) * sin;
        tag.y = y1;
        tag.z = z1;
        elem.style.top = tag.y + 'px';
        elem.style.opacity = (tag.z / r + 1) * 0.45 + 0.1;//[0.1, 1];
    });
}

function RotateY(angleY) {
    let cos = Math.cos(angleY);
    let sin = Math.sin(angleY);
    let r = props.radius;
    tagPositionList.forEach((tag, index) => {
        let elem = elementA[index];
        let x1 = (tag.x - r) * cos - tag.z * sin + r;
        let z1 = tag.z * cos + (tag.x - r) * sin;
        tag.x = x1;
        tag.z = z1;
        elem.style.left = tag.x + 'px';
        elem.style.opacity = (tag.z / r + 1) * 0.45 + 0.1;//[0.1, 1];
    });
}

/*function RotateXY(angleX, angleY) {
    let cosX = Math.cos(angleX);
    let sinX = Math.sin(angleX);
    let cosY = Math.cos(angleY);
    let sinY = Math.sin(angleY);
    let r = props.radius;
    tagPositionList.forEach((tag, index) => {
        let elem = elementA[index];
        let y = (tag.y - r) * cosX - tag.z * sinX + r;
        tag.z = tag.z * cosX + (tag.y - r) * sinX;
        let x = (tag.x - r) * cosY - tag.z * sinY + r;
        let z = tag.z * cosY + (tag.x - r) * sinY;
        tag.x = x;
        tag.y = y;
        tag.z = z;
        elem.style.top = tag.y + 'px';
        elem.style.left = tag.x + 'px';
        elem.style.opacity = (tag.z / r + 1) * 0.45 + 0.1;//[0.1, 1];
    });
}*/

function update() {
    // 坐标更新 让标签动起来
    //旋转球体
    RotateX(rX.value);
    RotateY(rY.value);
    
    requestAnimationFrame(update);
}

// 生成标签云
function createTagCloud() {
    elementA = tagCloud.value.getElementsByTagName('a');
    InitPosition();
    tagCloud.value.onmousemove = (event) => {
        if (props.tagList.length > 0) {
            let tagOffsetWidth = elementA[0].offsetWidth;
            let tagOffsetHeight = elementA[0].offsetHeight;
            let mouseX;
            let mouseY;
            if (event.target.localName === 'a') {
                mouseX = event.target.offsetLeft + event.offsetX - (props.radius + tagOffsetWidth / 2);
                mouseY = event.target.offsetTop + event.offsetY - (props.radius + tagOffsetHeight / 2);
            }
            else {
                mouseX = event.offsetX - (props.radius + tagOffsetWidth / 2);
                mouseY = event.offsetY - (props.radius + tagOffsetHeight / 2);
            }
            let XY = Math.sqrt(mouseY * mouseY + mouseX * mouseX);
            let scale = -Math.sqrt(0.0002) / XY;
            rX.value = scale * mouseY;
            rY.value = scale * mouseX;
        }
    };
    AnimationFrameId = window.requestAnimationFrame(update);
}

</script>
