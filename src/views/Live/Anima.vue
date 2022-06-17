<template>
    <div id="Anima">
        <div class="c_g_layout">
            <el-input
                v-model="InputSearch"
                placeholder="请输入关键字"
                size="large"
                style="width: 500px"
                @change="FilterChange">
                <template #append>
                    <el-icon>
                        <search/>
                    </el-icon>
                </template>
            </el-input>
            <div>
                <div>
                    <span>标签</span>
                    <span>
                        <el-select/>
                    </span>
                </div>
                <el-card>
                </el-card>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import { Search } from "@element-plus/icons-vue";

@Options({
    components: {Search}
})

export default class Anima extends Vue {
    //搜索框的搜索值
    InputSearch = '';
    
    mounted() {
    }
    
    FilterChange(value) {
    }
}
</script>

<style lang="stylus" scoped>

</style>