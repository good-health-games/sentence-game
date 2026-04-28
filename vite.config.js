import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // ★ 重要：設定 base 路徑，'/' 後面換成你的 GitHub 儲存庫名稱
  base: '/sentence-game/', 
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // 自動更新 PWA
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: '句子拼拼樂',
        short_name: '句子拼拼樂',
        description: '句子拼拼樂',
        theme_color: '#243c64', // 你的深藍色
        background_color: '#f0f9ff', // sky-50
        display: 'standalone', // 隱藏瀏覽器網址列，像原生 App
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})