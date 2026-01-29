if (!window.FormScanner) {
    class FormScanner {
        constructor() {
            this.selector = [
                'input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=image]):not([type=reset])',
                'textarea',
                'select'
            ].join(',');
        }

        /**
         * Scans the document for fillable fields.
         * Respects "ignore disabled/readonly" based on config.
         */
        scan(config = {}) {
            let elements = Array.from(document.querySelectorAll(this.selector));

            // Filter based on visibility and config
            return elements.filter(el => {
                // Must be visible
                if (el.offsetParent === null) return false;

                // Optional: Ignore disabled
                if (!config.fillDisabled && el.disabled) return false;

                // Optional: Ignore readonly
                if (!config.fillReadonly && el.readOnly) return false;

                return true;
            });
        }
    }
    window.FormScanner = FormScanner;
}
