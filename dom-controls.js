let startTime;
let mouseRecording;
let isRecording = false;

let listen = function(e) {
    let elapsedTime = Date.now() - startTime;
    let percentX = parseFloat(e.clientX / window.innerWidth * 100).toFixed(4);
    let percentY = parseFloat(e.clientY / window.innerHeight * 100).toFixed(4);
    mouseRecording.push(elapsedTime + "," + percentX + "," + percentY);
}

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

function download() {
    const file = new File([mouseRecording.join("\n")], 'mouse-recording.csv', {
        type: 'text/csv',
    });

    const link = document.createElement('a');
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}


function play() {
    if (sound.isPlaying()) {
        sound.pause();
        
        let button = document.querySelector(".play-button")
        button.innerHTML = "Play"

        clearInterval(moveMouse)
    }
    else {
        sound.play();

        let button = document.querySelector(".play-button")
        button.innerHTML = "Pause"
        setInterval(moveMouse, 0.1);
    }
}





function moveMouse() {
    let timestampKey = parseInt(sound.currentTime() * 1000).toString();
    if (hasMouseChange(timestampKey)) {
      console.log("Found!")
      let mouse = document.querySelector(".mouse-container");
      let mousePos = table[timestampKey];
    
      mouse.style.top = mousePos.y + "%";
      mouse.style.left = mousePos.x + "%";
    }
  }
  
  function hasMouseChange(timestampKey) {
    return table[timestampKey] != null;
  }