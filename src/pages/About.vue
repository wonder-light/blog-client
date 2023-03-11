<template>
  <q-card class="tw-mt-24" style="font-family: fangsong;">
    <q-card-section>
      <div class="tw-inline-block">
        <q-avatar alt="头像" class="tw-h-40 tw-w-40 -tw-mt-20 tw-rounded-full">
          <img :src="avatar" alt="头像" loading="eager">
        </q-avatar>
        <div class="tw-text-base tw-mt-8 tw-leading-8">
          <div class="tw-text-3xl tw-font-bold tw-leading-loose tw-text-gray-600">{{ blogger }}</div>
          <div class="tw-italic">因为不可能，所以才值得相信。</div>
          <div class="tw-italic">当你重新踏上旅途之后，一定要记得旅途本身的意义。</div>
          <div class="tw-italic">生命本没有意义，你要能给它什么意义，它就有什么意义。</div>
        </div>
      </div>
      <div class="tw-absolute tw-top-8 tw-left-12 tw-text-base">
        <div v-for="info in infos" class="tw-inline-block tw-mr-4">
          <div class="tw-text-blue-400 tw-font-bold tw-text-xl">{{ info.count }}</div>
          <div>{{ info.name }}</div>
        </div>
      </div>
      <div class="tw-absolute tw-top-8 tw-right-12">
        <q-btn v-for="item in buttons" :href="item.href" :target="item.target" class="tw-ml-3" color="purple-5" dense glossy ripple round type="a">
          <svg-icon :name="item.icon"/>
          <q-tooltip anchor="top middle" self="bottom middle" transition-hide="flip-left" transition-show="flip-right">
            {{ item.tip }}
          </q-tooltip>
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section class="tw-py-10">
      <div class="tw-text-3xl tw-mb-12 tw-font-bold tw-text-gray-600">
        <q-icon name="build"/>
        图表
      </div>
      <div class="tw-grid tw-grid-cols-2  tw-items-center tw-justify-center">
        <div id="GradientStackedAreaChart" class="tw-my-4" style="width: auto;height:300px;"></div>
        <div id="PieWithScrollableLegend" class="tw-my-4" style="width: auto;height:300px;"></div>
        <div id="BarRace" class="tw-my-4" style="width: auto;height:300px;"></div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="tw-text-3xl tw-mb-12 tw-font-bold tw-text-gray-600">
        <q-icon name="build"/>
        我的技能
      </div>
      <div class="tw-grid tw-grid-cols-2 tw-gap-6">
        <div v-for="skill in skills" class="tw-flex tw-justify-center">
          <q-linear-progress :color="skill.color" :value="skill.progress" class="tw-w-8/12" rounded size="1.6rem">
            <div class="tw-flex tw-items-center tw-absolute tw-inset-0 tw-px-4">
              <span class="tw-text-white tw-text-base">{{ skill.name }}</span>
            </div>
          </q-linear-progress>
        </div>
      </div>
      <div class="tw-h-16"></div>
    </q-card-section>
  </q-card>
</template>

<script>
import { Loading } from 'quasar'
import { useStore } from 'stores/example-store'

export default {
    preFetch({ store }) {
        Loading.show();
        const myStore = useStore(store);
        return myStore.updateBlogCount();
    }
}
</script>

<script setup>
import { storeToRefs } from 'pinia'
import { useMeta } from 'quasar'
import { inject, onMounted } from 'vue'

const { blogCount } = storeToRefs(useStore());

const blogger = inject('blogger')
const avatar = inject('avatar')
const infos = [
    { name: '文章', count: blogCount.value.articleCount },
    { name: '分类', count: blogCount.value.categoryCount },
    { name: '标签', count: blogCount.value.tagCount },
    { name: '相册', count: blogCount.value.albumCount },
];
const buttons = [
    { icon: 'github_li', tip: '访问我的github', href: 'https://gitHub.com/wonder-light', target: '_blank' },
    { icon: 'email', tip: '邮箱联系我', href: 'mailto:3209752489@qq.com', target: '_selt' },
    { icon: 'qq', tip: '我的QQ' },
    { icon: 'wei-xin', tip: '我的微信' },
];
const skills = [
    { name: 'C#', progress: 0.6, color: 'pink-4' },
    { name: 'JavaScript', progress: 0.7, color: 'purple-5' },
    { name: 'Vue', progress: 0.8, color: 'indigo-5' },
    { name: 'axios', progress: 0.7, color: 'deep-purple-11' },
    { name: 'node.js', progress: 0.5, color: 'blue-6' },
    { name: 'ASP.NET', progress: 0.5, color: 'cyan-6' },
];

useMeta({
    titleTemplate: title => `关于我|${ title }`,
    meta: {
        //optional; similar to titleTemplate, but allows templating with other meta properties
        title: { template: (title) => `关于我|${ title }` },
        keywords: { template: (keywords) => `${ keywords }|关于我|about` },
        ogTitle: { template: (title) => `关于我|${ title }` },
        twitterTitle: { template: (title) => `关于我|${ title }` },
    }
});

