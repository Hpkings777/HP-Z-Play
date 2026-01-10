from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to home...")
        page.goto("http://localhost:4173/#/home")

        # Wait for "All Games" or "Featured" or similar text which indicates content loaded.
        # Looking at Home.tsx might reveal what text to wait for.
        # Based on previous output, I saw "Live Games" in the Landing page, but we are in Home.
        # Let's wait for a button with aria-label="Add to favorites" which we know exists in GameCard.
        # But first we need to wait for the loading to finish.

        print("Waiting for content to load...")
        try:
            # Wait up to 10 seconds for a game card
            # A game card has "PLAY" button.
            page.wait_for_selector('text=PLAY', timeout=15000)
        except Exception as e:
            print(f"Timeout waiting for content: {e}")
            page.screenshot(path="verification/timeout.png")
            # Dump content to see what's there
            with open("verification/timeout.html", "w") as f:
                f.write(page.content())
            return

        print("Content loaded. Checking accessibility...")

        # Find a favorite button
        favorite_btn = page.locator('button[aria-label="Add to favorites"]').first

        # Verify it exists and is visible
        expect(favorite_btn).to_be_visible()

        # Check aria-pressed is false
        expect(favorite_btn).to_have_attribute("aria-pressed", "false")

        print("Initial state verified.")

        # Click it
        favorite_btn.click()

        # Now it should be "Remove from favorites" and aria-pressed="true"
        remove_btn = page.locator('button[aria-label="Remove from favorites"]').first
        expect(remove_btn).to_be_visible()
        expect(remove_btn).to_have_attribute("aria-pressed", "true")

        print("Toggle state verified.")

        # Also check Play button
        play_btn = page.locator('button[aria-label^="Play "]').first
        expect(play_btn).to_be_visible()

        print("Play button verified.")

        # Take a screenshot
        page.screenshot(path="verification/accessibility_check.png")

        print("Accessibility verification passed!")

        browser.close()

if __name__ == "__main__":
    run()
