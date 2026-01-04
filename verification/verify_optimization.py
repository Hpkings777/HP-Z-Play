from playwright.sync_api import sync_playwright

def verify_game_card(page):
    # Navigate to the home page (preview runs on port 4173)
    page.goto("http://localhost:4173/#/home")

    # Wait for the loading animation to finish and games to appear
    # The home page has a simulated delay of 1200ms
    page.wait_for_selector("text=All Games", timeout=5000)

    # Wait for game cards to render
    page.wait_for_selector(".grid", timeout=5000)

    # Check if we can see the "2048" game card
    page.wait_for_selector("text=2048", timeout=2000)

    # Take a screenshot
    page.screenshot(path="verification/home_games.png")
    print("Screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_game_card(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
