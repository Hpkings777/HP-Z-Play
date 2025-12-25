from playwright.sync_api import sync_playwright

def verify_game_card(page):
    # Navigate to home
    page.goto("http://localhost:3000")

    # Wait for loading to finish (1.2s simulated delay)
    page.wait_for_selector("text=All Games", timeout=5000)

    # Check if cards are visible
    # We look for a card with specific text or just any card
    page.wait_for_selector(".group", state="visible")

    # Take a screenshot of the grid
    page.screenshot(path="verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_game_card(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
