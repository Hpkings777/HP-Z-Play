from playwright.sync_api import sync_playwright

def verify_game_card_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        page.goto("http://localhost:3000/#/home")

        # Wait for game cards to load (simulated delay)
        page.wait_for_selector('text=All Games', timeout=10000)

        # Find the first game card
        # The card is a div with onClick, but inside it has the favorite button
        # We need to verify the favorite button has the aria-label

        # Find the first favorite button (star icon)
        # It's an icon-only button, so we look for the button with aria-label "Add to favorites"
        favorite_btn = page.locator('button[aria-label="Add to favorites"]').first

        if favorite_btn.count() > 0:
            print("Found button with aria-label='Add to favorites'")
        else:
            # Maybe it's already favorited?
            favorite_btn = page.locator('button[aria-label="Remove from favorites"]').first
            if favorite_btn.count() > 0:
                print("Found button with aria-label='Remove from favorites'")
            else:
                print("FAIL: Could not find favorite button with correct aria-label")
                # print html for debugging
                # print(page.content())
                browser.close()
                return

        # Also check the Play button
        # It should have aria-label="Play {Title}"
        # Let's just find any button starting with "Play " in aria-label
        play_btn = page.locator('button[aria-label^="Play "]').first
        if play_btn.count() > 0:
            print(f"Found play button with aria-label: {play_btn.get_attribute('aria-label')}")
        else:
             print("FAIL: Could not find Play button with aria-label")

        # Take a screenshot to confirm visually (though aria attributes are invisible)
        # We can inspect the DOM in the screenshot? No.
        # But we can verify the page loads correctly.
        page.screenshot(path="verification/game_card_a11y.png")

        browser.close()

if __name__ == "__main__":
    verify_game_card_accessibility()
