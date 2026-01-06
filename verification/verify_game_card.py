
from playwright.sync_api import sync_playwright

def verify_game_card(page):
    # Navigate to home
    page.goto("http://localhost:3000/#/home")

    # Wait for loading to finish (Home component has a simulated delay)
    page.wait_for_selector("text=All Games", timeout=10000)

    # Wait for grid to appear
    page.wait_for_selector(".grid", timeout=5000)

    # Take a screenshot of the grid
    page.screenshot(path="verification/game_grid.png")
    print("Screenshot taken")

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
