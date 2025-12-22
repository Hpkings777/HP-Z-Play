
import asyncio
from playwright.async_api import async_playwright, expect

async def verify_sandbox():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Navigate to a game page (using hash routing)
        # We need to wait for the app to load.
        # Note: 1v1lol is one of the games in config.json
        url = "http://127.0.0.1:3000/#/play/1v1lol"
        print(f"Navigating to {url}")
        await page.goto(url)

        # Wait for the game player to be visible (or the loading screen)
        # The GamePlayer component renders immediately, but has a loading simulation.
        # We need to wait for the iframe to appear. The loading takes 4-6 seconds.
        print("Waiting for iframe...")

        # Wait for iframe to be attached to DOM
        # The iframe is inside motion.div with key="game-view" which appears after loading
        iframe_locator = page.locator("iframe")
        await iframe_locator.wait_for(state="attached", timeout=15000)

        # Check for sandbox attribute
        print("Checking sandbox attribute...")
        sandbox_attr = await iframe_locator.get_attribute("sandbox")
        print(f"Sandbox attribute: {sandbox_attr}")

        expected_sandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
        if sandbox_attr == expected_sandbox:
            print("SUCCESS: Sandbox attribute is correct.")
        else:
            print(f"FAILURE: Sandbox attribute mismatch. Expected '{expected_sandbox}', got '{sandbox_attr}'")
            # We don't exit here, we still want the screenshot

        # Take screenshot
        await page.screenshot(path="verification/sandbox_verification.png")
        print("Screenshot saved to verification/sandbox_verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_sandbox())
