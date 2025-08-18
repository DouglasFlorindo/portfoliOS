import type { WindowTypes } from './window.js';
import WindowElement from './window.js';
import { isMobile, removeItemOnce } from './utils.js'


export default class WindowsManager {
    private static isDragging = false;
    private static dragTarget: HTMLElement | null = null;
    private static offsetX = 0;
    private static offsetY = 0;

    private static windows: WindowElement[] = []
    private static get windowsOnScreen() {
        return document.querySelectorAll<HTMLElement>("[element-role='window']");
    }


    static desktopEl: HTMLElement
    static taskbarEl: HTMLElement


    constructor(desktopEl: HTMLElement, taskbarEl: HTMLElement) {
        WindowsManager.desktopEl = desktopEl;
        WindowsManager.taskbarEl = taskbarEl;
        WindowsManager.desktopEl.addEventListener("mousemove", (e) => WindowsManager.dragWindow(e))
        document.addEventListener("mouseup", (e) => WindowsManager.stopDraggingWindow())
    }


    static async newWindow(windowType: WindowTypes) {

        const windowEl = new WindowElement();
        await windowEl.createElement(windowType);
        WindowsManager.windows.push(windowEl)
        const el = windowEl.element;
        const taskbarEl = windowEl.taskbarIcon

        WindowsManager.configWindow(el!)
        WindowsManager.desktopEl.appendChild(el!)
        if (taskbarEl) this.addTaskbarIcon(taskbarEl)
        WindowsManager.focusOnWindow(el!)

        if (isMobile())
            WindowsManager.fullScreenWindow(el!)
        else
            WindowsManager.bringWindowToCenter(el!)
    }


    static async newPopUp(popUpInnerHTML: string, popUpTitle: string) {

        const popupEl = new WindowElement();
        await popupEl.createPopUp(popUpInnerHTML, popUpTitle);
        WindowsManager.windows.push(popupEl)
        const el = popupEl.element;

        WindowsManager.configWindow(el!)
        WindowsManager.desktopEl.appendChild(el!)
        WindowsManager.focusOnWindow(el!)

        if (isMobile())
            WindowsManager.fullScreenWindow(el!)
        else
            WindowsManager.bringWindowToCenter(el!)
    }


    static configWindow(el: HTMLElement) {
        el.addEventListener("mousedown", () => WindowsManager.focusOnWindow(el))

        const header: HTMLElement | null = el.querySelector("[element-role='window-header']");
        if (!header) throw new Error("'header' element not found.");

        header.addEventListener("mousedown", (e: MouseEvent) => WindowsManager.startDraggingWindow(el, e));
    }


    static removeWindow(window: WindowElement) {
        if (!window.element) return

        removeItemOnce(WindowsManager.windows, window)

        if (window.taskbarIcon) WindowsManager.removeTaskbarIcon(window.taskbarIcon)
        window.element.remove()
    }


    static removeAllWindows() {
        WindowsManager.windows.forEach(element => {
            WindowsManager.removeWindow(element)
        });
    }


    static focusOnWindow(windowElement: HTMLElement) {
        WindowsManager.windowsOnScreen.forEach(element => {
            element.style.zIndex = "4";
        });

        windowElement.style.zIndex = "5";
        windowElement.focus()
    }


    static bringWindowToCenter(windowElement: HTMLElement) {

        const desktopRect = WindowsManager.desktopEl.getBoundingClientRect();
        const windowRect = windowElement.getBoundingClientRect();

        const left = (desktopRect.width - windowRect.width) / 2;
        const top = (desktopRect.height - windowRect.height) / 2;

        windowElement.style.left = `${left}px`;
        windowElement.style.top = `${top}px`;
    }


    static fullScreenWindow(windowElement: HTMLElement) {

        windowElement.style.left = `0`;
        windowElement.style.top = `0`;
        windowElement.style.width = `100%`;
        windowElement.style.height = `100%`;
    }


    private static startDraggingWindow(windowTarget: HTMLElement, e: MouseEvent) {
        if (isMobile()) return

        WindowsManager.isDragging = true
        WindowsManager.dragTarget = windowTarget

        // Calcula o offset baseado na posição do mouse em relação ao elemento:
        const rect = windowTarget.getBoundingClientRect();
        WindowsManager.offsetX = e.clientX - rect.left;
        WindowsManager.offsetY = e.clientY - rect.top;
    }


    private static dragWindow(e: MouseEvent) {
        if (!WindowsManager.isDragging || !WindowsManager.dragTarget) return;

        const bodyW = document.body.clientWidth;
        const bodyH = document.body.clientHeight;

        // Desloca a janela para refletir a posição do mouse e converte em porcentagem:
        const leftPercent = ((e.clientX - WindowsManager.offsetX) / bodyW) * 100;
        const topPercent = ((e.clientY - WindowsManager.offsetY) / bodyH) * 100;

        WindowsManager.dragTarget.style.left = `${leftPercent}%`;
        WindowsManager.dragTarget.style.top = `${topPercent}%`;
        WindowsManager.dragTarget.style.cursor = "move";
    }


    private static stopDraggingWindow() {
        if (WindowsManager.dragTarget) WindowsManager.dragTarget.style.cursor = "default";

        WindowsManager.isDragging = false
        WindowsManager.dragTarget = null
    }


    // ================ TASKBAR ================


    static addTaskbarIcon(taskbarIcon: HTMLElement) {
        WindowsManager.taskbarEl.appendChild(taskbarIcon)
    }


    static removeTaskbarIcon(taskbarIcon: HTMLElement) {
        if (!taskbarIcon || !WindowsManager.taskbarEl.contains(taskbarIcon)) return;

        WindowsManager.taskbarEl.removeChild(taskbarIcon);
    }

}