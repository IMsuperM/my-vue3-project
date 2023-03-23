import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import commonjs from "@rollup/plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer';

const globals = externalGlobals({
    vue: "Vue",
    'vue-router': 'VueRouter',
})

// https://vitejs.dev/config/
export default defineConfig({
    base: '/uni/', // 基础路径
    plugins: [
        uni(),
        viteCompression(), // gzip 压缩
    ],
    resolve: {
        // 配置别名
        alias: {
            '@': resolve(__dirname, 'src'),
        }
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                // 因为uni.scss可以全局使用，这里根据自己的需求调整
                additionalData: '@import "./src/static/styles/global.scss";'
            }
        }
    },
    build: {
        rollupOptions: {
            // 忽略打包
            external: ['vue','vue-router'],
            plugins: [
                visualizer({
                    open: true,  //注意这里要设置为true，否则无效
                    gzipSize: true,
                    brotliSize: true
                }),  // 打包分析
                globals, commonjs(),
            ],
            // output: {
            //     // 拆包
            //     manualChunks: {
            //         'vue': ['Vue'],
            //         'vue-router': ['VueRouter'],
            //     }
            // }
        }
    }
})
