type CenterOnDrag = "handle" | "element" | null;
export declare class DraggableElement {
    private _draggableElement;
    private _dragHandle;
    private static _isDragging;
    private static _dragTarget?;
    private _centerOnDrag;
    private _dragEnabled;
    private _usePercentage;
    private _offsetX;
    private _offsetY;
    constructor(_draggableElement: HTMLElement, _dragHandle?: HTMLElement);
    private setupDragNDrop;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
    setCenterOnDrag(center: CenterOnDrag): this;
    setUsePercentage(active: boolean): this;
    enableDrag(): this;
    disableDrag(): this;
}
export {};
//# sourceMappingURL=draggable.d.ts.map