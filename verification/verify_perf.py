
from playwright.sync_api import sync_playwright

def verify_game_card():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print('Navigating to home...')
            page.goto('http://localhost:3000/#/home')

            # Wait for grid to load (simulated delay)
            print('Waiting for game cards...')
            page.wait_for_selector('text=All Games', timeout=10000)

            # Wait a bit more for animation
            page.wait_for_timeout(2000)

            # Find a game card
            # We look for the 'Play' button text which is inside the card
            play_buttons = page.get_by_text('PLAY')
            count = play_buttons.count()
            print(f'Found {count} Play buttons')

            if count > 0:
                print('Taking screenshot...')
                page.screenshot(path='verification/game_cards.png')
            else:
                print('No game cards found!')
                # Take screenshot anyway to debug
                page.screenshot(path='verification/error.png')

        except Exception as e:
            print(f'Error: {e}')
            page.screenshot(path='verification/exception.png')
        finally:
            browser.close()

if __name__ == '__main__':
    verify_game_card()
