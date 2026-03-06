export declare class I18n {
    private defaultLang;
    private currentLang;
    private lang;
    private isDefaultLang;
    constructor(defaultLang: string, currentLang: string, dictionaries: Record<string, any>);
    setLanguage(lang: string, dictionaries: Record<string, any>): void;
    t(fallback: string, key: string): string;
}
//# sourceMappingURL=translate.d.ts.map