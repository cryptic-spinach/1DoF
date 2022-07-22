import { axisConfig, sliderConfig, palette, styles, trendlineConfig, projectionVecPalette, projectionVecStyles, stepperButtonConfig, sliderLabelConfig, trendlineLabelConfig, squaresConfig, curveConfig} from "./configs.js";

export function controlsInit() {
    let gui = new dat.GUI();
    gui.width = 300;

    // gui.addColor(palette, "backgroundFill").name("Background");
    // gui.add(trendlineConfig, "yIntInit", -axisConfig.h/2, axisConfig.h/2).name("fitting line y intercept");


    // sliderGUI(gui);
    // axesGUI(gui);
    // trendlineGUI(gui);
    // projectionVecGUI(gui);
    // pointGUI(gui);
    // stepperButtonGUI(gui);
    // opacityGUI(gui);
    // curveConfigGUI(gui);
    // xyGUI(gui);
}

export function sliderGUI(gui) {
    gui.add(sliderConfig, "x", 0, 550).name("Slider x");
    gui.add(sliderConfig, "y", -400, 400).name("Slider y");
    gui.add(sliderLabelConfig, "x", 0, 700).name("Label x");
    gui.add(sliderLabelConfig, "y", -500, 0).name("Label y");
}

export function axesGUI(gui) {
    gui.add(axisConfig, "x", -500, -100).name("Axis x");
    gui.add(axisConfig, "y", -200, 100).name("Axis y");
    // gui.add(axisConfig, "w", 0, 600).name("Axis width");
    // gui.add(axisConfig, "h", 0, 600).name("Axis height");
    // gui.add(axisConfig, "size", 20, 600).name("Axis size");

    // gui.add(axisConfig, "horizontalLabelXOffset", -100, 100).name("horizontalLabelXOffset");
    // gui.add(axisConfig, "horizontalLabelYOffset", -100, 100).name("horizontalLabelYOffset");
    // gui.add(axisConfig, "verticalLabelXOffset", -100, 100).name("verticalLabelXOffset");
    // gui.add(axisConfig, "verticalLabelYOffset", -100, 100).name("verticalLabelYOffset");

}

export function trendlineGUI(gui) {
    gui.add(trendlineLabelConfig, "x", -500, 0).name("Trendline label x");
    gui.add(trendlineLabelConfig, "y", 0, 500).name("Trendline label y");
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

export function stepperButtonGUI(gui) {
    gui.add(stepperButtonConfig, "x", -1000, 0).name("Button x");
    gui.add(stepperButtonConfig, "y", -500, 0).name("Button y");
}

export function curveConfigGUI(gui) {
    gui.add(curveConfig, "x", 0, 550).name("Curve x");
    gui.add(curveConfig, "y", -400, 400).name("Curve y");
}

// Main config sets

export function opacityGUI(gui) {
    gui.add(projectionVecStyles, "opacity", 0, 255).name("distance opacity");
    gui.add(styles, "pointOpacity", 0, 255).name("point opacity");
    gui.add(styles, "segmentOpacity", 0, 255).name("segment opacity");
    gui.add(styles, "labelOpacity", 0, 255).name("label opacity");
    gui.add(axisConfig, "axisOpacity", 0, 255).name("axis opacity");
    gui.add(squaresConfig, "opacity", 0, 255).name("squares opacity");
}

export function xyGUI(gui) {
    gui.add(sliderConfig, "x", 0, 550).name("Slider x");
    gui.add(sliderConfig, "y", -400, 400).name("Slider y");
    gui.add(sliderLabelConfig, "x", 0, 700).name("Label x");
    gui.add(sliderLabelConfig, "y", -500, 0).name("Label y");
    gui.add(axisConfig, "x", -500, -100).name("Axis x");
    gui.add(axisConfig, "y", -200, 100).name("Axis y");
    gui.add(trendlineLabelConfig, "x", -500, 0).name("Trendline label x");
    gui.add(trendlineLabelConfig, "y", 0, 500).name("Trendline label y");
    gui.add(stepperButtonConfig, "x", -1000, 0).name("Button x");
    gui.add(stepperButtonConfig, "y", -500, 0).name("Button y");
    gui.add(curveConfig, "x", 0, 550).name("Curve x");
    gui.add(curveConfig, "y", -400, 400).name("Curve y");
}