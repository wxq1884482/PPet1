// import { join } from 'path'
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import vitePluginImp from 'vite-plugin-imp'
// import pkg from '../package.json'

// // https://vitejs.dev/config/
// export default defineConfig({
//   mode: process.env.NODE_ENV,
//   root: join(__dirname, '../src/renderer'),
//   plugins: [
//     react(),
//     vitePluginImp({
//       libList: [
//         {
//           libName: 'antd',
//           style(name) {
//             // use less
//             return `antd/es/${name}/style/index.js`
//           },
//         },
//       ],
//     }),
//   ],
//   css: {
//     preprocessorOptions: {
//       less: {
//         javascriptEnabled: true,
//       },
//     },
//   },
//   base: './',
//   build: {
//     emptyOutDir: true,
//     outDir: '../../dist/renderer',
//   },
//   resolve: {
//     alias: {
//       '@src': join(__dirname, '../src'),
//     },
//   },
//   server: {
//     host: pkg.env.HOST,
//     port: pkg.env.PORT,
//   },
// })

import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from '../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/renderer'),
  plugins: [
    react(),
    // 移除已废弃的 vite-plugin-imp，使用 Vite 内置的按需导入
    {
      name: 'antd-import',
      config(config) {
        config.optimizeDeps = config.optimizeDeps || {}
        config.optimizeDeps.include = config.optimizeDeps.include || []
        config.optimizeDeps.include.push('antd')
      }
    }
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer',
  },
  resolve: {
    alias: {
      '@src': join(__dirname, '../src'),
    },
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
})
