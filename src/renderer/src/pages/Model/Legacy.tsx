import React, { FC, useEffect, useRef } from 'react'

// export type LegacyType = { modelPath: string; width: number; height: number }

// const Legacy: FC<LegacyType> = ({ modelPath, height, width }) => {
//   const isMountRef = useRef(false)

//   useEffect(() => {
//     ;(window as any).loadlive2d('live2d', modelPath)
//   }, [modelPath])

//   useEffect(() => {
//     //  使用 key={+new Date()} 会导致渲染模型不完整，这里暂时对窗口改变时进行刷新
//     // TODO
//     if (isMountRef.current) {
//       window.location.reload()
//     } else {
//       isMountRef.current = true
//     }
//   }, [height, width])

//   return (
//     <canvas
//       id={'live2d'}
//       className="live2d"
//       width={width}
//       height={height}
//     ></canvas>
//   )
// }

export default React.memo(Legacy)

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
