from playwright.sync_api import sync_playwright, expect

def verify_game_card():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000/#/")

            # Wait for loading animation to finish (simulated 1.2s delay)
            print("Waiting for loading to finish...")
            page.wait_for_selector("text=All Games", timeout=60000)

            # Check if game cards are visible
            print("Checking for game cards...")
            # Use a robust selector for game cards. They have text "PLAY"
            cards = page.locator("text=PLAY")
            # Wait for at least one card
            cards.first.wait_for(timeout=30000)

            count = cards.count()
            print(f"Found {count} game cards")

            if count > 0:
                page.screenshot(path="verification/game_cards_visible.png")
                print("Screenshot saved to verification/game_cards_visible.png")
            else:
                print("No game cards found!")
                page.screenshot(path="verification/no_cards.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_game_card()
