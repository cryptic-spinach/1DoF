import { canvasConfig, sliderOffset, axisControls, palette, trendlineConfig} from "./configs.js";
import { controlsInit } from "./controls.js";
import { formatTableAsJson, generateRandomPoints, sliderInit } from "./helpers.js"
import { Point, Segment, Axes } from "./components.js";

const part_1DoF = p5 => {
  let sound;
  let table;
  let slider;
  let points;
  let data;

  p5.preload = () => {
    sound = p5.loadSound('content/1DoF/assets/sepia-sky.mp3');
    data = p5.loadTable('content/1DoF/assets/mouse-recording.csv', 'csv', 'header');
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - canvasConfig.trimX, p5.windowHeight - canvasConfig.trimY);
  
    controlsInit();
    slider = sliderInit(p5);
  
    table = formatTableAsJson(data);
    points = generateRandomPoints(p5, 10);
  };

  p5.draw = () => {
    p5.background(palette.backgroundFill);
    p5.translate((p5.windowWidth - canvasConfig.trimX)/2, (p5.windowHeight - canvasConfig.trimY)/2);
    p5.scale(1, -1);

    slider.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);

    let testAxes = new Axes(axisControls.x, axisControls.y, axisControls.w, axisControls.h);
    testAxes.show(p5);

    let trendlineStart = new Point(- axisControls.w/2, - axisControls.h/2);
    let trendlineEnd   = new Point(  axisControls.w/2,   axisControls.h/2);
    let trendline = new Segment(trendlineStart, trendlineEnd);

    // debugging
    let roundedTheta = parseFloat(trendline.getNumericSlope(p5, slider.value())).toFixed(2); 
    let testPoint = new Point(0, 0, roundedTheta); 
    testPoint.showLabel(p5, "#ffffff"); // value of m

    let rotateAbout = new Point(axisControls.x, trendlineConfig.bInit + axisControls.y)
    trendline.showAsRotatedSegment(p5, slider.value(), rotateAbout)

    points.forEach(p => p.show(p5));
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth - canvasConfig.trimX, p5.windowHeight - canvasConfig.trimY);
    slider.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
  }
};

new p5(part_1DoF, document.querySelector("#sketch-container"));