/* eslint-env node */
module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended"
    ],
    "overrides": [
        {
            "files": [
                "cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"
            ],
            "extends": [
                "plugin:cypress/recommended"
            ]
        }
    ],
    settings: {
        "import/resolver": {
            alias: [
                ["@", "./src"]
            ]
        },
    },
    env: {
        //项目中在 .vue 文件中直接使用 node.js 语法可能会报 ESLint 报错, 需要修改下 eslint 的配置，一般 eslint 配置文件为 .eslintrc.js。只需将该项设置为 true 即可
        node: true
    },
    rules: {
        //关闭定义变量未使用提示/报错
        'no-unused-vars': 1,
        'vue/multi-word-component-names': 0,
    },
    globals: {
        "$ref": true,
        "tinymce": true,
    },
    parserOptions: {
        parser: "@babel/eslint-parser",
        sourceType: "module",
        requireConfigFile: false,
    },
};
