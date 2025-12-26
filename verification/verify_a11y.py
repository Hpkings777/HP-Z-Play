
import os
from playwright.sync_api import sync_playwright, expect

def verify_accessibility_attributes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to Home
        try:
            page.goto("http://localhost:3000/#/home", timeout=60000)
            page.wait_for_selector('h3', timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            return

        print("Page loaded successfully")

        # 2. Check GameCard Favorite Button
        add_fav_btn = page.locator('button[aria-label="Add to favorites"]').first
        expect(add_fav_btn).to_be_visible()
        expect(add_fav_btn).to_have_attribute("title", "Add to favorites")
        print("Verified 'Add to favorites' button attributes")

        add_fav_btn.click()

        remove_fav_btn = page.locator('button[aria-label="Remove from favorites"]').first
        expect(remove_fav_btn).to_be_visible()
        expect(remove_fav_btn).to_have_attribute("title", "Remove from favorites")
        print("Verified 'Remove from favorites' button attributes after click")

        # 3. Check Notifications Bell (Mobile Header)
        # Force mobile viewport
        page.set_viewport_size({"width": 375, "height": 667})

        bell_btn = page.locator('button[aria-label="Notifications"]')
        expect(bell_btn).to_be_visible()
        expect(bell_btn).to_have_attribute("title", "Notifications")
        print("Verified 'Notifications' button attributes")

        # 4. Check ThemeToggle
        # Since strict mode violation occurred because there are two theme toggles (Sidebar and Mobile Header),
        # we will select the one visible in mobile header.

        # In mobile view, the sidebar is hidden, but the DOM might still be there.
        # Layout.tsx says:
        # <aside className="hidden md:flex ...">
        # <header className="md:hidden ...">

        # Since we are in mobile viewport (width: 375), the header one should be visible.
        # The sidebar one should be hidden.

        # Let's try to get the one inside header
        theme_btn = page.locator('header button[aria-label^="Switch to"]')
        expect(theme_btn).to_be_visible()
        label = theme_btn.get_attribute("aria-label")
        title = theme_btn.get_attribute("title")
        print(f"Theme Toggle Label: {label}")
        print(f"Theme Toggle Title: {title}")

        if label != title:
             print("Error: Label and Title do not match")
             exit(1)

        # Take screenshot of Mobile View
        page.screenshot(path="verification/mobile_view.png")
        print("Screenshot saved to verification/mobile_view.png")

        browser.close()

if __name__ == "__main__":
    verify_accessibility_attributes()
