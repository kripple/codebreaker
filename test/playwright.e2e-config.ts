import { defineConfig } from '@playwright/test';

const name = 'e2e' as const;

export default defineConfig({
  fullyParallel: true,
  outputDir: name,
  reporter: 'line',
  testDir: '../src',
  testMatch: `**/*.${name}.ts`,
});
