from playwright.sync_api import sync_playwright, expect
import time

def verify_game_card(page):
    print("Navigating to home...")
    # Navigate to home
    page.goto("http://localhost:4173/#/home", wait_until="domcontentloaded")

    # Wait for content to load
    print("Waiting for content...")
    time.sleep(5)

    # Find a favorite button.
    # It should have an aria-label like "Add [Game Title] to favorites" or "Remove..."
    print("Looking for favorite button...")
    # We use a regex to match any favorite button
    fav_button = page.get_by_role("button", name="favorites").first

    # Assert it exists (this verifies aria-label is present)
    expect(fav_button).to_be_visible()
    print("Favorite button found.")

    # Check initial state (should be false probably)
    is_pressed = fav_button.get_attribute("aria-pressed")
    print(f"Initial aria-pressed: {is_pressed}")

    # Focus the button to show focus ring
    print("Focusing favorite button...")
    fav_button.focus()
    # Wait a bit for focus styles
    time.sleep(0.5)
    page.screenshot(path="verification/focus_fav.png")

    # Click to toggle
    print("Clicking favorite button...")
    fav_button.click()

    # Check state flip
    # Note: State update might take a moment if it persists to local storage/zustand
    # Expect handles retries
    expected_state = "true" if is_pressed == "false" else "false"
    expect(fav_button).to_have_attribute("aria-pressed", expected_state)
    print(f"State flipped to {expected_state}")

    # Check tooltip (title attribute)
    title_attr = fav_button.get_attribute("title")
    print(f"Title attribute: {title_attr}")

    # Find Play button
    # Look for button with name starting with "Play"
    print("Looking for Play button...")
    play_button = page.get_by_role("button", name="Play").first
    expect(play_button).to_be_visible()

    print("Focusing Play button...")
    play_button.focus()
    time.sleep(0.5)
    page.screenshot(path="verification/focus_play.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_game_card(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()
