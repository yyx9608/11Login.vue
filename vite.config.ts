import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {

    proxy: {
      '/devServer': {
        target: 'http://1486641sd0.iask.in:35485',
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/devServer/, '')
      },
    }

  }
})
