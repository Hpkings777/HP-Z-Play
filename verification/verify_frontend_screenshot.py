
from playwright.sync_api import sync_playwright
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        url = "http://localhost:4173/#/home"
        print(f"Navigating to {url}")

        try:
             page.goto(url)
        except Exception:
             url = "http://localhost:4174/#/home"
             page.goto(url)

        # Wait for loading spinner to disappear and content to load
        print("Waiting for content to load...")
        try:
            page.wait_for_selector('button[aria-label^="Play "]', timeout=15000)
        except:
             print("Timed out waiting for Play buttons.")
             # Fallback screenshot
             page.screenshot(path="verification/timeout_frontend.png")
             return

        # Find the first game card and hover it to show potential focus effects
        # (Though hover in screenshot might be hard, we can at least capture the grid)

        # Take a screenshot of the grid
        screenshot_path = "verification/frontend_verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
