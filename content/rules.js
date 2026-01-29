if (!window.RuleEngine) {
    class RuleEngine {
        constructor() {
            // Order matters! First match wins.
            this.rules = [
                { type: 'email', keywords: ['email', 'e-mail', 'mail'] },
                { type: 'password', keywords: ['password', 'pwd', 'secret', 'pass'] },
                { type: 'phone', keywords: ['phone', 'mobile', 'cell', 'tel', 'whatsapp', 'fax'] },
                { type: 'firstName', keywords: ['first name', 'firstname', 'given name', 'fname'] },
                { type: 'lastName', keywords: ['last name', 'lastname', 'surname', 'family name', 'lname'] },
                { type: 'fullName', keywords: ['full name', 'fullname', 'name', 'your name'] },
                { type: 'username', keywords: ['username', 'user', 'login', 'nickname', 'handle'] },
                { type: 'address', keywords: ['address', 'street', 'location', 'residence'] },
                { type: 'city', keywords: ['city', 'town', 'municipality'] },
                { type: 'country', keywords: ['country', 'nation'] },
                { type: 'zip', keywords: ['zip', 'postal', 'code', 'postcode'] },
                { type: 'state', keywords: ['state', 'province', 'region', 'county'] },
                { type: 'url', keywords: ['url', 'website', 'link', 'homepage', 'site'] },
                { type: 'slug', keywords: ['slug', 'identifier', 'alias'] },
                { type: 'date', keywords: ['date', 'dob', 'birth', 'day', 'month', 'year'] },
                { type: 'search', keywords: ['search', 'find', 'query'] },
                { type: 'number', keywords: ['qty', 'quantity', 'amount', 'number', 'count', 'age'] },
                { type: 'title', keywords: ['title', 'subject', 'headline'] },
                { type: 'description', keywords: ['description', 'message', 'comment', 'body', 'content', 'bio', 'about'] }
            ];
        }

        /**
         * Determines the best data type for a given context.
         */
        match(contextObj) {
            const text = contextObj.text;

            // 1. Check for strict type matches first
            if (contextObj.type === 'email') return 'email';
            if (contextObj.type === 'password') return 'password';
            if (contextObj.type === 'date') return 'date';
            if (contextObj.type === 'tel') return 'phone';
            if (contextObj.type === 'url') return 'url';
            if (contextObj.type === 'number') return 'number';

            // 2. Keyword matching
            for (const rule of this.rules) {
                if (rule.keywords.some(k => text.includes(k))) {
                    return rule.type;
                }
            }

            // 3. Fallbacks based on tag
            if (contextObj.tagName === 'textarea') return 'description';

            return 'word';
        }
    }

    window.RuleEngine = RuleEngine;
}