//动态导入模块
const echarts_core = () => import('echarts/core');
const components = () => import('echarts/components').then((c) => [
    c.TitleComponent,
    c.ToolboxComponent,
    c.TooltipComponent,
    c.GridComponent,
    c.LegendComponent
]);
const charts = () => import('echarts/charts').then((c) => [
    c.BarChart,
    c.LineChart,
    c.PieChart,
]);
const features = () => import('echarts/features').then((c) => [
    c.LabelLayout,
    c.UniversalTransition,
]);
const CanvasRenderer = () => import('echarts/renderers').then(m => m.CanvasRenderer);

onMounted(async () => {
    //图表
    const echarts = await Promise.all([echarts_core(), components(), charts(), features(), CanvasRenderer()])
                                 .then(([echarts, components, charts, features, CanvasRenderer]) => {
                                     echarts.use([
                                         ...components,
                                         ...charts,
                                         ...features,
                                         CanvasRenderer
                                     ]);
                                     return echarts;
                                 });
    //梯度叠加面积图
    const GSAOption = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: { /*text: '梯度叠加面积图'*/ },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: { focus: 'series' },
                data: [140, 232, 101, 264, 90, 340, 250]
            },
            {
                name: 'Line 2',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(0, 221, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(77, 119, 255)'
                        }
                    ])
                },
                emphasis: { focus: 'series' },
                data: [120, 282, 111, 234, 220, 340, 310]
            },
            {
                name: 'Line 3',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(55, 162, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(116, 21, 219)'
                        }
                    ])
                },
                emphasis: { focus: 'series' },
                data: [320, 132, 201, 334, 190, 130, 220]
            },
            {
                name: 'Line 4',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 0, 135)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(135, 0, 157)'
                        }
                    ])
                },
                emphasis: { focus: 'series' },
                data: [220, 402, 231, 134, 190, 230, 120]
            },
            {
                name: 'Line 5',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 191, 0)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(224, 62, 76)'
                        }
                    ])
                },
                emphasis: { focus: 'series' },
                data: [220, 302, 181, 234, 210, 290, 150]
            }
        ]
    };
    //可滚动的图例
    const data = genData(20);
    const PSLOption = {
        title: {
            text: '同名数量统计',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: data.legendData
        },
        series: [
            {
                name: '姓名',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: data.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    //动态排序柱状图
    const chartData = Array.from({ length: 10 }).map(_ => Math.round(Math.random() * 100));
    const BROption = {
        title: {
            text: '动态排序柱状图',
            subtext: '纯属虚构',
            left: 'center'
        },
        xAxis: {
            max: 'dataMax'
        },
        yAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 9 // 只显示最大的9条栏
        },
        series: [
            {
                realtimeSort: true,
                //name: '动态排序柱状图',
                type: 'bar',
                data: chartData,
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true
                }
            }
        ],
        legend: { show: true },
        animationDuration: 0,
        animationDurationUpdate: 3000, //动画持续更新时间
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };
    
    
    //梯度叠加面积图
    const GSADom = document.getElementById('GradientStackedAreaChart');
    const GradientStackedAreaChart = echarts.init(GSADom, 'light'); //theme: light / dark
    GradientStackedAreaChart.setOption(GSAOption);
    //可滚动的图例
    const PSLDom = document.getElementById('PieWithScrollableLegend');
    const PieWithScrollableLegend = echarts.init(PSLDom);
    PieWithScrollableLegend.setOption(PSLOption);
    //动态排序柱状图
    const BRDom = document.getElementById('BarRace');
    const BarRace = echarts.init(BRDom);
    BarRace.setOption(BROption);
    
    
    setTimeout(updateChartData, 0); //第一次更新
    setInterval(updateChartData, 3000); //持续更新
    
    
    function genData(count) {
        // prettier-ignore
        const nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];
        const legendData = [];
        const seriesData = [];
        for (let i = 0; i < count; i++) {
            let name =
                Math.random() > 0.65
                ? makeWord(4, 1) + '·' + makeWord(3, 0)
                : makeWord(3, 1);
            legendData.push(name);
            seriesData.push({
                name: name,
                value: Math.round(Math.random() * 100000)
            });
        }
        return {
            legendData: legendData,
            seriesData: seriesData
        };
        
        function makeWord(max, min) {
            const nameLen = Math.ceil(Math.random() * max + min);
            const name = [];
            for (let i = 0; i < nameLen; i++) {
                name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
            }
            return name.join('');
        }
    }
    
    function updateChartData() {
        for (let i = 0; i < chartData.length; ++i) {
            if (Math.random() > 0.9) {
                chartData[i] += Math.round(Math.random() * 500);
            }
            else {
                chartData[i] += Math.round(Math.random() * 100);
            }
        }
        BarRace.setOption({
            series: [
                {
                    type: 'bar',
                    data: chartData
                }
            ]
        });
    }
})
</script>
