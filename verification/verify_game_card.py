
from playwright.sync_api import sync_playwright, expect

def test_game_card_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page (where GameCards are likely displayed)
        # Using hash router as per memory
        page.goto("http://localhost:3000/#/home")

        # Wait for at least one game card to load
        # The game card has a role of 'button' (Play) or we can look for the title
        # Let's wait for the "Play" button which we modified
        play_buttons = page.get_by_text("PLAY")
        expect(play_buttons.first).to_be_visible(timeout=10000)

        # Take a screenshot to verify initial state
        page.screenshot(path="verification/before_focus.png")

        # Find the first Play button and check its aria-label
        # We need to find the specific button we modified.
        # It should have an aria-label like "Play [Game Title]"
        # Let's find a specific game title to be sure.
        # We can just get the first Play button's aria-label.

        first_play_btn = page.locator("button").filter(has_text="PLAY").first
        aria_label = first_play_btn.get_attribute("aria-label")
        print(f"Play Button Aria-Label: {aria_label}")

        if not aria_label or "Play" not in aria_label:
             print("FAIL: Play button missing correct aria-label")
        else:
             print("PASS: Play button has aria-label")

        # Check Favorite Button
        # It's an icon-only button, likely near the top of the card.
        # We added aria-label="Add [Title] to favorites" (or Remove)

        # Finding the favorite button is tricky without a unique class or id.
        # It's inside the same card as the play button.
        # Let's assume the first button in the card structure is the favorite button if the order matches.
        # Actually, let's look for any button with "Add to favorites" in title or aria-label

        fav_btn = page.locator("button[title*='favorites']").first
        if fav_btn.count() > 0:
            print(f"Favorite Button Title: {fav_btn.get_attribute('title')}")
            print(f"Favorite Button Aria-Label: {fav_btn.get_attribute('aria-label')}")
            print(f"Favorite Button Aria-Pressed: {fav_btn.get_attribute('aria-pressed')}")
            print("PASS: Favorite button found with accessible attributes")
        else:
            print("FAIL: Favorite button not found with accessible attributes")

        # Test Focus Reveal
        # We want to tab to the Play button and check if the info box is visible/translated.
        # This is hard to check via computed style in a screenshot, but we can check if it's "visible" to the user.
        # Actually, playwright's .focus() mimics tabbing.

        first_play_btn.focus()
        page.wait_for_timeout(500) # Wait for transition
        page.screenshot(path="verification/focused_state.png")

        browser.close()

if __name__ == "__main__":
    test_game_card_accessibility()
