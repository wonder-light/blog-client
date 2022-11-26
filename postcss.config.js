//https://zhuanlan.zhihu.com/p/470589619
//https://github.com/postcss/postcss/blob/main/docs/README-cn.md

module.exports = {
    /*plugins: {
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }*/
    plugins: [
        //require('postcss-import'),
        require('tailwindcss/nesting')(require('postcss-nested')),
        require('tailwindcss'),
        require('autoprefixer'),
        require('cssnano'),
    ]
}
