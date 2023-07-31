import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  dotenv.config({ path: `.env.${mode}` })
  return {
    plugins: [react()],
    server: {
      open: true,
    },
    build: {
      outDir: "build",
      sourcemap: true,
      chunkSizeWarningLimit: 10000000,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
  }
})
