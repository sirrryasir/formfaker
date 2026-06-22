# 🎭 FormFaker - Intelligent Form Auto-Fill Chrome Extension

<div align="center">
  <p>
    <a href="https://github.com/sirrryasir/formfaker"><img src="https://img.shields.io/badge/Chrome%20Extension-TypeScript-4285F4?style=flat-square&logo=googlechrome" alt="Chrome" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS" /></a>
  </p>
</div>

---

## 📌 Overview

**FormFaker** is a productivity-focused Chrome extension that intelligently auto-fills web forms with realistic test data. Perfect for developers, QA testers, and product teams who need to quickly populate forms with valid test data during development and testing workflows.

---

## ✨ Key Features

- **🚀 One-Click Fill**: Auto-populate any form with intelligent fake data
- **🌐 Multi-Language**: Support for multiple locales and regional data formats
- **🎯 Smart Detection**: Automatically identifies form field types (email, phone, address, etc.)
- **📝 Custom Templates**: Save and reuse custom data templates
- **🔒 Privacy First**: All data generation happens locally—nothing sent to servers
- **⚡ Zero Config**: Works out-of-the-box, no setup required
- **🎨 Clean UI**: Minimal popup with dark/light mode support

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Extension** | Manifest V3, Chrome APIs |
| **Frontend** | TypeScript, HTML, CSS |
| **Styling** | TailwindCSS |
| **Build Tool** | Webpack |

---

## 🚀 Quick Start

### Installation from Chrome Web Store
[Coming soon to Chrome Web Store](https://chrome.google.com/webstore)

### Manual Installation (Development)

1. **Clone the repo**
   ```bash
   git clone https://github.com/sirrryasir/formfaker.git
   cd formfaker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

5. **Start developing**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
formfaker/
├── content/         # Content script (runs on pages)
├── popup/          # Extension popup UI
├── icons/          # Extension icons
├── locales/        # Language translations
├── manifest.json   # Extension configuration
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork and clone**
   ```bash
   git clone https://github.com/sirrryasir/formfaker.git
   cd formfaker
   ```

2. **Install and start dev server**
   ```bash
   npm install
   npm run dev
   ```

3. **Make your changes**
   - Create a feature branch: `git checkout -b feature/your-feature`
   - Make changes and test in Chrome

4. **Submit PR**
   ```bash
   git commit -m "feat: add your feature"
   git push origin feature/your-feature
   ```

### Development Guidelines
- Follow existing code style
- Test on latest Chrome version
- Update locales if adding new strings
- Keep manifest.json aligned

---

## 📄 License

MIT License. See `LICENSE` for details.

---

## 👨‍💻 Author

Built by **Yasir Hassan** ([@sirrryasir](https://github.com/sirrryasir))  
Portfolio: [yaasir.dev](https://www.yaasir.dev)

---

**Star this project!** ⭐
