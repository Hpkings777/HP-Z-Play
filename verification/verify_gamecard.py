from playwright.sync_api import sync_playwright

def verify_gamecard(page):
    # Go to home
    page.goto("http://localhost:3000/#/home")

    # Wait for loading to finish (Home.tsx has 1200ms delay)
    # The loading spinner is present initially.
    # We can wait for a game card to appear.
    page.wait_for_selector("text=All Games", timeout=10000)

    # Wait a bit more for animation
    page.wait_for_timeout(2000)

    # Find the first game card
    # It has a "PLAY" button.
    # We want to click the favorite star.
    # The star is inside a button.

    # Let's take a screenshot before favoriting
    page.screenshot(path="verification/before_fav.png")

    # Click the first favorite button
    # The favorite button has a Star icon.
    # We can find it by looking for the button inside the card.
    # Or just the first button that is not the Play button.
    # The favorite button has a Star icon.

    # Use a locator that finds the star button.
    # The button contains the Star SVG.
    # We can locate by the SVG or the button structure.
    # The code has:
    # <motion.button ... onClick={handleFavorite}> <Star ... /> </motion.button>

    # Let's try to click the first button element that contains a Star.
    # Or simpler: The page has multiple game cards.
    # Let's target the first one.

    # page.locator("button").filter(has=page.locator("svg.lucide-star")).first.click()
    # Wait, the Star component from lucide-react renders an svg.

    # Let's just use a coordinate click if selectors are hard, but selectors are better.
    # The favorites button is the one in the top right of the card image area.

    # Try to find the button by role? It's a motion.button, which renders a button.
    # It might not have text.

    buttons = page.locator("button")
    # Iterate to find the one with Star?
    # Actually, let's just wait for .lucide-star and click its parent.

    star = page.locator(".lucide-star").first
    fav_btn = star.locator("..") # parent
    fav_btn.click()

    # Wait for state update and animation
    page.wait_for_timeout(1000)

    # Take screenshot after favoriting
    page.screenshot(path="verification/after_fav.png")
    print("Verification screenshots captured.")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify_gamecard(page)
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()
