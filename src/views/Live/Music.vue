<template>
    <div id="Music">
        <div class="c_g_layout">
            <div>
                <el-input
                    v-model="InputSearch"
                    placeholder="请输入关键字"
                    size="large"
                    style="width: 500px"
                    @change="FilterChange">
                    <template #append>
                        <el-button :icon="require('@element-plus/icons-vue').Search" @click="FilterChange"/>
                    </template>
                </el-input>
                <el-switch
                    v-model="bNetworkSearch"
                    active-color="#13ce66"
                    active-text="网络"
                    inactive-color="#409eff"
                    inactive-text="本地"
                    inline-prompt
                    size="large"
                    style="margin-left: 20px"/>
            </div>
            <div class="c_l_tags_display">
                <span style="margin-right: 30px">标签</span>
                <span>
                    <el-select
                        v-model="SelectTagValue"
                        class="c_tag_select"
                        default-first-option
                        filterable
                        multiple
                        placeholder="选择标签"
                        style="width: 100%"
                        @change="FilterChange">
                        <el-option v-for="Tag in TagOptions"
                                   :key="Tag"
                                   :value="Tag"/>
                    </el-select>
                </span>
            </div>
            <div>
                <el-card style="margin-top: 20px">
                    <el-table
                        v-loading="FilterMusicInfos.length <= 0"
                        :data="FilterMusicInfos.slice((CurrentPage - 1) * PageSize, CurrentPage * PageSize)"
                        :default-sort="{ prop: 'name', order: 'descending' }"
                        element-loading-text="加载中..."
                        stripe
                        style="width: 100%"
                        @cell-contextmenu="AddContextMenu">
                        <el-table-column type="index" width="60"/>
                        <el-table-column label="歌名" prop="name" sortable width="auto"/>
                        <el-table-column label="歌手" prop="artist" sortable width="auto"/>
                        <el-table-column label="歌辑" prop="album" sortable width="auto"/>
                        <el-table-column label="时长" prop="duration" sortable width="80"/>
                    </el-table>
                </el-card>
            </div>
            <div style="margin: 30px auto;">
                <el-pagination
                    v-model:current-page="CurrentPage"
                    :page-size="PageSize"
                    :total="FilterMusicInfos.length"
                    background
                    hide-on-single-page
                    layout="prev, pager, next"
                    style="justify-content: center;"
                    @current-change="AddMusicInfo"/>
            </div>
            <div
                id="MusicContextMenu"
                class="c_l_context_menu"
                hidden>
                <div class="c_l_button_display">
                    <el-button v-if="!bPlayerListMenu" class="mini-menu-button" @click="Menu('播放全部')">播放全部</el-button>
                    <el-button v-if="!bPlayerListMenu" class="mini-menu-button" @click="Menu('添加到播放列表')">添加到播放列表
                    </el-button>
                    <el-button class="mini-menu-button" @click="Menu('播放')">播放</el-button>
                    <el-button v-if="!bPlayerListMenu" class="mini-menu-button" @click="Menu('下一首播放')">下一首播放</el-button>
                    <el-button v-if="bPlayerListMenu" class="mini-menu-button" @click="Menu('移除播放列表')">移除播放列表
                    </el-button>
                    <el-button v-if="bPlayerListMenu" class="mini-menu-button" @click="Menu('全部移除')">全部移除</el-button>
                </div>
            </div>
            <div :id="AudioPlayerHandle"></div>
        </div>
    </div>
</template>

<script>
import { Vue } from "vue-class-component";
import { AxiosRequestConfig } from "axios";
import MusicInfo from "@/assets/javascript/MusicInfo";
import APlayer from 'aplayer';
import moment from "moment";


export default class Music extends Vue {
    //音乐信息数组
    MusicInfos: MusicInfo[] = [];
    //筛选
    FilterMusicInfos: MusicInfo[] = [];
    //输入框的搜索值
    InputSearch = '';
    //true: 在网络上搜索, false: 在本地搜素
    bNetworkSearch: boolean = true;
    //标签集合
    TagOptions: Set<string> = new Set();
    //选择的标签
    SelectTagValue: string[] = [];
    //当前页
    CurrentPage: number = 1;
    //当前页的大小
    PageSize: number = 100;
    //音乐播放器
    AP: APlayer;
    //音乐播放器的句柄
    AudioPlayerHandle: number = 0;
    //true: 播放列表的右键菜单, false: 表格的右键菜单
    bPlayerListMenu: boolean = false;
    
