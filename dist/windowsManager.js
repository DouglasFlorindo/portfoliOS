import WindowElement from './window.js';
export default class WindowsManager {
    static isDragging = false;
    static dragTarget = null;
    static offsetX = 0;
    static offsetY = 0;
    static get windowsOnScreen() {
        return document.querySelectorAll("[element-role='window']");
    }
    static desktopEl;
    static taskbarEl;
    constructor(desktopEl, taskbarEl) {
        WindowsManager.desktopEl = desktopEl;
        WindowsManager.taskbarEl = taskbarEl;
        WindowsManager.desktopEl.addEventListener("mousemove", (e) => WindowsManager.dragWindow(e));
        document.addEventListener("mouseup", (e) => WindowsManager.stopDraggingWindow());
    }
    async newWindow(windowType) {
        const windowEl = new WindowElement();
        await windowEl.createElement(windowType);
        const el = windowEl.element;
        const taskbarEl = windowEl.taskbarIcon;
        this.configWindow(el);
        WindowsManager.desktopEl.appendChild(el);
        this.addTaskbarIcon(taskbarEl);
        WindowsManager.focusOnWindow(el);
        WindowsManager.bringWindowToCenter(el);
    }
    configWindow(el) {
        el.addEventListener("mousedown", () => WindowsManager.focusOnWindow(el));
        const header = el.querySelector("[element-role='window-header']");
        if (!header)
            throw new Error("'header' element not found.");
        header.addEventListener("mousedown", (e) => WindowsManager.startDraggingWindow(el, e));
    }
    static removeWindow(window) {
        if (!window.element)
            return;
        WindowsManager.removeTaskbarIcon(window.taskbarIcon);
        window.element.remove();
    }
    static focusOnWindow(windowElement) {
        WindowsManager.windowsOnScreen.forEach(element => {
            element.style.zIndex = "4";
        });
        windowElement.style.zIndex = "5";
        windowElement.focus();
    }
    static bringWindowToCenter(windowElement) {
        const desktopRect = WindowsManager.desktopEl.getBoundingClientRect();
        const windowRect = windowElement.getBoundingClientRect();
        const left = (desktopRect.width - windowRect.width) / 2;
        const top = (desktopRect.height - windowRect.height) / 2;
        windowElement.style.left = `${left}px`;
        windowElement.style.top = `${top}px`;
    }
    static startDraggingWindow(windowTarget, e) {
        WindowsManager.isDragging = true;
        WindowsManager.dragTarget = windowTarget;
        // Calcula o offset baseado na posição do mouse em relação ao elemento:
        const rect = windowTarget.getBoundingClientRect();
        WindowsManager.offsetX = e.clientX - rect.left;
        WindowsManager.offsetY = e.clientY - rect.top;
    }
    static dragWindow(e) {
        if (!WindowsManager.isDragging || !WindowsManager.dragTarget)
            return;
        const bodyW = document.body.clientWidth;
        const bodyH = document.body.clientHeight;
        // Desloca a janela para refletir a posição do mouse e converte em porcentagem:
        const leftPercent = ((e.clientX - WindowsManager.offsetX) / bodyW) * 100;
        const topPercent = ((e.clientY - WindowsManager.offsetY) / bodyH) * 100;
        WindowsManager.dragTarget.style.left = `${leftPercent}%`;
        WindowsManager.dragTarget.style.top = `${topPercent}%`;
        WindowsManager.dragTarget.style.cursor = "move";
    }
    static stopDraggingWindow() {
        if (WindowsManager.dragTarget)
            WindowsManager.dragTarget.style.cursor = "default";
        WindowsManager.isDragging = false;
        WindowsManager.dragTarget = null;
    }
    // ================ TASKBAR ================
    addTaskbarIcon(taskbarIcon) {
        WindowsManager.taskbarEl.appendChild(taskbarIcon);
    }
    static removeTaskbarIcon(taskbarIcon) {
        if (!taskbarIcon || !WindowsManager.taskbarEl.contains(taskbarIcon))
            return;
        WindowsManager.taskbarEl.removeChild(taskbarIcon);
    }
}
//# sourceMappingURL=windowsManager.js.map