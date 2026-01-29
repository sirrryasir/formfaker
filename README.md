<div align="center">
  <img src="icons/logo.png" alt="FormFaker Logo" width="128" height="128">
  <h1>FormFaker</h1>
</div>

> **The privacy-first, offline-ready form filler for professional developers and QA engineers.**

[![Version](https://img.shields.io/badge/version-0.2.0-blue)](https://github.com/yourusername/formfaker/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20offline-success)](https://yaasir.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**FormFaker** intelligently fills web forms with realistic, locale-aware dummy data. Unlike other tools that rely on cloud APIs or simple randomization, FormFaker uses advanced local heuristics to understand field context (Label, Name, Placeholder, Aria) to provide accurate data—instantly and securely.

---

## Why FormFaker?

- **Privacy First**: Zero external requests. No tracking. All data generation happens locally in your browser.
- **Global Scale**: Support for **50+ locales** (USA, UK, Somalia, Japan, Brazil, and many more).
- **Smart Context**: Distinguishes between `email`, `username`, `mobile`, `landline`, `city`, and `zip` automatically.
- **Profile Consistency**: Generates a consistent identity for each form fill (e.g., the email matches the name).
- **Developer Efficiency**:
  - Keyboard Shortcut: `Ctrl + Shift + F` (Cmd+Shift+F)
  - Safe Mode (prevent accidental overwrites)
  - Ignore Password / Hidden fields

## Features

| Feature | Description |
| :--- | :--- |
| **One-Click Fill** | Instantly detect and fill inputs, textareas, and selects. |
| **50+ Locales** | Switch data sources instantly (e.g., test RTL layouts with Arabic names). |
| **Safe Mode** | Protects your manually entered data from being overwritten. |
| **Configurable** | Exclude password fields, hidden fields, or specific selectors. |
| **Offline Ready** | Works perfectly on airplanes or secure air-gapped networks. |

## Installation

### Chrome Web Store
*(Coming Soon)*

### Manual Installation (Developer Mode)
1. Clone this repository:
   ```bash
   git clone https://github.com/sirrryasir/formfaker.git
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer Mode** (toggle in the top right).
4. Click **Load Unpacked**.
5. Select the `formfaker` directory.

## Usage

1. **Pin the Extension**: Click the puzzle piece icon and pin FormFaker.
2. **Select Locale**: Click the icon and choose your target country (e.g., *Somalia* 🇸🇴 or *Japan* 🇯🇵).
3. **Fill**: Click **"Fake this form"** or press `Ctrl+Shift+F`.

> **Pro Tip**: Use "Safe Mode" in settings if you want to keep data you've already typed.

## Contributing

We love contributions! Whether it's adding a new locale, fixing a bug, or improving documentation.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get started.

## Roadmap

Check out [ROADMAP.md](./ROADMAP.md) to see what we're building next (API support, Team sync, and more).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Author

**Yasir Hassan**

- Website: [yaasir.dev](https://yaasir.dev)
- GitHub: [@sirrryasir](https://github.com/sirrryasir)
- Twitter: [@siryasirrr](https://twitter.com/siryasirrr)

Built with ❤️ for the developer community.
