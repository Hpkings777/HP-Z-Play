
import asyncio
from playwright.async_api import async_playwright, expect

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to home (hash router)
        await page.goto("http://localhost:3000/#/home", timeout=60000)

        print("Navigated to /#/home")

        # Wait for game cards to appear. They might take a simulated delay.
        # We can wait for the first button with "Add to favorites" title.
        fav_btn = page.locator('button[title="Add to favorites"]').first

        try:
            await expect(fav_btn).to_be_visible(timeout=15000)
        except:
            print("Button not found. Taking screenshot of failure.")
            await page.screenshot(path="verification/failure_home.png")
            raise

        # Get the aria-label
        aria_label = await fav_btn.get_attribute("aria-label")
        print(f"ARIA Label found: {aria_label}")

        # Verify it contains "Add" and "to favorites"
        assert "Add" in aria_label
        assert "to favorites" in aria_label

        # Click it to toggle
        await fav_btn.click()

        # Wait a bit for state update
        await page.wait_for_timeout(1000)

        # Now it should say "Remove from favorites"
        fav_btn_after = page.locator('button[title="Remove from favorites"]').first

        try:
            await expect(fav_btn_after).to_be_visible(timeout=5000)
        except:
             print("Remove button not found")
             await page.screenshot(path="verification/failure_toggle.png")
             raise

        aria_label_after = await fav_btn_after.get_attribute("aria-label")
        print(f"ARIA Label after click: {aria_label_after}")

        assert "Remove" in aria_label_after

        # Take screenshot
        await page.screenshot(path="verification/a11y_check.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
