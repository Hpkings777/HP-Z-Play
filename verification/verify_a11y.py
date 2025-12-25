from playwright.sync_api import sync_playwright

def verify_game_card_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to home page
        page.goto("http://localhost:3000/#/home")

        # Wait for game cards to load (simulated delay in app)
        page.wait_for_selector("text=All Games", timeout=10000)

        # Find the first game card's favorite button
        # It should now have a title "Add to favorites"
        # We can select by title
        fav_btn = page.locator("button[title='Add to favorites']").first

        if fav_btn.count() > 0:
            print("Found Favorite button with title 'Add to favorites'")
            # Check aria-label
            aria_label = fav_btn.get_attribute("aria-label")
            print(f"Aria-label: {aria_label}")
            if "Add" in aria_label and "to favorites" in aria_label:
                print("Aria-label seems correct")
            else:
                print("FAIL: Aria-label incorrect")
        else:
            print("FAIL: Could not find Favorite button with title 'Add to favorites'")

        # Find play button
        # It should have text "PLAY" but also an aria-label "Play [Game Name]"
        # We can find the button by text "PLAY" and check its aria-label
        play_btn = page.locator("button:has-text('PLAY')").first
        if play_btn.count() > 0:
             print("Found Play button")
             aria_label = play_btn.get_attribute("aria-label")
             print(f"Play button Aria-label: {aria_label}")
             if aria_label and "Play" in aria_label:
                 print("Play button has aria-label")
             else:
                 print("FAIL: Play button missing aria-label")

             # Check if icon is hidden
             icon = play_btn.locator("svg").first
             aria_hidden = icon.get_attribute("aria-hidden")
             print(f"Play icon aria-hidden: {aria_hidden}")

        page.screenshot(path="verification/game_card_a11y.png")
        browser.close()

if __name__ == "__main__":
    verify_game_card_accessibility()
