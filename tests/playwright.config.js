import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour les tests E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* Timeout global pour chaque test */
  timeout: 30 * 1000,
  expect: {
    /* Timeout pour les assertions */
    timeout: 5000
  },
  /* Échec rapide si 3 tests échouent */
  forbidOnly: !!process.env.CI,
  /* Retry sur CI uniquement */
  retries: process.env.CI ? 2 : 0,
  /* Parallélisation */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter */
  reporter: 'html',
  /* Configuration partagée pour tous les projets */
  use: {
    /* URL de base pour toutes les actions */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    /* Collecte de traces lors d'un échec */
    trace: 'on-first-retry',
    /* Screenshots lors d'échecs */
    screenshot: 'only-on-failure',
  },

  /* Configuration des navigateurs de test */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Skip other browsers in CI to speed up tests
    ...(!process.env.CI ? [
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },

      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ] : []),
  ],

  /* Configuration pour Docker */
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
