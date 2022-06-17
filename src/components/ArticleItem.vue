<template>
    <Card v-if="mode" class="article-mini-item">
        <div class="article-item-image" @click="SkipToArticleView">
            <el-image :src="article.cover" alt="" fit="cover"/>
            <p class="single-row-show">{{ article.title }}</p>
        </div>
        <div class="article-item-other">
            <p>{{ article.description }}</p>
            <div class="article-item-other-time">
                <span>
                    <svg class="icon" height="200" p-id="4893" t="1649903572308"
                         version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M762.8 71.1c-16-11.6-38.6-8.1-50.3 7.9L504.2 365.5 295.8 79c-11.6-16-34.3-19.6-50.3-7.9-16 11.6-19.6 34.3-7.9 50.3L461 428.5c-4.2 14.2 0.6 30.1 13.2 39.3 9 6.5 19.9 8.1 30 5.6 10 2.5 21 0.9 30-5.6 12.6-9.2 17.4-25.1 13.2-39.3l223.4-307.2c11.6-16 8-38.6-8-50.2z"
                            fill="#FB813A" p-id="4894">
                        </path>
                        <path
                            d="M861.7 182.1H162.3c-33.8 0-61.1 27.4-61.1 61.1v655.4c0 33.8 27.4 61.1 61.1 61.1h699.5c33.8 0 61.1-27.4 61.1-61.1V243.2c0-33.8-27.4-61.1-61.2-61.1z"
                            fill="#FDDE80" p-id="4895">
                        </path>
                        <path
                            d="M781.1 863.2H242.9c-21.5 0-39-17.5-39-39v-399c0-21.5 17.5-39 39-39h538.3c21.5 0 39 17.5 39 39v398.9c0 21.6-17.5 39.1-39.1 39.1z"
                            fill="#FFFFFF" p-id="4896">
                        </path>
                        <path
                            d="M398.9 480.3H297c-5.2 0-9.4 4.2-9.4 9.4v101.9c0 5.2 4.2 9.4 9.4 9.4h102c5.2 0 9.4-4.2 9.4-9.4V489.7c-0.1-5.2-4.3-9.4-9.5-9.4zM563 480.3H461c-5.2 0-9.4 4.2-9.4 9.4v101.9c0 5.2 4.2 9.4 9.4 9.4h102c5.2 0 9.4-4.2 9.4-9.4V489.7c0-5.2-4.2-9.4-9.4-9.4zM727.1 480.3h-102c-5.2 0-9.3 4.2-9.3 9.3v102c0 5.2 4.2 9.4 9.4 9.4h102c5.2 0 9.3-4.2 9.3-9.3v-102c-0.1-5.2-4.3-9.4-9.4-9.4zM398.9 665.8h-102c-5.2 0-9.3 4.2-9.3 9.3v102c0 5.2 4.2 9.4 9.4 9.4h102c5.2 0 9.3-4.2 9.3-9.3v-102c0-5.2-4.2-9.4-9.4-9.4zM563 665.8H461c-5.2 0-9.4 4.2-9.4 9.4v101.9c0 5.2 4.2 9.4 9.4 9.4h102c5.2 0 9.4-4.2 9.4-9.4V675.2c0-5.2-4.2-9.4-9.4-9.4z"
                            fill="#FB813A" p-id="4897">
                        </path>
                        <path
                            d="M625.1 786.5h102c5.2 0 9.4-4.2 9.4-9.4V675.2c0-5.2-4.2-9.4-9.4-9.4h-102c-5.2 0-9.4 4.2-9.4 9.4v101.9c0 5.2 4.2 9.4 9.4 9.4z"
                            fill="#9289F0" p-id="4898">
                        </path>
                    </svg>
                </span>
                <span>
                    {{ require('moment')(article.date).format('Y年M月D日') }}
                </span>
            </div>
            <el-divider/>
            <div class="article-item-other-tags">
                <a v-for="(tag,index) in article.tags"
                   :style="{'background-color': backgroundColors[index], 'color': colors[index]}">
                    {{ tag.name }}
                </a>
            </div>
        </div>
    </Card>
    <el-card v-else class="article-card" shadow="hover">
        <div :class="{'article-display-row': !large, 'article-display-column': large}">
            <el-image :src="article.cover" alt="" fit="cover" @click="SkipToArticleView"/>
            <div class="article-item-content">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <el-divider/>
                <div class="article-tags">
                    <div>
                        <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                                fill="currentColor">
                            </path>
                        </svg>
                        <span>{{ $store.state.blogger.name }}</span>
                    </div>
                    <div>
                        <svg class="icon" height="200" p-id="2657" t="1649980705565"
                             version="1.1" viewBox="0 0 1024 1024" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M512.736 992a483.648 483.648 0 0 1-164.672-28.8 36.88 36.88 0 1 1 25.104-69.36 407.456 407.456 0 1 0-184.608-136.512A36.912 36.912 0 0 1 129.488 801.6a473.424 473.424 0 0 1-97.472-290A480 480 0 1 1 512.736 992z"
                                p-id="2658">
                            </path>
                            <path
                                d="M685.6 638.592a32 32 0 0 1-14.032-2.96l-178.048-73.888a36.8 36.8 0 0 1-22.912-34.016V236.672a36.944 36.944 0 1 1 73.888 0v266.72l155.2 64.272a36.336 36.336 0 0 1 19.952 48 37.616 37.616 0 0 1-34.048 22.928z"
                                p-id="2659">
                            </path>
                        </svg>
                        <span>{{ require('moment')(article.date).format('Y年M月D日') }}</span>
                    </div>
                    <div v-if="article.type != null">
                        <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"
                                fill="currentColor">
                            </path>
                        </svg>
                        <span>{{ article.type.name }}</span>
                    </div>
                    <div>
                        <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
                                fill="currentColor">
                            </path>
                        </svg>
                        <span>{{ article.views }}</span>
                    </div>
                    <div>
                        <svg data-v-ba633cb8="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
                                fill="currentColor">
                            
                            </path>
                            <path
                                d="M512 499.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
                                fill="currentColor">
                            </path>
                        </svg>
                        <span>{{ article.commentCount }}</span>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import Card from "@/components/Card";

@Options({
    components: {Card},
    props: {
        //true：卡片显示， false：正常显示
        mode: {type: Boolean, default: true},
        //文章
        article: {type: Object, default: null},
        //大型显示
        large: {type: Boolean, default: false},
        //跳转
        skip: {type: Boolean, default: true},
    }
})

export default class ArticleItem extends Vue {
    //字体颜色
    colors = [];
    //背景颜色
    backgroundColors = [];
    
    created() {
        if (this.article == null) {
            this.$router.back();
            throw "在ArticleItem中article为空";
        }
        this.colors = this.article.tags.map(_ => this.functions.RandomColor(0x580E0E));
        this.backgroundColors = this.colors.map(color => color + '30');
    }
    
    
    //跳转到对应的文章
    SkipToArticleView() {
        //console.log('跳转', this.article?.id)
        if (this.article != null && this.skip) {
            this.$router.push(`/article/${this.article.id}`);
        }
    }
};
</script>
