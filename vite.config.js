import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer';
import mkcert from "vite-plugin-mkcert";
import { baseURL } from './src/common/constant.js'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/uni/', // 基础路径，与服务器配置的路由对应
    plugins: [
        uni(),
        viteCompression(), // gzip 压缩
        mkcert(), // 开启https服务
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
    // 请求代理
    server: {
        https: true,   // 需要开启https服务
        proxy: {
            '/api': {
                target: baseURL,  // 本地的https node服务
                secure: false, // 代理https的 需要加此配置
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        rollupOptions: {
            // 忽略打包（使用了cdn资源）
            // external: ['vue', 'vue-router'],
            plugins: [
                // 开启打包分析 
                visualizer({
                    open: true,  //注意这里要设置为true，否则无效
                    gzipSize: true,
                    brotliSize: true
                }),
            ],
            output: {
                // // 拆包
                // manualChunks: {
                //     index: ['src/common/request.js'],
                //     // vue vue-router合并打包
                //     vue: ['vue', 'vue-router'],
                //     echarts: ['echarts'],
                //     lodash: ['lodash'],
                // }
                // 最小化拆分包
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            }
        }
    }
})
