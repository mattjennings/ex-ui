import { defineConfig } from 'vite'
import { default as AutoImport } from 'unplugin-auto-import/vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  server: {},
  optimizeDeps: {
    force: true,
    // only necessary if running local build of excalibur-ui. if installed from npm, remove this
    // exclude: ['excalibur-ui',],
  },
  resolve: {
    dedupe: ['solid-js', 'excalibur-ui'],
  },
  plugins: [
    // automatically expose global 'ex' variable that will compile into
    // import { XYZ } from 'excalibur' for tree shaking
    AutoImport({
      imports: [
        {
          excalibur: [['*', 'ex']],
        },
      ],
      dts: './src/ex.d.ts',
    }),
    solidPlugin({
      solid: {
        moduleName: 'excalibur-ui',
        generate: 'universal',
      },
    }),
    // force full page reload on any change. HMR does not work with JSX
    {
      name: 'full-reload',
      handleHotUpdate({ server }) {
        server.ws.send({ type: 'full-reload' })
        return []
      },
    },
  ],
})
