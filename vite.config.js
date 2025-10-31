import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 코드 스플리팅 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'utils': ['./src/utils/storage.js']
        }
      }
    },
    // 청크 크기 경고 임계값 (KB)
    chunkSizeWarningLimit: 1000,
    // 소스맵 생성 (프로덕션에서는 false 권장)
    sourcemap: false,
    // 압축 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // console.log 제거
        drop_debugger: true
      }
    }
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: true
    }
  }
})

