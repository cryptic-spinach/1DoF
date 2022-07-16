import { canvasConfig, sliderConfig, axisConfig, palette, trendlineConfig} from "./configs.js";
import { controlsInit } from "./controls.js";
import { formatTableAsJson, generateRandomPoints, showValue, showValues, sliderInit } from "./helpers.js"
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
    p5.angleMode(p5.RADIANS);

    slider.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderConfig.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderConfig.y);
    points[0].show(p5);
    // let axes = new Axes(axisConfig.x, axisConfig.y, axisConfig.w, axisConfig.h);
    // axes.show(p5);

    let trendlineStart = new Point(- axisConfig.w/2 + axisConfig.x, - axisConfig.h/2 + trendlineConfig.bInit + axisConfig.y);
    let trendlineEnd   = new Point(  axisConfig.w/2 + axisConfig.x,   axisConfig.h/2 + trendlineConfig.bInit + axisConfig.y);
    let trendline = new Segment(trendlineStart, trendlineEnd);

    let rotateAbout = new Point(axisConfig.x, trendlineConfig.bInit + axisConfig.y);
    trendline.rotateSegment(p5, slider.value(), rotateAbout);

    trendline.showAsSegment(p5, "#ffffff", 1);

    // points.forEach(p => {
    //   trendline.showPerpendicularDistance(p5, p)
    //   p.show(p5);
    // });


    trendline.showPerpendicularDistance(p5, points[0])

    trendline.showVerticalDistance(p5, points[0])

    // let myDebug = [
    //   {key: "Theta", value: parseFloat(slider.value()/(2 * p5.PI)).toFixed(2)}
    // ];

    // showValues(p5, myDebug);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth - canvasConfig.trimX, p5.windowHeight - canvasConfig.trimY);
    slider.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderConfig.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderConfig.y);
  }
};

new p5(part_1DoF, document.querySelector("#sketch-container"));