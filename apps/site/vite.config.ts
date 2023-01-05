import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'

const config: UserConfig = {
    server: {
    port: 3100,
    },
  plugins: [react(), ssr()]
}

export default config
