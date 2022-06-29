function controls_init() {
    // gui = new dat.GUI();
    toggle_init();
}

function toggle_init() {
    button = createButton('Play');
    button.id('playPauseControl');
    button.position(0, 0);
    button.mousePressed(playPauseToggle);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    button.position(0, 0);
}

function playPauseToggle() {
    if (sound.isPlaying()) {
        sound.pause();
        button.html("Play");
    }
    else {
        sound.play();
        button.html("Pause");
    }
}
