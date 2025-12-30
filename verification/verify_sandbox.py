
import time
from playwright.sync_api import sync_playwright

def verify_sandbox():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to the home page first
        try:
            page.goto("http://localhost:3000/#/", timeout=60000)

            # Wait for any game card to appear.
            # We need to simulate a user click to get to the GamePlayer.
            # Let's find a game card.
            page.wait_for_selector('text=All Games', timeout=30000)

            # Click on the first game card
            # The structure is messy, let's try to click a generic game card or navigate directly.
            # Navigating directly to a known game ID is safer.
            # "2048" seems like a safe bet from the file list.

            print("Navigating to GamePlayer...")
            page.goto("http://localhost:3000/#/play/2048")

            # Wait for the iframe to load (loading simulation takes 4-6 seconds)
            print("Waiting for game to load (simulated delay)...")
            time.sleep(8)

            # Now find the iframe
            iframe_handle = page.query_selector('iframe')

            if iframe_handle:
                sandbox_attr = iframe_handle.get_attribute('sandbox')
                print(f"Found iframe with sandbox attribute: {sandbox_attr}")

                expected_flags = [
                    "allow-scripts",
                    "allow-same-origin",
                    "allow-forms",
                    "allow-popups",
                    "allow-pointer-lock"
                ]

                if sandbox_attr:
                    missing = [flag for flag in expected_flags if flag not in sandbox_attr]
                    if not missing:
                        print("SUCCESS: All sandbox flags present.")
                    else:
                        print(f"FAILURE: Missing flags: {missing}")
                else:
                    print("FAILURE: Sandbox attribute missing.")

                # Take screenshot
                page.screenshot(path="verification/sandbox_verification.png")
            else:
                print("FAILURE: Iframe not found.")
                page.screenshot(path="verification/failure.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_sandbox()
