from playwright.sync_api import sync_playwright

def verify_game_card(page):
    # Navigate to home
    page.goto("http://localhost:3000")

    # Wait for loading to finish (1.2s simulated delay)
    page.wait_for_selector('text=All Games', timeout=10000)

    # Wait for ANY game card to be visible. Using a generic selector.
    # The games are rendered in a grid, inside GameCard.
    # GameCard contains text.

    # Wait for "2048" or just wait for the grid container
    page.wait_for_selector('h3', timeout=10000)

    # Take screenshot of the grid
    page.screenshot(path="verification/home_grid.png")
    print("Screenshot taken at verification/home_grid.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_game_card(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
