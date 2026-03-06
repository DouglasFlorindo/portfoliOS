export class DraggableElement {
    _draggableElement;
    _dragHandle;
    static _isDragging = false;
    static _dragTarget;
    _centerOnDrag = null;
    _dragEnabled = true;
    _usePercentage = false;
    _offsetX = 0;
    _offsetY = 0;
    constructor(_draggableElement, _dragHandle = _draggableElement) {
        this._draggableElement = _draggableElement;
        this._dragHandle = _dragHandle;
        this.setupDragNDrop();
        return this;
    }
    setupDragNDrop() {
        this._draggableElement.style.position = "absolute";
        this._dragHandle.addEventListener("pointerdown", this.onPointerDown);
    }
    onPointerDown = (e) => {
        if (!this._dragEnabled || DraggableElement._isDragging)
            return;
        e.preventDefault();
        DraggableElement._isDragging = true;
        DraggableElement._dragTarget = this;
        this._dragHandle.setPointerCapture(e.pointerId);
        const rectEl = this._draggableElement.getBoundingClientRect();
        const rectHandle = this._dragHandle.getBoundingClientRect();
        if (this._centerOnDrag === "element") {
            this._offsetX = rectEl.width / 2;
            this._offsetY = rectEl.height / 2;
        }
        else if (this._centerOnDrag === "handle") {
            this._offsetX = e.clientX - rectHandle.left;
            this._offsetY = e.clientY - rectHandle.top;
        }
        else {
            this._offsetX = e.clientX - rectEl.left;
            this._offsetY = e.clientY - rectEl.top;
        }
        this._dragHandle.addEventListener("pointermove", this.onPointerMove);
        this._dragHandle.addEventListener("pointerup", this.onPointerUp);
        this._dragHandle.addEventListener("pointercancel", this.onPointerUp);
    };
    onPointerMove = (e) => {
        if (DraggableElement._dragTarget !== this)
            return;
        const x = e.clientX - this._offsetX;
        const y = e.clientY - this._offsetY;
        if (this._usePercentage) {
            const bodyW = document.body.clientWidth;
            const bodyH = document.body.clientHeight;
            this._draggableElement.style.left = `${(x / bodyW) * 100}%`;
            this._draggableElement.style.top = `${(y / bodyH) * 100}%`;
        }
        else {
            this._draggableElement.style.left = `${x}px`;
            this._draggableElement.style.top = `${y}px`;
        }
    };
    onPointerUp = (e) => {
        if (DraggableElement._dragTarget !== this)
            return;
        this._dragHandle.releasePointerCapture(e.pointerId);
        DraggableElement._isDragging = false;
        DraggableElement._dragTarget = null;
        this._dragHandle.removeEventListener("pointermove", this.onPointerMove);
        this._dragHandle.removeEventListener("pointerup", this.onPointerUp);
        this._dragHandle.removeEventListener("pointercancel", this.onPointerUp);
    };
    setCenterOnDrag(center) { this._centerOnDrag = center; return this; }
    setUsePercentage(active) { this._usePercentage = active; return this; }
    enableDrag() { this._dragEnabled = true; return this; }
    disableDrag() { this._dragEnabled = false; return this; }
}
//# sourceMappingURL=draggable.js.map