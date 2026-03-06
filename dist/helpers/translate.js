export class I18n {
    defaultLang;
    currentLang;
    lang;
    isDefaultLang;
    constructor(defaultLang, currentLang, dictionaries) {
        this.defaultLang = defaultLang;
        this.currentLang = currentLang;
        this.lang = dictionaries[this.currentLang] ?? {};
        this.isDefaultLang = this.currentLang === this.defaultLang;
    }
    setLanguage(lang, dictionaries) {
        this.currentLang = lang;
        this.lang = dictionaries[lang] ?? {};
        this.isDefaultLang = lang === this.defaultLang;
        window.dispatchEvent(new Event("languageChanged"));
    }
    t(fallback, key) {
        if (this.isDefaultLang)
            return fallback;
        return String(this.lang[key] ?? "");
    }
}
//# sourceMappingURL=translate.js.map