// @ts-expect-error - The TanStack Start package doesn't correctly expose this in exports for Bundler resolution yet.
import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  server: {
    preset: 'vercel',
  },
})
