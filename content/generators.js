if (!window.DataGenerator) {
    class DataGenerator {
        constructor() {
            this.resetProfile();
            this.currentLocale = 'US'; // Default
        }

        setLocale(code) {
            // Fallback to US if locale not found
            if (window.FormFakerLocales && window.FormFakerLocales[code]) {
                this.currentLocale = code;
            } else {
                console.warn(`Locale ${code} not found, falling back to US`);
                this.currentLocale = 'US';
            }
        }

        getLocaleData() {
            if (window.FormFakerLocales && window.FormFakerLocales[this.currentLocale]) {
                return window.FormFakerLocales[this.currentLocale];
            }
            // Strict fallback if even US is missing
            if (window.FormFakerLocales && window.FormFakerLocales['US']) {
                return window.FormFakerLocales['US'];
            }

            // Desperate fallback
            return {
                firstNames: ['User'],
                lastNames: ['Test'],
                domains: ['example.com'],
                cities: ['City'],
                countries: ['Country'],
                streets: ['Street'],
                phoneFormats: ['1234567890']
            };
        }

        // Memoized profile for the current session/form-fill
        resetProfile() {
            this.profile = null;
        }

        getProfile() {
            if (!this.profile) {
                const data = this.getLocaleData();
                const firstName = this.pick(data.firstNames);
                const lastName = this.pick(data.lastNames);
                this.profile = {
                    firstName: firstName,
                    lastName: lastName,
                    fullName: `${firstName} ${lastName}`,
                    username: `${firstName.toLowerCase()}${Math.floor(Math.random() * 999)}`,
                    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${this.pick(data.domains)}`
                };
            }
            return this.profile;
        }

        pick(arr) {
            if (!arr || arr.length === 0) return 'Unknown';
            return arr[Math.floor(Math.random() * arr.length)];
        }

        // --- Generators ---

        email() { return this.getProfile().email; }
        firstName() { return this.getProfile().firstName; }
        lastName() { return this.getProfile().lastName; }
        fullName() { return this.getProfile().fullName; }
        username() { return this.getProfile().username; }

        phone() {
            const data = this.getLocaleData();
            let format = this.pick(data.phoneFormats);
            return format.replace(/x/g, () => Math.floor(Math.random() * 10));
        }

        password() {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
            return Array(12).fill(null).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
        }

        address() {
            const data = this.getLocaleData();
            return `${Math.floor(Math.random() * 999)} ${this.pick(data.streets)}`;
        }

        city() { return this.pick(this.getLocaleData().cities); }
        country() { return this.pick(this.getLocaleData().countries); }

        zip() {
            return Math.floor(10000 + Math.random() * 90000).toString();
        }

        url() { return `https://example.com/${this.slug()}`; }
        slug() { return `${this.pick(['cool', 'super', 'awesome'])}-${this.pick(['product', 'item', 'page'])}-${Math.floor(Math.random() * 100)}`; }

        date() {
            const start = new Date(1970, 0, 1);
            const end = new Date(2005, 11, 31);
            const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return d.toISOString().split('T')[0];
        }

        number(max = 100) {
            return Math.floor(Math.random() * max).toString();
        }

        lorem(count = 10) {
            const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt'];
            return Array(count).fill(null).map(() => this.pick(words)).join(' ');
        }
    }

    window.DataGenerator = DataGenerator;
}
