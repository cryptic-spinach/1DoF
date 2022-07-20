import { canvasConfig, sliderConfig, axisConfig, palette, trendlineConfig, stepperButtonConfig, sliderLabelConfig} from "./configs.js";
import { controlsInit } from "./controls.js";
import { formatTableAsJson, generateRandomPoints, showValue, showValues, sliderInit, buttonsInit, positionButton} from "./helpers.js"
import { Point, Segment, Axes } from "./components.js";
import { getTrendlineDisplay } from "./stepper.js"

export let sketch_1DoF = p5 => {
  let sound;
  let table;
  let slider;
  let points;
  let data;
  p5.buttons;
  p5.stepper;

  p5.preload = () => {
    sound = p5.loadSound('content/1DoF/assets/sepia-sky.mp3');
    data = p5.loadTable('content/1DoF/assets/mouse-recording.csv', 'csv', 'header');
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - canvasConfig.trimX, p5.windowHeight - canvasConfig.trimY);
  
    controlsInit();
    p5.buttons = buttonsInit(p5);
    slider = sliderInit(p5);
  
    table = formatTableAsJson(data);
    points = generateRandomPoints(p5, 10);
    p5.stepper = 1;
  };

  p5.draw = () => {
    p5.background(palette.backgroundFill);
    p5.translate((p5.windowWidth - canvasConfig.trimX)/2, (p5.windowHeight - canvasConfig.trimY)/2);
    p5.scale(1, -1);
    p5.angleMode(p5.RADIANS);

    let sliderLabel = new Point(sliderLabelConfig.x, sliderLabelConfig.y, "b")

    let axes = new Axes(axisConfig.x, axisConfig.y, axisConfig.w, axisConfig.h, "x", "y");
    axes.show(p5);

    let trendlineStart = new Point(- axisConfig.w/2 + axisConfig.x - trendlineConfig.extraX, - axisConfig.h/2 + trendlineConfig.bInit + axisConfig.y - trendlineConfig.extraY);
    let trendlineEnd   = new Point(  axisConfig.w/2 + axisConfig.x + trendlineConfig.extraX,   axisConfig.h/2 + trendlineConfig.bInit + axisConfig.y + trendlineConfig.extraX);
    let trendline = new Segment(trendlineStart, trendlineEnd);

    let rotateAbout = new Point(axisConfig.x, trendlineConfig.bInit + axisConfig.y);
    trendline.rotateSegment(p5, slider.value(), rotateAbout);

    trendline.showAsSegment(p5, "#ffffff", 1.5);

    points.forEach(p => {
      getTrendlineDisplay(p5, p5.stepper, trendline, p)
    });

    points.forEach(p => {
      p.show(p5);
    });

    sliderLabel.showLabel(p5, sliderLabelConfig.labelFill);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth - canvasConfig.trimX, p5.windowHeight - canvasConfig.trimY);
    slider.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderConfig.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderConfig.y);
    let i = 0;
    p5.buttons.forEach(b => {
      positionButton(p5, b, i);
      i++;
    })
  }


};

export let part_1DoF = new p5(sketch_1DoF, document.querySelector(".part-1DoF"));