from playwright.sync_api import sync_playwright

def verify_game_card_a11y():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the app
        print("Navigating to app...")
        page.goto("http://localhost:4173/#/home")

        # Wait and print content if selectors fail
        page.wait_for_timeout(5000)

        # Check if we are on landing page or home
        title = page.title()
        print(f"Page title: {title}")

        # Try to find any button to see if page loaded
        buttons = page.locator("button").all()
        print(f"Found {len(buttons)} buttons on the page.")

        if len(buttons) == 0:
            print("No buttons found. Dumping body text:")
            print(page.locator("body").inner_text())
            page.screenshot(path="verification/debug_page.png")
            return

        # Find the first game card's favorite button
        # It should now have aria-label "Add to favorites" (assuming not favored yet)
        fav_btn = page.locator("button[aria-label='Add to favorites']").first

        if fav_btn.count() > 0:
            print("Found Favorite button with aria-label='Add to favorites'")

            # Check for aria-pressed
            aria_pressed = fav_btn.get_attribute("aria-pressed")
            print(f"Favorite button aria-pressed: {aria_pressed}")

            if aria_pressed == "false":
                print("aria-pressed is correct")
            else:
                print("aria-pressed is incorrect")

            # Check for title
            title_attr = fav_btn.get_attribute("title")
            print(f"Favorite button title: {title_attr}")
        else:
            print("Did not find Favorite button with aria-label")

        # Find the first Play button
        # It should have aria-label starting with "Play "
        # We need to find one.
        play_btn = page.locator("button:has-text('PLAY')").first

        if play_btn.count() > 0:
            aria_label = play_btn.get_attribute("aria-label")
            print(f"Play button aria-label: {aria_label}")
            if aria_label and aria_label.startswith("Play "):
                print("Play button has correct aria-label prefix")
            else:
                print("Play button missing correct aria-label")

            # Focus on the play button to test group-focus-within
            play_btn.focus()
            page.wait_for_timeout(500)

            # Take a screenshot to verify visual state (info box should be visible)
            page.screenshot(path="verification/game_card_focus.png")
            print("Screenshot taken at verification/game_card_focus.png")
        else:
            print("Did not find Play button")

        browser.close()

if __name__ == "__main__":
    verify_game_card_a11y()
