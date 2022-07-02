function play() {
    if (sound.isPlaying()) {
        sound.pause();
        
        let button = document.querySelector(".play-button")
        button.innerHTML = "Play"
    }
    else {
        sound.play();

        let button = document.querySelector(".play-button")
        button.innerHTML = "Pause"
    }
}