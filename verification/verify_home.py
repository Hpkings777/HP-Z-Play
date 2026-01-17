import time
from playwright.sync_api import sync_playwright

def verify_home_load_time():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        start_time = time.time()
        # Navigate to the home page (assuming hash router)
        page.goto("http://localhost:3000/#/home", wait_until="domcontentloaded")

        # Wait for the "All Games" text to be visible
        try:
            # We look for the h2 containing "All Games"
            page.wait_for_selector("h2:has-text('All Games')", timeout=5000)
            end_time = time.time()

            load_time = end_time - start_time
            print(f"SUCCESS: Home page loaded. 'All Games' visible.")
            print(f"Load time (including navigation): {load_time:.4f} seconds")
            page.screenshot(path="verification/verification.png")

        except Exception as e:
            print(f"FAILURE: 'All Games' header not found within timeout.")
            print(e)
            # Take a screenshot for debugging
            page.screenshot(path="verification/failure.png")

        browser.close()

if __name__ == "__main__":
    verify_home_load_time()
