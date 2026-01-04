
import sys
from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to a normal game (e.g., 2048)
        # Note: I need to know a valid ID. I'll check data.tsx or just try '2048'
        try:
            page.goto("http://localhost:4173/#/play/2048", timeout=10000)
            page.wait_for_selector("iframe", timeout=10000)

            frame_element = page.query_selector("iframe")
            if not frame_element:
                print("No iframe found")
                return

            frame = frame_element.content_frame()
            if not frame:
                time.sleep(2)
                frame = frame_element.content_frame()

            # Check if the game loaded (look for some common element or just body)
            # 2048 typically has a .game-container or similar.
            # But checking body is enough to prove it didn't crash with a security error immediately.
            try:
                # Wait for something that indicates load.
                # If sandboxing blocked scripts that 2048 needs, it might be blank or error.
                # But 2048 usually is self-contained.

                # Let's just print the title of the frame or something.
                title = frame.title()
                print(f"Frame Title: {title}")

                # Check for a known element in 2048 if possible.
                # I'll dump the body text length.
                body_text = frame.inner_text("body")
                print(f"Body text length: {len(body_text)}")

                if len(body_text) > 0:
                    print("Game loaded content successfully")
                else:
                    print("Game body is empty")

            except Exception as e:
                print(f"Error inspecting frame: {e}")

        except Exception as e:
            print(f"Error navigating: {e}")

        browser.close()

if __name__ == "__main__":
    run()
