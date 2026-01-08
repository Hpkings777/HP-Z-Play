
import { test, expect } from '@playwright/test';

test('Game iframe should have sandbox attribute', async ({ page }) => {
  // Navigate to a game page (using a known game ID from config.json, e.g., 2048)
  await page.goto('http://localhost:4173/#/play/2048');

  // Wait for the iframe to appear (it might take a while due to simulated loading)
  // The loading screen lasts 4-6 seconds, so we increase timeout
  const iframe = page.locator('iframe[title="2048"]');
  await iframe.waitFor({ state: 'attached', timeout: 10000 });
  await expect(iframe).toBeVisible({ timeout: 10000 });

  // check for sandbox attribute
  const sandbox = await iframe.getAttribute('sandbox');

  // This expectation should fail currently because the attribute is missing
  expect(sandbox).not.toBeNull();
  expect(sandbox).toContain('allow-scripts');
  expect(sandbox).toContain('allow-forms');
  expect(sandbox).not.toContain('allow-same-origin');
});
