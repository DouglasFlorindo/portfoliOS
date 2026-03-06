import { buildHTMLFromTemplate, queryByRole } from "../helpers/utils";
export class Button {
    _props = {
        classes: new Set
    };
    label(label) { this._props.label = label; return this; }
    icon(icon) { this._props.icon = icon; return this; }
    classes(classes) { this._props.classes = new Set(classes); return this; }
    addClass(...tokens) {
        tokens.forEach(t => this._props.classes.add(t));
        return this;
    }
    removeClass(...tokens) {
        tokens.forEach(t => this._props.classes.delete(t));
        return this;
    }
    toggleClass(token) {
        this._props.classes.has(token)
            ? this._props.classes.delete(token)
            : this._props.classes.add(token);
        return this;
    }
    onClick(callback) { this._props.onClick = callback; return this; }
    render() {
        const classString = Array.from(this._props.classes).join(" ");
        const element = buildHTMLFromTemplate(`<button ${classString ? `class="${classString}` : ""}">
                <div data-role="icon-container"></div>
                ${this._props.label ? `<span>${this._props.label}</span>` : ""}
            </button>`);
        this._props.icon ?
            queryByRole("icon-container", element).appendChild(this._props.icon) : null;
        element.addEventListener("click", () => this._props.onClick?.());
        return element;
    }
}
//# sourceMappingURL=button.js.map