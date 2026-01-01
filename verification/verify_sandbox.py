from playwright.sync_api import sync_playwright

def verify_sandbox_attribute():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using hash router format as per instructions
        page = browser.new_page()

        # We need to navigate to a game page.
        # Assuming there is a game with id '1v1lol' as seen in config.json
        page.goto("http://localhost:3000/#/play/1v1lol")

        # Wait for the iframe to be attached to the DOM
        # The game player has a loading simulation, so we might need to wait a bit
        # But the iframe is rendered inside the AnimatePresence
        # Let's wait for the iframe selector
        try:
            # Wait for the loading animation to finish and iframe to appear
            # The loader takes 4-6 seconds. Let's wait up to 10s.
            iframe = page.wait_for_selector('iframe', timeout=15000)

            if iframe:
                sandbox_attr = iframe.get_attribute('sandbox')
                print(f"Sandbox attribute: {sandbox_attr}")

                expected = "allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
                if sandbox_attr == expected:
                    print("SUCCESS: Sandbox attribute is correct.")
                else:
                    print(f"FAILURE: Sandbox attribute is '{sandbox_attr}', expected '{expected}'")
            else:
                print("FAILURE: Iframe not found.")

        except Exception as e:
            print(f"Error: {e}")

        page.screenshot(path="verification/verification.png")
        browser.close()

if __name__ == "__main__":
    verify_sandbox_attribute()
