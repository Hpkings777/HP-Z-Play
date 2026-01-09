from playwright.sync_api import sync_playwright

def verify_game_card_a11y():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to ensure multiple cards are visible
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        # Navigate to home
        # The prompt says production deployment is https://hp-z-play.vercel.app
        # But we are running locally on port 4173 (preview)
        # The app uses HashRouter so we should go to /#/home
        page.goto("http://localhost:4173/#/home")

        # Wait for game cards to load (simulated delay)
        # We can wait for a specific selector
        page.wait_for_selector('button[aria-label="Add to favorites"]', timeout=10000)

        # Get the first Favorite button
        fav_btn = page.locator('button[aria-label="Add to favorites"]').first

        # Focus it
        fav_btn.focus()

        # Verify aria-label exists (implicit by locator above, but good to check)
        print(f"Fav button label: {fav_btn.get_attribute('aria-label')}")
        print(f"Fav button title: {fav_btn.get_attribute('title')}")

        # Verify info box visibility
        # The info box is a sibling of the container holding the fav button's parent...
        # Let's find the info box within the same card.
        # Structure:
        # GameCard (div)
        #   ...
        #   Header (div) -> Fav Button
        #   Bottom Section (div) -> Info Box (div)

        # We can find the card container
        card = page.locator('.group').filter(has=fav_btn).first

        # The info box has text "PLAY" inside a button
        info_box = card.locator('div.bg-white\/95') # Matches the class

        # Check initial state (might be translated, but visible in DOM)
        # We want to check if it is visually moved to position 0
        # This is hard to check via computed style in headless easily for 'transform',
        # but we can take a screenshot and look.

        page.screenshot(path="verification/focus_state.png")
        print("Screenshot taken at verification/focus_state.png")

        browser.close()

if __name__ == "__main__":
    verify_game_card_a11y()
