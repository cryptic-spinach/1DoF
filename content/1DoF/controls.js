import { axisConfig, sliderConfig, palette, styles, trendlineConfig, projectionVecPalette, projectionVecStyles} from "./configs.js";

export function controlsInit() {
    let gui = new dat.GUI();
    gui.width = 300;

    gui.addColor(palette, "backgroundFill").name("Background");

    // sliderGUI(gui);
    // axesGUI(gui);
    trendlineGUI(gui);
    //projectionVecGUI(gui);
    //pointGUI(gui);
}

export function sliderGUI(gui) {
    // gui.add(sliderOffset, "x", 0, 550).name("Slider x");
    // gui.add(sliderOffset, "y", -400, 400).name("Slider y");
}

export function axesGUI(gui) {
    // gui.add(axisControls, "x", -500, -100).name("Axis x");
    // gui.add(axisControls, "y", -100, 100).name("Axis y");
    // gui.add(axisControls, "w", 0, 600).name("Axis width");
    // gui.add(axisControls, "h", 0, 600).name("Axis height");
    gui.add(axisConfig, "size", 20, 600).name("Axis size");
}

export function trendlineGUI(gui) {
    gui.add(trendlineConfig, "bInit", -axisConfig.h/2, axisConfig.h/2).name("b");
}

export function projectionVecGUI(gui) {
    gui.addColor(projectionVecPalette, "uFill").name("u");
    // gui.addColor(projectionVecPalette, "vFill").name("v");
    gui.addColor(projectionVecPalette, "wFill").name("w");
    gui.add(projectionVecStyles, "weight").name("weight");
}

export function pointGUI(gui) {
    gui.addColor(palette, "pointStroke").name("Point Stroke");
    gui.addColor(palette, "pointFill").name("Point Fill");
    gui.add(styles, "pointRadius").name("Point Radius");
}