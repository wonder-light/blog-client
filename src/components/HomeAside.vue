<template>
  <div class="tw-relative tw-w-full tw-h-full tw-grid tw-content-between tw-bg-white tw-overflow-y-auto scrollbar-hidden">
    <div class="tw-h-auto tw-w-full">
      <!-- 头像、说明 -->
      <div class="tw-w-full tw-relative tw-h-75 tw-mb-5 tw-bg-cover">
        <q-img alt="背景图" class="tw-w-full tw-h-full" fit="cover" loading="lazy"
               src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5c8ba350-827c-4df5-bf3c-d7683c79f8bf/6b82bc17-a73f-4ced-a2c3-8157e167b5f3.jpg"/>
        <div class="tw-absolute tw-inset-0 tw-text-center">
          <q-avatar alt="头像" class="tw-h-20 tw-w-20 tw-mt-8 tw-rounded-full">
            <img :src="avatar" alt="头像" loading="lazy">
          </q-avatar>
          <p class="tw-text-white tw-my-4 tw-text-xl">{{ blogger }}</p>
          <p class="tw-text-white tw-my-2.5">路曼曼其修远兮</p>
          <p class="tw-text-white tw-my-2.5">吾将上下而求索</p>
        </div>
        <div class="tw-absolute tw-inset-x-0 tw-bottom-0 tw-h-8 tw-bg-gradient-to-t tw-from-white"/>
      </div>
      <div class="tw-ml-4 tw-text-gray-400">
        <p class="tw-text-left tw-text-lg tw-leading-loose">导航</p>
        <MenuPanelUp/>
      </div>
      <q-separator class="tw-my-5"/>
      <div class="tw-ml-4 tw-text-gray-400">
        <p class="tw-text-left tw-text-lg tw-leading-loose">组成</p>
        <MenuPanelDown/>
      </div>
    </div>
    <div class="tw-sticky tw-inset-x-0 tw-bottom-0 tw-flex tw-py-2 tw-bg-white tw-items-center tw-justify-evenly">
      <div class="tw-px-1">
        <svg-icon class="tw-h-4 tw-w-4 tw-transition-all tw-cursor-pointer tw-text-gray-400 hover:tw-text-sky-400" name="search">
        </svg-icon>
        <q-tooltip self="top middle" transition-hide="scale" transition-show="scale">
          搜索
        </q-tooltip>
      </div>
    </div>
  </div>
</template>


<script lang="jsx" setup>
import { storeToRefs } from 'pinia'
import { QExpansionItem, QItem, QList } from 'quasar'
import { useStore } from 'stores/example-store'
import { computed, inject, ref } from 'vue'

const { categories } = storeToRefs(useStore());
const blogger = inject('blogger');
const avatar = inject('avatar');

//分类
const items = categories.value.items
                        .slice(0, 6)
                        .map(T => ({ name: T.name, icon: T.icon, url_: `/categories/${ T.id }`, count: T.articleCount }));
//查看更多分类
if (categories.value.totalCount > 6) {
    items.push({ name: '更多', svg: 'more', url: '/categories' });
}

const MenuItemsDown = ref([
    {
        name: '分类', svg: 'classify', url: '', child: items
    },
    {
        name: '页面', svg: 'page_out', url: '',
        child: [
            { name: '关于我', svg: 'about', url: '/about' },
            { name: '地图', svg: 'a_map', url: '/tool/map' },
            { name: '天气', svg: 'weather', url: '/tool/weather' },
        ]
    },
    {
        name: '链接', svg: 'link', url: '',
        child: [
            { name: '哔哩哔哩', svg: 'bilibili', href: 'https://space.bilibili.com/522577863?spm_id_from=666.4.0.0', target: '_blank' },
            { name: 'GitHub', svg: 'github_out', href: 'https://gitHub.com/wonder-light', target: '_blank' },
            { name: 'Gitee', svg: 'gitee', href: 'https://gitee.com/wonder-light', target: '_blank' },
        ]
    }
]);
//上部分菜单
const MenuPanelUp = getMenuElement([
    { name: '首页', svg: 'home-page', url: '/' },
    { name: '仓库', svg: 'storage', url: '/storage' },
    { name: '相册', svg: 'album', url: '/album' },
    //{ name: '音乐', svg: 'music', url: '/music' },
    { name: '文章', svg: 'article', url: '/article' },
    { name: '归档', svg: 'archive', url: '/archive' },
    {
        name: '关于', svg: 'about', url: '',
        child: [
            { name: '关于我', svg: 'about', url: '/about' },
            //{ name: '留言板', svg: 'guestbook', url: '/guestbook' }
        ]
    },
]);
//下部分菜单
const MenuPanelDown = computed(() => getMenuElement(MenuItemsDown.value));

//菜单创建函数
function getMenuElement(Menu) {
    //获取菜单项
    function getItem(item, level = 0) {
        //子菜单
        if (item.child != null) {
            return getSubItem(item, level);
        }
        let itemElement;
        //分类菜单
        if (item.icon != null) {
            itemElement = <div className="tw-w-full tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-justify-center tw-items-center">
                    <span className="tw-mr-4 tw-w-4">
                        <img loading="lazy" alt="icon" src={ item.icon }/>
                    </span>
                    <p>{ item.name }</p>
                </div>
                <span className="tw-text-sm tw-leading-none tw-py-0.5 tw-px-2 tw-mr-3 tw-rounded-xl tw-text-white tw-bg-sky-400/80">
                    { item.count }
                </span>
            </div>;
        }
        //一般菜单
        else {
            itemElement = <div className="tw-flex tw-justify-center tw-items-center">
                <SvgIcon class="tw-mr-4" name={ item.svg }/>
                <span>{ item.name }</span>
            </div>;
        }
        return (
            <QItem exact inset-level={ level } tabindex={ item.url } clickable Ripple to={ item.url } href={ item.href } target={ item.target }
                   active-class="tw-text-blue-300">
                { itemElement }
            </QItem>
        );
    }
    
    //获取扩展菜单项
    function getSubItem(items, level = 0) {
        level += 0.5;
        return (
            <QExpansionItem header-inset-level={ level - 0.5 } expand-separator expand-icon-class="tw-text-gray-300">
                { {
                    header: () => <div className="tw-w-full tw-text-left">
                        <SvgIcon name={ items.svg } class="tw-inline-block tw-mr-4"/>
                        <p className="tw-inline-block">{ items.name }</p>
                    </div>,
                    default: () => items.child.map(T => getItem(T, level))
                } }
            </QExpansionItem>
        );
    }
    
    return <QList>{ Menu.map(T => getItem(T, 0)) }</QList>;
}
</script>
