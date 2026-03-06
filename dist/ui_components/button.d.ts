export declare class Button {
    private _props;
    label(label: string): this;
    icon(icon: HTMLImageElement | SVGElement): this;
    classes(classes: string[]): this;
    addClass(...tokens: string[]): this;
    removeClass(...tokens: string[]): this;
    toggleClass(token: string): this;
    onClick(callback: () => void): this;
    render(): HTMLButtonElement;
}
//# sourceMappingURL=button.d.ts.map