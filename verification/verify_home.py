from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to home...")
        page.goto("http://localhost:3000/#/home")

        # Wait for loading to finish
        try:
            page.wait_for_selector("text=All Games", timeout=10000)
            print("Home page loaded")
        except:
            print("Timeout waiting for 'All Games'")

        page.screenshot(path="verification/home_page.png")
        print("Screenshot taken")

        browser.close()

if __name__ == "__main__":
    run()
