import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/preload'),
  build: {
    outDir: '../../dist/preload',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
    },
    minify: process.env.NODE_ENV === 'production',
    emptyOutDir: true,
    rollupOptions: {
      external: [...builtinModules, 'electron'],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
  },
  resolve: {
    alias: {
      '@src': join(__dirname, '../src'),
    },
  },
})
// export default defineConfig({
//   build: {
//     target: 'electron-main',  // 明确指定目标为 Electron 主进程
//     rollupOptions: {
//       external: [],           // 取消外部化所有依赖
//     },
//   },
//   define: {
//     __dirname: '__dirname',   // 保留 Node.js 的 __dirname 变量
//   },
// });
