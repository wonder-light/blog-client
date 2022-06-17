<template>
    <div class="warehouse">
        <el-image :src="env.baseURL + '/files/image/background/4955.jpg'" alt="" fit="cover"/>
        <div v-if="githubRepository.length > 0">
            <div style="display: flex;">
                <h1 class="warehouse-title">GitHub</h1>
            </div>
            <div class="home-content-display">
                <WarehouseCard v-for="item in githubRepository" :repository="item" class="display-item"/>
            </div>
        </div>
        <div v-if="giteeRepository.length > 0">
            <el-divider/>
            <div style="display: flex;">
                <h1 class="warehouse-title">Gitee</h1>
            </div>
            <div class="home-content-display">
                <WarehouseCard v-for="item in giteeRepository" :repository="item" class="display-item"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import { AxiosInstance } from "axios";
import Card from "@/components/Card";
import WarehouseCard from "@/views/warehouse/WarehouseCard";

@Options({
    components: {WarehouseCard, Card}
})

//仓库
export default class Warehouse extends Vue {
    //axios 实例
    instance: AxiosInstance = null;
    //GitHub
    //更多 GitHub API 请查看 https://docs.github.com/cn/rest/reference/repos#list-repositories-for-a-user
    //用户的GitHub存储库
    githubRepository = [];
    //用户的Gitee存储库
    giteeRepository = [];
    
    colors = [
        '#2a9dc9', '#ca4905', '#ad8609',
        '#1bab65', '#5ca603', '#16c397',
        '#0e87c0', '#3e5abb', '#b300be',
    ];
    
    created() {
        this.githubRepository = this.$store.state.githubRepository;
        if (this.githubRepository.length <= 0) {
            this.getWarehouseFromGitHub(true);
        }
        this.giteeRepository = this.$store.state.giteeRepository;
        if (this.giteeRepository.length <= 0) {
            this.getWarehouseFromGitHub(false);
        }
    }
    
    //异步获取所有公共仓库
    async getWarehouseFromGitHub(isGitHub = true) {
        let currentPage = 1;
        let loop = true;
        while (loop) {
            await this.axios({
                method: 'get',
                baseURL: isGitHub ? 'https://api.github.com' : 'https://gitee.com/api/v5',
                url: '/users/wonder-light/repos',
                timeout: 3000,
                headers: {'accept': 'application/vnd.github.v3+json'},
                params: {
                    access_token: isGitHub ? null : '982da8f1bd7e54ccf7a0cf6970699b61',
                    per_page: 100,
                    page: currentPage,
                }
            }).then(response => {
                if (response.data instanceof Array && response.data.length > 0) {
                    this.$store.commit(isGitHub ? 'addGithubRepositoryArray' : 'addGiteeRepositoryArray', response.data);
                }
                else {
                    loop = false;
                }
                currentPage += 1;
            }).catch(e => loop = false);
        }
    }
};
</script>

<style scoped>

</style>