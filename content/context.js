if (!window.ContextEngine) {
    class ContextEngine {
        /**
         * Analyzes an element to determine its semantic context.
         * Returns a normalized context object and string.
         */
        getContext(element) {
            let labelText = '';

            // 1. Label for attribute
            if (element.id) {
                const label = document.querySelector(`label[for="${element.id}"]`);
                if (label) labelText += ' ' + label.innerText;
            }

            // 2. Wrapping label
            const parentLabel = element.closest('label');
            if (parentLabel) {
                // Clone to avoid getting the input's own value in the text
                const clone = parentLabel.cloneNode(true);
                const inputInClone = clone.querySelector(element.tagName);
                if (inputInClone) inputInClone.remove();
                labelText += ' ' + clone.innerText;
            }

            // 3. Aria attributes
            if (element.getAttribute('aria-labelledby')) {
                const ids = element.getAttribute('aria-labelledby').split(' ');
                ids.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) labelText += ' ' + el.innerText;
                });
            }
            if (element.getAttribute('aria-label')) {
                labelText += ' ' + element.getAttribute('aria-label');
            }

            // 4. Input attributes
            const name = element.name || '';
            const id = element.id || '';
            const placeholder = element.placeholder || '';
            const type = element.type || '';
            const className = element.className || '';

            // Combine for a normalized context string
            // We add weights implicitly by order or repetition, but effectively we just need a big string to regex against.
            const rawString = `${labelText} ${name} ${id} ${placeholder} ${type} ${className}`;
            const normalized = rawString.toLowerCase().replace(/\s+/g, ' ').trim();

            return {
                element,
                text: normalized,
                type: element.type,
                tagName: element.tagName.toLowerCase()
            };
        }
    }

    window.ContextEngine = ContextEngine;
}
