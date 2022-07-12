function record() {
    if (isRecording == false) {
        reInitializeGlobals();
        let recordButton = document.querySelector("#recordbutton");
        isRecording = true;
        recordButton.innerHTML = "Stop Recording";
        window.addEventListener("mousemove", listen);
    } 
    else {
        let recordButton = document.querySelector("#recordbutton");
        isRecording = false;
        recordButton.innerHTML = "Record";
        window.removeEventListener("mousemove", listen);
    }
}

function reInitializeGlobals() {
    startTime = Date.now();
    mouseRecording = ["time-in-milliseconds,percent-x,percent-y"];
}

let listen = function(e) {
    let elapsedTime = Date.now() - startTime;
    let percentX = parseFloat(e.clientX / window.innerWidth * 100).toFixed(4);
    let percentY = parseFloat(e.clientY / window.innerHeight * 100).toFixed(4);
    mouseRecording.push(elapsedTime + "," + percentX + "," + percentY);
}

