import type { WindowTypes } from './window.js';
import WindowElement from './window.js';
export default class WindowsManager {
    private static isDragging;
    private static dragTarget;
    private static offsetX;
    private static offsetY;
    private static get windowsOnScreen();
    static desktopEl: HTMLElement;
    static taskbarEl: HTMLElement;
    constructor(desktopEl: HTMLElement, taskbarEl: HTMLElement);
    newWindow(windowType: WindowTypes): Promise<void>;
    private configWindow;
    static removeWindow(window: WindowElement): void;
    static focusOnWindow(windowElement: HTMLElement): void;
    static bringWindowToCenter(windowElement: HTMLElement): void;
    private static startDraggingWindow;
    private static dragWindow;
    private static stopDraggingWindow;
    private addTaskbarIcon;
    static removeTaskbarIcon(taskbarIcon: HTMLElement): void;
}
//# sourceMappingURL=windowsManager.d.ts.map