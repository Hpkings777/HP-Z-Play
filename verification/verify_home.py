from playwright.sync_api import sync_playwright
import time
import os

def run():
    if not os.path.exists("verification"):
        os.makedirs("verification")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:4173/#/home")

        # Wait for content
        try:
            page.wait_for_selector("text=All Games", timeout=10000)
            time.sleep(3) # Wait for animation

            # Screenshot
            page.screenshot(path="verification/home_screenshot.png")
            print("Screenshot saved to verification/home_screenshot.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
