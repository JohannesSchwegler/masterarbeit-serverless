import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

export default defineConfig({
    server: {
        port: 8000,
    },
    resolve: {
        alias: {
            // The import of the module is relative by default,
            // but you want to set an alias to always refer to the same root.
            '@': resolve(__dirname, 'src'),
        },
    },
    plugins: [vue()],
})
