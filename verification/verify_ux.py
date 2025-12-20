from playwright.sync_api import sync_playwright

def verify_settings(page):
    # Go to home (the delay is 4-6s simulated, so wait)
    page.goto("http://localhost:3000/#/")

    # Wait for the "Start Experience" or landing page elements
    # Since I don't know the exact text, I will wait for a button
    # and print page content if it fails.
    try:
        page.wait_for_selector('button', timeout=10000)
    except:
        print("Could not find button on landing page. Page content:")
        # print(page.content())

    # Try to navigate directly to settings
    page.goto("http://localhost:3000/#/settings")

    # Wait for "Settings" header
    try:
        page.wait_for_selector("h1", timeout=5000)
    except:
        print("Could not find h1 on settings page. Page content:")
        # print(page.content())

    # Take screenshot of settings page
    page.screenshot(path="verification/screenshots/settings_page.png")

    # Verify accessibility of toggle
    # Find the "Push Notifications" toggle button
    # Using the exact code I wrote: aria-label="Push Notifications"
    toggle = page.get_by_role("switch", name="Push Notifications")

    if toggle.is_visible():
        print("✅ Found toggle with role='switch' and name='Push Notifications'")
    else:
        print("❌ Could not find toggle with proper role/name")
        print("Available buttons:")
        for btn in page.get_by_role("button").all():
            print(f"- {btn.inner_text()} (label: {btn.get_attribute('aria-label')})")
        # detailed debug
        # print(page.content())

    # Check aria-checked
    is_checked = toggle.get_attribute("aria-checked")
    print(f"Toggle checked state: {is_checked}")

    # Click it
    toggle.click()
    page.wait_for_timeout(500)

    # Check if state changed
    new_checked = toggle.get_attribute("aria-checked")
    print(f"Toggle new checked state: {new_checked}")

    # Take another screenshot
    page.screenshot(path="verification/screenshots/settings_toggled.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_settings(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
