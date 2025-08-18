export declare enum WindowTypes {
    PROFILE = 0,
    PORTFOLIO = 1,
    CURRICULUM = 2,
    CONTACT = 3
}
interface WindowMetadata {
    title: string;
    path: string;
    iconFile: string;
    script: string | null;
}
export declare const windowTypeMetadataMap: Map<WindowTypes, WindowMetadata>;
export default class WindowElement {
    private _element;
    private _taskbarIcon;
    get element(): HTMLElement | null;
    get taskbarIcon(): HTMLElement | null;
    createElement(windowType: WindowTypes): Promise<void>;
    private createTaskbarElement;
    private configWindowElement;
    private loadWindowContent;
    createPopUp(popUpInnerHTML: string, popUpTitle: string): Promise<void>;
    private loadPopUpContent;
    private configPopUpElement;
}
export {};
//# sourceMappingURL=window.d.ts.map