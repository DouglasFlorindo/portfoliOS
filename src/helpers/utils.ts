export function isMobile() {

    if (window.innerWidth <= 750) {
        return true
    } else {
        return false
    }
}


export function removeItemOnce(arr: Array<any>, value: any) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}


export function queryByAttribute(value: string, attribute: string, parentElement: HTMLElement = document.body): HTMLElement | null {
    return parentElement.querySelector(`[${attribute}='${value}']`)
}


export function queryByRole(value: string, parentElement: HTMLElement = document.body): HTMLElement | null {

    return queryByAttribute(value, "data-role", parentElement)
}


export function queryAllByRole(value: string, parentElement: HTMLElement = document.body) {

    return parentElement.querySelectorAll<HTMLElement>(`[data-role="${value}"]`)
}


export function buildHTMLFromTemplate(HTMLTemplate: string): HTMLElement {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = HTMLTemplate.trim();
    return templateEl.content.firstElementChild as HTMLElement;
}


export function buildSVGFromTemplate(SVGTemplate: string): SVGElement {
    const doc = new DOMParser().parseFromString(SVGTemplate, "image/svg+xml");
    const svg = doc.documentElement as unknown as SVGElement;

    if (svg.tagName.toLowerCase() === "parsererror") {
        throw new Error("Invalid SVG string");
    }
    return svg;
}