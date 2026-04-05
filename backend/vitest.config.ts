import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000,
    hookTimeout: 15000,

    include: ['tests/**/*.test.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/server.ts',
        'src/generated/**',
        'src/config/env.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },

  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@config': new URL('./src/config', import.meta.url).pathname,
      '@modules': new URL('./src/modules', import.meta.url).pathname,
      '@middleware': new URL('./src/middleware', import.meta.url).pathname,
      '@domain': new URL('./src/domain', import.meta.url).pathname,
      '@shared': new URL('./src/shared', import.meta.url).pathname,
      '@generated': new URL('./src/generated', import.meta.url).pathname,
    },
  },
})