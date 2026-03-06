export declare const CustomEvents: {
    CloseWindowRequested: {
        type: string;
        payload: {
            windowId: string;
        };
    };
};
export type EventType = typeof CustomEvents[keyof typeof CustomEvents]["type"];
export type EventPayload<T extends EventType> = {
    [K in keyof typeof CustomEvents]: typeof CustomEvents[K]["type"] extends T ? typeof CustomEvents[K]["payload"] : never;
}[keyof typeof CustomEvents];
export type CustomEvent<T extends EventType = EventType> = {
    type: T;
    payload: EventPayload<T>;
};
export type CustomEventHandlers = {
    [T in EventType]?: (payload: EventPayload<T>) => void;
};
export type EventBus = {
    on<T extends EventType>(type: T, handler: (payload: EventPayload<T>) => void): void;
    emit<T extends EventType>(event: CustomEvent<T>): void;
};
export declare function createEventBus(): EventBus;
//# sourceMappingURL=events.d.ts.map