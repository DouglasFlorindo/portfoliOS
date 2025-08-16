import { WindowTypes } from "./window.js";
export declare class TaskbarIcon {
    private _element;
    private linkedWindowType;
    private linkedWindowElement;
    get element(): HTMLElement;
    constructor(windowElement: HTMLElement, windowType: WindowTypes);
    createElement(): Promise<void>;
    private configElement;
}
//# sourceMappingURL=taskbarIcon.d.ts.map