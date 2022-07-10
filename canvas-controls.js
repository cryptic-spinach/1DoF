function controls_init() {
    gui = new dat.GUI();
    gui.width = 300;

    slider_init();

    sliderGUI();
    axesGUI();
}

function windowResized() {
    resizeCanvas(windowWidth - canvasConfig.trimX, windowHeight - canvasConfig.trimY);
    slider.position((windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
}

function slider_init() {
    slider = createSlider(-axisControls.h/2, axisControls.h/2, 0, 0.1);
    slider.position((windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
    slider.style('width', '300px');
}

function sliderGUI() {
    gui.add(sliderOffset, "x", 0, 550).name("Slider x");
    // gui.add(sliderOffset, "y", -400, 400).name("Slider y");
    // gui.addColor(palette, "backgroundColor").name("Background");
}

function axesGUI() {
    gui.add(axisControls, "x", -500, -100).name("Axis x");
    // gui.add(axisControls, "y", -100, 100).name("Axis y");
    // gui.add(axisControls, "w", 0, 600).name("Axis width");
    // gui.add(axisControls, "h", 0, 600).name("Axis height");
    gui.add(axisControls, "size", 20, 600).name("Axis size");
}
