from playwright.sync_api import sync_playwright
import time

def verify_game_load():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            print("Navigating to Home...")
            page.goto("http://localhost:4173/#/home")

            # Wait for game cards
            print("Waiting for game cards...")
            page.wait_for_selector("text=All Games", timeout=30000)

            # Click on the game title "1V1Lol" to trigger card navigation
            print("Clicking on a game card (1V1Lol)...")
            try:
                page.get_by_text("1V1Lol").first.click(timeout=5000)
            except:
                print("Click failed, forcing navigation")

            # Wait a bit
            time.sleep(2)
            print(f"URL after click: {page.url}")

            if "play" not in page.url:
                print("Navigation failed, trying direct navigation...")
                page.goto("http://localhost:4173/#/play/1v1lol")

            # Wait for GamePlayer content
            print("Waiting for GamePlayer...")
            # Wait for "SYSTEM_READY" which is part of loading screen
            try:
                page.wait_for_selector("text=SYSTEM_READY", timeout=10000)
                print("Loading screen detected.")
            except:
                print("Loading screen not detected (maybe fast?), checking for iframe...")

            # Wait for iframe
            print("Waiting for iframe...")
            page.wait_for_selector("iframe", timeout=40000)

            print("Checking iframe attributes...")
            iframe = page.locator("iframe")

            # Verify sandbox attribute
            sandbox_attr = iframe.get_attribute("sandbox")
            print(f"Sandbox attribute: {sandbox_attr}")

            if sandbox_attr == "allow-scripts allow-forms allow-popups allow-pointer-lock":
                print("VERIFICATION SUCCESS: Sandbox attribute is correct.")
            else:
                 print(f"VERIFICATION FAILURE: Sandbox attribute is {sandbox_attr}")

            # Take a screenshot
            time.sleep(2)
            page.screenshot(path="verification/game_load.png")
            print("Screenshot saved to verification/game_load.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    verify_game_load()
