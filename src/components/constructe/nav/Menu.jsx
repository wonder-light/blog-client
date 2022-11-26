import { defineComponent, getCurrentInstance, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup(props) {
        const tar = {
            title: '导航',
            menu: [
                {
                    index: '/',
                    svgId: 'home-page',
                    name: '首页',
                },
                {
                    index: '/warehouse',
                    svgId: 'warehouse',
                    name: '仓库',
                },
                {
                    isSub: true,
                    svgId: 'about',
                    name: '关于',
                    sub: [
                        {
                            index: '/about',
                            svgId: 'about',
                            name: '关于我',
                        }
                    ]
                }
            ]
        };
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const animEnd = inject('animEnd');
        const closeMenuPanel = inject('closeMenuPanel');
        
        function skip(url) {
            if (animEnd.value) {
                router.push(url);
                closeMenuPanel();
            }
        }
        
        function getMenu(menu) {
            if (!menu) return;
            if (menu.sub === true) {
                return (
                    <el-sub-menu index={ menu.index }>
                        <template v-solte:title>
                            <SvgImg svg-id={ menu.svgId }/>
                            <p>{ menu.name }</p>
                        </template>
                        { menu.sub.map(getMenu) }
                    </el-sub-menu>
                );
            }
            else {
                return (
                    <el-menu-item index={ menu.index } onClick={ () => skip(menu.index) }>
                        <SvgImg svg-id={ menu.svgId }/>
                        <p>文章</p>
                    </el-menu-item>
                );
            }
        }
        
        return () => (
            <div className="ml-4 text-gray-400">
                <p className="text-left text-lg leading-loose">{ tar.title }</p>
                <el-menu default-active={ proxy.$route.path } active-text-color="#9ca3af" className="menu-style" menu-trigger="click" text-color="#9ca3af">
                    { tar.menu.map(getMenu) }
                </el-menu>
            </div>
        );
    }
})

