import time
from playwright.sync_api import sync_playwright

def verify_a11y():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        # Use explicit hash navigation because it's a HashRouter app and might default to Landing
        page.goto("http://localhost:3000/#/home")

        # Wait for content to load - increase timeout and use a more generic selector first to ensure app loaded
        try:
            page.wait_for_selector('div#root', timeout=5000)
            print("✅ Root element found")
            # Wait for ANY text to appear to confirm app is running
            page.wait_for_selector('text=HP Z-Play', timeout=5000)
            print("✅ App loaded")
        except Exception as e:
            print(f"❌ Timed out waiting for app to load: {e}")
            page.screenshot(path="verification/timeout.png")
            print("📸 Saved timeout screenshot")
            browser.close()
            return

        # 1. Verify Layout Bell Button (Mobile Only)
        # Resize to mobile
        page.set_viewport_size({"width": 375, "height": 667})
        try:
            page.wait_for_selector('button[aria-label="View notifications"]', timeout=2000)
            bell_btn = page.locator('button[aria-label="View notifications"]')
            if bell_btn.count() > 0:
                print("✅ Layout: Bell button has aria-label='View notifications'")
                if bell_btn.get_attribute("title") == "View notifications":
                    print("✅ Layout: Bell button has title='View notifications'")
                else:
                    print("❌ Layout: Bell button MISSING title")
            else:
                print("❌ Layout: Bell button NOT FOUND or missing aria-label")
        except Exception as e:
            print(f"❌ Layout: Bell button verification failed: {e}")

        # Restore viewport for other tests
        page.set_viewport_size({"width": 1280, "height": 720})

        # 2. Verify Theme Toggle
        # It's usually near the bell
        theme_btn = page.locator('button[title^="Switch to"]')
        # In desktop, there is one in sidebar. In mobile, one in header.
        # We just need to find at least one.
        count = theme_btn.count()
        if count > 0:
            first = theme_btn.first
            title = first.get_attribute("title")
            print(f"✅ ThemeToggle: Found {count} buttons, first with title='{title}'")
        else:
            print("❌ ThemeToggle: Button with title starting 'Switch to' NOT FOUND")

        # 3. Verify GameCard Favorite Button
        # We need to find a game card.
        # Wait for a game card to appear.
        try:
            page.wait_for_selector('div[class*="group relative"]', timeout=5000)
            # The favorite button is inside. It has aria-label "Add to favorites" by default.
            fav_btns = page.locator('button[aria-label="Add to favorites"]')
            if fav_btns.count() > 0:
                print(f"✅ GameCard: Found {fav_btns.count()} favorite buttons with aria-label='Add to favorites'")
                first_btn = fav_btns.first
                if first_btn.get_attribute("title") == "Add to favorites":
                     print("✅ GameCard: First favorite button has title='Add to favorites'")
                else:
                     print("❌ GameCard: First favorite button MISSING title")

                # Test interaction (optional, but good to check dynamic state)
                # first_btn.click()
                # page.wait_for_timeout(500)
                # if first_btn.get_attribute("aria-label") == "Remove from favorites":
                #    print("✅ GameCard: aria-label updated to 'Remove from favorites' after click")
                # else:
                #    print("❌ GameCard: aria-label DID NOT update after click")
            else:
                 print("❌ GameCard: No buttons with aria-label='Add to favorites' found")
        except Exception as e:
            print(f"❌ GameCard: Error finding game cards: {e}")

        # Take a screenshot for evidence
        page.screenshot(path="verification/a11y_verification.png")
        print("📸 Screenshot saved to verification/a11y_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_a11y()
