function controls_init() {
    gui = new dat.GUI();
    gui.width = 300;

    gui.add(sliderOffset, "x", -100, 200).name("Slider x");
    gui.add(sliderOffset, "y", -100, 100).name("Slider y");
    // gui.addColor(palette, "backgroundColor").name("Background");
}

function windowResized() {
    resizeCanvas(windowWidth - canvasConfig.trimX, windowHeight - canvasConfig.trimY);
    slider.position((windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
}

