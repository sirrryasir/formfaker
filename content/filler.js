(function () {
    // Prevent multiple injections
    if (window.FormFakerInstance) return;

    class FormFaker {
        constructor() {
            this.scanner = new window.FormScanner();
            this.contextEngine = new window.ContextEngine();
            this.ruleEngine = new window.RuleEngine();
            this.generator = new window.DataGenerator();

            // Default Config
            this.config = {
                country: 'US',
                fillDisabled: false,
                fillReadonly: false,
                overwrite: true,
                ignorePassword: false
            };

            this.initListeners();
            this.loadSettings();
        }

        initListeners() {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request.action === 'fillForm') {
                    // Update config from request if provided
                    if (request.config) this.updateConfig(request.config);
                    this.fillForm();
                } else if (request.action === 'clearForm') {
                    this.clearForm();
                }
            });
        }

        async loadSettings() {
            try {
                const stored = await chrome.storage.local.get(['formFakerConfig']);
                if (stored.formFakerConfig) {
                    this.updateConfig(stored.formFakerConfig);
                }
            } catch (e) {
                console.error("Failed to load settings", e);
            }
        }

        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
            this.generator.setLocale(this.config.country);
        }

        fillForm() {
            // New fill = new person (optional: make this configurable later)
            this.generator.resetProfile();

            const inputs = this.scanner.scan({
                fillDisabled: this.config.fillDisabled,
                fillReadonly: this.config.fillReadonly
            });

            let count = 0;

            inputs.forEach(input => {
                // Safety Checks
                if (input.value && !this.config.overwrite && input.type !== 'checkbox' && input.type !== 'radio') {
                    return; // Skip if has value and no overwrite
                }
                if (input.type === 'password' && this.config.ignorePassword) {
                    return; // Skip password
                }

                const context = this.contextEngine.getContext(input);
                const type = this.ruleEngine.match(context);

                // Special handling for Select
                if (context.tagName === 'select') {
                    this.fillSelect(input);
                    count++;
                    return;
                }

                const value = this.generateValueByType(type);

                if (value !== null && value !== undefined) {
                    this.setValue(input, value);
                    count++;
                }
            });

            this.notifyUser(`Filled ${count} fields`, 'success');
        }

        clearForm() {
            const inputs = this.scanner.scan();
            let count = 0;

            inputs.forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
                // Dispatch events so frameworks know it's cleared
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                count++;
            });

            this.notifyUser(`Cleared ${count} fields`);
        }

        generateValueByType(type) {
            switch (type) {
                case 'email': return this.generator.email();
                case 'password': return this.generator.password();
                case 'phone': return this.generator.phone();
                case 'firstName': return this.generator.firstName();
                case 'lastName': return this.generator.lastName();
                case 'fullName': return this.generator.fullName();
                case 'username': return this.generator.username();
                case 'address': return this.generator.address();
                case 'city': return this.generator.city();
                case 'country': return this.generator.country();
                case 'zip': return this.generator.zip();
                case 'url': return this.generator.url();
                case 'slug': return this.generator.slug();
                case 'date': return this.generator.date();
                case 'number': return this.generator.number();
                case 'title': return this.generator.lorem(4);
                case 'description': return this.generator.lorem(15);
                case 'word': return this.generator.lorem(1);
                default: return this.generator.lorem(1);
            }
        }

        fillSelect(selectElement) {
            const options = Array.from(selectElement.options).filter(opt =>
                !opt.disabled && opt.value !== ''
            );
            if (options.length > 0) {
                const randomOption = options[Math.floor(Math.random() * options.length)];
                selectElement.value = randomOption.value;
                this.dispatchEvents(selectElement);
            }
        }

        setValue(element, value) {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = !!value; // simplified
            } else {
                element.value = value;
            }
            this.dispatchEvents(element);
        }

        dispatchEvents(element) {
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            element.dispatchEvent(new Event('blur', { bubbles: true }));
        }

        notifyUser(message, type = 'normal') {
            chrome.runtime.sendMessage({
                action: 'status',
                message: message,
                type: type
            }).catch(() => { });
        }
    }

    window.FormFakerInstance = new FormFaker();
})();
