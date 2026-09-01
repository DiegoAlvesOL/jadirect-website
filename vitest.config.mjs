import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        environmentOptions: {
            jsdom: {
                url: 'http://localhost:8081',
            },
        },
        execArgv: ['--no-webstorage'],
    },
});