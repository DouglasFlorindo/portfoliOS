
import { Button } from "./ui_components/button";
import { buildHTMLFromTemplate, queryByRole } from "./helpers/utils";
import { CustomEvents, type EventBus } from "./helpers/events";
import { DraggableElement } from "./draggable";
import { SVGIcons } from "./helpers/icons";
import { nanoid } from "nanoid";



type WindowData = {
    id: string,
    title: string,
    content?: HTMLElement,
    onRender?: (windowElement: HTMLElement) => void,
}


type WindowRendererCallbacks = {
    onCloseClick(): void
}


export class WindowRenderer {
    private _drag?: DraggableElement

    private _data: WindowData = {
        id: nanoid(5),
        title: "Window",
    }

    public callbacks: WindowRendererCallbacks = {
        onCloseClick: () => { },
    }

    private _components = {
        closeButton: new Button()
            .onClick(() => this.callbacks.onCloseClick())
            .addClass("window-close-button")
            .icon(SVGIcons.close)
    }

    get data(): WindowData { return this._data }
    get drag(): DraggableElement | undefined { return this._drag }


    constructor(
    ) { }


    setTitle(title: string) { this._data.title = title; return this; }
    setContent(content: HTMLElement) { this._data.content = content; return this; }
    setOnRender(callback: (windowElement: HTMLElement) => void) { this._data.onRender = callback; return this; }


    render() {
        const element = buildHTMLFromTemplate(`
            <section data-role="window" data-window-id="${this._data.id}">
                <header class="window-header">
                    <div data-role="drag-handle">
                        <h1 class="window-title">${this._data.title}</h1>
                    </div>
                    <div data-role="close-button-container">
                    </div>
                </header>
                <div class="window-body">
                    <div data-role="content-container">
                    </div>
                </div>
            </section>
            `)

        queryByRole("close-button-container", element)?.appendChild(this._components.closeButton.render())
        this._data.content ? queryByRole("content-container", element)?.appendChild(this._data.content) : null

        this._drag = new DraggableElement(element, queryByRole("drag-handle", element)!)
            .setUsePercentage(true)

        this._data.onRender?.call(this, element)

        return element
    }
}


export class WindowController {
    constructor(
        private _renderer: WindowRenderer,
        private _eventBus: EventBus,
    ) {
        _renderer.callbacks = {
            onCloseClick: () => this._eventBus.emit(
                {
                    type: CustomEvents.CloseWindowRequested.type,
                    payload: { windowId: this._renderer.data.id }
                }
            )
        }

    }


    render() { return this._renderer.render() }
}