    created() {
        this.AudioPlayerHandle = this.functions.NewEditorId();
    }
    
    mounted() {
        //禁用网页的右键菜单
        document.oncontextmenu = (ev) => false;
        //添加 监听click事件
        window.addEventListener("click", this.RemoveContextMenu);
        
        this.signalr.on('AddMusicInfo', this.AddMusicInfo);
        this.axios({
            url: '/MusicInfo',
            method: 'get',
            responseType: 'json',
        })
            .then((response) => {
                this.FilterMusicInfos = this.MusicInfos = response.data.map((item, index) => {
                    item.tags.forEach(tag => {
                        this.TagOptions.add(tag);
                    });
                    return new MusicInfo(item.id, item.name, item.artist, item.album, item.duration, item.tags, item.url, item.cover, item.lrc);
                });
            })
            .catch((error) => {
                console.log(`Music 通讯出错: `, error);
            });
        
        this.AP = new APlayer({
            container: document.getElementById(`${this.AudioPlayerHandle}`),
            //开启吸底模式
            fixed: true,
            //主题色
            theme: "#b7daff",
            //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
            volume: 1.0,
            //音频信息, 应该是一个对象或对象数组
            audio: [],
            //列表默认折叠
            listFolded: true,
            //歌词类型
            lrcType: 1,
            //列表最大高度
            listMaxHeight: "400px",
        });
        let audio = document.getElementById(`${this.AudioPlayerHandle}`);
        let list = audio.querySelector('.aplayer-list');
        list.oncontextmenu = this.AddPlayerListMenu;
        
        //使用存储播放列表
        let obj = JSON.parse(sessionStorage.getItem('Music_APlayer_PlayerList'));
        if (obj != null) {
            this.AP.list.clear();
            this.AP.list.add(obj.list);
            this.AP.list.switch(obj.index);
        }
    }
    
    //离开页面时调用
    beforeUnmount() {
        //启用网页的右键菜单
        document.oncontextmenu = (ev) => true;
        //移除 监听click事件
        window.removeEventListener("click", this.RemoveContextMenu);
    }
    
    beforeDestroy() {
        this.signalr.off('AddMusicInfo', this.AddMusicInfo);
    }
    
    AddMusicInfo(Obj) {
        let info = new MusicInfo(Obj.id, Obj.name, Obj.artist, Obj.album, Obj.duration, Obj.tags, Obj.url, Obj.cover, Obj.lrc);
        this.MusicInfos.push(info);
        if (!this.bNetworkSearch) {
            let value = this.InputSearch;
            let tag = this.SelectTagValue.length <= 0 || this.SelectTagValue.every(tag => info.tags.includes(tag));
            let search = info.name.includes(value) || info.artist.includes(value) || info.album.includes(value);
            if (tag && search) {
                this.FilterMusicInfos.push(info);
            }
        }
    }
    
    //获取网易云音乐匹配项
    async GetMusicInfos(keywords: string = '原神', isSync: boolean = true) {
        //limit 最大为100
        let config: AxiosRequestConfig = {
            baseURL: 'http://cloud-music.pl-fe.cn',
            url: '/cloudsearch',
            params: {keywords: keywords, limit: 100, offset: 0},
            //headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/35.0.1916.138 Safari/537.36'},
            auth: null
        };
        let currentNum = 0, totalNum = 1;
        let MusicInfos: MusicInfo[] = [];
        while (currentNum < totalNum) {
            //搜索歌曲
            await this.axios(config).then(response => {
                config.params.offset += config.params.limit;
                let data = response.data;
                totalNum = data.result?.songCount ?? 0;
                if (data.code === 200) {
                    currentNum += config.params.limit;
                    data.result.songs.forEach(async (item, index) => {
                        let artists = item.ar.map(T => T.name).join('/');
                        let duration = moment(item.dt).format('m:s');
                        let info = new MusicInfo(item.id, item.name, artists, item.al.name, duration, [], '', item.al.picUrl, '');
                        MusicInfos.push(info);
                        //获取歌曲 URl
                        let localConfig = Object.create(config);
                        localConfig.url = '/song/url';
                        localConfig.params = {id: item.id};
                        await this.axios(localConfig).then(response => {
                            info.url = response.data.data[0].url;
                        });
                        //获取歌词字符串
                        localConfig.url = '/lyric';
                        await this.axios(localConfig).then(response => {
                            info.lrc = response.data.lrc.lyric;
                        });
                    });
                }
            }).catch(error => {
                currentNum = totalNum;
            });
        }
        return MusicInfos;
    }
    
