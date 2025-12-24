from playwright.sync_api import sync_playwright

def verify_game_card_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page (assuming local server is running on port 3000)
        # Using hash router as per memory instructions
        page.goto("http://localhost:3000/#/home")

        # Wait for game cards to load
        # Since the memory says there's a 1.2s simulated loading delay, we wait for a selector
        page.wait_for_selector('button[aria-label="Add to favorites"]', timeout=10000)

        # Find the first favorite button
        favorite_button = page.locator('button[aria-label="Add to favorites"]').first

        # Verify initial attributes
        aria_label = favorite_button.get_attribute("aria-label")
        title = favorite_button.get_attribute("title")

        print(f"Initial State - aria-label: {aria_label}, title: {title}")

        if aria_label != "Add to favorites":
            print("FAILED: aria-label incorrect")
        if title != "Add to favorites":
            print("FAILED: title incorrect")

        # Click to toggle favorite
        favorite_button.click()

        # Verify updated attributes (should be 'Remove from favorites')
        # We need to wait for the change to reflect
        page.wait_for_selector('button[aria-label="Remove from favorites"]', timeout=2000)

        updated_button = page.locator('button[aria-label="Remove from favorites"]').first
        updated_aria_label = updated_button.get_attribute("aria-label")
        updated_title = updated_button.get_attribute("title")

        print(f"Updated State - aria-label: {updated_aria_label}, title: {updated_title}")

        if updated_aria_label != "Remove from favorites":
            print("FAILED: Updated aria-label incorrect")
        if updated_title != "Remove from favorites":
            print("FAILED: Updated title incorrect")

        # Take a screenshot
        page.screenshot(path="verification/game_card_verified.png")

        browser.close()

if __name__ == "__main__":
    verify_game_card_accessibility()
