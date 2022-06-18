<template>
    <div>
        <!-- 介绍 -->
        <div class="home-header">
            <h1>随风飞扬</h1>
            <p>心之所向，素履以往；生如逆旅，一苇以航</p>
            <svg class="home-header-down" height="100%" viewBox="0 0 32 32" width="100%" @click="scrollToContent">
                <path
                    d="M15.992 25.304c-0 0-0 0-0.001 0-0.516 0-0.981-0.216-1.31-0.563l-0.001-0.001-14.187-14.996c-0.306-0.323-0.494-0.76-0.494-1.241 0-0.998 0.809-1.807 1.807-1.807 0.517 0 0.983 0.217 1.313 0.565l0.001 0.001 12.875 13.612 12.886-13.612c0.331-0.348 0.797-0.565 1.314-0.565 0.481 0 0.918 0.187 1.242 0.493l-0.001-0.001c0.723 0.687 0.755 1.832 0.072 2.555l-14.201 14.996c-0.33 0.348-0.795 0.564-1.311 0.564-0.001 0-0.003 0-0.004 0h0z"></path>
            </svg>
        </div>
        <div class="layout-scale">
            <div class="home-content">
                <div class="home-content-main">
                    <router-view/>
                    <div v-if="$route.path === '/'" class="home-content-display">
                        <ArticleItem v-for="item in articleRecommends" :key="item.id" :article="item"
                                     class="display-item"/>
                    </div>
                </div>
                <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut">
                    <div v-if="showCard" class="home-card">
                        <el-card shadow="hover">
                            <Weather/>
                        </el-card>
                        <el-card class="home-blog-info" shadow="hover">
                            <template #header>
                                <p class="home-card-header">博客信息</p>
                            </template>
                            <ul>
                                <li>
                                    <span class="home-blog-info-tag">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="8" r="7"></circle>
                                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                        </svg>
                                        <span>文章数目</span>
                                    </span>
                                    <span
                                        :style="{'background-color': colors[functions.RandomNumber(0, colors.length-1)]}"
                                        class="home-blog-info-value">{{ blogInfo?.articleCount ?? 0 }}
                                    </span>
                                </li>
                                <li>
                                    <span class="home-blog-info-tag">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
                                            </path>
                                        </svg>
                                    <span>评论数目</span>
                                    </span>
                                    <span
                                        :style="{'background-color': colors[functions.RandomNumber(0, colors.length-1)]}"
                                        class="home-blog-info-value">{{ blogInfo?.commentCount ?? 0 }}
                                    </span>
                                </li>
                                <li>
                                    <span class="home-blog-info-tag">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
                                            <line x1="16" x2="16" y1="2" y2="6"></line>
                                            <line x1="8" x2="8" y1="2" y2="6"></line>
                                            <line x1="3" x2="21" y1="10" y2="10"></line>
                                        </svg>
                                        <span>运行天数</span>
                                    </span>
                                    <span
                                        :style="{'background-color': colors[functions.RandomNumber(0, colors.length-1)]}"
                                        class="home-blog-info-value">
                                        {{ moment().diff(blogInfo?.startTime ?? Date.now(), 'day') + '天' }}
                                    </span>
                                </li>
                                <li>
                                    <span class="home-blog-info-tag">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                        </svg>
                                        <span>最后活动</span>
                                    </span>
                                    <span
                                        :style="{'background-color': colors[functions.RandomNumber(0, colors.length-1)]}"
                                        class="home-blog-info-value">
                                        {{ moment(blogInfo?.updateTime ?? Date.now()).fromNow() }}
                                    </span>
                                </li>
                            </ul>
                        </el-card>
                        <el-card class="home-tag-cloud" shadow="hover">
                            <template #header>
                                <p class="home-card-header">标签云</p>
                            </template>
                            <TagCloud :tag-list="tags"/>
                        </el-card>
                    </div>
                </transition>
                <!-- 向右收起 向左展示 -->
                <div v-if="false" class="home-card-show-hidden">
                    <el-affix :offset="offsetHeight" target=".home-card-show-hidden">
                        <transition enter-active-class="animate__animated animate__fadeIn"
                                    leave-active-class="animate__animated animate__fadeOut"
                                    mode="out-in">
                            <svg v-if="showCard" class="icon" height="200" p-id="6464" t="1649901880936"
                                 version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg"
                                 @click="showCard = false">
                                <path d="M64.2 650.2h335.5v205.6L959.3 512 399.7 168.3v205.6H64.2v276.3z"
                                      fill-opacity="1" p-id="6465">
                                </path>
                            </svg>
                            <svg v-else class="icon" height="200" p-id="4193" t="1649901799832"
                                 version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg"
                                 @click="showCard = true">
                                <path d="M959.3 650.2H623.8v205.6L64.2 512l559.6-343.7v205.6h335.5v276.3z"
                                      fill-opacity="1" p-id="4194">
                                </path>
                            </svg>
                        </transition>
                    </el-affix>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- 首页 -->
<script setup>
import moment from 'moment';
import Weather from "@/components/Weather.vue";
import ArticleItem from "@/components/ArticleItem.vue";
import TagCloud from "@/components/TagCloud.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia/dist/pinia";
import { useCounterStore } from "@/stores/counter";

//显示卡片
let showCard = ref(true);
//颜色
let colors = ['#ff5b00', '#e6af00', '#7fbf03', '#0be617',
    '#00ffc2', '#00abff', '#2428ff', '#f31eff'];
//向右箭头的偏移高度
let offsetHeight = ref(window.innerHeight / 2);
//博客信息
const {blogInfo, articleRecommends, tags} = storeToRefs(useCounterStore());

//滚动到内容视图
function scrollToContent() {
    let maxSpeed = 10;
    let top = document.documentElement.scrollTop;
    //系数
    let coefficient = maxSpeed / (window.innerHeight + 10/*防止到达不了*/ - top);
    let time = 0;
    let timer = setInterval(() => {
        top = top + maxSpeed * Math.cos(coefficient * time);
        document.documentElement.scrollTop = top;
        if (top >= window.innerHeight) {
            clearInterval(timer);
        }
        time += 1;
    }, 0);
}
</script>