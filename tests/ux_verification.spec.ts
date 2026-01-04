import { test, expect } from '@playwright/test';

test('GameCard UX accessibility check', async ({ page }) => {
  // Go to home page (hash router)
  await page.goto('/#/home');

  // Wait for at least one game card to appear
  await page.waitForSelector('text=PLAY', { timeout: 10000 });

  // Wait for animations to settle
  await page.waitForTimeout(2000);

  // Check for Favorite buttons with accessible labels
  const favoriteButtons = page.locator('button[aria-label*="favorites"]');
  const favoriteCount = await favoriteButtons.count();
  console.log(`Favorite buttons found: ${favoriteCount}`);
  expect(favoriteCount).toBeGreaterThan(0);

  // Check for Play buttons with accessible labels
  const playButtons = page.locator('button[aria-label*="Play"]');
  const playCount = await playButtons.count();
  console.log(`Play buttons found: ${playCount}`);
  expect(playCount).toBeGreaterThan(0);
});
