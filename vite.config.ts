/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-19 16:21:52
 * @LastEditors: hy
 * @LastEditTime: 2022-06-23 09:54:33
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const isBuild = false
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './mock',
      localEnabled: !isBuild,
      prodEnabled: isBuild,
      supportTs: true,
      //  这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
    }),
    PkgConfig(),
    OptimizationPersist(),
    // Components({
    //   // allow auto load markdown components under `./src/components/`
    //   extensions: ['vue', 'md'],
    //   // allow auto import and register components used in markdown
    //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    //   resolvers: [
    //     ElementPlusResolver({
    //       importStyle: 'sass',
    //     }),
    //   ],
    //   dts: 'src/components.d.ts',
    // }),
  ],
  server: {
    hmr: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/element-variables.scss" as *;@import "./src/styles/global.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
})
