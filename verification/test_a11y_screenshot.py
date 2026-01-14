import time
from playwright.sync_api import sync_playwright

def test_game_card_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        page.goto("http://localhost:4173/#/home")

        # Wait for game cards to load
        page.wait_for_selector("text=All Games", timeout=10000)

        # Give animation some time
        time.sleep(2)

        # Focus on the first "Add to favorites" button
        # This checks if we can find it by label (accessibility check)
        fav_btn = page.get_by_label("Add to favorites").first
        if not fav_btn.is_visible():
             print("Favorite button not visible by label")

        fav_btn.focus()

        # Take a screenshot of the focused state
        page.screenshot(path="/home/jules/verification/game_card_focus.png")

        # Focus on the "Play" button for the same card
        # Note: The play button label depends on the game title.
        # We'll try to find the first one.

        # Let's find the card title first to construct the label
        card_title = page.locator("h3").first.inner_text()
        print(f"Testing card with title: {card_title}")

        play_btn = page.get_by_label(f"Play {card_title}")
        play_btn.focus()

        # Take another screenshot
        page.screenshot(path="/home/jules/verification/game_card_play_focus.png")

        browser.close()

if __name__ == "__main__":
    test_game_card_accessibility()
