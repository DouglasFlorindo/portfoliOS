import { type EventBus } from "./helpers/events";
import { DraggableElement } from "./draggable";
type WindowData = {
    id: string;
    title: string;
    content?: HTMLElement;
    onRender?: (windowElement: HTMLElement) => void;
};
type WindowRendererCallbacks = {
    onCloseClick(): void;
};
export declare class WindowRenderer {
    private _drag?;
    private _data;
    callbacks: WindowRendererCallbacks;
    private _components;
    get data(): WindowData;
    get drag(): DraggableElement | undefined;
    constructor();
    setTitle(title: string): this;
    setContent(content: HTMLElement): this;
    setOnRender(callback: (windowElement: HTMLElement) => void): this;
    render(): HTMLElement;
}
export declare class WindowController {
    private _renderer;
    private _eventBus;
    constructor(_renderer: WindowRenderer, _eventBus: EventBus);
    render(): HTMLElement;
}
export {};
//# sourceMappingURL=windowV2.d.ts.map