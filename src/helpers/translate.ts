export class I18n {
    private lang: Record<string, any>
    private isDefaultLang: boolean

    constructor(
        private defaultLang: string,
        private currentLang: string,
        dictionaries: Record<string, any>
    ) {
        this.lang = dictionaries[this.currentLang] ?? {}
        this.isDefaultLang = this.currentLang === this.defaultLang
    }


    setLanguage(lang: string, dictionaries: Record<string, any>) {
        this.currentLang = lang
        this.lang = dictionaries[lang] ?? {}
        this.isDefaultLang = lang === this.defaultLang

        window.dispatchEvent(new Event("languageChanged"))
    }


    t(fallback: string, key: string): string {
        if (this.isDefaultLang) return fallback

        return String(this.lang[key] ?? "")
    }
}
