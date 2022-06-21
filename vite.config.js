import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from "path";

let isProduction = process.env.NODE_ENV === 'production';

// https://cn.vitejs.dev/config/
export default defineConfig({
    root: path.resolve(__dirname, "src"),
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: isProduction ? './' : '/',
    envDir: path.resolve(__dirname, "env"),
    server: {
        port: '6050',
        host: '0.0.0.0',
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    }
});
