# Contributing to FormFaker

First off, thank you for considering contributing to FormFaker! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## How can I contribute?

### 1. Adding a New Locale
This is the most common way to help. We aim to support every country on Earth!

**Steps to add a locale:**

1.  **Duplicate** an existing locale file (e.g., `locales/US.js`).
2.  **Rename** it to your 2-letter country code (e.g., `locales/XY.js`).
3.  **Update the content**:
    *   `firstNames`, `lastNames`: Add at least 10-20 common names.
    *   `domains`: Popular local email domains (e.g., `yahoo.co.jp`).
    *   `cities`: Major cities.
    *   `phoneFormats`: Local phone number patterns (use `x` for digits).
    *   **CRITICAL**: Change `window.FormFakerLocales.US` to `window.FormFakerLocales.XY`.
4.  **Register the new file**:
    *   Add the script path to `manifest.json` under `content_scripts[0].js`.
    *   Add the new option to the `countries` array in `popup/popup.js`.

### 2. Reporting Bugs
Found a form that FormFaker didn't fill correctly? Open an issue!
*   Include the URL of the form (if public).
*   Describe what happened vs. what you expected.

### 3. Improving the Code
*   **Style**: We use standard JavaScript (ES6+). Keep it clean and readable.
*   **Privacy**: NEVER add external API calls. FormFaker must remain 100% offline.

## Development Setup

1.  Clone the repo.
2.  Make your changes.
3.  Load the extension in Chrome (Developer Mode -> Load Unpacked) to test.
4.  Verify that switching to your new locale works in the popup and fills data correctly.

## Code of Conduct

Be respectful and kind. We are here to help developers save time, not to argue.

---
**Thank you for your support!**
[Yasir Hassan](https://yaasir.dev) & The Local Open Source Community
