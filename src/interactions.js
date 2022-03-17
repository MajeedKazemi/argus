
import {sendKeyPressDaata, sendMouseClickData, sendMouseMoveData} from "./prompt"

document.addEventListener("keydown", (e)=>{
    sendKeyPressDaata(e);
})

document.addEventListener("mousedown", (e)=>{
    sendMouseClickData(e);
})

let mouseDownEventsFrequency = 10; // 10 events per second
let mouseDownLastEventTime = 0;

document.addEventListener("mousemove", (e)=>{
    if (mouseDownLastEventTime === 0) {
        mouseDownLastEventTime = Date.now();
    } else if (mouseDownLastEventTime + (1000 / mouseDownEventsFrequency) < Date.now()) {
        mouseDownLastEventTime = Date.now();
        sendMouseMoveData(e);
    }
})
