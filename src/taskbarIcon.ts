import { windowTypeMetadataMap, WindowTypes } from "./window.js"
import WindowsManager from "./windowsManager.js";


export class TaskbarIcon {

    private _element!: HTMLElement;
    private linkedWindowType: WindowTypes;
    private linkedWindowElement: HTMLElement

    public get element() : HTMLElement {
        return this._element
    }
    

    constructor(windowElement: HTMLElement, windowType: WindowTypes) {
        this.linkedWindowElement = windowElement
        this.linkedWindowType = windowType
    }


    async createElement() {
        this._element = document.createElement("button");
        this._element.classList = "taskbar-icon button-icon button expand-h"

        let iconHTML: string = ''
        try {
            const res = await fetch(`/resources/svg/${windowTypeMetadataMap.get(this.linkedWindowType)?.iconFile}`)
            const HTML = await res.text()
            iconHTML = HTML
        } catch (error) {
            
        }

        this._element.innerHTML = iconHTML

        this.configElement()
    }


    private configElement() {
        this._element.addEventListener("click", () => {
            WindowsManager.focusOnWindow(this.linkedWindowElement)
            WindowsManager.bringWindowToCenter(this.linkedWindowElement)
        })
    }


}