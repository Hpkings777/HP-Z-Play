from playwright.sync_api import sync_playwright

def verify_accessibility(page):
    page.goto("http://localhost:3000/#/home")

    # Wait for content to load
    page.wait_for_selector("text=All Games", timeout=10000)

    # 1. Verify GameCard Favorite Button
    # Find a favorite button (star icon) and check aria-label
    # Using a selector that targets the button wrapping the Star icon
    # Since we added aria-label to the button
    fav_buttons = page.locator("button[aria-label='Add to favorites']")
    count = fav_buttons.count()
    print(f"Found {count} 'Add to favorites' buttons")

    if count > 0:
        first_btn = fav_buttons.first
        print(f"First button aria-label: {first_btn.get_attribute('aria-label')}")
        print(f"First button title: {first_btn.get_attribute('title')}")
    else:
        print("No 'Add to favorites' buttons found!")

    # 2. Verify Theme Toggle
    theme_btn = page.locator("button[aria-label='Switch to dark mode']").or_(page.locator("button[aria-label='Switch to light mode']"))
    if theme_btn.count() > 0:
        print(f"Theme toggle found with label: {theme_btn.first.get_attribute('aria-label')}")
    else:
        print("Theme toggle not found!")

    # Screenshot
    page.screenshot(path="verification/accessibility_check.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_accessibility(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
