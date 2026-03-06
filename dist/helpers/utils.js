export function isMobile() {
    if (window.innerWidth <= 750) {
        return true;
    }
    else {
        return false;
    }
}
export function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
export function queryByAttribute(value, attribute, parentElement = document.body) {
    return parentElement.querySelector(`[${attribute}='${value}']`);
}
export function queryByRole(value, parentElement = document.body) {
    return queryByAttribute(value, "data-role", parentElement);
}
export function queryAllByRole(value, parentElement = document.body) {
    return parentElement.querySelectorAll(`[data-role="${value}"]`);
}
export function buildHTMLFromTemplate(HTMLTemplate) {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = HTMLTemplate.trim();
    return templateEl.content.firstElementChild;
}
export function buildSVGFromTemplate(SVGTemplate) {
    const doc = new DOMParser().parseFromString(SVGTemplate, "image/svg+xml");
    const svg = doc.documentElement;
    if (svg.tagName.toLowerCase() === "parsererror") {
        throw new Error("Invalid SVG string");
    }
    return svg;
}
//# sourceMappingURL=utils.js.map