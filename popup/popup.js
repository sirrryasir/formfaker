document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const fillBtn = document.getElementById('fill');
    const clearBtn = document.getElementById('clear');
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const statusEl = document.getElementById('status');

    // Inputs
    const countrySelect = document.getElementById('country');
    const overwriteCheck = document.getElementById('overwrite');
    const ignorePasswordCheck = document.getElementById('ignorePassword');
    const fillDisabledCheck = document.getElementById('fillDisabled');

    // State
    let config = {
        country: 'US',
        overwrite: true,
        ignorePassword: false,
        fillDisabled: false
    };

    // --- Custom Dropdown Logic ---
    const countries = [
        { code: 'US', label: 'United States', flag: '🇺🇸' },
        { code: 'AR', label: 'Argentina', flag: '🇦🇷' },
        { code: 'AT', label: 'Austria', flag: '🇦🇹' },
        { code: 'AU', label: 'Australia', flag: '🇦🇺' },
        { code: 'BD', label: 'Bangladesh', flag: '🇧🇩' },
        { code: 'BE', label: 'Belgium', flag: '🇧🇪' },
        { code: 'BR', label: 'Brazil', flag: '🇧🇷' },
        { code: 'CA', label: 'Canada', flag: '🇨🇦' },
        { code: 'CH', label: 'Switzerland', flag: '🇨🇭' },
        { code: 'CL', label: 'Chile', flag: '🇨🇱' },
        { code: 'CN', label: 'China', flag: '🇨🇳' },
        { code: 'CO', label: 'Colombia', flag: '🇨🇴' },
        { code: 'CZ', label: 'Czech Republic', flag: '🇨🇿' },
        { code: 'DE', label: 'Germany', flag: '🇩🇪' },
        { code: 'DK', label: 'Denmark', flag: '🇩🇰' },
        { code: 'EG', label: 'Egypt', flag: '🇪🇬' },
        { code: 'ES', label: 'Spain', flag: '🇪🇸' },
        { code: 'FI', label: 'Finland', flag: '🇫🇮' },
        { code: 'FR', label: 'France', flag: '🇫🇷' },
        { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
        { code: 'GR', label: 'Greece', flag: '🇬🇷' },
        { code: 'ID', label: 'Indonesia', flag: '🇮🇩' },
        { code: 'IN', label: 'India', flag: '🇮🇳' },
        { code: 'IT', label: 'Italy', flag: '🇮🇹' },
        { code: 'JP', label: 'Japan', flag: '🇯🇵' },
        { code: 'KE', label: 'Kenya', flag: '🇰🇪' },
        { code: 'KR', label: 'South Korea', flag: '🇰🇷' },
        { code: 'MX', label: 'Mexico', flag: '🇲🇽' },
        { code: 'MY', label: 'Malaysia', flag: '🇲🇾' },
        { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
        { code: 'NL', label: 'Netherlands', flag: '🇳🇱' },
        { code: 'NO', label: 'Norway', flag: '🇳🇴' },
        { code: 'NZ', label: 'New Zealand', flag: '🇳🇿' },
        { code: 'PE', label: 'Peru', flag: '🇵🇪' },
        { code: 'PH', label: 'Philippines', flag: '🇵🇭' },
        { code: 'PK', label: 'Pakistan', flag: '🇵🇰' },
        { code: 'PL', label: 'Poland', flag: '🇵🇱' },
        { code: 'PT', label: 'Portugal', flag: '🇵🇹' },
        { code: 'RO', label: 'Romania', flag: '🇷🇴' },
        { code: 'RU', label: 'Russia', flag: '🇷🇺' },
        { code: 'SA', label: 'Saudi Arabia', flag: '🇸🇦' },
        { code: 'SE', label: 'Sweden', flag: '🇸🇪' },
        { code: 'SG', label: 'Singapore', flag: '🇸🇬' },
        { code: 'SL', label: 'Somaliland', icon: '../icons/sl.png' },
        { code: 'SO', label: 'Somalia', flag: '🇸🇴' },
        { code: 'TH', label: 'Thailand', flag: '🇹🇭' },
        { code: 'TR', label: 'Turkey', flag: '🇹🇷' },
        { code: 'UA', label: 'Ukraine', flag: '🇺🇦' },
        { code: 'VE', label: 'Venezuela', flag: '🇻🇪' },
        { code: 'VN', label: 'Vietnam', flag: '🇻🇳' },
        { code: 'ZA', label: 'South Africa', flag: '🇿🇦' }
    ];

    const wrapper = document.querySelector('.custom-select-wrapper');
    const select = wrapper.querySelector('.custom-select');
    const trigger = wrapper.querySelector('.custom-select__trigger');
    const optionsList = wrapper.querySelector('.custom-select__options');
    // countrySelect is the hidden input (id="country") declared above
    const displaySpan = document.getElementById('selected-country-display');

    // Populate Options
    countries.forEach(c => {
        const option = document.createElement('span');
        option.className = 'custom-option';
        option.dataset.value = c.code;

        let displayHtml = '';
        if (c.icon) {
            displayHtml = `<img src="${c.icon}" class="flag-icon"> ${c.label}`;
        } else {
            displayHtml = `<span style="margin-right:8px; display:inline-block;">${c.flag}</span> ${c.label}`;
        }
        option.innerHTML = displayHtml;

        option.addEventListener('click', () => {
            setCountry(c.code);
            saveSettings();
            select.classList.remove('open');
            optionsList.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });

        optionsList.appendChild(option);
    });

    // Toggle Dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from closing immediately
        select.classList.toggle('open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            select.classList.remove('open');
        }
    });

    // Initialize
    loadSettings();

    // Listeners
    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    fillBtn.addEventListener('click', () => triggerAction('fillForm'));
    clearBtn.addEventListener('click', () => triggerAction('clearForm'));

    // Save settings on change
    [countrySelect, overwriteCheck, ignorePasswordCheck, fillDisabledCheck].forEach(el => {
        el.addEventListener('change', saveSettings);
    });

    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === 'status') {
            showStatus(request.message, request.type);
        }
    });

    async function loadSettings() {
        try {
            const stored = await chrome.storage.local.get(['formFakerConfig']);
            if (stored.formFakerConfig) {
                config = { ...config, ...stored.formFakerConfig };

                // Update UI
                countrySelect.value = config.country; // Sets the hidden input
                setCountry(config.country); // Updates the custom dropdown's visual display
                overwriteCheck.checked = config.overwrite;
                ignorePasswordCheck.checked = config.ignorePassword;
                fillDisabledCheck.checked = config.fillDisabled;
            }
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }

    async function saveSettings() {
        config = {
            country: countrySelect.value, // This is the hidden input
            overwrite: overwriteCheck.checked,
            ignorePassword: ignorePasswordCheck.checked,
            fillDisabled: fillDisabledCheck.checked
        };
        await chrome.storage.local.set({ formFakerConfig: config });
    }

    // Event listeners for other settings
    overwriteCheck.addEventListener('change', saveSettings);
    ignorePasswordCheck.addEventListener('change', saveSettings);
    fillDisabledCheck.addEventListener('change', saveSettings);

    // Helper to set visual state of custom dropdown
    function setCountry(code) {
        countrySelect.value = code;
        const country = countries.find(c => c.code === code);
        if (country) {
            if (country.icon) {
                displaySpan.innerHTML = `<img src="${country.icon}" class="flag-icon"> ${country.label}`;
            } else {
                displaySpan.innerHTML = `<span style="margin-right:8px; display:inline-block;">${country.flag}</span> ${country.label}`;
            }
            // Also update the 'selected' class on the options list
            optionsList.querySelectorAll('.custom-option').forEach(o => {
                if (o.dataset.value === code) {
                    o.classList.add('selected');
                } else {
                    o.classList.remove('selected');
                }
            });
        }
    }

    async function triggerAction(actionName) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab) return;

            // Ensure scripts are injected.
            // Note: In MV3 we usually declare content scripts in manifest.
            // Creating a robust injection check here.
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: [
                    'locales/AR.js',
                    'locales/AT.js',
                    'locales/AU.js',
                    'locales/BD.js',
                    'locales/BE.js',
                    'locales/BR.js',
                    'locales/CA.js',
                    'locales/CH.js',
                    'locales/CL.js',
                    'locales/CN.js',
                    'locales/CO.js',
                    'locales/CZ.js',
                    'locales/DE.js',
                    'locales/DK.js',
                    'locales/EG.js',
                    'locales/ES.js',
                    'locales/FI.js',
                    'locales/FR.js',
                    'locales/GB.js',
                    'locales/GR.js',
                    'locales/ID.js',
                    'locales/IN.js',
                    'locales/IT.js',
                    'locales/JP.js',
                    'locales/KE.js',
                    'locales/KR.js',
                    'locales/MX.js',
                    'locales/MY.js',
                    'locales/NG.js',
                    'locales/NL.js',
                    'locales/NO.js',
                    'locales/NZ.js',
                    'locales/PE.js',
                    'locales/PH.js',
                    'locales/PK.js',
                    'locales/PL.js',
                    'locales/PT.js',
                    'locales/RO.js',
                    'locales/RU.js',
                    'locales/SA.js',
                    'locales/SE.js',
                    'locales/SG.js',
                    'locales/SL.js',
                    'locales/SO.js',
                    'locales/TH.js',
                    'locales/TR.js',
                    'locales/UA.js',
                    'locales/US.js',
                    'locales/VE.js',
                    'locales/VN.js',
                    'locales/ZA.js',
                    'content/scanner.js',
                    'content/context.js',
                    'content/rules.js',
                    'content/generators.js',
                    'content/filler.js'
                ]
            });

            // Send message with current config
            await chrome.tabs.sendMessage(tab.id, {
                action: actionName,
                config: config
            });

        } catch (err) {
            console.error(err);
            // If message fails, script might not be ready yet or page is privileged (like chrome://)
            if (err.message.includes("Receiver does not exist")) {
                showStatus("Reload page to use", "error");
            } else {
                showStatus("Cannot run here", "error");
            }
        }
    }

    function showStatus(text, type) {
        statusEl.textContent = text;
        statusEl.className = 'status';
        if (type === 'success') statusEl.classList.add('success');

        setTimeout(() => {
            statusEl.textContent = 'Ready v0.2';
            statusEl.className = 'status';
        }, 3000);
    }
});
