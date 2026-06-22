import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ['tests/vitest-setup.ts'],
        globals: true,
        environment: "jsdom", // really needed for testing-library to see document and window objects
    },
})