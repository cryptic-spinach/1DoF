function play() {
    if (sound.isPlaying()) {
        sound.pause();
        
        let button = document.querySelector(".play-button")
        button.innerHTML = "Play"

        clearInterval(moveMouse)
    }
    else {
        sound.play();
        sound.setVolume(0);

        let button = document.querySelector(".play-button")
        button.innerHTML = "Pause"
        setInterval(moveMouse, 0.1);
    }
}

function moveMouse() {
    let timestampKey = parseInt(sound.currentTime() * 1000).toString();
    if (hasMouseChange(timestampKey)) {
      let mouse = document.querySelector(".mouse-container");
      let mousePos = table[timestampKey];
    
      mouse.style.top = mousePos.y + "%";
      mouse.style.left = mousePos.x + "%";
    }
  }
  
  function hasMouseChange(timestampKey) {
    return table[timestampKey] != null;
  }