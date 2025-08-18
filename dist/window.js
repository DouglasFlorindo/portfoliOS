import WindowsManager from './windowsManager.js';
import { TaskbarIcon } from "./taskbarIcon.js";
export var WindowTypes;
(function (WindowTypes) {
    WindowTypes[WindowTypes["PROFILE"] = 0] = "PROFILE";
    WindowTypes[WindowTypes["PORTFOLIO"] = 1] = "PORTFOLIO";
    WindowTypes[WindowTypes["CURRICULUM"] = 2] = "CURRICULUM";
    WindowTypes[WindowTypes["CONTACT"] = 3] = "CONTACT";
})(WindowTypes || (WindowTypes = {}));
export const windowTypeMetadataMap = new Map([
    [WindowTypes.PROFILE, {
            title: "Perfil",
            path: "/pages/profile.html",
            iconFile: "profile.svg",
            script: null,
        }],
    [WindowTypes.PORTFOLIO, {
            title: "Portfólio",
            path: "/pages/portfolio.html",
            iconFile: "work.svg",
            script: "portfolio.js",
        }],
    [WindowTypes.CURRICULUM, {
            title: "Currículo",
            path: "/pages/curriculum.html",
            iconFile: "doc.svg",
            script: null,
        }],
    [WindowTypes.CONTACT, {
            title: "Contato",
            path: "/pages/contact.html",
            iconFile: "contact.svg",
            script: null,
        }]
]);
export default class WindowElement {
    _element;
    _taskbarIcon;
    get element() {
        return this._element || null;
    }
    get taskbarIcon() {
        return this._taskbarIcon?.element || null;
    }
    async createElement(windowType) {
        this._element = document.createElement('section');
        await this.createTaskbarElement(windowType);
        const res = await fetch("/pages/window.html");
        this._element.innerHTML = await res.text();
        await this.loadWindowContent(windowType);
        this.configWindowElement(windowType);
    }
    async createTaskbarElement(windowType) {
        const taskbarIcon = new TaskbarIcon(this._element, windowType);
        await taskbarIcon.createElement();
        this._taskbarIcon = taskbarIcon;
    }
    configWindowElement(windowType) {
        this._element.setAttribute("element-role", "window");
        this._element.setAttribute("tabindex", "0");
        this._element.setAttribute("role", "dialog");
        this._element.setAttribute("window-type", windowType.toString());
        this._element.classList = "window";
        // Carrega o título da janela:
        const windowTitle = this._element.querySelector("[element-role='window-title']");
        if (windowTitle)
            windowTitle.textContent = windowTypeMetadataMap.get(windowType)?.title.toString() || "";
        // Adiciona o evento ao botão de fechar:
        const closeButton = this._element.querySelector("[element-role='close-button']");
        closeButton?.addEventListener("click", () => WindowsManager.removeWindow(this));
        // Caso exista, importa o script e o executa:
        const script = windowTypeMetadataMap.get(windowType)?.script;
        if (script) {
            import(`/pages/scripts/${script}`).then(module => {
                if (typeof module.init === "function") {
                    module.init(this._element);
                }
            });
        }
    }
    async loadWindowContent(windowType) {
        const windowBody = this._element.querySelector("[element-role='window-body']");
        if (!windowBody)
            throw new Error("'window-body' element not found.");
        const filePath = windowTypeMetadataMap.get(windowType)?.path;
        if (!filePath)
            throw new Error(`No file path for window type ${windowType}`);
        const res = await fetch(filePath);
        const content = await res.text();
        windowBody.innerHTML = content;
    }
    async createPopUp(popUpInnerHTML, popUpTitle) {
        this._element = document.createElement('section');
        const res = await fetch("/pages/window.html");
        this._element.innerHTML = await res.text();
        this.loadPopUpContent(popUpInnerHTML);
        this.configPopUpElement(popUpTitle);
    }
    loadPopUpContent(content) {
        const windowBody = this._element.querySelector("[element-role='window-body']");
        if (!windowBody)
            throw new Error("'window-body' element not found.");
        windowBody.innerHTML = content;
    }
    configPopUpElement(popUpTitle) {
        this._element.setAttribute("element-role", "popup");
        this._element.setAttribute("tabindex", "0");
        this._element.setAttribute("role", "dialog");
        this._element.classList = "window popup";
        const windowTitle = this._element.querySelector("[element-role='window-title']");
        if (windowTitle)
            windowTitle.textContent = popUpTitle;
        const closeButton = this._element.querySelector("[element-role='close-button']");
        closeButton?.addEventListener("click", () => WindowsManager.removeWindow(this));
    }
}
//# sourceMappingURL=window.js.map