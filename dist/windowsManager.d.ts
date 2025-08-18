import type { WindowTypes } from './window.js';
import WindowElement from './window.js';
export default class WindowsManager {
    private static isDragging;
    private static dragTarget;
    private static offsetX;
    private static offsetY;
    private static windows;
    private static get windowsOnScreen();
    static desktopEl: HTMLElement;
    static taskbarEl: HTMLElement;
    constructor(desktopEl: HTMLElement, taskbarEl: HTMLElement);
    static newWindow(windowType: WindowTypes): Promise<void>;
    static newPopUp(popUpInnerHTML: string, popUpTitle: string): Promise<void>;
    static configWindow(el: HTMLElement): void;
    static removeWindow(window: WindowElement): void;
    static removeAllWindows(): void;
    static focusOnWindow(windowElement: HTMLElement): void;
    static bringWindowToCenter(windowElement: HTMLElement): void;
    static fullScreenWindow(windowElement: HTMLElement): void;
    private static startDraggingWindow;
    private static dragWindow;
    private static stopDraggingWindow;
    static addTaskbarIcon(taskbarIcon: HTMLElement): void;
    static removeTaskbarIcon(taskbarIcon: HTMLElement): void;
}
//# sourceMappingURL=windowsManager.d.ts.map