export const CustomEvents = {
    CloseWindowRequested: {
        type: "closeWindowRequested",
        payload: {}
    }
};
export function createEventBus() {
    const handlers = {};
    return {
        on(type, handler) {
            handlers[type] = handler;
        },
        emit(event) {
            handlers[event.type]?.(event.payload);
        }
    };
}
//# sourceMappingURL=events.js.map