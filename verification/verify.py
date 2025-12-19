from playwright.sync_api import sync_playwright

def verify_game_card(page):
    # Navigate to home
    page.goto("http://127.0.0.1:3000/#/home")

    # Wait for loading to finish (simulated delay)
    page.wait_for_selector("text=All Games", timeout=10000)

    # Wait for game cards
    page.wait_for_selector(".grid", timeout=5000)

    # Take a screenshot to verify cards are rendered
    page.screenshot(path="verification/verification.png")
    print("Screenshot saved to verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_game_card(page)
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            browser.close()
