import { canvasConfig, sliderOffset, axisControls, palette} from "./configs.js";
import { controls_init } from "./controls.js";
import { formatTableAsJson, generateRandomPoints, slider_init } from "./helpers.js"
import { Point, Segment, Axes } from "./components.js";

const part_1DoF = p5 => {
  let sound;
  let table;
  let slider;
  let points;
  let data;

  p5.preload = function() {
    sound = p5.loadSound('content/1DoF/assets/sepia-sky.mp3');
    data = p5.loadTable('content/1DoF/assets/mouse-recording.csv', 'csv', 'header');
  }

  p5.setup = function() {
    p5.createCanvas(p5.windowWidth - canvasConfig.trimX, p5.windowHeight - canvasConfig.trimY);
  
    controls_init();
    slider = slider_init(p5);
  
    table = formatTableAsJson(data);
    points = generateRandomPoints(p5, 10);
  };

  p5.draw = function() {
    p5.background(palette.backgroundFill);
    p5.translate((p5.windowWidth - canvasConfig.trimX)/2, (p5.windowHeight - canvasConfig.trimY)/2);
    p5.scale(1, -1);

    slider.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);

    let testAxes = new Axes(axisControls.x, axisControls.y, axisControls.size, axisControls.size);
    testAxes.show(p5);

    let trendlineStart = new Point(axisControls.x - axisControls.w/2, axisControls.y - axisControls.h/2 + slider.value());
    let trendlineEnd   = new Point(axisControls.x + axisControls.w/2, axisControls.y + axisControls.h/2 + slider.value());
    let trendline = new Segment(trendlineStart, trendlineEnd);

    trendline.showAsSegment(p5, "#ffffff", 1);

    points.forEach(p => p.show(p5));
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth - canvasConfig.trimX, p5.windowHeight - canvasConfig.trimY);
    slider.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
  }
};

new p5(part_1DoF, document.querySelector("#sketch-container"));