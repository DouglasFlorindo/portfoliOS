import { createEventBus, CustomEvents } from "./helpers/events";
import { WindowController, WindowRenderer } from "./windowV2";


const r = new WindowRenderer()
    .setTitle("TItle")
    .setContent(document.createElement("button"))

const e = createEventBus()
e.on(CustomEvents.CloseWindowRequested.type, () => alert("AAAAAAAAAA"))

const c = new WindowController(r, e)

document.body.appendChild(c.render())

