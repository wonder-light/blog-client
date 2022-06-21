//提供全局数据
import { ref, watch } from "vue";

export default {
    install: (app) => {
        provideTheme(app);
        provideLanguage(app);
    }
};

//提供主题
function provideTheme(app) {
    //主题
    let theme = ref('light');
    //body 文档
    let body = document.getElementsByTagName('body')[0];
    watch(theme, (new_v) => body.setAttribute('theme', new_v), {immediate: true, flush: 'post'});
    
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
        setTheme('dark');
    }
    
    app.provide('theme', {theme, setTheme});
    
    function setTheme(value) {
        theme.value = value;
    }
}

//提供语言
function provideLanguage(app) {
    let language = ref(localStorage.getItem('language') === 'en' ? 'en' : 'zh-cn');
    
    watch(language, (new_v) => {
        localStorage.setItem('language', new_v);
    }, {immediate: true});
    
    app.provide('language', {language, setLanguage});
    
    function setLanguage(value) {
        language.value = value;
    }
}