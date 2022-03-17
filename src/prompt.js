let mouseMoveData = [];
let mouseClickData = [];
let keyPressData = [];
let blinkData = [];
let eyeWidenessData = [];

let flushTimes = 0;

export function sendMouseMoveData(e) {
    mouseMoveData.push([String(Date.now()), String(e.clientX), String(e.clientY)]);
}

export function sendMouseClickData(e) {
    mouseClickData.push([String(Date.now()), String(e.clientX), String(e.clientY)]);
}

export function sendKeyPressDaata(e) {
    keyPressData.push([String(Date.now()), String(e.key)]);
}

export function sendBlinkData(leftClosed, rightClosed, bothClosed) {
    blinkData.push([String(Date.now()), String(leftClosed ? 1 : 0), String(rightClosed ? 1 : 0), String(bothClosed ? 1 : 0)]);
}

export function sendEyeWidenessData(leftEAR, rightEAR) {
    eyeWidenessData.push([String(Date.now()), leftEAR.toFixed(3), rightEAR.toFixed(3)]);
}

function flushData(fatigueLevel) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        "fatigueLevel" : fatigueLevel,
        "mouseMoveData" : mouseMoveData,
        "mouseClickData" : mouseClickData,
        "keyPressData" : keyPressData,
        "blinkData" : blinkData,
        "eyeWidenessData" : eyeWidenessData,
    }));

    var dlAnchorElem = document.getElementById('download-json');
    
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `data-${flushTimes++}.json`);
    dlAnchorElem.click();

    mouseMoveData = [];
    mouseClickData = [];
    keyPressData = [];
    blinkData = [];
    eyeWidenessData = [];
}

let promptInterval = 1000 * 60; // every minute
let prevPromptVal = -1;

displayPrompt();

function displayPrompt() {
    const prompt = document.createElement('div');
    prompt.classList.add('prompt-container');

    const promptHeader = document.createElement('h1');
    promptHeader.innerHTML = 'How tired are you?';

    const promptBody = document.createElement('p');
    promptBody.innerHTML = 'Please click on the slider to indicate how tired you are.';    
    
    const spanLeft = document.createElement('span');
    spanLeft.innerHTML = 'Not tired at all';
    
    const promptSlider = document.createElement('input');

    const spanRight = document.createElement('span');
    spanRight.innerHTML = 'Extremely tired';
    
    promptSlider.type = 'range';
    promptSlider.min = 0;
    promptSlider.max = 5;
    promptSlider.value = prevPromptVal == -1 ? 0 : prevPromptVal;
    promptSlider.step = 1;

    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Submit';
    
    submitButton.onclick = (e) => {
        console.log(`slider value: ${promptSlider.value}`);
        prevPromptVal = promptSlider.value;
        
        // the first flush will just have the initial fatigue level
        flushData(promptSlider.value);

        // the first submit starts the whole app's data capturing process
        setInterval(displayPrompt, promptInterval)

        prompt.remove();
    }

    prompt.appendChild(promptHeader);
    prompt.appendChild(promptBody);
    prompt.appendChild(spanLeft);
    prompt.appendChild(promptSlider);
    prompt.appendChild(spanRight);
    prompt.appendChild(submitButton);

    document.body.appendChild(prompt);
}

// to ask before closing the window -- ensuring no data loss
window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Are you sure you want to close the data-collector?';
    }

    // For Safari
    return 'Are you sure you want to close the data-collector?';
};
