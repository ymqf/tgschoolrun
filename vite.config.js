import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    cssMinify: true,
    // Vite 8 默认使用 esbuild 压缩，无需额外配置
    rollupOptions: {
      output: {
        manualChunks: function(id) {
          // React 核心包
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('react-icons')) {
            return 'react-vendor';
          }
          // GSAP 动画库
          if (id.includes('gsap') || id.includes('@gsap')) {
            return 'gsap-vendor';
          }
          // Lucide React 图标库
          if (id.includes('lucide-react')) {
            return 'ui-vendor';
          }
        }
      }
    }
  }
})
