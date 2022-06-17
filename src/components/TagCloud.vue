<template>
    <div ref="tagCloud" class="tag-cloud-all">
        <a v-for="item in tagList" :href="item.url"
           :style="'color:' + RandomColor() + ';top: 0;left: 0;filter:none;'">{{ item.name }}</a>
    </div>
</template>


<script>
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        tagList: {
            type: Array,
            default: [],
        },
        radius: {
            type: Number,
            default: 100,
        }
    }
})

export default class TagCloud extends Vue {
    tagPositionList = [];
    tagCloud = null;
    elementA = null;
    //X轴的旋转速度
    rX = -0.01;
    //Y轴的旋转速度
    rY = 0.01;
    
    //随机颜色
    RandomColor() {
        let color = [];
        color.push(this.functions.RandomNumber(0, 255));
        color.push(this.functions.RandomNumber(0, 255));
        color.push(this.functions.RandomNumber(0, 255));
        color[this.functions.RandomNumber(0, 2)] = this.functions.RandomNumber(0, 145);
        return `rgb(${color[0]},${color[1]},${color[2]})`;
    }
    
    // 设置初始定位
    InitPosition() {
        //极坐标 (θ,φ,r) => (theta, phi, r)
        //x = r*sin(θ)cos(φ)
        //y = r*cos(θ)sin(φ)
        //z = r*cos(θ)
        
        let theta = 0;
        let phi = 0;
        let r = this.radius;
        
        let number = this.tagList.length;
        for (let i = 0; i < number; i++) {
            let unit = -1 + (2 * (i + 1) - 1) / number;
            let elem = this.elementA[i];
            theta = Math.acos(unit);
            phi = theta * Math.sqrt(number * Math.PI);//计算标签相对于球心的角度
            // 坐标变换 取 (x,y) z 与透明度有关
            let x = r + r * Math.sin(theta) * Math.cos(phi);
            let y = r + r * Math.sin(theta) * Math.sin(phi);
            let z = r * Math.cos(theta);
            this.tagPositionList.push({x: x, y: y, z: z});
            z = (z / r + 1) * 0.45 + 0.1;//[0.1, 1]
            //设置位置
            elem.style.left = x + 'px';
            elem.style.top = y + 'px';
            elem.style.opacity = z;
        }
    }
    
    RotateX(angleX) {
        let cos = Math.cos(angleX);
        let sin = Math.sin(angleX);
        let r = this.radius;
        this.tagPositionList.forEach((tag, index) => {
            let elem = this.elementA[index];
            let y1 = (tag.y - r) * cos - tag.z * sin + r;
            let z1 = tag.z * cos + (tag.y - r) * sin;
            tag.y = y1;
            tag.z = z1;
            elem.style.top = tag.y + 'px';
            elem.style.opacity = (tag.z / r + 1) * 0.45 + 0.1;//[0.1, 1];
        });
    }
    
    RotateY(angleY) {
        let cos = Math.cos(angleY);
        let sin = Math.sin(angleY);
        let r = this.radius;
        this.tagPositionList.forEach((tag, index) => {
            let elem = this.elementA[index];
            let x1 = (tag.x - r) * cos - tag.z * sin + r;
            let z1 = tag.z * cos + (tag.x - r) * sin;
            tag.x = x1;
            tag.z = z1;
            elem.style.left = tag.x + 'px';
            elem.style.opacity = (tag.z / r + 1) * 0.45 + 0.1;//[0.1, 1];
        });
    }
    
    RotateXY(angleX, angleY) {
        let cosX = Math.cos(angleX);
        let sinX = Math.sin(angleX);
        let cosY = Math.cos(angleY);
        let sinY = Math.sin(angleY);
        let r = this.radius;
        this.tagPositionList.forEach((tag, index) => {
            let elem = this.elementA[index];
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
    }
    
    // 生成标签云
    createTagCloud() {
        this.tagCloud = this.$refs.tagCloud;
        this.elementA = this.tagCloud.getElementsByTagName('a');
        this.InitPosition();
        this.tagCloud.onmousemove = (event) => {
            if (this.tagList.length > 0) {
                let tagOffsetWidth = this.elementA[0].offsetWidth;
                let tagOffsetHeight = this.elementA[0].offsetHeight;
                let mouseX = 0;
                let mouseY = 0;
                if (event.target.localName === 'a') {
                    mouseX = event.target.offsetLeft + event.offsetX - (this.radius + tagOffsetWidth / 2);
                    mouseY = event.target.offsetTop + event.offsetY - (this.radius + tagOffsetHeight / 2);
                }
                else {
                    mouseX = event.offsetX - (this.radius + tagOffsetWidth / 2);
                    mouseY = event.offsetY - (this.radius + tagOffsetHeight / 2);
                }
                let XY = Math.sqrt(mouseY * mouseY + mouseX * mouseX);
                let scale = -Math.sqrt(0.0002) / XY;
                this.rX = scale * mouseY;
                this.rY = scale * mouseX;
            }
        };
        setInterval(() => {
            // 坐标更新 让标签动起来
            //旋转球体
            this.RotateX(this.rX);
            this.RotateY(this.rY);
        }, 20);            // 定时器执行 不能写setInterval(this.update(), 30)
    }
    
    // 网络请求 拿到tagList
    getTags() {
        // 假装从接口拿回来的数据
        let tagListOrg = [
            {name: '标签1', url: 'www.baidu.com'},
            {name: '标签2', url: 'www.baidu.com'},
            {name: '标签3', url: 'www.baidu.com'},
            {name: '标签4', url: 'www.baidu.com'},
            {name: '标签5', url: 'www.baidu.com'},
            {name: '标签6', url: 'www.baidu.com'},
            {name: '标签7', url: 'www.baidu.com'},
            {name: '标签8', url: 'www.baidu.com'},
            {name: '标签9', url: 'www.baidu.com'},
            {name: '标签10', url: 'www.baidu.com'},
            {name: '标签11', url: 'www.baidu.com'},
            {name: '标签12', url: 'www.baidu.com'},
            {name: '标签13', url: 'www.baidu.com'},
            {name: '标签14', url: 'www.baidu.com'},
            {name: '标签15', url: 'www.baidu.com'},
            {name: '标签16', url: 'www.baidu.com'},
            {name: '标签17', url: 'www.baidu.com'},
            {name: '标签18', url: 'www.baidu.com'},
            {name: '标签19', url: 'www.baidu.com'},
            {name: '标签20', url: 'www.baidu.com'},
            {name: '标签21', url: 'www.baidu.com'},
            {name: '标签22', url: 'www.baidu.com'},
            {name: '标签23', url: 'www.baidu.com'},
            {name: '标签24', url: 'www.baidu.com'},
            {name: '标签25', url: 'www.baidu.com'},
            {name: '标签26', url: 'www.baidu.com'},
            {name: '标签27', url: 'www.baidu.com'},
            {name: '标签28', url: 'www.baidu.com'},
            {name: '标签29', url: 'www.baidu.com'},
            {name: '标签30', url: 'www.baidu.com'}
        ];
        
        //this.tagList = tagListOrg;
        //创建子元素需要时间
        setTimeout(() => {
            this.createTagCloud();
        }, 20);
    }
    
    created() {
        this.getTags();
    }
}

</script>
