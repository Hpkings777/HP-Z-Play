import re

def verify_game_card_a11y():
    with open('app/GameCard.tsx', 'r') as f:
        content = f.read()

    # Check for aria-label on Favorite button
    if 'aria-label={isFav ? "Remove from favorites" : "Add to favorites"}' not in content:
        print("FAIL: Missing or incorrect aria-label on Favorite button")
        return False

    # Check for aria-pressed
    if 'aria-pressed={isFav}' not in content:
        print("FAIL: Missing aria-pressed on Favorite button")
        return False

    # Check for title
    if 'title={isFav ? "Remove from favorites" : "Add to favorites"}' not in content:
        print("FAIL: Missing title on Favorite button")
        return False

    # Check for focus styles on Favorite button
    if 'focus-visible:ring-2' not in content:
        print("FAIL: Missing focus-visible ring styles")
        return False

    # Check for group-focus-within
    if 'group-focus-within:translate-y-0' not in content:
        print("FAIL: Missing group-focus-within for Info Box")
        return False

    # Check for aria-label on Play button
    # The backticks are in the file content, so we need to match them.
    if 'aria-label={`Play ${title}`}' not in content:
        print("FAIL: Missing aria-label on Play button")
        return False

    print("SUCCESS: All accessibility checks passed!")
    return True

if __name__ == "__main__":
    verify_game_card_a11y()
