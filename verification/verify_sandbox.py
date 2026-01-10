import os
import re

file_path = 'app/GamePlayer.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Look for iframe with sandbox attribute
# We expect something like <iframe ... sandbox="allow-scripts ..." ... />
# or <iframe ... sandbox={...} ... />

# This regex looks for 'sandbox' inside an <iframe ...> tag
# It is a simple check, not a full parser, but sufficient for this specific file.
# We match <iframe, then any characters, then sandbox=, then verify values.

match = re.search(r'<iframe[^>]*\ssandbox=["\']([^"\']*)["\']', content)

if match:
    sandbox_values = match.group(1)
    print(f"Sandbox attribute found: {sandbox_values}")

    required = ['allow-scripts', 'allow-forms', 'allow-pointer-lock', 'allow-popups']
    missing = [r for r in required if r not in sandbox_values]

    if missing:
        print(f"FAIL: Missing sandbox values: {missing}")
        exit(1)

    forbidden = ['allow-same-origin']
    present_forbidden = [f for f in forbidden if f in sandbox_values]

    if present_forbidden:
        print(f"FAIL: Forbidden sandbox values present: {present_forbidden}")
        exit(1)

    print("PASS: Sandbox attribute is correct.")
    exit(0)
else:
    print("FAIL: Sandbox attribute not found in iframe.")
    exit(1)
