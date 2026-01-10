from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:4173/#/home")

        # Take a screenshot to see what's happening
        page.screenshot(path="verification/debug.png")
        print("Debug screenshot taken.")

        # Print page content
        print(page.content())

        browser.close()

if __name__ == "__main__":
    run()
