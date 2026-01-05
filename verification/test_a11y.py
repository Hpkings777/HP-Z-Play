
from playwright.sync_api import sync_playwright, expect

def verify_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use port 4173 for preview
        page = browser.new_page()
        page.goto("http://localhost:4173/#/home")

        # Wait for content to load (GameCards)
        # We need to wait for the simulated loading in Home.tsx
        page.wait_for_selector("text=All Games", timeout=10000)

        # Find the first favorite button
        # It's an icon-only button, but now we added aria-label!
        # Let's try to select by aria-label

        # We need to find a button that has "Add" and "favorites" in its label
        # Since titles are dynamic, we can use a regex or partial match
        # But let's just find the first button that matches the pattern

        # Check if any button has the aria-label starting with "Add" and ending with "to favorites"
        # The label format is: `${isFav ? 'Remove' : 'Add'} ${title} ${isFav ? 'from' : 'to'} favorites`

        # Let's verify the attributes on the first favorite button found
        # The favorite button is the one with the Star icon.
        # We can find it by the aria-label if our change worked.

        # Wait for cards to appear
        page.wait_for_selector("button[aria-label*='favorites']")

        buttons = page.locator("button[aria-label*='favorites']").all()
        print(f"Found {len(buttons)} favorite buttons")

        if len(buttons) > 0:
            btn = buttons[0]
            label = btn.get_attribute("aria-label")
            title_attr = btn.get_attribute("title")
            pressed = btn.get_attribute("aria-pressed")

            print(f"Button 1 Label: {label}")
            print(f"Button 1 Title: {title_attr}")
            print(f"Button 1 Pressed: {pressed}")

            # Verify focus styles
            btn.focus()
            page.screenshot(path="verification/focus_state.png")
            print("Screenshot taken of focused state")

            # Click to toggle
            btn.click()

            # Check if attributes updated
            # React updates might take a tick
            page.wait_for_timeout(500)

            label_new = btn.get_attribute("aria-label")
            pressed_new = btn.get_attribute("aria-pressed")
            print(f"Button 1 Label (after click): {label_new}")
            print(f"Button 1 Pressed (after click): {pressed_new}")

        else:
            print("No favorite buttons found with aria-label")
            page.screenshot(path="verification/failed.png")

        browser.close()

if __name__ == "__main__":
    verify_accessibility()
