<template>
  <div>
    <MenuPanelUp/>
  </div>
</template>

<script lang="jsx" setup>
import { QExpansionItem, QItem, QList } from 'quasar'

const MenuPanelUp = getMenuElement([
    { name: '首页', svg: 'home-page', url: '/' },
    { name: '仓库', svg: 'storage', url: '/warehouse' },
    { name: '相册', svg: 'album', url: '/album' },
    { name: '音乐', svg: 'music', url: '/music' },
    { name: '文章', svg: 'article', url: '/article' },
    { name: '归档', svg: 'archive', url: '/archive' },
    {
        name: '关于', svg: 'about', url: '',
        child: [
            { name: '关于我', svg: 'about', url: '/about' },
            { name: '留言板', svg: 'guestbook', url: '/guestbook' }
        ]
    },
]);

function getMenuElement(Menu) {
    let getItem = (item, level = 0) => {
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
                        <img alt="" src={ item.icon }/>
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
                <p>{ item.name }</p>
            </div>;
        }
        return (
            <QItem inset-level={ level } clickable Ripple to={ item.url } href={ item.href } target={ item.target } active-class="tw-text-blue-300">
                { itemElement }
            </QItem>
        );
    }
    let getSubItem = (items, level = 0) => {
        level += 0.5;
        const slots = {
            header: () => (
                <div className="tw-w-full tw-text-left">
                    <SvgIcon name={ items.svg } class="tw-inline-block tw-mr-4"/>
                    <p className="tw-inline-block">{ items.name }</p>
                </div>
            ),
        };
        return (
            <QExpansionItem v-slots={ slots } header-inset-level={ level - 0.5 } expand-separator expand-icon-class="tw-text-gray-300">
                { items.child.map(T => getItem(T, level)) }
            </QExpansionItem>
        );
    }
    return (<QList>{ Menu.map(T => getItem(T)) }</QList>);
}

</script>
