from playwright.sync_api import sync_playwright
import os
import sys

def verify_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the Home page where GameCards are
        # The landing page is at /, but Home is at /#/home (HashRouter)
        url = "http://localhost:4173/#/home"
        print(f"Navigating to {url}")

        try:
             page.goto(url)
        except Exception as e:
             # Retry with port 4174 just in case
             url = "http://localhost:4174/#/home"
             print(f"Retrying with {url}")
             page.goto(url)

        # Wait for loading spinner to disappear and content to load
        # Home.tsx has a 1200ms artificial delay
        print("Waiting for content to load...")
        try:
            page.wait_for_selector('button[aria-label^="Play "]', timeout=10000)
        except:
             print("Timed out waiting for Play buttons. Dumping page content...")
             page.screenshot(path="verification/timeout_home.png")
             with open("verification/page_dump_home.html", "w") as f:
                 f.write(page.content())
             sys.exit(1)

        # Find a game card
        play_buttons = page.locator('button[aria-label^="Play "]')
        count = play_buttons.count()
        print(f"Found {count} Play buttons with correct aria-label prefix.")

        if count == 0:
            print("❌ No Play buttons with aria-label found.")
            sys.exit(1)

        # Check specific aria-label of the first button
        first_play = play_buttons.first
        aria_label = first_play.get_attribute("aria-label")
        print(f"First Play button aria-label: '{aria_label}'")

        # Find a favorite button
        fav_buttons = page.locator('button[aria-label="Add to favorites"], button[aria-label="Remove from favorites"]')
        fav_count = fav_buttons.count()
        print(f"Found {fav_count} Favorite buttons with correct aria-label.")

        if fav_count == 0:
            print("❌ No Favorite buttons with aria-label found.")
            sys.exit(1)

        first_fav = fav_buttons.first
        initial_label = first_fav.get_attribute("aria-label")
        print(f"First Favorite button initial label: '{initial_label}'")

        # Test interaction
        print("Clicking favorite button...")
        first_fav.click()

        # Wait for potential update (React render)
        page.wait_for_timeout(500)

        new_label = first_fav.get_attribute("aria-label")
        print(f"New label after click: '{new_label}'")

        if initial_label == new_label:
            print("❌ Label did not toggle!")
            sys.exit(1)
        else:
            print("✅ Label toggled successfully.")

        browser.close()

if __name__ == "__main__":
    verify_accessibility()
