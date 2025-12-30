from playwright.sync_api import sync_playwright

def verify_game_card(page):
    # Go to home page via hash router
    url = "http://localhost:3000/#/home"
    print(f"Navigating to {url}")
    page.goto(url, timeout=60000)

    print("Page loaded. Waiting for content...")
    page.wait_for_load_state("networkidle")

    # Wait for loading to finish (simulated delay mentioned in memory)
    # The memory says "account for the 1.2s simulated loading delay"

    print("Waiting for favorite button...")
    try:
        fav_button = page.locator("button[aria-label='Add to favorites']").first
        fav_button.wait_for(state="visible", timeout=20000)
        print("Found favorite button!")

        aria_label = fav_button.get_attribute("aria-label")
        title = fav_button.get_attribute("title")
        print(f"ARIA Label: {aria_label}")
        print(f"Title: {title}")

        # Hover to show tooltip/state
        fav_button.hover()

        # Take screenshot of the area around the button or the whole page
        page.screenshot(path="verification/game_card_accessibility.png")
        print("Final screenshot saved.")

    except Exception as e:
        print(f"Failed to find favorite button: {e}")
        page.screenshot(path="verification/failed_state.png")
        raise e

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_game_card(page)
        except Exception as e:
            print(f"Script failed: {e}")
            exit(1)
        finally:
            browser.close()
