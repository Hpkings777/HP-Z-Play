from playwright.sync_api import sync_playwright

def verify_game_card_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page
        try:
            page.goto("http://localhost:3000/#/home")
        except:
            pass

        # Wait for loading spinner to DISAPPEAR
        # The spinner has class 'w-16 h-16 border-4 ...'
        try:
            # Wait for "All Games" text which appears after loading
            page.wait_for_selector('text="All Games"', timeout=10000)
        except Exception as e:
            print(f"Timed out waiting for content: {e}")
            page.screenshot(path="verification/timeout.png")
            # Dump HTML
            with open("verification/dump.html", "w") as f:
                f.write(page.content())
            return

        # Select the first "Add to favorites" button
        favorite_btn = page.locator('button[aria-label="Add to favorites"]').first

        # Wait for it to be visible
        try:
            favorite_btn.wait_for(state="visible", timeout=5000)

            if favorite_btn.count() > 0:
                print("Found 'Add to favorites' button.")

                # Take a screenshot of the button area
                favorite_btn.screenshot(path="verification/favorite_button.png")

                # Click it to toggle state
                favorite_btn.click()

                # Verify label changes to "Remove from favorites"
                remove_btn = page.locator('button[aria-label="Remove from favorites"]').first
                try:
                    remove_btn.wait_for(state="visible", timeout=2000)
                    print("Button state changed to 'Remove from favorites'.")
                    remove_btn.screenshot(path="verification/favorite_button_active.png")
                except:
                    print("Failed to observe state change.")

                # Take a full screenshot
                page.screenshot(path="verification/full_page.png")

            else:
                print("Could not find button with aria-label='Add to favorites'.")

        except Exception as e:
            print(f"Error finding button: {e}")
            page.screenshot(path="verification/error.png")
            with open("verification/dump.html", "w") as f:
                f.write(page.content())

        browser.close()

if __name__ == "__main__":
    verify_game_card_accessibility()
