from playwright.sync_api import sync_playwright, expect
import time

def verify_accessibility(page):
    print("Navigating to home...")
    # Use domcontentloaded to avoid waiting for all network connections (like fonts/analytics if any)
    page.goto("http://localhost:3000/#/home", wait_until="domcontentloaded")

    print("Page loaded. Waiting for content...")

    # Wait for loading to finish (wait for "All Games" text)
    # The loading spinner is removed after 1.2s
    try:
        page.wait_for_selector("text=All Games", timeout=10000)
    except Exception as e:
        print("Timeout waiting for 'All Games'. Dumping page content:")
        print(page.content())
        raise e

    print("Found 'All Games'. Checking games...")

    # Wait a bit for animations
    time.sleep(2)

    print("Checking Favorite Button...")
    # Check Favorite Button
    # We look for the button with the specific aria-label I added
    try:
        fav_btn = page.locator("button[aria-label='Add to favorites']").first
        expect(fav_btn).to_be_visible(timeout=5000)
    except Exception as e:
        print("Could not find favorite button. Dumping page content:")
        print(page.content())
        raise e

    # Check title
    title = fav_btn.get_attribute("title")
    print(f"Favorite Button Title: {title}")
    if title != "Add to favorites":
        raise Exception(f"Expected title 'Add to favorites', got '{title}'")

    # Check aria-pressed
    pressed = fav_btn.get_attribute("aria-pressed")
    print(f"Favorite Button aria-pressed: {pressed}")
    if pressed != "false":
        raise Exception(f"Expected aria-pressed 'false', got '{pressed}'")

    print("Clicking Favorite Button...")
    # Click it to toggle
    fav_btn.click()

    # Check state change
    # The label should change
    fav_btn_toggled = page.locator("button[aria-label='Remove from favorites']").first
    expect(fav_btn_toggled).to_be_visible()

    pressed_after = fav_btn_toggled.get_attribute("aria-pressed")
    print(f"Favorite Button aria-pressed after click: {pressed_after}")
    if pressed_after != "true":
         raise Exception(f"Expected aria-pressed 'true', got '{pressed_after}'")

    print("Checking Play Button...")
    # Check Play Button
    # It should have aria-label="Play {title}"
    play_btn = page.locator("button[aria-label^='Play ']").first
    aria_label = play_btn.get_attribute("aria-label")
    print(f"Play Button ARIA label: {aria_label}")
    if not aria_label.startswith("Play "):
         raise Exception(f"Expected aria-label to start with 'Play ', got '{aria_label}'")

    # Take screenshot of the card with focus on favorite button
    print("Focusing and screenshotting...")
    fav_btn_toggled.focus()
    # Wait for focus ring transition
    time.sleep(0.5)
    page.screenshot(path="verification/accessibility_check.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_accessibility(page)
            print("Verification passed!")
        except Exception as e:
            print(f"Verification failed: {e}")
            exit(1)
        finally:
            browser.close()
