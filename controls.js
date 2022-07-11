import { axisControls, sliderOffset, palette } from "./configs.js";

export function controls_init() {
    let gui = new dat.GUI();
    gui.width = 300;

    // sliderGUI(gui);
    // axesGUI(gui);
}

export function sliderGUI(gui) {
    // gui.add(sliderOffset, "x", 0, 550).name("Slider x");
    // gui.add(sliderOffset, "y", -400, 400).name("Slider y");
    gui.addColor(palette, "backgroundFill").name("Background");
}

export function axesGUI(gui) {
    // gui.add(axisControls, "x", -500, -100).name("Axis x");
    // gui.add(axisControls, "y", -100, 100).name("Axis y");
    // gui.add(axisControls, "w", 0, 600).name("Axis width");
    // gui.add(axisControls, "h", 0, 600).name("Axis height");
    gui.add(axisControls, "size", 20, 600).name("Axis size");
}
