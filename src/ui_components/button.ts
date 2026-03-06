import { buildHTMLFromTemplate, queryByRole } from "../helpers/utils";

type ButtonProps = {
    label?: string,
    icon?: HTMLImageElement | SVGElement,
    classes: Set<string>;
    onClick?: () => void,
}


export class Button {
    private _props: ButtonProps = {
        classes: new Set<string>
    }


    label(label: string) { this._props.label = label; return this }
    icon(icon: HTMLImageElement | SVGElement) { this._props.icon = icon; return this }
    classes(classes: string[]) { this._props.classes = new Set(classes); return this; }
    addClass(...tokens: string[]) {
        tokens.forEach(t => this._props.classes!.add(t));
        return this;
    }
    removeClass(...tokens: string[]) {
        tokens.forEach(t => this._props.classes!.delete(t));
        return this;
    }
    toggleClass(token: string) {
        this._props.classes!.has(token)
            ? this._props.classes!.delete(token)
            : this._props.classes!.add(token);
        return this;
    }
    onClick(callback: () => void) { this._props.onClick = callback; return this }


    render(): HTMLButtonElement {
        const classString = Array.from(this._props.classes!).join(" ");

        const element = buildHTMLFromTemplate(
            `<button ${classString ? `class="${classString}` : ""}">
                <div data-role="icon-container"></div>
                ${this._props.label ? `<span>${this._props.label}</span>` : ""}
            </button>`
        ) as HTMLButtonElement


        this._props.icon ?
            queryByRole("icon-container", element)!.appendChild(this._props.icon!) : null


        element.addEventListener("click", () => this._props.onClick?.())

        return element
    }
}
