// process.env.NODE_ENV = 'production'

// import { build as viteBuild } from 'vite'
// import chalk from 'chalk'

// const TAG = chalk.bgBlue('[build.mjs]')

// const viteConfigs = {
//   main: 'configs/vite.main.ts',
//   preload: 'configs/vite.preload.ts',
//   renderer: 'configs/vite.renderer.ts',
// }

// async function buildElectron() {
//   for (const [name, configPath] of Object.entries(viteConfigs)) {
//     console.group(TAG, name)
//     await viteBuild({
//       configFile: configPath,
//       mode: process.env.NODE_ENV,
//     })
//     console.groupEnd()
//     console.log() // for beautiful log.
//   }
// }

// // bootstrap
// await buildElectron()

// filepath: scripts/build.mjs
import { build } from 'vite'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function buildMain() {
  console.log('[build.mjs] building main process...')
  await build({
    configFile: join(__dirname, '../configs/vite.main.ts'),
  })
}

async function buildPreload() {
  console.log('[build.mjs] building preload...')
  await build({
    configFile: join(__dirname, '../configs/vite.preload.ts'),
  })
}

async function buildRenderer() {
  console.log('[build.mjs] building renderer...')
  await build({
    configFile: join(__dirname, '../configs/vite.renderer.ts'),
  })
}

async function buildAll() {
  try {
    await buildMain()
    await buildPreload()
    await buildRenderer()
    console.log('[build.mjs] All builds completed successfully')
  } catch (error) {
    console.error('[build.mjs] Build failed:', error)
    process.exit(1)
  }
}

buildAll()
