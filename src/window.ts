import WindowsManager from './windowsManager.js';
import { TaskbarIcon } from "./taskbarIcon.js";

export enum WindowTypes { PROFILE = 0, PORTFOLIO = 1, CURRICULUM = 2, CONTACT = 3 }

interface WindowMetadata {
    title: string;
    path: string;
    iconFile: string;
    script: string | null;
}

export const windowTypeMetadataMap = new Map<WindowTypes, WindowMetadata>([
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
         script: null,
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

    private _element!: HTMLElement;
    private _taskbarIcon!: TaskbarIcon;


    public get element(): HTMLElement | null {
        return this._element || null
    }


    public get taskbarIcon(): HTMLElement | null {
        return this._taskbarIcon.element || null;
    }


    async createElement(windowType: WindowTypes) {
        this._element = document.createElement('section');
        
        await this.createTaskbarElement(windowType)

        const res = await fetch("/pages/window.html");
        this._element.innerHTML = await res.text();

        
        await this.loadWindowContent(windowType);
        await this.configElement(windowType);

    }

    private async createTaskbarElement(windowType: WindowTypes) {
        const taskbarIcon = new TaskbarIcon(this._element, windowType);
        await taskbarIcon.createElement()
        this._taskbarIcon = taskbarIcon
    }


    private async configElement(windowType: WindowTypes) {
        this._element.setAttribute("element-role", "window");
        this._element.setAttribute("tabindex", "0");
        this._element.setAttribute("role", "dialog");
        this._element.setAttribute("window-type", windowType.toString());
        this._element.classList = "window";

        const windowTitle = this._element.querySelector("[element-role='window-title']");
        if (windowTitle) windowTitle.textContent = windowTypeMetadataMap.get(windowType)?.title.toString() ?? ""

        const closeButton = this._element.querySelector("[element-role='close-button']");
        closeButton?.addEventListener("click", () => WindowsManager.removeWindow(this))
    }


    private async loadWindowContent(windowType: WindowTypes) {
        const windowBody = this._element.querySelector("[element-role='window-body']");
        if (!windowBody) throw new Error("'window-body' element not found.");

        const filePath = windowTypeMetadataMap.get(windowType)?.path;
        if (!filePath) throw new Error(`No file path for window type ${windowType}`);

        const res = await fetch(filePath);
        const content = await res.text();

        windowBody.innerHTML = content;
    }
}

