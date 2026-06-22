# FormFaker - Chrome Extension for Smart Form Filling

Chrome extension that auto-fills web forms with realistic locale-specific fake data.

## What It Does

Scans any web form and auto-fills input fields with appropriate fake data based on field type and locale. Supports 50+ country locales for localized data generation.

## Features

Multi-Locale Support:
- 50+ countries: US, UK, CA, AU, BR, MX, IN, JP, KR, and many more
- Region-specific data: names, addresses, phone formats
- Supported locales: AR, AT, AU, BD, BE, BR, CA, CH, CL, CN, CO, CZ, DE, DK, EG, ES, FI, FR, GB, GR, ID, IN, IT, JP, KE, KR, MX, MY, NG, NL, NO, NZ, PE, PH, PK, PL, PT, RO, RU, SA, SE, SG, SL, SO, TH, TR, UA, US, VE, VN, ZA

Form Scanning:
- Automatically detects form field types
- Identifies: text, email, phone, address, city, zip, date fields

Data Generation:
- Fake names, emails, phone numbers
- Addresses matching locale format
- All data generated locally (no server calls)

Keyboard Shortcut:
- Ctrl+Shift+F (Windows/Linux)
- Cmd+Shift+F (Mac)

## Tech Stack

- Chrome Manifest V3
- TypeScript
- Vanilla JavaScript
- TailwindCSS
- Webpack build

## How It Works

1. Install extension
2. Open any web form
3. Press Ctrl+Shift+F (or Cmd+Shift+F on Mac)
4. Extension scans form fields
5. Auto-fills with fake locale-specific data
6. Submit form with test data

## Components

Content Scripts:
- scanner.js: Detects form fields
- generators.js: Creates fake data
- filler.js: Fills input elements
- rules.js: Field type detection rules
- context.js: Context management

Popup:
- UI for extension controls
- Locale selection

Locales:
- Each country has own locale file with data templates

## Installation

From Chrome Web Store:
Coming soon

Manual (Development):
```bash
git clone https://github.com/sirrryasir/formfaker.git
cd formfaker
npm install
npm run build
```

Load in Chrome:
1. Open chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select dist/ folder

## Use Cases

- Testing web forms during development
- QA testing form submissions
- Filling forms with valid test data
- No real data needed

## License

MIT