    //搜索改变时触发
    FilterChange() {
        this.FilterMusicInfos = [];
        if (!this.bNetworkSearch) {
            let value = this.InputSearch;
            this.FilterMusicInfos = this.MusicInfos.filter(item => {
                let tag = this.SelectTagValue.length <= 0 || this.SelectTagValue.every(tag => item.tags.includes(tag));
                let search = item.name.includes(value) || item.artist.includes(value) || item.album.includes(value);
                return tag && search;
            });
        }
        else {
            this.GetMusicInfos(this.InputSearch).then(data => {
                this.FilterMusicInfos = data;
            });
        }
    }
    
    //设置菜单位置
    SetMenuPosition(clientX: number, clientY: number) {
        let content = document.getElementById("MusicContextMenu");
        content.hidden = false;
        content.style.top = `${clientY}px`;
        content.style.left = `${clientX}px`;
    }
    
    //当某一行被鼠标右键点击时会触发该事件
    AddContextMenu() {
        this.bPlayerListMenu = false;
        //选中的列
        this.SeleceColumn = arguments[0];
        this.SetMenuPosition(arguments[3].clientX, arguments[3].clientY);
    }
    
    //播放列表右键点击时触发
    AddPlayerListMenu(event) {
        this.bPlayerListMenu = true;
        let target = event.target || event.srcElement;
        let element = target.nodeName === "LI" ? target : target.parentNode;
        this.PlayerIndex = parseInt(element.querySelector('.aplayer-list-index').textContent) - 1;
        this.SetMenuPosition(event.clientX, event.clientY);
    }
    
    //当菜单的某一行被鼠标右键点击时会触发该事件
    RemoveContextMenu() {
        let content = document.getElementById("MusicContextMenu");
        content.hidden = true;
    }
    
    //播放选定歌曲
    Menu(value: string) {
        let list: any = this.AP.list;
        switch (value) {
            case "播放全部": {
                list.clear();
                list.add(this.FilterMusicInfos);
                list.switch(0);
                this.AP.play();
                break;
            }
            case "添加到播放列表": {
                if (!list.audios.includes(this.SeleceColumn)) {
                    list.add(this.SeleceColumn);
                }
                break;
            }
            case "播放": {
                let index = 0;
                if (this.bPlayerListMenu) {
                    //播列表中的其它歌曲，而非当前正在播放的歌曲
                    if (this.PlayerIndex !== list.index) {
                        index = this.PlayerIndex;
                    }
                }
                else {
                    //查找歌曲
                    index = list.audios.indexOf(this.SeleceColumn);
                    if (index === -1) {
                        index = list.audios.length;
                        list.add(this.SeleceColumn);
                    }
                }
                list.switch(index);
                this.AP.play();
                break;
            }
            case "下一首播放": {
                break;
            }
            case "移除播放列表": {
                list.remove(this.PlayerIndex);
                break;
            }
            case "全部移除": {
                list.clear();
                break;
            }
        }
        
        //存储播放列表
        sessionStorage.setItem("Music_APlayer_PlayerList", JSON.stringify({index: list.index, list: list.audios}));
    }
}
</script>

<style lang="stylus" scoped>
@import 'aplayer/dist/APlayer.min.css';

.c_l_context_menu
    position fixed
    z-index 5000
    top 0
    left 0
    cursor default

.c_l_button
    border 0
    height 40px
    width 200px

.c_l_button_display
    display flex
    flex-direction column
    align-items left

.el-button + .el-button
    margin-left 0 !important

.c_l_tags_display
    margin 30px auto;
    display flex
    align-items center
</style>

<style>
.aplayer .aplayer-list ol li .aplayer-list-index {
    float: left !important;
}

.aplayer .aplayer-list ol li .aplayer-list-title {
    position: absolute;
    left: 0;
    right: 0;
}

.aplayer.aplayer-fixed {
    max-width: 600px;
    z-index: 2001;
}

.aplayer.aplayer-fixed .aplayer-body {
    max-width: inherit;
}

.aplayer .aplayer-lrc p {
    color: hotpink;
}

.aplayer .aplayer-lrc p.aplayer-lrc-current {
    color: cyan;
}
</style>