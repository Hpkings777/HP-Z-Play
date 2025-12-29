
import asyncio
from playwright.async_api import async_playwright, expect

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Navigate to home and then settings (using correct port 3000)
        await page.goto("http://localhost:3000/#/settings")

        # Wait for the settings page to load - target the heading
        try:
            await expect(page.get_by_role("heading", name="Settings")).to_be_visible(timeout=5000)
            await expect(page.get_by_text("Push Notifications")).to_be_visible()
        except Exception as e:
            print(f"❌ Page load failed: {e}")
            await page.screenshot(path="verification/page_load_fail.png")
            await browser.close()
            return

        # Find the Toggle button for "Push Notifications" using the role
        toggle = page.get_by_role("switch", name="Push Notifications")

        # Check if it exists
        if await toggle.count() > 0:
            print("✅ Found switch with accessible name 'Push Notifications'")

            # Check checked state (default is true in code)
            is_checked = await toggle.get_attribute("aria-checked")
            print(f"✅ Initial aria-checked state: {is_checked}")

            # Click it to toggle
            await toggle.click()
            await page.wait_for_timeout(500) # wait for animation

            is_checked_after = await toggle.get_attribute("aria-checked")
            print(f"✅ Post-click aria-checked state: {is_checked_after}")

            # Take screenshot
            await toggle.focus()
            await page.screenshot(path="verification/settings_accessibility.png")
            print("✅ Screenshot saved")

        else:
            print("❌ Could not find switch by accessible name. Checking DOM...")
            await page.screenshot(path="verification/settings_failure.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
